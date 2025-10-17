"use client";

import { Button, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { formatDate } from "@/components/style-guide/utils";
import { BlogLocalEntity } from "@/lib/features/blog-local/domain/entity/blogLocal.entity";

interface Props {
  post: BlogLocalEntity;
  onDelete: () => void;
  onBack: () => void;
}

export function PostDetailContent({ post, onDelete, onBack }: Props) {
  return (
    <div className="max-w-3xl mx-auto p-6 px-3 border border-border rounded-xl xl:px-6">
      {post.thumbnailImage && (
        <Image
          src={post.thumbnailImage}
          alt={post.title}
          width={1280}
          height={720}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <Typography variant="h4" className="font-semibold mb-2">
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        {formatDate(post.createdAt)}
      </Typography>

      <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 py-4 leading-relaxed">
        <ReactMarkdown
          components={{
            pre: ({ node, className, children, ...props }) => (
              <pre
                className={`overflow-x-auto bg-background-footer rounded-md p-4 leading-relaxed my-4 ${className ?? ""}`}
                {...props}
              >
                {children}
              </pre>
            ),
            code: ({
              node,
              inline: isInline,
              className,
              children,
              ...props
            }: any) => (
              <code
                className={`${
                  isInline
                    ? "bg-background-footer px-1 py-[2px] my-4 rounded"
                    : ""
                } ${className ?? ""}`}
                style={{ lineHeight: 1.6 }}
                {...props}
              >
                {children}
              </code>
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button color="error" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
