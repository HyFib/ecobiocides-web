"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+\-()]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitize = (input: string): string => {
    return input
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .trim();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (honeypot) return;

    if (!validate()) return;

    // Sanitize data
    const sanitizedData = {
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      phone: sanitize(formData.phone),
      city: sanitize(formData.city),
      message: sanitize(formData.message),
    };

    // Construct mailto link as fallback
    const subject = encodeURIComponent(
      `Website Inquiry from ${sanitizedData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nPhone: ${sanitizedData.phone}\nCity: ${sanitizedData.city}\n\nMessage:\n${sanitizedData.message}`
    );
    window.location.href = `mailto:${COMPANY.emails[0]}?subject=${subject}&body=${body}`;

    setIsSubmitted(true);

  };

  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello! I'd like to inquire about your products.")}`;

  return (
    <section id="contact" className="relative overflow-hidden bg-[#fcfcf8] py-20 sm:py-24">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-stone-50/40 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-stone-50/30 blur-3xl" />
      </div>

      <div className="site-container">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-2">
          <div><p className="eyebrow text-[#647458]">Let’s grow together</p><h2 className="section-title mt-4">Your next season.<br />Our shared purpose.</h2></div>
          <p className="max-w-lg text-base leading-7 text-[#687267]">Tell us about your crop, formulation or supply requirements. Our team is here to help you find your next step.</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {/* Key contacts */}
              <div className="rounded-2xl border border-gray-100 bg-[#f5f3ea] p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Key Contacts
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-gray-900">M. Karunakaran</p>
                    <p className="text-xs text-gray-500">Managing Director</p>
                    <a
                      href="tel:+919443352020"
                      className="mt-1 flex items-center gap-2 text-sm text-[#446450] hover:text-slate-600"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      +91 9443352020
                    </a>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      K. Bhuvaneswari
                    </p>
                    <p className="text-xs text-gray-500">
                      Executive Manager
                    </p>
                    <a
                      href="tel:+919443342020"
                      className="mt-1 flex items-center gap-2 text-sm text-[#446450] hover:text-slate-600"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      +91 9443342020
                    </a>
                  </div>
                </div>
              </div>

              {/* Info cards */}
              <div className="space-y-3">
                <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-50 text-[#446450]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Visit Us
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {COMPANY.address.street}, {COMPANY.address.city} –{" "}
                      {COMPANY.address.zip}, {COMPANY.address.state},{" "}
                      {COMPANY.address.country}
                    </p>
                    <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-slate-600 underline underline-offset-4">Get directions to our factory</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-50 text-[#446450]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Email Us
                    </p>
                    <a
                      href={`mailto:${COMPANY.emails[0]}`}
                      className="mt-1 block text-sm text-[#446450] hover:text-slate-600"
                    >
                      {COMPANY.emails[0]}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-50 text-[#446450]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Business Hours
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Mon – Sat: 9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/40"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>

              {/* Trust message */}
              <p className="text-center text-xs text-gray-400">
                Average response time: under 2 hours during business hours
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="bg-[#173f35] p-6">
                <h3 className="text-lg font-bold text-white">
                  Request a Quote
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  Prepare your enquiry, then send it from your email app.
                </p>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-50">
                    <CheckCircle2 className="h-8 w-8 text-[#446450]" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-gray-900">
                    Complete your enquiry in your email app
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Your email app should open with a draft. Send it there to deliver your enquiry. If it does not open, email {COMPANY.emails[0]} or use WhatsApp.
                  </p>
                  <button type="button" onClick={() => setIsSubmitted(false)} className="mt-6 min-h-11 rounded-full border border-stone-200 px-6 py-3 font-semibold text-slate-800">Return to your enquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8" noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] opacity-0"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-eco-500 focus:outline-none focus:ring-2 focus:ring-eco-500/20 ${
                          errors.name ? "border-red-300" : "border-gray-200"
                        }`}
                        placeholder="Your full name"
                        required
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-eco-500 focus:outline-none focus:ring-2 focus:ring-eco-500/20 ${
                          errors.email ? "border-red-300" : "border-gray-200"
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-eco-500 focus:outline-none focus:ring-2 focus:ring-eco-500/20 ${
                          errors.phone ? "border-red-300" : "border-gray-200"
                        }`}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-eco-500 focus:outline-none focus:ring-2 focus:ring-eco-500/20"
                        placeholder="Your city"
                      />
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-gray-700"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={4}
                        maxLength={500}
                        className={`w-full resize-none rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-eco-500 focus:outline-none focus:ring-2 focus:ring-eco-500/20 ${
                          errors.message ? "border-red-300" : "border-gray-200"
                        }`}
                        placeholder="Tell us about your requirements..."
                        required
                      />
                      <div className="mt-1 flex justify-between">
                        {errors.message && (
                          <p className="text-xs text-red-500">
                            {errors.message}
                          </p>
                        )}
                        <p className="ml-auto text-xs text-gray-400">
                          {formData.message.length}/500
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#173f35] px-8 py-3.5 text-base font-semibold text-white  transition-all hover:-translate-y-0.5 hover:bg-[#2e5847] sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    Prepare Email Enquiry
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
              <iframe
                src={COMPANY.mapEmbedUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ecobiocides & Botanicals Location"
                className="grayscale transition-all hover:grayscale-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
