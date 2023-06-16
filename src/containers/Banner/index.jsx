import Slider from "../../components/Slider";
import Banner1 from "../../assets/images/banner1.jpg";
import Banner2 from "../../assets/images/banner2.jpg";
import MultipleProducts from "../../components/MultipleProducts";
import "./Banner.css";

export default function Banner() {
  const images = [Banner1, Banner2];

  const allImages = images.map((image, index) => {
    return (
      <img
        key={index}
        src={image}
        style={{ width: "100%", height: "120vh" }}
        alt="banner"
      />
    );
  });

  const multipleProducts = [
    {
      id: 1,
      title: "Product 1",
      price: "100",
      img: "https://picsum.photos/100/100",
    },
    {
      id: 2,
      title: "Product 2",
      price: "200",
      img: "https://picsum.photos/100/100",
    },
    {
      id: 1,
      title: "Product 3",
      price: "100",
      img: "https://picsum.photos/100/100",
    },
    {
      id: 2,
      title: "Product 4",
      price: "200",
      img: "https://picsum.photos/100/100",
    },
  ];

  return (
    <div className="banner__container container-fluid p-0 position-relative">
      <Slider sliders={allImages} />
      <div className="position-absolute multiple__products__absolute d-flex justify-content-center gap-4 w-100">
        <MultipleProducts
          products={multipleProducts}
          title={"Pick up where you left off"}
        />
        <MultipleProducts products={multipleProducts} title={"Top Deals"} />
        <MultipleProducts
          products={multipleProducts}
          title={"Keep shopping for"}
        />
        <MultipleProducts products={multipleProducts} title={"New Arrivals"} />
      </div>
    </div>
  );
}
