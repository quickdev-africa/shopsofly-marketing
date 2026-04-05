"use client";
import React, { useState } from "react";
import Link from "next/link";


const WHATSAPP_GROUP = "https://chat.whatsapp.com/LHhcSoh1RKN1zQ6oSNfLf1";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://robust-annmaria-laserstarglobal-813df33a.koyeb.app";

function getNextSaturdays() {
  const saturdays = [];
  const now = new Date();
  const d = new Date(now);
  // Find next Saturday
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
  for (let i = 0; i < 4; i++) {
    const sat = new Date(d);
    sat.setDate(d.getDate() + i * 7);
    if (sat <= new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)) {
      saturdays.push(sat);
    }
  }
  return saturdays;
}

function DemoPopup({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", preferred_date: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const saturdays = getNextSaturdays();

  async function handleSubmit() {
    if (!form.name || !form.email || !form.phone || !form.preferred_date) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v2/storefront/demo_bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Store-Subdomain": "laserstarglobal" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.errors?.join(", ") || "Failed");
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {success ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-black text-2xl text-[#1A1A1A] mb-2">Demo Booked!</h3>
            <p className="text-black mb-6">We have received your booking. Join our WhatsApp group to stay updated and get reminders.</p>
            <a href={WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl mb-3 transition-colors">
              💬 Join WhatsApp Group
            </a>
            <button onClick={onClose} className="w-full border border-gray-200 text-black py-3 rounded-xl text-sm hover:bg-gray-50">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-[#4A7C59] px-6 py-5 flex items-center justify-between">
              <div>
                <h3 className="font-black text-xl text-white">Book a Free Demo</h3>
                <p className="text-white/80 text-sm mt-0.5">Every Saturday at 7:30 PM</p>
              </div>
              <button onClick={onClose} className="text-white/70 hover:text-white text-2xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(s => ({...s, name: e.target.value}))}
                    placeholder="John Doe"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] text-black" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1">Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(s => ({...s, phone: e.target.value}))}
                    placeholder="08012345678"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] text-black" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm(s => ({...s, email: e.target.value}))}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] text-black" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1">Select a Saturday *</label>
                <select value={form.preferred_date} onChange={e => setForm(s => ({...s, preferred_date: e.target.value}))}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] text-black">
                  <option value="">Choose date (7:30 PM)</option>
                  {saturdays.map(sat => {
                    const iso = sat.toISOString().split("T")[0];
                    const label = sat.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" });
                    return <option key={iso} value={iso}>{label} — 7:30 PM</option>;
                  })}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1">Any questions? (optional)</label>
                <textarea value={form.notes} onChange={e => setForm(s => ({...s, notes: e.target.value}))}
                  placeholder="What do you want to learn about Shopsofly?"
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] resize-none text-black" />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-xs font-semibold text-black">Join our WhatsApp Group</p>
                  <a href={WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:underline font-medium">Click to join →</a>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-colors disabled:opacity-60">
                {loading ? "Booking..." : "Book My Demo Spot →"}
              </button>
              <p className="text-xs text-black text-center">Free. No obligation. 100% online.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4A7C59] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">S</span>
          </div>
          <span className="font-black text-xl text-[#1A1A1A]">Shopsofly</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black">
          <a href="#features" className="hover:text-[#4A7C59] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#4A7C59] transition-colors">Pricing</a>
          <a href="#how-it-works" className="hover:text-[#4A7C59] transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-[#4A7C59] transition-colors">FAQ</a>
          <a href="#resources" className="hover:text-[#4A7C59] transition-colors">Resources</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="https://app.shopsofly.com" className="text-sm font-semibold text-gray-700 hover:text-[#4A7C59]">Login</a>
          <a href="/signup" className="bg-[#F97316] hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
            Get Started
          </a>
        </div>
        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          <a href="/signup" className="bg-[#F97316] text-white text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap">
            Sign Up
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
          <a href="#features" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-[#4A7C59]">Features</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-[#4A7C59]">Pricing</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-[#4A7C59]">How It Works</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-[#4A7C59]">FAQ</a>
          <a href="#resources" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-gray-700 hover:text-[#4A7C59]">Resources</a>
          <a href="https://app.shopsofly.com" className="block text-sm font-semibold text-gray-700">Login →</a>
          <a href="/signup" onClick={() => setMenuOpen(false)}
            className="block bg-[#F97316] text-white text-sm font-bold px-4 py-3 rounded-xl text-center">
            Activate Your Store — ₦2,000
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-[#E8F0E9] via-white to-orange-50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 text-[#4A7C59] text-sm font-semibold px-4 py-2 rounded-full mb-6">
          🇳🇬 The Smarter Way to Sell Online!
        </div>
        <h1 className="font-black text-5xl md:text-7xl text-[#1A1A1A] leading-tight mb-6">
          Launch Your Online<br />
          <span className="text-[#4A7C59]">Store in Minutes</span>
        </h1>
        <p className="text-xl text-black max-w-2xl mx-auto mb-10 leading-relaxed">
          A powerful ecommerce platform. Accept Paystack, bank transfer, and cash on delivery. Start your 21-day trial for just ₦2,000 activation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="/signup"
            className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
            Activate Your Store — ₦2,000
          </a>
          <button onClick={onDemo}
            className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors">
            Book a Demo 📅
          </button>
        </div>
        <p className="text-sm text-black">21 days full access • No monthly fee during trial • Cancel anytime</p>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "₦2,000", label: "To Start — 21 Day Trial" },
    { value: "Free", label: "Pickup Location Setup" },
    { value: "5", label: "Payment Options" },
    { value: "24/7", label: "Support Available" },
  ];
  return (
    <section className="py-12 bg-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl md:text-4xl font-black text-[#F97316]">{s.value}</p>
            <p className="text-white text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: "🏪", title: "Beautiful Store, Ready Day One", desc: "Your store comes pre-loaded with 10 products, collections, policy pages, and a fully designed homepage. Just add your logo and prices." },
    { icon: "💳", title: "Accept All Nigerian Payments", desc: "Paystack, bank transfer, cash on delivery, and international payments via Stripe and PayPal. Money gets to you fast." },
    { icon: "📱", title: "Mobile-First Design", desc: "Your store looks stunning on every phone, tablet, and computer. Nigerian customers shop on mobile — we are built for that." },
    { icon: "🎯", title: "Landing Page Builder", desc: "Create high-converting landing pages for your products with video testimonials, lead capture forms, and countdown timers." },
    { icon: "📦", title: "Order Management", desc: "Manage orders, fulfil deliveries, print packing slips, and track customer purchases all from one dashboard." },
    { icon: "📊", title: "Sales Analytics", desc: "See your revenue, top products, sales by state, and customer data. Make better business decisions with real data." },
    { icon: "🚚", title: "Shipping & Delivery", desc: "Set shipping rates per state, add pickup locations, and offer free shipping thresholds to increase average order value." },
    { icon: "🎁", title: "Promotions & Bundles", desc: "Create discount codes, flash sales, product bundles, and promotional banners to boost your sales." },
    { icon: "💬", title: "WhatsApp Integration", desc: "Floating WhatsApp button, order notifications, and abandoned cart reminders sent directly to your customers via WhatsApp." },
  ];
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-black text-4xl md:text-5xl text-[#1A1A1A] mb-4">Everything You Need to Sell Online</h2>
          <p className="text-black text-lg max-w-2xl mx-auto">One platform. All the tools. Built specifically to help Merchants convert.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-[#4A7C59]/30 hover:shadow-md transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">{f.title}</h3>
              <p className="text-black text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "1", title: "Pay ₦2,000 Activation", desc: "One-time activation fee via Paystack. Your store is created instantly after payment." },
    { num: "2", title: "Customize Your Store", desc: "Add your logo, set your colors, upload product images and prices. Takes less than 30 minutes." },
    { num: "3", title: "Start Selling", desc: "Share your store link, run ads, and start receiving orders and payments immediately." },
  ];
  return (
    <section id="how-it-works" className="py-20 px-6 bg-[#E8F0E9]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-black text-4xl md:text-5xl text-[#1A1A1A] mb-4">Get Live in 3 Simple Steps</h2>
          <p className="text-black text-lg">No technical knowledge required.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-14 h-14 bg-[#4A7C59] text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-5">
                {s.num}
              </div>
              <h3 className="font-bold text-xl text-[#1A1A1A] mb-3">{s.title}</h3>
              <p className="text-black leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "21-Day Trial",
      monthlyPrice: 2000,
      yearlyPrice: null,
      yearlyDiscount: null,
      yearlySaving: null,
      highlight: true,
      cta: "Activate Your Store",
      href: "/signup",
      badge: "START HERE",
      features: [
        "21 days full platform access",
        "Up to 10 products",
        "All payment methods",
        "Landing page builder",
        "Full theme customizer",
        "WhatsApp notifications",
        "After trial: auto-downgrade to Basic",
        "Landing pages (3 templates)",
        "Upload Video Testimonials",
        "Upload Audio Testimonials",
      ],
    },
    {
      name: "Basic",
      monthlyPrice: 5500,
      yearlyPrice: 58740,
      yearlyDiscount: 9,
      yearlySaving: 7260,
      highlight: false,
      cta: "Choose Basic",
      href: "/signup?plan=basic",
      badge: null,
      features: [
        "Up to 20 products",
        "200 orders/month",
        "2 staff accounts",
        "Paystack payments",
        "Email support",
        "Basic analytics",
        "Colors + logo customizer",
        "Landing pages (3 templates)",
        "Upload Video Testimonials",
        "Upload Audio Testimonials",
      ],
    },
    {
      name: "Standard",
      monthlyPrice: 12500,
      yearlyPrice: 132000,
      yearlyDiscount: 12,
      yearlySaving: 18000,
      highlight: false,
      cta: "Choose Standard",
      href: "/signup?plan=standard",
      badge: "BEST VALUE",
      features: [
        "Unlimited products",
        "Unlimited orders",
        "10 staff accounts",
        "Custom domain",
        "Full analytics + export",
        "Full theme customizer",
        "Landing page builder",
        "WhatsApp + email support",
        "Stripe + PayPal payments",
        "Abandoned cart recovery",
        "Unlimited bundles",
        "Landing pages (unlimited)",
        "Upload Video Testimonials",
        "Upload Audio Testimonials",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-black text-4xl md:text-5xl text-[#1A1A1A] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-black text-lg mb-8">Start 21-Day Trial. Upgrade when you&apos;re ready to Basic or Standard.</p>
          <div className="inline-flex items-center bg-gray-100 rounded-2xl p-1 gap-1">
            <button onClick={() => setYearly(false)}
              className={"px-5 py-2 rounded-xl text-sm font-bold transition-all " + (!yearly ? "bg-white shadow text-[#1A1A1A]" : "text-gray-500")}>
              Monthly
            </button>
            <button onClick={() => setYearly(true)}
              className={"px-5 py-2 rounded-xl text-sm font-bold transition-all " + (yearly ? "bg-white shadow text-[#1A1A1A]" : "text-gray-500")}>
              Yearly <span className="ml-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Save up to 12%</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan: any) => {
            const showYearly = yearly && plan.yearlyPrice;
            const displayPrice = showYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const displayPeriod = showYearly ? "per year" : plan.name === "21-Day Trial" ? "one-time" : "per month";
            return (
              <div key={plan.name} className={"rounded-2xl p-8 border-2 relative " + (
                plan.highlight ? "border-[#F97316] shadow-xl shadow-orange-100 scale-105" : "border-gray-200"
              )}>
                {plan.badge && (
                  <div className={"absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1.5 rounded-full " + (
                    plan.highlight ? "bg-[#F97316] text-white" : "bg-[#4A7C59] text-white"
                  )}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-black text-xl text-[#1A1A1A] mb-2">{plan.name}</h3>
                <div className="mb-2">
                  {showYearly && (
                    <p className="text-gray-400 line-through text-sm mb-1">₦{(plan.monthlyPrice * 12).toLocaleString()}/year</p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#1A1A1A]">₦{displayPrice.toLocaleString()}</span>
                    <span className="text-black text-sm">{displayPeriod}</span>
                  </div>
                  {showYearly && plan.yearlySaving && (
                    <p className="text-green-600 text-sm font-bold mt-1">
                      🎉 Save ₦{plan.yearlySaving.toLocaleString()} ({plan.yearlyDiscount}% off)
                    </p>
                  )}
                </div>
                <a href={plan.href}
                  className={"block text-center font-bold py-3 rounded-xl mb-8 mt-6 transition-colors " + (
                    plan.highlight
                      ? "bg-[#F97316] hover:bg-orange-600 text-white"
                      : "bg-[#4A7C59] hover:bg-[#2D4A32] text-white"
                  )}>
                  {plan.cta}
                </a>
                <ul className="space-y-3">
                  {plan.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-black">
                      <span className="text-[#4A7C59] font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Resources() {
  const tools = [
    { name: "Verpex", category: "Domain Name", desc: "Reliable web hosting and domain registration with 99.9% uptime, perfect for getting your store online with a professional address.", fallback: "🌐", color: "from-blue-500 to-blue-600" },
    { name: "Postscript", category: "SMS & FB Marketing", desc: "Drive repeat purchases with targeted SMS campaigns and Facebook retargeting. Turn your customer list into a revenue engine.", fallback: "📱", color: "from-purple-500 to-purple-600" },
    { name: "Outlinematic", category: "Logo & Packaging", desc: "Create professional logos, brand identities, and product packaging designs that make your business stand out.", fallback: "🎨", color: "from-pink-500 to-rose-500" },
    { name: "Paystack", category: "Payment Gateway", desc: "Nigeria\'s leading payment gateway. Accept cards, bank transfers, USSD, and mobile money from customers across Africa.", fallback: "💳", color: "from-[#00C3F7] to-[#0096FF]" },
    { name: "GIG Logistics", category: "Shipping & Delivery", desc: "Fast and reliable delivery across all 36 Nigerian states. Real-time tracking, same-day delivery in Lagos, affordable rates.", fallback: "🚚", color: "from-orange-500 to-amber-500" },
    { name: "BGRemover", category: "Image Editing", desc: "Instantly remove backgrounds from product photos with AI. Create clean, professional product images that boost conversions.", fallback: "🖼️", color: "from-green-500 to-teal-500" },
  ];

  return (
    <section id="resources" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 text-[#4A7C59] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🛠️ Recommended Tools
          </div>
          <h2 className="font-black text-4xl md:text-5xl text-[#1A1A1A] mb-4">Tools to Grow Your Business</h2>
          <p className="text-black text-lg max-w-2xl mx-auto">Hand-picked tools that work seamlessly with Shopsofly to help you build, market, and scale your online store.</p>
        </div>
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0" style={{ scrollSnapType: "x mandatory" }}>
          {tools.map((tool) => (
            <a key={tool.name} href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="group flex-shrink-0 w-72 md:w-auto block rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ scrollSnapAlign: "start" }}>
              <div className={"bg-gradient-to-br " + tool.color + " p-6 flex items-center justify-between"}>
                <div>
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">{tool.category}</p>
                  <h3 className="text-white font-black text-xl">{tool.name}</h3>
                </div>
                <div className="text-4xl opacity-90">{tool.fallback}</div>
              </div>
              <div className="p-5 bg-white">
                <p className="text-black text-sm leading-relaxed">{tool.desc}</p>
                <div className="mt-4 flex items-center text-sm font-semibold text-[#4A7C59]">
                  <span>Learn more</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "What happens after my 21-day trial?", a: "After 21 days, your store auto-downgrades to the Basic plan at ₦5,500/month. You will receive reminder emails on day 14, 18, and 21 to upgrade." },
    { q: "Can I accept payments immediately?", a: "Yes. As soon as you add your Paystack keys in the merchant portal, your store can accept Paystack, bank transfer, and cash on delivery payments." },
    { q: "Do I need technical knowledge?", a: "No. Your store comes pre-built with everything ready. You just add your logo, products, and prices. No coding required." },
    { q: "Can I use my own domain name?", a: "Yes — custom domains are available on the Standard plan. On Basic and Trial, your store uses [yourname].shopsofly.com." },
    { q: "What is the ₦2,000 activation fee for?", a: "The ₦2,000 is a one-time activation fee that creates your store, seeds your initial products, and gives you 21 days of full access to the platform." },
    { q: "How do I get support?", a: "Email support is available on all plans. WhatsApp support is available on the Standard plan. You can also contact us via the contact form on this page." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6 bg-[#E8F0E9]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-black text-4xl text-[#1A1A1A] mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left">
                <span className="font-semibold text-[#1A1A1A]">{faq.q}</span>
                <span className="text-[#4A7C59] text-xl font-bold ml-4">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-black leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 px-6 bg-[#1A1A1A] text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-black text-4xl md:text-5xl mb-4">Ready to Start Selling?</h2>
        <p className="text-gray-300 text-lg mb-8">Join serious businesses selling online with Shopsofly.</p>
        <a href="/signup"
          className="inline-block bg-[#F97316] hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
          Activate Your Store — ₦2,000
        </a>
        <p className="text-black text-sm mt-4">21 days full access • Powered by Paystack • Cancel anytime</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#4A7C59] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">S</span>
              </div>
              <span className="font-black text-white">Shopsofly</span>
            </div>
            <p className="text-sm leading-relaxed">Nigeria&apos;s Shopify-equivalent ecommerce platform for serious businesses.</p>
          </div>
          <div>
            <p className="font-bold text-white mb-3 text-sm">Platform</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/signup" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white mb-3 text-sm">Account</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/signup" className="hover:text-white transition-colors">Create Store</a></li>
              <li><a href="https://app.shopsofly.com" className="hover:text-white transition-colors">Merchant Login</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white mb-3 text-sm">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>hello@shopsofly.com</li>
              <li>QuickDev Africa</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© 2026 Shopsofly — QuickDev Africa. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Secured by Paystack 🔒</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <main>
      <Nav />
      <Hero onDemo={() => setShowDemo(true)} />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Resources />
      <FAQ />
      <CTA />
      <Footer />
      {showDemo && <DemoPopup onClose={() => setShowDemo(false)} />}
    </main>
  );
}
