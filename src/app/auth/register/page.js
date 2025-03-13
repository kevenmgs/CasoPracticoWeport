"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone: "",
    address: "",
    name_contac_emerg: "",
    phone_contac_emerg: "",
    email: "",
    password: "",
  });

  const [token, setToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  console.log("token", token);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    //de formData parsear el campo phone a number y phone_contac_emerg a number
    formData.phone = parseInt(formData.phone);
    formData.phone_contac_emerg = parseInt(formData.phone_contac_emerg);

    console.log(formData);

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create_user",
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: response.data.message,
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(token ? "/users" : "/");
        }
      });

      setFormData({
        name: "",
        last_name: "",
        phone: "",
        address: "",
        name_contac_emerg: "",
        phone_contac_emerg: "",
        email: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.detail || "No se pudo registrar usuario",
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "Aceptar",
      });

    }
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold ">Registro de Usuario</h2>
            <Link href={token ? "/users" : "/"}>
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
            {[
              "name",
              "last_name",
              "phone",
              "address",
              "name_contac_emerg",
              "phone_contac_emerg",
              "email",
              "password",
            ].map((field) => (
              <input
                key={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "password"
                    ? "password"
                    : "text"
                }
                name={field}
                placeholder={field.replace("_", " ")}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
