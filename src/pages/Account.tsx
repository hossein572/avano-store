import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, Package, UserRound } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatNumber } from "../data/products";
type Tab = "info" | "orders" | "addresses" | "favorites";
const tabs: { id: Tab; label: string; icon: typeof UserRound }[] = [
  { id: "info", label: "اطلاعات شخصی", icon: UserRound },
  { id: "orders", label: "سفارش‌های من", icon: Package },
  { id: "addresses", label: "آدرس‌ها", icon: MapPin },
  { id: "favorites", label: "علاقه‌مندی‌ها", icon: Heart },
];
export default function Account() {
  const [tab, setTab] = useState<Tab>("info");
  const { wishlist, notify } = useStore();
  return (
    <main className="container inner-page account-page">
      <div className="breadcrumbs">
        <Link to="/">خانه</Link>
        <span>/</span>
        <span>حساب کاربری</span>
      </div>
      <div className="page-heading">
        <span className="section-eyebrow">فضای شخصی شما</span>
        <h1>حساب کاربری</h1>
      </div>
      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-person">
            <span className="avatar">ن</span>
            <div>
              <strong>نازنین عزیز</strong>
              <small>به آوانو خوش آمدید</small>
            </div>
          </div>
          <div className="account-nav">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={tab === t.id ? "active" : ""}
                onClick={() => setTab(t.id)}
              >
                <t.icon size={19} strokeWidth={1.6} />
                {t.label}
                <ArrowLeft size={16} />
              </button>
            ))}
          </div>
        </aside>
        <section className="account-content">
          {tab === "info" && (
            <>
              <h2>اطلاعات شخصی</h2>
              <p className="muted">
                اطلاعات شما برای تجربه خرید راحت‌تر نگهداری می‌شود.
              </p>
              <div className="account-fields">
                <label className="form-field">
                  <span>نام و نام خانوادگی</span>
                  <input defaultValue="نازنین محمدی" />
                </label>
                <label className="form-field">
                  <span>شماره موبایل</span>
                  <input defaultValue="۰۹۱۲***۴۵۶۷" dir="ltr" />
                </label>
                <label className="form-field">
                  <span>ایمیل</span>
                  <input defaultValue="nazanin@example.com" dir="ltr" />
                </label>
                <label className="form-field">
                  <span>تاریخ تولد</span>
                  <input placeholder="روز / ماه / سال" />
                </label>
              </div>
              <button
                className="button-dark account-save"
                onClick={() => notify("تغییرات شما ذخیره شد")}
              >
                ذخیره تغییرات
              </button>
            </>
          )}
          {tab === "orders" && (
            <>
              <h2>سفارش‌های من</h2>
              <p className="muted">وضعیت آخرین انتخاب‌های شما</p>
              <div className="mock-order">
                <div>
                  <span>سفارش شماره ۱۴۰۵۰۱۲۸</span>
                  <strong>تحویل داده شده</strong>
                </div>
                <p>ثبت‌شده در ۲۲ شهریور ۱۴۰۵ · ۲ کالا</p>
                <Link to="/shop">
                  خرید دوباره <ArrowLeft size={16} />
                </Link>
              </div>
              <div className="mock-order">
                <div>
                  <span>سفارش شماره ۱۴۰۵۰۰۹۴</span>
                  <strong>تحویل داده شده</strong>
                </div>
                <p>ثبت‌شده در ۱۱ مرداد ۱۴۰۵ · ۱ کالا</p>
                <Link to="/shop">
                  خرید دوباره <ArrowLeft size={16} />
                </Link>
              </div>
            </>
          )}
          {tab === "addresses" && (
            <>
              <h2>آدرس‌های من</h2>
              <p className="muted">آدرس‌های ذخیره‌شده برای ارسال سفارش</p>
              <div className="address-box">
                <MapPin size={21} />
                <div>
                  <strong>
                    خانه <small>پیش‌فرض</small>
                  </strong>
                  <p>
                    تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه یاس، پلاک
                    ۱۲، واحد ۴
                  </p>
                  <span>نازنین محمدی · ۰۹۱۲***۴۵۶۷</span>
                </div>
              </div>
              <button
                className="outline-button"
                onClick={() => notify("افزودن آدرس در نسخه نمایشی غیرفعال است")}
              >
                + افزودن آدرس جدید
              </button>
            </>
          )}
          {tab === "favorites" && (
            <>
              <h2>علاقه‌مندی‌ها</h2>
              <p className="muted">
                {formatNumber(wishlist.length)} محصول در فهرست شماست.
              </p>
              <div className="account-fav">
                <Heart size={32} strokeWidth={1} />
                <p>انتخاب‌های مورد علاقه‌تان، همیشه در دسترس شما هستند.</p>
                <Link to="/wishlist" className="text-link">
                  مشاهده علاقه‌مندی‌ها <ArrowLeft size={17} />
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
