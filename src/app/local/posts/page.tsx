"use client";

import React from "react";
import MainContainer from "@/components/container/MainContainer";
import { useBlogLocal } from "@/hooks/blog/useBlogLocal";
import { Typography } from "@/components/Typography";
import CardHero from "@/components/card/CardHero";
import CardBlog from "@/components/card/CardBlog";
import { Button } from "@mui/material";
import SelectLimit from "@/components/pagination/SelectLimit";
import Pagination from "@/components/pagination/Pagination";
import { useAtom } from "jotai";
import { blogLimitAtom, blogPageAtom } from "@/atoms/blogPaginationAtom";
import Link from "next/link";
import { formatDate } from "@/components/style-guide/utils";

function Page() {
  const { blogs, loading, createBlog } = useBlogLocal();
  const [page, setPage] = useAtom(blogPageAtom);
  const [limit, setLimit] = useAtom(blogLimitAtom);

  const totalPages = Math.ceil(blogs.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + limit);

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [page, totalPages, setPage]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <>
      <CardHero
        title={"Hello ini hero!Hello ini hero!Hello ini hero!Hello ini hero!"}
        category={"technology"}
        description={
          "This is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a description"
        }
        date={"2021-01-01"}
        author={"Ahmad Arroziqi"}
        imageUrl={"/placeholder/placeholder.svg"}
      />

      <MainContainer>
        <Typography variant={"h3"} className={"mb-8"}>
          Local Post
        </Typography>

        <div className="flex justify-between mb-4">
          <SelectLimit
            limit={limit}
            onChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />

          <Link href={"/local/posts/new"}>
            <Button variant={"outlined"}>Create New</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 xl:gap-4">
          {paginatedBlogs.length === 0 ? (
            <Typography>No posts available.</Typography>
          ) : (
            paginatedBlogs.map((post) => (
              <CardBlog
                key={post.id}
                href={`/local/posts/${post.id}`}
                title={post.title}
                category={post.category}
                date={formatDate(post.createdAt)}
                author={post.author}
                description={post.body}
                imageUrl={
                  post.thumbnailImage ?? "/placeholder/placeholder2.svg"
                }
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </MainContainer>
    </>
  );
}

export default Page;
