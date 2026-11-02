// // export default Home;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../../components/user/Header";
// import Footer from "../../components/user/Footer";

// function Home() {
//   const [address, setAddress] = useState("");
//   const [savedAddresses, setSavedAddresses] = useState([]);

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleAddAddress = (e) => {
//     e.preventDefault();
//     if (address.trim()) {
//       setSavedAddresses([...savedAddresses, address]);
//       setAddress("");
//     } else {
//       alert("Please enter a valid address");
//     }
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section
//         className="bg-cover bg-center h-screen text-white"
//         style={{
//           backgroundImage: `url(https://t3.ftcdn.net/jpg/02/79/75/74/360_F_279757406_PjHAMPHNAEyf5NvyEYlC7mJNRKHHkmCz.jpg)`,
//         }}
//       >
//         <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center px-4">
//           <h1 className="text-5xl font-extrabold mb-6">
//             Your Favorite Restaurants in Your Doorstep
//           </h1>
//           <p className="text-lg mb-8">
//             Find your favorite meals delivered fresh and fast.
//           </p>
//           <div className="w-full max-w-md">
//             {/* Search Bar */}
//             <input
//               type="text"
//               placeholder="Search for restaurants"
//               className="w-full py-3 px-5 text-gray-800 rounded-lg focus:outline-none mb-4"
//             />

//             <div className="flex justify-center space-x-4 mt-4">
//               <Link
//                 to="/restaurants"
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md transition duration-300"
//               >
//                 Find Restaurants
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-16 bg-gray-50 text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-4xl font-bold mb-6">Join the FoodBae Family</h2>
//           <p className="text-lg mb-8">
//             Partner with us to grow your business or become a driver and earn on
//             your schedule.
//           </p>
//           <div className="flex justify-center gap-4">
//             <Link
//               to="/about"
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
//             >
//               About Us
//             </Link>
//             <Link
//               to="/admin/login"
//               className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
//             >
//               Partner With Us
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// // --- How It Works Data ---
// const steps = [
//   {
//     number: "01",
//     title: "Choose a restaurant",
//     desc: "Browse hundreds of local restaurants and cuisines near you.",
//     icon: (
//       <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     ),
//   },
//   {
//     number: "02",
//     title: "Pick your meals",
//     desc: "Select from a wide menu of fresh dishes tailored to your taste.",
//     icon: (
//       <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//       </svg>
//     ),
//   },
//   {
//     number: "03",
//     title: "Fast delivery",
//     desc: "Your food arrives fresh and hot right at your doorstep.",
//     icon: (
//       <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//         <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
//       </svg>
//     ),
//   },
// ];

// // --- Featured Categories ---
// const categories = [
//   { name: "Burgers", emoji: "🍔", color: "from-orange-50 to-orange-100 border-orange-200" },
//   { name: "Pizza", emoji: "🍕", color: "from-red-50 to-red-100 border-red-200" },
//   { name: "Sushi", emoji: "🍣", color: "from-pink-50 to-pink-100 border-pink-200" },
//   { name: "Salads", emoji: "🥗", color: "from-green-50 to-green-100 border-green-200" },
//   { name: "Desserts", emoji: "🍰", color: "from-purple-50 to-purple-100 border-purple-200" },
//   { name: "Drinks", emoji: "🧃", color: "from-blue-50 to-blue-100 border-blue-200" },
// ];

// // --- Why Choose Us ---
// const features = [
//   { title: "30 min delivery", desc: "Lightning-fast delivery guaranteed.", icon: "⚡" },
//   { title: "Fresh ingredients", desc: "Only the freshest produce, every time.", icon: "🌿" },
//   { title: "Easy tracking", desc: "Real-time order tracking from kitchen to door.", icon: "📍" },
//   { title: "Safe payments", desc: "Secure checkout with multiple payment options.", icon: "🔒" },
// ];

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const trimmed = search.trim();
//     if (trimmed) {
//       navigate(`/restaurants?search=${encodeURIComponent(trimmed)}`);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch(e);
//   };

//   return (
//     <div className="min-h-screen bg-white">

//       {/* ── Hero ── */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Background */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80)`,
//           }}
//         />
//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

//         {/* Content */}
//         <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
//           {/* Badge */}
//           <span className="inline-block bg-orange-500/20 border border-orange-400/40 text-orange-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
//             🚀 Free delivery on your first order
//           </span>

//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
//             Hungry? We've got <br />
//             <span className="text-orange-400">your back.</span>
//           </h1>
//           <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
//             Order from your favourite local restaurants and get fresh food delivered fast — right to your door.
//           </p>

//           {/* Search Bar */}
//           <form
//             onSubmit={handleSearch}
//             className="flex items-center bg-white rounded-xl shadow-2xl overflow-hidden max-w-xl mx-auto"
//           >
//             <span className="pl-4 text-gray-400">
//               <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search restaurants or cuisines..."
//               className="flex-1 py-4 px-3 text-gray-800 text-base focus:outline-none placeholder-gray-400"
//             />
//             <button
//               type="submit"
//               className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-6 py-4 transition-all duration-200"
//             >
//               Search
//             </button>
//           </form>

//           {/* Quick links */}
//           <div className="flex flex-wrap justify-center gap-2 mt-5">
//             {["Burgers", "Pizza", "Sushi", "Biryani"].map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => navigate(`/restaurants?search=${tag}`)}
//                 className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200"
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Scroll hint */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-bounce">
//           ↓ Scroll to explore
//         </div>
//       </section>

//       {/* ── Food Categories ── */}
//       <section className="py-16 px-4 bg-gray-50">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">What are you craving?</h2>
//           <p className="text-gray-500 text-center mb-10">Pick a category and discover what's available near you</p>
//           <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
//             {categories.map((cat) => (
//               <button
//                 key={cat.name}
//                 onClick={() => navigate(`/restaurants?search=${cat.name}`)}
//                 className={`flex flex-col items-center gap-2 p-4 rounded-2xl border bg-gradient-to-br ${cat.color} hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm`}
//               >
//                 <span className="text-3xl">{cat.emoji}</span>
//                 <span className="text-sm font-medium text-gray-700">{cat.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── How It Works ── */}
//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">How FoodBae works</h2>
//           <p className="text-gray-500 text-center mb-14">Three simple steps to your perfect meal</p>
//           <div className="grid md:grid-cols-3 gap-8 relative">
//             {/* Connector line (desktop) */}
//             <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-orange-200" />
//             {steps.map((step, i) => (
//               <div key={i} className="flex flex-col items-center text-center group">
//                 <div className="relative mb-6">
//                   <div className="w-20 h-20 rounded-2xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300 shadow-sm">
//                     {step.icon}
//                   </div>
//                   <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
//                     {i + 1}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Why Choose Us ── */}
//       <section className="py-16 px-4 bg-orange-500">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-white mb-2 text-center">Why choose FoodBae?</h2>
//           <p className="text-orange-100 text-center mb-12">We're not just another food app</p>
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {features.map((f, i) => (
//               <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white hover:bg-white/20 transition-all duration-200">
//                 <div className="text-3xl mb-3">{f.icon}</div>
//                 <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
//                 <p className="text-orange-100 text-sm">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section className="py-20 px-4 bg-gray-900 text-center">
//         <div className="max-w-2xl mx-auto">
//           <h2 className="text-4xl font-extrabold text-white mb-4">
//             Ready to order? <span className="text-orange-400">Let's go.</span>
//           </h2>
//           <p className="text-gray-400 mb-10 text-lg">
//             Join thousands of happy customers who trust FoodBae every day.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/restaurants"
//               className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-orange-500/30"
//             >
//               Browse Restaurants
//             </Link>
//             <Link
//               to="/register"
//               className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200"
//             >
//               Create Account
//             </Link>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import React, { useState, useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);

// ── Data
const steps = [
  {
    title: "Choose a restaurant",
    desc: "Browse hundreds of local restaurants and cuisines near you.",
    icon: "🏠",
  },
  {
    title: "Pick your meals",
    desc: "Select from a wide menu of fresh dishes tailored to your taste.",
    icon: "📋",
  },
  {
    title: "Fast delivery",
    desc: "Your food arrives fresh and hot right at your doorstep.",
    icon: "⚡",
  },
];

const categories = [
  {
    name: "Burgers",
    emoji: "🍔",
    color: "from-orange-50 to-orange-100 border-orange-200",
  },
  {
    name: "Pizza",
    emoji: "🍕",
    color: "from-red-50 to-red-100 border-red-200",
  },
  {
    name: "Sushi",
    emoji: "🍣",
    color: "from-pink-50 to-pink-100 border-pink-200",
  },
  {
    name: "Salads",
    emoji: "🥗",
    color: "from-green-50 to-green-100 border-green-200",
  },
  {
    name: "Desserts",
    emoji: "🍰",
    color: "from-purple-50 to-purple-100 border-purple-200",
  },
  {
    name: "Drinks",
    emoji: "🧃",
    color: "from-blue-50 to-blue-100 border-blue-200",
  },
];

const features = [
  {
    title: "30 min delivery",
    desc: "Lightning-fast delivery guaranteed.",
    icon: "⚡",
  },
  {
    title: "Fresh ingredients",
    desc: "Only the freshest produce, every time.",
    icon: "🌿",
  },
  {
    title: "Easy tracking",
    desc: "Real-time order tracking from kitchen to door.",
    icon: "📍",
  },
  {
    title: "Safe payments",
    desc: "Secure checkout with multiple payment options.",
    icon: "🔒",
  },
];

const stats = [
  { label: "Restaurants", target: 500, suffix: "+", isFloat: false },
  { label: "Happy Customers", target: 50000, suffix: "+", isFloat: false },
  { label: "Cities", target: 25, suffix: "+", isFloat: false },
  { label: "Avg Rating", target: 4.8, suffix: "★", isFloat: true },
];

const floatingFoods = [
  { emoji: "🍕", top: "15%", left: "8%", size: "2.5rem" },
  { emoji: "🍔", top: "25%", right: "10%", size: "2rem" },
  { emoji: "🌮", top: "65%", left: "5%", size: "1.8rem" },
  { emoji: "🍜", top: "70%", right: "8%", size: "2.2rem" },
  { emoji: "🍣", top: "40%", left: "3%", size: "1.6rem" },
  { emoji: "🧁", top: "55%", right: "5%", size: "1.9rem" },
];

// ── Animated counter
const StatCard = ({ stat, animate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 2000;
    const steps = 60;
    const increment = stat.target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        setCount(stat.target);
        clearInterval(timer);
      } else {
        setCount(
          stat.isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current),
        );
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [animate, stat]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
        {count}
        {stat.suffix}
      </div>
      <div className="text-orange-200 text-sm font-medium">{stat.label}</div>
    </div>
  );
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const searchRef = useRef(null);
  const tagsRef = useRef(null);
  const statsRef = useRef(null);
  const floatRefs = useRef([]);
  const stepsRef = useRef([]);
  const featureRefs = useRef([]);
  const catRefs = useRef([]);

  // ── Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // ── Hero entrance (staggered)
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
    )
      .fromTo(
        h1Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3",
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4",
      )
      .fromTo(
        searchRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        tagsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2",
      );

    // Floating food pop-in
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0, rotation: -20 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: 0.9 + i * 0.12,
          ease: "back.out(1.7)",
        },
      );
      // Idle float loop
      gsap.to(el, {
        y: "-=14",
        rotation: "+=6",
        duration: 2.2 + i * 0.25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
  }, []);

  // ── Floating foods parallax on scroll
  useEffect(() => {
    floatRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  // ── Scroll-triggered: steps
  useEffect(() => {
    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  // ── Scroll-triggered: categories
  useEffect(() => {
    catRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%" },
        },
      );
    });
  }, []);

  // ── Scroll-triggered: features
  useEffect(() => {
    featureRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    });
  }, []);

  // ── Stats counter trigger
  useEffect(() => {
    if (!statsRef.current) return;
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 80%",
      onEnter: () => setStatsVisible(true),
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) navigate(`/restaurants?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

        {/* Floating emojis */}
        {floatingFoods.map((f, i) => (
          <div
            key={i}
            ref={(el) => (floatRefs.current[i] = el)}
            className="absolute pointer-events-none select-none opacity-0"
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              fontSize: f.size,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          >
            {f.emoji}
          </div>
        ))}

        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <div
            ref={badgeRef}
            className="opacity-0 inline-block bg-orange-500/20 border border-orange-400/40 text-orange-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            🚀 Free delivery on your first order
          </div>
          <h1
            ref={h1Ref}
            className="opacity-0 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight"
          >
            Hungry? We've got <br />
            <span className="text-orange-400">your back.</span>
          </h1>
          <p
            ref={subRef}
            className="opacity-0 text-lg text-gray-300 mb-10 max-w-xl mx-auto"
          >
            Order from your favourite local restaurants and get fresh food
            delivered fast — right to your door.
          </p>
          <form
            ref={searchRef}
            onSubmit={handleSearch}
            className="opacity-0 flex items-center bg-white rounded-xl shadow-2xl overflow-hidden max-w-xl mx-auto"
          >
            <span className="pl-4 text-gray-400">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants or cuisines..."
              className="flex-1 py-4 px-3 text-gray-800 text-base focus:outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-6 py-4 transition-all duration-200"
            >
              Search
            </button>
          </form>
          <div
            ref={tagsRef}
            className="opacity-0 flex flex-wrap justify-center gap-2 mt-5"
          >
            {["Burgers", "Pizza", "Sushi", "Biryani"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/restaurants?search=${tag}`)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce text-xl">
          ↓
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="bg-orange-500 py-14">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} animate={statsVisible} />
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            What are you craving?
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Pick a category and discover what's near you
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                ref={(el) => (catRefs.current[i] = el)}
                onClick={() => navigate(`/restaurants?search=${cat.name}`)}
                className={`opacity-0 flex flex-col items-center gap-2 p-4 rounded-2xl border bg-gradient-to-br ${cat.color} hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-gray-700">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            How FoodBae works
          </h2>
          <p className="text-gray-500 text-center mb-14">
            Three simple steps to your perfect meal
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => (stepsRef.current[i] = el)}
                className="opacity-0 flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-3xl group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FOODBAE ── */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            Why choose FoodBae?
          </h2>
          <p className="text-gray-400 text-center mb-12">
            We're not just another food app
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                ref={(el) => (featureRefs.current[i] = el)}
                className="opacity-0 bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white hover:bg-white/10 transition-all duration-200"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-orange-500 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to order? Let's go.
          </h2>
          <p className="text-orange-100 mb-10 text-lg">
            Join thousands of happy customers who trust FoodBae every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/restaurants"
              className="bg-white hover:bg-orange-50 active:scale-95 text-orange-500 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg"
            >
              Browse Restaurants
            </Link>
            <Link
              to="/register"
              className="border-2 border-white/60 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
            >
              Join as Customer or Partner 🏪
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
