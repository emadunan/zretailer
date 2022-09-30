import './App.css';
import Navbar from './components/Navbar';

import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import AdminProducts from './pages/Admin-Products';
import AdminOffers from './pages/Admin-Offers';

function App() {
  return (
    <div className="mx-6">
      <Navbar />
      <main className="my-12 mx-7">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="home" element={<Home />}/>
            <Route path="about" element={<About />}/>
            <Route path="admin" element={<Admin />}>
              <Route path="products" element={<AdminProducts />}/>
              <Route path="offers" element={<AdminOffers />}/>
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
