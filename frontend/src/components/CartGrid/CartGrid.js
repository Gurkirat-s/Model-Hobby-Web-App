import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CartGrid.scss';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const CartGrid = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    const newCart = [];
    axios
      .get('http://localhost:4000/api/cart', { withCredentials: true })
      .then((response) => {
        axios
          .all(
            response.data.map((item) =>
              axios.get(`http://localhost:4000/api/products/${item.id}`)
            )
          )
          .then(
            axios.spread((...responses) => {
              responses.forEach((product, index) => {
                const newProduct = product.data;
                const id = response.data[index].id;
                const qty = response.data[index].qty;
                newCart.push({
                  id,
                  qty,
                  product: newProduct,
                });
              });
            })
          )
          .then(() => {
            // updateTotal(newCart);
            setCart(newCart);
            console.log(newCart);
          });
      });
  };

  const updateCart = (id, qty) => {
    axios
      .post(
        'http://localhost:4000/api/cart/update',
        {
          id,
          qty,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        getCart();
      })
      .then(() => getCart());
  };

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((item) => {
      // console.log(item.qty);
      newTotal += item.qty * item.product.msrp;
    });
    // console.log(newTotal);
    setTotal(newTotal);
  }, [cart]);

  const handleUpdate = () => {};
  const handleChange = () => {};

  const updateTotal = (cart) => {
    let newTotal = 0;
    // cart.forEach((item) => {
    //   axios
    //     .get(`http://localhost:4000/api/products/${item.id}`)
    //     .then((response) => {
    //       newTotal += response.data.msrp * item.qty;
    //     })
    //     .then(() => console.log('updating total'));
    // });
    // console.log('setting total');
    // console.log(newTotal);
    // setTotal(newTotal);
    cart.forEach((item) => {
      // console.log(item.qty);
      newTotal += item.qty * item.product.msrp;
    });
    // console.log(newTotal);
    setTotal(newTotal);
  };

  return (
    <div className="cart-table">
      <div className="row header-row">
        <div>ID</div>
        <div>Name</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>
      {cart.map((item) => {
        return (
          <CartItem updateCart={updateCart} cartItem={item} key={item.id} />
        );
      })}
      <div className="total">
        <span>Total: </span>
        {formatter.format(total)}
      </div>
    </div>
  );
};

const CartItem = ({ cartItem, updateCart }) => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(cartItem.qty);

  const handleAddChange = (e) => {
    // if (qty < 0) {
    //   updateCart(cartItem.id, 0);
    // } else {
    // }
    setQty((prev) => prev + 1);
    updateCart(cartItem.id, qty + 1);
  };
  const handleSubtractChange = () => {
    if (qty === 1) {
      // updateCart(cartItem.id, 0);
    } else {
      updateCart(cartItem.id, qty - 1);
      setQty(qty - 1);
    }
  };
  const handleRemove = () => {
    setQty(0);
    updateCart(cartItem.id, 0);
  };

  useEffect(() => {
    setProduct(cartItem.product);
  }, []);

  return (
    <div className="row">
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{formatter.format(product.msrp)}</div>
      <div className="quantity">
        <button onClick={handleSubtractChange}>-</button>
        {qty}
        <button onClick={handleAddChange}>+</button>
      </div>

      <div className="subtotal">
        <div>{formatter.format(qty * product.msrp)}</div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartGrid;
