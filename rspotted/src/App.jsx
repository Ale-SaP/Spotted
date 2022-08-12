import Contact from './parts/Contact';
import NavBar from './parts/NavBar';

function App() {

  return (
    <div>
      <div className="App center">
        <NavBar/>
      </div>
      <div className='content center'>
        <Contact/>
      </div>
    </div>
  );
}

export default App;