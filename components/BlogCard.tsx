import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface Props {
  post: BlogPost;
}

export function BlogCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group">
      <div className="blog-card__image-wrap">
        <Image
          src={post.featuredImage.url}
          alt={post.featuredImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="blog-card__image"
        />
        <span className="blog-card__category">{post.categoryLabel}</span>
      </div>
      <div className="blog-card__body">
        <p className="blog-card__meta">
          {post.date} &middot; {post.readMinutes} min read
        </p>
        <h2 className="blog-card__title">{post.title}</h2>
        <p className="blog-card__desc">{post.description}</p>
        <span className="blog-card__cta">Read article &rarr;</span>
      </div>
    </Link>
  );
}
