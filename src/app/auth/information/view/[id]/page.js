"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import QRCode from "react-qr-code";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UserViewInformation() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const [fullUrl, setFullUrl] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  useEffect(() => {
    const storedData = localStorage.getItem("informationUser");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData); 
        if (parsedData.id) {
          setId(parsedData.id);
        } else {
          router.replace("/404");
        }
      } catch (error) {
        console.log("Error", error);
        router.replace("/404");
      }
    } else {
      router.replace("/404");
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/contact_information/${id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener datos del usuario", error);
        });
    }
  }, [id]);

  return (
    <>
      <div className="h-full px-3 py-4 dark:bg-gray-800">
        <div className="flex justify-end mx-4 mb-2">
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
        <div className="relative border-2 border-blue-500 rounded-md min-h-20 bg-blue-500">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-36 h-36 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
            <QRCode value={fullUrl} size={90} />
          </div>

          <div className="absolute top-52 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-2xl min-w-1/2 sm:min-w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-4">
            <div className="col-span-full flex justify-center">
              <Link href={fullUrl}>
                <span className="text-blue-500 underline whitespace-nowrap">
                  Abrir enlace QR
                </span>
              </Link>
            </div>

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
