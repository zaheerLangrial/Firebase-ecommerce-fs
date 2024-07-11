import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { fireDB } from "../../../FirebaseConfig";

const BuyNowModal = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const cartProducts = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-us", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const handleOpen = () => setOpen(!open);
  const buyNowFunction = async () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.phone === ""
    ) {
      return toast.error("All fields are required");
    }

    const orderInfo = {
      cartProducts,
      addressInfo,
      email: user?.email,
      userId: user?.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        phone: "",
      });
      toast.success("Order Placed Successfull");
    } catch (error) {
      console.log(error);
      toast.error("Something wants wrong");
    }
  };
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
      >
        Buy now
      </Button>
      <Dialog open={open} handler={handleOpen} className=" bg-pink-50">
        <DialogBody className="">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value,
                })
              }
              placeholder="Enter your name"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value,
                })
              }
              placeholder="Enter your address"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value,
                })
              }
              placeholder="Enter your pincode"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="mb-3">
            <input
              value={addressInfo.phone}
              onChange={(e) =>
                setAddressInfo({
                  ...addressInfo,
                  phone: e.target.value,
                })
              }
              type="text"
              name="mobileNumber"
              placeholder="Enter your mobileNumber"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={() => {
                buyNowFunction();
                handleOpen();
              }}
              className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
            >
              Buy now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
