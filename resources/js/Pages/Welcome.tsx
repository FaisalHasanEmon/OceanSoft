import { useEffect, useState } from 'react';
import {
    ArrowRight,
    BarChart3,
    Check,
    ChevronDown,
    ChevronRight,
    Code2,
    Globe2,
    Languages,
    Layers3,
    Menu,
    Moon,
    Palette,
    Play,
    Rocket,
    Search,
    ShoppingBag,
    Sparkles,
    Sun,
    X,
    Zap,
} from 'lucide-react';
import { DEFAULT_LANG, Lang, t } from '../i18n';

function Logo({ light = false }: { light?: boolean }) {
    return <img src="images/oceansoft-logo.png" alt="OceanSoft" className={`h-9 w-auto object-contain ${light ? 'brightness-0 invert' : ''}`} />;
}

function Button({ children, variant = 'primary', href = '#contact', onClick, className = '' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'text'; href?: string; onClick?: () => void; className?: string }) {
    const styles = variant === 'primary'
        ? 'bg-[#0c969c] text-white shadow-[0_10px_30px_rgba(12,150,156,.22)] hover:bg-[#087d83] dark:shadow-none'
        : variant === 'secondary'
            ? 'border border-[#c7d7df] bg-white text-[#0d2942] hover:border-[#0c969c] hover:text-[#087d83] dark:bg-[#163850] dark:border-[#3d6073] dark:text-white dark:hover:border-[#69d0d0] dark:hover:text-[#69d0d0]'
            : 'text-[#0c7e85] hover:text-[#064f5a] dark:text-[#69d0d0] dark:hover:text-[#8ae0e0]';
    return <a href={href} onClick={onClick} className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${styles} ${className}`}>{children}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></a>;
}

function BrowserPreview({ type, compact = false, imgUrl }: { type?: string; compact?: boolean; imgUrl?: string }) {
    const defaultImg = type === 'furniture'
        ? 'images/bannerImages/furnessia.png'
        : type === 'fashion'
            ? 'images/bannerImages/travels.png'
            : 'images/bannerImages/femalehealthcare.png';

    const bgImage = imgUrl || defaultImg;

    return (
        <div className={`flex flex-col overflow-hidden rounded-[18px] border border-white/70 bg-white shadow-2xl dark:border-[#274d60]/50 dark:bg-[#163850] ${compact ? 'h-[185px]' : 'h-[245px]'}`}>
            <div className="flex h-7 shrink-0 items-center gap-1 border-b border-slate-100 bg-white px-3 dark:border-[#274d60]/50 dark:bg-[#163850]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e5a29d]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#e6c47b]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#79bdbb]" />
                <div className="mx-auto h-2 w-24 rounded-full bg-slate-100 dark:bg-[#0d2942]" />
            </div>
            <div
                className="flex-1 w-full bg-cover bg-no-repeat bg-top"
                style={{ backgroundImage: `url('${bgImage}')` }}
            />
        </div>
    );
}

