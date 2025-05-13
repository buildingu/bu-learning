// Import React and the useReducer hook from the React library
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

// Define the initial state for the shopping cart
const initialState = {
  items: [],        // Start with an empty array of items in the cart
  totalItems: 0,    // Start with zero total items
  totalPrice: 0,    // Start with a total price of zero
};

// Define action types as constants to avoid typos and make code easier to manage
const ACTIONS = {
  ADD_ITEM: 'add_item',             // Action for adding an item to the cart
  REMOVE_ITEM: 'remove_item',       // Action for removing an item from the cart
  UPDATE_QUANTITY: 'update_quantity', // Action for updating the quantity of an item
  CLEAR_CART: 'clear_cart',         // Action for clearing the entire cart
};

// Create a list of products that can be added to the cart
const products = [
  { id: 1, name: 'React Cookbook', price: 29.99 },    // Product 1
  { id: 2, name: 'JS T-Shirt', price: 19.99 },        // Product 2
  { id: 3, name: 'Node Sticker Pack', price: 4.99 },  // Product 3
];

// Define the reducer function that will handle all cart actions
function cartReducer(state, action) {
  // Use a switch statement to handle different action types
  switch (action.type) {
    case ACTIONS.ADD_ITEM: { // If the action is to add an item
      const item = action.payload; // Get the item to add from the action payload
      // Check if the item already exists in the cart
      const exists = state.items.find(i => i.id === item.id);

      let newItems; // Will hold the new array of items
      if (exists) {
        // If the item exists, increase its quantity by 1
        newItems = state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // If the item does not exist, add it with quantity 1
        newItems = [...state.items, { ...item, quantity: 1 }];
      }

      // Return the new state with updated items, totalItems, and totalPrice
      return {
        items: newItems,
        totalItems: state.totalItems + 1, // Increase total items by 1
        totalPrice: +(state.totalPrice + item.price).toFixed(2), // Add item's price to total, rounded to 2 decimals
      };
    }

    case ACTIONS.REMOVE_ITEM: { // If the action is to remove an item
      const id = action.payload; // Get the id of the item to remove
      // Find the item to remove in the cart
      const toRemove = state.items.find(i => i.id === id);
      if (!toRemove) return state; // If item not found, return current state

      // Filter out the item to remove from the items array
      const filtered = state.items.filter(i => i.id !== id);
      // Return the new state with updated items, totalItems, and totalPrice
      return {
        items: filtered,
        totalItems: state.totalItems - toRemove.quantity, // Subtract the quantity of removed item from total
        totalPrice: +(
          state.totalPrice -
          toRemove.price * toRemove.quantity // Subtract the total price of removed item(s)
        ).toFixed(2),
      };
    }

    case ACTIONS.UPDATE_QUANTITY: { // If the action is to update quantity
      const { id, quantity } = action.payload; // Get id and new quantity from payload
      if (quantity < 1) return state; // If quantity is less than 1, do nothing

      // Map through items and update the quantity for the matching item
      const updated = state.items.map(i =>
        i.id === id ? { ...i, quantity } : i
      );
      // Calculate the new total number of items
      const totalItems = updated.reduce((sum, i) => sum + i.quantity, 0);
      // Calculate the new total price
      const totalPrice = updated
        .reduce((sum, i) => sum + i.price * i.quantity, 0)
        .toFixed(2);

      // Return the new state with updated items, totalItems, and totalPrice
      return {
        items: updated,
        totalItems,
        totalPrice: +totalPrice, // Convert string to number
      };
    }

    case ACTIONS.CLEAR_CART: // If the action is to clear the cart
      return initialState; // Reset state to initial values

    default: // If action type is not recognized
      return state; // Return current state unchanged
  }
}

// Component to display a single product and an "Add" button
function ProductItem({ product, dispatch }) {
  // Render a product card with name, price, and add button
  return (
    <div style={styles.productItem}>
      <div>{product.name}</div> {/* Show product name */}
      <div>${product.price.toFixed(2)}</div> {/* Show product price with 2 decimals */}
      <button
        style={styles.addButton}
        // When clicked, dispatch an action to add this product to the cart
        onClick={() => dispatch({ type: ACTIONS.ADD_ITEM, payload: product })}
      >
        + Add
      </button>
    </div>
  );
}

