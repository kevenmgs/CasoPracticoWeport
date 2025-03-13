"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import worport from "../../../../public/imgs/weport.png";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    let formData = {
      email: email,
      password: password,
    };

    console.log("formData", formData);

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      console.log('response', response.data.message);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: response.data.message,
          confirmButtonColor: "#3B82F6",
          confirmButtonText: "Aceptar",
        });

        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("id_user", JSON.stringify(response.data.id_user));
        router.push("/users");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.detail || "No se pudo iniciar sesión",
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-4 bg-white p-8 rounded-lg shadow-2xl w-96">
        <Image
          src={worport}
          alt="logo"
          width={100}
          height={100}
          className="rounded-full"
        />

        <form onSubmit={handleLogin} className="w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Iniciar Sesión
          </h2>


          <div className="mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6 mx-2"
            >
              <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <input
              type="email"
              className="w-full px-4 py-2 border-b-2 border-gray-400 focus:border-blue-500 outline-none"
              value={email}
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6 mx-2"
            >
              <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input
              type="password"
              className="w-full px-4 py-2 border-b-2 border-gray-400 focus:border-blue-500 outline-none"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>

          <div className="flex justify-between items-center mt-4">
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline mt-4 block text-center"
            >
              Registrarse
            </Link>

            <Link
              href="/auth/information"
              className="text-blue-500 hover:underline mt-4 block text-center"
            >
              Revisar información
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
