import { useState } from "react";
import "./travellist.css";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

// "You got everything! Ready to go ✈️"
// 💼 You have X items on your list, and you already packed X (X%)
