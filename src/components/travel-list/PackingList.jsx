import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDelete,
  toggoleItem,
  clearList,
}) {
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
