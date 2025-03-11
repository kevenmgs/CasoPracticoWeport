"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import QRCode from "react-qr-code";

export default function ViewInformation() {
  const [user, setUser] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("informationUser")));
  }, []);

  useEffect(() => {
    if (user === null) {
      router.replace("/auth/information");
    }
  }, [user]);


  return (
    <>
      <div className="h-full px-3 py-4 dark:bg-gray-800">
        <div className="flex justify-end my-2">
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
              className="size-6 text-blue-500 cursor-pointer"
            >
              <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </button>
        </div>

        <div className="relative border-2 border-blue-500 rounded-md min-h-20 bg-blue-500">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
            <QRCode value={pathname} size={90} />
          </div>

          <div className="absolute top-52 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-2xl min-w-1/2 sm:min-w-2/3  grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-4">
            <strong>Nombre:</strong>
            <span>{user?.name}</span>
            <strong>Apellidos:</strong>
            <span>{user?.last_name}</span>
            <strong>Nombre de contacto de emergencia:</strong>
            <span>{user?.name_contac_emerg}</span>
            <strong>Teléfono de contacto de emergencia:</strong>
            <span>{user?.phone_contac_emerg}</span>
          </div>
        </div>
      </div>
    </>
  );
}
