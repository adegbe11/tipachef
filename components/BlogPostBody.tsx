import type { ContentBlock } from "@/lib/blog";

interface Props {
  blocks: ContentBlock[];
}

export function BlogPostBody({ blocks }: Props) {
  return (
    <div className="blog-body">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="blog-p">
                {block.text}
              </p>
            );

          case "h3":
            return (
              <h3 key={i} className="blog-h3">
                {block.text}
              </h3>
            );

          case "ul":
            return (
              <ul key={i} className="blog-ul">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="blog-ol">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );

          case "blockquote":
            return (
              <blockquote key={i} className="blog-blockquote">
                {block.text}
              </blockquote>
            );

          case "callout":
            return (
              <div key={i} className="blog-callout">
                {block.text}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
