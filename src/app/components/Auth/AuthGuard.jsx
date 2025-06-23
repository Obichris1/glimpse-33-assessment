"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import LoadingSpinner from "../LoadingSpinner";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (pathname.startsWith("/login") && token) {
      router.push("/");
    }

    if (!pathname.startsWith("/login") && !token) {
      router.push("/login");
    }
  }, [pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return children;
}
