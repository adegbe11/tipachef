"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type Mode = "restaurant" | "chef";

interface PlaceSuggestion {
  placeId: string;
  name: string;
  description: string;
}

interface Chef {
  id: string;
  name: string;
  slug: string;
  role: string;
  venue: string;
  cuisine: string;
  avatar_url: string | null;
  rating: number | null;
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const letters = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : name.slice(0, 2);
  return (
    <div className="w-14 h-14 rounded-full bg-ember/20 border border-ember/30 flex items-center justify-center flex-shrink-0">
      <span className="font-display text-ember text-lg italic">{letters.toUpperCase()}</span>
    </div>
  );
}

function ChefCard({ chef }: { chef: Chef }) {
  return (
    <div className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-ember/20 transition-all duration-200 group">
      {chef.avatar_url ? (
        <Image
          src={chef.avatar_url}
          alt={chef.name}
          width={56}
          height={56}
          className="rounded-full object-cover w-14 h-14 flex-shrink-0"
        />
      ) : (
        <Initials name={chef.name} />
      )}

      <div className="flex-1 min-w-0">
        <p className="font-sans text-ivory font-medium text-sm truncate group-hover:text-ember transition-colors duration-200">
          {chef.name}
        </p>
        <p className="font-sans text-ivory/40 text-xs truncate">{chef.role} · {chef.venue}</p>
        {chef.cuisine && (
          <p className="font-sans text-ember text-xs mt-0.5">{chef.cuisine}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {chef.rating && (
          <span className="text-xs font-sans text-ivory/35">{chef.rating.toFixed(1)} ★</span>
        )}
        <Link
          href={`/tip/${chef.slug}`}
          className="press text-xs font-sans font-semibold px-4 py-2 rounded-full bg-ember text-graphite hover:bg-ember-light transition-all duration-200 shadow-md shadow-ember/20 whitespace-nowrap"
        >
          Tip {chef.name.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [mode,        setMode]        = useState<Mode>("restaurant");
  const [query,       setQuery]       = useState("");
  const [places,      setPlaces]      = useState<PlaceSuggestion[]>([]);
  const [chefs,       setChefs]       = useState<Chef[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [showDropdown,setShowDropdown]= useState(false);
  const [selectedVenue, setSelectedVenue] = useState<PlaceSuggestion | null>(null);
  const [searched,    setSearched]    = useState(false);

  const inputRef     = useRef<HTMLInputElement>(null);
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search
  const search = useCallback((value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setPlaces([]);
        setChefs([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        if (mode === "restaurant") {
          const res  = await fetch(`/api/search/places?q=${encodeURIComponent(value)}`);
          const data = await res.json();
          setPlaces(data.suggestions ?? []);
          setShowDropdown(true);
        } else {
          const res  = await fetch(`/api/search/chefs?q=${encodeURIComponent(value)}`);
          const data = await res.json();
          setChefs(data.chefs ?? []);
          setSearched(true);
          setShowDropdown(false);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }, 320);
  }, [mode]);

  function handleInput(value: string) {
    setQuery(value);
    setSelectedVenue(null);
    search(value);
  }

  async function handleSelectPlace(place: PlaceSuggestion) {
    setQuery(place.name);
    setSelectedVenue(place);
    setShowDropdown(false);
    setLoading(true);
    setSearched(true);
    try {
      const res  = await fetch(`/api/search/chefs?placeId=${place.placeId}&venue=${encodeURIComponent(place.name)}`);
      const data = await res.json();
      setChefs(data.chefs ?? []);
    } catch {
      setChefs([]);
    } finally {
      setLoading(false);
    }
  }

  function switchMode(m: Mode) {
    setMode(m);
    setQuery("");
    setPlaces([]);
    setChefs([]);
    setSearched(false);
    setSelectedVenue(null);
    setShowDropdown(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const placeholder = mode === "restaurant"
    ? "Search restaurant name..."
    : "Search chef name...";

  return (
    <div className="min-h-screen bg-graphite text-ivory">

      {/* Navbar-style top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5 py-3">
        <div className="content-container flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 press flex-shrink-0 group">
            <Image
              src="/tipchef-logo.png"
              alt="Tip a Chef"
              width={32}
              height={32}
              className="rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <span
              className="font-display text-ivory leading-none select-none"
              style={{ fontSize: "1.2rem", fontWeight: 400, fontStyle: "italic" }}
            >
              Tip a Chef
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-2.5">
            <Link href="/login"  className="press text-sm font-sans font-medium px-5 py-2.5 rounded-full text-ivory/65 hover:text-ivory transition-colors">Sign in</Link>
            <Link href="/signup" className="press text-sm font-sans font-semibold px-6 py-2.5 rounded-full bg-ember text-graphite hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/25">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero search area */}
      <div className="pt-32 pb-16 px-6 text-center">
        <p className="eyebrow mb-4 text-ember">Tip a Chef</p>
        <h1
          className="font-display text-ivory leading-tight mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300 }}
        >
          Find a chef.<br />
          <span className="text-ember-gradient italic">Send your thanks.</span>
        </h1>
        <p className="font-sans text-ivory/50 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          Search by restaurant or chef name and tip directly to the kitchen.
        </p>

        {/* Mode toggle */}
        <div className="flex items-center justify-center gap-1 glass rounded-full p-1 w-fit mx-auto mb-6">
          {(["restaurant", "chef"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`press px-5 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                mode === m
                  ? "bg-ember text-graphite shadow-md shadow-ember/25"
                  : "text-ivory/50 hover:text-ivory"
              }`}
            >
              {m === "restaurant" ? "By Restaurant" : "By Chef Name"}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div ref={dropdownRef} className="relative max-w-xl mx-auto">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
            showDropdown
              ? "bg-white/8 border border-ember/40 shadow-xl shadow-ember/10 rounded-b-none"
              : "bg-white/6 border border-white/10 hover:border-white/20"
          }`}>
            {loading ? (
              <svg className="animate-spin flex-shrink-0 text-ember" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={showDropdown ? "#C9A96E" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 transition-colors ${showDropdown ? "text-ember" : "text-ivory/35"}`}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            )}
            <input
              ref={inputRef}
              autoFocus
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => places.length > 0 && setShowDropdown(true)}
              placeholder={placeholder}
              className="flex-1 bg-transparent font-sans text-ivory placeholder:text-ivory/30 outline-none text-base"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setPlaces([]); setChefs([]); setSearched(false); inputRef.current?.focus(); }}
                className="flex-shrink-0 text-ivory/30 hover:text-ivory/70 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Places dropdown */}
          {showDropdown && places.length > 0 && (
            <div className="absolute left-0 right-0 glass-dark border border-white/8 border-t-0 rounded-b-2xl overflow-hidden shadow-2xl z-20">
              <ul className="py-1">
                {places.map((p) => (
                  <li key={p.placeId}>
                    <button
                      className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/5 transition-colors text-left group"
                      onClick={() => handleSelectPlace(p)}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans text-ivory font-medium truncate group-hover:text-ember transition-colors">{p.name}</p>
                        <p className="text-xs font-sans text-ivory/35 truncate">{p.description}</p>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ivory/20 group-hover:text-ember/60 flex-shrink-0">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/5 px-5 py-2 flex items-center justify-between">
                <span className="text-xs font-sans text-ivory/25">Powered by Google Places</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="content-container pb-24">
        {/* Selected restaurant label */}
        {selectedVenue && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-sans text-ivory/50">Chefs at</span>
            <span className="text-sm font-sans text-ivory font-medium">{selectedVenue.name}</span>
            <button
              onClick={() => { setSelectedVenue(null); setQuery(""); setChefs([]); setSearched(false); inputRef.current?.focus(); }}
              className="ml-1 text-ivory/30 hover:text-ember transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        {/* Chef results grid */}
        {chefs.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chefs.map((chef) => <ChefCard key={chef.id} chef={chef} />)}
          </div>
        )}

        {/* Empty states */}
        {searched && !loading && chefs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <p className="font-sans text-ivory/40 text-sm mb-2">No chefs found</p>
            <p className="font-sans text-ivory/25 text-xs max-w-xs mx-auto leading-relaxed">
              {mode === "restaurant"
                ? "No chefs at this restaurant have signed up yet. Share TipAChef with them!"
                : "No chef with that name found. They may not have signed up yet."}
            </p>
            <Link
              href="/signup"
              className="press inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full border border-ember/30 text-ember text-sm font-sans font-medium hover:bg-ember/10 transition-all"
            >
              Invite a chef to join
            </Link>
          </div>
        )}

        {/* Default prompt */}
        {!searched && !loading && (
          <div className="text-center py-16">
            <p className="font-sans text-ivory/25 text-sm">
              {mode === "restaurant"
                ? "Start typing a restaurant name above"
                : "Start typing a chef name above"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
