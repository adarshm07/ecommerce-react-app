import "./MultipleProducts.css";

export default function MultipleProducts({ title, products }) {
  return (
    <div className="multiple__products">
      <h4 className="multiple__products__title pt-3">{title}</h4>
      <div className="multiple__products__grid">
        {products &&
          products.map((product, index) => (
            <SingleProduct
              key={index}
              title={product.title}
              img={product.img}
            />
          ))}
      </div>
    </div>
  );
}

function SingleProduct({ title, img }) {
  return (
    <div className="single__product d-flex flex-column">
      <img src={img} alt={title} />
      <span className="product__title">{title}</span>
    </div>
  );
}
