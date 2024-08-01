import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './component/Navigation';
import Home from './component/home';
//import AddWish from './component/AddWish';
import ProductPage from './component/ProductPage';
import CategoryPage from './component/CategoryPage';
import ScrollToTop from './component/ScrollToTop'
import Question from './component/recorder';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
         // <Route path="/add-wish" element={<AddWish />} />
          <Route path="/add-audio" element={<Question />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
