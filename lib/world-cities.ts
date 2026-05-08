// ─── World Cities for Programmatic SEO ───────────────────────────────────────
// Powers /private-chef/[city] and /cheap-private-chef/[city] pages.
// priceFrom = starting USD per person for private chef hire in that city.
// Add more cities any time — each entry instantly creates 2 indexed pages.

export interface WorldCity {
  name:        string;  // Display name e.g. "New York"
  slug:        string;  // URL slug e.g. "new-york"
  country:     string;  // e.g. "United States"
  countryCode: string;  // ISO 3166-1 alpha-2
  continent:   string;
  priceFrom:   number;  // USD/person starting price (used on cheap-chef template)
}

// Derive flag emoji from ISO country code
export function countryFlag(code: string): string {
  return [...code.toUpperCase()].map(
    (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65)
  ).join("");
}

export const WORLD_CITIES: WorldCity[] = [
  // ── United States ─────────────────────────────────────────────────────────
  { name:"New York",         slug:"new-york",          country:"United States", countryCode:"US", continent:"North America", priceFrom:85  },
  { name:"Los Angeles",      slug:"los-angeles",       country:"United States", countryCode:"US", continent:"North America", priceFrom:80  },
  { name:"Chicago",          slug:"chicago",           country:"United States", countryCode:"US", continent:"North America", priceFrom:75  },
  { name:"Houston",          slug:"houston",           country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"Miami",            slug:"miami",             country:"United States", countryCode:"US", continent:"North America", priceFrom:80  },
  { name:"San Francisco",    slug:"san-francisco",     country:"United States", countryCode:"US", continent:"North America", priceFrom:95  },
  { name:"Seattle",          slug:"seattle",           country:"United States", countryCode:"US", continent:"North America", priceFrom:80  },
  { name:"Boston",           slug:"boston",            country:"United States", countryCode:"US", continent:"North America", priceFrom:85  },
  { name:"Washington DC",    slug:"washington-dc",     country:"United States", countryCode:"US", continent:"North America", priceFrom:80  },
  { name:"Las Vegas",        slug:"las-vegas",         country:"United States", countryCode:"US", continent:"North America", priceFrom:75  },
  { name:"Austin",           slug:"austin",            country:"United States", countryCode:"US", continent:"North America", priceFrom:70  },
  { name:"Dallas",           slug:"dallas",            country:"United States", countryCode:"US", continent:"North America", priceFrom:70  },
  { name:"Atlanta",          slug:"atlanta",           country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"Denver",           slug:"denver",            country:"United States", countryCode:"US", continent:"North America", priceFrom:70  },
  { name:"Nashville",        slug:"nashville",         country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"Portland",         slug:"portland",          country:"United States", countryCode:"US", continent:"North America", priceFrom:70  },
  { name:"San Diego",        slug:"san-diego",         country:"United States", countryCode:"US", continent:"North America", priceFrom:75  },
  { name:"Phoenix",          slug:"phoenix",           country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"Minneapolis",      slug:"minneapolis",       country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"New Orleans",      slug:"new-orleans",       country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"Charlotte",        slug:"charlotte",         country:"United States", countryCode:"US", continent:"North America", priceFrom:60  },
  { name:"Tampa",            slug:"tampa",             country:"United States", countryCode:"US", continent:"North America", priceFrom:60  },
  { name:"San Antonio",      slug:"san-antonio",       country:"United States", countryCode:"US", continent:"North America", priceFrom:60  },
  { name:"Philadelphia",     slug:"philadelphia",      country:"United States", countryCode:"US", continent:"North America", priceFrom:75  },
  { name:"Baltimore",        slug:"baltimore",         country:"United States", countryCode:"US", continent:"North America", priceFrom:65  },
  { name:"Honolulu",         slug:"honolulu",          country:"United States", countryCode:"US", continent:"North America", priceFrom:90  },
  { name:"Sacramento",       slug:"sacramento",        country:"United States", countryCode:"US", continent:"North America", priceFrom:70  },
  { name:"Raleigh",          slug:"raleigh",           country:"United States", countryCode:"US", continent:"North America", priceFrom:60  },
  { name:"Columbus",         slug:"columbus",          country:"United States", countryCode:"US", continent:"North America", priceFrom:60  },
  { name:"Indianapolis",     slug:"indianapolis",      country:"United States", countryCode:"US", continent:"North America", priceFrom:58  },

  // ── United Kingdom ────────────────────────────────────────────────────────
  { name:"London",           slug:"london",            country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:90  },
  { name:"Manchester",       slug:"manchester",        country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:70  },
  { name:"Birmingham",       slug:"birmingham",        country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:65  },
  { name:"Edinburgh",        slug:"edinburgh",         country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:75  },
  { name:"Glasgow",          slug:"glasgow",           country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:65  },
  { name:"Liverpool",        slug:"liverpool",         country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:65  },
  { name:"Bristol",          slug:"bristol",           country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:70  },
  { name:"Leeds",            slug:"leeds",             country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:65  },
  { name:"Cardiff",          slug:"cardiff",           country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:60  },
  { name:"Belfast",          slug:"belfast",           country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:60  },
  { name:"Oxford",           slug:"oxford",            country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:80  },
  { name:"Cambridge",        slug:"cambridge",         country:"United Kingdom", countryCode:"GB", continent:"Europe", priceFrom:80  },

  // ── Canada ────────────────────────────────────────────────────────────────
  { name:"Toronto",          slug:"toronto",           country:"Canada", countryCode:"CA", continent:"North America", priceFrom:75  },
  { name:"Vancouver",        slug:"vancouver",         country:"Canada", countryCode:"CA", continent:"North America", priceFrom:80  },
  { name:"Montreal",         slug:"montreal",          country:"Canada", countryCode:"CA", continent:"North America", priceFrom:70  },
  { name:"Calgary",          slug:"calgary",           country:"Canada", countryCode:"CA", continent:"North America", priceFrom:70  },
  { name:"Edmonton",         slug:"edmonton",          country:"Canada", countryCode:"CA", continent:"North America", priceFrom:65  },
  { name:"Ottawa",           slug:"ottawa",            country:"Canada", countryCode:"CA", continent:"North America", priceFrom:70  },
  { name:"Quebec City",      slug:"quebec-city",       country:"Canada", countryCode:"CA", continent:"North America", priceFrom:65  },
  { name:"Winnipeg",         slug:"winnipeg",          country:"Canada", countryCode:"CA", continent:"North America", priceFrom:60  },

  // ── Australia ─────────────────────────────────────────────────────────────
  { name:"Sydney",           slug:"sydney",            country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:85  },
  { name:"Melbourne",        slug:"melbourne",         country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:80  },
  { name:"Brisbane",         slug:"brisbane",          country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:75  },
  { name:"Perth",            slug:"perth",             country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:75  },
  { name:"Adelaide",         slug:"adelaide",          country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:70  },
  { name:"Gold Coast",       slug:"gold-coast",        country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:75  },
  { name:"Canberra",         slug:"canberra",          country:"Australia", countryCode:"AU", continent:"Oceania", priceFrom:70  },
  { name:"Auckland",         slug:"auckland",          country:"New Zealand", countryCode:"NZ", continent:"Oceania", priceFrom:75  },
  { name:"Wellington",       slug:"wellington",        country:"New Zealand", countryCode:"NZ", continent:"Oceania", priceFrom:70  },

  // ── France ────────────────────────────────────────────────────────────────
  { name:"Paris",            slug:"paris",             country:"France", countryCode:"FR", continent:"Europe", priceFrom:90  },
  { name:"Lyon",             slug:"lyon",              country:"France", countryCode:"FR", continent:"Europe", priceFrom:75  },
  { name:"Marseille",        slug:"marseille",         country:"France", countryCode:"FR", continent:"Europe", priceFrom:70  },
  { name:"Nice",             slug:"nice",              country:"France", countryCode:"FR", continent:"Europe", priceFrom:80  },
  { name:"Bordeaux",         slug:"bordeaux",          country:"France", countryCode:"FR", continent:"Europe", priceFrom:75  },
  { name:"Cannes",           slug:"cannes",            country:"France", countryCode:"FR", continent:"Europe", priceFrom:95  },

  // ── Germany ───────────────────────────────────────────────────────────────
  { name:"Berlin",           slug:"berlin",            country:"Germany", countryCode:"DE", continent:"Europe", priceFrom:75  },
  { name:"Munich",           slug:"munich",            country:"Germany", countryCode:"DE", continent:"Europe", priceFrom:80  },
  { name:"Hamburg",          slug:"hamburg",           country:"Germany", countryCode:"DE", continent:"Europe", priceFrom:75  },
  { name:"Frankfurt",        slug:"frankfurt",         country:"Germany", countryCode:"DE", continent:"Europe", priceFrom:75  },
  { name:"Cologne",          slug:"cologne",           country:"Germany", countryCode:"DE", continent:"Europe", priceFrom:70  },
  { name:"Stuttgart",        slug:"stuttgart",         country:"Germany", countryCode:"DE", continent:"Europe", priceFrom:70  },

  // ── Spain ─────────────────────────────────────────────────────────────────
  { name:"Barcelona",        slug:"barcelona",         country:"Spain", countryCode:"ES", continent:"Europe", priceFrom:70  },
  { name:"Madrid",           slug:"madrid",            country:"Spain", countryCode:"ES", continent:"Europe", priceFrom:70  },
  { name:"Seville",          slug:"seville",           country:"Spain", countryCode:"ES", continent:"Europe", priceFrom:60  },
  { name:"Valencia",         slug:"valencia",          country:"Spain", countryCode:"ES", continent:"Europe", priceFrom:60  },
  { name:"Ibiza",            slug:"ibiza",             country:"Spain", countryCode:"ES", continent:"Europe", priceFrom:110 },
  { name:"Marbella",         slug:"marbella",          country:"Spain", countryCode:"ES", continent:"Europe", priceFrom:100 },

  // ── Italy ─────────────────────────────────────────────────────────────────
  { name:"Rome",             slug:"rome",              country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:75  },
  { name:"Milan",            slug:"milan",             country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:80  },
  { name:"Florence",         slug:"florence",          country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:80  },
  { name:"Venice",           slug:"venice",            country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:90  },
  { name:"Naples",           slug:"naples",            country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:60  },
  { name:"Amalfi",           slug:"amalfi",            country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:95  },
  { name:"Turin",            slug:"turin",             country:"Italy", countryCode:"IT", continent:"Europe", priceFrom:65  },

  // ── Netherlands · Belgium · Switzerland ──────────────────────────────────
  { name:"Amsterdam",        slug:"amsterdam",         country:"Netherlands", countryCode:"NL", continent:"Europe", priceFrom:85  },
  { name:"Rotterdam",        slug:"rotterdam",         country:"Netherlands", countryCode:"NL", continent:"Europe", priceFrom:75  },
  { name:"Brussels",         slug:"brussels",          country:"Belgium",     countryCode:"BE", continent:"Europe", priceFrom:80  },
  { name:"Zurich",           slug:"zurich",            country:"Switzerland", countryCode:"CH", continent:"Europe", priceFrom:110 },
  { name:"Geneva",           slug:"geneva",            country:"Switzerland", countryCode:"CH", continent:"Europe", priceFrom:110 },

  // ── Nordics ───────────────────────────────────────────────────────────────
  { name:"Stockholm",        slug:"stockholm",         country:"Sweden",  countryCode:"SE", continent:"Europe", priceFrom:85  },
  { name:"Oslo",             slug:"oslo",              country:"Norway",  countryCode:"NO", continent:"Europe", priceFrom:95  },
  { name:"Copenhagen",       slug:"copenhagen",        country:"Denmark", countryCode:"DK", continent:"Europe", priceFrom:95  },
  { name:"Helsinki",         slug:"helsinki",          country:"Finland", countryCode:"FI", continent:"Europe", priceFrom:85  },

  // ── Eastern Europe ────────────────────────────────────────────────────────
  { name:"Vienna",           slug:"vienna",            country:"Austria",  countryCode:"AT", continent:"Europe", priceFrom:80  },
  { name:"Prague",           slug:"prague",            country:"Czech Republic", countryCode:"CZ", continent:"Europe", priceFrom:55  },
  { name:"Budapest",         slug:"budapest",          country:"Hungary",  countryCode:"HU", continent:"Europe", priceFrom:50  },
  { name:"Warsaw",           slug:"warsaw",            country:"Poland",   countryCode:"PL", continent:"Europe", priceFrom:50  },
  { name:"Krakow",           slug:"krakow",            country:"Poland",   countryCode:"PL", continent:"Europe", priceFrom:45  },
  { name:"Lisbon",           slug:"lisbon",            country:"Portugal", countryCode:"PT", continent:"Europe", priceFrom:65  },
  { name:"Porto",            slug:"porto",             country:"Portugal", countryCode:"PT", continent:"Europe", priceFrom:60  },
  { name:"Athens",           slug:"athens",            country:"Greece",   countryCode:"GR", continent:"Europe", priceFrom:55  },
  { name:"Dublin",           slug:"dublin",            country:"Ireland",  countryCode:"IE", continent:"Europe", priceFrom:85  },

  // ── Middle East ───────────────────────────────────────────────────────────
  { name:"Dubai",            slug:"dubai",             country:"UAE",        countryCode:"AE", continent:"Asia", priceFrom:100 },
  { name:"Abu Dhabi",        slug:"abu-dhabi",         country:"UAE",        countryCode:"AE", continent:"Asia", priceFrom:95  },
  { name:"Riyadh",           slug:"riyadh",            country:"Saudi Arabia", countryCode:"SA", continent:"Asia", priceFrom:80  },
  { name:"Doha",             slug:"doha",              country:"Qatar",      countryCode:"QA", continent:"Asia", priceFrom:90  },
  { name:"Kuwait City",      slug:"kuwait-city",       country:"Kuwait",     countryCode:"KW", continent:"Asia", priceFrom:80  },
  { name:"Muscat",           slug:"muscat",            country:"Oman",       countryCode:"OM", continent:"Asia", priceFrom:70  },
  { name:"Beirut",           slug:"beirut",            country:"Lebanon",    countryCode:"LB", continent:"Asia", priceFrom:50  },
  { name:"Tel Aviv",         slug:"tel-aviv",          country:"Israel",     countryCode:"IL", continent:"Asia", priceFrom:75  },
  { name:"Amman",            slug:"amman",             country:"Jordan",     countryCode:"JO", continent:"Asia", priceFrom:50  },

  // ── South & Southeast Asia ────────────────────────────────────────────────
  { name:"Singapore",        slug:"singapore",         country:"Singapore",  countryCode:"SG", continent:"Asia", priceFrom:85  },
  { name:"Hong Kong",        slug:"hong-kong",         country:"Hong Kong",  countryCode:"HK", continent:"Asia", priceFrom:90  },
  { name:"Tokyo",            slug:"tokyo",             country:"Japan",      countryCode:"JP", continent:"Asia", priceFrom:95  },
  { name:"Osaka",            slug:"osaka",             country:"Japan",      countryCode:"JP", continent:"Asia", priceFrom:85  },
  { name:"Kyoto",            slug:"kyoto",             country:"Japan",      countryCode:"JP", continent:"Asia", priceFrom:90  },
  { name:"Seoul",            slug:"seoul",             country:"South Korea", countryCode:"KR", continent:"Asia", priceFrom:70  },
  { name:"Bangkok",          slug:"bangkok",           country:"Thailand",   countryCode:"TH", continent:"Asia", priceFrom:40  },
  { name:"Phuket",           slug:"phuket",            country:"Thailand",   countryCode:"TH", continent:"Asia", priceFrom:45  },
  { name:"Bali",             slug:"bali",              country:"Indonesia",  countryCode:"ID", continent:"Asia", priceFrom:35  },
  { name:"Jakarta",          slug:"jakarta",           country:"Indonesia",  countryCode:"ID", continent:"Asia", priceFrom:40  },
  { name:"Kuala Lumpur",     slug:"kuala-lumpur",      country:"Malaysia",   countryCode:"MY", continent:"Asia", priceFrom:40  },
  { name:"Manila",           slug:"manila",            country:"Philippines", countryCode:"PH", continent:"Asia", priceFrom:35  },
  { name:"Ho Chi Minh City", slug:"ho-chi-minh-city",  country:"Vietnam",    countryCode:"VN", continent:"Asia", priceFrom:30  },
  { name:"Hanoi",            slug:"hanoi",             country:"Vietnam",    countryCode:"VN", continent:"Asia", priceFrom:28  },
  { name:"Shanghai",         slug:"shanghai",          country:"China",      countryCode:"CN", continent:"Asia", priceFrom:60  },
  { name:"Beijing",          slug:"beijing",           country:"China",      countryCode:"CN", continent:"Asia", priceFrom:60  },
  { name:"Mumbai",           slug:"mumbai",            country:"India",      countryCode:"IN", continent:"Asia", priceFrom:35  },
  { name:"Delhi",            slug:"delhi",             country:"India",      countryCode:"IN", continent:"Asia", priceFrom:30  },
  { name:"Bangalore",        slug:"bangalore",         country:"India",      countryCode:"IN", continent:"Asia", priceFrom:30  },
  { name:"Goa",              slug:"goa",               country:"India",      countryCode:"IN", continent:"Asia", priceFrom:35  },
  { name:"Colombo",          slug:"colombo",           country:"Sri Lanka",  countryCode:"LK", continent:"Asia", priceFrom:30  },
  { name:"Istanbul",         slug:"istanbul",          country:"Turkey",     countryCode:"TR", continent:"Asia", priceFrom:50  },

  // ── Africa ────────────────────────────────────────────────────────────────
  { name:"Lagos",            slug:"lagos",             country:"Nigeria",      countryCode:"NG", continent:"Africa", priceFrom:30  },
  { name:"Abuja",            slug:"abuja",             country:"Nigeria",      countryCode:"NG", continent:"Africa", priceFrom:30  },
  { name:"Nairobi",          slug:"nairobi",           country:"Kenya",        countryCode:"KE", continent:"Africa", priceFrom:35  },
  { name:"Cape Town",        slug:"cape-town",         country:"South Africa", countryCode:"ZA", continent:"Africa", priceFrom:45  },
  { name:"Johannesburg",     slug:"johannesburg",      country:"South Africa", countryCode:"ZA", continent:"Africa", priceFrom:40  },
  { name:"Durban",           slug:"durban",            country:"South Africa", countryCode:"ZA", continent:"Africa", priceFrom:35  },
  { name:"Cairo",            slug:"cairo",             country:"Egypt",        countryCode:"EG", continent:"Africa", priceFrom:30  },
  { name:"Marrakech",        slug:"marrakech",         country:"Morocco",      countryCode:"MA", continent:"Africa", priceFrom:35  },
  { name:"Casablanca",       slug:"casablanca",        country:"Morocco",      countryCode:"MA", continent:"Africa", priceFrom:35  },
  { name:"Accra",            slug:"accra",             country:"Ghana",        countryCode:"GH", continent:"Africa", priceFrom:28  },
  { name:"Addis Ababa",      slug:"addis-ababa",       country:"Ethiopia",     countryCode:"ET", continent:"Africa", priceFrom:25  },
  { name:"Dar es Salaam",    slug:"dar-es-salaam",     country:"Tanzania",     countryCode:"TZ", continent:"Africa", priceFrom:28  },
  { name:"Kigali",           slug:"kigali",            country:"Rwanda",       countryCode:"RW", continent:"Africa", priceFrom:30  },
  { name:"Dakar",            slug:"dakar",             country:"Senegal",      countryCode:"SN", continent:"Africa", priceFrom:28  },
  { name:"Tunis",            slug:"tunis",             country:"Tunisia",      countryCode:"TN", continent:"Africa", priceFrom:28  },
  { name:"Kampala",          slug:"kampala",           country:"Uganda",       countryCode:"UG", continent:"Africa", priceFrom:25  },

  // ── Latin America ─────────────────────────────────────────────────────────
  { name:"São Paulo",        slug:"sao-paulo",         country:"Brazil",     countryCode:"BR", continent:"South America", priceFrom:40  },
  { name:"Rio de Janeiro",   slug:"rio-de-janeiro",    country:"Brazil",     countryCode:"BR", continent:"South America", priceFrom:40  },
  { name:"Buenos Aires",     slug:"buenos-aires",      country:"Argentina",  countryCode:"AR", continent:"South America", priceFrom:35  },
  { name:"Santiago",         slug:"santiago",          country:"Chile",      countryCode:"CL", continent:"South America", priceFrom:40  },
  { name:"Lima",             slug:"lima",              country:"Peru",       countryCode:"PE", continent:"South America", priceFrom:35  },
  { name:"Bogotá",           slug:"bogota",            country:"Colombia",   countryCode:"CO", continent:"South America", priceFrom:30  },
  { name:"Medellín",         slug:"medellin",          country:"Colombia",   countryCode:"CO", continent:"South America", priceFrom:28  },
  { name:"Cartagena",        slug:"cartagena",         country:"Colombia",   countryCode:"CO", continent:"South America", priceFrom:35  },
  { name:"Mexico City",      slug:"mexico-city",       country:"Mexico",     countryCode:"MX", continent:"North America", priceFrom:35  },
  { name:"Cancún",           slug:"cancun",            country:"Mexico",     countryCode:"MX", continent:"North America", priceFrom:45  },
  { name:"Guadalajara",      slug:"guadalajara",       country:"Mexico",     countryCode:"MX", continent:"North America", priceFrom:30  },
  { name:"Montevideo",       slug:"montevideo",        country:"Uruguay",    countryCode:"UY", continent:"South America", priceFrom:35  },
  { name:"Quito",            slug:"quito",             country:"Ecuador",    countryCode:"EC", continent:"South America", priceFrom:28  },
  { name:"Cusco",            slug:"cusco",             country:"Peru",       countryCode:"PE", continent:"South America", priceFrom:30  },

  // ── Caribbean ─────────────────────────────────────────────────────────────
  { name:"Bridgetown",       slug:"bridgetown",        country:"Barbados",   countryCode:"BB", continent:"North America", priceFrom:80  },
  { name:"Nassau",           slug:"nassau",            country:"Bahamas",    countryCode:"BS", continent:"North America", priceFrom:90  },
  { name:"Kingston",         slug:"kingston",          country:"Jamaica",    countryCode:"JM", continent:"North America", priceFrom:45  },
  { name:"Havana",           slug:"havana",            country:"Cuba",       countryCode:"CU", continent:"North America", priceFrom:30  },
];

// Fast lookup by slug
export const WORLD_CITIES_BY_SLUG: Record<string, WorldCity> = Object.fromEntries(
  WORLD_CITIES.map((c) => [c.slug, c])
);
