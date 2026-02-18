"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { myAppHook } from "@/context/AppProvider";
// import Loader from "@/components/Loader";

export default function HomePage() {
  const { authToken, isLoading } = myAppHook();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (authToken) {
        router.push("/dashboard");
      } else {
        router.push("/auth");
      }
    }
  }, [authToken, isLoading, router]);

//   return <Loader />;
}