import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Routers from './Routes';

function App() {
  return (
    <>
    <ChakraProvider>
    <Routers/>
    </ChakraProvider>
    </>
  );
}

export default App;
