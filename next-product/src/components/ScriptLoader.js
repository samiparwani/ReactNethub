"use client";

import Script from 'next/script';

export default function ScriptLoader() {
  return (
    <>
      {/* Load additional scripts that might be needed */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jqvmap/1.5.1/jquery.vmap.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jqvmap/1.5.1/maps/jquery.vmap.world.js"
        strategy="lazyOnload"
      />
    </>
  );
}