"use client";

import { Logout } from "@/app/actions/authAction";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    toast.success("Logged out successfully");
    await Logout();
    router.refresh();
  };

  return (
    <Button variant={"secondary"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
