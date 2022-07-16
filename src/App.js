import './App.css';
import Home from './components/home/home';
import logo from './images/rijksmuseum-white.svg';

// console.log(process.env.REACT_APP_SEARCH_API_KEY);

function App() {
  return (
    <div className="App">
      <header>
        <div className='logo-container'><img src={logo} alt="rijksmuseum logo" /></div>
      </header>
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
