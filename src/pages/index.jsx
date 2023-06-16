import Layout from "../components/Layout";
import Banner from "../containers/Banner";
import CategoryCars from "../containers/CategoryCars";
import MostPopular from "../containers/MostPopular";

export default function Home() {
  return (
    <Layout>
      <div className="d-flex flex-column">
        <Banner />
        <div className="product__category p-4">
          <MostPopular />
        </div>
        <div className="product__category p-4">
          <CategoryCars />
        </div>
      </div>
    </Layout>
  );
}
