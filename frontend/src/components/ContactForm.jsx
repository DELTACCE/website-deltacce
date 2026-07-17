import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from './Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Configuration for direct integration (Developer endpoint hook loaded from .env)
  const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT || "";

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    if (FORMSPREE_ENDPOINT) {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Mock submit simulation for preview
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    }
  };

  return (
    <div className="border border-indigo/10 p-8 bg-paper/40 relative select-none">
      {/* Blueprint Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-indigo/20"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-indigo/20"></div>

      <h3 className="font-heading text-lg font-extrabold text-indigo uppercase mb-6 tracking-wider">
        Send a Message
      </h3>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 border border-green-200 bg-green-50/50 text-green-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="font-body text-sm">
            <h4 className="font-heading text-xs font-bold uppercase mb-1">Transmission Successful</h4>
            <p>Thank you. Your message has been routed to the DELTA registry. We will respond shortly.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50/50 text-red-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="font-body text-sm">
            <h4 className="font-heading text-xs font-bold uppercase mb-1">Transmission Error</h4>
            <p>Could not dispatch message packet. Please verify your connection and try again.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 font-body text-sm">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-xs font-heading font-bold text-indigo uppercase tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-paper/50 border ${errors.name ? 'border-red-500' : 'border-indigo/10 focus:border-signal'} p-3 outline-none transition-colors font-body text-ink`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-heading">{errors.name}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-xs font-heading font-bold text-indigo uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-paper/50 border ${errors.email ? 'border-red-500' : 'border-indigo/10 focus:border-signal'} p-3 outline-none transition-colors font-body text-ink`}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-heading">{errors.email}</p>}
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-xs font-heading font-bold text-indigo uppercase tracking-wider mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full bg-paper/50 border ${errors.message ? 'border-red-500' : 'border-indigo/10 focus:border-signal'} p-3 outline-none transition-colors font-body text-ink resize-none`}
            placeholder="Enter your query or collaboration idea..."
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1 font-heading">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 border-signal bg-signal hover:bg-transparent hover:text-signal text-paper"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              TRANSMITTING...
            </>
          ) : (
            <>
              <Send className="w-4.5 h-4.5" />
              DISPATCH MESSAGE
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
