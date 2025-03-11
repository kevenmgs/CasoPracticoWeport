// // import Image from "next/image";
// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function Home() {

//   const [formData, setFormData] = useState({
//     name: "",
//     last_name: "",
//     phone: "",
//     address: "",
//     name_contac_emerg: "",
//     phone_contac_emerg: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
    
//     //de formData parsear el campo phone a number y phone_contac_emerg a number
//     formData.phone = parseInt(formData.phone);
//     formData.phone_contac_emerg = parseInt(formData.phone_contac_emerg);

//     console.log(formData);



//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/create_user", formData);
//       alert(response.data.message);
//       setFormData({
//         name: "",
//         last_name: "",
//         phone: "",
//         address: "",
//         name_contac_emerg: "",
//         phone_contac_emerg: "",
//         email: "",
//         password: "",
//       });
//     } 
//     catch (error) {
//       alert("Error al registrar usuario", error);
//     }
//   };
//   return (
//     // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//     //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//     //     <Image
//     //       className="dark:invert"
//     //       src="/next.svg"
//     //       alt="Next.js logo"
//     //       width={180}
//     //       height={38}
//     //       priority
//     //     />
//     //     <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//     //       <li className="mb-2">
//     //         Get started by editing{" "}
//     //         <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//     //           src/app/page.tsx
//     //         </code>
//     //         .
//     //       </li>
//     //       <li>Save and see your changes instantly.</li>
//     //     </ol>

//     //     <div className="flex gap-4 items-center flex-col sm:flex-row">
//     //       <a
//     //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//     //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         <Image
//     //           className="dark:invert"
//     //           src="/vercel.svg"
//     //           alt="Vercel logomark"
//     //           width={20}
//     //           height={20}
//     //         />
//     //         Deploy now
//     //       </a>
//     //       <a
//     //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//     //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //       >
//     //         Read our docs
//     //       </a>
//     //     </div>
//     //   </main>
//     //   <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/file.svg"
//     //         alt="File icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Learn
//     //     </a>
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/window.svg"
//     //         alt="Window icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Examples
//     //     </a>
//     //     <a
//     //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//     //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       <Image
//     //         aria-hidden
//     //         src="/globe.svg"
//     //         alt="Globe icon"
//     //         width={16}
//     //         height={16}
//     //       />
//     //       Go to nextjs.org →
//     //     </a>
//     //   </footer>
//     // </div>
//       // <span>idcji</span>
//       <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {["name", "last_name", "phone", "address", "name_contac_emerg", "phone_contac_emerg", "email", "password"].map((field) => (
//             <input
//               key={field}
//               type={field === "email" ? "email" : field === "password" ? "password" : "text"}
//               name={field}
//               placeholder={field.replace("_", " ")}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           ))}
//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//             Registrar
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
