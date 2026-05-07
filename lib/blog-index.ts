import { ALL_POSTS as POSTS_1_TO_10 } from "./blog-posts";
import { POSTS_11_TO_30 } from "./blog-posts-2";
import { BLOG_POSTS_3 } from "./blog-posts-3";
import { BLOG_POSTS_4 } from "./blog-posts-4";
import type { BlogPost } from "./blog";

export const ALL_POSTS: BlogPost[] = [
  ...POSTS_1_TO_10,
  ...POSTS_11_TO_30,
  ...BLOG_POSTS_3,
  ...BLOG_POSTS_4,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return ALL_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs
    .map((slug) => ALL_POSTS.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined);
}

export const CATEGORIES = [
  { value: "for-diners", label: "For Diners" },
  { value: "for-chefs", label: "For Chefs" },
  { value: "restaurant-owners", label: "Restaurant Owners" },
  { value: "industry", label: "Industry" },
];
