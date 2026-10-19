import React, { useState } from "react";
import {
  Star,
  Sparkles,
  Coffee,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Globe,
  Maximize2,
  X,
} from "lucide-react";

/* =========================================================
   إعدادات التواصل الرسمية والروابط
   ========================================================= */
const WHATSAPP_NUMBER = "962795711268";
const PHONE_DISPLAY = "+962 7 9571 1268";
const PHONE_LINK = "tel:+962795711268";

const GOOGLE_MAPS_LINK =
  "https://maps.app.goo.gl/UqGyRhqrM3F4JxSj7?g_st=ic";

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps?q=Bubble+Castle+House,+Al-Karak,+Jordan&output=embed";

const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/* =========================================================
   محتوى الموقع باللغتين العربية والإنجليزية
   ========================================================= */
const content = {
  ar: {
    navTitle: "بابل كاسل هاوس",
    navRooms: "الغرف والأجنحة",
    navWhy: "عن الفندق",
    navGallery: "معرض الصور",
    navReviews: "آراء الضيوف",
    navLocation: "الموقع",
    bookNow: "احجز الآن",
    heroBadge: "بإطلالة مباشرة على قلعة الكرك التاريخية",
    heroTitle: "Bubble Castle Boutique Hotel",
    heroSubtitle: "تجربة إقامة ملكية استثنائية في قلب الكرك، حيث يلتقي التراث العريق بالفخامة العصرية.",
    heroCTA1: "احجز مباشرة ووفر 2 دينار",
    heroCTA2: "استكشف الغرف",
    benefit1: "خصم تلقائي 2 دينار عن منصات الحجز الخارجية",
    benefit2: "ضيافة مجانية: مياه معدنية وشاي وكابتشينو فاخر",
    benefit3: "أفضل سعر مضمون عند الحجز المباشر",
    roomsTitle: "أجنحتنا وغرفنا الملكية",
    roomsSubtitle: "اختر الغرفة الأنسب لك، وسيتم إرسال تفاصيلها تلقائياً عبر واتساب لتأكيد الحجز.",
    whyTitle: "لماذا Bubble Castle؟",
    whySubtitle: "لأن موقعنا ليس مجرد مكان للنوم، بل تجربة إقامة هادئة وفاخرة بإطلالة مباشرة على قلعة الكرك التاريخية.",
    whyFeatures: [
      "إطلالات مباشرة وبانورامية على قلعة الكرك التاريخية",
      "تراسات خاصة ومناطق استرخاء هادئة",
      "غرف واسعة بتصاميم بوتيكية فاخرة",
      "موقع ممتاز بالقرب من معالم الكرك الرئيسية وأسواقها",
      "ضيافة ترحيبية مجانية عند الحجز المباشر",
      "تواصل سريع ومباشر على مدار الساعة عبر واتساب",
    ],
    reviewsTitle: "آراء ضيوفنا",
    reviewsSubtitle: "تجارب حقيقية لضيوف اختاروا الإقامة المباشرة معنا.",
    locationTitle: "موقعنا في قلب الكرك",
    locationDesc: "يقع Bubble Castle Boutique Hotel في موقع مميز قرب قلعة الكرك التاريخية، ويعد خياراً مثالياً لمن يبحث عن الهدوء والقرب من المعالم الرئيسية.",
    address: "Castle Street، قرب قلعة الكرك، الكرك، الأردن",
    openMaps: "افتح موقعنا الدقيق على خرائط Google",
    faqTitle: "أسئلة شائعة",
    finalCTATitle: "احجز إقامتك اليوم ووفر 2 دينار",
    finalCTASub: "تواصل معنا مباشرة عبر واتساب لتأكيد التوفر والحصول على أفضل سعر مباشر.",
    generalWhatsAppMsg: "مرحباً Bubble Castle Boutique Hotel،\nأرغب بالاستفسار عن توفر الغرف والحجز المباشر.\nأرجو إرسال الأسعار والتفاصيل.",
  },
  en: {
    navTitle: "Bubble Castle",
    navRooms: "Rooms & Suites",
    navWhy: "About Us",
    navGallery: "Gallery",
    navReviews: "Reviews",
    navLocation: "Location",
    bookNow: "Book Now",
    heroBadge: "Overlooking Historic Karak Castle",
    heroTitle: "Bubble Castle Boutique Hotel",
    heroSubtitle: "An exceptional royal stay in the heart of Karak, where heritage meets modern luxury.",
    heroCTA1: "Book Direct & Save 2 JD",
    heroCTA2: "Explore Rooms",
    benefit1: "Automatic 2 JD discount vs external booking sites",
    benefit2: "Complimentary water, tea & premium cappuccino",
    benefit3: "Best rate guaranteed on direct bookings",
    roomsTitle: "Our Royal Rooms & Suites",
    roomsSubtitle: "Select your preferred room to send instant reservation details via WhatsApp.",
    whyTitle: "Why Bubble Castle?",
    whySubtitle: "Beyond lodging, we offer a tranquil luxury experience right next to Karak Castle.",
    whyFeatures: [
      "Direct panoramic views of historic Karak Castle",
      "Private terraces & quiet relaxation spots",
      "Spacious rooms with luxury boutique design",
      "Prime location near main attractions & markets",
      "Complimentary welcome hospitality on direct bookings",
      "Instant 24/7 assistance via WhatsApp",
    ],
    reviewsTitle: "Guest Reviews",
    reviewsSubtitle: "Real stories from guests who booked directly with us.",
    locationTitle: "Located in Heart of Karak",
    locationDesc: "Situated right next to Karak Castle, offering serenity and immediate access to the historic center.",
    address: "Castle Street, Near Karak Castle, Al-Karak, Jordan",
    openMaps: "Open exact location on Google Maps",
    faqTitle: "Frequently Asked Questions",
    finalCTATitle: "Book Your Stay Today & Save 2 JD",
    finalCTASub: "Contact us directly on WhatsApp to confirm availability and claim best rates.",
    generalWhatsAppMsg: "Hello Bubble Castle Boutique Hotel,\nI would like to inquire about room availability and direct booking rates.",
  },
};

