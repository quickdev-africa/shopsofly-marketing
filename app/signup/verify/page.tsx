"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://robust-annmaria-laserstarglobal-813df33a.koyeb.app";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [store, setStore] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (!reference) { setStatus("error"); setError("No payment reference found."); return; }

    fetch(`${API_URL}/api/v2/platform/merchant_onboarding/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.store) {
          setStore(data.store);
          setStatus("success");
        } else {
          setError(data.error || "Payment verification failed.");
          setStatus("error");
        }
      })
      .catch(() => { setError("Something went wrong. Contact support."); setStatus("error"); });
  }, [searchParams]);

  if (status === "loading") return (
    <div className="text-center py-20">
      <div className="w-12 h-12 border-4 border-[#4A7C59] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Verifying your payment and creating your store...</p>
    </div>
  );

  if (status === "error") return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">❌</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-500 mb-6">{error}</p>
      <a href="/signup" className="bg-[#4A7C59] text-white px-6 py-3 rounded-xl font-semibold">Try Again</a>
    </div>
  );

  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-2">Welcome to Shopsofly. Your store is being set up.</p>
      <div className="bg-[#E8F0E9] rounded-2xl p-6 max-w-sm mx-auto my-8 text-left">
        <p className="text-sm text-gray-500 mb-1">Store Name</p>
        <p className="font-bold text-gray-900 mb-3">{store?.name}</p>
        <p className="text-sm text-gray-500 mb-1">Your Store URL</p>
        <p className="font-bold text-[#4A7C59]">{store?.subdomain}.shopsofly.com</p>
      </div>
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 max-w-sm mx-auto mb-6 text-left">
        <p className="font-bold text-orange-800 mb-2">📧 Next Step:</p>
        <p className="text-orange-700 text-sm leading-relaxed">
          Check your email for a password setup link. Click the link to set your password and login to your merchant portal to complete your store setup.
        </p>
      </div>
      <a href="https://app.shopsofly.com"
        className="inline-block bg-[#4A7C59] hover:bg-[#2D4A32] text-white px-8 py-4 rounded-xl font-bold transition-colors">
        Go to Merchant Portal →
      </a>
      <p className="text-gray-400 text-xs mt-4">Your store URL will be active within a few minutes.</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0E9] via-white to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-[#4A7C59] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="font-black text-2xl text-[#1A1A1A]">Shopsofly</span>
          </a>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading...</div>}>
            <VerifyContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
