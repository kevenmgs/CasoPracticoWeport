"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import QRCode from "react-qr-code";
import Link from "next/link";

export default function ViewInformation() {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [fullUrl, setFullUrl] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("informationUser"));
    if (!userId) {
      router.push("/404");
    } else {
      setUser(userId);
    }
  }, [router]);

  useEffect(() => {
    if (user === null) {
      router.replace("/auth/information");
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathname}/${user?.id}`);
    }
  }, [pathname, user]);

  return (
    <>
      {!user ? null : (
        <>
          <div className="flex justify-end m-4">
            <button
              onClick={() => {
                localStorage.removeItem("informationUser");
                router.push("/auth/information");
              }}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="size-10 text-blue-500 cursor-pointer"
              >
                <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>
          </div>
          <div className="h-full px-3 py-4 dark:bg-gray-800 flex items-center justify-center">
            <div className="w-52 h-52 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
              <QRCode value={fullUrl} size={100} />
            </div>
          </div>
          <div className="flex justify-center m-4">
            <Link href={fullUrl}>
              <span className="text-blue-500 underline">Abrir enlace QR</span>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