/* =========================================================
   بيانات الغرف المعتمدة (حسب الترتيب الاستراتيجي)
   ========================================================= */
const roomsData = {
  ar: [
    {
      id: "deluxe-triple",
      badge: "الخيار الأول والأكثر طلباً 🥇",
      badgeClass: "bg-amber-600",
      image: "/triple-room.jpg",
      imageAlt: "غرفة ثلاثية فاخرة بإطلالة بانورامية على قلعة الكرك",
      title: "الغرفة الثلاثية الفاخرة",
      size: "80 م²",
      sizeClass: "text-amber-700 bg-amber-50",
      description: "طابع ملكي دافئ بسقف مخملي أحمر راقٍ، وتجهيزات متكاملة تضمن إقامة استثنائية.",
      features: [
        "أجمل تراس بانورامي خاص في الفندق",
        "إطلالة مباشرة على قلعة الكرك وإنارتها الليلية",
        "حمام عصري بتشطيبات حجرية فاخرة",
      ],
      cta: "احجز الغرفة الثلاثية الآن",
      whatsappMessage: "مرحباً Bubble Castle Boutique Hotel،\nأرغب بحجز الغرفة الثلاثية الفاخرة.\nالمساحة: 80 م²\nالمميزات: تراس بانورامي خاص وإطلالة مباشرة على قلعة الكرك.\nأرجو إرسال السعر وتفاصيل الحجز المباشر.",
    },
    {
      id: "deluxe-double",
      badge: "إطلالة برج الأسد 🥈",
      badgeClass: "bg-stone-700",
      image: "/double-room.jpg",
      imageAlt: "غرفة مزدوجة فاخرة بإطلالة على قلعة الكرك وتراس خاص",
      title: "الغرفة المزدوجة الفاخرة",
      size: "75 م²",
      sizeClass: "text-stone-700 bg-stone-100",
      description: "ملاذ هادئ وواسع يجمع بين الأناقة العصرية والخصوصية المطلقة للضيوف.",
      features: [
        "إطلالة مباشرة على قلعة الكرك وتراس خاص",
        "صالة أنيقة ومنطقة جلوس مريحة",
        "محطة مشروبات وثلاجة خاصة",
      ],
      cta: "احجز الغرفة المزدوجة الآن",
      whatsappMessage: "مرحباً Bubble Castle Boutique Hotel،\nأرغب بحجز الغرفة المزدوجة الفاخرة.\nالمساحة: 75 م²\nالمميزات: تراس خاص وإطلالة مباشرة على قلعة الكرك.\nأرجو إرسال السعر وتفاصيل الحجز المباشر.",
    },
    {
      id: "family-suite-b1",
      badge: "جناح عائلي 🥉",
      badgeClass: "bg-stone-600",
      image: "/suite-b1.jpg",
      imageAlt: "جناح عائلي فاخر من غرفتي نوم مع مطبخ خاص وإطلالة على القلعة",
      title: "الجناح الفاخر Code b1",
      size: "80 م²",
      sizeClass: "text-stone-700 bg-stone-100",
      description: "جناح واسع بغرفتي نوم وتصميم عصري وإضاءات سقف حديثة (Profile LED)، مثالي للعائلات.",
      features: [
        "غرفتا نوم: سرير مزدوج وسريران فرديان",
        "مطبخ خاص مجهز بالكامل",
        "إطلالة مباشرة على قلعة الكرك",
      ],
      cta: "احجز الجناح العائلي الآن",
      whatsappMessage: "مرحباً Bubble Castle Boutique Hotel،\nأرغب بحجز الجناح الفاخر Code b1.\nالمساحة: 80 م²\nالمميزات: غرفتا نوم، مطبخ خاص، وإطلالة مباشرة على قلعة الكرك.\nأرجو إرسال السعر وتفاصيل الحجز المباشر.",
    },
  ],
  en: [
    {
      id: "deluxe-triple",
      badge: "Top Priority & Best Seller 🥇",
      badgeClass: "bg-amber-600",
      image: "/triple-room.jpg",
      imageAlt: "Deluxe Triple Room with Panoramic Castle View",
      title: "Deluxe Triple Room",
      size: "80 m²",
      sizeClass: "text-amber-700 bg-amber-50",
      description: "Warm royal aesthetic featuring a red velvet ceiling and premium furnishings for a unique stay.",
      features: [
        "Finest private panoramic terrace in the hotel",
        "Direct view of Karak Castle & its night lights",
        "Modern luxury bathroom with stone finishes",
      ],
      cta: "Book Triple Room Now",
      whatsappMessage: "Hello Bubble Castle Boutique Hotel,\nI would like to book the Deluxe Triple Room (80 m²).\nPlease share direct rates and confirmation details.",
    },
    {
      id: "deluxe-double",
      badge: "Lion's Tower View 🥈",
      badgeClass: "bg-stone-700",
      image: "/double-room.jpg",
      imageAlt: "Deluxe Double Room with Private Terrace and Castle View",
      title: "Deluxe Double Room",
      size: "75 m²",
      sizeClass: "text-stone-700 bg-stone-100",
      description: "A spacious and tranquil sanctuary combining modern elegance with absolute privacy.",
      features: [
        "Direct view of Karak Castle with private terrace",
        "Elegant lounge area with velvet seating",
        "Private beverage station & minibar",
      ],
      cta: "Book Double Room Now",
      whatsappMessage: "Hello Bubble Castle Boutique Hotel,\nI would like to book the Deluxe Double Room (75 m²).\nPlease share direct rates and confirmation details.",
    },
    {
      id: "family-suite-b1",
      badge: "Family Suite 🥉",
      badgeClass: "bg-stone-600",
      image: "/suite-b1.jpg",
      imageAlt: "Luxury Family Suite Code b1 with 2 Bedrooms and Kitchen",
      title: "Luxury Suite (Code b1)",
      size: "80 m²",
      sizeClass: "text-stone-700 bg-stone-100",
      description: "Spacious 2-bedroom suite featuring modern Profile LED ceiling lighting and a private kitchen.",
      features: [
        "2 Bedrooms: 1 Master Double + 2 Twin Beds",
        "Fully equipped private kitchen",
        "Direct view overlooking Karak Castle",
      ],
      cta: "Book Family Suite Now",
      whatsappMessage: "Hello Bubble Castle Boutique Hotel,\nI would like to book the Luxury Suite Code b1 (80 m²).\nPlease share direct rates and confirmation details.",
    },
  ],
};

