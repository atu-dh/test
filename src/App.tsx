import { useState, useEffect, FormEvent } from 'react';
import heroBg from './assets/hero-bg.jpg';

// ─── Constants ────────────────────────────────────────────────────────────────

const EVENT_TITLE = 'بوت‌کمپ علوم انسانی دیجیتال (عاد) دانشگاه علامه طباطبائی';

// ─── Data ────────────────────────────────────────────────────────────────────

// Source: Instructors.txt — placeholder portrait photos will be replaced with real photos
const INSTRUCTORS = [
  { id: 1,  name: 'دکتر آزاده میرزائی',       photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format' },
  { id: 2,  name: 'دکتر هاله حاج‌یاسینی',     photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format' },
  { id: 3,  name: 'دکتر علیرضا حدادی',         photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format' },
  { id: 4,  name: 'مجید پورکاشانی',            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format' },
  { id: 5,  name: 'حسام محمدحسینی',            photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format' },
  { id: 6,  name: 'محمدسعید میری',             photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format' },
  { id: 7,  name: 'محمد حسن‌شاهی راویز',       photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&auto=format' },
  { id: 8,  name: 'دکتر کوثر کریمی‌پور',       photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format' },
  { id: 9,  name: 'پرنیان نعمتی',              photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&auto=format' },
  { id: 10, name: 'دکتر مهنام نجفی',           photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format' },
  { id: 11, name: 'دکتر مهدی بهنیافر',         photo: 'https://images.unsplash.com/photo-1548449112-96a38a643324?w=400&h=400&fit=crop&auto=format' },
  { id: 12, name: 'دکتر علی طیبی',             photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format' },
  { id: 13, name: 'دکتر ابوالفضل حاجی‌زادگان', photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&auto=format' },
  { id: 14, name: 'علیرضا کدیور',              photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&auto=format' },
  { id: 15, name: 'عادل خرم‌روز',              photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&auto=format' },
  { id: 16, name: 'علیرضا نیکبخت',             photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format' },
  { id: 17, name: 'دکتر جواد درویش',           photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format' },
];

// Source: Topics.txt
const TOPICS = [
  'مبانی علوم انسانی دیجیتال',
  'جمع‌آوری داده از وب و شبکه‌های اجتماعی',
  'پیش‌پردازش و پاکسازی متن',
  'برچسب‌گذاری و متن‌کاوی',
  'معرفی و بررسی پروژه‌های علوم انسانی دیجیتال و زبان‌شناسی',
  'معرفی و بررسی پروژه‌های علوم انسانی دیجیتال و علوم سیاسی',
  'معرفی و بررسی پروژه‌های علوم انسانی دیجیتال و علوم اجتماعی',
  'معرفی و بررسی پروژه‌های علوم انسانی دیجیتال و میراث فرهنگی',
  'معرفی و بررسی پروژه‌های علوم انسانی دیجیتال و هنر و ادبیات',
  'معرفی و بررسی پروژه‌های علوم انسانی دیجیتال و مطالعات ادیان',
  'علوم انسانی دیجیتال و مطالعات شهری',
  'علوم اجتماعی محاسباتی',
  'مصورسازی داده',
  'تحلیل شبکه‌های اجتماعی',
  'روزنامه‌نگاری داده',
  'اخلاق در پژوهش علوم انسانی دیجیتال',
];

// Source: Program.md
const PROGRAM_WEEKS = [
  {
    week: '۱',
    days: [
      {
        day: 'پنج‌شنبه',
        date: '۱۶ مهر',
        sessions: [
          { time: '۱۴:۰۰–۱۴:۱۰', topic: 'افتتاحیه', instructor: '' },
          { time: '۱۴:۱۰–۱۴:۲۰', topic: 'سخنرانی معاون آموزشی دانشگاه علامه طباطبائی', instructor: 'دکتر مرتضی طاهری' },
          { time: '۱۴:۳۰–۱۵:۰۰', topic: 'افتتاحیه: مقدمه‌ای بر علوم انسانی دیجیتال و تاریخچهٔ آن', instructor: 'دکتر آزاده میرزائی' },
          { time: '۱۵:۰۰–۱۵:۳۰', topic: 'علوم انسانی دیجیتال: فضا و روایت‌های دیداری', instructor: 'دکتر هاله حاج‌یاسینی' },
          { time: '۱۵:۳۰–۱۶:۰۰', topic: 'علوم انسانی دیجیتال و رویکردهای میان‌رشته‌ای', instructor: 'دکتر علیرضا حدادی' },
        ],
      },
      {
        day: 'جمعه',
        date: '۱۷ مهر',
        sessions: [
          { time: '۱۴:۰۰–۱۷:۰۰', topic: 'جمع‌آوری داده از وب و شبکه‌های اجتماعی', instructor: 'مجید پورکاشانی' },
        ],
      },
    ],
  },
  {
    week: '۲',
    days: [
      {
        day: 'پنج‌شنبه',
        date: '۲۳ مهر',
        sessions: [
          { time: '۱۴:۰۰–۱۷:۰۰', topic: 'پیش‌پردازش و پاکسازی داده‌های متنی', instructor: 'حسام محمدحسینی' },
        ],
      },
      {
        day: 'جمعه',
        date: '۲۴ مهر',
        sessions: [
          { time: '۱۴:۰۰–۱۵:۲۰', topic: 'برچسب‌گذاری داده‌های زبانی', instructor: 'دکتر آزاده میرزائی' },
          { time: '۱۵:۳۰–۱۷:۰۰', topic: 'متن‌کاوی', instructor: 'محمدسعید میری' },
        ],
      },
    ],
  },
  {
    week: '۳',
    days: [
      {
        day: 'پنج‌شنبه',
        date: '۳۰ مهر',
        sessions: [
          { time: '۱۴:۰۰–۱۴:۳۰', topic: 'معرفی و بررسی پروژه‌های عاد (۱): پروژه‌های علوم انسانی دیجیتال و زبان‌شناسی', instructor: 'محمد حسن‌شاهی راویز' },
          { time: '۱۴:۳۰–۱۵:۰۰', topic: 'پروژه‌های علوم انسانی دیجیتال و علوم سیاسی', instructor: 'دکتر علیرضا حدادی' },
          { time: '۱۵:۰۰–۱۵:۳۰', topic: 'پروژه‌های علوم انسانی دیجیتال و علوم اجتماعی', instructor: 'دکتر کوثر کریمی‌پور' },
        ],
      },
      {
        day: 'جمعه',
        date: '۱ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۴:۳۰', topic: 'معرفی و بررسی پروژه‌های عاد (۲): پروژه‌های علوم انسانی دیجیتال و میراث فرهنگی', instructor: 'پرنیان نعمتی' },
          { time: '۱۴:۳۰–۱۵:۰۰', topic: 'پروژه‌های علوم انسانی دیجیتال و هنر و ادبیات', instructor: 'دکتر مهنام نجفی' },
          { time: '۱۵:۰۰–۱۵:۳۰', topic: 'پروژه‌های علوم انسانی دیجیتال و مطالعات ادیان', instructor: 'دکتر مهدی بهنیافر' },
        ],
      },
    ],
  },
  {
    week: '۴',
    days: [
      {
        day: 'پنج‌شنبه',
        date: '۷ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۷:۰۰', topic: 'علوم انسانی دیجیتال و مطالعات شهری', instructor: 'دکتر علی طیبی' },
        ],
      },
      {
        day: 'جمعه',
        date: '۸ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۵:۲۰', topic: 'علوم اجتماعی محاسباتی', instructor: 'دکتر ابوالفضل حاجی‌زادگان' },
        ],
      },
    ],
  },
  {
    week: '۵',
    days: [
      {
        day: 'پنج‌شنبه',
        date: '۱۴ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۵:۲۰', topic: 'مصورسازی داده', instructor: 'علیرضا کدیور' },
        ],
      },
      {
        day: 'جمعه',
        date: '۱۵ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۵:۲۰', topic: 'تحلیل شبکه‌های اجتماعی', instructor: 'عادل خرم‌روز' },
        ],
      },
    ],
  },
  {
    week: '۶',
    days: [
      {
        day: 'پنج‌شنبه',
        date: '۲۱ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۵:۲۰', topic: 'روزنامه‌نگاری داده', instructor: 'علیرضا کدیور' },
        ],
      },
      {
        day: 'جمعه',
        date: '۲۲ آبان',
        sessions: [
          { time: '۱۴:۰۰–۱۴:۳۰', topic: 'اخلاق در پژوهش علوم انسانی دیجیتال', instructor: 'علیرضا نیکبخت' },
          { time: '۱۴:۳۰–۱۵:۰۰', topic: 'معرفی مؤسسهٔ دقیقه', instructor: 'علیرضا کدیور' },
          { time: '۱۵:۰۰–۱۵:۳۰', topic: 'معرفی مؤسسهٔ حامی', instructor: 'جواد درویش' },
          { time: '۱۵:۳۰–۱۶:۰۰', topic: 'معرفی مؤسسهٔ نور', instructor: 'دکتر مهدی بهنیافر' },
          { time: '۱۶:۰۰–۱۶:۳۰', topic: 'اختتامیه', instructor: '' },
        ],
      },
    ],
  },
];

// Source: executive_comitteee.txt
const TEAM_MEMBERS = [
  {
    role: 'دبیر علمی',
    name: 'دکتر آزاده میرزائی',
    affiliation: 'دانشیار زبان‌شناسی دانشگاه علامه طباطبائی',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format',
  },
  {
    role: 'دبیر اجرایی',
    name: 'محمدسعید میری',
    affiliation: 'دانشجوی دکتری زبان‌شناسی دانشگاه علامه طباطبائی',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format',
  },
  {
    role: 'کادر اجرایی',
    name: 'ندا حقیقی صابر',
    affiliation: 'دانشجوی دکتری زبان‌شناسی دانشگاه الزهرا',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&auto=format',
  },
  {
    role: 'کادر اجرایی',
    name: 'الهه حق‌گو',
    affiliation: 'دانشجوی دکتری زبان‌شناسی دانشگاه علامه طباطبائی',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format',
  },
];

const NAV_ITEMS = [
  { label: 'درباره‌ی بوت‌کمپ', href: '#about' },
  { label: 'دانلود بروشور', href: 'https://example.com/brochure.pdf', external: true }, // PLACEHOLDER: Replace with actual brochure URL
  { label: 'فهرست موضوعات', href: '#topics' },
  { label: 'مدرسان', href: '#instructors' },
  { label: 'برنامه', href: '#schedule' },
  { label: 'برگزارکنندگان', href: '#organizers' },
  { label: 'تماس با ما', href: '#contact' },
];

// ─── Components ──────────────────────────────────────────────────────────────

function NavBar({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string, external?: boolean) => {
    setMenuOpen(false);
    if (external) return;
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#12BD77]" />
            <span className="font-bold text-[14px] text-[#1A1A2E] leading-tight tracking-tight hidden sm:block">
              {EVENT_TITLE}
            </span>
            <span className="font-bold text-[14px] text-[#1A1A2E] leading-tight sm:hidden">
              بوت‌کمپ عاد
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!item.external) { e.preventDefault(); handleNavClick(item.href); }
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-[#12BD77] bg-[#E8FBF3]'
                    : 'text-[#374151] hover:text-[#12BD77] hover:bg-[#F0FDF7]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="mr-2 px-4 py-2 bg-[#12BD77] text-white rounded-lg text-sm font-semibold hover:bg-[#0E9A61] transition-colors"
            >
              ثبت‌نام
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-[#374151] hover:bg-[#F0FDF7] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منوی ناوبری"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3 pb-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!item.external) { e.preventDefault(); handleNavClick(item.href); }
                }}
                className="block px-4 py-2.5 text-sm text-[#374151] hover:text-[#12BD77] hover:bg-[#F0FDF7] rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="block w-full text-center py-2.5 bg-[#12BD77] text-white rounded-lg text-sm font-semibold hover:bg-[#0E9A61] transition-colors"
              >
                ثبت‌نام
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-end"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Lightened overlay so the background image is clearly visible */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0F0F1A]/70 via-[#0F0F1A]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 pt-40">
        <div className="max-w-2xl text-right">
          <div className="inline-flex items-center gap-2 bg-[#12BD77]/20 border border-[#12BD77]/40 text-[#4ADE98] rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#12BD77] animate-pulse" />
            ثبت‌نام آغاز شده است
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            بوت‌کمپ<br />
            <span className="text-[#12BD77]">علوم انسانی دیجیتال (عاد)</span><br />
            دانشگاه علامه طباطبائی
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6 font-light">
            شش هفته برای آشنایی با ابزارها، روش‌ها و رویکردهای نوین علوم انسانی دیجیتال
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-10">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#12BD77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ۱۶ مهر تا ۲۲ آبان ۱۴۰۵
            </span>
            <span className="text-gray-500">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#12BD77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              برگزاری کاملاً مجازی
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 bg-[#12BD77] text-white rounded-xl text-base font-bold hover:bg-[#0E9A61] hover:shadow-lg hover:shadow-[#12BD77]/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              ثبت‌نام در بوت‌کمپ
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 bg-white/10 border border-white/25 text-white rounded-xl text-base font-medium hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              بیشتر بدانید
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs">
        <span>پایین‌تر ببینید</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16 items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#12BD77]" />
              <span className="text-[#12BD77] text-sm font-semibold uppercase tracking-widest">About</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mb-6 leading-tight">
              درباره‌ی بوت‌کمپ
            </h2>

            <div className="space-y-4 text-[#374151] text-base leading-relaxed">
              <p>
                بوت‌کمپ علوم انسانی دیجیتال (عاد) دانشگاه علامه طباطبائی یک برنامه‌ی آموزشی فشرده و کاربردی است که توسط معاونت آموزشی دانشگاه علامه طباطبائی برگزار می‌شود. هدف این بوت‌کمپ، آشنا کردن پژوهشگران، دانشجویان و علاقه‌مندان علوم انسانی با ابزارها، روش‌ها و رویکردهای نوین دیجیتال است.
              </p>
              <p>
                در طول شش هفته، شرکت‌کنندگان با موضوعاتی چون تحلیل داده‌های متنی، جمع‌آوری داده از وب، پردازش زبان طبیعی، تحلیل شبکه‌های اجتماعی و مصورسازی داده آشنا می‌شوند.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '📅', label: 'تاریخ برگزاری', value: '۱۶ مهر تا ۲۲ آبان ۱۴۰۵' },
                { icon: '💻', label: 'نحوه برگزاری', value: 'کاملاً مجازی و آنلاین' },
                { icon: '⏱', label: 'مدت', value: '۶ هفته' },
                { icon: '🗓', label: 'برنامه', value: 'پنج‌شنبه و جمعه، ۱۴:۰۰–۱۷:۰۰' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 bg-[#F5F5F7] rounded-xl p-4">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-xs text-[#6B7280] font-medium mb-0.5">{item.label}</div>
                    <div className="text-sm font-semibold text-[#1A1A2E]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div id="brochure" className="mt-10 flex items-center gap-4 p-5 bg-[#F5F5F7] rounded-2xl border border-gray-200">
              <div className="flex-shrink-0 w-12 h-12 bg-[#E8FBF3] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#12BD77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#1A1A2E] text-sm mb-0.5">بروشور بوت‌کمپ</div>
                <div className="text-xs text-[#6B7280]">اطلاعات کامل دوره را دانلود کنید</div>
              </div>
              {/* PLACEHOLDER: Replace href with actual brochure PDF URL */}
              <a
                href="https://example.com/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#12BD77] text-white rounded-xl text-sm font-semibold hover:bg-[#0E9A61] transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                دانلود بروشور
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[38%] flex-shrink-0">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-[#E8FBF3]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=900&fit=crop&auto=format"
                alt="دانشجویان در حال یادگیری علوم انسانی دیجیتال"
                className="w-full h-72 lg:h-[520px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-6 p-5 bg-[#F5F5F7] rounded-2xl border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-3 font-medium">برگزار می‌شود توسط:</p>
              <div className="space-y-2 text-sm font-medium text-[#1A1A2E]">
                <div>معاونت آموزشی دانشگاه علامه طباطبائی</div>
                <div className="text-[#6B7280] font-normal">با همکاری مؤسسه حامی علوم انسانی</div>
                <div className="text-[#6B7280] font-normal">و مؤسسه پردازش و تحلیل داده دقیقه</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Topic icon variants cycling through a small set
const TOPIC_ICONS = [
  <svg key="a" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5"><path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5"><path d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="d" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
];

// Subtle green tint variants for topic tiles
const TOPIC_VARIANTS = [
  { bg: '#F0FDF7', border: '#BBF7D0', accent: '#0E9A61' },
  { bg: '#E8FBF3', border: '#A7F3D0', accent: '#12BD77' },
  { bg: '#F0FFF8', border: '#C6F6D5', accent: '#0A7A4E' },
  { bg: '#ECFDF5', border: '#D1FAE5', accent: '#059669' },
];

function TopicsSection() {
  return (
    <section id="topics" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#12BD77]" />
            <span className="text-[#12BD77] text-sm font-semibold uppercase tracking-widest">Topics</span>
            <span className="w-8 h-px bg-[#12BD77]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] leading-tight">فهرست موضوعات</h2>
          <p className="mt-3 text-[#6B7280] text-base max-w-xl mx-auto">
            موضوعاتی که در طول بوت‌کمپ پوشش داده می‌شوند
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS.map((topic, i) => {
            const v = TOPIC_VARIANTS[i % TOPIC_VARIANTS.length];
            return (
              <div
                key={i}
                className="group rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#12BD77]/10 cursor-default"
                style={{ background: v.bg, borderColor: v.border }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: v.accent + '18', color: v.accent }}
                >
                  {TOPIC_ICONS[i % TOPIC_ICONS.length]}
                </div>
                <p className="text-sm font-semibold text-[#1A1A2E] leading-snug">{topic}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InstructorsSection() {
  return (
    <section id="instructors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#12BD77]" />
            <span className="text-[#12BD77] text-sm font-semibold uppercase tracking-widest">Instructors</span>
            <span className="w-8 h-px bg-[#12BD77]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E]">مدرسان</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {INSTRUCTORS.map((person) => (
            <div key={person.id} className="group text-center">
              <div className="relative mb-3 mx-auto w-full aspect-square max-w-[120px] lg:max-w-none">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#F5F5F7] border border-gray-100 group-hover:shadow-lg group-hover:shadow-[#12BD77]/10 transition-all duration-300">
                  <img
                    src={person.photo}
                    alt={`تصویر ${person.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 bg-[#12BD77] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xs font-bold text-[#1A1A2E] leading-tight">{person.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const [openWeeks, setOpenWeeks] = useState<Set<string>>(new Set(['۱']));

  const toggle = (week: string) => {
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      next.has(week) ? next.delete(week) : next.add(week);
      return next;
    });
  };

  return (
    <section id="schedule" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#12BD77]" />
            <span className="text-[#12BD77] text-sm font-semibold uppercase tracking-widest">Schedule</span>
            <span className="w-8 h-px bg-[#12BD77]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mb-3">برنامه‌ی بوت‌کمپ</h2>
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-2.5 shadow-sm border border-gray-200 text-sm text-[#374151] font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#12BD77]" />۶ هفته</span>
            <span className="text-gray-300">|</span>
            <span>پنج‌شنبه و جمعه</span>
            <span className="text-gray-300">|</span>
            <span>ساعت ۱۴ تا ۱۷</span>
          </div>
        </div>

        <div className="space-y-4">
          {PROGRAM_WEEKS.map((wk) => (
            <div key={wk.week} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Week header — clickable accordion */}
              <button
                onClick={() => toggle(wk.week)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#F0FDF7] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 bg-[#1A1A2E] text-white rounded-xl flex items-center justify-center font-black text-sm">
                    {wk.week}
                  </span>
                  <span className="font-bold text-[#1A1A2E]">هفته‌ی {wk.week}</span>
                  <span className="text-sm text-[#6B7280] hidden sm:block">
                    — {wk.days[0].day} {wk.days[0].date}
                    {wk.days[1] ? ` و ${wk.days[1].day} ${wk.days[1].date}` : ''}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-[#6B7280] transition-transform duration-200 ${openWeeks.has(wk.week) ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openWeeks.has(wk.week) && (
                <div className="border-t border-gray-100">
                  {wk.days.map((day, di) => (
                    <div key={di} className={di > 0 ? 'border-t border-gray-100' : ''}>
                      {/* Day sub-header */}
                      <div className="flex items-center gap-3 px-6 py-3 bg-[#F5F5F7]">
                        <span className="w-2 h-2 rounded-full bg-[#12BD77]" />
                        <span className="text-sm font-bold text-[#374151]">{day.day} {day.date}</span>
                      </div>

                      {/* Sessions table – desktop */}
                      <div className="hidden sm:block">
                        {day.sessions.map((s, si) => (
                          <div
                            key={si}
                            className="flex items-start gap-0 border-t border-gray-50 hover:bg-[#F9FFF9] transition-colors"
                          >
                            <div className="w-36 flex-shrink-0 px-6 py-3">
                              <span className="inline-block bg-[#E8FBF3] text-[#0E9A61] text-xs font-medium px-2.5 py-1 rounded-lg">
                                {s.time}
                              </span>
                            </div>
                            <div className="flex-1 px-4 py-3 border-r border-gray-100">
                              <span className="text-sm text-[#1A1A2E] font-medium leading-snug">{s.topic}</span>
                            </div>
                            {s.instructor && (
                              <div className="w-48 flex-shrink-0 px-4 py-3 text-sm text-[#6B7280]">
                                {s.instructor}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Sessions – mobile cards */}
                      <div className="sm:hidden divide-y divide-gray-50">
                        {day.sessions.map((s, si) => (
                          <div key={si} className="px-5 py-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-block bg-[#E8FBF3] text-[#0E9A61] text-xs font-medium px-2 py-0.5 rounded-md">
                                {s.time}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-[#1A1A2E] leading-snug mb-0.5">{s.topic}</p>
                            {s.instructor && <p className="text-xs text-[#6B7280]">{s.instructor}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoPlaceholder({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24 rounded-2xl bg-gray-200 flex items-center justify-center">
        <span className="text-2xl font-black text-gray-500">{abbr}</span>
      </div>
      <span className="text-xs text-[#6B7280] text-center max-w-[120px] leading-snug">{name}</span>
    </div>
  );
}

function OrganizersSection() {
  return (
    <section id="organizers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#12BD77]" />
            <span className="text-[#12BD77] text-sm font-semibold uppercase tracking-widest">Organizers</span>
            <span className="w-8 h-px bg-[#12BD77]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E]">برگزارکنندگان</h2>
        </div>

        {/* Logo strip */}
        <div className="bg-[#F5F5F7] rounded-3xl py-12 px-8 mb-14">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 lg:gap-24">
            {/* PLACEHOLDER: Replace these with actual organization logos */}
            <div className="logo-grayscale"><LogoPlaceholder name="دانشگاه علامه طباطبائی" abbr="ع‌ط" /></div>
            <div className="hidden sm:block w-px h-20 bg-gray-300" />
            <div className="logo-grayscale"><LogoPlaceholder name="مؤسسه پردازش و تحلیل داده دقیقه" abbr="دق" /></div>
            <div className="hidden sm:block w-px h-20 bg-gray-300" />
            <div className="logo-grayscale"><LogoPlaceholder name="مؤسسه حامی علوم انسانی" abbr="حا" /></div>
          </div>
        </div>

        {/* Executive team */}
        <h3 className="text-xl font-bold text-[#1A1A2E] text-center mb-8">کمیته‌ی اجرایی</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.role + member.name} className="text-center group">
              <div className="w-24 h-24 mx-auto mb-3 rounded-2xl overflow-hidden bg-[#F5F5F7] border border-gray-100 group-hover:shadow-lg group-hover:shadow-[#12BD77]/10 transition-all duration-300">
                <img
                  src={member.photo}
                  alt={`تصویر ${member.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="text-xs font-bold text-[#1A1A2E] mb-0.5">{member.name}</div>
              <div className="text-[10px] text-[#6B7280] leading-tight mb-1 px-1">{member.affiliation}</div>
              <span className="inline-block px-2.5 py-1 bg-[#E8FBF3] text-[#0E9A61] text-[10px] font-semibold rounded-full">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'نام و نام خانوادگی الزامی است';
    if (!form.email.trim()) e.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'ایمیل نامعتبر است';
    if (!form.subject.trim()) e.subject = 'موضوع الزامی است';
    if (!form.message.trim()) e.message = 'متن پیام الزامی است';
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Send via mailto — opens the user's mail client addressed to info@atu-dh.ir
    const body = `نام: ${form.name}\nایمیل: ${form.email}\n\n${form.message}`;
    const mailto = `mailto:info@atu-dh.ir?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  const field = (key: keyof typeof form, label: string, type = 'text', multiline = false) => (
    <div>
      <label className="block text-sm font-semibold text-[#374151] mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={form[key]}
          onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-right resize-none focus:outline-none focus:ring-2 focus:ring-[#12BD77]/50 transition-colors ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-[#12BD77]'}`}
          placeholder={`${label} را وارد کنید`}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
          className={`w-full px-4 py-3 rounded-xl border text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#12BD77]/50 transition-colors ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-[#12BD77]'}`}
          placeholder={`${label} را وارد کنید`}
        />
      )}
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <section id="contact" className="py-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#12BD77]" />
            <span className="text-[#12BD77] text-sm font-semibold uppercase tracking-widest">Contact</span>
            <span className="w-8 h-px bg-[#12BD77]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E]">تماس با ما</h2>
        </div>

        <div className="flex flex-col lg:flex-row-reverse gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-[#E8FBF3] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#12BD77]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">پیام ارسال شد!</h3>
                <p className="text-sm text-[#6B7280]">برنامه‌ی ایمیل شما برای ارسال پیام به info@atu-dh.ir باز شد.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {field('name', 'نام و نام خانوادگی')}
                  {field('email', 'ایمیل', 'email')}
                </div>
                {field('subject', 'موضوع')}
                {field('message', 'پیام', 'text', true)}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#12BD77] text-white rounded-xl font-bold text-sm hover:bg-[#0E9A61] focus:outline-none focus:ring-2 focus:ring-[#12BD77]/50 transition-all flex items-center justify-center gap-2"
                >
                  ارسال پیام
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'ایمیل',
                value: 'info@atu-dh.ir',
                href: 'mailto:info@atu-dh.ir',
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                label: 'تماس با پشتیبانی (در تلگرام)',
                value: '@atudh_support',
                href: 'https://t.me/atudh_support',
              },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-200 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#E8FBF3] text-[#12BD77] rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-[#6B7280] mb-0.5">{item.label}</div>
                  <a href={item.href} className="text-sm font-semibold text-[#1A1A2E] hover:text-[#12BD77] transition-colors">
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F0F1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#12BD77]" />
              <span className="font-black text-lg">بوت‌کمپ عاد</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {EVENT_TITLE}
            </p>
            {/* Social icons — X removed per requirements */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: 'Instagram',
                  href: '#', // PLACEHOLDER
                  icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>,
                },
                {
                  label: 'Telegram',
                  href: 'https://t.me/atudh_support',
                  icon: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>,
                },
                {
                  label: 'LinkedIn',
                  href: '#', // PLACEHOLDER
                  icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#12BD77] rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="font-bold text-sm mb-5 text-gray-300 uppercase tracking-widest">پیوندها</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-[#12BD77] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm mb-5 text-gray-300 uppercase tracking-widest">اطلاعات تماس</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="font-semibold text-white">دانشگاه علامه طباطبائی</p>
              <p>
                <a href="mailto:info@atu-dh.ir" className="hover:text-[#12BD77] transition-colors">
                  info@atu-dh.ir
                </a>
              </p>
              <p>
                <a href="https://t.me/atudh_support" target="_blank" rel="noopener noreferrer" className="hover:text-[#12BD77] transition-colors">
                  تلگرام: @atudh_support
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row-reverse items-center justify-between gap-3 text-xs text-gray-500">
          <span>{EVENT_TITLE} | ۱۴۰۵</span>
          <span>تمامی حقوق محفوظ است</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const sectionIds = ['about', 'topics', 'instructors', 'schedule', 'organizers', 'contact'];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div dir="rtl" className="min-h-screen">
      <NavBar activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <TopicsSection />
        <InstructorsSection />
        <ScheduleSection />
        <OrganizersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
