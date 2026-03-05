import React from "react";
import { Phone } from "lucide-react";

const FloatingContact: React.FC = () => {
  const phoneDisplay = "+91 80743 28526";
  const waNumber = "918074328526"; // E.164 without + for wa.me

  return (
    <>
      <a
        href={`tel:+918074328526`}
        aria-label={`Call ${phoneDisplay}`}
        className="fixed bottom-6 left-6 z-50"
      >
        <div className="w-14 h-14 bg-white/95 dark:bg-black/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-bounce">
          <Phone className="w-6 h-6 text-blue-600" />
        </div>
      </a>

      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${phoneDisplay}`}
        className="fixed bottom-6 right-6 z-50"
      >
        <div style={{ animationDelay: "0.18s" }} className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.48A11.94 11.94 0 0012 0C5.373 0 .1 5.373.1 12c0 2.116.554 4.187 1.606 6.02L0 24l6.2-1.62A11.94 11.94 0 0012 24c6.627 0 11.999-5.373 11.999-12 0-3.2-1.246-6.197-3.479-8.52zM12 21.5c-1.86 0-3.68-.5-5.27-1.44l-.38-.22-3.68.96.98-3.6-.25-.36A9.5 9.5 0 1121.5 12 9.505 9.505 0 0112 21.5z" fill="#fff"/>
            <path d="M17.2 14.08c-.3-.16-1.78-.88-2.06-.98-.28-.1-.48-.16-.68.16s-.78.98-.95 1.18c-.17.2-.34.22-.63.08-.3-.16-1.27-.47-2.42-1.49-.9-.8-1.51-1.78-1.69-2.08-.17-.3-.02-.46.13-.62.13-.13.3-.34.45-.51.15-.17.2-.28.3-.46.1-.17.05-.33-.02-.47-.08-.13-.68-1.64-.93-2.26-.25-.6-.5-.52-.68-.53-.17-.01-.37-.01-.57-.01s-.47.07-.72.35c-.25.27-.98.96-.98 2.34 0 1.38 1 2.72 1.15 2.91.15.2 1.98 3.03 4.8 4.25 1.64.7 2.92.88 3.93.71.6-.1 1.78-.73 2.03-1.44.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.36z" fill="#fff"/>
          </svg>
        </div>
      </a>
    </>
  );
};

export default FloatingContact;
