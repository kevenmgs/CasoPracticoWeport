"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(false);
  const [fullUrl, setFullUrl] = useState(""); 
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setId(localStorage.getItem("id_user"));
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token === null) {
      router.replace("/404");
    }
  }, [token]);

  useEffect(() => {
    if (id && token) {
      axios
        .get(`http://localhost:8000/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("response", response);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("error", error);
        });
    }
  }, [id, token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);


  return (
    <>
      <div className="h-full px-3 py-4 dark:bg-gray-800">
        <div className="relative border-2 border-blue-500 rounded-md min-h-20 bg-blue-500">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
            <QRCode value={fullUrl} size={90} /> {/* Se usa la URL completa */}
          </div>

          <div className="absolute top-52 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-2xl min-w-1/2 sm:min-w-2/3  grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-4">
            <strong>Nombre:</strong>
            <span>{user?.name}</span>
            <strong>Apellidos:</strong>
            <span>{user?.last_name}</span>
            <strong>Teléfono:</strong>
            <span>{user?.phone}</span>
            <strong>Correo:</strong>
            <span>{user?.email}</span>
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
