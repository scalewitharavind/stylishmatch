import { useState } from "react";
import { X, Check, Calendar, Clock, MapPin, User, Sparkles, CreditCard, ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";
import { Stylist, Service, Booking } from "../types";

interface BookingFlowProps {
  stylist: Stylist;
  initialService: Service | null;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingFlow({
  stylist,
  initialService,
  onClose,
  onBookingSuccess
}: BookingFlowProps) {
  const [step, setStep] = useState<number>(initialService ? 3 : 2); // default to service choosing if none selected
  const [selectedService, setSelectedService] = useState<Service | null>(initialService);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Email and Payment states
  const [userEmail, setUserEmail] = useState<string>("scalewitharavind@gmail.com");
  const [paymentMethod, setPaymentMethod] = useState<string>("salon"); // "salon" | "upi" | "card"
  const [upiId, setUpiId] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; upi?: string; card?: string }>({});

  // Seed dates (e.g., next 7 days in Bangalore)
  const availableDates = [
    { date: "2026-06-11", dayName: "Thu", dateLabel: "11 Jun" },
    { date: "2026-06-12", dayName: "Fri", dateLabel: "12 Jun" },
    { date: "2026-06-13", dayName: "Sat", dateLabel: "13 Jun" },
    { date: "2026-06-14", dayName: "Sun", dateLabel: "14 Jun" },
    { date: "2026-06-15", dayName: "Mon", dateLabel: "15 Jun" },
    { date: "2026-06-16", dayName: "Tue", dateLabel: "16 Jun" },
    { date: "2026-06-17", dayName: "Wed", dateLabel: "17 Jun" }
  ];

  const availableSlots = stylist.availability.slots;

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep(4);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    setStep(5);
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedDate || !selectedSlot) return;

    // Reset errors
    const newErrors: { email?: string; upi?: string; card?: string } = {};

    // 1. Email validation
    const trimmedEmail = userEmail.trim();
    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address for appointments booking confirmation.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com).";
    }

    // 2. Payment details validation
    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        newErrors.upi = "Please enter your UPI ID.";
      } else if (!upiId.includes("@")) {
        newErrors.upi = "UPI ID format is incorrect. (Should contain @, e.g., username@upi)";
      }
    } else if (paymentMethod === "card") {
      if (!cardName.trim()) {
        newErrors.card = "Please enter cardholder name.";
      } else if (cardNumber.replace(/\s+/g, "").length < 15) {
        newErrors.card = "Please enter a valid credit card number.";
      } else if (!cardExpiry.includes("/")) {
        newErrors.card = "Please specify expiry in MM/YY.";
      } else if (cardCvv.length < 3) {
        newErrors.card = "Please enter 3-digit CVV secondary security key.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsProcessing(true);

    // Simulate luxury booking pipeline lock-in (SSL Handshake, Payment Authorization gateway)
    setTimeout(() => {
      // Determine labeled payment method string
      let displayPayment = "Pay at Salon";
      if (paymentMethod === "upi") {
        displayPayment = `UPI Pay (${upiId.trim()})`;
      } else if (paymentMethod === "card") {
        const lastFour = cardNumber.replace(/\s+/g, "").slice(-4);
        displayPayment = `Credit Card (•••• ${lastFour || "4242"})`;
      }

      // Build standard Booking Object with the new fields
      const newBooking: Booking = {
        id: `bk_${Date.now()}`,
        stylistId: stylist.id,
        stylistName: stylist.name,
        stylistAvatar: stylist.image,
        serviceName: selectedService.name,
        price: selectedService.price,
        date: selectedDate,
        timeSlot: selectedSlot,
        location: stylist.location,
        status: "upcoming",
        userEmail: trimmedEmail,
        paymentMethod: displayPayment
      };

      setIsProcessing(false);
      onBookingSuccess(newBooking);
      setStep(6);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans" id="booking-flow-overlay">
      
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header bar */}
        <div className="bg-neutral-50 px-6 py-5 border-b border-gray-100 flex items-center justify-between text-left">
          <div className="flex items-center space-x-3">
            <img 
              src={stylist.image} 
              alt={stylist.name} 
              className="h-9 w-9 rounded-full object-cover shrink-0" 
            />
            <div>
              <h3 className="font-sans font-bold text-sm text-black">Booking: {stylist.name}</h3>
              <p className="text-[10px] text-gray-400 font-sans uppercase font-bold tracking-wider">{stylist.salonName} • {stylist.location}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-black flex items-center justify-center transition-colors"
            id="close-booking-flow-btn"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Progress indicators */}
        {step < 6 && (
          <div className="bg-white border-b border-gray-50 px-6 py-3 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-gray-400">
            <span className={step >= 2 ? "text-amber-600" : ""}>1. Service</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 3 ? "text-amber-600" : ""}>2. Date</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 4 ? "text-amber-600" : ""}>3. Slot</span>
            <span className="text-gray-300">→</span>
            <span className={step >= 5 ? "text-amber-600" : ""}>4. Review</span>
          </div>
        )}

        {/* STEP 2: CHOOSE SERVICE */}
        {step === 2 && (
          <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto scrollbar-none text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-black mb-1">Select Desired Service</h4>
            <div className="space-y-2.5">
              {stylist.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="w-full text-left rounded-2xl border border-gray-100 hover:border-amber-400 p-4 transition-all hover:bg-neutral-50/50 flex items-center justify-between shadow-sm"
                  id={`booking-choose-service-${service.id}`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-extrabold text-amber-600 tracking-wider">
                      {service.category}
                    </span>
                    <h5 className="font-bold text-sm text-gray-900 leading-snug">{service.name}</h5>
                    <span className="text-[11px] text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {service.duration}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-black">₹{service.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT DATE */}
        {step === 3 && (
          <div className="p-6 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Select Appointment Date</h4>
              {selectedService && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {selectedService.name} (₹{selectedService.price})
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.date;
                return (
                  <button
                    key={item.date}
                    onClick={() => handleDateSelect(item.date)}
                    className={`p-3.5 rounded-xl border text-center font-sans transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-md" 
                        : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
                    }`}
                    id={`booking-choose-date-${item.date}`}
                  >
                    <span className="block text-[10px] uppercase font-bold text-gray-400">{item.dayName}</span>
                    <span className="block text-xs font-black mt-1">{item.dateLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between">
              <button 
                onClick={() => setStep(2)}
                className="text-xs font-bold text-gray-500 hover:text-black uppercase mr-4"
              >
                ← Back to services
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TIME SLOTS */}
        {step === 4 && (
          <div className="p-6 space-y-4 text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Confirm Available Slot</h4>
            
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => handleSlotSelect(slot)}
                    className={`p-3 rounded-xl border text-center font-sans text-xs font-bold transition-all duration-200 ${
                      isSelected 
                        ? "border-black bg-black text-white shadow-md animate-pulse" 
                        : "border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-400"
                    }`}
                    id={`booking-choose-slot-${slot}`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between">
              <button 
                onClick={() => setStep(3)}
                className="text-xs font-bold text-gray-500 hover:text-black uppercase mr-4"
              >
                ← Back to calendar
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW BOOKING AND GUARANTEE */}
        {step === 5 && selectedService && (
          <div className="p-6 space-y-5 text-left max-h-[500px] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
            {isProcessing ? (
              <div className="p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[300px] animate-in fade-in duration-300">
                <div className="w-10 h-10 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
                <div className="space-y-1.5">
                  <h4 className="font-sans font-extrabold text-base text-black flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <Lock className="w-4 h-4 text-[#C5A059]" /> Securing Direct Slot
                  </h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Establishing TLS secure connection. Booking independent artist <span className="font-bold text-black">{stylist.name}</span> for {selectedDate} @ {selectedSlot}...
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Sending reservation ticket to {userEmail}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Review & Payment Settings</h4>
                
                {/* 1. Selected service card summary */}
                <div className="rounded-2xl border border-gray-150 p-4 space-y-3 bg-neutral-50/50">
                  <div className="flex justify-between items-start border-b border-gray-100 pb-2.5">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#C5A059]">Selected service</span>
                      <h5 className="font-sans font-bold text-sm text-gray-950">{selectedService.name}</h5>
                      <p className="text-[11px] text-gray-400 flex items-center mt-0.5">
                        <Clock className="h-3 w-3 mr-1" /> {selectedService.duration}
                      </p>
                    </div>
                    <div className="font-extrabold text-sm text-black">₹{selectedService.price}</div>
                  </div>

                  <div className="space-y-1 text-[11px] text-gray-650 font-sans border-b border-gray-100 pb-2.5">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-3.5 w-3.5 text-[#C5A059] mr-2 shrink-0" />
                      <span className="font-semibold mr-1">Date:</span> <span>{selectedDate}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-3.5 w-3.5 text-[#C5A059] mr-2 shrink-0" />
                      <span className="font-semibold mr-1">Time slot:</span> <span>{selectedSlot}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-3.5 w-3.5 text-[#C5A059] mr-2 shrink-0" />
                      <span className="font-semibold mr-1">Salon Address:</span> <span>{stylist.salonName}, {stylist.location}</span>
                    </div>
                  </div>

                  {/* Pricing and fee summary */}
                  <div className="space-y-1.5 text-xs text-gray-600 border-b border-gray-100 pb-2.5">
                    <div className="flex justify-between">
                      <span>Service Charge</span>
                      <span>₹{selectedService.price}.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Booking Fee / Taxes</span>
                      <span className="font-bold uppercase text-[10px]">Free</span>
                    </div>
                    {paymentMethod === "upi" && (
                      <div className="flex justify-between text-emerald-600">
                        <span>UPI Promo Discount (5% Off)</span>
                        <span>- ₹{Math.round(selectedService.price * 0.05)}.00</span>
                      </div>
                    )}
                  </div>

                  {/* Total Due */}
                  <div className="flex justify-between items-center font-sans pt-1">
                    <span className="font-bold text-xs text-gray-950 uppercase tracking-wide">Total Amount due</span>
                    <span className="font-mono font-extrabold text-base text-[#C5A059]">
                      ₹{paymentMethod === "upi" ? (selectedService.price - Math.round(selectedService.price * 0.05)) : selectedService.price}.00
                    </span>
                  </div>
                </div>

                {/* 2. EMAIL COLLECTION GROUP */}
                <div className="space-y-1.5">
                  <label htmlFor="booking-email-field" className="block text-[10px] uppercase tracking-wider font-extrabold text-black">
                    Receipt Confirmation Email *
                  </label>
                  <div className="relative rounded-xl border border-gray-200 bg-white shadow-sm flex items-center focus-within:border-[#C5A059] focus-within:ring-1 focus-within:ring-[#C5A059]/20 transition-all">
                    <div className="pl-3 py-2.5 text-gray-400 shrink-0">
                      <Mail className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <input
                      id="booking-email-field"
                      type="email"
                      placeholder="Enter confirmation email (e.g. user@example.com)"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      className="w-full px-3 py-2.5 text-xs text-black border-0 focus:outline-0 bg-transparent"
                    />
                  </div>
                  {errors.email && (
                    <div className="text-[10px] text-red-500 font-bold flex items-center gap-1 animate-in fade-in">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* 3. PAYMENT CHANNEL SELECTION */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-black">
                    Select Booking Payment Option
                  </label>

                  {/* Payment Grid Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("salon");
                        setErrors(prev => ({ ...prev, card: undefined, upi: undefined }));
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === "salon"
                          ? "border-[#C5A059] bg-[#C5A059]/5 text-black shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      }`}
                    >
                      <User className="w-4.5 h-4.5 mx-auto mb-1 text-[#C5A059]" />
                      <span className="block text-[10px] font-extrabold uppercase">Pay at Salon</span>
                      <span className="block text-[8px] text-gray-400 font-medium">No Prepay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("upi");
                        setErrors(prev => ({ ...prev, card: undefined, upi: undefined }));
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === "upi"
                          ? "border-[#C5A059] bg-[#C5A059]/5 text-black shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      }`}
                    >
                      <Check className="w-4.5 h-4.5 mx-auto mb-1 text-emerald-500" />
                      <span className="block text-[10px] font-extrabold uppercase">UPI Instant</span>
                      <span className="block text-[8px] text-emerald-600 font-bold">5% OFF Promo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("card");
                        setErrors(prev => ({ ...prev, card: undefined, upi: undefined }));
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === "card"
                          ? "border-[#C5A059] bg-[#C5A059]/5 text-black shadow-sm"
                          : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                      }`}
                    >
                      <CreditCard className="w-4.5 h-4.5 mx-auto mb-1 text-[#C5A059]" />
                      <span className="block text-[10px] font-extrabold uppercase">Credit Card</span>
                      <span className="block text-[8px] text-gray-400 font-medium">Secured SSL</span>
                    </button>
                  </div>

                  {/* Inline subform fields based on selection */}
                  {paymentMethod === "upi" && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/20 border border-emerald-500/15 space-y-2 animate-in slide-in-from-top-2 duration-200">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[8px] uppercase font-bold tracking-wider">
                        ₹{Math.round(selectedService.price * 0.05)} UPI Promo Applied!
                      </span>
                      <div className="space-y-1">
                        <label htmlFor="upi-vpa-handle" className="block text-[9px] font-extrabold text-gray-500 uppercase">Your UPI Virtual Address ID</label>
                        <input
                          id="upi-vpa-handle"
                          type="text"
                          placeholder="scalewitharavind@okaxis"
                          value={upiId}
                          onChange={(e) => {
                            setUpiId(e.target.value);
                            if (errors.upi) setErrors(prev => ({ ...prev, upi: undefined }));
                          }}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white focus:border-[#C5A059]"
                        />
                      </div>
                      <p className="text-[9px] text-gray-500 leading-normal">
                        Note: You will receive an immediate reservation request notifications in your UPI apps (GPay, PhonePe, Bhim, etc.) to securely block the funds at the discounted price.
                      </p>
                      {errors.upi && (
                        <div className="text-[10px] text-red-500 font-bold flex items-center gap-1 animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.upi}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="p-3.5 rounded-xl bg-neutral-50 border border-gray-150 space-y-3 animate-in slide-in-from-top-2 duration-200">
                      <div className="space-y-1">
                        <label htmlFor="credit-card-fullname" className="block text-[9px] font-bold text-gray-500 uppercase">Cardholder Name</label>
                        <input
                          id="credit-card-fullname"
                          type="text"
                          placeholder="ARAVIND S"
                          value={cardName}
                          onChange={(e) => {
                            setCardName(e.target.value.toUpperCase());
                            if (errors.card) setErrors(prev => ({ ...prev, card: undefined }));
                          }}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white focus:border-[#C5A059]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="credit-card-number-field" className="block text-[9px] font-bold text-gray-500 uppercase">Card Number</label>
                        <div className="relative flex items-center">
                          <input
                            id="credit-card-number-field"
                            type="text"
                            maxLength={19}
                            placeholder="4111 2345 6789 1234"
                            value={cardNumber}
                            onChange={(e) => {
                              // Automatically insert spacing to make it look highly stylized
                              const value = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                              setCardNumber(value);
                              if (errors.card) setErrors(prev => ({ ...prev, card: undefined }));
                            }}
                            className="w-full pl-3 pr-10 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white focus:border-[#C5A059]"
                          />
                          <div className="absolute right-3 text-gray-400">
                            <CreditCard className="w-4 h-4 text-neutral-400" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label htmlFor="credit-card-expiry-field" className="block text-[9px] font-bold text-gray-500 uppercase">Expiry (MM/YY)</label>
                          <input
                            id="credit-card-expiry-field"
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, "");
                              if (val.length > 2) {
                                val = val.slice(0, 2) + "/" + val.slice(2, 4);
                              }
                              setCardExpiry(val);
                              if (errors.card) setErrors(prev => ({ ...prev, card: undefined }));
                            }}
                            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white focus:border-[#C5A059]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="credit-card-cvv-field" className="block text-[9px] font-bold text-gray-500 uppercase">CVV Code</label>
                          <input
                            id="credit-card-cvv-field"
                            type="password"
                            maxLength={3}
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => {
                              setCardCvv(e.target.value.replace(/\D/g, ""));
                              if (errors.card) setErrors(prev => ({ ...prev, card: undefined }));
                            }}
                            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-0 bg-white focus:border-[#C5A059]"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center text-[10px] text-gray-500 gap-1 pt-1">
                        <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Secure SSL Bank Tokenization. Your CVV starts as fully hashed.</span>
                      </div>

                      {errors.card && (
                        <div className="text-[10px] text-red-500 font-bold flex items-center gap-1 animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.card}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "salon" && (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-500/5 p-3 flex items-start">
                      <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-650 font-sans leading-relaxed">
                        <span className="font-bold text-emerald-800">100% Free Booking Guarantee</span>. No prepayments are made now on StylistMatch AI. You can pay with credit/debit/UPI on site at {stylist.salonName} after the service occurs.
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation & Submit */}
                <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 mr-1.5">
                  <button 
                    type="button"
                    onClick={() => setStep(4)}
                    className="text-xs font-bold text-gray-500 hover:text-black uppercase mr-4"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="rounded-xl bg-black hover:bg-[#C5A059] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 transition-all shadow-md active:scale-95 duration-150"
                    id="booking-confirm-submit-btn"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 6: CONFIRMATION DETAILS */}
        {step === 6 && selectedService && (
          <div className="p-8 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            <div className="mx-auto h-16 w-16 bg-neutral-950 border-2 border-amber-400 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
              <Check className="h-8 w-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-800 uppercase tracking-widest font-sans">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Booking Locked-In!
              </div>
              <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-black">Aesthetic Slot Reserved!</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Congratulations. Your private booking has been successfully locked into {stylist.name}'s schedule at {stylist.salonName}.
              </p>
            </div>

            {/* Details Card */}
            <div className="rounded-2xl border border-gray-150 p-4 space-y-2 bg-neutral-50/50 max-w-md mx-auto text-left text-xs text-gray-650 font-sans">
              <p className="border-b border-gray-150 pb-2">
                <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Stylist</span>
                <span className="font-semibold text-gray-800">{stylist.name}</span>
              </p>
              <p className="border-b border-gray-150 pb-2">
                <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Service Ordered</span>
                <span className="font-semibold text-gray-800">{selectedService.name} ({selectedService.duration})</span>
              </p>
              <div className="grid grid-cols-2 gap-2 border-b border-gray-150 pb-2">
                <p>
                  <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">DateTime</span>
                  <span className="font-semibold text-gray-800">{selectedDate} @ {selectedSlot}</span>
                </p>
                <p>
                  <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Address</span>
                  <span className="font-semibold text-gray-800">{stylist.salonName}, {stylist.location}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <p>
                  <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Booking Receipt Sent To</span>
                  <span className="font-semibold text-gray-850 truncate block">{userEmail}</span>
                </p>
                <p>
                  <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Payment Method</span>
                  <span className="font-semibold text-[#C5A059] flex items-center gap-1.5 font-medium leading-tight">
                    <Lock className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                    <span>{paymentMethod === "salon" ? "On-site Desk" : paymentMethod === "upi" ? "UPI Linked" : "Credit Card Secured"}</span>
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-sm rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider py-4 transition-all"
              id="booking-finalize-dismiss"
            >
              Go to Dashboard
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
