import React from 'react';

export default function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block mr-3 text-indigo-600"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path
        d="M20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38C29.9411 38 38 29.9411 38 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="4 4"
      />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <path
        d="M20 8L22 14L28 16L22 18L20 24L18 18L12 16L18 14L20 8Z"
        fill="currentColor"
      />
    </svg>
  );
}