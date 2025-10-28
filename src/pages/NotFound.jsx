import React from "react";

function NotFound() {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 class="text-5xl font-bold text-[#4f46e5] mb-4">404</h1>
      <p class="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        class="bg-[#4f46e5] text-white px-4 py-2 rounded-lg hover:bg-[#4338ca]"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
