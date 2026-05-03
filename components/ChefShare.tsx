"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface ChefShareProps {
  slug: string;
  chefName: string;
}

export default function ChefShare({ slug, chefName }: ChefShareProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const firstName = chefName.split(" ")[0];

  function copyLink() {
    navigator.clipboard.writeText(`https://tipachef.com/${slug}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function downloadQR() {
    const canvas = document.querySelector("#profile-qr-canvas canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const a   = document.createElement("a");
    a.href     = canvas.toDataURL("image/png");
    a.download = `tipachef-${slug}-qr.png`;
    a.click();
  }

  return (
    <div className="mb-5">
      <p className="text-gray-900 font-semibold text-base mb-3">Share this page</p>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
        <div id="profile-qr-canvas" className="flex-shrink-0 p-2 bg-gray-50 rounded-xl border border-gray-100">
          <QRCodeCanvas value={`https://tipachef.com/${slug}`} size={72} fgColor="#111111" bgColor="#FFFFFF" level="M" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-semibold text-sm mb-0.5">tipachef.com/{slug}</p>
          <p className="text-gray-400 text-xs mb-3">Scan to tip {firstName} from anywhere</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={copyLink} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-amber-300 transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              {linkCopied ? "Copied!" : "Copy link"}
            </button>
            <button onClick={downloadQR} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-amber-300 transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
