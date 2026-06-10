import { useState } from "react";
import { X, Check, Calendar, Clock, MapPin, User, Sparkles, CreditCard, ShieldCheck } from "lucide-react";
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

    // Build standard Booking Object
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
      status: "upcoming"
    };

    onBookingSuccess(newBooking);
    setStep(6);
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
          <div className="p-6 space-y-5 text-left animate-in fade-in zoom-in-95 duration-200">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-black">Review & Reserve</h4>
            
            <div className="rounded-2xl border border-gray-150 p-4 space-y-3 bg-neutral-50/50">
              
              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-600">Selected service</span>
                  <h5 className="font-sans font-bold text-sm text-gray-900">{selectedService.name}</h5>
                  <p className="text-xs text-gray-400 flex items-center mt-0.5">
                    <Clock className="h-3.5 w-3.5 mr-1" /> {selectedService.duration}
                  </p>
                </div>
                <div className="font-extrabold text-sm text-black">₹{selectedService.price}</div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 font-sans border-b border-gray-100 pb-3">
                <p className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-amber-500 mr-2 shrink-0" />
                  <span className="font-semibold">Date:</span> <span>{selectedDate}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-amber-500 mr-2 shrink-0" />
                  <span className="font-semibold">Time slot:</span> <span>{selectedSlot} (Reserved VIP Segment)</span>
                </p>
                <p className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-amber-500 mr-2 shrink-0" />
                  <span className="font-semibold">Salon:</span> <span>{stylist.salonName}, {stylist.location}</span>
                </p>
              </div>

              {/* Total Due */}
              <div className="flex justify-between items-center font-sans">
                <span className="font-bold text-xs text-gray-900 uppercase tracking-wide">Total Amount Due (At salon)</span>
                <span className="font-mono font-extrabold text-lg text-amber-600">₹{selectedService.price}</span>
              </div>

            </div>

            {/* Credibility disclaimer */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-500/5 p-3 flex items-start">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-600 font-sans leading-relaxed">
                <span className="font-bold text-emerald-800">100% Free Booking Guarantee</span>. No prepayment needed today. You pay directly after your service occurs at {stylist.salonName}.
              </p>
            </div>

            {/* Navigation & Submit */}
            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setStep(4)}
                className="text-xs font-bold text-gray-500 hover:text-black uppercase mr-4"
              >
                ← Back
              </button>

              <button
                onClick={handleConfirmBooking}
                className="rounded-full bg-black hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 transition-all shadow-lg"
                id="booking-confirm-submit-btn"
              >
                Confirm Booking
              </button>
            </div>

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
            <div className="rounded-2xl border border-gray-150 p-4 space-y-2 bg-neutral-50/50 max-w-md mx-auto text-left text-xs text-gray-600 font-sans">
              <p className="border-b border-gray-150 pb-2">
                <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Stylist</span>
                <span className="font-semibold text-gray-800">{stylist.name}</span>
              </p>
              <p className="border-b border-gray-150 pb-2">
                <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Service Ordered</span>
                <span className="font-semibold text-gray-800">{selectedService.name} ({selectedService.duration})</span>
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <p>
                  <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">DateTime</span>
                  <span className="font-semibold text-gray-800">{selectedDate} @ {selectedSlot}</span>
                </p>
                <p>
                  <span className="font-bold text-gray-900 block uppercase tracking-wider text-[9px]">Address</span>
                  <span className="font-semibold text-gray-800">{stylist.salonName}, {stylist.location}</span>
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
