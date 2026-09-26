import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Check,
  ChevronDown,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  categories,
  formatNumber,
  products,
  matchesSearch,
  type Category,
} from "../data/products";
import ProductCard from "../components/ProductCard";
const featuredOrder = [
  2, 10, 17, 20, 1, 11, 15, 23, 3, 12, 16, 21, 4, 13, 18, 22, 5, 14, 19, 24, 6,
  7, 8, 9,
];
const colorOptions = [
  { name: "مشکی", hex: "#292929" },
  { name: "سفید", hex: "#f4f1e9" },
  { name: "کرم", hex: "#e6dfd1" },
  { name: "بژ", hex: "#c7b59c" },
  { name: "قهوه‌ای", hex: "#795b48" },
  { name: "نقره‌ای", hex: "#c0bfba" },
];
export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") as Category | null;
  const q = params.get("q") || "";
  const sort = params.get("sort") || "featured";
  const [search, setSearch] = useState(q);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    setSearch(q);
  }, [q]);
  useEffect(() => {
    setFiltersOpen(false);
  }, [sort, q]);
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);
  const update = (key: string, value: string) => {
    const p = new URLSearchParams(params);
    if (value) p.set(key, value);
    else p.delete(key);
    setParams(p);
  };
  const toggle = (value: string, list: string[], set: (v: string[]) => void) =>
    set(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
    );
  const filtered = useMemo(() => {
    let items = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!q || matchesSearch(p, q)) &&
        p.price <= maxPrice &&
        (!inStock || p.stock > 0) &&
        (!colors.length || p.colors.some((c) => colors.includes(c.name))) &&
        (!sizes.length || p.sizes.some((s) => sizes.includes(s))),
    );
    if (sort === "featured")
      items.sort(
        (a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id),
      );
    else if (sort === "new")
      items = items.filter((p) => p.isNew).sort((a, b) => b.id - a.id);
    else if (sort === "sale") items = items.filter((p) => p.discount);
    else if (sort === "popular") items.sort((a, b) => b.reviews - a.reviews);
    else if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
    return items;
  }, [category, q, maxPrice, colors, sizes, inStock, sort]);
  const reset = () => {
    setParams({});
    setMaxPrice(5000000);
    setColors([]);
    setSizes([]);
    setInStock(false);
    setSearch("");
  };
  const sidebar = (
    <div className="filter-content">
      <div className="filter-group filter-search">
        <h3>جستجوی محصول</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update("q", search);
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="نام محصول..."
            aria-label="جستجوی محصول"
          />
          <button type="submit" aria-label="جستجو">
            <Search size={17} />
          </button>
        </form>
      </div>
      <div className="filter-group">
        <h3>دسته‌بندی</h3>
        <button
          className={`filter-category ${!category ? "active" : ""}`}
          onClick={() => update("category", "")}
        >
          همه محصولات <span>{formatNumber(products.length)}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-category ${category === cat ? "active" : ""}`}
            onClick={() => update("category", cat)}
          >
            {cat}
            <span>
              {formatNumber(products.filter((p) => p.category === cat).length)}
            </span>
          </button>
        ))}
      </div>
      <div className="filter-group">
        <h3>محدوده قیمت</h3>
        <input
          className="price-range"
          type="range"
          min="500000"
          max="5000000"
          step="100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="بیشترین قیمت"
        />
        <div className="range-labels">
          <span>از ۵۰۰٬۰۰۰</span>
          <span>تا {formatNumber(maxPrice)} تومان</span>
        </div>
      </div>
      <div className="filter-group">
        <h3>رنگ</h3>
        <div className="filter-colors">
          {colorOptions.map((c) => (
            <button
              key={c.name}
              className={colors.includes(c.name) ? "chosen" : ""}
              onClick={() => toggle(c.name, colors, setColors)}
              title={c.name}
              aria-label={c.name}
            >
              <i style={{ background: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <h3>سایز</h3>
        <div className="filter-sizes">
          {["۳۶", "۳۷", "۳۸", "۳۹", "۴۰", "۴۲", "۴۴", "تک‌سایز"].map((s) => (
            <button
              key={s}
              className={sizes.includes(s) ? "active" : ""}
              onClick={() => toggle(s, sizes, setSizes)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group stock-filter">
        <label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />{" "}
          فقط کالاهای موجود
        </label>
      </div>
      <button className="clear-filters" onClick={reset}>
        پاک کردن همه فیلترها <X size={15} />
      </button>
    </div>
  );
  return (
    <main className="container shop-page">
      <div className="breadcrumbs">
        <Link to="/">خانه</Link>
        <span>/</span>
        <span>فروشگاه</span>
        {category && (
          <>
            <span>/</span>
            <span>{category}</span>
          </>
        )}
      </div>
      <div className="shop-heading">
        <div>
          <span className="section-eyebrow">انتخاب‌هایی برای شما</span>
          <h1>
            {q
              ? `نتایج جستجو برای «${q}»`
              : category
                ? category
                : sort === "new"
                  ? "تازه‌های آوانو"
                  : sort === "sale"
                    ? "پیشنهادهای ویژه"
                    : "فروشگاه آوانو"}
          </h1>
          <p>چیزهایی که با دقت انتخاب شده‌اند تا بخشی از روزهای شما باشند.</p>
        </div>
        <span className="shop-count">
          {formatNumber(filtered.length)} محصول
        </span>
      </div>
      <div className="shop-layout">
        <aside className="filters-sidebar">
          <div className="sidebar-heading">
            فیلترها <SlidersHorizontal size={17} />
          </div>
          {sidebar}
        </aside>
        <div className="shop-main">
          <div className="shop-toolbar">
            <div className="shop-toolbar-right">
              <button
                className="mobile-filter-toggle"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={18} /> فیلترها
              </button>
              <span className="desktop-results">
                نمایش {formatNumber(filtered.length)} محصول
              </span>
            </div>
            <div className="shop-toolbar-left">
              <label className="sort-select">
                مرتب‌سازی:{" "}
                <select
                  value={sort}
                  onChange={(e) => update("sort", e.target.value)}
                >
                  <option value="featured">پیشنهادی</option>
                  <option value="new">جدیدترین</option>
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                  <option value="sale">تخفیف‌دار</option>
                </select>
                <ChevronDown size={15} />
              </label>
              <div className="view-switch">
                <button
                  className={view === "grid" ? "active" : ""}
                  onClick={() => setView("grid")}
                  aria-label="نمایش شبکه‌ای"
                >
                  <Grid2X2 size={19} />
                </button>
                <button
                  className={view === "list" ? "active" : ""}
                  onClick={() => setView("list")}
                  aria-label="نمایش فهرستی"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
          {q && (
            <div className="search-query-bar">
              <Search size={17} />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  update("q", search);
                }}
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="جستجو در محصولات"
                />
              </form>
              <button onClick={() => update("q", "")} aria-label="حذف جستجو">
                <X size={16} />
              </button>
            </div>
          )}
          {filtered.length ? (
            <div
              className={`product-grid shop-product-grid ${view === "list" ? "list-view" : ""}`}
            >
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  showRating={view === "list"}
                  list={view === "list"}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-symbol">
                <Search size={36} strokeWidth={1} />
              </div>
              <h2>چیزی پیدا نکردیم</h2>
              <p>فیلترها را تغییر دهید یا عبارت دیگری را جستجو کنید.</p>
              <button className="button-dark" onClick={reset}>
                نمایش همه محصولات
              </button>
            </div>
          )}
        </div>
      </div>
      {filtersOpen && (
        <div className="drawer-backdrop" onClick={() => setFiltersOpen(false)}>
          <aside className="filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top">
              <h2>فیلترها</h2>
              <button
                className="icon-btn"
                onClick={() => setFiltersOpen(false)}
              >
                <X />
              </button>
            </div>
            {sidebar}
            <button
              className="button-dark filter-apply"
              onClick={() => setFiltersOpen(false)}
            >
              نمایش {formatNumber(filtered.length)} محصول <Check size={18} />
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
