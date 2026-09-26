import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { products, formatNumber } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
export default function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <main className="container inner-page wishlist-page">
      <div className="breadcrumbs">
        <Link to="/">خانه</Link>
        <span>/</span>
        <span>علاقه‌مندی‌ها</span>
      </div>
      <div className="page-heading">
        <span className="section-eyebrow">چیزهایی که دوست دارید</span>
        <h1>
          علاقه‌مندی‌ها <small>({formatNumber(items.length)})</small>
        </h1>
      </div>
      {items.length ? (
        <div className="product-grid wishlist-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-symbol">
            <Heart size={39} strokeWidth={1} />
          </div>
          <h2>هنوز چیزی به علاقه‌مندی‌ها اضافه نکرده‌اید</h2>
          <p>
            محصولات مورد علاقه‌تان را اینجا نگه دارید تا بعداً راحت‌تر پیدایشان
            کنید.
          </p>
          <Link to="/shop" className="button-dark">
            دیدن محصولات <ArrowLeft size={18} />
          </Link>
        </div>
      )}
    </main>
  );
}
