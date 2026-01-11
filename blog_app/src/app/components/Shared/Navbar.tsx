import Link from "next/link";

export default function Navbar() {
  const NavLinks = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <div className="flex items-center justify-center gap-5 py-5">
      {NavLinks.map((nl, index) => (
        <Link
          className="bg-white text-black hover:bg-slate-500 hover:text-white px-5 py-2 rounded-md"
          key={index}
          href={nl.path}
        >
          {nl.name}
        </Link>
      ))}
    </div>
  );
}
