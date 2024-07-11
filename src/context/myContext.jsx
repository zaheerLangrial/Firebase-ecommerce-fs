import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
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

  const [getAllUsers , setGetAllUsers] = useState([]);


  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, 'users'),
        orderBy('time')
      )

      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({...doc.data(), id: doc.id});
        })
        setGetAllUsers(userArray);
        setLoading(false)
      })
      return () => data
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const DeleteOrder = async (OrderId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'order', OrderId))
      toast.success('Order Deleted successfully')
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  } 

  useEffect(() => {
    fetchProducts();
    getAllOrders();
    fetchAllUsers();
  }, []);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProducts,
        allOrders,
        getAllUsers,
        DeleteOrder
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
