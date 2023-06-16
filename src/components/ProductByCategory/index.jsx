import ProductCard from "../ProductCard";
import Slider from "../Slider";

export default function ProductByCategory({ allProducts, title }) {
  const sliders =
    allProducts &&
    allProducts.map((product, index) => (
      <ProductCard
        key={index}
        id={product._id}
        image={product.image}
        title={product.title}
        price={product.price}
        description={product.description}
      />
    ));
  return (
    <div className="product__by__category">
      <h4>{title}</h4>
      <Slider sliders={sliders} slidesPerView={4} spaceBetween={30} />
    </div>
  );
}
