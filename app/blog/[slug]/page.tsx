import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ALL_POSTS, getPostBySlug, getRelatedPosts } from "@/lib/blog-index";
import { BLOG_AUTHOR } from "@/lib/blog";
import { BlogPostBody } from "@/components/BlogPostBody";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 86400;

export async function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.seoTitle,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: BLOG_AUTHOR.name }],
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: `https://tipachef.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [BLOG_AUTHOR.name],
      images: [
        {
          url: post.featuredImage.url,
          width: 1200,
          height: 630,
          alt: post.featuredImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.description,
      images: [post.featuredImage.url],
    },
    alternates: { canonical: `https://tipachef.com/blog/${post.slug}` },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.featuredImage.url,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR.name,
      jobTitle: BLOG_AUTHOR.title,
      url: "https://tipachef.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Tip a Chef",
      logo: {
        "@type": "ImageObject",
        url: "https://tipachef.com/android-chrome-192x192.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tipachef.com/blog/${post.slug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="blog-post">
        {/* Nav */}
        <nav className="blog-nav" aria-label="Main navigation">
          <Link href="/" className="blog-nav__logo">
            Tip a Chef
          </Link>
          <div className="blog-nav__links">
            <Link href="/blog" className="blog-nav__link">
              Blog
            </Link>
            <Link href="/search" className="blog-nav__cta">
              Tip a Chef Now
            </Link>
          </div>
        </nav>

        {/* Hero image */}
        <div className="blog-post__hero">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            priority
            sizes="100vw"
            className="blog-post__hero-img"
          />
          <div className="blog-post__hero-overlay" />
        </div>

        {/* Article container */}
        <article className="blog-post__article">
          {/* Breadcrumb */}
          <nav className="blog-post__breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true"> / </span>
            <Link href={`/blog?category=${post.category}`}>
              {post.categoryLabel}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{post.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="blog-post__meta">
            <span className="blog-post__category">{post.categoryLabel}</span>
            <span className="blog-post__date">{post.date}</span>
            <span className="blog-post__read">{post.readMinutes} min read</span>
          </div>

          {/* Title */}
          <h1 className="blog-post__title">{post.title}</h1>

          {/* Author */}
          <div className="blog-post__author">
            <Image
              src={BLOG_AUTHOR.image}
              alt={BLOG_AUTHOR.name}
              width={40}
              height={40}
              className="blog-post__author-img"
            />
            <div>
              <p className="blog-post__author-name">{BLOG_AUTHOR.name}</p>
              <p className="blog-post__author-title">{BLOG_AUTHOR.title}</p>
            </div>
          </div>

          {/* Intro */}
          <p className="blog-post__intro">{post.intro}</p>

          {/* Sections */}
          {post.sections.map((section, i) => (
            <section key={i} className="blog-post__section">
              <h2 className="blog-post__h2">{section.h2}</h2>
              <BlogPostBody blocks={section.blocks} />
            </section>
          ))}

          {/* Conclusion */}
          <div className="blog-post__conclusion">
            <p>{post.conclusion}</p>
          </div>

          {/* Inline CTA */}
          <div className="blog-post__cta-box">
            <p className="blog-post__cta-text">
              The chef who made your meal deserves to know how good it was.
            </p>
            <Link href="/search" className="blog-post__cta-btn">
              Tip a Chef Now
            </Link>
          </div>

          {/* FAQs */}
          <section className="blog-post__faqs" aria-label="Frequently asked questions">
            <h2 className="blog-post__faqs-title">Frequently Asked Questions</h2>
            {post.faqs.map((faq, i) => (
              <details key={i} className="blog-post__faq">
                <summary className="blog-post__faq-q">{faq.q}</summary>
                <p className="blog-post__faq-a">{faq.a}</p>
              </details>
            ))}
          </section>

          {/* Author bio */}
          <div className="blog-post__author-bio">
            <Image
              src={BLOG_AUTHOR.image}
              alt={BLOG_AUTHOR.name}
              width={64}
              height={64}
              className="blog-post__author-bio-img"
            />
            <div>
              <p className="blog-post__author-bio-name">
                {BLOG_AUTHOR.name} &middot; {BLOG_AUTHOR.title}
              </p>
              <p className="blog-post__author-bio-text">{BLOG_AUTHOR.bio}</p>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="blog-post__related">
            <div className="blog-post__related-inner">
              <h2 className="blog-post__related-title">Related Articles</h2>
              <div className="blog-grid blog-grid--3">
                {related.map((rp) => (
                  <BlogCard key={rp.slug} post={rp} />
                ))}
              </div>
            </div>
          </section>
        )}

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
    </>
  );
}
