import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatNumber, money, products } from "../data/products";
import { useCartTotals, useStore } from "../context/StoreContext";
export function OrderSummary({
  shippingOverride,
  checkout = false,
}: {
  shippingOverride?: number;
  checkout?: boolean;
}) {
  const { subtotal, shipping } = useCartTotals();
  const { cart } = useStore();
  const cost = shippingOverride ?? shipping;
  return (
    <div className="order-summary">
      <h2>خلاصه سفارش</h2>
      {checkout && (
        <div className="summary-products">
          {cart.map((item) => {
            const p = products.find((x) => x.id === item.productId)!;
            return (
              <div key={item.key}>
                <img src={p.images[0]} alt="" />
                <span>
                  {p.name}
                  <small>
                    {formatNumber(item.quantity)} عدد / {item.color}
                  </small>
                </span>
                <strong>{money(p.price * item.quantity)}</strong>
              </div>
            );
          })}
        </div>
      )}
      <div className="summary-row">
        <span>جمع کالاها</span>
        <span>{money(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>هزینه ارسال</span>
        <span>{cost === 0 ? "رایگان" : money(cost)}</span>
      </div>
      <div className="summary-total">
        <strong>مبلغ نهایی</strong>
        <strong>{money(subtotal + cost)}</strong>
      </div>
      {!checkout && (
        <>
          <Link to="/checkout" className="button-dark summary-cta">
            ادامه فرایند خرید <ArrowLeft size={19} />
          </Link>
          <p className="summary-note">
            هزینه نهایی ارسال در مرحله بعد تأیید می‌شود.
          </p>
        </>
      )}
    </div>
  );
}
export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const { count, subtotal } = useCartTotals();
  return (
    <main className="container inner-page cart-page">
      <div className="breadcrumbs">
        <Link to="/">خانه</Link>
        <span>/</span>
        <span>سبد خرید</span>
      </div>
      <div className="page-heading">
        <span className="section-eyebrow">انتخاب‌های شما</span>
        <h1>
          سبد خرید <small>({formatNumber(count)})</small>
        </h1>
      </div>
      {cart.length ? (
        <div className="cart-layout">
          <div className="cart-items">
            <div className="cart-table-head">
              <span>محصول</span>
              <span>تعداد</span>
              <span>قیمت</span>
            </div>
            {cart.map((item) => {
              const p = products.find((x) => x.id === item.productId)!;
              return (
                <div className="cart-item" key={item.key}>
                  <Link to={`/product/${p.id}`} className="cart-item-image">
                    <img src={p.images[0]} alt={p.name} />
                  </Link>
                  <div className="cart-item-info">
                    <span className="cart-item-category">{p.category}</span>
                    <Link to={`/product/${p.id}`} className="cart-item-name">
                      {p.name}
                    </Link>
                    <span className="cart-item-options">
                      رنگ: {item.color} <i /> سایز: {item.size}
                    </span>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(item.key)}
                    >
                      <Trash2 size={15} /> حذف
                    </button>
                  </div>
                  <div className="cart-item-quantity">
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        aria-label="کم کردن تعداد"
                      >
                        <Minus size={15} />
                      </button>
                      <span>{formatNumber(item.quantity)}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        aria-label="زیاد کردن تعداد"
                        disabled={item.quantity >= p.stock}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                  <strong className="cart-item-price">
                    {money(p.price * item.quantity)}
                  </strong>
                </div>
              );
            })}
            <div className="cart-continue">
              <Link to="/shop">
                ادامه خرید <ArrowLeft size={17} />
              </Link>
              <span>
                {subtotal < 3000000
                  ? `تا ارسال رایگان، ${money(3000000 - subtotal)} دیگر`
                  : "سفارش شما شامل ارسال رایگان است."}
              </span>
            </div>
          </div>
          <OrderSummary />
        </div>
      ) : (
        <div className="empty-state cart-empty">
          <div className="empty-symbol">
            <ShoppingBag size={39} strokeWidth={1} />
          </div>
          <h2>سبد خریدتان هنوز خالی است</h2>
          <p>اینجا جایی برای انتخاب‌هایی است که دوستشان دارید.</p>
          <Link to="/shop" className="button-dark">
            کشف محصولات <ArrowLeft size={18} />
          </Link>
        </div>
      )}
    </main>
  );
}
