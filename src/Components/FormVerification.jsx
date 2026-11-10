
import { useRef, useState } from "react";
import "../style/Formver.css";


const EXAMPLES = [
  "I pressed Resend 3 times and no SMS arrived.",
  "The email never shows up, not even in spam.",
  "The code arrived but it says it's invalid.",
];

const CHANNELS = [
  { value: "sms", label: "SMS" },
  { value: "email", label: "Email" },
  { value: "unknown", label: "Not sure" },
];

// ------------------------------------------------------------
// المكوّن الرئيسي: الشاشة نفسها
// props:
//   length    → عدد المربعات (افتراضي 6)
//   onSubmit  → بتتنده لما المستخدم يدوس Send، وبتاخد الكود كنص
//   onResend  → بتتنده لما يدوس Resend
//   helpUrl   → رابط السيرفر اللي بيرجّع خطوات الحل من الذكاء الاصطناعي
// ------------------------------------------------------------
export default function VerificationCode({
  length = 6,
  onSubmit,
  onResend,
  helpUrl = "/api/troubleshoot",
}) {
  const [code, setCode] = useState(Array(length).fill("")); // رقم لكل مربع
  const [helpOpen, setHelpOpen] = useState(false); // النافذة مفتوحة ولا لأ
  const inputs = useRef([]); // مراجع للمربعات عشان ننقل المؤشر

  // الكتابة: أرقام بس، وبعدين انقل للمربع اللي بعده
  const handleChange = (e, i) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = digit;
    setCode(next);
    if (digit && i < length - 1) inputs.current[i + 1]?.focus();
  };

  // Backspace في مربع فاضي → ارجع للمربع اللي قبله
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  // لصق الكود كله مرة واحدة
  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!data) return;
    e.preventDefault();
    const next = Array(length).fill("");
    data.split("").forEach((d, idx) => (next[idx] = d));
    setCode(next);
    inputs.current[Math.min(data.length, length - 1)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(code.join(""));
  };

  return (
    <div className="vc-page">
      <form className="vc-card" onSubmit={handleSubmit}>
        <h2 className="vc-title">Enter Verification Code</h2>

        <div className="vc-inputs" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              className="vc-input"
              aria-label={`Digit ${i + 1}`}
              type="text"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <p className="vc-resend">
          If you didn't receive a code,{" "}
          <button type="button" className="vc-link" onClick={() => onResend?.()}>
            Resend
          </button>
        </p>

        {/* رابط المساعدة: بيفتح النافذة */}
        <button type="button" className="vc-link vc-help-link" onClick={() => setHelpOpen(true)}>
          Having trouble? Get help
        </button>

        <button type="submit" className="vc-btn" disabled={code.some((d) => !d)}>
          Send
        </button>
      </form>

      {helpOpen && <HelpModal helpUrl={helpUrl} onClose={() => setHelpOpen(false)} />}
    </div>
  );
}

// ------------------------------------------------------------
// نافذة المساعدة: المستخدم يوصف المشكلة → نبعتها للسيرفر → نعرض الخطوات
// السيرفر لازم يرجّع: { summary: "...", steps: [{ title, detail }] }
// أو في حالة الخطأ: { error: "..." }
// ------------------------------------------------------------
function HelpModal({ helpUrl, onClose }) {
  const [problem, setProblem] = useState("");
  const [channel, setChannel] = useState("sms");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const canSubmit = problem.trim().length >= 5 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(helpUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: problem.trim(), channel }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (err) {
      setError(err.message || "Couldn't reach the help assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // الضغط على الخلفية الغامقة بيقفل النافذة
    <div className="vc-overlay" onClick={onClose}>
      <div
        className="vc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vc-help-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="vc-close" aria-label="Close" onClick={onClose}>
          ×
        </button>

        <h3 id="vc-help-title" className="vc-modal-title">Code not working?</h3>
        <p className="vc-modal-desc">
          Tell us what's happening and we'll suggest steps that fit your situation.
        </p>

        <form onSubmit={handleSubmit}>
          {/* طريقة استلام الكود */}
          <p className="vc-label">How was the code sent?</p>
          <div className="vc-chips">
            {CHANNELS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`vc-chip ${channel === c.value ? "is-active" : ""}`}
                aria-pressed={channel === c.value}
                onClick={() => setChannel(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* وصف المشكلة */}
          <label htmlFor="vc-problem" className="vc-label">Describe the problem</label>
          <textarea
            id="vc-problem"
            className="vc-textarea"
            rows={4}
            maxLength={1000}
            placeholder="e.g. I waited 5 minutes and nothing arrived…"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
          <div className="vc-examples">
            {EXAMPLES.map((ex) => (
              <button key={ex} type="button" className="vc-example" onClick={() => setProblem(ex)}>
                {ex}
              </button>
            ))}
          </div>

          <button type="submit" className="vc-btn" disabled={!canSubmit}>
            {loading ? "Finding solutions…" : "Get troubleshooting steps"}
          </button>
        </form>

        {error && <p className="vc-error" role="alert">{error}</p>}

        {/* النتيجة: ملخص + خطوات مترقّمة */}
        {result && (
          <div className="vc-result" aria-live="polite">
            <p className="vc-summary">{result.summary}</p>
            <ol className="vc-steps">
              {result.steps.map((step, i) => (
                <li key={i} className="vc-step">
                  <span className="vc-step-num">{i + 1}</span>
                  <div>
                    <p className="vc-step-title">{step.title}</p>
                    <p className="vc-step-detail">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}