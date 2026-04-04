"use client";
import { useState } from "react";
import Link from "next/link";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4A7C59] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">S</span>
          </div>
          <span className="font-black text-xl text-[#1A1A1A]">Shopsofly</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-[#4A7C59] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#4A7C59] transition-colors">Pricing</a>
          <a href="#how-it-works" className="hover:text-[#4A7C59] transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-[#4A7C59] transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://shopsofly-merchant.vercel.app/login" className="text-sm font-semibold text-gray-700 hover:text-[#4A7C59]">Login</a>
          <a href="#pricing" className="bg-[#F97316] hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            Start Free Trial
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-[#E8F0E9] via-white to-orange-50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 text-[#4A7C59] text-sm font-semibold px-4 py-2 rounded-full mb-6">
          🇳🇬 Built for Nigerian Businesses
        </div>
        <h1 className="font-black text-5xl md:text-7xl text-[#1A1A1A] leading-tight mb-6">
          Launch Your Online<br />
          <span className="text-[#4A7C59]">Store in Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Nigeria&apos;s most powerful ecommerce platform. Accept Paystack, bank transfer, and cash on delivery.
          Start your 21-day free trial for just ₦2,000.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="#pricing"
            className="bg-[#F97316] hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
            Start Free — ₦2,000 Activation
          </a>
          <a href="#how-it-works"
            className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 py-4 rounded-2xl text-lg border-2 border-gray-200 transition-colors">
            See How It Works →
          </a>
        </div>
        <p className="text-sm text-gray-500">21 days full access • No monthly fee during trial • Cancel anytime</p>
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
            <p className="text-gray-400 text-sm mt-1">{s.label}</p>
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
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">One platform. All the tools. Built specifically for Nigerian merchants.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-gray-100 hover:border-[#4A7C59]/30 hover:shadow-md transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
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
          <p className="text-gray-600 text-lg">No technical knowledge required.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-14 h-14 bg-[#4A7C59] text-white rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-5">
                {s.num}
              </div>
              <h3 className="font-bold text-xl text-[#1A1A1A] mb-3">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "21-Day Free Trial",
      price: "₦2,000",
      period: "one-time activation",
      highlight: true,
      cta: "Start Free Trial",
      badge: "START HERE",
      features: [
        "21 days full platform access",
        "Up to 10 products",
        "All payment methods",
        "Landing page builder",
        "Full theme customizer",
        "WhatsApp notifications",
        "After trial: auto-downgrade to Basic",
      ],
    },
    {
      name: "Basic",
      price: "₦5,500",
      period: "per month",
      highlight: false,
      cta: "Choose Basic",
      badge: null,
      features: [
        "Up to 20 products",
        "200 orders/month",
        "2 staff accounts",
        "Paystack payments",
        "Email support",
        "Basic analytics",
        "Colors + logo customizer",
      ],
    },
    {
      name: "Standard",
      price: "₦12,500",
      period: "per month",
      highlight: false,
      cta: "Choose Standard",
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
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-black text-4xl md:text-5xl text-[#1A1A1A] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-500 text-lg">Start free. Upgrade when you&apos;re ready.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
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
              <div className="mb-6">
                <span className="text-4xl font-black text-[#1A1A1A]">{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">{plan.period}</span>
              </div>
              <a href="/signup"
                className={"block text-center font-bold py-3 rounded-xl mb-8 transition-colors " + (
                  plan.highlight
                    ? "bg-[#F97316] hover:bg-orange-600 text-white"
                    : "bg-[#4A7C59] hover:bg-[#2D4A32] text-white"
                )}>
                {plan.cta}
              </a>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#4A7C59] font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
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
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
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
        <p className="text-gray-300 text-lg mb-8">Join hundreds of Nigerian businesses selling online with Shopsofly.</p>
        <a href="/signup"
          className="inline-block bg-[#F97316] hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
          Start Free Trial — ₦2,000
        </a>
        <p className="text-gray-500 text-sm mt-4">21 days full access • Powered by Paystack • Cancel anytime</p>
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
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white mb-3 text-sm">Account</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/signup" className="hover:text-white transition-colors">Create Store</a></li>
              <li><a href="https://shopsofly-merchant.vercel.app/login" className="hover:text-white transition-colors">Merchant Login</a></li>
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
  return (
    <main>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
