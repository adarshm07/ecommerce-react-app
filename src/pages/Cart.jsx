import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../store/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Cart() {
  const productsInCart = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const getAllItems = async () => {
    const data = await axios.get("http://localhost:8080/api/v1/cart", {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    });
    // console.log(data.data.data);
  };

  const handleChangeQuantity = async (product, action) => {
    let config = {
      method: "post",
      url: `http://localhost:8080/api/v1/cart/qty/${action}`,
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ productId: product.id }),
    };

    await axios.request(config).then((response) => {
      if (response.data.statusCode === 201) {
        if (action === "inc") {
          dispatch(addToCart(product));
        } else if (action === "dec") {
          dispatch(removeFromCart(product));
        }
      } else {
        toast.error("Something went wrong");
      }
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    let config = {
      method: "DELETE",
      url: `http://localhost:8080/api/v1/cart/empty`,
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };

    await axios.request(config).then((response) => {
      toast.success("Cart cleared");
      dispatch(clearCart());
    });
  };

  useEffect(() => {
    if (productsInCart.length > 0) getAllItems();
  }, []);

  return (
    <Layout>
      <div className="d-flex col-12 mt-4">
        {!productsInCart && (
          <div>
            <div>Your cart is empty</div>
          </div>
        )}
        <div className="d-flex flex-column gap-2 col-8">
          {productsInCart.cartItems &&
            productsInCart.cartItems.map((product) => {
              return (
                <div
                  key={product._id}
                  className="product-in-cart d-flex justify-content-between border border-1 p-2 m-1"
                >
                  <div>Title: {product.title}</div>
                  <div>Price: {product.price}</div>
                  <div>
                    Quantity:
                    <button
                      className="btn btn-primary"
                      onClick={() => handleChangeQuantity(product, "dec")}
                    >
                      -
                    </button>
                    <span className="px-2">{product.quantity}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleChangeQuantity(product, "inc")}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleChangeQuantity(product, "dec")}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          <div className="ms-auto">
            <button className="btn btn-danger" onClick={handleDelete}>
              Clear Cart
            </button>
          </div>
        </div>
        <div className="col-4 p-2">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span>Total:</span>
            <h4>{productsInCart.totalPrice}</h4>
          </div>
          <button className="btn btn-primary w-100 mt-4">Checkout</button>
        </div>
      </div>
    </Layout>
  );
}
