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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProductPage from "./pages/Admin/AddProductPage";
import UpdateProductPage from "./pages/Admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import ProtectedRouteForAdmin from "./components/ProductedRoute/ProductedRouteForAdmin";
import ProtectedRouteForUser from "./components/ProductedRoute/ProductedRouteForUser";

const App = () => {
  return (
    <MyState>
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
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
