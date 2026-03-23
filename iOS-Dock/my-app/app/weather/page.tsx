"use client";

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

export default function OtpInput({ length = 4 }: { length?: number }) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
 
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, length).split("");
    const newOtp = [...otp];
    data.forEach((char, index) => {
      if (!isNaN(Number(char))) newOtp[index] = char;
    });
    setOtp(newOtp);
    const lastIndex = Math.min(data.length, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    /* Full Page Container - Adapts background for Dark Mode */
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">

      {/* Background Decorations - Subtle glows for Dark Mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[40%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[40%] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[120px]" />
      </div>

      {/* The OTP Card */}
      <div className="relative z-10 w-full max-w-lg p-3 sm:p-10 md:p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-200/40 dark:shadow-none border border-white dark:border-slate-800 transition-all">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 dark:bg-indigo-500 rounded-2xl mb-6 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Verify Account</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Enter the {length}-digit code sent to your device.
          </p>
        </div>

        {/* OTP Input Row */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => { inputRefs.current[index] = el; }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-8 h-10 sm:w-14 sm:h-18 md:w-16 md:h-20 text-center text-xl sm:text-2xl md:text-3xl font-bold 
                         text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-800 
                         border-2 border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl 
                         focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-800 
                         focus:ring-4 sm:focus:ring-8 focus:ring-indigo-100/50 dark:focus:ring-indigo-500/10 
                         transition-all outline-none"
            />
          ))}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => console.log("Verifying:", otp.join(""))}
            disabled={otp.some(v => v === "")}
            className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 
                       disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-600
                       disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all 
                       active:scale-[0.98] shadow-xl shadow-indigo-200 dark:shadow-none"
          >
            Confirm & Verify
          </button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
            Didn't get the code? {" "}
            <button className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}