"use client";

import { useEffect, useState } from "react";

const TIPS = [
  { flag:"🇮🇹", chef:"Marco E.",   location:"Rome",        amount:25,  note:"Best carbonara I've ever had.",     table:"Table 7"    },
  { flag:"🇬🇷", chef:"Dimitri K.", location:"Athens",      amount:15,  note:"The risotto was perfect.",           table:"Table 3"    },
  { flag:"🇲🇽", chef:"Sofia R.",   location:"Mexico City", amount:30,  note:"Incredible mole sauce.",             table:"Anonymous"  },
  { flag:"🇹🇷", chef:"Mehmet Y.",  location:"Istanbul",    amount:20,  note:"Best meal of our entire trip.",      table:"Table 12"   },
  { flag:"🇬🇷", chef:"Nikos S.",   location:"Athens",      amount:10,  note:"Those pastries changed my life.",    table:"Table 2"    },
  { flag:"🇩🇪", chef:"Lena F.",    location:"Berlin",      amount:18,  note:"Precision on every single plate.",   table:"Table 9"    },
  { flag:"🇫🇷", chef:"Pierre L.",  location:"Paris",       amount:35,  note:"The chef came out and we cried.",    table:"Table 5"    },
  { flag:"🇯🇵", chef:"Kenji M.",   location:"Tokyo",       amount:22,  note:"Nothing like this anywhere else.",   table:"Table 1"    },
];

type Tip = typeof TIPS[0];

export default function LiveTipFeed() {
  const [visible, setVisible] = useState(false);
  const [tip, setTip]         = useState<Tip>(TIPS[0]);
  const [show, setShow]       = useState(false);
  const [idx, setIdx]         = useState(0);

  /* Start after 3s, then cycle every 5s */
  useEffect(() => {
    const initial = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(initial);
  }, []);

  useEffect(() => {
    if (!visible) return;
    showTip(TIPS[0]);
    const interval = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % TIPS.length;
        showTip(TIPS[next]);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  function showTip(t: Tip) {
    setTip(t);
    setShow(true);
    setTimeout(() => setShow(false), 3800);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position:   "fixed",
        bottom:     "28px",
        right:      "24px",
        zIndex:     999,
        width:      "300px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform:   show ? "translateY(0) scale(1)"   : "translateY(24px) scale(0.96)",
          opacity:     show ? 1 : 0,
          transition:  "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
          background:  "rgba(14,12,9,0.82)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border:      "1.5px solid rgba(201,169,110,0.28)",
          borderRadius: "18px",
          boxShadow:
            "0 8px 40px rgba(0,0,0,0.55), " +
            "0 2px 12px rgba(0,0,0,0.4), " +
            "inset 0 1px 0 rgba(255,255,255,0.07), " +
            "4px 4px 0 rgba(201,169,110,0.08)",
          padding: "14px 16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        {/* Flag circle */}
        <div
          style={{
            width:         "40px",
            height:        "40px",
            borderRadius:  "50%",
            background:    "rgba(255,255,255,0.06)",
            backdropFilter:"blur(10px)",
            border:        "1.5px solid rgba(201,169,110,0.2)",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            fontSize:      "20px",
            flexShrink:    0,
            boxShadow:     "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          {tip.flag}
        </div>

        {/* Content */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"3px" }}>
            <span
              style={{
                fontFamily:   "-apple-system,system-ui",
                fontSize:     "12px",
                fontWeight:   700,
                color:        "rgba(250,248,244,0.9)",
              }}
            >
              {tip.chef} · {tip.location}
            </span>
            <span
              style={{
                fontFamily:   "-apple-system,system-ui",
                fontSize:     "13px",
                fontWeight:   800,
                color:        "#C9A96E",
                marginLeft:   "8px",
                flexShrink:   0,
              }}
            >
              +${tip.amount}
            </span>
          </div>

          <p
            style={{
              fontFamily:  "Georgia,'Times New Roman',serif",
              fontStyle:   "italic",
              fontSize:    "11px",
              color:       "rgba(250,248,244,0.38)",
              margin:      0,
              overflow:    "hidden",
              whiteSpace:  "nowrap",
              textOverflow:"ellipsis",
            }}
          >
            &ldquo;{tip.note}&rdquo;
          </p>

          <div style={{ display:"flex", alignItems:"center", gap:"5px", marginTop:"6px" }}>
            {/* Stripe badge */}
            <div
              style={{
                display:       "flex",
                alignItems:    "center",
                gap:           "4px",
                background:    "rgba(255,255,255,0.05)",
                border:        "1px solid rgba(255,255,255,0.08)",
                borderRadius:  "20px",
                padding:       "2px 7px",
              }}
            >
              <div
                style={{
                  width:"6px", height:"6px", borderRadius:"50%",
                  background:"#4ade80",
                  boxShadow:"0 0 6px rgba(74,222,128,0.8)",
                  animation:"pulse 2s infinite",
                }}
              />
              <span style={{ fontFamily:"-apple-system,system-ui", fontSize:"9px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.04em" }}>
                LIVE · {tip.table}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:0.4; transform:scale(1.4); }
        }
      `}</style>
    </div>
  );
}
