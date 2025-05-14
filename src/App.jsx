import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './Contexts/GlobalContext';

import DefaultLayout from "./Layouts/DefaultLayout";
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Vinyls from './Pages/Vinyls';
import Cart from './Components/Cart';
import SingleVinyl from './Pages/SingleVinyl';
import ServerErrorPage from './Pages/ServerErrorPage';
import PaymentSuccess from './Pages/PaymentSuccess';

import StripeApp from './Pages/StripeApp'

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/vinyls" element={<Vinyls />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:slug" element={<SingleVinyl />} />
            <Route path="/checkout" element={<StripeApp />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="*" element={<ServerErrorPage error={"The page you were looking for couldn't be found! - error 404"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}