export default function Welcome() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [productFilter, setProductFilter] = useState('All');
    const [openFaq, setOpenFaq] = useState(0);
    const [showNotice, setShowNotice] = useState(false);

    const [lang, setLang] = useState<Lang>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('lang') as Lang;
            if (saved === 'en' || saved === 'bn') return saved;
        }
        return DEFAULT_LANG;
    });
    console.log(lang);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved === 'dark' || saved === 'light') return saved;
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lang', lang);
            document.documentElement.lang = lang;
        }
    }, [lang]);

    const closeMenu = () => setMenuOpen(false);

    const products = [
        { name: t(lang, 'p1_name'), category: t(lang, 'p1_category'), rawCategory: 'E-commerce', price: '$299', description: t(lang, 'p1_desc'), type: 'furniture' },
        { name: t(lang, 'p2_name'), category: t(lang, 'p2_category'), rawCategory: 'E-commerce', price: '$349', description: t(lang, 'p2_desc'), type: 'fashion' },
        { name: t(lang, 'p3_name'), category: t(lang, 'p3_category'), rawCategory: 'Business', price: '$199', description: t(lang, 'p3_desc'), type: 'business' },
    ];

    const faqs: [string, string][] = [
        [t(lang, 'faq_q1'), t(lang, 'faq_a1')],
        [t(lang, 'faq_q2'), t(lang, 'faq_a2')],
        [t(lang, 'faq_q3'), t(lang, 'faq_a3')],
        [t(lang, 'faq_q4'), t(lang, 'faq_a4')],
        [t(lang, 'faq_q5'), t(lang, 'faq_a5')],
    ];

    const filterOptions = [
        { key: 'All', label: t(lang, 'filter_all') },
        { key: 'E-commerce', label: t(lang, 'filter_ecommerce') },
        { key: 'Business', label: t(lang, 'filter_business') },
        { key: 'Landing pages', label: t(lang, 'filter_landing') },
        { key: 'SaaS', label: t(lang, 'filter_saas') },
    ];

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f7fafb] text-[#0d2942] dark:bg-[#0d2942] dark:text-white transition-colors duration-300">
            <header className={`fixed inset-x-0 top-2 z-50 transition-all duration-300 `}>
                <div className={`mx-auto border rounded-full backdrop-blur-sm flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-5 transition-all duration-300 ${scrolled ? 'border-[#dce8ed] bg-[#f7fafb]/95 shadow-sm backdrop-blur-xl dark:border-[#274d60]/50 dark:bg-[#0d2942]/95' : 'bg-white/30 border-white/20 dark:bg-transparent dark:border-[rgba(255,255,255,0.08)]'} drop-shadow-sm shadow-[#0c7e85] dark:shadow-none`}>
                    <a href="#top" onClick={closeMenu} className="shrink-0"><Logo light={theme === 'dark'} /></a>
                    <nav className="hidden items-center gap-7 lg:flex">
                        {[
                            [t(lang, 'nav_products'), '#products'],
                            [t(lang, 'nav_services'), '#services'],
                            [t(lang, 'nav_work'), '#work'],
                            [t(lang, 'nav_pricing'), '#pricing'],
                            [t(lang, 'nav_about'), '#about']
                        ].map(([label, href]) => (
                            <a key={href} href={href} className="group flex items-center gap-1 text-[13px] font-bold text-[#083154] transition hover:text-[#0c969c] dark:text-[#a8bfca] dark:hover:text-[#69d0d0]">
                                {label}
                                {(href === '#products' || href === '#services') && <ChevronDown size={13} className="transition group-hover:rotate-180" />}
                            </a>
                        ))}
                    </nav>
                    <div className="hidden items-center gap-3 lg:flex">
                        {/* Language Switcher */}
                        <div className="flex items-center rounded-full border border-[#cadbe2] p-0.5 bg-white/50 dark:bg-[#163850]/50 dark:border-[#2d4a5e] text-xs font-bold">
                            <button
                                onClick={() => setLang('bn')}
                                className={`px-2.5 py-1 rounded-full transition-all ${lang === 'bn' ? 'bg-[#0c969c] text-white shadow-sm' : 'text-[#083154] dark:text-[#a8bfca] hover:text-[#0c969c]'}`}
                                aria-label="বাংলা"
                            >
                                বাংলা
                            </button>
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2.5 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-[#0c969c] text-white shadow-sm' : 'text-[#083154] dark:text-[#a8bfca] hover:text-[#0c969c]'}`}
                                aria-label="English"
                            >
                                EN
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="rounded-full border border-[#cadbe2] p-2.5 text-[#083154] hover:border-[#0c969c] hover:text-[#0c969c] dark:border-[#2d4a5e] dark:text-[#a8bfca] dark:hover:border-[#69d0d0] dark:hover:text-[#69d0d0] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>

                        <a href="#contact" className="px-3 lg:px-5 text-[13px] font-bold text-[#083154] hover:text-[#0c969c] dark:text-[#a8bfca] dark:hover:text-[#69d0d0]">{t(lang, 'nav_contact')}</a>
                        <Button>{t(lang, 'nav_get_started')}</Button>
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        {/* Mobile Language Switcher */}
                        <div className="flex items-center rounded-full border border-[#cadbe2] p-0.5 bg-white/50 dark:bg-[#163850]/50 dark:border-[#2d4a5e] text-[11px] font-bold">
                            <button
                                onClick={() => setLang('bn')}
                                className={`px-2 py-0.5 rounded-full transition-all ${lang === 'bn' ? 'bg-[#0c969c] text-white' : 'text-[#083154] dark:text-[#a8bfca]'}`}
                            >
                                বাংলা
                            </button>
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2 py-0.5 rounded-full transition-all ${lang === 'en' ? 'bg-[#0c969c] text-white' : 'text-[#083154] dark:text-[#a8bfca]'}`}
                            >
                                EN
                            </button>
                        </div>

                        <button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            className="rounded-full border border-[#cadbe2] p-2 text-[#083154] hover:border-[#0c969c] hover:text-[#0c969c] dark:border-[#2d4a5e] dark:text-[#a8bfca] dark:hover:border-[#69d0d0] dark:hover:text-[#69d0d0] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                        <button className="rounded-full border border-[#cadbe2] p-2 text-[#083154] hover:text-[#0c969c] dark:border-[#2d4a5e] dark:text-white dark:hover:text-[#69d0d0]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="border-t border-[#dce8ed] dark:border-[#274d60]/50 bg-[#f7fafb] dark:bg-[#0d2942]/95 px-5 py-5 lg:hidden">
                        <div className="flex flex-col gap-4">
                            {[
                                [t(lang, 'nav_products'), '#products'],
                                [t(lang, 'nav_services'), '#services'],
                                [t(lang, 'nav_work'), '#work'],
                                [t(lang, 'nav_pricing'), '#pricing'],
                                [t(lang, 'nav_about'), '#about'],
                                [t(lang, 'nav_contact'), '#contact']
                            ].map(([label, href]) => (
                                <a onClick={closeMenu} key={href} href={href} className="text-sm font-bold text-[#274d60] dark:text-[#a8bfca] dark:hover:text-white">{label}</a>
                            ))}
                            <Button>{t(lang, 'nav_get_started')}</Button>
                        </div>
                    </div>
                )}
            </header>

            <main id="top">
                {/* Hero Section */}
                <section className="relative mx-auto max-w-[1240px] px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-48">
                    <div className="absolute right-[-15%] top-0 -z-10 h-[580px] w-[580px] rounded-full bg-[#dff2f3] blur-3xl opacity-70 dark:bg-[#0c969c]/10 dark:opacity-40" />
                    <div className="grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
                        <div className="max-w-xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b9dfe1] bg-white px-3 py-1.5 text-[10px] font-black tracking-[.16em] text-[#0c7e85] dark:border-[#274d60] dark:bg-[#163850] dark:text-[#69d0d0]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#0c969c] dark:bg-[#69d0d0]" />
                                {t(lang, 'hero_badge')}
                            </div>
                            <h1 className="text-6xl font-black leading-[.96] tracking-[-.06em] text-[#0d2942] sm:text-7xl lg:text-[88px] dark:text-white">
                                {t(lang, 'hero_h1_build')}<br />
                                <span className="text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'hero_h1_launch')}</span><br />
                                {t(lang, 'hero_h1_grow')}
                            </h1>
                            <p className="mt-7 max-w-lg text-lg leading-8 text-[#587184] dark:text-[#a8bfca]">
                                {t(lang, 'hero_desc')}
                            </p>
                            <div className="mt-9 flex flex-wrap gap-3">
                                <Button href="#products">{t(lang, 'hero_btn_explore')}</Button>
                                <Button href="#contact" variant="secondary">{t(lang, 'hero_btn_start')}</Button>
                            </div>
                            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#668292] dark:text-[#a8bfca]">
                                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#0c969c] dark:text-[#69d0d0]" /> {t(lang, 'hero_check1')}</span>
                                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#0c969c] dark:text-[#69d0d0]" /> {t(lang, 'hero_check2')}</span>
                                <span className="flex items-center gap-1.5"><Check size={14} className="text-[#0c969c] dark:text-[#69d0d0]" /> {t(lang, 'hero_check3')}</span>
                            </div>
                        </div>
                        <div className="relative min-h-[450px] lg:min-h-[540px]">
                            <div className="absolute left-2 top-12 w-[78%] rotate-[-6deg] transition-transform duration-700 hover:rotate-[-3deg] lg:left-5"><BrowserPreview type="furniture" /></div>
                            <div className="absolute right-0 top-0 z-10 w-[76%] rotate-[5deg] transition-transform duration-700 hover:rotate-[2deg] lg:right-2"><BrowserPreview type="business" /></div>
                            <div className="absolute bottom-0 left-[18%] z-20 w-[65%] rotate-[-2deg] transition-transform duration-700 hover:rotate-0"><BrowserPreview type="fashion" /></div>
                            <div className="absolute bottom-7 right-[-10px] z-30 flex items-center gap-2 rounded-full border border-white bg-white/90 px-3 py-2 text-[10px] font-black text-[#274d60] shadow-xl backdrop-blur dark:border-[#274d60] dark:bg-[#163850]/90 dark:text-white">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0c969c] dark:bg-[#69d0d0] text-white"><Zap size={12} /></span>
                                {t(lang, 'hero_momentum')}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ticker Section */}
                <section className="border-y border-[#e2edf0] bg-white py-5 dark:border-[#274d60]/50 dark:bg-[#163850]/50">
                    <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-5 overflow-hidden px-5 text-[10px] font-black tracking-[.17em] text-[#8aa0ad] lg:px-8 dark:text-[#a8bfca]/80">
                        <span>{t(lang, 'ticker1')}</span>
                        <span className="hidden sm:block">{t(lang, 'ticker2')}</span>
                        <span>{t(lang, 'ticker3')}</span>
                        <span className="hidden sm:block">{t(lang, 'ticker4')}</span>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="mx-auto max-w-[1240px] scroll-mt-24 px-5 py-24 lg:px-8 lg:py-32">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'products_label')}</p>
                            <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t(lang, 'products_h2_a')}<br /><span className="text-[#7091a1] dark:text-[#a8bfca]">{t(lang, 'products_h2_b')}</span></h2>
                        </div>
                        <p className="max-w-sm text-sm leading-6 text-[#668292] dark:text-[#a8bfca]">{t(lang, 'products_desc')}</p>
                    </div>

                    {/* Filter buttons */}
                    <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
                        {filterOptions.map(option => (
                            <button
                                key={option.key}
                                onClick={() => setProductFilter(option.key)}
                                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition ${productFilter === option.key ? 'bg-[#0d2942] text-white dark:bg-[#0c969c]' : 'border border-[#d8e5e9] bg-white text-[#6b8492] hover:border-[#0c969c] dark:border-[#2d4a5e] dark:bg-[#163850] dark:text-[#a8bfca] dark:hover:border-[#69d0d0]'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    {/* Product Cards Grid */}
                    <div className="mt-7 grid gap-5 md:grid-cols-3">
                        {products.filter(product => productFilter === 'All' || product.rawCategory === productFilter || (productFilter === 'E-commerce' && product.rawCategory === 'E-commerce')).map(product => (
                            <article key={product.name} className="group overflow-hidden rounded-[24px] border border-[#dce9ed] bg-white shadow-[0_8px_30px_rgba(23,64,83,.04)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(23,64,83,.12)] dark:border-[#274d60] dark:bg-[#163850] dark:shadow-none">
                                <div className="overflow-hidden p-3 pb-0">
                                    <div className="transition duration-700 group-hover:scale-[1.025]">
                                        <BrowserPreview type={product.type} />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="rounded-full bg-[#e5f4f4] px-2.5 py-1 text-[10px] font-black text-[#087d83] dark:bg-[#0d2942] dark:text-[#69d0d0]">{product.category}</span>
                                        <span className="text-lg font-black">{product.price}</span>
                                    </div>
                                    <h3 className="text-xl font-black">{product.name}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[#668292] dark:text-[#a8bfca]">{product.description}</p>
                                    <div className="mt-5 flex items-center justify-between border-t border-[#edf2f4] pt-4 dark:border-[#2d4a5e]">
                                        <span className="text-[10px] font-bold text-[#8ba0ad] dark:text-[#a8bfca]/70">{t(lang, 'product_tech')}</span>
                                        <a href="#contact" className="flex items-center gap-1 text-xs font-black text-[#0c7e85] dark:text-[#69d0d0]">{t(lang, 'product_item_details')} <ChevronRight size={14} /></a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <a href="#products" className="inline-flex items-center gap-2 text-sm font-black text-[#0c7e85] dark:text-[#69d0d0] hover:gap-3 transition-all">{t(lang, 'products_view_all')} <ArrowRight size={16} /></a>
                    </div>
                </section>

                {/* Two Ways Forward Section */}
                <section className="bg-[#0d2942] py-24 text-white lg:py-32">
                    <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="mb-3 text-xs font-black tracking-[.2em] text-[#69d0d0]">{t(lang, 'two_label')}</p>
                            <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t(lang, 'two_h2')}<br /><span className="text-[#69d0d0]">{t(lang, 'two_h2_sub')}</span></h2>
                        </div>
                        <div className="mt-12 grid gap-4 lg:grid-cols-2">
                            {/* Buy Card */}
                            <div className="group rounded-[26px] border border-[#3d6073] bg-[#163850] p-7 transition hover:border-[#69d0d0] lg:p-9">
                                <div className="flex items-center justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f4f4] text-[#0c969c]"><ShoppingBag size={22} /></span>
                                    <span className="text-xs font-black text-[#80a0af]">{t(lang, 'buy_label')}</span>
                                </div>
                                <h3 className="mt-10 text-2xl font-black">{t(lang, 'buy_h3')}</h3>
                                <p className="mt-3 max-w-sm text-sm leading-6 text-[#a8bfca]">{t(lang, 'buy_desc')}</p>
                                <ul className="mt-7 grid gap-3 text-sm font-bold text-[#dbe9ed] sm:grid-cols-2">
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'buy_feat1')}</li>
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'buy_feat2')}</li>
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'buy_feat3')}</li>
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'buy_feat4')}</li>
                                </ul>
                                <a href="#products" className="mt-9 inline-flex items-center gap-2 text-sm font-black text-[#69d0d0]">{t(lang, 'buy_cta')} <ArrowRight size={16} /></a>
                            </div>

                            {/* Build Card */}
                            <div className="group rounded-[26px] border border-[#3d6073] bg-[#0f3048] p-7 transition hover:border-[#69d0d0] lg:p-9">
                                <div className="flex items-center justify-between">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c969c] text-white"><Code2 size={22} /></span>
                                    <span className="text-xs font-black text-[#80a0af]">{t(lang, 'build_label')}</span>
                                </div>
                                <h3 className="mt-10 text-2xl font-black">{t(lang, 'build_h3')}</h3>
                                <p className="mt-3 max-w-sm text-sm leading-6 text-[#a8bfca]">{t(lang, 'build_desc')}</p>
                                <ul className="mt-7 grid gap-3 text-sm font-bold text-[#dbe9ed] sm:grid-cols-2">
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'build_feat1')}</li>
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'build_feat2')}</li>
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'build_feat3')}</li>
                                    <li className="flex gap-2"><Check size={16} className="text-[#69d0d0]" /> {t(lang, 'build_feat4')}</li>
                                </ul>
                                <a href="#contact" className="mt-9 inline-flex items-center gap-2 text-sm font-black text-[#69d0d0]">{t(lang, 'build_cta')} <ArrowRight size={16} /></a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services / Studio Section */}
                <section id="services" className="scroll-mt-24 border-b border-[#e1ecef] bg-[#f7fafb] py-24 lg:py-32 dark:border-[#274d60]/50 dark:bg-[#0e2c45]">
                    <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
                            <div>
                                <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'services_label')}</p>
                                <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t(lang, 'services_h2')}<br /><span className="text-[#7091a1] dark:text-[#a8bfca]">{t(lang, 'services_h2_sub')}</span></h2>
                                <p className="mt-5 max-w-sm text-sm leading-7 text-[#668292] dark:text-[#a8bfca]">{t(lang, 'services_desc')}</p>
                                <Button href="#contact" className="mt-8">{t(lang, 'services_cta')}</Button>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {[
                                    ['01', t(lang, 'step1_title'), t(lang, 'step1_desc'), Search],
                                    ['02', t(lang, 'step2_title'), t(lang, 'step2_desc'), Palette],
                                    ['03', t(lang, 'step3_title'), t(lang, 'step3_desc'), Code2],
                                    ['04', t(lang, 'step4_title'), t(lang, 'step4_desc'), Rocket],
                                    ['05', t(lang, 'step5_title'), t(lang, 'step5_desc'), Layers3]
                                ].map(([number, title, description, Icon]) => (
                                    <div key={String(number)} className="rounded-2xl border border-[#dce9ed] bg-white p-5 transition hover:-translate-y-1 hover:border-[#9bd3d5] dark:border-[#274d60] dark:bg-[#163850] dark:hover:border-[#69d0d0]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-[#0c969c] dark:text-[#69d0d0]">{number as string}</span>
                                            {typeof Icon !== 'string' && <Icon size={18} className="text-[#668292] dark:text-[#a8bfca]" />}
                                        </div>
                                        <h3 className="mt-10 font-black dark:text-white">{title as string}</h3>
                                        <p className="mt-2 text-xs leading-5 text-[#668292] dark:text-[#a8bfca]">{description as string}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Selected Work Section */}
                <section id="work" className="scroll-mt-24 mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
                    <div className="flex items-end justify-between gap-5">
                        <div>
                            <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'work_label')}</p>
                            <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t(lang, 'work_h2')}<br /><span className="text-[#7091a1] dark:text-[#a8bfca]">{t(lang, 'work_h2_sub')}</span></h2>
                        </div>
                        <a href="#contact" className="hidden items-center gap-2 text-sm font-black text-[#0c7e85] dark:text-[#69d0d0] sm:flex">{t(lang, 'work_view_all')} <ArrowRight size={16} /></a>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <div className="group overflow-hidden rounded-[24px] bg-[#e3eef0] dark:bg-[#163850] p-5">
                                <div className="relative min-h-[290px] overflow-hidden rounded-2xl bg-[#c4dce0] dark:bg-[#204965] p-7">
                                    <div className="absolute right-[-6%] top-[-22%] h-80 w-80 rounded-full border-[38px] border-[#0c969c]/30 dark:border-[#69d0d0]/20" />
                                    <p className="relative max-w-xs text-4xl font-black leading-[.98] text-[#0d2942] dark:text-white">{t(lang, 'work1_quote')}</p>
                                    <div className="absolute bottom-6 left-7 right-7 flex items-end justify-between">
                                        <div className="h-24 w-36 rounded-xl bg-white/80 dark:bg-[#163850]/90 p-3 shadow-lg">
                                            <div className="h-2 w-10 rounded-full bg-[#0c969c] dark:bg-[#69d0d0]" />
                                            <div className="mt-3 h-2 w-20 rounded-full bg-[#bdd2d7] dark:bg-[#2d4a5e]" />
                                            <div className="mt-2 h-2 w-14 rounded-full bg-[#d7e6e9] dark:bg-[#385b72]" />
                                        </div>
                                        <div className="h-40 w-44 rounded-t-[70px] bg-[#84aeb5] dark:bg-[#27627a]" />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <p className="text-xs font-black tracking-[.15em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'work1_tag')}</p>
                                    <h3 className="mt-2 text-xl font-black dark:text-white">{t(lang, 'work1_h3')}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-[24px] bg-[#f0e5df] dark:bg-[#1a3547] p-5">
                            <div className="relative min-h-[290px] overflow-hidden rounded-2xl bg-[#dcc9bf] dark:bg-[#2b4c5b] p-6">
                                <div className="absolute bottom-0 right-5 h-64 w-44 rounded-t-full bg-[#274d60] dark:bg-[#163850]" />
                                <div className="absolute left-6 top-8 rounded-full bg-[#e7f1f0] dark:bg-[#163850]/90 px-3 py-1 text-[9px] font-black text-[#274d60] dark:text-[#69d0d0]">{t(lang, 'work2_chip')}</div>
                                <p className="relative mt-32 max-w-[160px] text-3xl font-black leading-[.95] text-[#274d60] dark:text-white">{t(lang, 'work2_quote')}</p>
                            </div>
                            <div className="mt-5">
                                <p className="text-xs font-black tracking-[.15em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'work2_tag')}</p>
                                <h3 className="mt-2 text-xl font-black dark:text-white">{t(lang, 'work2_h3')}</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Toolkit Section */}
                <section className="border-y border-[#e0ecef] bg-white py-20 dark:border-[#274d60]/50 dark:bg-[#163850]/50">
                    <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
                        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                            <div>
                                <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'tech_label')}</p>
                                <h2 className="text-3xl font-black tracking-[-.03em] dark:text-white">{t(lang, 'tech_h2')}</h2>
                            </div>
                            <p className="max-w-sm text-sm leading-6 text-[#668292] dark:text-[#a8bfca]">{t(lang, 'tech_desc')}</p>
                        </div>
                        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#dce9ed] bg-[#dce9ed] sm:grid-cols-4 dark:border-[#274d60] dark:bg-[#274d60]">
                            {[
                                [t(lang, 'tech_frontend'), t(lang, 'tech_frontend_val')],
                                [t(lang, 'tech_backend'), t(lang, 'tech_backend_val')],
                                [t(lang, 'tech_database'), t(lang, 'tech_database_val')],
                                [t(lang, 'tech_tools'), t(lang, 'tech_tools_val')]
                            ].map(([title, text]) => (
                                <div key={title} className="bg-white p-5 dark:bg-[#163850]">
                                    <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#0c969c] dark:text-[#69d0d0]">{title}</p>
                                    <p className="mt-3 text-sm font-bold leading-6 text-[#274d60] dark:text-[#a8bfca]">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why OceanSoft Section */}
                <section id="about" className="scroll-mt-24 mx-auto max-w-[1240px] px-5 py-24 lg:px-8 lg:py-32">
                    <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
                        <div>
                            <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'about_label')}</p>
                            <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t(lang, 'about_h2')}<br /><span className="text-[#7091a1] dark:text-[#a8bfca]">{t(lang, 'about_h2_sub')}</span></h2>
                            <p className="mt-6 max-w-md text-sm leading-7 text-[#668292] dark:text-[#a8bfca]">{t(lang, 'about_desc')}</p>
                        </div>
                        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                            {[
                                ['01', t(lang, 'about_feat1_title'), t(lang, 'about_feat1_desc')],
                                ['02', t(lang, 'about_feat2_title'), t(lang, 'about_feat2_desc')],
                                ['03', t(lang, 'about_feat3_title'), t(lang, 'about_feat3_desc')],
                                ['04', t(lang, 'about_feat4_title'), t(lang, 'about_feat4_desc')],
                                ['05', t(lang, 'about_feat5_title'), t(lang, 'about_feat5_desc')],
                                ['06', t(lang, 'about_feat6_title'), t(lang, 'about_feat6_desc')]
                            ].map(([number, title, text]) => (
                                <div key={number} className="border-t border-[#dce9ed] dark:border-[#274d60] pt-4">
                                    <span className="text-xs font-black text-[#0c969c] dark:text-[#69d0d0]">{number}</span>
                                    <h3 className="mt-4 font-black dark:text-white">{title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[#668292] dark:text-[#a8bfca]">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Client Notes / Testimonials Section */}
                <section className="bg-[#eaf4f5] dark:bg-[#163850]/40 py-20">
                    <div className="mx-auto max-w-3xl px-5 text-center">
                        <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'testimonial_label')}</p>
                        <h2 className="text-4xl font-black tracking-[-.04em] dark:text-white">{t(lang, 'testimonial_h2')}</h2>
                        <div className="mt-8 rounded-[24px] border border-[#c9e1e3] bg-white p-8 text-left shadow-sm dark:border-[#274d60] dark:bg-[#163850] dark:shadow-none">
                            <div className="flex gap-1 text-[#0c969c] dark:text-[#69d0d0]">{[1, 2, 3, 4, 5].map(item => <Sparkles size={15} key={item} />)}</div>
                            <p className="mt-5 text-xl font-bold leading-8 text-[#274d60] dark:text-white">{t(lang, 'testimonial_quote')}</p>
                            <p className="mt-6 text-xs font-black uppercase tracking-[.16em] text-[#77919e] dark:text-[#a8bfca]">{t(lang, 'testimonial_author')}</p>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mx-auto max-w-3xl px-5 py-24 lg:py-32">
                    <p className="mb-3 text-xs font-black tracking-[.2em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'faq_label')}</p>
                    <h2 className="text-4xl font-black tracking-[-.04em] sm:text-5xl dark:text-white">{t(lang, 'faq_h2')}<br /><span className="text-[#7091a1] dark:text-[#a8bfca]">{t(lang, 'faq_h2_sub')}</span></h2>
                    <div className="mt-10 divide-y divide-[#dce9ed] dark:divide-[#274d60] border-y border-[#dce9ed] dark:border-[#274d60]">
                        {faqs.map(([question, answer], index) => (
                            <div key={question}>
                                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-black dark:text-white">
                                    <span>{question}</span>
                                    <ChevronDown size={17} className={`shrink-0 text-[#0c969c] dark:text-[#69d0d0] transition ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && <p className="max-w-2xl pb-5 pr-10 text-sm leading-6 text-[#668292] dark:text-[#a8bfca]">{answer}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Banner Section */}
                <section id="contact" className="scroll-mt-24 px-5 pb-24 lg:px-8 lg:pb-32">
                    <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[30px] bg-[#0c969c] dark:bg-[#0c7e85] px-7 py-12 text-white lg:px-16 lg:py-16">
                        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
                            <div>
                                <p className="mb-4 text-xs font-black tracking-[.2em] text-[#b9f0ee]">{t(lang, 'contact_label')}</p>
                                <h2 className="max-w-xl text-4xl font-black tracking-[-.05em] sm:text-6xl">{t(lang, 'contact_h2')}<br />{t(lang, 'contact_h2_sub')}</h2>
                                <p className="mt-5 max-w-lg text-sm leading-7 text-[#d6f3f2]">{t(lang, 'contact_desc')}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button href="#products" variant="secondary">{t(lang, 'contact_btn_explore')}</Button>
                                <button onClick={() => setShowNotice(true)} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0d2942] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#163d57] dark:bg-[#163850] dark:hover:bg-[#204965] border dark:border-[#274d60]">
                                    {t(lang, 'contact_btn_start')} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#0d2942] px-5 pb-8 pt-16 text-white lg:px-8 border-t dark:border-[#274d60]/50">
                <div className="mx-auto max-w-[1240px]">
                    <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
                        <div>
                            <Logo light />
                            <p className="mt-5 max-w-xs text-sm leading-6 text-[#9db7c3] dark:text-[#a8bfca]">{t(lang, 'footer_desc')}</p>
                            <div className="mt-6 flex gap-3">
                                <a href="#top" aria-label="GitHub" className="rounded-full border border-[#38566a] p-2.5 text-[#9db7c3] hover:border-[#69d0d0] hover:text-[#69d0d0] dark:border-[#2d4a5e] dark:text-[#a8bfca]/80"><Globe2 size={16} /></a>
                                <a href="#top" aria-label="LinkedIn" className="rounded-full border border-[#38566a] p-2.5 text-[#9db7c3] hover:border-[#69d0d0] hover:text-[#69d0d0] dark:border-[#2d4a5e] dark:text-[#a8bfca]/80"><BarChart3 size={16} /></a>
                            </div>
                        </div>
                        {[
                            [t(lang, 'footer_explore'), t(lang, 'footer_explore_links').split(',')],
                            [t(lang, 'footer_company'), t(lang, 'footer_company_links').split(',')],
                            [t(lang, 'footer_contact'), t(lang, 'footer_contact_links').split(',')]
                        ].map(([title, links]) => (
                            <div key={String(title)}>
                                <p className="text-xs font-black uppercase tracking-[.16em] text-[#69d0d0]">{title as string}</p>
                                <div className="mt-5 flex flex-col gap-3">
                                    {(links as string[]).map(link => (
                                        <a href={link.includes('@') ? 'mailto:hello@oceansoft.dev' : `#${link.toLowerCase().replace(/ /g, '-')}`} key={link} className="text-sm text-[#b3c8d0] dark:text-[#a8bfca] transition hover:text-white dark:hover:text-white">{link}</a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#2d4a5e] pt-6 text-xs text-[#7894a3] dark:text-[#a8bfca]/60 sm:flex-row">
                        <span>{t(lang, 'footer_copy')}</span>
                        <div className="flex gap-5">
                            <a href="#top" className="hover:text-white">{t(lang, 'footer_privacy')}</a>
                            <a href="#top" className="hover:text-white">{t(lang, 'footer_terms')}</a>
                            <a href="#top" className="hover:text-white">{t(lang, 'footer_license')}</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal */}
            {showNotice && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0d2942]/60 px-5 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[26px] bg-white dark:bg-[#163850]/95 border dark:border-[#274d60] p-7 shadow-2xl backdrop-blur">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[.16em] text-[#0c969c] dark:text-[#69d0d0]">{t(lang, 'modal_label')}</p>
                                <h2 className="mt-2 text-2xl font-black dark:text-white">{t(lang, 'modal_h2')}</h2>
                            </div>
                            <button onClick={() => setShowNotice(false)} aria-label="Close" className="rounded-full bg-[#edf5f5] dark:bg-[#0d2942] dark:text-white p-2"><X size={17} /></button>
                        </div>
                        <div className="mt-6 grid gap-3">
                            <input className="rounded-xl border border-[#dce9ed] dark:border-[#274d60] bg-white dark:bg-[#0d2942] px-4 py-3 text-sm outline-none focus:border-[#0c969c] dark:focus:border-[#69d0d0] dark:text-white" placeholder={t(lang, 'modal_name')} />
                            <input className="rounded-xl border border-[#dce9ed] dark:border-[#274d60] bg-white dark:bg-[#0d2942] px-4 py-3 text-sm outline-none focus:border-[#0c969c] dark:focus:border-[#69d0d0] dark:text-white" placeholder={t(lang, 'modal_email')} type="email" />
                            <textarea className="min-h-28 rounded-xl border border-[#dce9ed] dark:border-[#274d60] bg-white dark:bg-[#0d2942] px-4 py-3 text-sm outline-none focus:border-[#0c969c] dark:focus:border-[#69d0d0] dark:text-white" placeholder={t(lang, 'modal_message')} />
                            <button onClick={() => setShowNotice(false)} className="mt-2 rounded-full bg-[#0c969c] py-3 text-sm font-black text-white hover:bg-[#087d83]">{t(lang, 'modal_send')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
