import './App.css';
import Appbar from './components/Appbar';
import Authentication from './components/Authentication';

function App() {
  return (
    <div className="App">
      <h1>React App</h1>   
      <Appbar />   
      <Authentication />
    </div>
  );
}

export default App;
