//Main 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react';

//Components
import NavBar from './parts/NavBar';
import TextScreen from './parts/TextScreen';
import Homepage from './parts/Homepage';
import SearchPath from './parts/SearchPath.jsx'

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
            
          <Route path="" element={<> <NavBar /> <Homepage/> </>} />
          <Route path='*' element={<> <NavBar /> <TextScreen title="404" text="Missing Page!"/> </>} />
            
          <Route path="/">
            <Route path="home" element={<> <NavBar/> <Homepage/> </>} />
            <Route path='search/*' element={ <> <SearchPath/> </>} />
          </Route>

          </Routes>
        </BrowserRouter >
      </QueryClientProvider>
  );
}

export default App;