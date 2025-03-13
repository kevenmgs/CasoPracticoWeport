import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Img from "next/image";
import weport from "../../../../../public/imgs/weport.png";
import { usePathname } from "next/navigation";

export default function Sidebar({ children }) {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const userId = localStorage.getItem("id_user");
    if (!userId) {
      router.push("/404");
    } else {
      setId(userId);
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {!id ? null : (
        <>
          <button
            onClick={toggleSidebar}
            aria-controls="separator-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>

          <aside
            id="separator-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-blue-500 dark:bg-gray-800">
              <div className="flex justify-center items-center">
                <Img
                  src={weport}
                  alt="logo"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>

              <button
                onClick={toggleSidebar}
                className={`fixed top-5 left-52 z-50 bg-transparent bg-opacity-50 ${
                  isSidebarOpen ? "block" : "hidden"
                } sm:hidden`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="size-6 text-white font-bold"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>

              <ul className="mt-3 space-y-3 font-medium">
                <li>
                  <Link
                    href={`/users/${id}`}
                    className={`flex items-center p-2 rounded-lg group ${
                      pathname === `/users/${id}`
                        ? "bg-white text-gray-900"
                        : "text-white dark:text-white hover:bg-white hover:text-gray-900"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                      className="flex-shrink-0 w-5 h-5 transition duration-75"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Mi información
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/users"
                    className={`flex items-center p-2 rounded-lg group ${
                      pathname === "/users"
                        ? "bg-white text-gray-900"
                        : "text-white dark:text-white hover:bg-white hover:text-gray-900"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                      className="flex-shrink-0 w-5 h-5 transition duration-75"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Usuarios
                    </span>
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id_user");
                      router.push("/");
                    }}
                    className="flex w-full text-start p-2 text-white rounded-lg dark:text-white hover:bg-white hover:text-gray-900 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 22"
                      className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H15"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Cerrar sesión
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64">
            <div className="p-4 dark:border-gray-700">{children}</div>
          </div>
        </>
      )}
    </>
  );
}
