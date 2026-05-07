"use client";

import Image from "next/image";
import Link   from "next/link";

const TIP_ITEMS = [
  { emoji: "🧂", label: "A pinch of salt", amount: 3  },
  { emoji: "🌿", label: "Fresh herbs",      amount: 5  },
  { emoji: "🍷", label: "Glass of wine",    amount: 10 },
];

/* ── Inline SVG icons ── */
const IconSignal = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
    <rect x="0"    y="8"   width="3"   height="4"   rx="0.8" opacity="0.35"/>
    <rect x="4.7"  y="5.5" width="3"   height="6.5" rx="0.8" opacity="0.55"/>
    <rect x="9.4"  y="3"   width="3"   height="9"   rx="0.8" opacity="0.8"/>
    <rect x="14.1" y="0"   width="2.9" height="12"  rx="0.8"/>
  </svg>
);

const IconWifi = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
    <circle cx="8" cy="10.5" r="1.4" fill="white"/>
    <path d="M4.2 7.2 Q8 3.8 11.8 7.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75"/>
    <path d="M1.5 4.5 Q8 -0.5 14.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45"/>
  </svg>
);

const IconBattery = () => (
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
    <rect x="0.75" y="0.75" width="22.5" height="11.5" rx="3.25" stroke="white" strokeOpacity="0.55" strokeWidth="1.5"/>
    <rect x="2.5"  y="2.5"  width="16"  height="8"    rx="1.8" fill="white"/>
    <path d="M24.5 4.5 Q26.5 4.5 26.5 6.5 Q26.5 8.5 24.5 8.5" stroke="white" strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
  </svg>
);

const IconVerified = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#C9A96E"/>
    <path d="M4.5 7.5 L6.5 9.5 L10.5 5.5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarFilled = () => (
  <svg width="9" height="9" viewBox="0 0 10 10" fill="#C9A96E">
    <path d="M5 1 L6.18 3.82 L9.28 4.09 L7.09 6.01 L7.75 9.04 L5 7.4 L2.25 9.04 L2.91 6.01 L0.72 4.09 L3.82 3.82 Z"/>
  </svg>
);

