/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ScaleLoader } from "react-spinners";

const Signup = () => {
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const userSignUpHandle = async () => {
    if (
      userSignUp.name === "" ||
      userSignUp.email === "" ||
      userSignUp.password === ""
    ) {
      toast.error("All Fields Required");
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignUp.email,
        userSignUp.password
      );

      const user = {
        name: userSignUp.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignUp.role,
        time: Timestamp.now(),
        date: new Date().toLocaleDateString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);
      setUserSignUp({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
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
            Signup
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            value={userSignUp.name}
            onChange={(e) =>
              setUserSignUp({
                ...userSignUp,
                name: e.target.value,
              })
            }
            placeholder="Full Name"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            value={userSignUp.email}
            onChange={(e) =>
              setUserSignUp({
                ...userSignUp,
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
            value={userSignUp.password}
            onChange={(e) =>
              setUserSignUp({
                ...userSignUp,
                password: e.target.value,
              })
            }
            type="password"
            placeholder="Password"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            onClick={userSignUpHandle}
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Signup
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
