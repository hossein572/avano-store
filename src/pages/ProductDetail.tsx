import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RefreshCcw,
  Ruler,
  ShieldCheck,
  Star,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import { formatNumber, money, products } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { SectionHeader } from "../components/Layout";
export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [image, setImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [guide, setGuide] = useState(false);
  const [openInfo, setOpenInfo] = useState("");
  const { addToCart, wishlist, toggleWishlist, notify } = useStore();
  useEffect(() => {
    setImage(0);
    setColor("");
    setSize("");
    setQuantity(1);
    setZoom(false);
  }, [id]);
  if (!product)
    return (
      <main className="container empty-state">
        <h1>این محصول پیدا نشد</h1>
        <Link to="/shop" className="button-dark">
          بازگشت به فروشگاه
        </Link>
      </main>
    );
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const handleAdd = () => {
    if (!color) {
      notify("لطفاً رنگ محصول را انتخاب کنید");
      return;
    }
    if (!size) {
      notify("لطفاً سایز محصول را انتخاب کنید");
      return;
    }
    addToCart(product, color, size, quantity);
  };
  return (
    <main className="container detail-page">
      <div className="breadcrumbs">
        <Link to="/">خانه</Link>
        <span>/</span>
        <Link to="/shop">فروشگاه</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`}>
          {product.category}
        </Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="detail-layout">
        <div className="detail-gallery">
          <div
            className="detail-main-image"
            onClick={() => setZoom(true)}
            title="برای بزرگ‌نمایی کلیک کنید"
          >
            <img
              src={product.images[image]}
              alt={`${product.name} - نمای ${formatNumber(image + 1)}`}
            />
            <span className="zoom-hint">
              <ZoomIn size={19} /> بزرگ‌نمایی
            </span>
            {product.discount && (
              <span className="detail-discount">
                ٪{formatNumber(product.discount)} تخفیف
              </span>
            )}
          </div>
          <div className="detail-thumbnails">
            {product.images.map((src, i) => (
              <button
                key={src}
                className={image === i ? "active" : ""}
                onClick={() => setImage(i)}
                aria-label={`نمای ${formatNumber(i + 1)}`}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <span className="section-eyebrow">آوانو / {product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <Star size={15} fill="currentColor" />
            <strong>{formatNumber(product.rating)}</strong>
            <span>از {formatNumber(product.reviews)} نظر</span>
            <span className="detail-divider" />{" "}
            <span className={product.stock === 0 ? "unavailable" : "available"}>
              {product.stock === 0
                ? "ناموجود"
                : product.stock <= 5
                  ? "موجودی محدود"
                  : "موجود در انبار"}
            </span>
          </div>
          <div className="detail-price">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && <del>{money(product.oldPrice)}</del>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-separator" />
          <div className="selector-block">
            <div className="selector-heading">
              <strong>رنگ</strong>
              <span>{color || "یک رنگ انتخاب کنید"}</span>
            </div>
            <div className="color-choices">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  className={color === c.name ? "active" : ""}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                  aria-label={`رنگ ${c.name}`}
                >
                  <i style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>
          <div className="selector-block">
            <div className="selector-heading">
              <strong>سایز</strong>
              {(product.category === "لباس" || product.category === "کفش") && (
                <button
                  className="size-guide-trigger"
                  onClick={() => setGuide(true)}
                >
                  <Ruler size={16} /> راهنمای سایز
                </button>
              )}
            </div>
            <div className="size-choices">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={size === s ? "active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="selector-block quantity-block">
            <strong>تعداد</strong>
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="کم کردن تعداد"
              >
                <Minus size={16} />
              </button>
              <span>{formatNumber(quantity)}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                aria-label="زیاد کردن تعداد"
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="detail-actions">
            <button
              className="button-dark add-cart-button"
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              {product.stock === 0
                ? "در حال حاضر ناموجود"
                : "افزودن به سبد خرید"}{" "}
              <ArrowLeft size={19} />
            </button>
            <button
              className={`detail-wishlist ${wishlist.includes(product.id) ? "selected" : ""}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <Heart
                size={21}
                fill={wishlist.includes(product.id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <div className="detail-services">
            <div>
              <Truck size={20} />
              <span>ارسال به سراسر ایران</span>
            </div>
            <div>
              <RefreshCcw size={20} />
              <span>۷ روز فرصت بازگشت</span>
            </div>
            <div>
              <ShieldCheck size={20} />
              <span>تضمین کیفیت آوانو</span>
            </div>
          </div>
          <div className="detail-accordions">
            {[
              {
                title: "جزئیات محصول",
                text: `${product.description} برای نگهداری بهتر، طبق دستورالعمل روی برچسب محصول عمل کنید.`,
              },
              {
                title: "ارسال و بازگشت",
                text: "سفارش‌ها طی ۲ تا ۵ روز کاری ارسال می‌شوند. تا ۷ روز پس از دریافت، امکان درخواست بازگشت محصول استفاده‌نشده وجود دارد.",
              },
            ].map((a) => (
              <div key={a.title}>
                <button
                  onClick={() =>
                    setOpenInfo(openInfo === a.title ? "" : a.title)
                  }
                >
                  {a.title}
                  <ChevronDown
                    className={openInfo === a.title ? "rotated" : ""}
                    size={18}
                  />
                </button>
                {openInfo === a.title && <p>{a.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <section className="section related-section">
        <SectionHeader
          eyebrow="برای کامل‌کردن انتخابتان"
          title="شاید دوست داشته باشید"
          link={`/shop?category=${product.category}`}
        />
        <div className="product-grid home-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      {zoom && (
        <div className="zoom-modal" onClick={() => setZoom(false)}>
          <button onClick={() => setZoom(false)} aria-label="بستن">
            <X />
          </button>
          <img src={product.images[image]} alt={product.name} />
        </div>
      )}
      {guide && (
        <div className="modal-backdrop" onClick={() => setGuide(false)}>
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setGuide(false)}>
              <X />
            </button>
            <span className="section-eyebrow">راهنمای انتخاب</span>
            <h2>راهنمای سایز</h2>
            <p>
              برای انتخاب دقیق‌تر، اندازه‌های خود را با جدول زیر مقایسه کنید.
            </p>
            {product.category === "کفش" ? (
              <table>
                <thead>
                  <tr>
                    <th>سایز</th>
                    <th>۳۷</th>
                    <th>۳۸</th>
                    <th>۳۹</th>
                    <th>۴۰</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>طول پا (سانتی‌متر)</td>
                    <td>۲۳٫۵</td>
                    <td>۲۴</td>
                    <td>۲۴٫۵</td>
                    <td>۲۵</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>سایز</th>
                    <th>دور سینه</th>
                    <th>دور کمر</th>
                    <th>دور باسن</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["۳۶", "۸۴", "۶۶", "۹۰"],
                    ["۳۸", "۸۸", "۷۰", "۹۴"],
                    ["۴۰", "۹۲", "۷۴", "۹۸"],
                    ["۴۲", "۹۶", "۷۸", "۱۰۲"],
                    ["۴۴", "۱۰۰", "۸۲", "۱۰۶"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <small>
              اندازه‌ها به سانتی‌متر هستند. برای اطمینان بیشتر با پشتیبانی آوانو
              در تماس باشید.
            </small>
          </div>
        </div>
      )}
    </main>
  );
}
