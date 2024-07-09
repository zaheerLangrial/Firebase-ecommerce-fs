/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../../FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const context = useContext(MyContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const validUser = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      try {
        const q = query(
          collection(fireDB, "users"),
          where("uid", "==", validUser?.user?.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.docs.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && (
        <ScaleLoader
          className="absolute backdrop-blur-sm h-full w-full flex justify-center items-center"
          color="#d81b60"
        />
      )}
      {/* Login Form  */}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Login
          </h2>
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              })
            }
            placeholder="Email Address"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input Three  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            onClick={handleLogin}
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
