import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './Contexts/GlobalContext';

import DefaultLayout from "./Layouts/DefaultLayout";
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Login from './Pages/Login';
import Vinyls from './Pages/Vinyls';
import Cart from './Pages/Cart';

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vinyls" element={<Vinyls />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}