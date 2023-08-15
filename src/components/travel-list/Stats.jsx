export default function Stats({ items }) {
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
