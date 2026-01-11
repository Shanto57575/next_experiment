import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs",
  description: "All Blogs page",
};

export interface IBlog {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function BlogPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const allBlogs = await response.json();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="my-6">Blog Page</h1>
      <div className="grid grid-cols-3 gap-5 mt-6">
        {allBlogs?.map((blog: IBlog) => (
          <Link
            href={`/blog/${blog.id}`}
            className="bg-white text-black shadow p-4 rounded-md"
            key={blog.id}
          >
            <h1 className="text-blue-500">{blog.title}</h1>
            <p className="text-xs">{blog.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
