import {
  ArrowLeft,
  ArrowUpLeft,
  MoveLeft,
  Truck,
  RefreshCcw,
  BadgeCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { SectionHeader } from "../components/Layout";
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-index">کالکشن ۰۱ / بهار و تابستان ۱۴۰۵</span>
            <div className="hero-content">
              <span className="hero-rule" />
              <h1>
                برای انتخاب‌هایی
                <br />
                که قرار نیست <br />
                <em>تکراری باشند.</em>
              </h1>
              <p>مجموعه‌ای منتخب از لباس، کیف و اکسسوری برای سبک شخصی شما.</p>
              <div className="hero-actions">
                <Link to="/shop" className="button-dark">
                  مشاهده کالکشن <ArrowLeft size={19} />
                </Link>
                <Link to="/shop?sort=new" className="underlined-link">
                  محصولات جدید
                </Link>
              </div>
            </div>
            <div className="hero-bottom">
              <span>آوانو، به سبک خودت.</span>
              <span>۰۱ — ۰۴</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={asset("images/hero-editorial.webp")}
              alt="مدل با استایل مینیمال و کیف چرمی آوانو"
            />
            <div className="hero-visual-note">
              <span>
                روایت تازه‌ای از
                <br />
                سادگی و ظرافت
              </span>
              <span className="vertical-line" />
            </div>
          </div>
        </div>
      </section>
      <div className="benefits container">
        <div><Truck size={23} strokeWidth={1.35} /><span>ارسال رایگان بالای ۳ میلیون تومان</span></div>
        <div><RefreshCcw size={22} strokeWidth={1.35} /><span>۷ روز فرصت بازگشت</span></div>
        <div><BadgeCheck size={23} strokeWidth={1.35} /><span>انتخاب‌شده با دقت، برای شما</span></div>
      </div>
      <section className="section container fresh-section">
        <SectionHeader eyebrow="۰۱ / تازه رسیده" title="تازه‌های آوانو" link="/shop?sort=new" />
        <div className="product-grid home-grid">
          {[2, 10, 17, 20].map((id) => products.find((p) => p.id === id)!).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="section container categories-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">۰۲ / دنیای آوانو</span>
            <h2>هر انتخاب، یک قصه</h2>
          </div>
          <p className="section-intro">از لباس‌هایی برای هر روز، تا جزئیاتی که همه‌چیز را تغییر می‌دهند.</p>
        </div>
        <div className="category-grid">
          <Link to="/shop?category=لباس" className="category-tile category-clothes">
            <img src={asset("images/products/02.webp")} alt="کالکشن لباس زنانه" loading="lazy" />
            <div className="category-content"><span>۰۱ / پوشیدنی‌ها</span><strong>لباس</strong><span className="category-arrow"><ArrowUpLeft size={22} /></span></div>
          </Link>
          <Link to="/shop?category=کیف" className="category-tile category-bags">
            <img src={asset("images/bag-cutout.webp")} alt="کیف چرمی آوانو، تصویر بدون پس‌زمینه" loading="lazy" />
            <div className="category-content"><span>۰۲ / همراه هر روز</span><strong>کیف</strong><span className="category-arrow"><ArrowUpLeft size={22} /></span></div>
          </Link>
          <Link to="/shop?category=اکسسوری" className="category-tile category-accessories">
            <img src={asset("images/jewelry-editorial.webp")} alt="اکسسوری‌های آوانو" loading="lazy" />
            <div className="category-content"><span>۰۳ / نقطه پایان</span><strong>اکسسوری</strong><span className="category-arrow"><ArrowUpLeft size={22} /></span></div>
          </Link>
          <Link to="/shop?category=کفش" className="category-tile category-shoes">
            <img src={asset("images/shoe-cutout.webp")} alt="کفش چرمی آوانو، تصویر بدون پس‌زمینه" loading="lazy" />
            <div className="category-content"><span>۰۴ / قدم بعدی</span><strong>کفش</strong><span className="category-arrow"><ArrowUpLeft size={22} /></span></div>
          </Link>
        </div>
      </section>
      <section className="editorial">
        <div className="container editorial-inner">
          <div className="editorial-image">
            <img src={asset("images/jewelry-editorial.webp")} alt="جزئیات اکسسوری‌های منتخب آوانو" loading="lazy" />
            <span className="editorial-image-caption">یک نگاه نزدیک‌تر به جزئیات</span>
          </div>
          <div className="editorial-copy">
            <span className="section-eyebrow">یادداشت آوانو / ۰۱</span>
            <span className="editorial-mark">«</span>
            <h2>جزئیات کوچک،<br /><em>تفاوت بزرگ.</em></h2>
            <p>گاهی آنچه یک استایل را ماندگار می‌کند، نه چیزهای بزرگ، که انتخاب‌های کوچک و به‌جا است. ما به همین جزئیات فکر کرده‌ایم.</p>
            <Link to="/shop?category=اکسسوری" className="text-link">کشف اکسسوری‌ها <MoveLeft size={19} /></Link>
          </div>
        </div>
      </section>
      <section className="section container best-section">
        <SectionHeader eyebrow="۰۳ / انتخاب شما" title="محبوب‌ترین‌ها" link="/shop?sort=popular" />
        <div className="product-grid home-grid">
          {[1, 12, 19, 23].map((id) => products.find((p) => p.id === id)!).map((p) => (
            <ProductCard key={p.id} product={p} showRating />
          ))}
        </div>
      </section>
      <section className="closing-strip container">
        <div><span className="section-eyebrow">فلسفه آوانو</span><h2>کمتر، اما بهتر.</h2></div>
        <p>ما به انتخاب‌هایی باور داریم که از مد روز فراتر می‌روند؛ چیزهایی که دوست دارید بارها و بارها بپوشید.</p>
        <Link to="/shop" aria-label="دیدن همه محصولات"><ArrowLeft size={28} /></Link>
      </section>
    </main>
  );
}