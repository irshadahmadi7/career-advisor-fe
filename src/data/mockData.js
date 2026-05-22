export const MOCK_REPORT = {
  profile_summary:
    "Senior backend engineer with 7+ years building distributed systems in Python and Go, most recently leading a 6-person platform team at a Series C fintech. Strong track record shipping high-throughput payment infrastructure and mentoring mid-level engineers — well positioned to step into a Staff or Principal role, or to lead platform engineering at a smaller, faster-moving company.",

  job_suggestions: [
    { title: "Staff Software Engineer, Platform", salary_range: "$220k – $295k", why_it_fits: "Your work on the payments ledger rewrite and on-call reduction at Plaidly is exactly the kind of cross-team platform impact Staff roles select for.", top_hiring_industries: ["Fintech", "Developer Tools", "Cloud Infra"] },
    { title: "Principal Backend Engineer", salary_range: "$245k – $320k", why_it_fits: "Your depth in Go, Kafka, and Postgres internals lines up with Principal IC tracks at later-stage infra companies.", top_hiring_industries: ["Fintech", "AI Infrastructure", "Logistics"] },
    { title: "Engineering Manager, Platform", salary_range: "$210k – $285k", why_it_fits: "You already lead a 6-person team, run hiring loops, and own org-level on-call. The IC-to-manager step is a sideways move, not a stretch.", top_hiring_industries: ["Fintech", "Healthtech", "SaaS"] },
    { title: "Head of Platform Engineering", salary_range: "$260k – $340k + equity", why_it_fits: "Seed/Series A startups need a single person who can set technical direction and ship — your generalist range and shipping cadence fit.", top_hiring_industries: ["Early-stage Startups", "Fintech", "Climate Tech"] },
    { title: "Solutions Architect, Payments", salary_range: "$190k – $250k", why_it_fits: "Domain expertise in payments + customer-facing comfort from your Plaidly partner integrations is a rare combo.", top_hiring_industries: ["Fintech", "B2B SaaS", "Enterprise Software"] },
    { title: "Senior Backend Engineer (Go)", salary_range: "$185k – $240k", why_it_fits: "If you want lower scope and more focus time, IC roles at Go-first companies are well within reach with a small comp lift.", top_hiring_industries: ["Developer Tools", "Crypto Infra", "Fintech"] },
    { title: "Senior SRE / Platform Reliability", salary_range: "$200k – $265k", why_it_fits: "Your on-call reduction work (47% MTTR drop) directly maps to senior SRE responsibilities.", top_hiring_industries: ["Fintech", "Cloud Infra", "Healthtech"] },
    { title: "Developer Advocate, Backend", salary_range: "$170k – $230k", why_it_fits: "Your three PyCon talks and active OSS work make this a credible pivot if you want more writing and speaking time.", top_hiring_industries: ["Developer Tools", "Cloud Infra", "API Companies"] },
    { title: "Founding Engineer (Seed-stage Fintech)", salary_range: "$160k – $210k + 0.5–2% equity", why_it_fits: "Payments domain knowledge plus full-stack generalism is the founding-engineer profile most YC fintechs are hunting right now.", top_hiring_industries: ["Fintech", "AI Agents", "Vertical SaaS"] },
  ],

  career_paths: [
    { name: "The Platform Track", overview: "Stay IC. Go deeper. Optimise for technical leverage.", next_role: "Staff Engineer, Platform", mid_term_role: "Principal Engineer", end_goal: "Distinguished Engineer / Architect", why_it_suits: "You light up talking about distributed systems internals and seem to dread 1:1-heavy weeks. The IC ladder lets you compound depth." },
    { name: "The Leadership Track", overview: "Lean into team-building and org design.", next_role: "Engineering Manager", mid_term_role: "Director of Engineering", end_goal: "VP Engineering", why_it_suits: "You already informally manage two engineers, run the team's roadmap, and have led two hiring loops. The formal title is a paperwork change." },
    { name: "The Founder Track", overview: "Trade comp for ownership and surface area.", next_role: "Founding Engineer at seed-stage fintech", mid_term_role: "CTO / co-founder", end_goal: "Technical founder of a venture-backed company", why_it_suits: "Your side project (an open-source PSD2 reconciliation tool) has product instinct in it. You've also bootstrapped a small SaaS before." },
  ],

  skill_gap_analysis: [
    { skill: "Distributed Systems Design", current_level: "Advanced", required_level: "Expert", gap: "Minor" },
    { skill: "Go", current_level: "Advanced", required_level: "Advanced", gap: "None" },
    { skill: "Python", current_level: "Expert", required_level: "Advanced", gap: "None" },
    { skill: "Kubernetes / Infra-as-Code", current_level: "Intermediate", required_level: "Advanced", gap: "Minor" },
    { skill: "System Design (Staff-level)", current_level: "Intermediate", required_level: "Expert", gap: "Major" },
    { skill: "Cross-functional Leadership", current_level: "Intermediate", required_level: "Advanced", gap: "Minor" },
    { skill: "Technical Writing / RFCs", current_level: "Intermediate", required_level: "Advanced", gap: "Minor" },
    { skill: "ML / LLM Systems", current_level: "Beginner", required_level: "Intermediate", gap: "Major" },
    { skill: "Hiring & Interviewing", current_level: "Advanced", required_level: "Advanced", gap: "None" },
    { skill: "Public Speaking", current_level: "Advanced", required_level: "Intermediate", gap: "None" },
  ],

  skills_to_learn: [
    { skill: "Staff-level system design", why_it_matters: "The Staff interview loop is dominated by ambiguous, org-scope system design. Your current frame is service-level, not platform-level.", how_to_learn: "Work through Alex Xu Vol. 2, then run 6 mock interviews with a Staff+ peer at a different company.", time_to_learn: "8–12 weeks" },
    { skill: "Technical writing for executives", why_it_matters: "Senior IC roles are increasingly judged on the docs they produce — RFCs, postmortems, vision docs read by VPs.", how_to_learn: "Write one public engineering blog post per month. Get a writing coach for two sessions to find your voice.", time_to_learn: "Ongoing — 3 months for first wins" },
    { skill: "LLM application engineering", why_it_matters: "Every infra job posting in the last 12 months now asks for it. Even if you don't love AI, declining to learn it is a career tax.", how_to_learn: "Build one production-grade RAG service. Read the OpenAI cookbook end to end. Take Andrew Ng's LangChain short course.", time_to_learn: "6–10 weeks" },
    { skill: "Engineering economics", why_it_matters: "Staff/Principal roles require translating engineering decisions into dollars. You currently optimise for elegance, not cost-of-delay.", how_to_learn: "Read 'An Elegant Puzzle' (Larson) and 'Accelerate' (Forsgren). Shadow a finance partner for a sprint.", time_to_learn: "4 weeks of reading + ongoing practice" },
    { skill: "Mentorship at scale", why_it_matters: "Your manager mentioned in your last review that your mentorship is excellent but only reaches 2–3 people. Staff promo requires broader leverage.", how_to_learn: "Start an internal office-hours rotation. Run a brown-bag series. Mentor an open-source contributor publicly.", time_to_learn: "Ongoing" },
    { skill: "Conflict & influence without authority", why_it_matters: "Your most cited gap in 360s. Cross-team Staff work lives or dies on this.", how_to_learn: "Crucial Conversations (book). Find a coach. Practice in your existing team's hardest review threads.", time_to_learn: "3–6 months" },
    { skill: "Product sense for infra", why_it_matters: "Founding-engineer paths and Head-of-Platform roles want someone who shapes 'what to build,' not just 'how.'", how_to_learn: "Pair with a PM on one project. Read Marty Cagan's Inspired. Run user interviews with your platform's internal customers.", time_to_learn: "2–4 months" },
    { skill: "Negotiation", why_it_matters: "You are likely underpaid by $25–45k for your market level. The single highest-ROI skill on this list per hour invested.", how_to_learn: "Read Levels.fyi negotiation guide. Hire a coach (e.g. Rora, Candor) for one cycle. Practice with 3 cold offers.", time_to_learn: "2 weeks of prep per cycle" },
  ],

  career_roadmap: {
    immediate_0_3_months: [
      "Refactor LinkedIn headline and resume top-of-page to lead with 'Staff/Principal candidate,' not 'Senior Engineer.'",
      "Publish two technical posts on the payments ledger rewrite — anchor your public narrative.",
      "Set a 30-minute monthly calendar block for outbound — reach out to 3 ex-colleagues now in Staff+ roles.",
      "Identify 8 target companies and 1 internal champion at each.",
      "Run a mock Staff system-design interview with someone outside your current company.",
    ],
    short_term_3_12_months: [
      "Land a Staff/Principal interview loop and accept or decline based on offers, not curiosity.",
      "Lead one cross-team initiative visible to a VP+ at current job (insurance, in case external doesn't land).",
      "Ship one production LLM feature, however small — closes the 'no AI experience' gap on your resume.",
      "Write a public engineering RFC and circulate it in two Slack communities.",
      "Negotiate a 15–25% comp bump on whichever path you take — internal promo or external offer.",
    ],
    mid_term_1_3_years: "Settle into the role you choose (Staff IC, EM, or founding engineer) and prove impact at that level. The goal at 18 months is to be the obvious internal candidate for the next step.",
    long_term_3_7_years: "Principal Engineer at a respected infra company, or VP Engineering at a Series B/C, or technical co-founder of a venture-backed company. All three are reachable from where you are — the decision is which one matches your life, not your ability.",
  },

  live_job_postings: [
    {
      search_title: "Staff Software Engineer, Platform",
      jobs: [
        { title: "Staff Software Engineer, Platform", company: "Ramp", location: "New York, NY (Hybrid)", employment_type: "Full-time", posted_date: "2 days ago", salary: "$240k – $295k + equity", apply_link: "#" },
        { title: "Staff Engineer, Core Infrastructure", company: "Mercury", location: "Remote (US)", employment_type: "Full-time", posted_date: "5 days ago", salary: "$235k – $285k", apply_link: "#" },
        { title: "Staff Backend Engineer", company: "Modern Treasury", location: "San Francisco, CA", employment_type: "Full-time", posted_date: "1 day ago", salary: "$240k – $310k + equity", apply_link: "#" },
      ],
    },
    {
      search_title: "Principal Backend Engineer",
      jobs: [
        { title: "Principal Engineer, Payments", company: "Stripe", location: "Remote (Global)", employment_type: "Full-time", posted_date: "3 days ago", salary: "$280k – $360k + equity", apply_link: "#" },
        { title: "Principal Backend Engineer", company: "Plaid", location: "New York, NY", employment_type: "Full-time", posted_date: "6 days ago", salary: "Not disclosed", apply_link: "#" },
      ],
    },
    {
      search_title: "Engineering Manager, Platform",
      jobs: [
        { title: "Engineering Manager — Payments Platform", company: "Brex", location: "Remote (US)", employment_type: "Full-time", posted_date: "1 day ago", salary: "$225k – $280k + equity", apply_link: "#" },
        { title: "EM, Infrastructure", company: "Vercel", location: "Remote (Global)", employment_type: "Full-time", posted_date: "4 days ago", salary: "$230k – $290k + equity", apply_link: "#" },
        { title: "Senior Engineering Manager, Platform", company: "Notion", location: "San Francisco, CA (Hybrid)", employment_type: "Full-time", posted_date: "Today", salary: "$245k – $310k", apply_link: "#" },
      ],
    },
  ],

  resume_improvements: [
    "Lead the experience section with the payments ledger rewrite at Plaidly — currently buried at the bottom of the role. That single project is your strongest Staff-level signal and should be visible in the first 5 seconds of a recruiter scan.",
    "Quantify the on-call reduction in dollar terms, not just MTTR. '47% MTTR reduction' reads as a number; '~$400k/year saved in eng hours' reads as a Staff-level outcome.",
    "Remove the 'Skills' section as currently written — it is a context-free word soup of 28 technologies. Replace with a 4-line 'How I work' paragraph that pairs technologies with the problems you used them for.",
    "Cut the 2017–2018 startup role to two lines. It's eight years old, off-thesis, and currently takes 30% of page 1.",
    "Add a 'Selected Writing & Talks' section above Education — your PyCon talks and the Kafka post on the company engineering blog are public proof of Staff-level scope and should not require a click to discover.",
  ],
};
