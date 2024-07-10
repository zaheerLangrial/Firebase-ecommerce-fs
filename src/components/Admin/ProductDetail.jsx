import { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/myContext";
import { ScaleLoader } from "react-spinners";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../FirebaseConfig";
import toast from "react-hot-toast";
import { useState } from "react";

const ProductDetail = () => {
  const context = useContext(MyContext);
  const { getAllProducts } = context;
  const [loading , setLoading] = useState(false)

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product Deleted Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <ScaleLoader className="pt-12" color="#d81b60" />
        </div>
      ) : (
        <>
          <div className="py-5 flex justify-between items-center">
            {/* text  */}
            <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
            {/* Add Product Button  */}
            <Link to={"/addproduct"}>
              <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">
                Add Product
              </button>
            </Link>
          </div>

          {/* table  */}
          <div className="w-full overflow-x-auto mb-5">
            <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
              <tbody>
                <tr>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                  >
                    S.No.
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                </tr>
                {getAllProducts?.map((product, index) => {
                  return (
                    <tr key={index} className="text-pink-300">
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                        {product?.id || "-"}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        <img
                          src={product?.url || ""}
                          alt="Product Image"
                          className="size-16"
                        />
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {product?.title || "-"}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        $ {product?.price || "-"}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {product?.category || "-"}
                      </td>
                      <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                        {product?.date || "-"}
                      </td>
                      <Link
                        to={"/updateproduct/" + product.id}
                        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer "
                      >
                        Edit
                      </Link>
                      <td
                        onClick={() =>  handleDeleteProduct(product.id)}
                        className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                      >
                        Delete
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
