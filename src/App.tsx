import { Route, Routes } from "react-router-dom";
import { Footer, Header, ScrollTop, Toast } from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout, { Success } from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
export default function App() {
  return (
    <>
      <ScrollTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Shop />} />
      </Routes>
      <Footer />
      <Toast />
    </>
  );
}
