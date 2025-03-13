"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(null);
  const [qrUrl, setQrUrl] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    const storedId = localStorage.getItem("id_user");
    const storedToken = localStorage.getItem("token");

    if (storedId && storedToken) {
      setId(storedId);
      setToken(storedToken);
    } else {
      router.replace("/404");
    }
  }, [router]);

  useEffect(() => {
    if (id && token) {
      axios
        .get(`http://localhost:8000/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario", error);
        });
    }
  }, [id, token]);

  useEffect(() => {
    if (user) {
      setQrUrl(`${window.location.origin}/users/${user.id}`);
    }
  }, [user]);
  console.log("qrUrl", qrUrl);

  return (
    <div className="h-full px-3 py-4 dark:bg-gray-800">
      <div className="relative border-2 border-blue-500 rounded-md min-h-20 bg-blue-500">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
          <QRCode value={qrUrl} size={90} />
        </div>

        <div className="absolute top-52 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-2xl min-w-1/2 sm:min-w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-4">
          <div className="col-span-full flex justify-center">
            <Link href={qrUrl}>
              <span className="text-blue-500 underline whitespace-nowrap">
                Abrir enlace QR
              </span>
            </Link>
          </div>

          <strong>Nombre:</strong>
          <span>{user?.name}</span>
          <strong>Apellidos:</strong>
          <span>{user?.last_name}</span>
          <strong>Correo electrónico:</strong>
          <span>{user?.email}</span>
          <strong>Teléfono:</strong>
          <span>{user?.phone}</span>
          <strong>Dirección:</strong>
          <span>{user?.address}</span>
          <strong>Nombre de contacto de emergencia:</strong>
          <span>{user?.name_contac_emerg}</span>
          <strong>Teléfono de contacto de emergencia:</strong>
          <span>{user?.phone_contac_emerg}</span>
        </div>
      </div>
    </div>
  );
}
