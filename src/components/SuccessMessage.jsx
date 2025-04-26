import { Home, ArrowLeft } from 'lucide-react';
import { CheckIcon } from './Icons';

function SuccessMessage({ onHome, onBack }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-20 h-20 rounded-full bg-[#FCC201]/20 flex items-center justify-center">
        <CheckIcon className="w-10 h-10 text-[#FCC201]" />
      </div>
      <h2 className="text-xl font-bold text-center text-white font-['Montserrat']">Thank You!</h2>
      <p className="text-gray-300 text-center font-['Lexend']">
        Your message has been sent successfully. An agent will contact you shortly.
      </p>
      <div className="flex gap-4 w-full">
        <button
          onClick={onBack}
          className="flex-1 border-2 border-[#FCC201] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#FCC201]/10 transition-colors font-['Montserrat'] glow-effect"
        >
          <ArrowLeft className="w-5 h-5 inline mr-2" />
          Back
        </button>
        <button
          onClick={onHome}
          className="flex-1 bg-[#FCC201] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#E5AC00] transition-colors font-['Montserrat'] glow-effect"
        >
          <Home className="w-5 h-5 inline mr-2" />
          Home
        </button>
      </div>
    </div>
  );
}

export default SuccessMessage;