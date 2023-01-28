//note: hardhat uses chai for testing
const { expect } = require('chai')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const{ ethers } = require('hardhat')

describe('EtherWallet', function() {

    async function deployFixture() {
        //gets first two accounts from signers list
        const [owner, otherAccount] = await ethers.getSigners

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
            expect(await etherWallet.owner()).to.equal(owner);
        })
    })
    describe('Deposit', function() {

    })
    describe('Withdrawal', function() {

    })
})