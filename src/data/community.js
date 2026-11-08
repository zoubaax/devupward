export const COMMUNITY_STATS = [
  { value: '2,800+', label: 'Active Engineers', note: 'Worldwide' },
  { value: '140+', label: 'Open-Source Projects', note: 'Shipped' },
  { value: '45+', label: 'Technical Talks', note: 'Archived' },
  { value: '100%', label: 'Free & Community-Led', note: 'Always' },
]

export const COMMUNITY_TRACKS = [
  {
    id: 'ai',
    title: 'AI & Autonomous Systems',
    description: 'Local LLM inference, autonomous agent orchestration, RAG architectures, and fine-tuning pipelines.',
    technologies: ['PyTorch', 'vLLM', 'Ollama', 'Python', 'LangChain'],
    activeDiscussion: 'Optimizing quantized weights on Apple Silicon & CUDA',
    memberCount: '940+',
  },
  {
    id: 'frontend',
    title: 'Frontend & UI Engineering',
    description: 'Next.js 15, React 19 concurrent features, Tailwind v4 design tokens, and high-performance WebGL.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js'],
    activeDiscussion: 'Compiler-driven UI reactivity benchmarks',
    memberCount: '1,200+',
  },
  {
    id: 'systems',
    title: 'Systems & Cloud Infrastructure',
    description: 'High-throughput microservices, distributed storage engines, Linux internals, Go, and Rust.',
    technologies: ['Rust', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL'],
    activeDiscussion: 'Building zero-allocation async network proxies',
    memberCount: '810+',
  },
  {
    id: 'oss',
    title: 'Open Source Guild',
    description: 'RFC review circles, collaborative sprint planning, and mentorship for first-time contributors.',
    technologies: ['GitHub Actions', 'Monorepos', 'CI/CD', 'Documentation'],
    activeDiscussion: 'Community CLI v2.0 architectural roadmap',
    memberCount: '1,500+',
  },
]

export const UPCOMING_EVENTS = [
  {
    id: 'event-1',
    title: 'Building Distributed AI Agents with Local LLMs',
    speaker: 'Alex Rivera',
    speakerRole: 'Staff AI Engineer',
    category: 'Masterclass',
    schedule: 'Thursday • 7:00 PM UTC',
    attendees: 340,
    status: 'RSVP Open',
  },
  {
    id: 'event-2',
    title: 'DevUpward Weekend Sprint #08: Developer Tools',
    speaker: 'Community Leads & Mentors',
    speakerRole: '48h Virtual Hackathon',
    category: 'Hackathon',
    schedule: 'Friday – Sunday • $3,500 in Bounties',
    attendees: 620,
    status: 'Registration Active',
  },
  {
    id: 'event-3',
    title: 'Live Architecture Roast: Bring Your Systems Design',
    speaker: 'Elena Vance',
    speakerRole: 'Principal Cloud Architect',
    category: 'Interactive Review',
    schedule: 'Next Tuesday • 6:00 PM UTC',
    attendees: 280,
    status: 'RSVP Open',
  },
]

export const COMMUNITY_PROJECTS = [
  {
    title: 'OrbitalDB',
    description: 'An embedded in-memory cache with Raft consensus built in Rust by community peers.',
    stars: '840',
    tags: ['Rust', 'Distributed Systems'],
    author: '@marcus_dev & team',
  },
  {
    title: 'PromptMatrix',
    description: 'Open visual testing & latency benchmark workbench for multi-agent LLM graphs.',
    stars: '620',
    tags: ['TypeScript', 'Next.js', 'Python'],
    author: '@sarah_builds',
  },
  {
    title: 'KernelFlow',
    description: 'Lightweight container & socket observability CLI with live terminal histograms.',
    stars: '490',
    tags: ['Go', 'eBPF', 'Linux'],
    author: '@dev_nathan',
  },
]

export const TESTIMONIALS = [
  {
    quote: "DevUpward completely leveled up my engineering. The code reviews here gave me the depth and confidence to transition from mid-level to senior.",
    author: "Zack Chen",
    role: "Senior Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160",
  },
  {
    quote: "Found my co-founder here during Sprint #04. We built an MVP over the weekend that turned into our full-time venture with venture backing.",
    author: "Liam O'Connor",
    role: "Co-Founder & CTO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=160",
  },
  {
    quote: "Zero gatekeeping, zero fluff. Just authentic software craftsmanship and engineers building serious technology together in public.",
    author: "Priya Sharma",
    role: "Systems Architect",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=160",
  },
]

export const FAQS = [
  {
    question: 'What is DevUpward and what happens inside?',
    answer: 'DevUpward is an engineering guild and collaborative network. Inside our Discord and GitHub organisation, engineers participate in 48-hour build sprints, attend architectural deep-dive AMAs, exchange line-by-line PR reviews, and form teams for side projects.',
  },
  {
    question: 'Is joining free?',
    answer: 'Yes, 100% free. DevUpward is built on open-source philosophy. All discussions, sessions, review rooms, and community repositories are open to all registered developers.',
  },
  {
    question: 'Is this suitable for both early engineers and senior builders?',
    answer: 'Yes. While our technical tracks explore advanced system designs, we maintain dedicated mentorship channels and welcoming sprint teams where engineers at any level learn by building real software alongside experienced contributors.',
  },
  {
    question: 'How do the build sprints and bounties work?',
    answer: 'Twice a month, we announce a 48-hour sprint focus. You can build solo or team up in Discord, ship working code on GitHub, demonstrate your prototype on Sunday livestream, and receive peer votes and sponsored bounties.',
  },
]

