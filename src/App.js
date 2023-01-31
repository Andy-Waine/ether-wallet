import logo from './logo.svg';
import Button from 'react-bootstrap/Button'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="secondary">
          <img src="images/metamask.svg" alt="metamask" width="50" height ="50" />
        </Button>
        <div className='mt-2 mb-2'>Connected Account:</div>
        <Button variant="danger">
          Disconnect Metamask{' '}
          <img src="images/hand.svg" alt="disconnet" width="50" height="50" />
        </Button>
      </header>
    </div>
  );
}

export default App;
