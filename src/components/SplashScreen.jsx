import { useState } from 'react';

export default function SplashScreen({ onStart }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      await onStart();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 px-7 text-center"
         style={{ background: '#080C18' }}>
      
      {/* Logo */}
      <div className="animate-float">
        <h1 className="font-[var(--font-display)] text-[52px] leading-tight text-saah-blue">
          سعة <span className="text-saah-orange">·</span>
        </h1>
      </div>

      <div className="font-[var(--font-display)] text-[11px] tracking-[2px] text-saah-blue">
        AR SPACE ORGANIZER
      </div>

      <p className="max-w-[260px] text-[13px] leading-relaxed text-saah-muted">
        ضع صناديق افتراضية في مساحتك الحقيقية.
        <br />
        شوف إذا تناسب قبل ما تنقل.
      </p>

      {/* Steps Card */}
      <div className="glass w-full max-w-[300px] rounded-[14px] p-4 text-right animate-fade-in"
           style={{ animationDelay: '0.2s' }}>
        <h3 className="mb-3 font-[var(--font-display)] text-[9px] uppercase tracking-[2px] text-saah-muted">
          طريقة الاستخدام
        </h3>

        {[
          { n: '1', text: <>اضغط <strong>ابدأ</strong> واسمح بالكاميرا</> },
          { n: '2', text: 'وجّه الكاميرا نحو الأرض أو المساحة' },
          { n: '3', text: <>ادخل اسم الغرض وحجمه ثم اضغط <strong>ضع</strong></> },
          { n: '4', text: 'اسحب الصناديق لتنظيمها' },
        ].map(step => (
          <div key={step.n} className="mb-2 flex items-start gap-2.5 text-[13px] leading-snug">
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-saah-blue bg-saah-blue-light font-[var(--font-display)] text-[10px] text-saah-blue">
              {step.n}
            </div>
            <div>{step.text}</div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-[300px] rounded-xl border border-saah-red/30 bg-saah-red/10 p-3 text-[13px] text-saah-red">
          {error}
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full max-w-[300px] rounded-[13px] bg-saah-blue px-6 py-4 font-[var(--font-body)] text-[16px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 animate-glow"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            جاري التحميل...
          </span>
        ) : (
          '← ابدأ الواقع المعزز'
        )}
      </button>

      {/* Course Badge */}
      <div className="mt-2 font-[var(--font-display)] text-[10px] tracking-wider text-saah-muted/60">
        CPIS360 · Smart AR Space Organizer
      </div>
    </div>
  );
}
