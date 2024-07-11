import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
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

  const [allOrders , setAllOrders] = useState([])

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, 'order'),
        orderBy('time')
      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({...doc.data(), id: doc.id})
        });
        setAllOrders(orderArray);
        setLoading(false)
      })
      return () => data
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts();
    getAllOrders()
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProducts,
        allOrders,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
