// /app/users/layout.js
"use client";

import Siderbar from "../components/ui/sidebar/page";

export default function UsersLayout({ children }) {
  return (
    <>
      <div className="min-h-full">
        <Siderbar>{children}</Siderbar>
      </div>
    </>
  );
}
