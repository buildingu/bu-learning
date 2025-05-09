import React, { useReducer } from 'react';

/**
 * Challenge: Create a shopping cart using useReducer
 *
 * Requirements:
 * 1. Add, remove, update quantity, and clear cart functionality
 * 2. Use action types & reducer logic
 * 3. Display cart items, total count & total price
 * 4. Style it so it actually looks like a mini‐shop
 */

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Action types
const ACTIONS = {
  ADD_ITEM: 'add_item',
  REMOVE_ITEM: 'remove_item',
  UPDATE_QUANTITY: 'update_quantity',
  CLEAR_CART: 'clear_cart',
};

// Dummy products list
const products = [
  { id: 1, name: 'React Cookbook', price: 29.99 },
  { id: 2, name: 'JS T-Shirt', price: 19.99 },
  { id: 3, name: 'Node Sticker Pack', price: 4.99 },
];

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const item = action.payload;
      const exists = state.items.find(i => i.id === item.id);

      let newItems;
      if (exists) {
        newItems = state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }

      return {
        items: newItems,
        totalItems: state.totalItems + 1,
        totalPrice: +(state.totalPrice + item.price).toFixed(2),
      };
    }

    case ACTIONS.REMOVE_ITEM: {
      const id = action.payload;
      const toRemove = state.items.find(i => i.id === id);
      if (!toRemove) return state;

      const filtered = state.items.filter(i => i.id !== id);
      return {
        items: filtered,
        totalItems: state.totalItems - toRemove.quantity,
        totalPrice: +(
          state.totalPrice -
          toRemove.price * toRemove.quantity
        ).toFixed(2),
      };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity < 1) return state; // guard

      const updated = state.items.map(i =>
        i.id === id ? { ...i, quantity } : i
      );
      const totalItems = updated.reduce((sum, i) => sum + i.quantity, 0);
      const totalPrice = updated
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
        .toFixed(2);

      return {
        items: updated,
        totalItems,
        totalPrice: +totalPrice,
      };
    }

    case ACTIONS.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}

// Product card
function ProductItem({ product, dispatch }) {
  return (
    <div style={styles.productItem}>
      <div>{product.name}</div>
      <div>${product.price.toFixed(2)}</div>
      <button
        style={styles.addButton}
        onClick={() => dispatch({ type: ACTIONS.ADD_ITEM, payload: product })}
      >
        + Add
      </button>
    </div>
  );
}

// Cart line
function CartItem({ item, dispatch }) {
  return (
    <div style={styles.cartItem}>
      <div style={styles.cartName}>{item.name}</div>
      <div>
        <button
          style={styles.qtyButton}
          onClick={() =>
            dispatch({
              type: ACTIONS.UPDATE_QUANTITY,
              payload: { id: item.id, quantity: item.quantity - 1 },
            })
          }
        >
          –
        </button>
        <span style={styles.qty}>{item.quantity}</span>
        <button
          style={styles.qtyButton}
          onClick={() =>
            dispatch({
              type: ACTIONS.UPDATE_QUANTITY,
              payload: { id: item.id, quantity: item.quantity + 1 },
            })
          }
        >
          +
        </button>
      </div>
      <div>${(item.price * item.quantity).toFixed(2)}</div>
      <button
        style={styles.removeButton}
        onClick={() =>
          dispatch({ type: ACTIONS.REMOVE_ITEM, payload: item.id })
        }
      >
        ✕
      </button>
    </div>
  );
}

// Main challenge component
export default function UseReducerChallenge() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div style={styles.container}>
      <h2>🛒 useReducer Shopping Cart</h2>

      <section style={styles.products}>
        <h3>Products</h3>
        {products.map((p) => (
          <ProductItem key={p.id} product={p} dispatch={dispatch} />
        ))}
      </section>

      <section style={styles.cart}>
        <h3>Cart ({state.totalItems} items) — ${state.totalPrice.toFixed(2)}</h3>

        {state.items.length === 0 ? (
          <p style={styles.empty}>Your cart is empty</p>
        ) : (
          state.items.map((item) => (
            <CartItem key={item.id} item={item} dispatch={dispatch} />
          ))
        )}

        {state.items.length > 0 && (
          <button
            style={styles.clearButton}
            onClick={() => dispatch({ type: ACTIONS.CLEAR_CART })}
          >
            Clear Cart
          </button>
        )}
      </section>
    </div>
  );
}

// Styles
const styles = {
  container: {
    fontFamily: 'sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
  },
  products: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  productItem: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    width: '150px',
    textAlign: 'center',
  },
  addButton: {
    marginTop: '10px',
    cursor: 'pointer',
  },
  cart: {
    borderTop: '2px solid #333',
    paddingTop: '20px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '8px 0',
  },
  cartName: {
    flex: 1,
  },
  qtyButton: {
    margin: '0 5px',
    cursor: 'pointer',
  },
  qty: {
    minWidth: '20px',
    textAlign: 'center',
  },
  removeButton: {
    cursor: 'pointer',
    color: 'red',
    border: 'none',
    background: 'none',
  },
  clearButton: {
    marginTop: '15px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  empty: {
    fontStyle: 'italic',
    color: '#777',
  },
};