export default function LiveDemo() {
  return (
    <section className="py-28 md:py-40" style={{ background: "#0d0c0a" }}>
      <div className="content-container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left copy ── */}
        <div>
          <p className="eyebrow mb-5">Your page</p>
          <h2
            className="font-display text-ivory leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300 }}
          >
            Your name.<br />
            Your story.<br />
            <span className="text-ember-gradient italic">Your link.</span>
          </h2>
          <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light mb-8 max-w-sm">
            Build your chef profile in 2 minutes. Add your photo, cuisine, and story.
            Share it everywhere. Your page lives at tipachef.com/yourname.
          </p>
          <Link
            href="/search"
            className="font-sans text-ember text-sm hover:text-ember-light transition-colors"
          >
            See an example page →
          </Link>
        </div>

        {/* ── Right: iPhone 15 Pro mockup ── */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative" style={{ perspective: "1200px" }}>

            {/* Ambient glow */}
            <div
              style={{
                position: "absolute",
                inset: "-80px",
                background: "radial-gradient(ellipse 60% 50% at 58% 52%, rgba(201,169,110,0.2) 0%, transparent 70%)",
                filter: "blur(55px)",
                pointerEvents: "none",
              }}
            />

            {/* ── iPhone titanium shell ── */}
            <div
              style={{
                position: "relative",
                width: "272px",
                borderRadius: "52px",
                background:
                  "linear-gradient(160deg, #4e4c48 0%, #2e2d2b 16%, #1c1b19 44%, #242320 72%, #3c3a36 100%)",
                boxShadow:
                  "0 0 0 0.75px rgba(255,255,255,0.18), " +
                  "0 0 0 1.5px rgba(0,0,0,0.88), " +
                  "inset 0 1px 0 rgba(255,255,255,0.13), " +
                  "inset 0 -1px 0 rgba(0,0,0,0.45), " +
                  "0 60px 120px rgba(0,0,0,0.75), " +
                  "0 28px 56px rgba(0,0,0,0.5), " +
                  "0 10px 24px rgba(0,0,0,0.4)",
                padding: "13px",
                transform: "perspective(1200px) rotateY(-6deg) rotateX(2deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Physical buttons */}
              <div style={{ position:"absolute", left:"-3.5px", top:"68px",  width:"3.5px", height:"20px", background:"linear-gradient(to right,#3c3a36,#2a2926)", borderRadius:"2px 0 0 2px", boxShadow:"-1px 0 3px rgba(0,0,0,0.6)" }}/>
              <div style={{ position:"absolute", left:"-3.5px", top:"102px", width:"3.5px", height:"32px", background:"linear-gradient(to right,#3c3a36,#2a2926)", borderRadius:"2px 0 0 2px", boxShadow:"-1px 0 3px rgba(0,0,0,0.6)" }}/>
              <div style={{ position:"absolute", left:"-3.5px", top:"144px", width:"3.5px", height:"32px", background:"linear-gradient(to right,#3c3a36,#2a2926)", borderRadius:"2px 0 0 2px", boxShadow:"-1px 0 3px rgba(0,0,0,0.6)" }}/>
              <div style={{ position:"absolute", right:"-3.5px", top:"110px", width:"3.5px", height:"52px", background:"linear-gradient(to left,#3c3a36,#2a2926)",  borderRadius:"0 2px 2px 0", boxShadow:"1px 0 3px rgba(0,0,0,0.6)" }}/>

              {/* ── Screen ── */}
              <div
                style={{
                  borderRadius: "40px",
                  overflow: "hidden",
                  background: "#0c0b09",
                  position: "relative",
                  boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.07)",
                }}
              >
                {/* Glass glare */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(140deg, rgba(255,255,255,0.055) 0%, transparent 45%)", zIndex:20, pointerEvents:"none", borderRadius:"40px" }}/>

                {/* Status bar */}
                <div style={{ padding:"14px 22px 0", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative" }}>
                  <span style={{ fontSize:"12px", fontWeight:700, color:"#fff", fontFamily:"-apple-system,BlinkMacSystemFont,system-ui", letterSpacing:"-0.3px" }}>9:41</span>
                  {/* Dynamic Island */}
                  <div style={{ position:"absolute", left:"50%", top:"10px", transform:"translateX(-50%)", width:"96px", height:"28px", background:"#000", borderRadius:"20px" }}/>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                    <IconSignal/><IconWifi/><IconBattery/>
                  </div>
                </div>

                {/* ── Cover photo ── */}
                <div style={{ position:"relative", height:"148px", margin:"10px 0 0", overflow:"hidden" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&q=85"
                    alt="Italian restaurant kitchen"
                    fill
                    style={{ objectFit:"cover", objectPosition:"center" }}
                    unoptimized
                  />
                  {/* Dark gradient bottom fade so avatar sits cleanly */}
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.05) 40%, rgba(12,11,9,0.95) 100%)" }}/>

                  {/* Cuisine tag top-left */}
                  <div style={{ position:"absolute", top:"10px", left:"12px", display:"flex", gap:"5px" }}>
                    {["Italian","Fine Dining"].map(t => (
                      <span key={t} style={{ fontSize:"8.5px", fontFamily:"-apple-system,system-ui", fontWeight:600, color:"rgba(255,255,255,0.9)", background:"rgba(0,0,0,0.5)", backdropFilter:"blur(12px)", padding:"3px 8px", borderRadius:"20px", border:"1px solid rgba(255,255,255,0.15)", letterSpacing:"0.03em" }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Avatar overlapping cover */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"0 14px", marginTop:"-30px", position:"relative", zIndex:5, marginBottom:"8px" }}>
                  <div
                    style={{
                      width:"62px", height:"62px", borderRadius:"50%",
                      border:"3px solid #0c0b09",
                      overflow:"hidden", flexShrink:0,
                      boxShadow:"0 4px 18px rgba(0,0,0,0.5)",
                      position:"relative",
                    }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&q=85"
                      alt="Chef Marco Esposito"
                      fill
                      style={{ objectFit:"cover" }}
                      unoptimized
                    />
                  </div>

                  {/* Stars top-right */}
                  <div style={{ display:"flex", alignItems:"center", gap:"2px", marginTop:"36px" }}>
                    {[1,2,3,4,5].map(s => <StarFilled key={s}/>)}
                    <span style={{ fontSize:"9px", fontFamily:"-apple-system,system-ui", color:"rgba(255,255,255,0.35)", marginLeft:"3px" }}>4.9</span>
                  </div>
                </div>

                {/* Chef info */}
                <div style={{ padding:"0 14px 0", marginBottom:"10px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"3px" }}>
                    <p style={{ fontFamily:"Georgia,'Times New Roman',serif", fontStyle:"italic", fontSize:"17px", fontWeight:500, color:"#C9A96E", margin:0, letterSpacing:"0.01em" }}>
                      Marco Esposito
                    </p>
                    <IconVerified/>
                  </div>
                  <p style={{ fontFamily:"-apple-system,system-ui", fontSize:"10.5px", color:"rgba(250,248,244,0.32)", margin:0, letterSpacing:"0.01em" }}>
                    Italian · Rome · tipachef.com/marco
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height:"1px", background:"rgba(255,255,255,0.07)", margin:"0 14px 12px" }}/>

                {/* Tip section label */}
                <p style={{ fontFamily:"-apple-system,system-ui", fontSize:"9.5px", fontWeight:600, color:"rgba(201,169,110,0.6)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"8px", padding:"0 14px" }}>
                  Support Marco
                </p>

                {/* Tip items */}
                <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"14px", padding:"0 14px" }}>
                  {TIP_ITEMS.map((item, i) => (
                    <div
                      key={item.label}
                      style={{
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        borderRadius:"13px", padding:"10px 13px",
                        background: i === 1
                          ? "linear-gradient(135deg,rgba(201,169,110,0.13) 0%,rgba(201,169,110,0.06) 100%)"
                          : "rgba(255,255,255,0.045)",
                        border: i === 1
                          ? "1px solid rgba(201,169,110,0.28)"
                          : "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span style={{ fontFamily:"-apple-system,system-ui", color:"rgba(250,248,244,0.75)", fontSize:"12px", display:"flex", alignItems:"center", gap:"9px" }}>
                        <span style={{ fontSize:"15px" }}>{item.emoji}</span>{item.label}
                      </span>
                      <span style={{ fontFamily:"-apple-system,system-ui", fontSize:"12.5px", fontWeight:600, color: i===1 ? "#C9A96E" : "rgba(250,248,244,0.42)" }}>
                        ${item.amount}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ padding:"0 14px 18px" }}>
                  <button
                    style={{
                      width:"100%", padding:"14px", borderRadius:"16px", border:"none",
                      background:"linear-gradient(135deg,#D4B878 0%,#C9A96E 50%,#B8934A 100%)",
                      color:"#1a1208",
                      fontFamily:"-apple-system,BlinkMacSystemFont,system-ui",
                      fontWeight:700, fontSize:"13.5px", letterSpacing:"0.01em", cursor:"pointer",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.28), " +
                        "0 6px 24px rgba(201,169,110,0.38), " +
                        "0 2px 8px rgba(201,169,110,0.22)",
                    }}
                  >
                    Send a tip
                  </button>
                  <p style={{ textAlign:"center", fontFamily:"-apple-system,system-ui", fontSize:"9px", color:"rgba(255,255,255,0.2)", marginTop:"8px", letterSpacing:"0.02em" }}>
                    🔒 Secured by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
