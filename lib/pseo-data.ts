// ─── Programmatic SEO data ────────────────────────────────────────────────────
// Powers city pages, cuisine pages, and tip guide pages automatically.
// Every entry here generates a fully-indexed, Google-ready page.

export interface ChefCardData {
  slug:     string;
  name:     string;
  photo:    string;
  role:     string;
  venue:    string;
  location: string;
  flag:     string;
  tips:     string;
}

// Shared chef card data used across all programmatic pages
export const CHEF_CARDS: Record<string, ChefCardData> = {
  "marco-esposito": {
    slug:     "marco-esposito",
    name:     "Marco Esposito",
    photo:    "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&q=85",
    role:     "Head Chef",
    venue:    "Osteria del Fuoco",
    location: "Rome, Italy",
    flag:     "🇮🇹",
    tips:     "312",
  },
  "dimitri-kostas": {
    slug:     "dimitri-kostas",
    name:     "Dimitri Kostas",
    photo:    "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&q=85",
    role:     "Head Chef",
    venue:    "Kuzina",
    location: "Athens, Greece",
    flag:     "🇬🇷",
    tips:     "247",
  },
  "pierre-laurent": {
    slug:     "pierre-laurent",
    name:     "Pierre Laurent",
    photo:    "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=600&auto=format&q=85",
    role:     "Executive Chef",
    venue:    "Le Comptoir",
    location: "Paris, France",
    flag:     "🇫🇷",
    tips:     "189",
  },
};

// ─── Cities ───────────────────────────────────────────────────────────────────

export interface CityData {
  name:       string;
  slug:       string;
  country:    string;
  flag:       string;
  intro:      string;
  chefSlugs:  string[];
}

