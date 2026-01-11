import { IBlog } from "../page";

type Props = {
  params: Promise<{ id: string }>;
};

async function getBlog(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  return {
    title: `NextBlog | ${blog.title}`,
    description: blog.body,
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const blogs = await res.json();

  return blogs.map((blog: IBlog) => ({
    id: blog.id.toString(),
  }));
}

export default async function BlogDetailsPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  return (
    <div className="bg-white text-black shadow-md shadow-blue-500 max-w-80 mx-auto p-4 rounded-xl">
      <h1 className="uppercase font-bold text-blue-400 my-3">{blog.title}</h1>
      <p className="text-justify">{blog.body}</p>
    </div>
  );
}
