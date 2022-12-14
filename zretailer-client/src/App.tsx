import "./App.css";

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import AdminProducts, {
    loader as adminProductsLoader,
    action as addProductAction,
} from "./pages/AdminProducts";
import ProductDetails from "./pages/ProductDetails";
import AdminOffers from "./pages/AdminOffers";
import NotFound from "./pages/Not-Found";
import ErrorPage from "./pages/ErrorPage";
import ProductForm from "./components/Product/ProductForm";
import EndToast from "./components/UI/EndToast";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="admin" element={<Admin />}>
                <Route index element={<AdminProducts />} />
                <Route
                    path="products"
                    element={<AdminProducts />}
                    loader={adminProductsLoader}
                    errorElement={<ErrorPage />}
                    action={addProductAction}
                >
                    <Route path="register" element={<ProductForm />} />
                    <Route path=":productId" element={<ProductDetails />} />
                </Route>
                <Route path="offers" element={<AdminOffers />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return (
        <div className="mx-6">
            <RouterProvider router={router} />
            <EndToast />
        </div>
    );
}

export default App;
