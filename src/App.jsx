import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Utensils,
  Wifi,
  Truck,
  Flame,
  Heart,
  TreePine,
  Star,
  ChevronDown,
  Send,
  Users,
  Camera,
  ShoppingBag,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Loader2,
  Download
} from 'lucide-react';

/* ─── Supabase Client ─── */
const supabase = createClient(
  'https://tujyafqceszycuzyegyp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1anlhZnFjZXN6eWN1enllZ3lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNDY2MTcsImV4cCI6MjA5MDYyMjYxN30.7KMsId2iY42vk-_4ZzrpSplMopTFnMAL-40giFLpn_k'
);

/* ─── Reusable Components ─── */
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Order Online Button with Popup ─── */
const OrderOnlineButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const platforms = [
    {
      name: 'Wolt',
      icon: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/400x400bb-75%20(2)%20(1).webp',
      url: 'https://wolt.com/sk/svk/zvolen/restaurant/koliba-straze-nad-zvolenom',
    },
    {
      name: 'Bolt Food',
      icon: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/400x400bb-75%20(4).jpg',
      url: 'https://food.bolt.eu/en/1188-zvolen/p/108984-koliba-straze-nad-zvolenom/',
    },
    {
      name: 'Bistro',
      icon: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/400x400bb-75%20(3).webp',
      url: 'https://www.bistro.sk/restauracia/koliba-straze',
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-3.5 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-medium text-white bg-brand-500 hover:bg-brand-400 rounded-full transition-all shadow-lg shadow-brand-900/40 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
        Objednať online
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 z-50 w-56 sm:w-72"
            >
              <div className="bg-brand-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 border border-brand-700/50 p-4">
                <p className="text-brand-400 text-xs font-semibold uppercase tracking-[0.15em] text-center mb-3">
                  Objednať cez
                </p>
                <div className="space-y-2">
                  {platforms.map((platform, i) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.2 }}
                      className="group flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
                    >
                      <div className="h-9 w-9 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                        <img src={platform.icon} alt={platform.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <span className="text-white text-sm font-semibold block leading-tight">{platform.name}</span>
                        <span className="text-brand-300 text-xs">Objednať jedlo</span>
                      </div>
                      <svg className="w-4 h-4 text-brand-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
              {/* Arrow */}
              <div className="flex justify-center -mt-px">
                <div className="w-4 h-4 bg-brand-900/95 border-r border-b border-brand-700/50 rotate-45 -translate-y-2" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md"
      >
        <span className="font-medium text-base sm:text-lg text-brand-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-600 flex-shrink-0 ml-4"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Scroll Helper ─── */
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* ─── Reservation Data ─── */
const SK_DAYS = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];
const SK_MONTHS = [
  'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún',
  'Júl', 'August', 'September', 'Október', 'November', 'December',
];
const TIME_SLOTS = [
  '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00',
];

const getDaysGrid = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
};

const formatDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const isSameDay = (a, b) => a && b && formatDate(a) === formatDate(b);

const isPast = (day, month, year) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
};

/* ─── Menu Modal ─── */
const MENU_PDF_URL = 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/jedalny%20listok%202.pdf';

const MENU_SECTIONS = [
  { label: 'Denná ponuka', page: 1, icon: '🍲' },
  { label: 'Jedlá na objednávku', page: 4, icon: '🥩' },
  { label: 'Špeciality & Dezerty', page: 5, icon: '⭐' },
  { label: 'Prílohy & Predjedlá', page: 6, icon: '🥗' },
  { label: 'Nápoje', page: 8, icon: '🍺' },
  { label: 'Alergény', page: 10, icon: '📋' },
];

const MenuModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = React.useRef(null);
  const canvasContainerRef = React.useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveSection(0);
    } else {
      document.body.style.overflow = '';
      setPdfDoc(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isMobile) return;
    let cancelled = false;
    import('pdfjs-dist').then(async (pdfjsLib) => {
      const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
      return pdfjsLib.getDocument(MENU_PDF_URL).promise;
    }).then((doc) => {
      if (!cancelled) setPdfDoc(doc);
    });
    return () => { cancelled = true; };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (!pdfDoc || !isMobile || !canvasContainerRef.current) return;
    const container = canvasContainerRef.current;
    container.innerHTML = '';

    const startPage = MENU_SECTIONS[activeSection].page;
    const endPage = activeSection < MENU_SECTIONS.length - 1
      ? MENU_SECTIONS[activeSection + 1].page - 1
      : pdfDoc.numPages;

    let cancelled = false;
    (async () => {
      for (let i = startPage; i <= endPage; i++) {
        if (cancelled) return;
        const page = await pdfDoc.getPage(i);
        const dpr = window.devicePixelRatio || 1;
        const scale = (container.clientWidth / page.getViewport({ scale: 1 }).width) * dpr;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = '100%';
        canvas.style.display = 'block';
        container.appendChild(canvas);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      }
    })();
    container.scrollTop = 0;
    return () => { cancelled = true; };
  }, [pdfDoc, activeSection, isMobile]);

  const goToPage = (index) => {
    setActiveSection(index);
    setIframeKey((k) => k + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-brand-50 rounded-t-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl h-[96vh] sm:h-auto sm:max-h-[92vh] flex flex-col border border-brand-200 overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-brand-800 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Utensils size={18} className="text-brand-400 sm:w-5 sm:h-5" />
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-serif">Jedálny lístok</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={MENU_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-200 hover:text-white hover:bg-brand-700 rounded-full transition-colors"
                  >
                    <Download size={15} />
                    Stiahnuť
                  </a>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-brand-700 transition-colors text-brand-300 hover:text-white"
                    aria-label="Zavrieť"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>

              {/* Section tabs */}
              <div className="bg-brand-800/95 border-t border-brand-700/50 px-2 sm:px-5 py-1.5 sm:py-2.5 overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex gap-1 sm:gap-2 min-w-max">
                  {MENU_SECTIONS.map((section, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                        activeSection === i
                          ? 'bg-brand-500 text-white shadow-lg shadow-brand-900/30'
                          : 'text-brand-300 hover:text-white hover:bg-brand-700/60'
                      }`}
                    >
                      <span className="text-sm sm:text-base">{section.icon}</span>
                      <span className="hidden sm:inline">{section.label}</span>
                      <span className="sm:hidden">{section.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PDF viewer */}
              <div className="flex-1 min-h-0 bg-gray-100">
                {/* Desktop: iframe with page navigation */}
                <iframe
                  key={iframeKey}
                  ref={iframeRef}
                  src={`${MENU_PDF_URL}?v=${iframeKey}#page=${MENU_SECTIONS[activeSection].page}&toolbar=0&navpanes=0&scrollbar=0&statusbar=0`}
                  className="hidden sm:block w-full h-[72vh]"
                  title="Jedálny lístok Koliba Stráže"
                />
                {/* Mobile: PDF.js canvas rendering */}
                <div
                  ref={canvasContainerRef}
                  className="sm:hidden w-full h-full overflow-y-auto"
                />
              </div>

              {/* Footer — mobile download */}
              <div className="sm:hidden bg-brand-800 px-3 py-2.5 flex justify-center">
                <a
                  href={MENU_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-full text-xs font-medium hover:bg-brand-400 transition-colors"
                >
                  <Download size={14} />
                  Stiahnuť jedálny lístok
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── Reservation Modal ─── */
const ReservationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [personCount, setPersonCount] = useState(2);
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }
    const dateStr = formatDate(selectedDate);
    supabase
      .from('reservations')
      .select('reservation_time')
      .eq('reservation_date', dateStr)
      .then(({ data }) => {
        setBookedSlots(data ? data.map((r) => r.reservation_time) : []);
      });
  }, [selectedDate]);

  const reset = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setPersonCount(2);
    setForm({ name: '', phone: '', email: '', note: '' });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const today = new Date();
  const canGoPrev = currentMonth.year > today.getFullYear() ||
    (currentMonth.year === today.getFullYear() && currentMonth.month > today.getMonth());

  const cells = getDaysGrid(currentMonth.year, currentMonth.month);

  const validateStep1 = () => {
    if (!selectedDate || !selectedTime) return false;
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Zadajte meno';
    if (!/\d{9,}/.test(form.phone.replace(/\s+/g, ''))) newErrors.phone = 'Zadajte platné číslo';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Zadajte platný e-mail';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    try {
      await emailjs.send('service_2q5rpb9', 'template_94gmcgs', {
        name: form.name,
        phone: form.phone,
        email: form.email,
        note: form.note || 'Žiadna poznámka',
        date: selectedDate ? `${selectedDate.getDate()}. ${SK_MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}` : '',
        time: selectedTime,
        guests: personCount,
      }, 'pADG4TpypCL2zqNdn');

      await supabase.from('reservations').insert({
        reservation_date: formatDate(selectedDate),
        reservation_time: selectedTime,
        guest_name: form.name,
        guest_email: form.email,
        guest_phone: form.phone,
        guest_count: personCount,
      });

      setStep(3);
    } catch {
      alert('Nepodarilo sa odoslať rezerváciu. Skúste to prosím znova alebo nás kontaktujte telefonicky.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-xl border ${errors[field] ? 'border-red-400 ring-2 ring-red-100' : 'border-brand-200'} bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-base`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-brand-100"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-brand-100 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-900 font-serif">Rezervácia stola</h3>
                    {step < 3 && (
                      <p className="text-sm text-brand-500 mt-0.5">Krok {step} z 2</p>
                    )}
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-brand-100 transition-colors text-brand-700"
                    aria-label="Zavrieť"
                  >
                    <X size={22} />
                  </button>
                </div>
                {step < 3 && (
                  <div className="flex gap-1.5 mt-4">
                    <div className={`h-1 rounded-full flex-1 transition-colors duration-300 ${step >= 1 ? 'bg-brand-500' : 'bg-brand-100'}`} />
                    <div className={`h-1 rounded-full flex-1 transition-colors duration-300 ${step >= 2 ? 'bg-brand-500' : 'bg-brand-100'}`} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* ─── STEP 1: Date, Time, Persons ─── */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Calendar */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <CalendarDays size={18} className="text-brand-600" />
                          <span className="text-sm font-semibold text-brand-800 uppercase tracking-wider">Dátum</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <button
                            onClick={() => {
                              const prev = currentMonth.month === 0
                                ? { year: currentMonth.year - 1, month: 11 }
                                : { year: currentMonth.year, month: currentMonth.month - 1 };
                              setCurrentMonth(prev);
                            }}
                            disabled={!canGoPrev}
                            className="p-2 rounded-full hover:bg-brand-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft size={20} className="text-brand-700" />
                          </button>
                          <span className="text-base font-bold text-brand-900">
                            {SK_MONTHS[currentMonth.month]} {currentMonth.year}
                          </span>
                          <button
                            onClick={() => {
                              const next = currentMonth.month === 11
                                ? { year: currentMonth.year + 1, month: 0 }
                                : { year: currentMonth.year, month: currentMonth.month + 1 };
                              setCurrentMonth(next);
                            }}
                            className="p-2 rounded-full hover:bg-brand-100 transition-colors"
                          >
                            <ChevronRight size={20} className="text-brand-700" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-1">
                          {SK_DAYS.map((d) => (
                            <div key={d} className="text-center text-xs font-semibold text-brand-500 py-1">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {cells.map((day, i) => {
                            if (day === null) return <div key={`e-${i}`} />;
                            const date = new Date(currentMonth.year, currentMonth.month, day);
                            const past = isPast(day, currentMonth.month, currentMonth.year);
                            const selected = selectedDate && isSameDay(date, selectedDate);
                            const isToday = isSameDay(date, today);
                            return (
                              <button
                                key={day}
                                disabled={past}
                                onClick={() => {
                                  setSelectedDate(date);
                                  setSelectedTime(null);
                                }}
                                className={`h-10 w-full rounded-lg text-sm font-medium transition-all duration-150
                                  ${past ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-brand-100'}
                                  ${selected ? 'bg-brand-500 text-white hover:bg-brand-500 shadow-md' : ''}
                                  ${isToday && !selected ? 'ring-2 ring-brand-400 text-brand-700 font-bold' : ''}
                                  ${!selected && !past && !isToday ? 'text-brand-800' : ''}
                                `}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Clock size={18} className="text-brand-600" />
                          <span className="text-sm font-semibold text-brand-800 uppercase tracking-wider">Čas</span>
                        </div>
                        {selectedDate ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {TIME_SLOTS.map((time) => {
                              const booked = bookedSlots.includes(time);
                              return (
                              <button
                                key={time}
                                disabled={booked}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-150
                                  ${booked
                                    ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed line-through'
                                    : selectedTime === time
                                      ? 'bg-brand-500 text-white shadow-md'
                                      : 'bg-brand-50 border border-brand-200 text-brand-700 hover:bg-brand-100 hover:border-brand-300'
                                  }`}
                              >
                                {booked ? `${time} – Obsadené` : time}
                              </button>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic text-center py-4 bg-brand-50 rounded-xl">
                            Najskôr vyberte dátum
                          </p>
                        )}
                      </div>

                      {/* Person Count */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Users size={18} className="text-brand-600" />
                          <span className="text-sm font-semibold text-brand-800 uppercase tracking-wider">Počet osôb</span>
                        </div>
                        <div className="flex items-center justify-center gap-6 py-3 bg-brand-50 rounded-xl">
                          <button
                            onClick={() => setPersonCount(Math.max(1, personCount - 1))}
                            className="h-12 w-12 rounded-full bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 hover:border-brand-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="text-3xl font-bold text-brand-900 w-12 text-center tabular-nums">{personCount}</span>
                          <button
                            onClick={() => setPersonCount(Math.min(20, personCount + 1))}
                            className="h-12 w-12 rounded-full bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 hover:border-brand-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Next */}
                      <button
                        onClick={() => validateStep1() && setStep(2)}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand-600 active:scale-[0.98]"
                      >
                        Pokračovať
                      </button>
                    </motion.div>
                  )}

                  {/* ─── STEP 2: Contact Info ─── */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      {/* Summary bar */}
                      <div className="flex items-center flex-wrap gap-2 sm:gap-3 p-3 mb-6 bg-brand-50 rounded-xl text-xs sm:text-sm">
                        <CalendarDays size={16} className="text-brand-500" />
                        <span className="font-medium text-brand-800">
                          {selectedDate && `${selectedDate.getDate()}. ${SK_MONTHS[selectedDate.getMonth()]}`}
                        </span>
                        <span className="text-brand-400">|</span>
                        <Clock size={16} className="text-brand-500" />
                        <span className="font-medium text-brand-800">{selectedTime}</span>
                        <span className="text-brand-400">|</span>
                        <Users size={16} className="text-brand-500" />
                        <span className="font-medium text-brand-800">{personCount} {personCount === 1 ? 'osoba' : personCount < 5 ? 'osoby' : 'osôb'}</span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-brand-800 mb-2">
                            Meno a priezvisko <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputClass('name')}
                            placeholder="Ján Novák"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-brand-800 mb-2">
                            Telefón <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className={inputClass('phone')}
                            placeholder="+421 9XX XXX XXX"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-brand-800 mb-2">
                            E-mail <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={inputClass('email')}
                            placeholder="jan@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-brand-800 mb-2">
                            Poznámka <span className="text-gray-400 font-normal">(voliteľné)</span>
                          </label>
                          <textarea
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                            rows="3"
                            className={`${inputClass('note')} resize-none`}
                            placeholder="Špeciálne požiadavky, alergény, detská stolička..."
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => { setErrors({}); setStep(1); }}
                          className="flex-1 py-4 rounded-xl bg-brand-100 hover:bg-brand-200 text-brand-800 font-semibold text-base transition-all active:scale-[0.98]"
                        >
                          Späť
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex-[2] py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg disabled:opacity-70 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={20} className="animate-spin" />
                              Odosielam...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Odoslať rezerváciu
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── STEP 3: Success ─── */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="text-center py-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, duration: 0.4, type: 'spring', stiffness: 200 }}
                        className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-100 flex items-center justify-center"
                      >
                        <Check size={40} className="text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-brand-900 font-serif mb-2">
                        Rezervácia odoslaná!
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Budeme vás kontaktovať pre potvrdenie.
                      </p>
                      <div className="bg-brand-50 rounded-xl p-4 mb-8 text-left space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Dátum</span>
                          <span className="font-medium text-brand-900">
                            {selectedDate && `${selectedDate.getDate()}. ${SK_MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Čas</span>
                          <span className="font-medium text-brand-900">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Počet osôb</span>
                          <span className="font-medium text-brand-900">{personCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Meno</span>
                          <span className="font-medium text-brand-900">{form.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                      >
                        Zavrieť
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─── Main App ─── */
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [cookieConsent, setCookieConsent] = useState(() => localStorage.getItem('cookieConsent'));

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setCookieConsent('accepted');
  };
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setCookieConsent('declined');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'O nás', id: 'o-nas' },
    { label: 'Jedálny lístok', id: 'jedalny-listok' },
    { label: 'Galéria', id: 'galeria' },
    { label: 'Rezervácia', id: 'rezervacia' },
    { label: 'Kontakt', id: 'kontakt' },
  ];

  const handleNav = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => scrollTo(id), 350);
  };

  return (
    <div className="min-h-screen bg-brand-50 text-gray-800 font-sans selection:bg-brand-200 selection:text-brand-900 overflow-x-hidden">

      {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
      <nav className="fixed w-full z-50 px-4 transition-all duration-300" style={{ paddingTop: scrolled ? '12px' : '0' }}>
        <div className={`transition-all duration-300 max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between ${scrolled ? 'bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full shadow-lg' : ''}`}>
          {/* Logo */}
          <button onClick={() => scrollTo('domov')} className="cursor-pointer group">
            <div className="relative h-14 sm:h-16 lg:h-20">
              <img
                src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20212220-Photoroom.webp"
                alt="Hostinec Stráže"
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20211308%20(2).webp"
                alt="Hostinec Stráže"
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain absolute top-0 left-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`transition-colors text-base font-medium tracking-wide cursor-pointer ${scrolled ? 'text-gray-600 hover:text-brand-900' : 'text-brand-200 hover:text-white'}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+421918909302"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-500 hover:bg-brand-400 rounded-full transition-all shadow-md shadow-brand-900/30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Phone size={15} />
              +421 918 909 302
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden transition-colors p-2 ${scrolled ? 'text-gray-700 hover:text-brand-900' : 'text-brand-200 hover:text-white'}`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu — Full Screen Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden fixed inset-0 z-[80] bg-brand-900/80 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <button onClick={() => { setMobileMenuOpen(false); scrollTo('domov'); }} className="cursor-pointer">
                  <img
                    src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20212220-Photoroom.webp"
                    alt="Hostinec Stráže"
                    className="h-12 w-auto object-contain"
                  />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white/80 hover:text-white transition-colors"
                  aria-label="Zavrieť"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col px-8 pt-8 gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    onClick={() => handleNav(link.id)}
                    className="text-white text-xl font-bold uppercase tracking-widest text-left py-4 border-b border-white/10 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="absolute bottom-10 left-0 right-0 px-8"
              >
                <a
                  href="tel:+421918909302"
                  className="flex items-center justify-center gap-2 w-full py-4 text-base font-semibold text-brand-900 bg-white hover:bg-brand-100 rounded-full transition-all shadow-lg"
                >
                  <Phone size={18} />
                  +421 918 909 302
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section id="domov" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/d.webp"
            />
            <img
              src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Gemini_Generated_Image_slj087slj087slj0ee.webp"
              alt="Interiér Koliby Pacho"
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/60 to-brand-900/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white pt-16 sm:pt-20">
          <FadeIn>
            <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm font-semibold mb-6 sm:mb-6 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              <span className="inline-block border-b-2 border-brand-400 pb-1">To najlepšie zo slovenskej kuchyne</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-8 sm:mb-8 font-serif">
              Chuť tradície,
              <br />
              <span className="text-brand-400 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]">ktorú si zamilujete</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-brand-200 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
              V našej kolibe varíme stále rovnako poctivo a s úctou k tradícii. Ponúkame vám to najlepšie zo slovenskej kuchyne.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-row flex-wrap gap-2 sm:gap-4 justify-center items-start">
              <div className="flex flex-col items-center gap-3">
                <OrderOnlineButton />
                <div className="flex flex-row gap-2 sm:gap-3">
                  <a
                    href="https://wolt.com/sk/svk/zvolen/restaurant/koliba-straze-nad-zvolenom"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Objednať cez Wolt"
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden shadow-lg hover:scale-110 transition-transform"
                  >
                    <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/400x400bb-75%20(2)%20(1).webp" alt="Wolt" className="w-full h-full object-cover" />
                  </a>
                  <a
                    href="https://food.bolt.eu/en/1188-zvolen/p/108984-koliba-straze-nad-zvolenom/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Objednať cez Bolt Food"
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden shadow-lg hover:scale-110 transition-transform"
                  >
                    <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/400x400bb-75%20(4).jpg" alt="Bolt Food" className="w-full h-full object-cover" />
                  </a>
                  <a
                    href="https://www.bistro.sk/restauracia/koliba-straze"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Objednať cez Bistro"
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden shadow-lg hover:scale-110 transition-transform"
                  >
                    <img src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/400x400bb-75%20(3).webp" alt="Bistro" className="w-full h-full object-cover" />
                  </a>
                </div>
              </div>
              <button
                onClick={() => scrollTo('jedalny-listok')}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 sm:px-6 md:px-8 py-3.5 sm:py-3.5 md:py-4 text-sm sm:text-base md:text-lg font-medium text-white bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 rounded-full transition-all hover:-translate-y-1"
              >
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                Pozrieť menu
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ═══════════════════════ ABOUT ═══════════════════════ */}
      <section id="o-nas" className="py-16 sm:py-24 lg:py-32 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-brand-200">
                <img
                  src="https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Koliba%20Straze.webp"
                  alt="Koliba Stráže"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame offset */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-full h-full rounded-3xl border-2 border-brand-300/40 -z-10" />
            </div>
          </FadeIn>

          {/* Text */}
          <div>
            <FadeIn>
              <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">O nás</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-6 font-serif leading-tight">
                Vitajte v Kolibe Stráže
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                Koliba Stráže je miestom, kde sa stretáva tradícia s pohostinnosťou. Naša útulná koliba
                vo Zvolene ponúka autentický zážitok slovenskej kuchyne v teplom a príjemnom prostredí.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Od prvého dňa sa držíme overených receptov našich predkov. Každé jedlo pripravujeme
                s láskou a z kvalitných surovín, aby ste u nás pocítili skutočnú chuť Slovenska.
                Či už prídete na obed, večeru alebo rodinnú oslavu — v našej kolibe sa budete cítiť ako doma.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { icon: TreePine, label: 'Tradícia od otvorenia' },
                  { icon: Utensils, label: 'Autentické recepty' },
                  { icon: Users, label: 'Rodinná atmosféra' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-brand-800">{item.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section id="sluzby" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <FadeIn>
              <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">Naše služby</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 font-serif mb-6">
                Čo vás u nás čaká
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Prinášame vám to najlepšie zo slovenskej gastronómie v príjemnom prostredí drevenej koliby.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                icon: Utensils,
                title: 'Tradičná kuchyňa',
                desc: 'Halušky, bryndzové pirohy, pečené mäso a ďalšie klasiky slovenskej kuchyne pripravené podľa tradičných receptov.',
              },
              {
                icon: Flame,
                title: 'Útulný interiér',
                desc: 'Drevená koliba s teplou atmosférou, kde sa budete cítiť ako doma. Ideálne na rodinné stretnutia aj oslavy.',
              },
              {
                icon: Truck,
                title: 'Rozvoz jedál',
                desc: 'Objednajte si naše jedlá až k vám domov. Rozvoz menu priamo k vašim dverám.',
              },
              {
                icon: Wifi,
                title: 'Wi-Fi zadarmo',
                desc: 'Pripojte sa k našej bezplatnej Wi-Fi sieti a užívajte si jedlo aj online.',
              },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="p-4 sm:p-5 md:p-8 rounded-2xl sm:rounded-3xl bg-brand-50 border border-brand-100 transition-all duration-300 hover:shadow-xl hover:shadow-brand-200/50 hover:-translate-y-1 h-full">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl bg-brand-600 text-white flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-brand-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ MENU PREVIEW ═══════════════════════ */}
      <section id="jedalny-listok" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/food.webp" alt="" className="w-full h-full object-cover" aria-hidden="true" loading="lazy" />
          <div className="absolute inset-0 bg-brand-900/88" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <FadeIn>
              <p className="text-brand-400 uppercase tracking-[0.2em] text-sm font-semibold mb-4">Jedálny lístok</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif mb-6">
                Naše špeciality
              </h2>
              <p className="text-base sm:text-lg text-brand-200">
                Ochutnajte to najlepšie z tradičnej slovenskej kuchyne. Každé jedlo pripravujeme s láskou a čerstvých surovín.
              </p>
            </FadeIn>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 md:gap-8 mb-10 sm:mb-12">
            {[
              {
                name: 'Bryndzové halušky',
                desc: 'Domáce halušky s pravou ovčou bryndzou, chrumkavou slaninou a voliteľne s oštiepkom či klobásou.',
                price: 'od 9,50 €',
                rating: 5,
              },
              {
                name: 'Špecialita "Stráže"',
                desc: 'Bravčová panenka s oravskou slaninou, kuracími prsiami a syrom. Náš firemný recept, ktorý musíte ochutnať.',
                price: '15,50 €',
                rating: 5,
              },
              {
                name: 'Jelenie medailónky',
                desc: 'Šťavnaté jelenie medailónky podávané v chrumkavej zemiakovej placke. Delikátna divina z našich lesov.',
                price: '15,50 €',
                rating: 5,
              },
            ].map((dish, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {Array.from({ length: dish.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-brand-400 fill-brand-400 sm:w-4 sm:h-4" />
                    ))}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-serif mb-2 sm:mb-3">{dish.name}</h3>
                  <p className="text-sm sm:text-base text-brand-200 leading-relaxed mb-4 sm:mb-6 flex-1">{dish.desc}</p>
                  <p className="text-brand-400 font-bold text-base sm:text-lg">{dish.price}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <button
                onClick={() => setMenuOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-brand-900 bg-brand-100 hover:bg-white rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 duration-300"
              >
                <Utensils size={20} />
                Kompletný jedálny lístok
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ GALLERY ═══════════════════════ */}
      <section id="galeria" className="py-16 sm:py-24 lg:py-32 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <FadeIn>
              <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">Galéria</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 font-serif mb-6">
                Nahliadnite k nám
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Pozrite si atmosféru našej koliby, interiér a naše jedlá.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {[
              { src: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20175118.webp', alt: 'Interiér koliby', enhance: true },
              { src: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/IMG_4128.webp', alt: 'Koliba Stráže' },
              { streetView: true, alt: '360° Virtuálna prehliadka' },
              { src: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/koliba-interier-slide.webp', alt: 'Interiér koliby', mobileOnly: true },
              { src: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20173439.webp', alt: 'Exteriér koliby' },
              { src: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20173411.webp', alt: 'Terasa' },
              { src: 'https://ridbtuorcmkjidenxudx.supabase.co/storage/v1/object/public/Koliba%20Straze/Screenshot%202026-03-29%20172812.webp', alt: 'Detaily interiéru' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08} className={item.streetView ? 'hidden md:block' : item.mobileOnly ? 'md:hidden' : ''}>
                <div
                  className={`rounded-2xl overflow-hidden aspect-[4/3] bg-brand-200 relative ${item.streetView ? '' : 'group cursor-pointer'}`}
                  onClick={() => item.src && setLightboxImg(item)}
                >
                  {item.streetView ? (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1sCIHM0ogKEICAgIDe882RmQE!2m2!1d48.5864204!2d19.0906613!3f90!4f0!5f0.4000000059604645"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="360° Virtuálna prehliadka Koliba Stráže"
                    />
                  ) : item.src ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.enhance ? 'contrast-[1.15] saturate-[1.2] brightness-[0.92]' : ''}`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-brand-400 bg-gradient-to-br from-brand-200 to-brand-300/60">
                      <Camera size={32} className="mb-2 opacity-60" />
                      <span className="text-sm font-medium opacity-60">{item.alt}</span>
                    </div>
                  )}
                  {!item.streetView && (
                    <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition-colors duration-300 rounded-2xl" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Mobile 360° Street View */}
          <FadeIn className="md:hidden mt-6">
            <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4 text-center">
              360° Virtuálna prehliadka
            </p>
            <div className="rounded-2xl overflow-hidden bg-brand-200 relative h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1!6m8!1m7!1sCIHM0ogKEICAgIDe882RmQE!2m2!1d48.5864204!2d19.0906613!3f90!4f0!5f0.4000000059604645"
                className="absolute w-full"
                style={{ border: 0, top: '-65px', left: '-10px', width: 'calc(100% + 20px)', height: 'calc(100% + 100px)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="360° Virtuálna prehliadka Koliba Stráže"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ RESERVATION CTA ═══════════════════════ */}
      <section id="rezervacia" className="py-14 sm:py-20 lg:py-28 bg-brand-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-16 opacity-5 hidden md:block">
          <Utensils size={280} />
        </div>
        <div className="absolute bottom-0 left-0 p-16 opacity-5 hidden md:block">
          <Heart size={200} className="fill-current" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <p className="text-brand-400 uppercase tracking-[0.2em] text-sm font-semibold mb-4">Rezervácia</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4 sm:mb-6">
              Rezervujte si stôl
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-200 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Rezervujte si miesto vopred a vyhnite sa čakaniu. Stačí zavolať alebo napísať, radi vás privítame.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <button
              onClick={() => setReservationOpen(true)}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 md:px-10 py-3 sm:py-5 text-base sm:text-xl font-medium sm:font-bold text-brand-900 bg-brand-100 hover:bg-white rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 duration-300 mb-6 sm:mb-8"
            >
              <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
              Rezervovať stôl online
            </button>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-row flex-wrap gap-2 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <a
                href="tel:+421918909302"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-3 px-3 sm:px-8 py-2.5 sm:py-4 md:py-5 text-sm sm:text-lg md:text-xl font-medium sm:font-bold text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full transition-all hover:scale-105 active:scale-95 duration-300"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                +421 918 909 302
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <a
              href="mailto:strazekoliba@gmail.com"
              className="inline-flex items-center gap-2 text-brand-300 hover:text-white transition-colors text-sm sm:text-lg"
            >
              <Mail size={20} />
              strazekoliba@gmail.com
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 font-serif">Často kladené otázky</h2>
            </div>
          </FadeIn>
          <div className="space-y-2">
            {[
              {
                q: 'Treba si rezervovať stôl vopred?',
                a: 'Rezervácia nie je povinná, ale odporúčame ju najmä cez víkendy a sviatky, aby sme vám zabezpečili miesto. Zavolajte nám na +421 918 909 302.',
              },
              {
                q: 'Máte vegetariánske možnosti?',
                a: 'Áno, v našom menu nájdete aj jedlá vhodné pre vegetariánov. Radi vám poradíme priamo v reštaurácii.',
              },
              {
                q: 'Môžem u vás osláviť narodeniny alebo svadbu?',
                a: 'Samozrejme! Naša koliba je ideálnym miestom pre rodinné oslavy, firemné akcie aj svadby. Kontaktujte nás pre individuálnu ponuku.',
              },
              {
                q: 'Je k dispozícii parkovanie?',
                a: 'Áno, ponúkame bezplatné parkovanie priamo pri kolibe pre všetkých našich hostí.',
              },
              {
                q: 'Ponúkate rozvoz jedál?',
                a: 'Áno, zabezpečujeme rozvoz menu. Pre objednávku zavolajte na +421 918 909 302.',
              },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <AccordionItem question={faq.q} answer={faq.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CONTACT FORM ═══════════════════════ */}
      <section className="py-16 sm:py-24 bg-brand-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">Napíšte nám</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 font-serif mb-4">Máte otázku?</h2>
              <p className="text-base sm:text-lg text-gray-600">
                Chcete sa opýtať na menu, rezervovať priestor pre väčšiu skupinu alebo naplánovať oslavu?
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm border border-brand-100">
              <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-800 mb-2">
                      Meno a priezvisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                      placeholder="Ján Novák"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-800 mb-2">
                      Telefón
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                      placeholder="+421 9XX XXX XXX"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-800 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                    placeholder="jan@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-800 mb-2">
                    Správa
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow resize-none"
                    placeholder="Napíšte nám vašu otázku..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto py-4 px-10 rounded-xl bg-brand-900 text-white font-medium hover:bg-brand-800 transition-colors shadow-md flex items-center justify-center gap-2 mx-auto"
                >
                  Odoslať správu <Send size={18} />
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ HOURS & LOCATION ═══════════════════════ */}
      <section id="kontakt" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <FadeIn>
              <p className="text-brand-500 uppercase tracking-[0.2em] text-sm font-semibold mb-4">Kontakt</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 font-serif mb-6">
                Kde nás nájdete
              </h2>
            </FadeIn>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Info Column */}
            <FadeIn>
              <div>
                {/* Opening Hours */}
                <div className="mb-10">
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-900">Otváracie hodiny</h3>
                  </div>
                  <div className="space-y-0">
                    {[
                      { day: 'Pondelok – Piatok', time: '9:00 – 19:00' },
                      { day: 'Sobota – Nedeľa', time: '10:00 – 19:00' },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-3 sm:py-4 border-b border-brand-100">
                        <span className="text-sm sm:text-base text-gray-700 font-medium">{row.day}</span>
                        <span className="text-sm sm:text-base text-brand-600 font-bold">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-brand-900">Adresa</p>
                      <p className="text-sm sm:text-base text-gray-600">Stráž 2189/5, 960 01 Zvolen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-brand-900">Telefón</p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <a href="tel:+421918909302" className="hover:text-brand-600 transition-colors">+421 918 909 302</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-brand-900">E-mail</p>
                      <a href="mailto:strazekoliba@gmail.com" className="text-sm sm:text-base text-brand-600 hover:text-brand-800 transition-colors break-all sm:break-normal">
                        strazekoliba@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Map */}
            <FadeIn direction="left">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-full min-h-[220px] sm:min-h-[320px] bg-brand-100 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1318.5!2d19.0904767!3d48.5864204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471539d9bf262237%3A0x248b55a2426f3e42!2sMotorest%20Koliba%20Str%C3%A1%C5%BEe!5e0!3m2!1ssk!2ssk!4v1"
                  className="w-full h-full min-h-[240px] sm:min-h-[320px]"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa – Hostinec Stráže, Prievidza"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="bg-brand-900 text-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-6">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 sm:mb-14">
            {/* Brand */}
            <div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif block mb-3">
                Koliba Stráže
              </span>
              <p className="text-brand-300 leading-relaxed text-sm">
                Tradičná slovenská reštaurácia vo Zvolene. Autentická kuchyňa, útulný drevený interiér a rodinná atmosféra.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Navigácia</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-brand-300 hover:text-brand-400 transition-colors text-sm cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Kontakt</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5 text-brand-300">
                  <MapPin size={15} className="mt-0.5 flex-shrink-0 text-brand-400" />
                  <span>Stráž 2189/5, 960 01 Zvolen</span>
                </li>
                <li>
                  <a href="tel:+421918909302" className="flex items-center gap-2.5 text-brand-300 hover:text-brand-400 transition-colors">
                    <Phone size={15} className="text-brand-400" />
                    +421 918 909 302
                  </a>
                </li>
                <li>
                  <a href="mailto:strazekoliba@gmail.com" className="flex items-center gap-2.5 text-brand-300 hover:text-brand-400 transition-colors">
                    <Mail size={15} className="text-brand-400" />
                    strazekoliba@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-5 border-t border-brand-800/50 flex flex-col items-center gap-4 text-xs text-brand-400/60">
            <p className="text-sm text-brand-300">
              Vytvorené{' '}
              <a href="https://adonistech.sk" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-brand-400 transition-colors">
                AdonisTech
              </a>
            </p>
            <div className="flex items-center justify-between w-full">
              <p>&copy; {new Date().getFullYear()} Koliba Stráže. Všetky práva vyhradené.</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1.5 text-brand-400/60 hover:text-brand-400 transition-colors cursor-pointer"
              >
                <ChevronDown size={14} className="rotate-180" />
                Späť nahor
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
            />
            <motion.div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
            >
              <motion.img
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Zavrieť"
              >
                <X size={24} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {!cookieConsent && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-brand-100 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-sm text-gray-700 flex-1">
                Táto webová stránka používa cookies na zlepšenie vášho zážitku z prehliadania. Používaním našej stránky súhlasíte s ich používaním.
              </p>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Odmietnuť
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors cursor-pointer"
                >
                  Súhlasím
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

