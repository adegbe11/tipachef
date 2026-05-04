import Link from "next/link";
import Image from "next/image";
import { ALL_POSTS, CATEGORIES } from "@/lib/blog-index";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 86400;

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams.category ?? "all";
  const filtered =
    activeCategory === "all"
      ? ALL_POSTS
      : ALL_POSTS.filter((p) => p.category === activeCategory);

  const featured = ALL_POSTS[0];
  const rest = filtered.filter((p) => p.slug !== featured.slug);

  return (
    <main className="blog-index">
      {/* Nav */}
      <nav className="blog-nav" aria-label="Main navigation">
        <Link href="/" className="blog-nav__logo">
          Tip a Chef
        </Link>
        <Link href="/search" className="blog-nav__cta">
          Tip a Chef Now
        </Link>
      </nav>

      {/* Hero / Featured post */}
      <section className="blog-hero">
        <div className="blog-hero__image-wrap">
          <Image
            src={featured.featuredImage.url}
            alt={featured.featuredImage.alt}
            fill
            priority
            sizes="100vw"
            className="blog-hero__image"
          />
          <div className="blog-hero__overlay" />
        </div>
        <div className="blog-hero__content">
          <span className="blog-hero__category">{featured.categoryLabel}</span>
          <h1 className="blog-hero__title">{featured.title}</h1>
          <p className="blog-hero__desc">{featured.description}</p>
          <Link href={`/blog/${featured.slug}`} className="blog-hero__btn">
            Read article
          </Link>
        </div>
      </section>

      {/* Category filter */}
      <section className="blog-filters">
        <div className="blog-filters__inner">
          <Link
            href="/blog"
            className={`blog-filter-btn ${activeCategory === "all" ? "blog-filter-btn--active" : ""}`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/blog?category=${cat.value}`}
              className={`blog-filter-btn ${activeCategory === cat.value ? "blog-filter-btn--active" : ""}`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Post grid */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="blog-footer-cta">
        <h2 className="blog-footer-cta__title">
          The chef behind your favourite meal deserves to know.
        </h2>
        <p className="blog-footer-cta__sub">
          Send a direct tip in seconds. No app needed.
        </p>
        <Link href="/search" className="blog-footer-cta__btn">
          Tip a Chef Now
        </Link>
      </section>
    </main>
  );
}
