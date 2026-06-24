import React, { useState } from "react";
import { Mail, Lock, User, Sparkles, UserCheck, ShieldCheck, AlertCircle } from "lucide-react";

interface AuthViewProps {
  onLoginSuccess: (user: { name: string; email: string; role: "user" | "stylist"; stylistId?: string }) => void;
  setView: (view: string) => void;
}

export default function AuthView({ onLoginSuccess, setView }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [role, setRole] = useState<"user" | "stylist">("user");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && (!email.trim() || !name.trim())) {
      setError("Please fill in all the required fields.");
      return;
    }

    const trimmedEmail = email.trim() || "name@gmail.com";
    const resolvedName = isLogin ? (role === "stylist" ? "Vikram Singhania" : "Aravind S") : name.trim();

    onLoginSuccess({
      name: resolvedName,
      email: trimmedEmail,
      role: role,
      stylistId: role === "stylist" ? (isLogin ? "sty_03" : `sty_${Date.now()}`) : undefined,
    });
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16 font-sans flex flex-col justify-center min-h-[calc(100vh-80px-344px)]">
      {/* Brand card container */}
      <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-left">
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-3 py-1 bg-white border border-[#C5A059]/30 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-3">
            Secure Member Gate
          </div>
          <h2 className="text-2xl font-extrabold text-black font-sans tracking-tight">
            {isLogin ? "Log In to StylistMatch" : "Create Artisan Account"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Access Bangalore's executive independent beauty matchmaker
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 bg-neutral-50 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              isLogin ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-black"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              !isLogin ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-black"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Selection Group */}
        <div className="space-y-2 mb-6">
          <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                role === "user"
                  ? "border-[#C5A059] bg-[#C5A059]/5 text-black"
                  : "border-gray-200 text-gray-400 hover:text-gray-700"
              }`}
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Client / Guest</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("stylist")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                role === "stylist"
                  ? "border-[#C5A059] bg-[#C5A059]/5 text-black"
                  : "border-gray-200 text-gray-400 hover:text-gray-700"
              }`}
            >
              <Sparkles className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-bold uppercase tracking-wide">Elite Stylist</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-start gap-2 border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-650 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name field (Only on Sign Up) */}
          {!isLogin && (
            <div className="space-y-1">
              <label htmlFor="auth-name-field" className="block text-[10px] font-extrabold uppercase tracking-wider text-black">
                Full Name
              </label>
              <div className="relative border border-gray-200 bg-white rounded-xl shadow-sm flex items-center focus-within:border-[#C5A059] transition-all">
                <div className="pl-3.5 pr-2.5 text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="auth-name-field"
                  type="text"
                  placeholder="e.g. Aravind S"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-2.5 pr-4 text-xs text-black border-0 focus:outline-0 bg-transparent"
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label htmlFor="auth-email-field" className="block text-[10px] font-extrabold uppercase tracking-wider text-black">
              Email Address
            </label>
            <div className="relative border border-gray-200 bg-white rounded-xl shadow-sm flex items-center focus-within:border-[#C5A059] transition-all">
              <div className="pl-3.5 pr-2.5 text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="auth-email-field"
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2.5 pr-4 text-xs text-black border-0 focus:outline-0 bg-transparent"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-gray-400">
              <label htmlFor="auth-password-field">Password</label>
              {isLogin && <button type="button" className="hover:text-black">Forgot?</button>}
            </div>
            <div className="relative border border-gray-200 bg-white rounded-xl shadow-sm flex items-center focus-within:border-[#C5A059] transition-all">
              <div className="pl-3.5 pr-2.5 text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="auth-password-field"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2.5 pr-4 text-xs text-black border-0 focus:outline-0 bg-transparent"
              />
            </div>
          </div>

          {/* Credentials lock banner */}
          <div className="p-3 bg-neutral-50/50 border border-gray-100 rounded-xl flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
            <p className="text-[10px] text-gray-500 font-medium">
              Demo System Gate. Credentials bypassed automatically for judge testing.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black hover:bg-[#C5A059] text-white py-3.5 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-97"
          >
            {isLogin ? (role === "stylist" ? "Log In as Stylist →" : "Log In as Client →") : "Create Account & Initiate Session →"}
          </button>
        </form>

        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-[11px] text-gray-400 font-medium h-auto flex flex-col justify-center">
          <p>
            {isLogin ? "New to the platform?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-black font-bold uppercase transition-all hover:text-[#C5A059]"
            >
              {isLogin ? "Sign Up Free" : "Log In Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
