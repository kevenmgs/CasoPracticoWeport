"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import weport from "../../../public/imgs/weport.png";
import Image from "next/image";

export default function NotFoundPage() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl w-11/12 sm:w-96">
        <Image
          src={weport}
          alt="Logo"
          className="mx-auto mb-4 w-32 h-32 object-contain"
        />
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Página no encontrada</h1>
        <p className="text-lg text-gray-700 mb-6">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link href={token ? "/users" : "/"}>
          <span className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
            
            Regresar al inicio
          </span>
        </Link>
      </div>
    </div>
  );
}
