import { GetMe } from "@/app/actions/authAction";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
];

export default async function Navbar() {
  const { user } = await GetMe();
  return (
    <div className="flex items-center justify-between gap-5 py-5">
      {navLinks.map((navItem, index) => (
        <Link
          className="bg-white text-black px-5 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:shadow hover:shadow-white"
          key={index}
          href={navItem.path}
        >
          {navItem.name}
        </Link>
      ))}
      {user ? (
        <div className="flex items-center gap-x-3">
          <p className="bg-blue-500 text-white px-5 py-2 rounded-sm">
            {user.name}
          </p>
          <LogoutButton />
        </div>
      ) : (
        <Link
          className="bg-white text-black px-5 py-2 rounded-md hover:bg-gray-700 hover:text-white hover:shadow hover:shadow-white"
          href={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  );
}
