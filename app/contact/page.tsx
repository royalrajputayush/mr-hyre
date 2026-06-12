"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFeedback(data.message);
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("Failed to send message. Please check your network connection.");
    }
  };
  return (
    <main className="bg-slate-50 dark:bg-black min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight">
              Let's build your <span className="text-blue-600 dark:text-blue-500">dream team.</span>
            </h1>
            <p className="text-slate-600 dark:text-neutral-400 text-lg mb-12 max-w-lg">
              Have questions about our AI matching engine or enterprise plans? 
              Our team of experts is ready to help you scale.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-neutral-500 tracking-wider">EMAIL US</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">support@mrhyre.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-neutral-500 tracking-wider">LIVE CHAT</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-neutral-500 tracking-wider">HEADQUARTERS</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Silicon Valley, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl"
          >
            {feedback && (
              <div
                className={`mb-6 p-4 rounded-xl flex items-start gap-3 border text-sm ${
                  status === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="shrink-0 mt-0.5" size={16} />
                ) : (
                  <AlertCircle className="shrink-0 mt-0.5" size={16} />
                )}
                <span>{feedback}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-neutral-400">FIRST NAME</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-neutral-400">LAST NAME</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-neutral-400">WORK EMAIL</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-neutral-400">MESSAGE</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your hiring goals..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    Sending...
                    <Loader2 className="animate-spin" size={18} />
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
