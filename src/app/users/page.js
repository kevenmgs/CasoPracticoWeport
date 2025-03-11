"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Users() {
  const [token, setToken] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token === null) {
      router.replace("/404");
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [token]);

  return (
    <>
      <div className="flex justify-end items-center  ">
        <Link href="/auth/register">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-tertiary font-bold py-2 px-4 rounded">
            Crear Usuario
          </button>
        </Link>
      </div>
      <div className="w-full relative overflow-x-auto my-2">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-blue-500 text-tertiary rounded-t-md text-white">
              <th className="px-4 py-2 text-center text-sm truncate rounded-tl-lg">
                ID
              </th>
              <th className="px-4 py-2 text-center text-sm truncate">Nombre</th>
              <th className="px-4 py-2 text-center text-sm truncate">
                Apellido
              </th>

              <th className="px-4 py-2 text-center text-sm truncate">
                Correo Electrónico
              </th>
              <th className="px-4 py-2 text-center text-sm truncate">
                Teléfono
              </th>
              <th className="px-4 py-2 text-center text-sm truncate">
                Dirección
              </th>
              <th className="px-4 py-2 text-center text-sm truncate">
                Contacto de Emergencia
              </th>
              <th className="px-4 py-2 text-center text-sm truncate rounded-tr-lg">
                Teléfono de Emergencia
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.length === 1 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Aún no hay empleados registrados
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="px-4 py-3 text-center">{user.id}</td>
                  <td className="px-4 py-3 text-center">{user.name}</td>
                  <td className="px-4 py-3 text-center">{user.last_name}</td>
                  <td className="px-4 py-3 text-center">{user.email}</td>
                  <td className="px-4 py-3 text-center">{user.phone}</td>
                  <td className="px-4 py-3 text-center">{user.address}</td>
                  <td className="px-4 py-3 text-center">
                    {user.name_contac_emerg}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {user.phone_contac_emerg}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
