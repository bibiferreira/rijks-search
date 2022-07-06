import './App.css';
import Home from './components/home/home';
import logo from './images/rijksmuseum-logo.png';

// console.log(process.env.REACT_APP_SEARCH_API_KEY);

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="rijksmuseum logo" />
      </header>
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
