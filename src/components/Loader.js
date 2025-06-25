'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100">
      <div className="w-64 h-64">
        <DotLottieReact
          src="https://lottie.host/89f2f3b4-fdeb-4b7d-a255-0b9bccbe5fdb/67H3tj0qx7.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
