"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Information() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const encodedEmail = encodeURIComponent(formData.email); // Codificar email para evitar problemas en la URL
      const response = await axios.post(
        `http://localhost:8000/api/user_email/${encodedEmail}`
      );

      console.log("response", response);
  
      if (response?.data?.id !== null) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          confirmButtonColor: "#3B82F6",
          confirmButtonText: "Aceptar",
        });
  
        localStorage.setItem("informationUser", JSON.stringify(response.data));
        router.push("/auth/information/view");
      }else{
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
          confirmButtonColor: "#3B82F6",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold ">Validar Correo</h2>
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6"
            >
              <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Ver información
          </button>
        </form>
      </div>
    </div>
  );
}
