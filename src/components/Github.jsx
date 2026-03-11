import React, { useState } from 'react';
import { Lock, Github as GithubIcon, Mail, Copy, Check } from 'lucide-react';

function Github() {
  const [copied, setCopied] = useState(false);
  const email = `${import.meta.env.VITE_CONTACT_EMAIL}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-200">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        
        {/* Icon Header */}
        <div className="flex justify-center">
          <div className="relative">
            <GithubIcon size={64} className="text-slate-400" />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 rounded-full border-4 border-slate-900">
              <Lock size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Private Repository
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Repository available upon request </p>
        </div>

        <hr className="border-slate-800" />

        {/* Action Features */}
        <div className="space-y-4">
          <a 
            href={`mailto:${email}?subject=Requesting Access to GitHub Repo`}
            className="flex items-center justify-center gap-2 w-full bg-white text-slate-950 font-semibold py-3 px-4 rounded-lg hover:bg-blue-400 transition-colors"
          >
            <Mail size={18} />
            Request Access via Email
          </a>

          <button 
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 w-full bg-slate-800 border border-slate-700 text-slate-300 py-3 px-4 rounded-lg hover:bg-slate-750 transition-all group"
          >
            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            <span>{copied ? "Email Copied!" : "Copy Email Address"}</span>
          </button>
        </div>

      
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">
          Response time: usually &lt; 24 hours
        </p>
      </div>
    </div>
  );
}

export default Github;