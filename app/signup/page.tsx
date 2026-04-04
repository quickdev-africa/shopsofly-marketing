"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://robust-annmaria-laserstarglobal-813df33a.koyeb.app";

const PLANS: Record<string, any> = {
  trial: { name: "21-Day Trial", monthlyPrice: 2000, label: "one-time activation" },
  basic: { name: "Basic", monthlyPrice: 5500, yearlyPrice: 58740, label: "per month" },
  standard: { name: "Standard", monthlyPrice: 12500, yearlyPrice: 132000, label: "per month" },
};

const DURATIONS = [
  { months: 1, label: "1 Month", discount: 0 },
  { months: 3, label: "3 Months", discount: 0 },
  { months: 6, label: "6 Months", discount: 0 },
  { months: 12, label: "12 Months", discount: 1, badge: "Best Value" },
];

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") || "trial";
  const plan = PLANS[planKey] || PLANS.trial;
  const isTrial = planKey === "trial";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [duration, setDuration] = useState(1);
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    store_name: "", subdomain: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "store_name") {
        updated.subdomain = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      }
      return updated;
    });
  }

  function getPrice() {
    if (isTrial) return 2000;
    if (duration === 12 && plan.yearlyPrice) return plan.yearlyPrice;
    return plan.monthlyPrice * duration;
  }

  function getSaving() {
    if (isTrial || duration !== 12 || !plan.yearlyPrice) return 0;
    return (plan.monthlyPrice * 12) - plan.yearlyPrice;
  }

  function getSubheading() {
    if (isTrial) return "Create Your Store • ₦2,000 activation • Store ready in minutes";
    if (planKey === "basic") return "Create Your Store • ₦5,500/month • Store ready in minutes";
    return "Create Your Store • ₦12,500/month • Store ready in minutes";
  }

  async function handleSubmit() {
    if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.store_name || !form.subdomain) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const amount = getPrice() * 100; // kobo
      const res = await fetch(`${API_URL}/api/v2/platform/merchant_onboarding/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount_override: amount, plan: planKey, duration_months: duration }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      window.location.href = data.authorization_url;
    } catch (err: any) {
      setError(err.message || "Failed. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0E9] via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4A7C59] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="font-black text-2xl text-[#1A1A1A]">Shopsofly</span>
          </a>
          <h1 className="text-2xl font-black text-[#1A1A1A] mt-4">
            {isTrial ? "Activate Your Store" : `${plan.name} Plan`}
          </h1>
          <p className="text-gray-600 mt-1 text-sm">{getSubheading()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {/* Steps */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={"w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold " + (
                  step >= s ? "bg-[#4A7C59] text-white" : "bg-gray-100 text-gray-400"
                )}>{s}</div>
                <span className={"text-xs font-medium " + (step >= s ? "text-[#4A7C59]" : "text-gray-400")}>
                  {s === 1 ? "Your Details" : "Payment"}
                </span>
                {s < 2 && <div className={"flex-1 h-0.5 " + (step > s ? "bg-[#4A7C59]" : "bg-gray-200")} />}
              </div>
            ))}
          </div>

          {/* Plan Switcher */}
          <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Switch Plan</p>
            <div className="flex gap-2 flex-wrap">
              <a href="/signup"
                className={"flex-1 text-center text-xs font-bold py-2 px-3 rounded-xl border-2 transition-colors " + (
                  planKey === "trial" ? "border-[#F97316] bg-orange-50 text-[#F97316]" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}>
                Trial<br/><span className="font-black">₦2,000</span>
              </a>
              <a href="/signup?plan=basic"
                className={"flex-1 text-center text-xs font-bold py-2 px-3 rounded-xl border-2 transition-colors " + (
                  planKey === "basic" ? "border-[#4A7C59] bg-green-50 text-[#4A7C59]" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}>
                Basic<br/><span className="font-black">₦5,500/mo</span>
              </a>
              <a href="/signup?plan=standard"
                className={"flex-1 text-center text-xs font-bold py-2 px-3 rounded-xl border-2 transition-colors " + (
                  planKey === "standard" ? "border-[#4A7C59] bg-green-50 text-[#4A7C59]" : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}>
                Standard<br/><span className="font-black">₦12,500/mo</span>
              </a>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">First Name</label>
                  <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="John" type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Last Name</label>
                  <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Doe" type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email Address</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="08012345678" type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Store Name</label>
                <input name="store_name" value={form.store_name} onChange={handleChange} placeholder="My Amazing Store" type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Store URL</label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#4A7C59]">
                  <input name="subdomain" value={form.subdomain} onChange={handleChange} placeholder="mystore" type="text"
                    className="flex-1 px-4 py-3 text-sm outline-none" />
                  <span className="bg-gray-50 px-3 py-3 text-sm text-gray-500 border-l border-gray-300 whitespace-nowrap">.shopsofly.com</span>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
              <button onClick={() => setStep(2)}
                className="w-full bg-[#4A7C59] hover:bg-[#2D4A32] text-white font-bold py-4 rounded-xl text-base transition-colors">
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              {/* Duration selector - only for paid plans */}
              {!isTrial && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Select Duration</label>
                  <div className="grid grid-cols-2 gap-2">
                    {DURATIONS.map((d) => {
                      const price = d.months === 12 && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice * d.months;
                      const saving = d.months === 12 && plan.yearlyPrice ? (plan.monthlyPrice * 12) - plan.yearlyPrice : 0;
                      return (
                        <button key={d.months} onClick={() => setDuration(d.months)}
                          className={"p-3 border-2 rounded-xl text-left transition-all relative " + (
                            duration === d.months ? "border-[#4A7C59] bg-[#E8F0E9]" : "border-gray-200 hover:border-gray-300"
                          )}>
                          {d.badge && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {d.badge}
                            </span>
                          )}
                          <p className="font-bold text-sm text-gray-900">{d.label}</p>
                          <p className="font-black text-[#4A7C59]">₦{price.toLocaleString()}</p>
                          {saving > 0 && <p className="text-xs text-green-600 font-semibold">Save ₦{saving.toLocaleString()}</p>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-[#E8F0E9] rounded-2xl p-5">
                <h3 className="font-bold text-[#1A1A1A] mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Store Name</span>
                    <span className="font-semibold text-gray-900">{form.store_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-semibold text-gray-900">{plan.name}</span>
                  </div>
                  {!isTrial && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold text-gray-900">{duration} month{duration > 1 ? "s" : ""}</span>
                    </div>
                  )}
                  {getSaving() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-semibold">You Save</span>
                      <span className="font-bold">₦{getSaving().toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t border-[#4A7C59]/20 pt-2 mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#4A7C59] text-lg">₦{getPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
                <p className="font-semibold mb-1">✓ What happens after payment:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Your store is created instantly</li>
                  <li>• 10 demo products are loaded automatically</li>
                  <li>• You receive an email to set your password</li>
                  {isTrial && <li>• 21 days full access begins immediately</li>}
                </ul>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-black py-4 rounded-xl text-base transition-colors disabled:opacity-60 shadow-lg">
                {loading ? "Redirecting to Paystack..." : `Pay ₦${getPrice().toLocaleString()} →`}
              </button>

              <button onClick={() => setStep(1)} className="w-full text-gray-500 text-sm hover:text-gray-700">
                ← Back to edit details
              </button>
              <p className="text-center text-xs text-gray-400">🔒 Secured by Paystack</p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have a store?{" "}
          <a href="https://shopsofly-merchant.vercel.app/login" className="text-[#4A7C59] font-semibold hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <SignupContent />
    </Suspense>
  );
}