export const CITIES: Record<string, CityData> = {
  london: {
    name:    "London",
    slug:    "london",
    country: "United Kingdom",
    flag:    "🇬🇧",
    intro:   "London's restaurant scene is one of the most competitive in the world. The chefs working in it are some of the most skilled and least financially recognised. Direct tipping through Tip a Chef gives diners a way to change that with thirty seconds and a phone.",
    chefSlugs: [],
  },
  "new-york": {
    name:    "New York",
    slug:    "new-york",
    country: "United States",
    flag:    "🇺🇸",
    intro:   "New York operates on a tipping culture unlike almost anywhere else on earth. Front of house staff expect twenty percent as standard. The chefs who designed and executed every dish on your table receive none of it. Tip a Chef exists to fix that.",
    chefSlugs: [],
  },
  paris: {
    name:    "Paris",
    slug:    "paris",
    country: "France",
    flag:    "🇫🇷",
    intro:   "Paris has a service compris tradition, meaning most diners leave nothing extra. What is missing is the personal gesture: a direct acknowledgment from a specific diner that a specific dish made their evening. Tip a Chef provides exactly that.",
    chefSlugs: ["pierre-laurent"],
  },
  rome: {
    name:    "Rome",
    slug:    "rome",
    country: "Italy",
    flag:    "🇮🇹",
    intro:   "Rome is one of the few cities where the food itself is the main attraction. Romans eat seriously and return to the same kitchen for decades because of one cook. Tip a Chef gives those diners a direct line to say so.",
    chefSlugs: ["marco-esposito"],
  },
  athens: {
    name:    "Athens",
    slug:    "athens",
    country: "Greece",
    flag:    "🇬🇷",
    intro:   "Athens has seen an extraordinary culinary renaissance over the last decade. A generation of young Greek chefs is redefining what mezze and modern Greek cooking can be. Tip a Chef gives their diners a direct way to support that work.",
    chefSlugs: ["dimitri-kostas"],
  },
  dubai: {
    name:    "Dubai",
    slug:    "dubai",
    country: "UAE",
    flag:    "🇦🇪",
    intro:   "Dubai has quietly become one of the most ambitious dining cities on earth. With chefs arriving from every major food culture, the kitchen talent here is extraordinary. Direct tipping through Tip a Chef is the most personal way to recognise it.",
    chefSlugs: [],
  },
  barcelona: {
    name:    "Barcelona",
    slug:    "barcelona",
    country: "Spain",
    flag:    "🇪🇸",
    intro:   "Barcelona sits at the intersection of Catalan tradition and global culinary ambition. The chefs here are proud, skilled, and historically under-appreciated by a tipping culture that rarely reaches the kitchen. Tip a Chef changes that.",
    chefSlugs: [],
  },
  sydney: {
    name:    "Sydney",
    slug:    "sydney",
    country: "Australia",
    flag:    "🇦🇺",
    intro:   "Sydney's food scene is among the most vibrant in the southern hemisphere, shaped by exceptional produce and a multicultural kitchen culture. Direct chef tipping is growing fast here. Tip a Chef makes it effortless.",
    chefSlugs: [],
  },
  toronto: {
    name:    "Toronto",
    slug:    "toronto",
    country: "Canada",
    flag:    "🇨🇦",
    intro:   "Toronto has one of the most diverse and talented restaurant communities in North America. The chefs here bring techniques and traditions from across the globe. A direct tip through Tip a Chef is the most meaningful thing a diner can do after an exceptional meal.",
    chefSlugs: [],
  },
  "los-angeles": {
    name:    "Los Angeles",
    slug:    "los-angeles",
    country: "United States",
    flag:    "🇺🇸",
    intro:   "Los Angeles has transformed from a city of celebrity dining rooms into one of the most genuinely innovative food cities on earth. The chefs driving that transformation work hard and earn less than they should. Tip a Chef puts the appreciation where it belongs.",
    chefSlugs: [],
  },
  amsterdam: {
    name:    "Amsterdam",
    slug:    "amsterdam",
    country: "Netherlands",
    flag:    "🇳🇱",
    intro:   "Amsterdam's restaurant scene is small, serious, and exceptional. The chefs here combine Dutch precision with global influences. Tip a Chef gives the diners who discover them a way to say more than a Google review ever could.",
    chefSlugs: [],
  },
  singapore: {
    name:    "Singapore",
    slug:    "singapore",
    country: "Singapore",
    flag:    "🇸🇬",
    intro:   "Singapore is a city where food is taken as seriously as any other art form. From hawker centres to fine dining, the culinary standard is extraordinary. Tip a Chef lets diners who experience that standard acknowledge the person responsible for it.",
    chefSlugs: [],
  },
  chicago: {
    name:    "Chicago",
    slug:    "chicago",
    country: "United States",
    flag:    "🇺🇸",
    intro:   "Chicago has long punched above its weight in food. The city that gave the world deep dish also gave it some of the most adventurous fine dining in North America. The chefs building that reputation deserve direct recognition from the people eating their food.",
    chefSlugs: [],
  },
  tokyo: {
    name:    "Tokyo",
    slug:    "tokyo",
    country: "Japan",
    flag:    "🇯🇵",
    intro:   "Tokyo has more Michelin stars than any other city on earth. Tipping is not customary in Japan but for Japanese chefs cooking abroad, and for the international chefs working in Tokyo's global restaurant scene, Tip a Chef offers a direct way to receive appreciation.",
    chefSlugs: [],
  },
  berlin: {
    name:    "Berlin",
    slug:    "berlin",
    country: "Germany",
    flag:    "🇩🇪",
    intro:   "Berlin's food scene has quietly become one of the most interesting in Europe. A new generation of chefs is doing genuinely original work here, largely outside the Michelin spotlight. Tip a Chef gives their diners a way to support them directly.",
    chefSlugs: [],
  },
};

// ─── Cuisines ─────────────────────────────────────────────────────────────────

export interface CuisineData {
  name:      string;
  slug:      string;
  intro:     string;
  chefSlugs: string[];
}

