// Tipping-guide content cluster. Targets the high-intent "do you tip / how much
// to tip a [type] chef" search demand that is the brand's core territory.
// Each guide renders at /tipping/[slug] with a Quick Answer (AI Overview hook),
// honest etiquette content, FAQ + Article schema, and a "tip directly" CTA.

export type TippingCategory = "Chef type" | "Occasion" | "Hibachi & Japanese" | "By country" | "Industry";

export interface TippingGuide {
  slug: string;
  question: string;          // H1 + <title>
  category: TippingCategory;
  shortAnswer: string;       // 50-70 word AI-Overview answer
  amount: string;            // headline figure, e.g. "15–20%"
  amountLabel: string;       // caption under the figure
  body: string[];            // 2-4 paragraphs
  faqs: { q: string; a: string }[];
  related: string[];         // related slugs
}

export const TIPPING_GUIDES: TippingGuide[] = [
  // ── Private chef ───────────────────────────────────────────────
  {
    slug: "do-you-tip-a-private-chef",
    question: "Do you tip a private chef?",
    category: "Chef type",
    amount: "15–20%",
    amountLabel: "of the total bill, when service is not already included",
    shortAnswer:
      "Yes, you tip a private chef. A gratuity of 15–20% of the total cost is customary for a private chef who shops, cooks, serves, and cleans up in your home. Always check first whether a service charge is already included. If it is, an extra 5–10% for exceptional work is a kind gesture, not an obligation.",
    body: [
      "Tipping a private chef is standard practice and genuinely appreciated. A private chef does far more than cook: they plan the menu with you, shop for ingredients, prep, cook, plate, serve, and leave your kitchen spotless. That is a full day of skilled work, and a gratuity recognises it.",
      "The usual range is 15–20% of the total cost of the experience. For a flawless evening, or for a chef who went out of their way with dietary requests or a surprise course, 20% or more is a warm way to say thank you. Before you tip, check your agreement or invoice: some chefs and agencies build a service charge into the price, in which case an additional tip is optional.",
      "The cleanest way to tip is directly to the chef, so the full amount reaches the person who cooked rather than being split or pooled. With Tip a Chef you can scan the chef's QR code or open their link and send a tip from your phone in seconds, no cash required.",
    ],
    faqs: [
      { q: "Is it rude not to tip a private chef?", a: "It is not rude if a service charge was already included and clearly stated. If no service charge was included, a tip is expected for good service, the same way it is in a restaurant." },
      { q: "Do you tip a private chef before or after the meal?", a: "After the meal, once the service is complete. This lets you base the gratuity on the full experience, including how the chef handled serving and clean-up." },
      { q: "Can you tip a private chef with a card?", a: "Yes. Many private chefs accept card or digital tips. With Tip a Chef, diners scan a QR code and pay with any card, and the tip goes straight to the chef's account." },
    ],
    related: ["how-much-to-tip-a-private-chef", "should-you-tip-a-private-chef", "what-is-a-good-tip-for-a-private-chef", "do-you-tip-a-personal-chef"],
  },
  {
    slug: "how-much-to-tip-a-private-chef",
    question: "How much do you tip a private chef?",
    category: "Chef type",
    amount: "15–20%",
    amountLabel: "of the total cost for a private dinner",
    shortAnswer:
      "Tip a private chef 15–20% of the total cost of the experience. For a standard private dinner that often works out to $50–$200 depending on the menu and guest count. For exceptional service, or a chef who handled complex dietary needs, 20–25% is a generous and appropriate gesture.",
    body: [
      "The simplest rule is 15–20% of the total, mirroring restaurant tipping. On a $400 private dinner, that is $60–$80. On a larger event, the percentage stays the same even as the dollar figure grows. If the chef's quoted price already includes a service charge, an extra tip is optional rather than expected.",
      "A few things nudge the figure upward: a multi-course tasting menu, a chef who shopped for and accommodated allergies or special requests, a long event, or simply food and service that exceeded what you expected. In those cases 20–25% feels right.",
      "Whatever the amount, tipping the chef directly ensures it reaches them in full. Tip a Chef lets you send the gratuity straight to the chef from your phone after the meal, with no cash and no middleman taking a cut.",
    ],
    faqs: [
      { q: "Is 10% enough to tip a private chef?", a: "10% is on the low side for a private chef, who does the shopping, cooking, serving, and clean-up. 15–20% is the customary range; reserve 10% only for service that fell short." },
      { q: "How much do you tip a private chef for a week?", a: "For a multi-day or week-long booking, a lump-sum tip of one day's rate, or 10–15% of the total, is common. Agree expectations up front for longer engagements." },
      { q: "Do you tip on the food cost or the total?", a: "Tip on the total cost of the service, which usually already includes ingredients, rather than trying to separate out the groceries." },
    ],
    related: ["do-you-tip-a-private-chef", "what-is-a-good-tip-for-a-private-chef", "how-much-to-tip-a-private-chef-in-italy", "how-much-to-tip-a-private-chef-in-france"],
  },
  {
    slug: "should-you-tip-a-private-chef",
    question: "Should you tip a private chef?",
    category: "Chef type",
    amount: "Yes",
    amountLabel: "15–20% is customary for good service",
    shortAnswer:
      "Yes, you should tip a private chef when the service is good and a gratuity is not already included. A private chef shops, cooks, serves, and cleans up, so 15–20% of the total is the customary thank-you. If a service charge was built into the price, an additional tip is optional.",
    body: [
      "Should is really a question of etiquette, and the etiquette is clear: a private chef is a service professional, and tipping for good service is expected in the same way it is at a restaurant. The difference is that a private chef does the whole job alone, from the grocery run to the final wipe-down of your counters.",
      "The one time you are not obliged to tip is when a service charge is already itemised on your invoice. Even then, many people add a small extra for work that genuinely stood out. When in doubt, ask the chef or agency in advance whether gratuity is included, so there are no awkward moments at the end of the night.",
      "If you do tip, give it directly to the chef. Tip a Chef makes that effortless: the chef shares a QR code or link, you pay from your phone, and 95% goes straight to them.",
    ],
    faqs: [
      { q: "What happens if I do not tip a private chef?", a: "If no service charge was included, skipping the tip reads the same as not tipping a server: it signals the service disappointed you. If you were happy, a tip is the expected courtesy." },
      { q: "Is tipping a private chef mandatory?", a: "It is not legally mandatory, but it is socially expected for good service unless gratuity is already included in the price." },
    ],
    related: ["do-you-tip-a-private-chef", "how-much-to-tip-a-private-chef", "what-is-a-good-tip-for-a-private-chef"],
  },
  {
    slug: "what-is-a-good-tip-for-a-private-chef",
    question: "What is a good tip for a private chef?",
    category: "Chef type",
    amount: "20%",
    amountLabel: "is a strong tip; 15% is standard, 25% is generous",
    shortAnswer:
      "A good tip for a private chef is around 20% of the total cost. 15% is the standard baseline, 20% signals you were genuinely happy, and 25% or more is generous and appropriate for an exceptional, complex, or large event. If a service charge is already included, a smaller extra tip still lands well.",
    body: [
      "Think of it as a sliding scale. 15% is the polite baseline for solid service. 20% says the evening was a real success. 25% and up is reserved for the standout nights: a tasting menu pulled off without a hitch, a chef who quietly handled a guest's allergy, or a large party served single-handed.",
      "A flat amount can work too. For an intimate dinner, $40–$80 is a common range; for a bigger event, people often tip a round figure that lands near 20% of the total. The number matters less than the gesture, and tipping the chef directly matters most of all.",
      "Tip a Chef exists so that the gratuity reaches the chef in full. Instead of cash that might get split or forgotten, you scan their code and the tip goes to their account instantly.",
    ],
    faqs: [
      { q: "Is $100 a good tip for a private chef?", a: "For a dinner in the $400–$600 range, $100 is a strong, generous tip of roughly 17–25%. For a smaller dinner it is very generous; for a large event it may land closer to standard." },
      { q: "Should the tip be bigger for more guests?", a: "Yes, because the total cost is higher and the chef's workload is greater. The percentage stays the same, so the dollar amount naturally rises." },
    ],
    related: ["how-much-to-tip-a-private-chef", "do-you-tip-a-private-chef", "should-you-tip-a-private-chef"],
  },

  // ── Personal chef ──────────────────────────────────────────────
  {
    slug: "do-you-tip-a-personal-chef",
    question: "Do you tip a personal chef?",
    category: "Chef type",
    amount: "10–20%",
    amountLabel: "depending on whether it is a one-off or ongoing service",
    shortAnswer:
      "Yes, you tip a personal chef, though the norm differs from a one-off private dinner. For a single session, 15–20% is customary. For a regular personal chef who cooks for you weekly, many clients tip a lump sum periodically, such as one session's fee around the holidays, rather than on every visit.",
    body: [
      "A personal chef often serves several clients, preparing meals in advance or on a recurring schedule. For a one-time booking, treat it like a private chef and tip 15–20%. For an ongoing arrangement, the etiquette shifts toward periodic appreciation: a holiday bonus equal to a session or a week, or a smaller tip each visit if you prefer.",
      "If a personal chef is hired through an agency, check whether gratuity is built into the rate. When it is not, a tip for consistent, high-quality work is both expected and a good way to keep a great chef happy.",
      "However you choose to tip, doing it directly means the chef keeps the full amount. Tip a Chef lets you send a gratuity straight to your personal chef from your phone whenever you like.",
    ],
    faqs: [
      { q: "Do you tip a personal chef every visit?", a: "You can, but for a recurring chef many clients prefer a larger periodic tip, such as a holiday bonus, rather than tipping on each individual visit." },
      { q: "What is a good holiday tip for a personal chef?", a: "A common holiday tip for a regular personal chef is the equivalent of one week or one session of their normal fee." },
    ],
    related: ["how-much-to-tip-a-personal-chef", "do-you-tip-a-private-chef", "do-you-tip-a-home-chef"],
  },
  {
    slug: "how-much-to-tip-a-personal-chef",
    question: "How much do you tip a personal chef?",
    category: "Chef type",
    amount: "15–20%",
    amountLabel: "per session, or a periodic bonus for ongoing service",
    shortAnswer:
      "Tip a personal chef 15–20% per session for a one-off or occasional booking. For a regular personal chef who cooks weekly, a periodic bonus, such as one session's fee at the holidays, is the norm rather than tipping every visit. Always check whether gratuity is already included in an agency rate.",
    body: [
      "For an occasional personal chef, 15–20% of the session cost is the simple guideline. For a weekly or recurring chef, clients usually shift to a periodic model: a holiday bonus of roughly one session or one week of pay is customary and well received.",
      "The deciding factors are frequency and relationship. The more often a chef cooks for you, the more it makes sense to consolidate appreciation into a meaningful periodic tip rather than small amounts each time.",
      "Tipping directly keeps it simple and keeps the chef whole. With Tip a Chef you can send any amount to your personal chef instantly, with no cash and no split.",
    ],
    faqs: [
      { q: "Do you tip a personal chef hired through an app?", a: "Yes, unless the app states gratuity is included. Tipping directly through a tool like Tip a Chef ensures the chef receives the full amount." },
      { q: "Is a personal chef the same as a private chef for tipping?", a: "For a single booking, yes, tip 15–20%. The difference appears with recurring service, where periodic bonuses replace per-visit tips." },
    ],
    related: ["do-you-tip-a-personal-chef", "how-much-to-tip-a-private-chef", "do-you-tip-a-home-chef"],
  },
  {
    slug: "do-you-tip-a-home-chef",
    question: "Do you tip a home chef who cooks at your house?",
    category: "Chef type",
    amount: "15–20%",
    amountLabel: "of the total, for an in-home cooking service",
    shortAnswer:
      "Yes, you tip a chef who comes to cook at your house. An in-home chef handles shopping, cooking, serving, and clean-up in your space, so 15–20% of the total is customary. If the booking already includes a service charge, an additional tip is optional but always appreciated for great service.",
    body: [
      "A chef cooking in your home is doing the most hands-on version of the job, often in an unfamiliar kitchen. That effort, plus the convenience to you, is exactly what a 15–20% gratuity recognises.",
      "Because the chef is in your home, tipping is also a simple, personal moment at the end of the night. Confirm in advance whether gratuity is included, then add your tip based on how the evening went.",
      "Tipping the chef directly, rather than through a platform that pools or skims, means they keep what you intended. Tip a Chef sends your gratuity straight to the chef from your phone.",
    ],
    faqs: [
      { q: "Do you tip a chef that comes to your house for a dinner party?", a: "Yes. Treat it like a private chef booking and tip 15–20% of the total for good service, unless a service charge is already included." },
      { q: "Should you tip the chef and any assistants separately?", a: "If a chef brings a server or assistant, a single tip given to the chef is usually shared, but you can ask how they prefer to handle it." },
    ],
    related: ["do-you-tip-a-private-chef", "do-you-tip-a-personal-chef", "how-much-to-tip-a-private-chef"],
  },

  // ── Hibachi & Japanese ─────────────────────────────────────────
  {
    slug: "do-you-tip-a-hibachi-chef",
    question: "Do you tip a hibachi chef?",
    category: "Hibachi & Japanese",
    amount: "20%+",
    amountLabel: "of the bill, given the live performance",
    shortAnswer:
      "Yes, you tip a hibachi chef. Because the chef cooks at your table and puts on a live performance, tipping toward the higher end, 20% or more of the bill, is customary. If the restaurant pools tips, you can hand a separate cash tip directly to the chef to make sure they receive it.",
    body: [
      "Hibachi is part meal, part show. The chef cooks in front of you, jokes, and performs tricks, all while feeding a full table. That direct, personal service is why hibachi tipping leans higher than a normal restaurant, often 20% or more.",
      "How the tip reaches the chef depends on the restaurant. Some pool tips across the floor, others let the chef keep what is given to them directly. If you want to be sure your chef benefits, a separate cash tip handed to them at the end is the safest route.",
      "For a private hibachi chef who comes to your home, treat it like any in-home private chef and tip 20% of the total, ideally directly so they keep the full amount.",
    ],
    faqs: [
      { q: "Do you tip a hibachi chef separately from the server?", a: "Often yes. The hibachi chef and the server are different roles. A separate tip for the chef, plus a standard tip for the server, is common and well received." },
      { q: "How much do you tip a hibachi chef at home?", a: "For a private hibachi chef at home, 20% of the total is customary, since they bring the equipment, ingredients, and performance to you." },
    ],
    related: ["how-much-to-tip-a-hibachi-chef", "how-much-to-tip-at-benihana", "do-you-tip-the-chef-at-a-japanese-steakhouse", "do-you-tip-a-teppanyaki-chef"],
  },
  {
    slug: "how-much-to-tip-a-hibachi-chef",
    question: "How much do you tip a hibachi chef?",
    category: "Hibachi & Japanese",
    amount: "18–25%",
    amountLabel: "of the bill, reflecting the tableside show",
    shortAnswer:
      "Tip a hibachi chef 18–25% of the bill. Because the chef cooks tableside and performs for your group, hibachi tipping runs higher than standard restaurant service. For a private hibachi chef at home, 20% of the total is the norm. Where tips are pooled, a separate cash tip ensures the chef receives it.",
    body: [
      "The tableside performance is what pushes hibachi tipping above the usual 15%. 18% is a fair baseline, 20% is the common choice, and 25% suits a chef who really made the table laugh and ate up the moment. For large groups, the bill is bigger, so even the standard percentage is a substantial tip.",
      "If the restaurant pools tips, your gratuity may be split among staff. To make sure the chef personally benefits, hand them a separate cash tip. For a private hibachi or teppanyaki chef cooking at your home, the full 20% should go to them directly.",
      "Tip a Chef is built for exactly this: tipping the person who cooked, directly, so the gratuity does not vanish into a pool.",
    ],
    faqs: [
      { q: "Is 20% a good tip for a hibachi chef?", a: "Yes, 20% is a solid, customary tip for a hibachi chef. Go to 25% for an exceptional performance or a large group." },
      { q: "Do you tip a hibachi chef at home more?", a: "At home, tip the full 20% of the total directly to the chef, since there is no restaurant taking a share and they bring everything to you." },
    ],
    related: ["do-you-tip-a-hibachi-chef", "how-much-to-tip-at-benihana", "do-you-tip-a-teppanyaki-chef"],
  },
  {
    slug: "how-much-to-tip-at-benihana",
    question: "How much do you tip at Benihana?",
    category: "Hibachi & Japanese",
    amount: "18–20%",
    amountLabel: "of the pre-discount total",
    shortAnswer:
      "Tip 18–20% at Benihana, calculated on the full pre-discount total. Because your meal includes a tableside hibachi chef performing for the group, tip toward the higher end. If you used a birthday coupon or promotion, tip on what the bill would have been before the discount, not the reduced amount.",
    body: [
      "Benihana is a hibachi experience, so the same logic applies: the chef cooks and performs at your table, and 18–20% is appropriate. Many regulars tip 20% as standard given the show.",
      "One Benihana-specific point: if you used a birthday reward, coupon, or promotion, calculate the tip on the original full price, not the discounted total. The chef did the same work regardless of your coupon.",
      "If you want the chef specifically to benefit rather than the tip pool, a cash tip handed directly to them is the surest way.",
    ],
    faqs: [
      { q: "Do you tip on the Benihana birthday coupon?", a: "Yes. Tip on what the meal would have cost before the discount, since the chef and server did the full job regardless of your coupon." },
      { q: "Do you tip the Benihana chef and server separately?", a: "You can. Many guests leave a standard tip for the server and hand the hibachi chef a separate cash tip for the performance." },
    ],
    related: ["do-you-tip-a-hibachi-chef", "how-much-to-tip-a-hibachi-chef", "do-you-tip-the-chef-at-a-japanese-steakhouse"],
  },
  {
    slug: "do-you-tip-the-chef-at-a-japanese-steakhouse",
    question: "Do you tip the chef at a Japanese steakhouse?",
    category: "Hibachi & Japanese",
    amount: "18–20%",
    amountLabel: "of the bill for the teppanyaki chef",
    shortAnswer:
      "Yes, you tip the chef at a Japanese steakhouse. The teppanyaki or hibachi chef cooks and performs at your table, so 18–20% of the bill is customary, leaning higher for a great show. Many guests leave a separate tip for the chef in addition to the standard tip for their server.",
    body: [
      "At a teppanyaki or hibachi-style Japanese steakhouse, the chef is the centre of the experience. Tipping reflects that: 18–20% is the norm, and a separate cash tip for the chef is a common courtesy on top of the server's tip.",
      "Tip-pooling policies vary, so if you want the chef to personally receive your appreciation, hand it to them directly. For a private teppanyaki chef at home, the full 20% should go straight to them.",
      "Tip a Chef makes direct tipping simple wherever the chef cooks, from a steakhouse counter to your own kitchen.",
    ],
    faqs: [
      { q: "What is the difference between hibachi and teppanyaki tipping?", a: "There is no real difference. Both involve a chef cooking and performing at your table, and both warrant 18–20% or more." },
      { q: "Do you tip the teppanyaki chef in cash?", a: "Cash handed directly to the chef is the most reliable way to ensure they receive it, especially where tips are pooled." },
    ],
    related: ["do-you-tip-a-hibachi-chef", "do-you-tip-a-teppanyaki-chef", "how-much-to-tip-at-benihana"],
  },
  {
    slug: "do-you-tip-a-teppanyaki-chef",
    question: "Do you tip a teppanyaki chef?",
    category: "Hibachi & Japanese",
    amount: "18–25%",
    amountLabel: "of the bill, for the tableside cooking",
    shortAnswer:
      "Yes, you tip a teppanyaki chef. Teppanyaki, like hibachi, features a chef cooking and performing on a flat grill at your table, so 18–25% of the bill is customary. For a private teppanyaki chef who comes to your home, tip 20% of the total directly to the chef.",
    body: [
      "Teppanyaki and hibachi are close cousins: a skilled chef cooks in front of you on a hot surface and turns dinner into a performance. The tipping convention is the same, 18% to 25% depending on the show and the group size.",
      "Where tips are pooled at a restaurant, a separate direct tip ensures the chef benefits. At home, a private teppanyaki chef should receive the full gratuity directly.",
      "With Tip a Chef, you can send that tip to the chef from your phone, so it reaches them in full.",
    ],
    faqs: [
      { q: "How much do you tip a teppanyaki chef at home?", a: "For a private teppanyaki chef at home, 20% of the total is customary and should go directly to the chef." },
      { q: "Is teppanyaki tipping different from a normal restaurant?", a: "Yes, it runs a little higher, 18–25%, because of the tableside cooking and performance." },
    ],
    related: ["do-you-tip-a-hibachi-chef", "how-much-to-tip-a-hibachi-chef", "do-you-tip-the-chef-at-a-japanese-steakhouse"],
  },
  {
    slug: "do-you-tip-a-sushi-chef",
    question: "Do you tip a sushi chef?",
    category: "Chef type",
    amount: "15–20%",
    amountLabel: "of the bill, more at an omakase counter",
    shortAnswer:
      "Yes, you tip a sushi chef. At a standard sushi restaurant, 15–20% of the bill is customary. At an omakase counter, where the chef serves you personally course by course, tipping toward 20% or leaving a direct tip for the chef is the norm. Some high-end omakase spots include service, so check first.",
    body: [
      "When a sushi chef serves you directly across the counter, especially in an omakase format, the service is personal and skilled. 15–20% is standard, and at an intimate omakase a direct tip to the chef is a meaningful gesture.",
      "A growing number of top omakase restaurants build service into the price, so confirm before adding a tip. Where it is not included, 20% reflects the craft and the one-on-one attention.",
      "If you want to thank the chef directly, Tip a Chef lets you send a gratuity straight to them, counter-side or after.",
    ],
    faqs: [
      { q: "Do you tip at omakase?", a: "Yes, unless service is included. 20% or a direct tip to the chef is customary for the personal, multi-course experience." },
      { q: "How much do you tip a sushi chef?", a: "15–20% of the bill at a standard restaurant, and toward 20% at an omakase counter where the chef serves you directly." },
    ],
    related: ["how-much-to-tip-a-sushi-chef", "do-you-tip-a-private-chef", "do-you-tip-a-hibachi-chef"],
  },
  {
    slug: "how-much-to-tip-a-sushi-chef",
    question: "How much do you tip a sushi chef?",
    category: "Chef type",
    amount: "15–20%",
    amountLabel: "of the bill, toward 20% for omakase",
    shortAnswer:
      "Tip a sushi chef 15–20% of the bill. At an omakase counter, where the chef prepares and serves each piece in front of you, tip toward 20% or leave a direct tip for the chef. Check whether service is already included, as some high-end omakase restaurants build it into the price.",
    body: [
      "For everyday sushi, 15–20% mirrors normal restaurant tipping. The number climbs toward 20% for omakase, where the chef's skill and the personal, course-by-course service deserve recognition.",
      "Always check the bill at higher-end places, where a service charge may already be applied. Where it is not, a direct tip to the chef behind the counter is a gracious way to close the meal.",
      "Tip a Chef lets you send that gratuity straight to the chef, so it does not get lost in a pool.",
    ],
    faqs: [
      { q: "Is 20% too much to tip a sushi chef?", a: "No, 20% is appropriate, especially for omakase or attentive counter service. 15% is the baseline for standard service." },
      { q: "Do you tip the sushi chef or the server?", a: "Both roles may be tipped. A standard tip covers the server; a direct tip to the sushi chef recognises the craft at the counter." },
    ],
    related: ["do-you-tip-a-sushi-chef", "how-much-to-tip-a-private-chef", "do-you-tip-a-hibachi-chef"],
  },

  // ── Occasion ───────────────────────────────────────────────────
  {
    slug: "do-you-tip-the-chef-at-a-wedding",
    question: "Do you tip the chef at a wedding?",
    category: "Occasion",
    amount: "$50–$200",
    amountLabel: "per chef, or a percentage of the catering bill",
    shortAnswer:
      "Yes, tipping the wedding chef or catering team is customary, though it is often handled by the couple rather than guests. A common approach is $50–$200 for the head chef, plus a tip for the kitchen and serving staff, or 10–20% of the catering bill if gratuity is not already in the contract.",
    body: [
      "Wedding tipping is usually arranged by the couple or their planner, not individual guests. Check the catering contract first: many already include a service or gratuity charge, in which case extra is optional.",
      "Where it is not included, a tip for the head chef of $50–$200, plus appreciation for the kitchen and serving teams, is a thoughtful standard. Alternatively, a flat 10–20% of the catering total can be split across the team.",
      "If you want to recognise a specific chef who made the food unforgettable, tipping them directly is a lovely personal touch. Tip a Chef makes that simple, even at a busy event.",
    ],
    faqs: [
      { q: "Is gratuity usually included in wedding catering?", a: "Often yes. Many catering contracts add a service charge or gratuity, so read the contract before adding more." },
      { q: "Who tips the chef at a wedding?", a: "Typically the couple or the wedding planner handles vendor tips, including the chef and catering staff, rather than guests." },
    ],
    related: ["do-you-tip-the-chef-at-a-cooking-class", "do-you-tip-a-private-chef", "do-chefs-get-tips"],
  },
  {
    slug: "do-you-tip-the-chef-at-a-cooking-class",
    question: "Do you tip the chef at a cooking class?",
    category: "Occasion",
    amount: "10–20%",
    amountLabel: "of the class price, if not already included",
    shortAnswer:
      "Tipping the chef at a cooking class is appreciated but not always expected. For a private or small-group class where the chef teaches you hands-on, 10–20% of the class price is a kind gesture. For a large commercial class, tipping is optional. Check whether gratuity is already built into the fee.",
    body: [
      "A cooking class blends teaching and service. For an intimate or private class, where the chef gives you direct attention, a tip of 10–20% recognises both their skill and their patience. For a large, ticketed class, tipping is more discretionary.",
      "As always, check whether the price already includes gratuity. If it does, an extra tip is a bonus rather than an expectation.",
      "If a chef made the class genuinely memorable, tipping them directly is a great way to say so. Tip a Chef lets you send it from your phone on the spot.",
    ],
    faqs: [
      { q: "Should you tip a private cooking class chef?", a: "Yes, 10–20% is a thoughtful tip for a private or small-group class with hands-on instruction, unless gratuity is included." },
      { q: "Do you tip at a large group cooking class?", a: "It is optional for large commercial classes. A tip is still welcome if the chef went above and beyond." },
    ],
    related: ["do-you-tip-a-private-chef", "do-you-tip-the-chef-at-a-wedding", "do-chefs-get-tips"],
  },

  // ── Industry / brand wedge ─────────────────────────────────────
  {
    slug: "do-chefs-get-tips",
    question: "Do chefs get tips?",
    category: "Industry",
    amount: "Often nothing",
    amountLabel: "the kitchen is frequently left out of the tip pool",
    shortAnswer:
      "In most restaurants, the chefs in the kitchen get little or none of the tips. Gratuities usually go to front-of-house staff like servers and bartenders. Some restaurants share a small percentage with the kitchen through tip pooling, but in many the people who actually cooked your food receive nothing extra.",
    body: [
      "Here is the uncomfortable truth behind this question. When you tip at a restaurant, that money almost always goes to the front of house: the server, sometimes the bartender and host. The line cooks and chefs who actually made your meal are frequently left out entirely.",
      "Some restaurants run a tip pool that shares a slice with the kitchen, and laws vary by country and state. But across much of the industry, a chef with twenty years of experience can stand over a hot line for fourteen hours and see none of the gratitude that lands on the table.",
      "That gap is the reason Tip a Chef exists. It gives any chef a personal page and QR code, so a diner who loved the food can tip the person who cooked it directly, and the chef keeps 95%. No pool, no front-of-house split, no middleman.",
    ],
    faqs: [
      { q: "Do line cooks get tips?", a: "Usually not directly. In many restaurants tips go to front-of-house staff, and line cooks receive only an hourly wage unless the restaurant shares a tip pool with the kitchen." },
      { q: "How can I tip the chef directly?", a: "Ask if they are on Tip a Chef, or scan their QR code. It sends your tip straight to the chef's account so the kitchen, not just the server, gets recognised." },
      { q: "Why do servers get tips but not chefs?", a: "It is a long-standing convention of restaurant tipping that rewards the customer-facing role. It does not reflect who did the cooking, which is why direct chef tipping is growing." },
    ],
    related: ["do-chefs-make-tips", "do-you-tip-a-private-chef", "do-you-tip-the-chef-at-a-wedding"],
  },
  {
    slug: "do-chefs-make-tips",
    question: "Do chefs make tips?",
    category: "Industry",
    amount: "Rarely",
    amountLabel: "most kitchen pay is salary or hourly, not tips",
    shortAnswer:
      "Most chefs do not make meaningful tips. Restaurant chefs are typically paid a salary or hourly wage, while tips go to front-of-house staff. Private chefs are the exception: they are regularly tipped 15–20% directly by clients. For kitchen chefs, direct tipping tools are starting to close the gap.",
    body: [
      "For a restaurant chef, income is usually a fixed salary or hourly rate. Tips, where they exist, flow to servers and bartenders. So the honest answer is that most chefs do not make tips in any significant way.",
      "Private chefs are different. Because they work directly for a client, they are tipped much like a restaurant server, commonly 15–20% of the job. That direct relationship is exactly what makes tipping work.",
      "Tip a Chef brings that direct relationship to every chef, not just private ones. A diner scans a code, tips the chef who cooked, and the chef keeps almost all of it. It is a way to make tips reach the kitchen at last.",
    ],
    faqs: [
      { q: "Do private chefs get tipped?", a: "Yes, private chefs are commonly tipped 15–20% directly by clients, unlike most restaurant kitchen chefs." },
      { q: "How much extra do chefs make in tips?", a: "For most restaurant chefs, very little. For private chefs, tips can add 15–25% on top of the job fee." },
    ],
    related: ["do-chefs-get-tips", "do-you-tip-a-private-chef", "how-much-to-tip-a-private-chef"],
  },

  // ── By country ─────────────────────────────────────────────────
  {
    slug: "how-much-to-tip-a-private-chef-in-italy",
    question: "How much do you tip a private chef in Italy?",
    category: "By country",
    amount: "5–15%",
    amountLabel: "tipping is lighter in Italy than in the US",
    shortAnswer:
      "In Italy, tipping is more modest than in the US. For a private chef, 5–15% of the total is a generous and appropriate gratuity, and a service charge (servizio) may already be included. Rounding up or adding 10% for excellent service is well received. There is no expectation of a US-style 20% tip.",
    body: [
      "Italian tipping culture is lighter. A coperto (cover charge) or servizio may already appear on the bill, in which case an extra tip is genuinely optional. For a private chef, where the service is personal and full-day, 10–15% for a wonderful experience is generous by Italian standards.",
      "If you are visiting from the US, resist the urge to apply a 20% default. A heartfelt 10% directly to the chef lands very well and is closer to local norms.",
      "However much you give, tipping the chef directly ensures they receive it. Tip a Chef works anywhere, including for chefs cooking in villas and homes across Italy.",
    ],
    faqs: [
      { q: "Is tipping expected in Italy?", a: "Tipping is appreciated but not obligatory in Italy. A service charge is often included, and small extra tips for great service are the norm rather than a fixed percentage." },
      { q: "Do you tip a private chef in a villa in Italy?", a: "Yes, 10–15% for excellent service is generous. Confirm whether gratuity is already included in the villa or chef package." },
    ],
    related: ["how-much-to-tip-a-private-chef", "how-much-to-tip-a-private-chef-in-france", "do-you-tip-a-private-chef"],
  },
  {
    slug: "how-much-to-tip-a-private-chef-in-france",
    question: "How much do you tip a private chef in France?",
    category: "By country",
    amount: "5–15%",
    amountLabel: "service is often included by law",
    shortAnswer:
      "In France, service is frequently included by law (service compris), so tipping a private chef is more modest than in the US. 5–15% of the total for excellent service is generous and appropriate. A direct extra tip for a memorable experience is appreciated but never obligatory.",
    body: [
      "French dining bills often state service compris, meaning service is already included. For a private chef, that convention carries over: a tip is a genuine extra rather than an expectation. For a standout private dinner, 10–15% directly to the chef is a generous gesture by French standards.",
      "Visitors used to US tipping should scale back; a 20% default is not expected. A sincere 10% reaches the chef as a real thank-you.",
      "Tip a Chef lets you give that gratuity directly to a chef cooking anywhere in France, from a Paris apartment to a Provence villa.",
    ],
    faqs: [
      { q: "Is service included in France?", a: "Often yes. Service compris means service is already in the price. Extra tips are optional and reserved for excellent service." },
      { q: "Do you tip a private chef in France?", a: "A tip is appreciated but optional. 10–15% directly to the chef is generous for a memorable private dinner." },
    ],
    related: ["how-much-to-tip-a-private-chef", "how-much-to-tip-a-private-chef-in-italy", "do-you-tip-a-private-chef"],
  },
  {
    slug: "how-much-to-tip-a-private-chef-in-mexico",
    question: "How much do you tip a private chef in Mexico?",
    category: "By country",
    amount: "10–20%",
    amountLabel: "tipping is customary and valued in Mexico",
    shortAnswer:
      "In Mexico, tipping is customary and valued. For a private chef, 10–20% of the total is appropriate, with 15% a common choice and more for exceptional service. Tips, or propinas, are an important part of hospitality income in Mexico, so a direct gratuity to the chef is both expected and appreciated.",
    body: [
      "Mexican hospitality culture embraces tipping. Propinas matter, and for a private chef who shops, cooks, and serves, 10–20% of the total is the norm, with 15% a safe middle and 20% for a wonderful experience.",
      "If you are staying in a villa or resort, confirm whether a service charge is already applied. Where it is not, a direct tip to the chef is a meaningful part of their income.",
      "Tip a Chef makes it easy to tip a private chef directly anywhere in Mexico, from Tulum to Cabo, so the full amount reaches them.",
    ],
    faqs: [
      { q: "Is tipping expected in Mexico?", a: "Yes, tipping is customary and an important part of hospitality income in Mexico. 10–20% is standard for good service." },
      { q: "How much do you tip a private chef at a villa in Mexico?", a: "10–20% of the total, with 15% common. Confirm whether the villa already adds a service charge." },
    ],
    related: ["how-much-to-tip-a-private-chef", "how-much-to-tip-a-private-chef-in-costa-rica", "do-you-tip-a-private-chef"],
  },
  {
    slug: "how-much-to-tip-a-private-chef-in-costa-rica",
    question: "How much do you tip a private chef in Costa Rica?",
    category: "By country",
    amount: "10–15%",
    amountLabel: "a 10% service charge is often already included",
    shortAnswer:
      "In Costa Rica, a 10% service charge is often already included by law. For a private chef, an additional 5–15% on top for excellent personal service is generous and appreciated. If no service charge applies, 10–15% directly to the chef is the customary range.",
    body: [
      "Costa Rican restaurant bills frequently include a 10% service charge by law, plus tax. For a private chef, that convention means a base level of service is covered, and an extra tip rewards a great personal experience.",
      "For a private chef cooking at a villa or rental, 10–15% directly to the chef is a fair and generous gratuity, especially where no service charge applies to the booking.",
      "Tip a Chef lets you send that tip straight to the chef anywhere in Costa Rica, from Tamarindo to Uvita.",
    ],
    faqs: [
      { q: "Is a service charge included in Costa Rica?", a: "Often yes. Many bills include a 10% service charge by law, so an additional tip is an extra for excellent service." },
      { q: "Do you tip a private chef in Costa Rica?", a: "Yes, 10–15% directly to the chef is customary and generous, on top of any included service charge." },
    ],
    related: ["how-much-to-tip-a-private-chef", "how-much-to-tip-a-private-chef-in-mexico", "do-you-tip-a-private-chef"],
  },
  {
    slug: "how-much-to-tip-a-private-chef-in-the-uk",
    question: "How much do you tip a private chef in the UK?",
    category: "By country",
    amount: "10–15%",
    amountLabel: "lighter than the US; check for a service charge",
    shortAnswer:
      "In the UK, tipping is more modest than in the US. For a private chef, 10–15% of the total is a generous and appropriate gratuity for excellent service. Many bookings already include a service charge, in which case an extra tip is optional. A 20% US-style default is not expected.",
    body: [
      "UK tipping is lighter and a discretionary service charge is common. For a private chef, 10–15% for a great experience is generous by British standards, and you are not expected to apply a US-style 20%.",
      "Always check whether the chef or agency already includes a service charge. Where they do, an additional tip is a kind bonus rather than an expectation.",
      "Tip a Chef lets diners across the UK send a gratuity directly to the chef, so the full amount reaches them.",
    ],
    faqs: [
      { q: "Do you tip a private chef in the UK?", a: "Yes, 10–15% for excellent service is generous and appropriate, unless a service charge is already included." },
      { q: "Is 20% expected when tipping in the UK?", a: "No. UK tipping is lighter than the US. 10–15% is generous, and many bills already include a discretionary service charge." },
    ],
    related: ["how-much-to-tip-a-private-chef", "how-much-to-tip-a-private-chef-in-france", "do-you-tip-a-private-chef"],
  },
];

export const TIPPING_GUIDE_BY_SLUG: Record<string, TippingGuide> = Object.fromEntries(
  TIPPING_GUIDES.map((g) => [g.slug, g]),
);

export function getTippingGuide(slug: string): TippingGuide | undefined {
  return TIPPING_GUIDE_BY_SLUG[slug];
}

export function getAllTippingSlugs(): string[] {
  return TIPPING_GUIDES.map((g) => g.slug);
}

export const TIPPING_CATEGORIES: TippingCategory[] = [
  "Chef type", "Hibachi & Japanese", "Occasion", "By country", "Industry",
];

export function getTippingGuidesByCategory(cat: TippingCategory): TippingGuide[] {
  return TIPPING_GUIDES.filter((g) => g.category === cat);
}
