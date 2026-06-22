import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  Sparkles,
  Cpu,
  TrendingUp,
  Video,
  ShoppingBag,
  MessageSquare,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle,
  ArrowUp,
  Send,
  Sun,
  Moon,
  Info,
  Clock,
  Play,
  Check,
  BookOpen,
  Laptop
} from 'lucide-react';
import { 
  COURSES, 
  DEGREE_PATHWAYS, 
  FAQS, 
  TESTIMONIALS, 
  GALLERY_ITEMS,
  Course,
  DegreePath
} from './data/courses';

// CyberWise Premium "Cwi" Geometric Monogram Logo with interactive gradient background
export function CyberWiseLogo({ className = "h-10 w-10", raw = false }: { className?: string; raw?: boolean }) {
  if (raw) {
    return (
      <svg 
        id="cyberwise-vector-logo"
        viewBox="0 0 100 100" 
        className={className} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 'C' shape with sleek flat cuts */}
        <path
          d="M 53 31 A 23 23 0 1 0 53 69"
          stroke="currentColor"
          strokeWidth="9.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* 'w' shape nested inside the arch */}
        <path
          d="M 39 59 L 51 41 L 63 59"
          stroke="currentColor"
          strokeWidth="9.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* Slanted body of 'i' parallel to 'w' */}
        <path
          d="M 66 59 L 77.5 41"
          stroke="currentColor"
          strokeWidth="9.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* Diamond dot of 'i' perfectly angled and aligned with the slant */}
        <path
          d="M 80.5 29.5 L 84 33 L 80.5 36.5 L 77 33 Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <div className={`relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-950 via-indigo-950 to-purple-900 border border-purple-500/20 shadow-lg group-hover:scale-105 transition-all duration-300 ${className}`}>
      {/* Aurora visual flowing light background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-pink-600/20 to-purple-600/40 blur-sm scale-110 opacity-70 animate-pulse" />
      <svg 
        id="cyberwise-badge-logo"
        viewBox="0 0 100 100" 
        className="h-[65%] w-[65%] relative z-10 text-white" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 'C' shape */}
        <path
          d="M 53 31 A 23 23 0 1 0 53 69"
          stroke="currentColor"
          strokeWidth="9.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* 'w' shape */}
        <path
          d="M 39 59 L 51 41 L 63 59"
          stroke="currentColor"
          strokeWidth="9.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* 'i' bar */}
        <path
          d="M 66 59 L 77.5 41"
          stroke="currentColor"
          strokeWidth="9.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
        {/* 'i' dot */}
        <path
          d="M 80.5 29.5 L 84 33 L 80.5 36.5 L 77 33 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function App() {
  // Website States
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Courses States
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'studios' | 'labs' | 'campus' | 'workshops'>('all');
  
  // Testimonial States
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  // Forms States
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryCourse, setInquiryCourse] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  // Main Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submittingContact, setSubmittingContact] = useState(false);

  // AI Advisor Chat Bot States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: '👋 Hello! I am WiseBot, your AI Academic Counselor. Ask me any career, course, or fee question about CyberWise Skillversity, or discover how you can pair university degrees with industry-expert skills!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [hasChatNotification, setHasChatNotification] = useState(true);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Preloader Countdown simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Track page scroll for sticky elements and "Back to Top"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  // Gallery Filter Helper
  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === galleryFilter);

  // Handle Quick FAQ Accordion Toggle
  const toggleFAQ = (id: string) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  // Slider controls for Testimonials
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Course Enquiry Submission Handlers
  const handleCourseInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setSubmittingInquiry(true);
    setTimeout(() => {
      setSubmittingInquiry(false);
      setInquirySubmitted(true);
      setTimeout(() => {
        // Clear Form & Close Modal
        setInquiryName('');
        setInquiryEmail('');
        setInquiryPhone('');
        setInquiryMsg('');
        setInquirySubmitted(false);
        setSelectedCourse(null);
      }, 2500);
    }, 1000);
  };

  // Main Contact Form Submission Handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    setSubmittingContact(true);
    setTimeout(() => {
      setSubmittingContact(false);
      setContactSubmitted(true);
      setTimeout(() => {
        setContactForm({ name: '', email: '', phone: '', course: '', message: '' });
        setContactSubmitted(false);
      }, 4000);
    }, 1200);
  };

  // AI Chat Bot Integration with Full-Stack Express Server Route
  const sendAIMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user' as const, content: textToSend };
    setChatMessages(prev => [...prev, userMessage]);
    if (!customText) setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage]
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error status');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err: any) {
      console.warn('AI integration offline, falling back to simulated helper response.', err);
      // Premium interactive fallback that uses keywords to look highly responsive
      setTimeout(() => {
        let answer = "Thank you for asking! CyberWise Skillversity specializes in hands-on industry masteries combined with UGC online degrees. Yes, our digital marketing and videography paths have extensive practical labs and full studio gear in Perinthalmanna! I recommend visiting our campus today to check out our master-class rooms, or you can submit an inquiry to speak directly with an academic advisor.";
        
        const q = textToSend.toLowerCase();
        if (q.includes('fee') || q.includes('cost') || q.includes('price')) {
          answer = "Hostel & batch structures differ on full portfolio tracks versus single 3/6-month academy diplomas. Our short certification paths are designed to fit college schedules. Simply submit the main contact sheet below, and our Perinthalmanna registrar will forward the complete prospectus with fee breakdowns directly to your WhatsApp!";
        } else if (q.includes('marketing') || q.includes('seo') || q.includes('digital')) {
          answer = "Our Digital Marketing syllabus covers Search Engine Optimization (SEO), Social Media campaigns, Content Generation, Google analytics, and AI ad creation tools. Guided by elite marketing consultants from day one with project review cycles! This path is ideal for student digital entrepreneurs.";
        } else if (q.includes('video') || q.includes('camera') || q.includes('editing')) {
          answer = "Our Videography path covers camera handling, cinematography, studio lighting setup, post-production inside Premiere Pro, and DaVinci Resolve color grading. We pride ourselves on 100% practical studio shooting – no theoretical dry lectures!";
        } else if (q.includes('ugc') || q.includes('degree') || q.includes('bca') || q.includes('bba')) {
          answer = "Under our UGC-Accredited Pathways, you enroll in accredited BCA, BBA, B.Com, or BSc/BA routes via leading recognized Universities, while studying active practical portfolio paths under CyberWise mentors in Perinthalmanna. You earn a valid academic degree alongside standard career skills!";
        } else if (q.includes('placement') || q.includes('job') || q.includes('career')) {
          answer = "Yes! CyberWise provides 100% Job Placement assistance. This includes corporate interview simulation drills, direct connection with creative digital agencies in Kerala, portfolio building guidance, and professional resume grooming.";
        } else if (q.includes('where') || q.includes('locate') || q.includes('perinthalmanna') || q.includes('kerala')) {
          answer = "We are located in Perinthalmanna, Kerala - the premier educational hub near Calicut Road. We invite parents and students to drop by our studios anytime between 9:00 AM and 6:00 PM to inspect our editing labs and cameras!";
        }

        setChatMessages(prev => [...prev, { role: 'assistant', content: answer }]);
      }, 1000);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendAIMessage();
    }
  };

  // Scroll to targeted visual section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Quick suggestion chat prompter
  const triggerQuickQuestion = (question: string) => {
    sendAIMessage(question);
  };

  return (
    <div id="root-div" className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Loading Preloader Animation */}
      {isLoading && (
        <div id="preloader" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500">
          <div className="relative flex flex-col items-center">
            {/* Glowing Orbit Rings & Royal Purple Logo Badge */}
            <div className="relative flex items-center justify-center h-24 w-24">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/10 border-t-purple-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border border-indigo-500/15 border-b-indigo-500 animate-[spin_3s_linear_infinite_reverse]"></div>
              <CyberWiseLogo className="h-14 w-14" />
            </div>
            <h2 className="mt-6 font-bold tracking-widest text-lg uppercase text-slate-200">CyberWise</h2>
            <p className="text-xs text-purple-400/80 mt-1 font-medium font-mono">SKILLVERSITY • PERINTHALMANNA</p>
          </div>
        </div>
      )}

      {/* 2. Glassmorphic Navigation Bar */}
      <nav id="nav-navbar" className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? (theme === 'dark' ? 'bg-slate-950/80 md:bg-slate-950/70 backdrop-blur-md border-b border-purple-900/40 shadow-lg' : 'bg-white/80 md:bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-md')
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo and Title */}
            <div onClick={() => scrollToSection('home')} className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative group/logo">
                <CyberWiseLogo className="h-10 w-10 sm:h-12 sm:w-12 shadow-lg" />
                <span className="absolute -top-1 -right-1 flex h-3.2 w-3.2 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight block">
                  Cyber<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Wise</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase block font-semibold text-purple-400 font-mono">Skillversity</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 sm:space-x-8">
              <button onClick={() => scrollToSection('home')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">Home</button>
              <button onClick={() => scrollToSection('about')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">About</button>
              <button onClick={() => scrollToSection('courses')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">Courses</button>
              <button onClick={() => scrollToSection('pathways')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">Degree Pathways</button>
              <button onClick={() => scrollToSection('why-us')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">Why Us</button>
              <button onClick={() => scrollToSection('gallery')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="font-semibold text-sm hover:text-purple-400 transition-colors cursor-pointer py-2">Contact</button>
            </div>

            {/* Right Header Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Dark/Light mode switcher toggles state */}
              <button 
                id="btn-theme-toggle"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2.5 rounded-full cursor-pointer transition-all ${
                  theme === 'dark' ? 'bg-slate-900 border border-purple-950 hover:bg-slate-800 text-yellow-400' : 'bg-slate-100 border border-slate-300 hover:bg-slate-200 text-purple-900'
                }`}
                title="Toggle visual theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button 
                id="btn-nav-join"
                onClick={() => scrollToSection('contact')}
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 rounded-xl overflow-hidden shadow-md active:scale-95 transition-all cursor-pointer group"
              >
                <span className="relative z-10">Join CyberWise</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>

            {/* Mobile Hamburger Controls */}
            <div className="flex items-center space-x-2 md:hidden">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-900 text-yellow-400' : 'bg-slate-100 text-purple-900'}`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button 
                id="btn-mobile-menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  theme === 'dark' ? 'text-slate-200 hover:bg-slate-900' : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu panel */}
        {isMobileMenuOpen && (
          <div id="mobile-menu-panel" className={`md:hidden absolute w-full left-0 border-b shadow-2xl transition-all duration-300 px-4 py-6 ${
            theme === 'dark' ? 'bg-slate-950/95 border-purple-950 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900'
          }`}>
            <div className="flex flex-col space-y-4 font-semibold text-center">
              <button onClick={() => scrollToSection('home')} className="py-2.5 hover:text-purple-400 text-sm">Home</button>
              <button onClick={() => scrollToSection('about')} className="py-2.5 hover:text-purple-400 text-sm">About</button>
              <button onClick={() => scrollToSection('courses')} className="py-2.5 hover:text-purple-400 text-sm">Courses</button>
              <button onClick={() => scrollToSection('pathways')} className="py-2.5 hover:text-purple-400 text-sm">Degree Pathways</button>
              <button onClick={() => scrollToSection('why-us')} className="py-2.5 hover:text-purple-400 text-sm">Why Us</button>
              <button onClick={() => scrollToSection('gallery')} className="py-2.5 hover:text-purple-400 text-sm">Gallery</button>
              <button onClick={() => scrollToSection('contact')} className="py-2.5 hover:text-purple-400 text-sm">Contact</button>
              
              <div className="pt-4 border-t border-purple-900/30">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-sm tracking-wide rounded-xl shadow-lg active:scale-95 duration-200 cursor-pointer"
                >
                  Join CyberWise Academy
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 3. Immersive Hero Section representing study, tech, media & AI */}
      <section id="home" className="relative pt-24 sm:pt-36 pb-16 sm:pb-28 overflow-hidden min-h-screen flex items-center">
        {/* Futuristic Gradients & Glowing Purple Orbs backgrounds */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-purple-600/10 blur-[90px] sm:blur-[130px] animate-pulse"></div>
          <div className="absolute bottom-[15%] right-[5%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-indigo-600/10 blur-[80px] sm:blur-[110px] animate-pulse delay-700"></div>
          {/* Futuristic grid overlays */}
          <div className={`absolute inset-0 opacity-[0.03] ${theme === 'dark' ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' : 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content Column */}
            <div className="col-span-1 lg:col-span-7 flex flex-col space-y-6 sm:space-y-8 text-left">
              {/* Dynamic Badges */}
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider font-mono uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-sm animate-bounce">
                  🚀 UGC Degree Paths Integrated
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm">
                  🤖 AI-Infused Tech Lab
                </span>
              </div>

              {/* Major Custom Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Bridging Academic Learning with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">Real Industry Careers</span>
              </h1>

              {/* Specific custom subheading */}
              <p className="text-base sm:text-lg text-slate-400 dark:text-slate-300 max-w-2xl leading-relaxed">
                Master AI-driven Digital Marketing, Professional Videography, E-Commerce, and Spoken English while pursuing UGC-accredited degree pathways. Graduate with a powerful portfolio.
              </p>

              {/* Call-to-actions buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <button
                  onClick={() => scrollToSection('courses')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/20 hover:scale-103 active:scale-98 transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  Explore Courses
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-4 font-bold rounded-xl shadow-md border hover:scale-103 active:scale-98 transition-all duration-300 text-center cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-slate-900/60 border-purple-800/50 hover:border-purple-600 text-white hover:bg-slate-800' 
                      : 'bg-white border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Join CyberWise
                </button>
              </div>

              {/* Mini Social proof/Trust factors */}
              <div className="flex items-center space-x-6 pt-2 border-t border-slate-800/10 dark:border-slate-800/50">
                <div className="flex -space-x-2">
                  <div className="h-9 w-9 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs ring-2 ring-slate-950">A</div>
                  <div className="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs ring-2 ring-slate-950">R</div>
                  <div className="h-9 w-9 rounded-full bg-fuchsia-500 flex items-center justify-center font-bold text-xs ring-2 ring-slate-950">F</div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold">Over <span className="text-purple-400">1,850+</span> students trained</p>
                  <p className="text-[11px] text-slate-400 block font-normal">in Perinthalmanna & surrounding regions</p>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Dashboard Panel representation */}
            <div className="col-span-1 lg:col-span-5 relative mt-6 lg:mt-0">
              {/* Main Glowing Border Dashboard */}
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-tr from-purple-500 to-indigo-500 overflow-hidden shadow-2xl">
                <div className="bg-slate-950 p-6 rounded-[23px] relative z-20 flex flex-col space-y-6">
                  {/* Top Bar simulating editing software / active cameras */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="text-xs font-mono tracking-wider font-semibold text-slate-200">LIVE LAB STUDIO CONNECTED</span>
                    </div>
                    <div className="flex space-x-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-800"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-800"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-800"></span>
                    </div>
                  </div>

                  {/* Representative Video/Tech Lab UI */}
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 group">
                    <img 
                      src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=700" 
                      alt="CyberWise Studio setup in Perinthalmanna" 
                      className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
                      {/* Floating Indicator */}
                      <span className="self-end inline-flex items-center px-2 py-0.5 rounded bg-purple-600 text-white font-mono text-[9px] font-bold">
                        CAM 01 // HD MODE
                      </span>
                      {/* Title Overlay */}
                      <div>
                        <p className="text-[10px] text-purple-400 font-mono font-semibold">VIDEOGRAPHY WORKSHOP</p>
                        <h4 className="text-sm font-bold text-white tracking-wide">Multi-camera Cinematic Storytelling Sequence</h4>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio success metric panel */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">MARKETING AD ROI</span>
                        <span className="text-sm font-extrabold text-slate-200">4.8x Avg</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">SHOPIFY LIVE ORDER</span>
                        <span className="text-sm font-extrabold text-green-400">Active Build</span>
                      </div>
                    </div>
                  </div>

                  {/* Live AI chat bubble trigger directly on Hero */}
                  <div 
                    onClick={() => { setIsChatOpen(true); setHasChatNotification(false); }}
                    className="p-3 bg-purple-900/20 border border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-900/30 rounded-xl cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white">
                          <Cpu className="h-4.5 w-4.5" />
                        </div>
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-slate-950 animate-pulse"></span>
                      </div>
                      <div>
                        <p className="text-left font-bold text-xs">WiseBot Career Counselor</p>
                        <p className="text-[10px] text-purple-300 block text-left">Ask me anything about programs & pathways</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-purple-400 animate-ping" />
                  </div>
                </div>
              </div>

              {/* Decorative Absolute items */}
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-extrabold text-sm opacity-50 block md:flex animate-pulse">
                AI
              </div>
              <div className="absolute -bottom-8 -left-8 h-10 w-10 rounded-full bg-indigo-600/30 blur-md block md:block"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Animated Statistics counter banner */}
      <section id="stats-counter" className={`relative py-12 ${
        theme === 'dark' ? 'bg-slate-900/40 border-y border-purple-950/50' : 'bg-slate-100/60 border-y border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                1,850+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase font-mono">
                Students Skilled
              </span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">
                4 Academies
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase font-mono">
                Hands-on Disciplines
              </span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                94% Ratio
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase font-mono">
                Careers Placed
              </span>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                15+ Mentors
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 tracking-wider uppercase font-mono">
                Industry Experts
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 5. About CyberWise Skillversity Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2">ABOUT CYBERWISE</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold mt-1">
              Combine High-Paying Skills with Recognized University Degrees
            </h3>
            <p className="text-slate-400 dark:text-slate-300 mt-4 leading-relaxed">
              We noticed a massive gap: traditional college degrees teach theories but leave students core job-unfit, while skill bootcamps lack formal credentials. CyberWise Skillversity solves this completely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* About left Column (Key points and text) */}
            <div className="flex flex-col space-y-6 text-left">
              <h4 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Transforming the Landscape of Technical & Academic Education
              </h4>
              <p className="text-slate-400 dark:text-slate-300 leading-relaxed">
                Located in Perinthalmanna, Kerala, we provide a futuristic environment where students pursue UGC-approved degrees on the clouds while building digital businesses, editing cinematic sequences, and running ad campaigns in our state-of-the-art studios.
              </p>

              {/* Key points with illustrative icons */}
              <div className="space-y-4 pt-2">
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm tracking-wide">Industry-Oriented Education</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Learn using campaigns, videos, and product sales. No boring written exams.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm tracking-wide">AI-Powered Learning Methods</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Automate copy drafting, run AI analytics, and manage image generation natively.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-400 shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm tracking-wide">Real Practical Projects</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Build actual stores on Shopify, record corporate speeches, and launch active ads.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm tracking-wide">Elite Expert Mentorship</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Learn from active content directors and digital agency founders across Kerala.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* About right Column (Premium bento illustration with student and tech badges) */}
            <div className="relative">
              <div className={`rounded-3xl border p-4 relative overflow-hidden bg-slate-900/40 shadow-inner ${
                theme === 'dark' ? 'border-purple-900/30' : 'border-slate-200'
              }`}>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="space-y-4">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-indigo-950">
                      <img 
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=350" 
                        alt="CyberWise student lab workflow Kerala" 
                        className="object-cover w-full h-full hover:scale-105 duration-300"
                      />
                    </div>
                    {/* Dark/glass indicator card */}
                    <div className="bg-slate-950/90 border border-purple-500/20 p-4 rounded-2xl">
                      <span className="text-xl font-extrabold text-purple-400">100%</span>
                      <p className="text-[10px] text-slate-400 block mt-1 tracking-widest font-mono uppercase">PROJECT INITIATED</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-8">
                    <div className="bg-gradient-to-tr from-purple-900/40 to-indigo-900/40 border border-indigo-500/25 p-4 rounded-2xl">
                      <span className="text-indigo-400 text-sm font-bold block mb-1">State-of-art Studio</span>
                      <p className="text-[11px] text-slate-300">Equipped with 4K cameras, multi-track audio control boards and studio fill lights.</p>
                    </div>
                    <div className="aspect-square rounded-2xl overflow-hidden bg-purple-950">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=350" 
                        alt="CyberWise practical class Perinthalmanna" 
                        className="object-cover w-full h-full hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Absolutes */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 pointer-events-none"></div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Courses & Programs Section */}
      <section id="courses" className={`py-20 ${
        theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-100/40'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2">PRACTICAL ACADEMIES</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold mt-1">Featured Career Pathways</h3>
            <p className="text-slate-400 dark:text-slate-300 mt-3 leading-relaxed">
              Select an academy program. Each course offers extensive hands-on experience, actual project metrics, and resume-ready assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COURSES.map((course) => {
              // Icon selector
              let IconComponent = Cpu;
              if (course.id === 'digital-marketing') IconComponent = TrendingUp;
              if (course.id === 'videography') IconComponent = Video;
              if (course.id === 'ecommerce') IconComponent = ShoppingBag;
              if (course.id === 'spoken-english') IconComponent = MessageSquare;

              return (
                <div 
                  key={course.id} 
                  id={`course-card-${course.id}`}
                  className={`group relative rounded-2xl border p-6 sm:p-8 transition-all hover:-translate-y-1.5 duration-300 flex flex-col justify-between ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-purple-950 hover:border-purple-650/40 shadow-xl' 
                      : 'bg-white border-slate-200 hover:border-purple-300 shadow-md'
                  }`}
                >
                  <div>
                    {/* Top indicator of course card */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        {course.badge}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 group-hover:text-purple-400 transition-colors">
                      {course.title}
                    </h4>
                    
                    <div className="flex items-center space-x-1 text-xs text-purple-400 font-semibold mb-4">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Duration: {course.duration}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-300 mb-6 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Highlights list */}
                    <div className="mb-6">
                      <h5 className="text-[11px] font-mono text-purple-400 tracking-wider uppercase font-bold mb-3">Syllabus Highlights</h5>
                      <ul className="space-y-2">
                        {course.highlights.slice(0, 4).map((hl, index) => (
                          <li key={index} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                            <span className="text-slate-400">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer of course card */}
                  <div className="pt-4 border-t border-slate-800/10 dark:border-slate-800/50 flex items-center justify-between gap-4">
                    <button 
                      onClick={() => { setSelectedCourse(course); setInquiryCourse(course.title); }}
                      className="px-4 py-2 bg-purple-900/15 group-hover:bg-purple-900/35 text-purple-400 text-xs font-bold rounded-lg border border-purple-900/30 transition-all cursor-pointer"
                    >
                      Detail Syllabus
                    </button>
                    <button 
                      onClick={() => { setSelectedCourse(course); setInquiryCourse(course.title); }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Inquire Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. UGC-Accredited Degree Pathways Section */}
      <section id="pathways" className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider font-mono uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm">
              🌟 UGC PATHWAY ACCREDITATIONS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold mt-4">Pair Your Degree with Critical Skills</h3>
            <p className="text-slate-400 dark:text-slate-300 mt-3 leading-relaxed">
              Why settle for only a certificate or only a dry degree? Complete standard university degree pathways in tandem with rigorous hands-on technical bootcamps at CyberWise Perinthalmanna!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {DEGREE_PATHWAYS.map((path) => (
              <div 
                key={path.id}
                className={`p-6 rounded-2xl border transition-all hover:scale-102 ${
                  theme === 'dark' 
                    ? 'bg-slate-900/55 border-purple-900/25 hover:bg-slate-900/80 hover:border-purple-700/30' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                }`}
              >
                <div className="inline-flex py-1 px-2.5 rounded bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase mb-4">
                  {path.degreeName}
                </div>
                <h4 className="text-base sm:text-lg font-bold mt-1 tracking-tight">
                  {path.fullForm}
                </h4>
                <p className="text-xs text-slate-400 mt-2 min-h-[40px]">
                  {path.idealFor}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/10 dark:border-slate-800/60">
                  <span className="text-[10px] text-fuchsia-400 font-mono font-bold block tracking-wider uppercase">IDEAL SKILL PAIRING:</span>
                  <span className="text-xs font-semibold text-slate-200 block mt-1">{path.bestCombo}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/10 dark:border-slate-800/60">
                  <span className="text-[10px] text-slate-400 font-mono font-bold block tracking-wider uppercase">UNIVERSITY SYLLABUS:</span>
                  <ul className="space-y-1.5 mt-2">
                    {path.syllabusCovered.map((syl, i) => (
                      <li key={i} className="flex items-start space-x-2 text-[11px] text-slate-400 leading-normal">
                        <Check className="h-3 w-3 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{syl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Graphical Blueprint Flowchart */}
          <div className={`mt-12 p-6 sm:p-8 rounded-2xl border-2 border-dashed ${
            theme === 'dark' ? 'bg-slate-950 border-purple-950' : 'bg-slate-100/60 border-slate-200'
          }`}>
            <h4 className="text-sm font-mono tracking-widest text-center uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">
              CYBERWISE DEGREE SYNC PROCESS BLUEPRINT
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              
              <div className="relative flex flex-col items-center">
                <div className="h-10 w-10 font-bold font-mono text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mb-3">
                  01
                </div>
                <h5 className="font-bold text-sm tracking-wide text-slate-200">Accredited Base</h5>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">Online registration under UGC-recognized universities. Traditional courses covered.</p>
                <div className="hidden md:block absolute top-5 right-0 translate-x-1/2 text-purple-900 font-extrabold text-xl">➔</div>
              </div>

              <div className="relative flex flex-col items-center">
                <div className="h-10 w-10 font-bold font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center mb-3">
                  02
                </div>
                <h5 className="font-bold text-sm tracking-wide text-slate-200">Daily Skill Mastery</h5>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">Intense hands-on practice inside labs & filming blocks under CyberWise mentors.</p>
                <div className="hidden md:block absolute top-5 right-0 translate-x-1/2 text-purple-900 font-extrabold text-xl">➔</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-10 w-10 font-bold font-mono text-xs text-fuchsia-400 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full flex items-center justify-center mb-3">
                  03
                </div>
                <h5 className="font-bold text-sm tracking-wide text-slate-200">Portfolio Graduation</h5>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">Graduate with a recognized UGC degree and an industry portfolio of actual products & ads.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. Why Choose CyberWise? */}
      <section id="why-us" className={`py-20 ${
        theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-100/40'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2">WHY CYBERWISE</h3>
            <h4 className="text-3xl sm:text-4xl font-extrabold mt-1">Built for the Digital Era</h4>
            <p className="text-slate-400 dark:text-slate-300 mt-2 leading-relaxed">
              We focus purely on the practical metrics that guarantee commercial success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.03] ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950/80 hover:border-purple-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl inline-block mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-sm tracking-wide">AI-Integrated Learning</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                We integrate prompt engineering, automated AI ad copies and workflow automation directly inside our curriculum.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.03] ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950/80 hover:border-purple-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl inline-block mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-sm tracking-wide">Real-World Projects</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Submit raw client campaigns, launch active dropshipping checkouts and compose visual storytelling streams. 
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.03] ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950/80 hover:border-purple-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="p-3 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl inline-block mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-sm tracking-wide">Industry Expert Mentors</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Learn from agency leaders, cinematographers, Shopify consultants, and English coaches with active portfolios.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.03] ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950/80 hover:border-purple-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl inline-block mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-sm tracking-wide">Career Guidance</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Continuous mock HR rounds, intensive interview prep, CV grooming programs, and placements within leading Kerala companies.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.03] ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950/80 hover:border-purple-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl inline-block mb-4">
                <Laptop className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-sm tracking-wide">Modern Learning Environment</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Work in fully air-conditioned studios with professional camera gears, lighting modifiers, and premium visual laboratories.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.03] ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950/80 hover:border-purple-800' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
            }`}>
              <div className="p-3 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl inline-block mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h5 className="font-bold text-sm tracking-wide">Skill-Based Education</h5>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Zero theoretical dry rote loops. Evaluation is based on live projects, campaigns, edits, and communications.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Career Counselor Chatbot - Bento / core section */}
      <section id="ai-advisor-section" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Bot Prompt Section */}
            <div className="col-span-1 lg:col-span-5 flex flex-col space-y-6 text-left">
              <span className="self-start px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
                ⚡ LIVE AI CAREER ADVISOR
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Consult Instantly with our AI Counselor
              </h3>
              <p className="text-slate-400 dark:text-slate-300 leading-relaxed">
                Have questions about fees, syllabus structure, university degree tieups, or placement statistics? Try asking our custom-trained Gemini-powered bot! WiseBot is online 24/7.
              </p>

              {/* Presets Button select triggers */}
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-widest font-mono">FREQUENT QUESTIONS:</p>
                <div className="flex flex-col gap-2.5">
                  <button 
                    onClick={() => triggerQuickQuestion("What UGC degrees can I pair with E-Commerce?")}
                    className="p-2 text-left text-xs bg-slate-900/60 border border-slate-800 hover:border-purple-800 transition-colors rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <span>Pairing degrees with E-Commerce</span>
                    <ChevronRight className="h-3.5 w-3.5 text-purple-400" />
                  </button>
                  <button 
                    onClick={() => triggerQuickQuestion("Is the Videography path entirely practical?")}
                    className="p-2 text-left text-xs bg-slate-900/60 border border-slate-800 hover:border-purple-800 transition-colors rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <span>Are videography tracks completely hands-on?</span>
                    <ChevronRight className="h-3.5 w-3.5 text-purple-400" />
                  </button>
                  <button 
                    onClick={() => triggerQuickQuestion("Where is CyberWise located in Kerala?")}
                    className="p-2 text-left text-xs bg-slate-900/60 border border-slate-800 hover:border-purple-800 transition-colors rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <span>CyberWise location and visiting hours</span>
                    <ChevronRight className="h-3.5 w-3.5 text-purple-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Live Chat Component Box */}
            <div className="col-span-1 lg:col-span-7">
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-indigo-500 overflow-hidden shadow-2xl">
                <div className="bg-slate-950 rounded-[15px] flex flex-col h-[480px]">
                  
                  {/* Chat Head */}
                  <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-9 w-9 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-purple-500/20">
                        WB
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-normal">WiseBot AI Career Counselor</h4>
                        <div className="flex items-center space-x-1.5 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                          <span className="text-[10px] text-green-400 font-mono font-bold uppercase tracking-wider">Gemini 3.5 Active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bubble Container */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 font-normal text-xs text-left scrollbar-thin scrollbar-thumb-purple-950">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`p-3.5 rounded-xl max-w-[85%] leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-tr from-purple-700 to-indigo-700 text-white rounded-br-none' 
                            : 'bg-slate-900 text-slate-100 rounded-bl-none border border-slate-800/80'
                        }`}>
                          <p className="whitespace-pre-line text-xs">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl rounded-bl-none border border-slate-800/80 flex items-center space-x-2">
                          <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce"></span>
                          <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-100"></span>
                          <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-200"></span>
                        </div>
                      </div>
                    )}
                    <div ref={chatBottomRef}></div>
                  </div>

                  {/* Input form */}
                  <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
                    <input 
                      type="text" 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask WiseBot about courses, degrees, direct admissions..."
                      className="flex-1 bg-slate-950 border border-slate-800 text-xs rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-purple-500"
                    />
                    <button 
                      onClick={() => sendAIMessage()}
                      disabled={chatLoading || !chatInput.trim()}
                      className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. Student Success & Testimonials slider */}
      <section id="testimonials" className={`py-20 overflow-hidden relative ${
        theme === 'dark' ? 'bg-slate-900/30' : 'bg-slate-100/40'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2">STUDENT TRANSFORMATIONS</h3>
            <h4 className="text-3xl sm:text-4xl font-extrabold mt-1">Real Career Journeys</h4>
            <p className="text-slate-400 dark:text-slate-300 mt-2 leading-relaxed">
              Read how our students paired traditional degree pathways with skills to landing stellar assignments.
            </p>
          </div>

          {/* Testimonial Active Slider block */}
          <div className="max-w-4xl mx-auto relative px-4">
            
            <div className={`p-8 rounded-2xl border relative ${
              theme === 'dark' ? 'bg-slate-950 border-purple-950 shadow-2xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              {/* Giant decorative quotation mark */}
              <span className="absolute -top-6 -left-2 text-7xl font-serif font-extrabold text-purple-900/15 pointer-events-none select-none">“</span>
              
              <div className="flex flex-col space-y-6 pt-4 text-left">
                {/* Five Star design */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-slate-300 dark:text-slate-200">
                  "{TESTIMONIALS[currentTestimonialIndex].review}"
                </p>

                <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/10 dark:border-slate-800/60">
                  <div className={`h-11 w-11 rounded-full ${TESTIMONIALS[currentTestimonialIndex].avatarColor} flex items-center justify-center font-bold text-white text-sm`}>
                    {TESTIMONIALS[currentTestimonialIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-200 block leading-tight">{TESTIMONIALS[currentTestimonialIndex].name}</h5>
                    <span className="text-xs text-purple-400 font-mono block mt-1">{TESTIMONIALS[currentTestimonialIndex].course} • {TESTIMONIALS[currentTestimonialIndex].role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Switch buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={prevTestimonial}
                className={`p-2.5 rounded-xl border cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-900 border-purple-950 text-slate-400 hover:text-white' : 'bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className={`p-2.5 rounded-xl border cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-900 border-purple-950 text-slate-400 hover:text-white' : 'bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 11. Gallery Section with active filter */}
      <section id="gallery" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2 font-semibold">CAMPUS ENVIRONMENT</h3>
            <h4 className="text-3xl sm:text-4xl font-extrabold mt-1">Our Practical Setup</h4>
            <p className="text-slate-400 dark:text-slate-300 mt-2 leading-relaxed">
              Peek inside our mirrorless filming suites, audio dub labs and collaboration labs in Perinthalmanna.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
            {['all', 'studios', 'labs', 'campus', 'workshops'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat as any)}
                className={`px-4.5 py-2 text-xs font-mono tracking-widest uppercase rounded-lg border font-bold transition-all cursor-pointer ${
                  galleryFilter === cat
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : (theme === 'dark' ? 'bg-slate-900 border-purple-950 text-slate-300 hover:border-purple-800' : 'bg-slate-100 border-slate-300 hover:bg-slate-200')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                className={`relative rounded-xl overflow-hidden group aspect-video shadow-lg ${
                  theme === 'dark' ? 'border border-purple-950' : 'border border-slate-100'
                }`}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <span className="self-start px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-mono uppercase tracking-widest font-black mb-1">
                    {item.category}
                  </span>
                  <h5 className="font-bold text-sm text-white tracking-wide">{item.title}</h5>
                  <p className="text-[11px] text-slate-300 mt-1 leading-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. FAQ Section */}
      <section id="faqs" className={`py-20 ${
        theme === 'dark' ? 'bg-slate-900/10' : 'bg-slate-100/40'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h3 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2">COMMON INQUIRIES</h3>
            <h4 className="text-3xl sm:text-4xl font-extrabold mt-1">Frequently Asked Questions</h4>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div 
                key={faq.id}
                className={`rounded-xl border overflow-hidden ${
                  theme === 'dark' ? 'bg-slate-950 border-purple-950' : 'bg-white border-slate-200'
                }`}
              >
                <button 
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between font-bold text-sm sm:text-base hover:text-purple-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronRight className={`h-5 w-5 text-purple-400 transition-transform duration-300 ${activeFAQ === faq.id ? 'rotate-90' : ''}`} />
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  activeFAQ === faq.id ? 'max-h-[300px] border-t border-slate-900' : 'max-h-0'
                }`}>
                  <div className="p-6 text-xs sm:text-sm text-slate-400 leading-relaxed text-left">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. Dynamic Contact Section with Map */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact left: Location, Info and Map Iframe */}
            <div className="col-span-1 lg:col-span-5 flex flex-col space-y-8 text-left">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-purple-400 font-mono mb-2">GET IN TOUCH</h3>
                <h4 className="text-3xl sm:text-4xl font-extrabold mt-1">CyberWise Skillversity</h4>
                <p className="text-xs text-slate-400 mt-2 font-mono">PERINTHALMANNA, KERALA</p>
              </div>

              {/* Information Blocks */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-mono">ACADEMY COMPLEX:</span>
                    <span className="text-xs text-slate-200 font-semibold block mt-0.5">Premier Educational District Hub, Perinthalmanna, Kerala (679322)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-mono">REGISTERY MOBILES:</span>
                    <span className="text-xs text-slate-200 font-semibold block mt-0.5">+91 9495 120 120 // +91 9495 130 130</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest black font-bold font-mono">ACADEMIC EMAILS:</span>
                    <span className="text-xs text-slate-200 font-semibold block mt-0.5">admissions@cyberwise.edu.in</span>
                  </div>
                </div>
              </div>

              {/* Premium Google Map Integration for Perinthalmanna */}
              <div className={`mt-4 rounded-2xl overflow-hidden aspect-video relative border p-1 ${
                theme === 'dark' ? 'border-purple-950 bg-slate-900/50' : 'border-slate-200 bg-white'
              }`}>
                {/* Actual map frame */}
                <iframe 
                  title="CyberWise Location Map Perinthalmanna"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.127532398539!2d76.21639149487474!3d10.979603091763784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!3f0!3m2!1i1024!2i768!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cd2f7ee2909f%3A0xe5a3eb17502cd8b8!2sPerinthalmanna%2C%20Kerala!5e0!3m2!1sen!2sin!4v1717320000000!5m2!1sen!2sin"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, opacity: 0.85 }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact right: Main Admission Inquiry interactive form */}
            <div className="col-span-1 lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-950 border-purple-950 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                <h4 className="text-xl sm:text-2xl font-extrabold text-left mb-6">Institute Admission Inquiry Sheets</h4>
                
                {contactSubmitted ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center text-green-400">
                      <CheckCircle className="h-8 w-8 animate-bounce" />
                    </div>
                    <h5 className="text-lg font-bold text-slate-200">Enquiry Form Dispatched Successfully!</h5>
                    <p className="text-xs text-slate-400 max-w-sm">Nice choice! Our Academic Registry inside Perinthalmanna will process your request and connect over phone/WhatsApp within 4 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-widest font-mono font-bold block uppercase text-slate-400 mb-1.5">Candidate Name *</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Your complete name"
                          className="w-full bg-slate-900 border border-slate-800 text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 text-slate-100"
                        />
                      </div>
                      
                      <div>
                        <label className="text-[10px] tracking-widest font-mono font-bold block uppercase text-slate-400 mb-1.5">Contact WhatsApp *</label>
                        <input 
                          type="tel" 
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="Candidate Mobile"
                          className="w-full bg-slate-900 border border-slate-800 text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-widest font-mono font-bold block uppercase text-slate-400 mb-1.5">Candidate Email</label>
                        <input 
                          type="email" 
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="yourname@gmail.com"
                          className="w-full bg-slate-900 border border-slate-800 text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 text-slate-100"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] tracking-widest font-mono font-bold block uppercase text-slate-400 mb-1.5">Preferred Program</label>
                        <select 
                          value={contactForm.course}
                          onChange={(e) => setContactForm({ ...contactForm, course: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 text-xs px-3 py-3 rounded-lg focus:outline-none focus:border-purple-500 text-slate-300"
                        >
                          <option value="">-- Choose Course --</option>
                          <option value="AI-Driven Digital Marketing">AI-Driven Digital Marketing</option>
                          <option value="Professional Videography">Professional Videography & Cinema</option>
                          <option value="E-Commerce Store Launch">E-Commerce & Dropshipping</option>
                          <option value="Spoken English & Personality">Spoken English Mastery</option>
                          <option value="Online UGC Degree Pathway">Online UGC Degree Pathways</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest font-mono font-bold block uppercase text-slate-400 mb-1.5">Specific Inquiries or Timings</label>
                      <textarea 
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="e.g., Timing details for weekend, BCA pairing options, fee installment structures etc."
                        className="w-full bg-slate-900 border border-slate-800 text-xs px-4 py-3 rounded-lg focus:outline-none focus:border-purple-500 text-slate-100"
                      />
                    </div>

                    <div className="pt-2 text-right">
                      <button 
                        type="submit"
                        disabled={submittingContact}
                        className="px-6 py-3.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 font-bold rounded-xl text-xs sm:text-sm tracking-wide text-white transition-all cursor-pointer inline-flex items-center space-x-2"
                      >
                        {submittingContact ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white/25 border-t-white rounded-full animate-spin"></div>
                            <span>Dispatching Inquiries...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Admission Inquiry</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 14. Course Detail Modal & Inquiry popup */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`relative max-w-2xl w-full rounded-2xl border p-6 sm:p-8 text-left ${
            theme === 'dark' ? 'bg-slate-900 border-purple-900' : 'bg-white border-slate-300'
          }`}>
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5 text-slate-400 hover:text-white" />
            </button>

            <span className="inline-block py-1 px-2.5 rounded bg-purple-500/10 text-purple-400 text-xs font-mono font-bold uppercase mb-2">
              {selectedCourse.category}
            </span>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              {selectedCourse.title}
            </h4>
            <p className="text-xs text-purple-400 font-mono tracking-wider uppercase font-semibold mb-3">
              📅 BATCH SPANS: {selectedCourse.duration}
            </p>

            {/* In-depth content display */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 mt-4 scrollbar-thin scrollbar-thumb-purple-950">
              
              <div>
                <h5 className="text-[10px] font-mono tracking-widest uppercase font-bold text-fuchsia-405 text-fuchsia-400 mb-2">Full Course Curriculum</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCourse.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs">
                      <Check className="h-4 w-4 text-green-400 shrink-0" />
                      <span className="text-slate-300">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-800/80 pt-3">
                <h5 className="text-[10px] font-mono tracking-widest uppercase font-bold text-indigo-400 mb-2">Post Graduation Opportunities</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourse.careerOutcomes.map((co, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/15 rounded text-[10px] font-mono">
                      {co}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-3 bg-slate-950/40 p-3 rounded-lg">
                <h5 className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 mb-1 leading-relaxed">Laboratories & Prerequisites:</h5>
                <p className="text-xs text-slate-300 italic">{selectedCourse.toolsPrerequisites}</p>
              </div>

              {/* Directly embed Inquiry Form in detail modal */}
              <div className="border-t border-slate-800 pt-4">
                <h5 className="text-xs font-extrabold mb-3">Instant Course Specific Reservation</h5>
                {inquirySubmitted ? (
                  <div className="p-4 rounded-xl bg-green-500/15 border border-green-500 text-center text-xs text-green-400 font-bold">
                    Successfully Dispatch! Closed Reservation.
                  </div>
                ) : (
                  <form onSubmit={handleCourseInquirySubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Your Name *"
                        className="bg-slate-950 text-xs px-3 py-2 border border-slate-800 rounded-lg text-slate-200"
                      />
                      <input 
                        type="tel" 
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="WhatsApp No *"
                        className="bg-slate-950 text-xs px-3 py-2 border border-slate-800 rounded-lg text-slate-200"
                      />
                    </div>
                    <div className="text-right">
                      <button 
                        type="submit"
                        disabled={submittingInquiry}
                        className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-700 rounded-lg transition-all cursor-pointer"
                      >
                        {submittingInquiry ? 'Sending...' : 'Confirm Reservation'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 15. Floater UI Components: WiseBot bubble on bottom-right and Back To Top */}
      {showScrollTop && (
        <button 
          id="btn-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 sm:bottom-6 left-6 z-30 p-3 bg-purple-700/80 backdrop-blur-sm text-white rounded-full hover:bg-purple-600 transition-colors shadow-lg cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* 16. Persistent Floating Chat Bubbles Launcher */}
      {!isChatOpen && (
        <div id="ai-floater-button" className="fixed bottom-6 right-6 z-30 flex items-center space-x-2">
          {hasChatNotification && (
            <div className="bg-slate-900 border border-purple-500/50 p-2 rounded-xl text-left shadow-lg scale-90 animate-pulse block">
              <p className="text-[9px] font-bold text-purple-400 font-mono tracking-widest uppercase">ADVISOR CO-PILOT</p>
              <p className="text-[10px] text-white">Ask WiseBot about placements or timings!</p>
            </div>
          )}
          <button 
            onClick={() => { setIsChatOpen(true); setHasChatNotification(false); }}
            className="p-4 bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white rounded-full transition-transform hover:scale-105 shadow-2xl active:scale-95 cursor-pointer relative"
          >
            <Cpu className="h-6 w-6 animate-spin-slow" />
            <span className="absolute top-0 right-0 h-3.2 w-3.2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      )}

      {/* Persistent floating dynamic chat panel if opened */}
      {isChatOpen && (
        <div id="ai-floating-panel" className="fixed bottom-6 right-6 z-50 max-w-[340px] w-full bg-slate-950 border border-purple-900/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[420px] transition-all">
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">
                WB
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-bold text-white leading-tight">WiseBot Advisor</h4>
                <span className="text-[9px] text-green-400 font-mono">Gemini 3.5 Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Bubbles content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 font-normal text-[11px] text-left scrollbar-thin">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2.5 rounded-xl max-w-[85%] ${
                  msg.role === 'user' ? 'bg-purple-700 text-white rounded-br-none' : 'bg-slate-900 text-slate-100 rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-line text-xs">{msg.content}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 p-2.5 rounded-xl text-slate-300">
                  <span className="animate-pulse font-mono flex">Consulting advisor...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef}></div>
          </div>

          {/* Suggestions */}
          <div className="p-2 border-t border-slate-900 bg-slate-950/80 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[9px] font-mono">
            <button onClick={() => triggerQuickQuestion("What courses do you teach?")} className="px-2 py-1 bg-slate-900 rounded hover:bg-purple-900/30 text-purple-300 border border-slate-850 cursor-pointer">Explore courses</button>
            <button onClick={() => triggerQuickQuestion("Timing and Fees?")} className="px-2 py-1 bg-slate-900 rounded hover:bg-purple-900/30 text-purple-300 border border-slate-850 cursor-pointer">Timings/Fees</button>
          </div>

          {/* Submitting form */}
          <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center space-x-1.5">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type course or fee questions..."
              className="flex-1 bg-slate-950 text-[11px] px-3 py-2 border border-slate-850 focus:outline-none focus:border-purple-600 rounded-lg text-slate-100"
            />
            <button 
              onClick={() => sendAIMessage()}
              disabled={chatLoading || !chatInput.trim()}
              className="p-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-500 cursor-pointer text-[10px]"
            >
              Ask
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Integration Floating Button */}
      <a
        id="whatsapp-floater"
        href="https://wa.me/917558026894?text=Hi!%20I%20am%20interested%20in%20CyberWise%20Skillversity."
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-40 flex items-center justify-center p-3.5 sm:p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 group/wa ${
          isChatOpen 
            ? "bottom-6 right-[370px] hidden md:flex" 
            : "bottom-24 right-6 sm:bottom-6 sm:right-24"
        }`}
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping opacity-75 group-hover/wa:animate-none"></span>
        <MessageCircle className="h-6 w-6 relative z-10" />
        
        {/* Hover label for branding */}
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 scale-95 origin-right translate-x-2 group-hover/wa:opacity-100 group-hover/wa:scale-100 group-hover/wa:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
          <span className="text-[10px] block text-emerald-400 font-mono mt-0.5 font-normal">+91 7558026894</span>
        </span>
      </a>

      {/* 17. Elegant Footer */}
      <footer id="footer-section" className={`border-t pt-16 pb-8 text-left ${
        theme === 'dark' ? 'bg-slate-950 border-purple-950/80' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/10 dark:border-slate-800/60">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="flex items-center space-x-3 cursor-pointer">
                <CyberWiseLogo className="h-10 w-10 shadow-md" />
                <div>
                  <span className="text-xl font-black block tracking-tight">CyberWise</span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-purple-400 font-mono">Skillversity</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Bridging academic university education with real-world technical skills in Perinthalmanna, Kerala. Helping the digital generation build thriving careers globally.
              </p>
              
              {/* Phone and address short summary */}
              <div className="text-xs text-slate-400 space-y-1 pt-2">
                <p>📍 Near Calicut Road, Perinthalmanna, Kerala</p>
                <p>📞 +91 9495 120 120 // +91 9495 130 130</p>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:col-span-2.5 flex flex-col space-y-4 text-left">
              <h5 className="text-[11px] font-mono uppercase tracking-widest font-black text-slate-300">Quick Navigation</h5>
              <div className="flex flex-col space-y-2 text-xs text-slate-400">
                <button onClick={() => scrollToSection('home')} className="hover:text-purple-400 text-left cursor-pointer">Home Hub</button>
                <button onClick={() => scrollToSection('about')} className="hover:text-purple-400 text-left cursor-pointer">Our Mission</button>
                <button onClick={() => scrollToSection('courses')} className="hover:text-purple-400 text-left cursor-pointer">Programs</button>
                <button onClick={() => scrollToSection('pathways')} className="hover:text-purple-400 text-left cursor-pointer">Degree Paths</button>
                <button onClick={() => scrollToSection('why-us')} className="hover:text-purple-400 text-left cursor-pointer">Why Choose Us</button>
              </div>
            </div>

            {/* Column 3: Academy Courses */}
            <div className="lg:col-span-3.5 flex flex-col space-y-4 text-left">
              <h5 className="text-[11px] font-mono uppercase tracking-widest font-black text-slate-300">Our Academies</h5>
              <div className="flex flex-col space-y-2 text-xs text-slate-400">
                <button onClick={() => scrollToSection('courses')} className="hover:text-purple-400 text-left cursor-pointer">AI-Driven Digital Marketing</button>
                <button onClick={() => scrollToSection('courses')} className="hover:text-purple-400 text-left cursor-pointer">Professional Videography & Media</button>
                <button onClick={() => scrollToSection('courses')} className="hover:text-purple-400 text-left cursor-pointer">E-Commerce & Online Business</button>
                <button onClick={() => scrollToSection('courses')} className="hover:text-purple-400 text-left cursor-pointer">Spoken English & Personality</button>
                <button onClick={() => scrollToSection('pathways')} className="hover:text-purple-400 text-left cursor-pointer">Online UGC Degrees Sync</button>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="lg:col-span-2 flex flex-col space-y-4 text-left">
              <h5 className="text-[11px] font-mono uppercase tracking-widest font-black text-slate-300">Quick Visit Hours</h5>
              <div className="space-y-1.5 text-xs text-slate-400 leading-normal">
                <p>Monday - Saturday</p>
                <p className="font-bold text-slate-200">09:00 AM - 06:00 PM</p>
                <p className="text-[10px] text-slate-400">Walk into our complex to test camera labs face-to-face.</p>
              </div>
            </div>

          </div>

          {/* Social icons, copyrights */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
            <span className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} CyberWise Skillversity. All rights reserved.
            </span>
            
            {/* Social media links as mock tags */}
            <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 uppercase">
              <span className="hover:text-purple-400 cursor-pointer">Instagram</span>
              <span>•</span>
              <span className="hover:text-purple-400 cursor-pointer">YouTube</span>
              <span>•</span>
              <span className="hover:text-purple-400 cursor-pointer">Facebook</span>
              <span>•</span>
              <span className="hover:text-purple-400 cursor-pointer">LinkedIn</span>
            </div>
            
            <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase font-extrabold block">
              Drawn by Wisdom • Kerala, India
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