// Component to display a single cart item with quantity controls and remove button
function CartItem({ item, dispatch }) {
  // Render a cart row with name, quantity controls, price, and remove button
  return (
    <div style={styles.cartItem}>
      <div style={styles.cartName}>{item.name}</div> {/* Show item name */}
      <div>
        {/* Button to decrease quantity */}
        <button
          style={styles.qtyButton}
          // When clicked, dispatch action to decrease quantity by 1
          onClick={() =>
            dispatch({
              type: ACTIONS.UPDATE_QUANTITY,
              payload: { id: item.id, quantity: item.quantity - 1 },
            })
          }
        >
          –
        </button>
        {/* Show current quantity */}
        <span style={styles.qty}>{item.quantity}</span>
        {/* Button to increase quantity */}
        <button
          style={styles.qtyButton}
          // When clicked, dispatch action to increase quantity by 1
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
      {/* Show total price for this item (price * quantity) */}
      <div>${(item.price * item.quantity).toFixed(2)}</div>
      {/* Button to remove this item from the cart */}
      <button
        style={styles.removeButton}
        // When clicked, dispatch action to remove this item
        onClick={() =>
          dispatch({ type: ACTIONS.REMOVE_ITEM, payload: item.id })
        }
      >
        ✕
      </button>
    </div>
  );
}

// Main component that brings everything together
export default function UseReducerChallenge() {
  // useReducer returns the current state and a dispatch function to send actions
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Render the shopping cart UI
  return (
    <div style={styles.container}>
      {/* Title for the shopping cart */}
      <h2>🛒 useReducer Shopping Cart</h2>

      {/* Section to display available products */}
      <section style={styles.products}>
        <h3>Products</h3>
        {/* Map through products and render a ProductItem for each */}
        {products.map((p) => (
          <ProductItem key={p.id} product={p} dispatch={dispatch} />
        ))}
      </section>

      {/* Section to display the cart */}
      <section style={styles.cart}>
        {/* Show cart summary: number of items and total price */}
        <h3>Cart ({state.totalItems} items) — ${state.totalPrice.toFixed(2)}</h3>

        {/* If cart is empty, show a message. Otherwise, show cart items */}
        {state.items.length === 0 ? (
          <p style={styles.empty}>Your cart is empty</p>
        ) : (
          state.items.map((item) => (
            <CartItem key={item.id} item={item} dispatch={dispatch} />
          ))
        )}

        {/* If there are items in the cart, show a "Clear Cart" button */}
        {state.items.length > 0 && (
          <button
            style={styles.clearButton}
            // When clicked, dispatch action to clear the cart
            onClick={() => dispatch({ type: ACTIONS.CLEAR_CART })}
          >
            Clear Cart
          </button>
        )}
      </section>
    </div>
  );
}

// Define styles for the components as a JavaScript object
const styles = {
  container: {
    fontFamily: 'sans-serif',      // Use a sans-serif font for the whole app
    padding: '20px',               // Add padding around the container
    maxWidth: '600px',             // Limit the width of the container
    margin: 'auto',                // Center the container horizontally
  },
  products: {
    display: 'flex',               // Arrange products in a row
    gap: '10px',                   // Add space between product cards
    marginBottom: '30px',          // Add space below the products section
    flexWrap: 'wrap',              // Allow products to wrap to the next line
  },
  productItem: {
    border: '1px solid #ddd',      // Light border around each product
    borderRadius: '5px',           // Rounded corners
    padding: '10px',               // Padding inside the product card
    width: '150px',                // Fixed width for each product card
    textAlign: 'center',           // Center text inside the card
  },
  addButton: {
    marginTop: '10px',             // Space above the add button
    cursor: 'pointer',             // Show pointer cursor on hover
  },
  cart: {
    borderTop: '2px solid #333',   // Dark border above the cart section
    paddingTop: '20px',            // Space above the cart content
  },
  cartItem: {
    display: 'flex',               // Arrange cart item content in a row
    justifyContent: 'space-between', // Space out the content
    alignItems: 'center',          // Vertically center the content
    borderBottom: '1px solid #eee', // Light border below each cart item
    padding: '8px 0',              // Vertical padding for each cart item
  },
  cartName: {
    flex: 1,                       // Allow the name to take up available space
  },
  qtyButton: {
    margin: '0 5px',               // Space on left and right of quantity buttons
    cursor: 'pointer',             // Show pointer cursor on hover
  },
  qty: {
    minWidth: '20px',              // Minimum width for the quantity display
    textAlign: 'center',           // Center the quantity text
  },
  removeButton: {
    cursor: 'pointer',             // Show pointer cursor on hover
    color: 'red',                  // Red color for the remove button
    border: 'none',                // No border for the button
    background: 'none',            // No background for the button
  },
  clearButton: {
    marginTop: '15px',             // Space above the clear button
    padding: '8px 12px',           // Padding inside the button
    cursor: 'pointer',             // Show pointer cursor on hover
  },
  empty: {
    fontStyle: 'italic',           // Italic text for empty cart message
    color: '#777',                 // Gray color for the message
  },
};