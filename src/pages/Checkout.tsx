import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  LockKeyhole,
  PackageCheck,
  Truck,
} from "lucide-react";
import { formatNumber, money } from "../data/products";
import { useCartTotals, useStore } from "../context/StoreContext";
import { OrderSummary } from "./Cart";
const latinDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (c) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(c)))
    .replace(/[٠-٩]/g, (c) => String("٠١٢٣٤٥٦٧٨٩".indexOf(c)));
const provinces = [
  "تهران",
  "البرز",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "آذربایجان شرقی",
  "گیلان",
  "مازندران",
  "خوزستان",
  "کرمان",
  "یزد",
  "سایر استان‌ها",
];
export default function Checkout() {
  const { cart, clearCart, notify } = useStore();
  const { shipping } = useCartTotals();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"normal" | "express">("normal");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [submitting, setSubmitting] = useState(false);
  if (!cart.length && !submitting) return <Navigate to="/cart" replace />;
  const cost = method === "express" ? 190000 : shipping;
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(latinDigits(phone))) {
      notify("شماره موبایل را به‌درستی وارد کنید");
      return;
    }
    if (latinDigits(postal).replace(/\D/g, "").length !== 10) {
      notify("کد پستی باید ۱۰ رقم باشد");
      return;
    }
    const orderNo = String(Math.floor(100000 + Math.random() * 899999));
    setSubmitting(true);
    navigate(`/success?order=${orderNo}`, { replace: true });
    clearCart();
  };
  return (
    <main className="container inner-page checkout-page">
      <div className="breadcrumbs">
        <Link to="/">خانه</Link>
        <span>/</span>
        <Link to="/cart">سبد خرید</Link>
        <span>/</span>
        <span>تکمیل سفارش</span>
      </div>
      <div className="page-heading">
        <span className="section-eyebrow">یک قدم تا رسیدن انتخاب‌هایتان</span>
        <h1>تکمیل سفارش</h1>
      </div>
      <div className="checkout-layout">
        <form id="checkout-form" onSubmit={submit} className="checkout-form">
          <div className="checkout-section">
            <div className="checkout-section-title">
              <span>۰۱</span>
              <h2>اطلاعات گیرنده</h2>
            </div>
            <div className="form-grid">
              <label className="form-field">
                <span>
                  نام و نام خانوادگی <b>*</b>
                </span>
                <input
                  required
                  minLength={3}
                  placeholder="مثلاً نازنین محمدی"
                  autoComplete="name"
                />
              </label>
              <label className="form-field">
                <span>
                  شماره موبایل <b>*</b>
                </span>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                  inputMode="tel"
                  dir="ltr"
                  autoComplete="tel"
                />
              </label>
            </div>
          </div>
          <div className="checkout-section">
            <div className="checkout-section-title">
              <span>۰۲</span>
              <h2>آدرس ارسال</h2>
            </div>
            <div className="form-grid">
              <label className="form-field">
                <span>
                  استان <b>*</b>
                </span>
                <span className="select-wrap">
                  <select required defaultValue="">
                    <option value="" disabled>
                      انتخاب استان
                    </option>
                    {provinces.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={17} />
                </span>
              </label>
              <label className="form-field">
                <span>
                  شهر <b>*</b>
                </span>
                <input
                  required
                  placeholder="نام شهر"
                  autoComplete="address-level2"
                />
              </label>
              <label className="form-field full">
                <span>
                  آدرس کامل <b>*</b>
                </span>
                <textarea
                  required
                  rows={3}
                  placeholder="خیابان، کوچه، پلاک و واحد"
                  autoComplete="street-address"
                />
              </label>
              <label className="form-field">
                <span>
                  کد پستی <b>*</b>
                </span>
                <input
                  required
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  placeholder="۱۰ رقم بدون خط تیره"
                  inputMode="numeric"
                  dir="ltr"
                  autoComplete="postal-code"
                />
              </label>
            </div>
          </div>
          <div className="checkout-section">
            <div className="checkout-section-title">
              <span>۰۳</span>
              <h2>روش ارسال</h2>
            </div>
            <div className="shipping-options">
              <label className={method === "normal" ? "selected" : ""}>
                <input
                  type="radio"
                  name="shipping"
                  checked={method === "normal"}
                  onChange={() => setMethod("normal")}
                />
                <span className="radio-circle" />
                <span className="ship-option-text">
                  <strong>ارسال عادی</strong>
                  <small>تحویل طی ۳ تا ۵ روز کاری</small>
                </span>
                <strong>{shipping === 0 ? "رایگان" : money(shipping)}</strong>
              </label>
              <label className={method === "express" ? "selected" : ""}>
                <input
                  type="radio"
                  name="shipping"
                  checked={method === "express"}
                  onChange={() => setMethod("express")}
                />
                <span className="radio-circle" />
                <span className="ship-option-text">
                  <strong>ارسال سریع</strong>
                  <small>تحویل طی ۱ تا ۲ روز کاری</small>
                </span>
                <strong>{money(190000)}</strong>
              </label>
            </div>
          </div>
          <div className="checkout-assurance">
            <LockKeyhole size={17} /> اطلاعات شما فقط برای ارسال سفارش استفاده
            می‌شود.
          </div>
          <button
            form="checkout-form"
            type="submit"
            className="button-dark checkout-submit"
          >
            ثبت سفارش <ArrowLeft size={18} />
          </button>
        </form>
        <div className="checkout-summary">
          <OrderSummary checkout shippingOverride={cost} />
          <div className="checkout-help">
            <Truck size={21} />
            <span>برای هماهنگی ارسال، همکاران ما در کنارتان هستند.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
export function Success() {
  const order =
    new URLSearchParams(window.location.search).get("order") || "۱۴۰۵۰۰";
  return (
    <main className="container success-page">
      <div className="success-icon">
        <Check size={32} />
      </div>
      <span className="section-eyebrow">از همراهی شما سپاسگزاریم</span>
      <h1>
        سفارش شما با موفقیت
        <br />
        ثبت شد.
      </h1>
      <p>
        انتخاب‌هایتان به‌زودی راهی خانه شما می‌شوند. اطلاعات سفارش برایتان ارسال
        خواهد شد.
      </p>
      <div className="success-order">
        <PackageCheck size={22} />
        <span>شماره سفارش</span>
        <strong>{formatNumber(Number(order))}</strong>
      </div>
      <Link to="/shop" className="button-dark">
        بازگشت به فروشگاه <ArrowLeft size={18} />
      </Link>
    </main>
  );
}
