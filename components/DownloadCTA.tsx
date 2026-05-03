"use client";

import Image from "next/image";

export default function DownloadCTA() {
  return (
    <section id="download" className="relative min-h-[88vh] overflow-hidden">

      {/* Full-bleed chef photo */}
      <div className="absolute inset-0">
        <Image
          src="/chef.png"
          alt="Tip a Chef"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Cube card — far left, clear of the T */}
      <div className="absolute top-[60%] -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
        <div
          className="bg-white rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl p-5 gap-3"
          style={{ width: "160px", height: "160px" }}
        >
          <Image
            src="/tipchef-logo.png"
            alt="Tip a Chef"
            width={30}
            height={30}
            className="rounded-xl flex-shrink-0"
          />

          <a
            href="/signup"
            className="press w-full py-2 rounded-xl bg-graphite text-ivory font-sans font-semibold hover:bg-ash transition-all duration-200 shadow text-center flex-shrink-0"
            style={{ fontSize: "0.68rem" }}
          >
            Get started free
          </a>

          <p className="font-sans text-smoke flex-shrink-0" style={{ fontSize: "0.6rem" }}>
            Chef?{" "}
            <a href="/login" className="text-graphite font-semibold underline underline-offset-2 hover:text-ember-dark transition-colors">
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
