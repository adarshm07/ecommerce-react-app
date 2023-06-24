import "./ProductDetail.css";

export default function ProductDetail({ title, image, price, description }) {
  return (
    <div className="product-details">
      <div className="product__img">
        <img src={image} alt={title} />
      </div>
      <div className="p-2">
        <h2>{title}</h2>
        <h3>Price: {price}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
