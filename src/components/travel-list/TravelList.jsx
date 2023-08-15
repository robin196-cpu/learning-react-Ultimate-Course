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
  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const handlerClearItems = () => {
    setItems([]);
  };
  return (
    <div className="travelList">
      <div className="app">
        <Logo />
        <Form addItem={handleAddItem} />
        <PackingList
          items={items}
          toggoleItem={handleToggleItem}
          onDelete={handleDelete}
          clearList={handlerClearItems}
        />
        <Stats items={items} />
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
function PackingList({ items, onDelete, toggoleItem, clearList }) {
  const [sortBy, setSortBy] = useState("packed");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDelete={onDelete}
            toggoleItem={toggoleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Short by input</option>
          <option value="description">Short by description</option>
          <option value="packed">Short by packed</option>
        </select>
        <button onClick={clearList}>Clear</button>
      </div>
    </div>
  );
}
function Item({ item, onDelete, toggoleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggoleItem(item.id)}
      />
      <span>{item.quantity}</span>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );
  }
  const itemLength = items.length;
  const packedItemlist = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItemlist / itemLength) * 100);
  return (
    <footer className="stats">
      {percentage === 100 ? (
        "You got everything! Ready to go ✈️"
      ) : (
        <em>
          💼 You have {itemLength} items on your list, and you already packed{" "}
          {packedItemlist} ({percentage}%)
        </em>
      )}
    </footer>
  );
}

// "You got everything! Ready to go ✈️"
// 💼 You have X items on your list, and you already packed X (X%)
