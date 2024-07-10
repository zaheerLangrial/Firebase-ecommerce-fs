import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../FirebaseConfig";
import { createContext } from "react";

const MyContext = createContext();
export default MyContext;

export const MyState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [getAllProducts, setGetAllProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) =>
          productArray.push({
            ...doc?.data(),
            id: doc?.id,
          })
        );
        setGetAllProducts(productArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProducts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
