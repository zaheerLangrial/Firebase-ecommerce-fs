import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoPage from "./pages/noPage/NoPage";
import Home from "./pages/home/Home";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import CartPage from "./pages/Cart/CartPage";
import AllProduct from "./pages/AllProducts/AllProducts";
import Signup from "./pages/Registration/Signup";
import Login from "./pages/Registration/Login";
import UserDashboard from "./pages/User/UserDashboard";

const App = () => {
  return (
    <div>
      <Router>
      <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproducts" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
