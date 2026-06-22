export interface Course {
  id: string;
  title: string;
  category: string;
  badge: string;
  duration: string;
  description: string;
  highlights: string[];
  careerOutcomes: string[];
  toolsPrerequisites: string;
}

export interface DegreePath {
  id: string;
  degreeName: string;
  fullForm: string;
  idealFor: string;
  bestCombo: string;
  syllabusCovered: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  course: string;
  review: string;
  role: string;
  avatarColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'studios' | 'labs' | 'campus' | 'workshops';
  imageUrl: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const COURSES: Course[] = [
  {
    id: 'digital-marketing',
    title: 'AI-Driven Digital Marketing',
    category: 'Marketing & Strategy',
    badge: 'AI-Enhanced',
    duration: '6 Months / 1 Year',
    description: 'Master next-generation digital branding, dynamic web marketing, and audience monetization powered by real-world generative AI automation tools.',
    highlights: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing (SMM) & Community Building',
      'AI-Powered Copywriting & Automated Design Systems',
      'Advanced Performance Ads & PPC Management',
      'Google Analytics 4 & Data-Driven Decision Making',
      'High-ROI Digital Ad Campaign Architecture'
    ],
    careerOutcomes: [
      'Core Growth Marketer',
      'SEO and Keyword Strategist',
      'Digital Ad Operations Specialist',
      'Social Media Director / Lead',
      'AI Marketing Consultant'
    ],
    toolsPrerequisites: 'Ideal for tech-savvy graduates, entrepreneurs, and content creators. Familiarity with basic social web usage required.'
  },
  {
    id: 'videography',
    title: 'Professional Videography & Content Creation',
    category: 'Media Production',
    badge: '100% Practical Studios',
    duration: '6 Months',
    description: 'Transform raw visual concepts into powerful stories. Train with professional cameras, industry standard audio gears, dynamic lights and cinematic editing software.',
    highlights: [
      'High-End Mirrorless Camera and DSLR Controls',
      'Cinematic Shot Composition & Storyboarding',
      'Professional Lighting Design (Three-Point Setup, Gelling)',
      'Studio-Grade Audio Recording & Multi-track Sync',
      'Advanced Video Editing (Adobe Premiere Pro & DaVinci Resolve)',
      'Viral Content Hooking, Reels & YouTube Strategy'
    ],
    careerOutcomes: [
      'Cinematographer',
      'Independent Film & Promo Editor',
      'Creative Content Director',
      'Motion Graphics Designer',
      'Commercial Video Creator'
    ],
    toolsPrerequisites: 'Full access to professional high-definition camera rigs, studio edit bays, and indoor/outdoor green shoot rigs at campus.'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Online Business Strategy',
    category: 'Entrepreneurship',
    badge: 'Business Incubator',
    duration: '4 Months',
    description: 'Build, launch, and automate high-yielding global or local dropshipping stores with actual supply chain integration, ad structures, and conversion optimization.',
    highlights: [
      'Shopify Platform Development & Customization',
      'High-Margin Product Research & Niche Sourcing',
      'Customer Acquisition Funnels & Facebook/TikTok Ads',
      'Inventory Control and Automated Shipping Log',
      'Direct Sales Psychology & Performance Landing Pages',
      'AI Conversion Rate Optimization (CRO)'
    ],
    careerOutcomes: [
      'E-Commerce Store Owner / Drop-shipper',
      'E-Commerce Brand Manager',
      'Conversion Rate Optimization Analyst',
      'Digital Store Operations Manager'
    ],
    toolsPrerequisites: 'Best suited for visionaries, traditional retail business owners looking to scale digitally, and financial independence seekers.'
  },
  {
    id: 'spoken-english',
    title: 'Spoken English & Personality Development',
    category: 'Professional Skills',
    badge: 'Confidence Accelerator',
    duration: '3 Months',
    description: 'Unlock global standard corporate presentation techniques, direct public speaking confidence, and job selection protocols in an immersive environment.',
    highlights: [
      'Fluency, Context-Usage & Vocabulary Drills',
      'Interactive Public Speaking & Speech Building',
      'Confidence Cultivation & High-Impact Body Language',
      'Resume Engineering & Portfolio Presentation',
      'Simulated Corporate HR Interview Audits',
      'Modern High-Ethical Corporate Workplace Protocol'
    ],
    careerOutcomes: [
      'Global Relations Officer',
      'Client Service and Account Executive',
      'International Sales Counselor',
      'Confidence and PR Coordinator'
    ],
    toolsPrerequisites: 'Ideal for job applicants facing interview friction, university final-years, and professionals prepping for offshore relocations.'
  }
];