export const CUISINES: Record<string, CuisineData> = {
  italian: {
    name:  "Italian",
    slug:  "italian",
    intro: "Italian cooking is one of the most studied and most misunderstood cuisines in the world. A great Italian chef is not following a recipe. They are expressing a region, a season, and a memory in every plate. Support them directly.",
    chefSlugs: ["marco-esposito"],
  },
  french: {
    name:  "French",
    slug:  "french",
    intro: "French cuisine is the foundation on which most professional cooking is built. The chefs who dedicate their careers to it are some of the most technically demanding and least publicly recognised professionals in any industry. A direct tip changes that.",
    chefSlugs: ["pierre-laurent"],
  },
  greek: {
    name:  "Greek",
    slug:  "greek",
    intro: "Greek food is having a moment, but it is not a trend. It is a rediscovery of a cuisine that has always been extraordinary. The chefs leading that rediscovery deserve direct recognition from the diners who get to experience it.",
    chefSlugs: ["dimitri-kostas"],
  },
  mediterranean: {
    name:  "Mediterranean",
    slug:  "mediterranean",
    intro: "Mediterranean cooking covers some of the most diverse and historically rich food cultures on earth. The chefs who navigate that range with honesty and genuine skill are worth seeking out and supporting directly.",
    chefSlugs: ["marco-esposito", "dimitri-kostas"],
  },
  japanese: {
    name:  "Japanese",
    slug:  "japanese",
    intro: "Japanese chefs bring a level of precision, patience, and craft to their work that is unmatched in any other culinary tradition. For Japanese chefs cooking abroad, a direct tip through Tip a Chef is a gesture of genuine respect.",
    chefSlugs: [],
  },
  spanish: {
    name:  "Spanish",
    slug:  "spanish",
    intro: "Spain has produced some of the most important culinary ideas of the last thirty years. The chefs working in that tradition carry enormous creative pressure and receive relatively little public acknowledgment. Direct tipping changes that.",
    chefSlugs: [],
  },
  indian: {
    name:  "Indian",
    slug:  "indian",
    intro: "Indian cuisine is one of the most complex and regionally diverse on earth, yet it is consistently undervalued in the restaurant tipping economy. The chefs who execute it with genuine skill deserve more than a table-side compliment.",
    chefSlugs: [],
  },
  american: {
    name:  "American",
    slug:  "american",
    intro: "American cooking has never been more ambitious or more honestly regional. The new generation of American chefs are serious, technically skilled, and underpaid relative to what they bring to a plate. Direct tips give them the recognition the system has always missed.",
    chefSlugs: [],
  },
  british: {
    name:  "British",
    slug:  "british",
    intro: "British food has a reputation problem it does not deserve. The chefs redefining what British cooking means are doing extraordinary work. A direct tip through Tip a Chef is the most honest thing a diner can do after experiencing it.",
    chefSlugs: [],
  },
  thai: {
    name:  "Thai",
    slug:  "thai",
    intro: "Thai cuisine balances heat, sweetness, sourness, and salt with a precision that takes years to master. The chefs who have built that mastery deserve direct recognition from the diners who benefit from it most.",
    chefSlugs: [],
  },
  chinese: {
    name:  "Chinese",
    slug:  "chinese",
    intro: "Chinese cuisine is not one cuisine. It is eight major traditions and hundreds of regional variations, each demanding a lifetime of study. The chefs who carry that knowledge into their restaurants deserve far more than a generic five-star review.",
    chefSlugs: [],
  },
  mexican: {
    name:  "Mexican",
    slug:  "mexican",
    intro: "Mexican cooking is one of only two cuisines recognised by UNESCO as an intangible cultural heritage. The chefs preserving and evolving that tradition work with a depth of knowledge most diners never see. Tip a Chef gives them a direct way to be recognised for it.",
    chefSlugs: [],
  },
};

// ─── Tip guides ───────────────────────────────────────────────────────────────

export interface TipGuideSection {
  h2: string;
  p:  string;
}

