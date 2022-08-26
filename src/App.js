import './App.css';
import AllInOne from './components/AllInOne';
import '../src/styles/styles.scss'
import Context from './context/Context';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Context.Provider value={{}} >
        <AllInOne />
      </Context.Provider>
    </div>
  );
}

export default App;
