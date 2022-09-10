//Main 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react';

//Components
import Contact from './parts/Contact';
import NavBar from './parts/NavBar';
import TextScreen from './parts/TextScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,},},},);

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter >
          <Routes>
            <Route path='*' element={ <Navigate to="/home" /> }/>
            <Route path="/">
                <Route index path="home" element={
                  <>
                    <NavBar />
                    < TextScreen 
                    title={"Welcome to Spotted!"}
                    text={"Look for an artist you know and find related ones! What are you waiting for?"}/> 
                  </>
                } />

                <Route path="*" element={
                  <>
                    <NavBar />
                    < TextScreen 
                    title={"Whoops!"}
                    text={"An error occurred, was it on us?"}/>
                  </>
                } />

                <Route path='/search/:id' element={ <> < NavBar /> < Contact /> </>}  />
            </Route>
          </Routes>
        </BrowserRouter >
      </QueryClientProvider>
  );
}

export default App;