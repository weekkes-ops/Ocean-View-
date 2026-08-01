import React, { useState } from 'react';
import oceanViewLogo from '../assets/images/oceanview_resort_logo_1785518556173.jpg';
import {
  FileText,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Printer,
  CheckCircle2,
  MapPin,
  Phone,
  Waves,
  Hotel,
  Wine,
  CalendarHeart,
  Dumbbell,
  Film,
  Trophy,
  Users2,
  Utensils,
  Coffee,
  CreditCard,
  UserCheck,
  CheckSquare,
  BarChart3,
  BookOpen,
  Cpu,
  Lock,
  Globe2,
  Megaphone,
  Share2,
  Target,
  DollarSign,
  Clock,
  Send,
} from 'lucide-react';

export const ProposalView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'offer1_website' | 'offer2_pms' | 'offer3_marketing' | 'investment'
  >('overview');

  return (
    <div className="space-y-6">
      
      {/* Proposal Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src={oceanViewLogo}
            alt="OceanView Resort Logo"
            className="h-16 w-auto object-contain rounded-xl shadow border border-slate-700/60 bg-white p-1 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800/80 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                Official Master Commercial Proposal
              </span>
              <span className="px-2.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800/80 rounded-full text-[10px] font-bold">
                3-Tier Transformation Scope
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              OceanView Country Club & Resort Master Proposal
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              A comprehensive 3-part digital growth & operational technology proposition tailored for <strong>OceanView Country Club & Resort</strong> (10 Sweds Free Avenue, Sussex Village, Sierra Leone | +232-76-862043).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              try {
                window.print();
              } catch (err) {
                console.warn('Printing not supported or blocked:', err);
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 shadow-lg transition-all active:scale-95"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print / Export Proposal</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Executive Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('offer1_website')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'offer1_website'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Globe2 className="w-4 h-4 text-cyan-400" />
          <span>Offer 1: Luxury Website</span>
        </button>

        <button
          onClick={() => setActiveTab('offer2_pms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'offer2_pms'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>Offer 2: Management System</span>
        </button>

        <button
          onClick={() => setActiveTab('offer3_marketing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'offer3_marketing'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Megaphone className="w-4 h-4 text-rose-400" />
          <span>Offer 3: Digital Marketing</span>
        </button>

        <button
          onClick={() => setActiveTab('investment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'investment'
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Investment & Bundling</span>
        </button>
      </div>

      {/* Tab 1: Executive Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" /> Executive Project Proposal Overview
            </h2>
            <div className="text-xs text-slate-300 leading-relaxed space-y-3 font-normal">
              <p>
                <strong>OceanView Country Club & Resort</strong> situated at 10 Sweds Free Avenue, Sussex Village, Sierra Leone (+232-76-862043) is premiering as a flagship luxury destination along the Atlantic coastline. To capture market leadership across local VIP clientele, international tourists, corporate organizations, and the global West African diaspora, OceanView requires a synchronized 3-pillar digital transformation strategy.
              </p>
              <p>
                This proposal presents 3 distinct, high-impact offerings designed to operate either independently or as an integrated, turn-key master ecosystem:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div className="p-5 bg-slate-950 rounded-2xl border border-cyan-800/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">1</div>
                  <h3 className="font-extrabold text-white text-sm">Luxury Public Website</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Ultra-fast, mobile-responsive flagship website featuring 3D virtual tours, instant online booking engine, 10-outlet showcase, and automated concierge inquiry forms.
                  </p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-amber-800/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center font-bold">2</div>
                  <h3 className="font-extrabold text-white text-sm">Resort Management System</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Full-stack operational ERP linking all 10 outlets, guest CRM, express POS cashier terminal, real-time staff task dispatches, financial analytics, and Aura Gemini 3.6 AI.
                  </p>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-rose-800/60 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-950 text-rose-400 flex items-center justify-center font-bold">3</div>
                  <h3 className="font-extrabold text-white text-sm">360° Digital Marketing</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Data-driven brand marketing campaigns across Instagram, TikTok, Meta Ads, Google SEO, influencer hosting, outdoor signage, and targeted diaspora outreach.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Strategic Objectives & Key Performance Indicators (KPIs)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-300">Direct Online Booking Conversions (+35%)</div>
                <p className="text-slate-400 leading-relaxed">
                  Bypass third-party OTA commission fees by capturing direct guest bookings and deposit prepayments through the high-converting luxury website.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-amber-300">Zero Folio Leakage & POS Sync (10 Outlets)</div>
                <p className="text-slate-400 leading-relaxed">
                  Eliminate lost charges across water sports, VIP lounges, fine dining, and theater concessions with instant room folio postings.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-300">Brand Reach & High-Yield Occupancy</div>
                <p className="text-slate-400 leading-relaxed">
                  Drive over 250,000 monthly impressions across high-income demographics in Freetown, West Africa, the UK, and the North American diaspora.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-purple-300">Neural AI Operations Assistance</div>
                <p className="text-slate-400 leading-relaxed">
                  Empower resort management with Aura AI for instant guest welcome drafts, menu recommendations, itinerary creation, and yield strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Offer 1 - Website */}
      {activeTab === 'offer1_website' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full text-[10px] font-bold uppercase">
                  Scope Offering #1
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  Public Luxury Website & Direct Booking Portal
                </h2>
              </div>
              <Globe2 className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              <p>
                The public website serves as the primary digital flagship for OceanView Country Club & Resort. Designed with high-contrast, modern luxury aesthetics, typography, and interactive imagery, it showcases the beauty of Sussex Village while driving direct reservations and inquiry conversions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 1. Direct Booking & Availability Engine
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Interactive date pickers, room selector (Villas 01-04, Deluxe Suites, Cabanas), guest count controls, instant rate calculation, and secure payment gateway integration (Credit Cards, Mobile Money / Orange Money).
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 2. Interactive 10-Outlet Showcases
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Dedicated visual landing pages for Oceanfront Villas, VIP Sunset Lounge, Event Venues, Fitness Pavilion, 4K Cinema, Sports Courts, Conference Rooms, Sussex Water Sports Marina, Ocean Breeze Grill, and Coastal Cafe.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 3. High-Performance SEO & Mobile-First Design
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Optimized for search engines (ranking for "luxury resort Sierra Leone", "beach wedding Sussex", "jet ski rental Freetown"), lightning-fast mobile loading, and WhatsApp direct concierge link integration (+232-76-862043).
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 4. Virtual Tours & Events Inquiry Portal
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    High-resolution photo galleries, drone video integration, and automated lead capture forms for wedding couples, corporate organizers, and VIP group reservations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Offer 2 - Management System */}
      {activeTab === 'offer2_pms' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded-full text-[10px] font-bold uppercase">
                  Scope Offering #2
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  All-In-One Resort Management System (PMS, POS & AI)
                </h2>
              </div>
              <Cpu className="w-8 h-8 text-amber-400" />
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              <p>
                The core operational engine developed specifically for OceanView Country Club & Resort, providing a unified command center across property management, outlet POS terminals, staff task dispatches, guest CRM, and neural AI intelligence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <Hotel className="w-4 h-4 text-amber-400" /> 1. Accommodations & Villa Operations
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Live room grid status (Available, Occupied, Cleaning, Maintenance), guest check-in/out processing, night rate configuration, and direct room folio billing.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-400" /> 2. Express POS Terminal & Multi-Outlet Billing
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Fast cashier interface for drinks, water sports, cinema passes, dining tickets, and cigars. Supports cash, card, and instant charge posting to guest room folios.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> 3. Aura Gemini 3.6 Flash Neural AI Assistant
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Embedded AI assistant for VIP welcome emails, personalized multi-day guest itineraries, banquet menu creation, dynamic pricing advice, and guest inquiries.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-amber-400" /> 4. Staff Task Dispatch & Guest VIP Directory
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Priority-based staff dispatch for Housekeeping, Maintenance, and F&B, combined with a Guest CRM tracking VIP status tiers (Platinum, Gold), preferences, and total resort spend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Offer 3 - Digital Marketing */}
      {activeTab === 'offer3_marketing' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 bg-rose-950 text-rose-300 border border-rose-800 rounded-full text-[10px] font-bold uppercase">
                  Scope Offering #3
                </span>
                <h2 className="text-xl font-black text-white mt-1">
                  360° Digital Marketing & Brand Growth Strategy
                </h2>
              </div>
              <Megaphone className="w-8 h-8 text-rose-400" />
            </div>

            <div className="text-xs text-slate-300 leading-relaxed space-y-3">
              <p>
                A multi-channel marketing campaign designed to position OceanView Country Club & Resort as the premier coastal luxury resort in West Africa, driving high-yield bookings, event venue hires, and viral social media engagement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-rose-400" /> 1. Social Media Management & Content Production
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Full management of Instagram, TikTok, Facebook, and LinkedIn channels. Includes high-definition 4K drone cinematography, sunset lifestyle reels, cocktail mixology showcases, and weekly posting schedules.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-rose-400" /> 2. Meta & Google Paid Ad Campaigns
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Hyper-targeted digital ads focusing on high-income demographics in Freetown, Sierra Leone, regional West African hubs (Lagos, Accra), and the UK/US diaspora seeking holiday retreats.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                    <Users2 className="w-4 h-4 text-rose-400" /> 3. Influencer & VIP Ambassador Hosting
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Curated VIP weekend retreats hosting prominent West African influencers, travel bloggers, and lifestyle creators to generate viral organic reach and tag mentions.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-rose-300 text-xs flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" /> 4. Local Outdoor & Public Relations (PR)
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Strategic outdoor billboards along key Freetown coastal highways, radio spotlights, press releases in regional travel publications, and corporate event partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Investment & Bundled Packages */}
      {activeTab === 'investment' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" /> Investment Structure & Recommended Bundles
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              OceanView Country Club & Resort can engage each offer individually or leverage the <strong>Master Turn-Key Bundle</strong> for maximum financial discount and operational synergy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {/* Option 1 */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-1">Offer #1 Standalone</span>
                  <h3 className="font-extrabold text-white text-base">Luxury Public Website</h3>
                  <div className="text-xl font-black text-cyan-300 mt-2">$2,500 <span className="text-xs text-slate-400 font-normal">one-time</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 mt-4">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Complete Website Development</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Direct Booking Engine</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 10 Outlet Landing Showcases</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> SEO & Mobile Optimization</li>
                  </ul>
                </div>
              </div>

              {/* Option 2 */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">Offer #2 Standalone</span>
                  <h3 className="font-extrabold text-white text-base">Resort Management System</h3>
                  <div className="text-xl font-black text-amber-300 mt-2">$4,800 <span className="text-xs text-slate-400 font-normal">one-time</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 mt-4">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 10-Outlet Operations ERP</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Express POS & Room Charging</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Aura Gemini AI Operations Assistant</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Guest CRM & Staff Dispatch</li>
                  </ul>
                </div>
              </div>

              {/* Option 3 */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] text-rose-400 font-bold uppercase block mb-1">Offer #3 Standalone</span>
                  <h3 className="font-extrabold text-white text-base">360° Digital Marketing</h3>
                  <div className="text-xl font-black text-rose-300 mt-2">$1,200 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                  <ul className="text-xs text-slate-300 space-y-2 mt-4">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Social Media & Reel Creation</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Meta & Google Ads Management</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Influencer Retreat Hosting</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Freetown & Diaspora Campaign</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommended Master Bundle */}
            <div className="p-6 bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-950 rounded-2xl border-2 border-cyan-500/80 shadow-2xl space-y-4 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-800/60 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded-full text-[10px] font-extrabold uppercase">
                    BEST VALUE RECOMMENDED PACKAGE
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    Master Turn-Key Digital Transformation Package
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400">$6,200 <span className="text-xs text-slate-300 font-normal">+ $950/mo marketing</span></div>
                  <span className="text-[11px] text-amber-300 font-semibold">(Saves $1,100 on initial setup)</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed">
                Includes <strong>Offer #1 (Luxury Website)</strong> + <strong>Offer #2 (Management System)</strong> + <strong>Offer #3 (Digital Marketing)</strong> fully integrated as a cohesive operational powerhouse.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Contact Sign-off */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-400" />
          <span>10 Sweds Free Avenue, Sussex Village, Sierra Leone</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300 font-semibold">
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>Concierge & Executive Line: +232-76-862043</span>
        </div>
      </div>

    </div>
  );
};
