import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLayout from "./Layouts/Default_layout";
import Home_page from './Pages/Home_page';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home_page />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}