
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { ContactFormData } from '../types';

const SERVICES_OPTIONS = [
  'Website Development',
  'Web App Development',
  'API Integration',
  'Technical Consultation'
];

/**
 * GOOGLE APPS SCRIPT RECOMMENDATION:
 * For this fetch to work, your Apps Script doPost should look like this:
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([data.timestamp, data.name, data.email, data.services, data.message]);
 *   return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
 * }
 */

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzB9D-3L2VPfjHeViAo3kX5aAB1aWsTx9atjEWvmWb_shR_2GrEPOfRk5gkvGNUeSLq/exec';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({ 
    name: '', 
    email: '', 
    services: [], 
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setLoading(true);
    console.log("Starting submission to:", WEBHOOK_URL);
    
    try {
      // 1. Get AI feedback for UI engagement
      const gemini = GeminiService.getInstance();
      const aiFeedbackPromise = gemini.analyzeInquiry(formData.message);

      // 2. Prepare payload
      const servicesString = formData.services.length > 0 
        ? formData.services.join(', ') 
        : 'None specified';
      const emailStr = formData.email.trim() || 'Not provided';
      
      const payload = {
        name: formData.name,
        email: emailStr,
        services: servicesString,
        message: formData.message,
        timestamp: new Date().toLocaleString()
      };

      // 3. Send to Google Sheets Webhook
      // Using 'text/plain' to avoid CORS preflight (OPTIONS) request.
      // mode: 'no-cors' allows the request to be sent even if the redirect fails to return CORS headers.
      const webhookPromise = fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      }).then(() => console.log("Webhook request dispatched successfully."));

      // 4. Construct WhatsApp Message
      const whatsappMsg = `NEW INQUIRY\nName: ${formData.name}\nEmail: ${emailStr}\nServices: ${servicesString}\nMessage: ${formData.message}`;
      const encodedMsg = encodeURIComponent(whatsappMsg);
      const whatsappUrl = `https://wa.me/60169849384?text=${encodedMsg}`;

      // Wait for AI feedback (and webhook dispatch)
      const [feedback] = await Promise.all([aiFeedbackPromise, webhookPromise]);
      setAiFeedback(feedback);

      // 5. Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setAiFeedback("I've received your inquiry! I'll be in touch very soon.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Inquiry Logged!</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you, {formData.name}. Your details have been sent to my pipeline. <br/>
            WhatsApp should have opened for us to chat immediately.
          </p>
          <div className="p-6 rounded-xl bg-purple-500/10 border border-purple-500/20 italic text-purple-300 mb-10 text-lg">
            "{aiFeedback}"
          </div>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-slate-400 hover:text-white transition-colors underline text-sm"
          >
            Back to Form
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">Let's build something <span className="gradient-text">Extraordinary</span></h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Ready to start your next project? Fill out the form below. Your request is automatically logged to my project management board, and we can continue the chat immediately on WhatsApp.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mr-4 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">Email</h4>
                <p className="text-slate-400">hello@alexchen.dev</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mr-4 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-white">WhatsApp Direct</h4>
                <p className="text-slate-400">+60 16-984 9384</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Name *</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Email (Optional)</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-3">Services Needed</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_OPTIONS.map((service) => (
                <div 
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`cursor-pointer px-4 py-3 rounded-xl border transition-all flex items-center space-x-3 ${
                    formData.services.includes(service) 
                      ? 'bg-purple-500/10 border-purple-500 text-white shadow-lg shadow-purple-500/10' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    formData.services.includes(service) ? 'bg-purple-500 border-purple-500' : 'border-slate-500'
                  }`}>
                    {formData.services.includes(service) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">{service}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Message *</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-colors"
              placeholder="How can I help you today?"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center disabled:opacity-50 shadow-xl"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="flex items-center">
                Submit & Open WhatsApp
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
              </span>
            )}
          </button>
          <div className="flex flex-col items-center justify-center space-y-2 text-[10px] text-slate-500 uppercase tracking-widest text-center">
            <div className="flex items-center space-x-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Log & WhatsApp Redirect Enabled</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>AI-Enhanced Engagement Active</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
