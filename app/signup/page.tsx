"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://robust-annmaria-laserstarglobal-813df33a.koyeb.app";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "", phone: "",
    store_name: "", subdomain: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-generate subdomain from store name
      if (name === "store_name") {
        updated.subdomain = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      }
      return updated;
    });
  }

  async function handleSubmit() {
    if (!form.first_name || !form.last_name || !form.email || !form.phone || !form.store_name || !form.subdomain) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v2/platform/merchant_onboarding/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      // Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (err: any) {
      setError(err.message || "Failed to initialize payment. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0E9] via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4A7C59] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="font-black text-2xl text-[#1A1A1A]">Shopsofly</span>
          </a>
          <h1 className="text-2xl font-black text-[#1A1A1A] mt-4">Create Your Store</h1>
          <p className="text-gray-500 mt-1">21-day trial • ₦2,000 activation • Store ready in minutes</p>
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

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">First Name</label>
                  <input name="first_name" value={form.first_name} onChange={handleChange}
                    placeholder="John" type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Last Name</label>
                  <input name="last_name" value={form.last_name} onChange={handleChange}
                    placeholder="Doe" type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Email Address</label>
                <input name="email" value={form.email} onChange={handleChange}
                  placeholder="john@example.com" type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  placeholder="08012345678" type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Store Name</label>
                <input name="store_name" value={form.store_name} onChange={handleChange}
                  placeholder="My Amazing Store" type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Store URL</label>
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#4A7C59]">
                  <input name="subdomain" value={form.subdomain} onChange={handleChange}
                    placeholder="mystore" type="text"
                    className="flex-1 px-4 py-3 text-sm outline-none" />
                  <span className="bg-gray-50 px-3 py-3 text-sm text-gray-500 border-l border-gray-300 whitespace-nowrap">.shopsofly.com</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Your store will be at {form.subdomain || "yourstore"}.shopsofly.com</p>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

              <button onClick={() => setStep(2)}
                className="w-full bg-[#4A7C59] hover:bg-[#2D4A32] text-white font-bold py-4 rounded-xl text-base transition-colors">
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-[#E8F0E9] rounded-2xl p-5">
                <h3 className="font-bold text-[#1A1A1A] mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Store Name</span>
                    <span className="font-semibold text-gray-900">{form.store_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Store URL</span>
                    <span className="font-semibold text-gray-900">{form.subdomain}.shopsofly.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="font-semibold text-gray-900">{form.email}</span>
                  </div>
                  <div className="border-t border-[#4A7C59]/20 pt-2 mt-2 flex justify-between font-bold">
                    <span>21-Day Trial Activation</span>
                    <span className="text-[#4A7C59]">₦2,000</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
                <p className="font-semibold mb-1">✓ What happens after payment:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Your store is created instantly</li>
                  <li>• 10 demo products are loaded automatically</li>
                  <li>• You receive an email to set your password</li>
                  <li>• 21 days full access begins immediately</li>
                </ul>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">{error}</p>}

              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-black py-4 rounded-xl text-base transition-colors disabled:opacity-60 shadow-lg">
                {loading ? "Redirecting to Paystack..." : "Pay ₦2,000 & Activate Store →"}
              </button>

              <button onClick={() => setStep(1)} className="w-full text-gray-500 text-sm hover:text-gray-700">
                ← Back to edit details
              </button>

              <p className="text-center text-xs text-gray-400">🔒 Secured by Paystack. Your payment is safe.</p>
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