export const DEGREE_PATHWAYS: DegreePath[] = [
  {
    id: 'bca',
    degreeName: 'BCA (Computer Applications)',
    fullForm: 'Bachelor of Computer Applications',
    idealFor: 'Aspiring Full Stack Marketers, Tech Startups, and Software Business Managers.',
    bestCombo: 'AI-Driven Digital Marketing + E-Commerce Academy',
    syllabusCovered: [
      'Software Engineering & Cloud Architectures',
      'Traditional Web Analytics and Cloud Computing',
      'Database Optimization & Performance Scaling',
      'Combined with CyberWise Practice: AI Optimization, Automated Sales Funnels, and Ad Tracking.'
    ]
  },
  {
    id: 'bba',
    degreeName: 'BBA (Business Administration)',
    fullForm: 'Bachelor of Business Administration',
    idealFor: 'Future Digital Founders, Corporate Leaders, and Marketing Directors.',
    bestCombo: 'E-Commerce + Professional Spoken English / Presentation',
    syllabusCovered: [
      'Global Marketing Principles & Corporate Strategy',
      'Organizational Behavior & Capital Management',
      'Entrepreneurial Development Ecosystems',
      'Combined with CyberWise Practice: Global Dropshipping Strategy, High-ROI Advertising, and Personality Grooming.'
    ]
  },
  {
    id: 'bcom',
    degreeName: 'B.Com (Commerce)',
    fullForm: 'Bachelor of Commerce',
    idealFor: 'Finance Controllers, Retail Business Inheritors, and Digital Accountants.',
    bestCombo: 'E-Commerce + Digital Marketing Analytics',
    syllabusCovered: [
      'Advanced Banking Accounts & Financial Audit',
      'Business Laws, Tax, and Corporate Finance',
      'International Trade Trends & Marketing Analytics',
      'Combined with CyberWise Practice: ROI Audits, Shopify Inventory Control, Growth Marketing Funnels.'
    ]
  },
  {
    id: 'bsc-ba',
    degreeName: 'BSc / BA (Media & Literature)',
    fullForm: 'Bachelor of Science / Arts Pathways',
    idealFor: 'Modern Journalists, Film Crew Directors, Writers, Creative Consultants, and Social Influencers.',
    bestCombo: 'Professional Videography & Content Creation + Spoken English',
    syllabusCovered: [
      'Mass Media Theories, Journalism & Script Writing',
      'Global Literatures & Rhetoric Strategies',
      'Aesthetic Composition & Audiovisual Communication',
      'Combined with CyberWise Practice: Studio Mirrorless Rig Operations, Non-Linear Editing (DaVinci), and Corporate Public Relations.'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do UGC-Accredited Degree Pathways work at CyberWise?',
    answer: 'At CyberWise, students don’t have to sacrifice practical skill gain to get an official university degree. You can enroll in accredited regular or distance degree tracks (like BBA, BCA, B.Com, BSC) managed under top UGC-recognized Universities, while actively completing practical project-based masteries daily inside our high-tech laboratories and filming studios at Perinthalmanna.'
  },
  {
    id: 'faq-2',
    question: 'Who are the trainers/mentors at CyberWise Skillversity?',
    answer: 'Unlike rote academic setups with zero industry experience, our mentors are active consultants, experienced cinematographers, Shopify store developers, and digital agency partners who bring real industry experience into the classroom.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer job placement support or career guidance?',
    answer: 'Absolutely! Our Career Pathway team conducts mock HR interview drills, resume styling clinics, portfolio hosting reviews, and connects candidates with major digital marketing agencies, media houses, and tech offices across Kerala, Bangalore, and distant remote opportunities.'
  },
  {
    id: 'faq-4',
    question: 'Is there a hybrid or weekend pathway for working professionals?',
    answer: 'Yes, we provide interactive evening circles, weekend cohorts for videography and marketing, as well as customized business consulting slots for e-commerce entrepreneurs looking to digitize their traditional shops.'
  },
  {
    id: 'faq-5',
    question: 'Where is CyberWise Skillversity located and how can I visit?',
    answer: 'Our main campus is situated in Perinthalmanna, Kerala - the premier educational city center. You can walk into our studio complex for a live guided tour, view our filming setup, test the cameras, and chat with our academic advisors face-to-face.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Mohammed Rishad',
    age: 22,
    course: 'AI-Driven Digital Marketing',
    review: 'CyberWise completely changed my outlook on studies. While pursuing my BBA path, I mastered automated SEO and started consulting local brands in Kerala. I joined a major Calicut digital agency immediately after completing the training!',
    role: 'Growth Marketing Lead at Alpha Brand Lab',
    avatarColor: 'bg-violet-600'
  },
  {
    id: 't-2',
    name: 'Suhail Perinthalmanna',
    age: 24,
    course: 'Professional Videography & Video Editing',
    review: 'Handling real professional cameras and editing on modern computer labs at CyberWise was unmatched. They did not teach theory, they put a camera in my hands from day one. I am now doing commercial ad direction and wedding storytelling independently!',
    role: 'Freelance Commercial Cinematographer',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 't-3',
    name: 'Anjali Nair',
    age: 21,
    course: 'E-Commerce & Online Business Strategy',
    review: 'I created my Shopify store during class hours with active help from my mentor. We tested items, built product research, scaled ads and generated 80+ sales in our first month! CyberWise teaches what actually works in real business.',
    role: 'E-Com Entrepreneur, Founder at SleekWeave',
    avatarColor: 'bg-fuchsia-600'
  },
  {
    id: 't-4',
    name: 'Farhan K.',
    age: 23,
    course: 'Spoken English & Personality Prep',
    review: 'The mock interviews, direct stage talks, and business etiquette drills removed my stage fright entirely. I joined CyberWise as a shy student and cleared my very first international customer service interview in Bangalore!',
    role: 'Customer Success Specialist at CloudScale',
    avatarColor: 'bg-indigo-600'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'High-Tech Digital Lab',
    category: 'labs',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=700',
    description: 'Students working on SEO analytics, ad dashboards, and Shopify store builders.'
  },
  {
    id: 'g-2',
    title: 'Professional Film Studio',
    category: 'studios',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=700',
    description: 'Hands-on training session on professional camera operations and lighting.'
  },
  {
    id: 'g-3',
    title: 'Interactive Spoken English Class',
    category: 'workshops',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=700',
    description: 'Public speaking presentations, confidence boosters, and debate circles.'
  },
  {
    id: 'g-4',
    title: 'Post-Production Suite',
    category: 'studios',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=700',
    description: 'Students learning DaVinci Resolve color grading and Premiere Pro video editing.'
  },
  {
    id: 'g-5',
    title: 'AI tools Practical Workshop',
    category: 'workshops',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=700',
    description: 'Deep dive session on prompt engineering for ad creation and copywriting.'
  },
  {
    id: 'g-6',
    title: 'Modern Perinthalmanna Campus',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=700',
    description: 'Step into a world-class workspace designed for collaboration and skill mastery.'
  }
];
