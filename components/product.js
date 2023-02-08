export default function Product({
  id,
  sku,
  name,
  price,
  productType,
  height,
  length,
  width,
  size,
  weight,
  handleCheckboxChange,
}) {

  const details =
    productType === "furniture"
      ? `Dimension: ${height}x${width}x${length}`
      : productType === "book"
      ? `Weight: ${weight}KG`
      : `Size: ${size} MB`;

  return (
    <div className="flex justify-center p-5 shadow-md shadow-[#424242]">
      <div>
        <input
          type="checkbox"
          className="delete-checkbox"
          onChange={() => handleCheckboxChange(id)}
        />
      </div>
      <div className="flex items-center flex-col text-center font-semibold">
        <span>{sku}</span>
        <span>{name}</span>
        <span>{price} $</span>
        <span>{details}</span>
      </div>
    </div>
  );
}