const reviewsData = [
  {
    name: "أحمد م.",
    country: "الأردن",
    text: "الإطلالة على القلعة رائعة جداً، والتراس كان أفضل ما في الإقامة. الخدمة سريعة والاستقبال ودود.",
  },
  {
    name: "Sara K.",
    country: "Saudi Arabia",
    text: "Spacious and clean room. The castle view at night from the private terrace is unforgettable!",
  },
  {
    name: "Omar A.",
    country: "UAE",
    text: "Direct booking was super quick via WhatsApp and saved us money. Highly recommended in Karak.",
  },
];

const faqsData = {
  ar: [
    {
      question: "ما هي مواعيد تسجيل الدخول والخروج؟",
      answer: "تسجيل الدخول من الساعة 2:00 ظهراً، وتسجيل الخروج حتى 12:00 ظهراً. للحالات الخاصة، تواصل معنا عبر واتساب.",
    },
    {
      question: "كيف أحصل على خصم الـ 2 دينار؟",
      answer: "الخصم يطبق تلقائياً عند طلبك للحجز المباشر عبر زر واتساب بدون وسطاء.",
    },
    {
      question: "هل يوجد موقف سيارات؟",
      answer: "نعم، يتوفر موقف سيارات للضيوف بالقرب من الفندق.",
    },
    {
      question: "هل الفندق مناسب للعائلات؟",
      answer: "نعم، الجناح العائلي Code b1 مثالي للعائلات لأنه يضم غرفتي نوم ومطبخاً خاصاً.",
    },
  ],
  en: [
    {
      question: "What are the Check-in and Check-out times?",
      answer: "Check-in starts from 2:00 PM, and Check-out is until 12:00 PM. For special requests, contact us on WhatsApp.",
    },
    {
      question: "How do I claim the 2 JD discount?",
      answer: "The discount is automatically applied when you reserve directly through our WhatsApp button.",
    },
    {
      question: "Is guest parking available?",
      answer: "Yes, parking is available for hotel guests near the property.",
    },
    {
      question: "Is the hotel family-friendly?",
      answer: "Yes, Luxury Suite Code b1 is ideal for families, featuring 2 bedrooms and a private kitchen.",
    },
  ],
};

