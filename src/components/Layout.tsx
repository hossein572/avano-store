import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  Instagram,
  Send,
} from "lucide-react";
import { products, matchesSearch } from "../data/products";
import { useCartTotals, useStore } from "../context/StoreContext";
const nav = [
  { label: "فروشگاه", to: "/shop" },
  { label: "جدیدها", to: "/shop?sort=new" },
  { label: "لباس", to: "/shop?category=لباس" },
  { label: "کیف", to: "/shop?category=کیف" },
  { label: "اکسسوری", to: "/shop?category=اکسسوری" },
  { label: "پیشنهادها", to: "/shop?sort=sale" },
];
export function ScrollTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, search]);
  return null;
}
export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCartTotals();
  const { wishlist } = useStore();
  const loc = useLocation();
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [loc]);
  return (
    <>
      <div className="announcement">
        ارسال رایگان برای خریدهای بالای ۳ میلیون تومان{" "}
        <span className="announcement-sep">/</span> تجربه‌ای از انتخاب‌های
        متفاوت
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <div className="header-right">
            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
            >
              <Menu size={23} />
            </button>
            <Link to="/" className="brand" aria-label="آوانو، صفحه اصلی">
              آوانو<span className="brand-dot">.</span>
            </Link>
          </div>
          <nav className="desktop-nav" aria-label="فهرست اصلی">
            {nav.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  isActive &&
                  loc.search ===
                    (item.to.includes("?") ? "?" + item.to.split("?")[1] : "")
                    ? "active"
                    : ""
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-btn"
              aria-label="جستجو"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={21} strokeWidth={1.6} />
            </button>
            <Link
              className="icon-btn desktop-icon"
              to="/account"
              aria-label="حساب کاربری"
            >
              <UserRound size={21} strokeWidth={1.6} />
            </Link>
            <Link
              className="icon-btn desktop-icon has-count"
              to="/wishlist"
              aria-label="علاقه‌مندی‌ها"
            >
              <Heart size={21} strokeWidth={1.6} />
              {wishlist.length > 0 && <i>{wishlist.length}</i>}
            </Link>
            <Link
              className="icon-btn has-count"
              to="/cart"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={21} strokeWidth={1.6} />
              {count > 0 && <i>{count}</i>}
            </Link>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <aside className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <span className="brand">
                آوانو<span className="brand-dot">.</span>
              </span>
              <button
                className="icon-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="بستن منو"
              >
                <X />
              </button>
            </div>
            <p className="drawer-kicker">دنیای آوانو</p>
            {nav.map((item) => (
              <Link key={item.label} to={item.to} className="mobile-menu-link">
                {item.label}
                <ArrowUpLeft size={18} />
              </Link>
            ))}
            <div className="mobile-menu-bottom">
              <Link to="/account">حساب کاربری</Link>
              <Link to="/wishlist">علاقه‌مندی‌ها</Link>
            </div>
          </aside>
        </div>
      )}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <nav className="bottom-nav" aria-label="دسترسی سریع">
        <Link to="/">
          <span className="bottom-home">آ</span>
          <span>خانه</span>
        </Link>
        <Link to="/shop">
          <Menu size={21} />
          <span>فروشگاه</span>
        </Link>
        <button onClick={() => setSearchOpen(true)}>
          <Search size={21} />
          <span>جستجو</span>
        </button>
        <Link to="/wishlist">
          <Heart size={21} />
          <span>علاقه‌مندی</span>
        </Link>
        <Link to="/cart" className="bottom-cart">
          <ShoppingBag size={21} />
          {count > 0 && <i>{count}</i>}
          <span>سبد خرید</span>
        </Link>
      </nav>
    </>
  );
}
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const results = query.trim()
    ? products.filter((p) => matchesSearch(p, query)).slice(0, 4)
    : products.filter((p) => p.isBestSeller).slice(0, 4);
  const go = (q: string) => {
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    onClose();
  };
  return (
    <div className="search-backdrop" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="container search-inner">
          <div className="search-top">
            <span className="small-label">جستجو در آوانو</span>
            <button
              className="icon-btn"
              onClick={onClose}
              aria-label="بستن جستجو"
            >
              <X />
            </button>
          </div>
          <form
            className="search-field"
            onSubmit={(e) => {
              e.preventDefault();
              go(query);
            }}
          >
            <Search size={26} strokeWidth={1.4} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="دنبال چه چیزی می‌گردید؟"
            />
            <button type="submit" aria-label="نمایش نتایج">
              <ArrowLeft size={23} />
            </button>
          </form>
          <div className="search-content">
            <div>
              <span className="small-label">
                {query ? "محصولات مرتبط" : "پیشنهادهای آوانو"}
              </span>
              <div className="search-results">
                {results.length ? (
                  results.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} onClick={onClose}>
                      <img src={p.images[0]} alt="" />
                      <span>
                        <strong>{p.name}</strong>
                        <small>{p.category}</small>
                      </span>
                      <ArrowUpLeft size={17} />
                    </Link>
                  ))
                ) : (
                  <p className="muted">
                    محصولی پیدا نشد. عبارت دیگری را امتحان کنید.
                  </p>
                )}
              </div>
            </div>
            <div className="search-quick">
              <span className="small-label">جستجوهای محبوب</span>
              {["کت زنانه", "کیف چرم", "گردنبند", "کفش تخت"].map((t) => (
                <button key={t} onClick={() => go(t)}>
                  {t}
                  <ArrowUpLeft size={16} />
                </button>
              ))}
              <span className="small-label search-category-title">
                دسته‌بندی‌ها
              </span>
              <div className="search-categories">
                {["لباس", "کیف", "اکسسوری", "کفش"].map((c) => (
                  <Link key={c} to={`/shop?category=${c}`} onClick={onClose}>
                    {c}
                  </Link>
                ))}
              </div>
              <div className="search-hint">
                برای دیدن همه نتایج، عبارت مورد نظرتان را جستجو کنید.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about">
            <Link to="/" className="footer-brand">
              آوانو<span>.</span>
            </Link>
            <p>
              انتخاب‌هایی برای آن‌چه هستید، نه آن‌چه باید باشید. مجموعه‌ای با
              دقت انتخاب‌شده برای هر روز شما.
            </p>
            <div className="social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام"
              >
                <Instagram size={19} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="تلگرام"
              >
                <Send size={18} />
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h4>خرید</h4>
              <Link to="/shop">همه محصولات</Link>
              <Link to="/shop?sort=new">تازه‌ها</Link>
              <Link to="/shop?category=لباس">لباس</Link>
              <Link to="/shop?category=کیف">کیف</Link>
            </div>
            <div>
              <h4>راهنما</h4>
              <Link to="/account">حساب کاربری</Link>
              <Link to="/cart">پیگیری سفارش</Link>
              <Link to="/shop">راهنمای خرید</Link>
              <Link to="/checkout">ارسال و بازگشت</Link>
            </div>
            <div>
              <h4>ارتباط با ما</h4>
              <a href="mailto:hello@avano.shop">hello@avano.shop</a>
              <a href="tel:02191000000">۰۲۱ - ۹۱۰۰ ۰۰۰۰</a>
              <span>شنبه تا پنجشنبه، ۹ تا ۱۸</span>
            </div>
          </div>
          <div className="newsletter">
            <h4>نامه‌ای از آوانو</h4>
            <p>از تازه‌ها و قصه‌های پشت انتخاب‌ها، زودتر باخبر شوید.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setDone(true);
              }}
            >
              <input
                type="email"
                dir="ltr"
                placeholder="ایمیل شما"
                aria-label="ایمیل شما"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button aria-label="عضویت در خبرنامه" type="submit">
                {done ? <Check size={20} /> : <ArrowLeft size={20} />}
              </button>
            </form>
            {done && <small>خوشحالیم که همراه ما هستید.</small>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© ۱۴۰۵ آوانو. همه حقوق محفوظ است.</span>
          <span>با دقت انتخاب شده، برای شما.</span>
        </div>
      </div>
    </footer>
  );
}
export function Toast() {
  const { toast } = useStore();
  return (
    <div role="status" className={`toast ${toast ? "show" : ""}`}>
      <Check size={18} />
      {toast}
    </div>
  );
}
export function SectionHeader({
  eyebrow,
  title,
  link = "/shop",
  linkText = "مشاهده همه",
}: {
  eyebrow: string;
  title: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <Link className="text-link" to={link}>
        {linkText}
        <ArrowLeft size={19} />
      </Link>
    </div>
  );
}
