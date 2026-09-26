import { useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatNumber, money, type Product } from "../data/products";
import { useStore } from "../context/StoreContext";
export default function ProductCard({
  product,
  showRating = false,
  list = false,
}: {
  product: Product;
  showRating?: boolean;
  list?: boolean;
}) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [loaded, setLoaded] = useState(false);
  return (
    <article className={`product-card ${list ? "product-list-card" : ""}`}>
      <div className={`product-image-wrap ${loaded ? "" : "image-loading"}`}>
        <Link
          to={`/product/${product.id}`}
          className="product-image-link"
          aria-label={`مشاهده ${product.name}`}
        >
          <img
            className="product-img-primary"
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          {product.images[1] && (
            <img
              className="product-img-secondary"
              src={product.images[1]}
              alt=""
              loading="lazy"
            />
          )}
        </Link>
        <div className="product-tags">
          {product.stock === 0 ? (
            <span className="tag sold-out">ناموجود</span>
          ) : product.discount ? (
            <span className="tag discount">
              ٪{formatNumber(product.discount)} تخفیف
            </span>
          ) : product.isNew ? (
            <span className="tag">جدید</span>
          ) : null}
        </div>
        <button
          className={`favorite-btn ${wishlist.includes(product.id) ? "selected" : ""}`}
          aria-label={
            wishlist.includes(product.id)
              ? "حذف از علاقه‌مندی‌ها"
              : "افزودن به علاقه‌مندی‌ها"
          }
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            size={19}
            fill={wishlist.includes(product.id) ? "currentColor" : "none"}
            strokeWidth={1.7}
          />
        </button>
        {product.stock > 0 && (
          <button
            className="quick-add"
            onClick={() =>
              addToCart(product, product.colors[0].name, product.sizes[0])
            }
          >
            <Plus size={18} /> افزودن سریع
          </button>
        )}
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          {showRating ? (
            <span className="rating">
              <Star size={13} fill="currentColor" />{" "}
              {formatNumber(product.rating)}{" "}
              <span className="review-count">
                ({formatNumber(product.reviews)})
              </span>
            </span>
          ) : (
            <span className={`stock-label ${product.stock === 0 ? "out" : ""}`}>
              {product.stock === 0
                ? "ناموجود"
                : product.stock <= 5
                  ? "موجودی محدود"
                  : "موجود"}
            </span>
          )}
        </div>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price">
          <strong>{money(product.price)}</strong>
          {product.oldPrice && <del>{money(product.oldPrice)}</del>}
        </div>
      </div>
    </article>
  );
}
