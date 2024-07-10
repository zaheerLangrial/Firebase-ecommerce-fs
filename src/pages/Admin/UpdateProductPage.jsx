import { categoryList } from "./AddProductPage";
import { useState } from "react";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../../FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const UpdateProductPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({
    title: "",
    price: "",
    url: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const tempProduct = await getDoc(doc(fireDB, "products", param?.id));
      const product = tempProduct.data();
      setUpdateProduct({
        title: product.title,
        price: product.price,
        url: product.url,
        category: product.category,
        description: product.description,
        quantity: product.quantity,
        time: product.time,
        date: product.date,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", param.id), updateProduct);
      toast.success("Product update Successfully");
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {loading && (
          <ScaleLoader
            className="absolute backdrop-blur-sm h-full w-full flex justify-center items-center"
            color="#d81b60"
          />
        )}
        {/* Login Form  */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Update Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              value={updateProduct.title}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  title: e.target.value,
                })
              }
              name="title"
              placeholder="Product Title"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              value={updateProduct.price}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  price: e.target.value,
                })
              }
              type="number"
              name="price"
              placeholder="Product Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              value={updateProduct.url}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  url: e.target.value,
                })
              }
              type="text"
              name="productImageUrl"
              placeholder="Product Image Url"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={updateProduct.category}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  category: e.target.value,
                })
              }
              className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              value={updateProduct.description}
              onChange={(e) =>
                setUpdateProduct({
                  ...updateProduct,
                  description: e.target.value,
                })
              }
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>

          {/* Update Product Button  */}
          <div className="mb-3">
            <button
              onClick={handleUpdateProduct}
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProductPage;
