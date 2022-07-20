import './App.css';
import Home from './components/home/home';
import logo from './images/rijksmuseum-white.svg';
import githubLogo from './images/github.svg';
import linkedinLogo from './images/linkedin.svg';

function App() {
  return (
    <div className="App">
      <header>
        <div className='logo-container'><img src={logo} alt="rijksmuseum logo" /></div>
      </header>
      <div className='home-container'>
        <Home />
      </div>
      <footer>
        <div className='footer-wrapper'>
          Bibi Ferreira
          <ul>
            <li><a href="https://github.com/bibiferreira" target="_blank" rel="noreferrer"><img src={githubLogo} alt="Github icon"/></a></li>
            <li><a href="https://www.linkedin.com/in/bibi-ferreira/" target="_blank" rel="noreferrer"><img src={linkedinLogo} alt="Linkedin icon" /></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
