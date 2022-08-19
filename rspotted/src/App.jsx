//Main 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Components
import Contact from './parts/Contact';
import NavBar from './parts/NavBar';

function App() {

  return (
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<NavBar />}>
                <Route index path="home" element={ <><p>This is the homepage!</p></>} /> 
                <Route path='search/:id' element={<> <Contact /> </>}/>
                <Route path="*" element={<> <p>Whoops, this does not seem to exist!</p> </>} />
            </Route>
          </Routes>
        </BrowserRouter >
  );
}

export default App;