//note: hardhat uses chai for testing
const { expect } = require('chai')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const{ ethers } = require('hardhat')

describe('EtherWallet', function() {

    async function deployFixture() {
        //gets first two accounts from signers list
        const [owner, otherAccount] = await ethers.getSigners()

        const EtherWallet = await ethers.getContractFactory('EtherWallet')
        const etherWallet = await EtherWallet.deploy()

        return { etherWallet, owner, otherAccount}
    }

    describe('Deployment', function() {
        it('Should deploy and set the owner as the deployer address', async function() {
            //loadFixture is a hardhat-network-helper that faciliates faster testing than the 'beforeEach' method
            //a 'Fixture' sets up the chain to a desired state
            const { etherWallet, owner } = await loadFixture(deployFixture)
            
            //ensures the etherWallet contract owner matches our owner param (1st signer)
            expect(await etherWallet.owner()).to.equal(owner.address);
        })
    })
    describe('Deposit', function() {
        it("Should desposit Ether to the Smart Contract", async function() {
            const { etherWallet } = await loadFixture(deployFixture)

            const tx = await etherWallet.deposit({
                value: ethers.utils.parseEther('1')
            })
            await tx.wait()

            const balance = await ethers.provider.getBalance(etherWallet.address)
            expect(balance.toString()).to.equal(ethers.utils.parseEther('1'))
        })
    })
    describe('Withdrawal', function() {
        it("Should withdraw Ether from the Smart Contract with 0 ETH", async function() {
            const { etherWallet } = await loadFixture(deployFixture)

            const tx = await etherWallet.connect(owner).withdraw(owner.address, ethers.utils.parseEther('0'))
            await tx.wait()

            const balance = await ethers.provider.getBalance(etherWallet.address)
            expect(balance.toString()).to.equal(etehrs.utils.parseEther('0'))
        })

        it("Should withdraw Ether from the Smart Contract with <<positive integer> ETH", async function() {
            const { etherWallet, owner } = await loadFixture(deployFixture)

            //deposit ETH for future withdrawal
            const depositTx = await etherWallet.deposit({
                value: ethers.utils.parseEther('1')
            })
            await depositTx.wait()

            let balance = await ethers.provider.getBalance(etherWallet.address)
            expect(balance.toString()).to.equal(etehrs.utils.parseEther('0'))

            //withdraw ETH
            const withdrawTx = await etherWallet.withdraw(
                owner.address,
                ethers.utils.parseEther('1')
            )
            await withdrawTx.wait()
            
            balance = await ethers.provider.getBalance(etherWallet.address)
            expect(balance.toString()).to.equal(ethers.utils.parseEther('0'))
        })
})