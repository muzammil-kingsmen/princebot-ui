import React, { useState, useRef, useEffect } from "react";
import { CheckIcon } from "./Icons";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import countryCodes from "../data/countryCodes";
import emailjs from '@emailjs/browser';

function ContactForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountryCodes, setFilteredCountryCodes] = useState([]);
  const [isSending, setIsSending] = useState(false); // New state for loading
  const dropdownRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('AvjPrQNoknC5EzQnk');
  }, []);

  const getPhonePlaceholder = () => {
    const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);
    return selectedCountry ? selectedCountry.placeholder : 'Phone number';
  };

  useEffect(() => {
    setFilteredCountryCodes(countryCodes);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = countryCodes.filter(country => 
        country.searchTerms.toLowerCase().includes(searchQuery.toLowerCase()) || 
        country.code.includes(searchQuery)
      );
      setFilteredCountryCodes(filtered.length > 0 ? filtered : countryCodes);
    } else {
      setFilteredCountryCodes(countryCodes);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      phone: formData.countryCode + formData.phone
    };

    console.log('Submitting form with data:', submissionData);

    const serviceID = 'service_kyqr89z';
    const templateID = 'template_s427ebb';
    const publicKey = 'AvjPrQNoknC5EzQnk';

    const templateParams = {
      name: submissionData.name,
      email: submissionData.email,
      phone: submissionData.phone,
      to_email: 'codewithmuzzu@gmail.com' // Change this to your desired email address
    };

    setIsSending(true); // Start loader

    emailjs.send(serviceID, templateID, templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setIsSending(false); // Stop loader
        onSubmit(submissionData);
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text, error);
        setIsSending(false); // Stop loader
        onSubmit(submissionData);
      });
  };

  const handleSelectCountryCode = (code) => {
    setFormData({ ...formData, countryCode: code });
    setIsDropdownOpen(false);
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  };

  const formatPhoneNumber = (input, countryCode) => {
    const digitsOnly = input.replace(/\D/g, '');
    return digitsOnly;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value, formData.countryCode);
    setFormData({ ...formData, phone: formatted });
  };

  return (
    <div className="flex flex-col h-full p-6">
      <button
        onClick={onBack}
        className="text-[#FCC201] hover:text-[#E5AC00] self-start mb-6"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-6">
        <div>
          <label className="flex items-center justify-between text-white font-['Montserrat']">
            <span className="text-sm font-medium">NAME</span>
            <CheckIcon className={formData.name ? 'text-[#FCC201]' : 'text-gray-500'} />
          </label>
          <input
            type="text"
            required
            placeholder="Prince Bot"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 w-full bg-[#2D2D2D] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCC201]"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-white font-['Montserrat']">
            <span className="text-sm font-medium">EMAIL</span>
            <CheckIcon className={formData.email ? 'text-[#FCC201]' : 'text-gray-500'} />
          </label>
          <input
            type="email"
            required
            placeholder="prince@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 w-full bg-[#2D2D2D] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCC201]"
          />
        </div>
        <div>
          <label className="flex items-center justify-between text-white font-['Montserrat']">
            <span className="text-sm font-medium">PHONE NUMBER</span>
            <CheckIcon className={formData.phone ? 'text-[#FCC201]' : 'text-gray-500'} />
          </label>
          <div className="flex mt-1 w-full group">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-full flex items-center bg-[#2D2D2D] text-white rounded-l-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCC201] text-sm md:text-base group-focus-within:ring-2 group-focus-within:ring-[#FCC201]"
                style={{ minWidth: "80px" }}
              >
                <span>{formData.countryCode}</span>
                <ChevronDown className="ml-1 w-4 h-4 text-gray-400" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-64 bg-[#1E1E1E] border border-[#3D3D3D] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <div className="flex items-center bg-[#2D2D2D] rounded-lg p-2 mb-2">
                      <Search className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Search country code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-white w-full focus:outline-none text-sm"
                      />
                    </div>
                    
                    {filteredCountryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => handleSelectCountryCode(country.code)}
                        className="flex items-center w-full px-3 py-2 text-left text-white hover:bg-[#3D3D3D] rounded-lg"
                      >
                        <span className="font-medium">{country.code}</span>
                        <span className="ml-2 text-gray-300">{country.country}</span>
                      </button>
                    ))}
                    
                    {filteredCountryCodes.length === 0 && (
                      <div className="px-3 py-2 text-gray-400 text-center">
                        No matching country codes
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <input
              type="tel"
              required
              ref={phoneInputRef}
              value={formData.phone}
              onChange={handlePhoneChange}
              className="flex-1 w-full bg-[#2D2D2D] text-white rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FCC201]"
              placeholder={getPhonePlaceholder()}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-[#FCC201] text-black font-semibold py-4 rounded-lg transition-colors font-['Montserrat'] glow-effect mt-auto flex items-center justify-center ${
            isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E5AC00]'
          }`}
          disabled={isSending} // Disable button while sending
        >
          {isSending ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            'CONTINUE'
          )}
        </button>
      </form>
      <div className="text-center text-xs text-gray-400 w-full py-7">
        Powered by Kingsmen Technologies
      </div>
    </div>
  );
}

export default ContactForm;