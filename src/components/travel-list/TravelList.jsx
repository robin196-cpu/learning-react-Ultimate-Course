import { useState } from "react";
import "./travellist.css";

const initialItems = [
  // { id: 1, description: "Passports", quantity: 2, packed: true },
  // { id: 2, description: "Socks", quantity: 12, packed: true },
  // { id: 3, description: "Charger", quantity: 8, packed: false },
];

export default function TravelList() {
  const [items, setItems] = useState(initialItems);
  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  return (
    <div className="travelList">
      <div className="app">
        <Logo />
        <Form addItem={handleAddItem} />
        <PackingList items={items} onDelete={handleDelete} />
        <Stats />
      </div>
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    addItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDelete={onDelete} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDelete }) {
  return (
    <li>
      <span>{item.quantity}</span>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

// "You got everything! Ready to go ✈️"
// 💼 You have X items on your list, and you already packed X (X%)
