"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useBlogLocal } from "@/hooks/blog/useBlogLocal";
import { TextInput } from "@/components/input/TextInput";

export function SearchInputNavbar() {
  const router = useRouter();
  const { blogs } = useBlogLocal();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!query) return [];
    return blogs
      .filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query, blogs]);

  const handleSelect = (id: string) => {
    setQuery("");
    setShowResults(false);
    router.push(`/local/posts/${id}`);
  };

  return (
    <div className="relative w-full max-w-xs">
      <TextInput
        type="text"
        placeholder="Search..."
        value={query}
        onFocus={() => setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 150)}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-3"
      />

      {showResults && filteredPosts.length > 0 && (
        <ul className="absolute z-50 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 overflow-hidden shadow-lg">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onMouseDown={() => handleSelect(post.id)}
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
