import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Default_layout from './Default_layouts/Default_layout';
import HomePage from './Pages/Home_page';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Default_layout />}>
          <Route path="/" Component={HomePage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}