const galleryImages = [
  { src: "/terrace.jpg", alt: "تراس الفندق البانورامي" },
  { src: "/castle-view.jpg", alt: "إطلالة القلعة الليلية الساحرة" },
  { src: "/lobby.jpg", alt: "بهو الاستقبال الفاخر" },
  { src: "/hero-bg.jpg", alt: "الإطلالة الشاملة للفندق" },
];

export const WelcomeScreen: React.FC = () => {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const t = content[lang];
  const rooms = roomsData[lang];
  const faqs = faqsData[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
      className="min-h-screen bg-[#FBF9F5] text-[#2C221E] font-sans antialiased transition-all"
    >
      {/* Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-[#1A1512]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-white font-serif font-bold text-lg">
            {t.navTitle}
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-stone-300">
            <a href="#rooms" className="hover:text-amber-300 transition-colors">
              {t.navRooms}
            </a>
            <a href="#why" className="hover:text-amber-300 transition-colors">
              {t.navWhy}
            </a>
            <a href="#gallery" className="hover:text-amber-300 transition-colors">
              {t.navGallery}
            </a>
            <a href="#reviews" className="hover:text-amber-300 transition-colors">
              {t.navReviews}
            </a>
            <a href="#location" className="hover:text-amber-300 transition-colors">
              {t.navLocation}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-stone-200 hover:bg-white/20 text-xs font-medium border border-white/15 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "English" : "عربي"}</span>
            </button>

            <a
              href={createWhatsAppLink(t.generalWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {t.bookNow}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative min-h-[92vh] flex items-center justify-center bg-[#1A1512] text-white px-6 pt-16 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-35 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />

        <div className="relative max-w-4xl mx-auto text-center space-y-6 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-medium">
            <Star className="w-4 h-4 fill-amber-300" />
            {t.heroBadge}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light">
            {t.heroSubtitle}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={createWhatsAppLink(t.generalWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              {t.heroCTA1}
            </a>

            <a
              href="#rooms"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium rounded-xl border border-white/20 transition-all"
            >
              {t.heroCTA2}
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="bg-amber-900 text-amber-100 py-5 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 text-center text-sm md:text-base font-medium">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            {t.benefit1}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Coffee className="w-5 h-5 text-amber-300 shrink-0" />
            {t.benefit2}
          </div>

          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0" />
            {t.benefit3}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <main id="rooms" className="max-w-7xl mx-auto py-20 px-6 space-y-14">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            {t.roomsTitle}
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto">
            {t.roomsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-stone-200 flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="relative h-64 bg-stone-200">
                <span
                  className={`absolute top-4 ${lang === "ar" ? "right-4" : "left-4"} z-10 ${room.badgeClass} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md`}
                >
                  {room.badge}
                </span>

                <img
                  src={room.image}
                  alt={room.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setActiveImage(room.image)}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-3">
                    <h3 className="text-2xl font-serif font-bold text-stone-900">
                      {room.title}
                    </h3>
                    <span
                      className={`text-sm font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap ${room.sizeClass}`}
                    >
                      {room.size}
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {room.description}
                  </p>

                  <ul className="space-y-2 text-sm text-stone-700 pt-3 border-t border-stone-100">
                    {room.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 text-amber-600 shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={createWhatsAppLink(room.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#1A1512] hover:bg-amber-700 text-white text-center font-medium rounded-xl transition-colors"
                >
                  {room.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Why Us */}
      <section id="why" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              {t.whyTitle}
            </h2>

            <p className="text-stone-600 leading-relaxed">
              {t.whySubtitle}
            </p>

            <ul className="space-y-4">
              {t.whyFeatures.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="gallery" className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer ${idx % 2 !== 0 ? "mt-8" : ""}`}
                onClick={() => setActiveImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-[#FBF9F5] py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              {t.reviewsTitle}
            </h2>
            <p className="text-stone-600">{t.reviewsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsData.map((review) => (
              <figure
                key={review.name}
                className="bg-white p-6 rounded-2xl shadow-lg border border-stone-200 space-y-4"
              >
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 fill-amber-500"
                    />
                  ))}
                </div>

                <blockquote className="text-stone-700 leading-relaxed">
                  “{review.text}”
                </blockquote>

                <figcaption className="text-sm text-stone-500">
                  {review.name} — {review.country}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              {t.locationTitle}
            </h2>

            <p className="text-stone-600 leading-relaxed">
              {t.locationDesc}
            </p>

            <div className="space-y-3 text-stone-700">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                {t.address}
              </p>

              <a
                href={PHONE_LINK}
                className="flex items-center gap-2 hover:text-amber-700 transition-colors"
              >
                <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>

              <a
                href={createWhatsAppLink(t.generalWhatsAppMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-amber-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-amber-600 shrink-0" />
                WhatsApp: <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>

            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-stone-300 rounded-xl font-medium hover:bg-stone-100 transition-colors"
            >
              {t.openMaps}
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
            <iframe
              title="Bubble Castle Location"
              src={GOOGLE_MAPS_EMBED}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[#FBF9F5] py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center">
            {t.faqTitle}
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-2xl border border-stone-200 shadow-sm"
              >
                <summary className="cursor-pointer px-6 py-5 font-semibold text-stone-900">
                  {faq.question}
                </summary>
                <p className="px-6 pb-5 text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1A1512] text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">
            {t.finalCTATitle}
          </h2>

          <p className="text-stone-300 text-lg">
            {t.finalCTASub}
          </p>

          <a
            href={createWhatsAppLink(t.generalWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            {t.bookNow}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#120E0C] text-stone-400 py-12 px-6 text-center text-sm border-t border-stone-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-serif text-lg text-white">Bubble Castle Boutique Hotel - Karak, Jordan</p>
          <p>© {new Date().getFullYear()} All rights reserved. Overlooking historic Karak Castle.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={createWhatsAppLink(t.generalWhatsAppMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct Booking WhatsApp"
        className={`fixed bottom-5 ${lang === "ar" ? "left-5" : "right-5"} z-50 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-full shadow-2xl font-semibold transition-colors`}
      >
        <MessageCircle className="w-5 h-5" />
        <span>{t.bookNow}</span>
      </a>

      {/* Image Modal Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage}
              alt="Expanded Preview"
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
