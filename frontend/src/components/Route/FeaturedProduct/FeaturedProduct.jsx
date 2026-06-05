import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";

function FeaturedProduct() {
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="text-2xl font-semibold mb-4">Featured Products</h1>
      </div>

      <div className="grid grid-cols-2 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] mb-12 border-0">
        {productData &&
          productData.slice(0, 12).map((i, index) => <ProductCard data={i} key={index}/>)}
      </div>
    </div>
  );
}

export default FeaturedProduct;