export interface TipGuideData {
  name:      string;
  slug:      string;
  flag:      string;
  norm:      string;
  sections:  TipGuideSection[];
  cityLinks: string[];
}

export const TIP_GUIDES: Record<string, TipGuideData> = {
  uk: {
    name: "the UK",
    slug: "uk",
    flag: "🇬🇧",
    norm: "10 to 12.5 percent service charge is standard in UK restaurants, but this almost never reaches kitchen staff.",
    sections: [
      {
        h2: "Does tipping reach the chef in UK restaurants?",
        p:  "In most UK restaurants, the service charge or cash tip you leave goes to the front of house team. Since the Employment (Allocation of Tips) Act came into force in 2024, restaurants are legally required to pass all tips to staff without deduction. However, many establishments still distribute heavily in favour of servers over kitchen staff. The chef who made your food often receives a fraction of what you intended, if anything at all.",
      },
      {
        h2: "How to tip a chef directly in the UK",
        p:  "The simplest method is Tip a Chef. If the restaurant displays a QR code at the pass, on the menu, or at the host stand, you can scan it, choose an amount, and the tip goes directly to the chef's personal account. No restaurant involvement. No distribution formula. The entire amount reaches the person who cooked your food within 24 to 48 hours via Stripe.",
      },
      {
        h2: "How much should you tip a chef in the UK?",
        p:  "There is no standard for direct chef tipping because it has never existed as a mechanism before. Most people on Tip a Chef in the UK send between £5 and £25 depending on how genuinely the meal moved them. A £10 direct tip to the chef who made your evening is more meaningful than £50 going into a pool they may receive very little of.",
      },
    ],
    cityLinks: ["london"],
  },
  usa: {
    name: "the USA",
    slug: "usa",
    flag: "🇺🇸",
    norm: "20 percent on the pre-tax total is the American standard. Almost all of it goes to front of house staff.",
    sections: [
      {
        h2: "Why chefs in America rarely see tips",
        p:  "The American tipping system was never designed with kitchen staff in mind. The 20 percent you leave in New York or Los Angeles goes to the server as a supplement to a base wage that restaurants legally keep low precisely because tips are expected. Back of house staff earn a standard hourly rate and receive nothing from the tip line on your receipt.",
      },
      {
        h2: "How to tip a chef directly in the USA",
        p:  "Tip a Chef lets you send money and a personal message directly to a specific chef. If the restaurant has a Tip a Chef QR code visible, scanning it takes thirty seconds. If you want to tip a chef you know by name, search for their profile at tipachef.com. The money reaches them directly via Stripe with no restaurant cut.",
      },
      {
        h2: "How much to tip a chef in the USA",
        p:  "The average direct tip on Tip a Chef in the United States is between $12 and $25. There is no wrong amount. Some diners send $5 after a weeknight dinner. Some send $50 after a tasting menu that genuinely moved them. The gesture matters more than the size.",
      },
    ],
    cityLinks: ["new-york", "los-angeles", "chicago"],
  },
  france: {
    name: "France",
    slug: "france",
    flag: "🇫🇷",
    norm: "Service compris is included in every French bill. Most diners leave nothing extra, and kitchen staff rarely receive any direct appreciation.",
    sections: [
      {
        h2: "Tipping culture in French restaurants",
        p:  "France operates on a service compris system. The tip is legally included in every restaurant bill, which means most diners leave nothing additional. This creates a situation where kitchen staff receive a stable but modest wage and almost never experience the kind of direct appreciation that a tip represents. The personal gesture is entirely absent from French dining culture.",
      },
      {
        h2: "How to tip a chef directly in France",
        p:  "Tip a Chef works in France exactly as it does everywhere else. If a restaurant displays a QR code, scanning it sends a direct payment to the chef's account. For French chefs with a public profile, you can find them at tipachef.com and send a tip and a message at any time. The experience of receiving direct appreciation is genuinely rare for French kitchen staff.",
      },
      {
        h2: "Is it appropriate to tip a chef in France?",
        p:  "Absolutely. While tipping culture in France has historically been minimal, direct chef tipping through a platform like Tip a Chef is entirely separate from the restaurant bill. It is a personal gesture between diner and cook, not a commentary on service. Most French chefs who receive direct tips describe it as one of the more surprising and memorable parts of their working life.",
      },
    ],
    cityLinks: ["paris"],
  },
  italy: {
    name: "Italy",
    slug: "italy",
    flag: "🇮🇹",
    norm: "Coperto (cover charge) is standard in Italy. Additional tipping is uncommon but growing in tourist-heavy cities.",
    sections: [
      {
        h2: "Do you tip chefs in Italy?",
        p:  "Italy has a coperto system, a small cover charge included in most restaurant bills. Additional tipping is uncommon in everyday Italian restaurants, although it is more expected in tourist-facing venues in cities like Rome, Florence, and Milan. Kitchen staff in Italy earn a fixed wage and rarely receive any form of direct appreciation from diners.",
      },
      {
        h2: "How to tip an Italian chef directly",
        p:  "Tip a Chef gives you a way to acknowledge a specific Italian chef directly, whether you are eating in Italy or have just been served by an Italian chef abroad. The platform handles the payment. You add a personal message if you want to. The chef receives it directly within 24 hours via Stripe.",
      },
      {
        h2: "The right amount to tip a chef in Italy",
        p:  "Because direct chef tipping is new in Italy, there is no social norm to reference. Most people on Tip a Chef send the equivalent of one to three euros per course if the meal was genuinely exceptional, but any amount is welcomed. The message you leave alongside the tip often matters more to the chef than the sum.",
      },
    ],
    cityLinks: ["rome"],
  },
  greece: {
    name: "Greece",
    slug: "greece",
    flag: "🇬🇷",
    norm: "Around 10 percent is typical in Greek restaurants. It rarely reaches the kitchen.",
    sections: [
      {
        h2: "How does tipping work in Greek restaurants?",
        p:  "In Greece, tipping is common but informal. Leaving around 10 percent is appreciated and expected at most tourist restaurants. In local tavernas, rounding up the bill is the standard gesture. In neither case does the tip reliably reach the kitchen staff who cooked the meal. It is typically kept by the server or split between front of house.",
      },
      {
        h2: "Sending a direct tip to a Greek chef",
        p:  "Greek chefs on Tip a Chef can receive direct tips from diners anywhere in the world. Whether you ate at a restaurant in Athens last week and are still thinking about the lamb, or you have just been to a Greek restaurant in London, finding the chef's profile and sending a direct tip takes under a minute.",
      },
      {
        h2: "Why Greek chefs deserve direct appreciation",
        p:  "Greek cuisine is undergoing one of the most interesting creative periods in its history. A new generation of Greek chefs, many trained abroad and returned home, are taking the country's culinary traditions somewhere genuinely exciting. Direct tips through Tip a Chef are a way for diners to say: I see what you are doing, and I am behind it.",
      },
    ],
    cityLinks: ["athens"],
  },
  australia: {
    name: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    norm: "Tipping in Australia is not expected but is appreciated. Around 10 percent is common for good service.",
    sections: [
      {
        h2: "Do you tip chefs in Australia?",
        p:  "Australia has a higher minimum wage than most countries, which means tipping is not as socially mandatory as it is in the US. That said, it is appreciated, and the culture around tipping has grown significantly in the last decade. Kitchen staff are almost never included in any tip distribution even when tips are given.",
      },
      {
        h2: "How to tip an Australian chef directly",
        p:  "Tip a Chef operates in Australia exactly as it does globally. If a restaurant displays a QR code, scanning it takes thirty seconds. The tip goes directly to the chef via Stripe. You can also find any Australian chef with a Tip a Chef profile at tipachef.com and tip them at any time after the meal.",
      },
    ],
    cityLinks: ["sydney"],
  },
};
