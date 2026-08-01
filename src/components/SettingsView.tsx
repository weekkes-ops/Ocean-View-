import React, { useState } from 'react';
import oceanViewLogo from '../assets/images/oceanview_resort_logo_1785518556173.jpg';
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  Palette,
  Printer,
  RotateCcw,
  Check,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building2,
  Database,
  Sliders,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ThemeMode } from '../types';
import { useTheme, THEMES } from '../context/ThemeContext';

interface SettingsViewProps {
  systemData: {
    rooms: any[];
    inventory: any[];
    guests: any[];
    staffTasks: any[];
    posProducts: any[];
  };
  onRestoreData?: (importedData: any) => void;
  onResetData?: () => void;
  onSelectModule?: (module: any) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  systemData,
  onRestoreData,
  onResetData,
  onSelectModule,
}) => {
  const {
    theme,
    setTheme,
    layoutStyle,
    setLayoutStyle,
    layoutDensity,
    setLayoutDensity,
    config,
  } = useTheme();
  const [activeTab, setActiveTab] = useState<'themes' | 'backup' | 'print'>('backup');
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showPropertySpecsPrint, setShowPropertySpecsPrint] = useState(false);

  // Download JSON Backup
  const handleExportBackup = () => {
    const backupObj = {
      app: 'OceanView Country Club & Resort Management System',
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      data: systemData,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `OceanView_Resort_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setBackupMessage('Backup file generated and downloaded successfully!');
    setTimeout(() => setBackupMessage(null), 4000);
  };

  // Import JSON Backup
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.data && onRestoreData) {
            onRestoreData(parsed.data);
            setBackupMessage('System data successfully restored from backup file!');
            setTimeout(() => setBackupMessage(null), 4000);
          } else {
            alert('Invalid backup file format. Please upload a valid OceanView Resort JSON backup.');
          }
        } catch (err) {
          alert('Error parsing JSON backup file.');
        }
      };
    }
  };

  const handlePrintSpecs = () => {
    try {
      window.print();
    } catch (err) {
      console.warn('Print not supported or blocked:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-cyan-500" />
            <h1 className="text-xl font-black tracking-tight">System Settings & Configuration</h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage data backups, customize visual interface themes, and print property specifications.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 font-extrabold rounded-lg transition-all ${
              activeTab === 'backup'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Data Backup</span>
          </button>

          <button
            onClick={() => setActiveTab('themes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 font-extrabold rounded-lg transition-all ${
              activeTab === 'themes'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4 text-cyan-500" />
            <span>Switch Themes</span>
          </button>

          <button
            onClick={() => setActiveTab('print')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 font-extrabold rounded-lg transition-all ${
              activeTab === 'print'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Printer className="w-4 h-4 text-amber-500" />
            <span>Print Properties</span>
          </button>
        </div>
      </div>

      {backupMessage && (
        <div className="p-4 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 rounded-2xl flex items-center justify-between text-xs font-bold shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{backupMessage}</span>
          </div>
          <button onClick={() => setBackupMessage(null)} className="text-emerald-700 dark:text-emerald-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* TAB 1: DATA BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Export Card */}
            <div className={`p-6 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-4 shadow-sm`}>
              <div className="flex items-start gap-3">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950 rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Backup Database (JSON Export)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Generate an offline JSON backup of all resort rooms, stock inventory, guest profiles, POS items, and staff tasks.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tracked Accommodations:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{systemData.rooms?.length || 0} Units</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Stock Inventory SKUs:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{systemData.inventory?.length || 0} SKUs</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Registered Guest Profiles:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{systemData.guests?.length || 0} Guests</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>POS Product Catalog:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{systemData.posProducts?.length || 0} Products</span>
                </div>
              </div>

              <button
                onClick={handleExportBackup}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Export System Backup File (.JSON)</span>
              </button>
            </div>

            {/* Import / Restore Card */}
            <div className={`p-6 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-4 shadow-sm`}>
              <div className="flex items-start gap-3">
                <div className="p-3 bg-sky-100 dark:bg-sky-950 rounded-2xl text-sky-600 dark:text-sky-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Restore Backup File</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload a previously saved OceanView JSON backup file to restore resort records.
                  </p>
                </div>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-center space-y-2 bg-slate-50 dark:bg-slate-950/40">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Select JSON Backup File</div>
                <p className="text-[11px] text-slate-500">Only upload files exported from this system</p>
                <label className="inline-block mt-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer shadow transition-all">
                  Browse File
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>
            </div>

          </div>

          {/* Reset System Card */}
          <div className={`p-6 rounded-2xl ${config.cardBgClass} border border-rose-200 dark:border-rose-900/50 space-y-4 shadow-sm`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-rose-100 dark:bg-rose-950 rounded-2xl text-rose-600 dark:text-rose-400">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Reset System Data to Default</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Reverts all room statuses, stock quantities, tasks, and guest lists back to initial factory resort defaults.
                  </p>
                </div>
              </div>

              {onResetData && (
                <button
                  onClick={() => setShowResetConfirm(!showResetConfirm)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow transition-all"
                >
                  Reset System
                </button>
              )}
            </div>

            {showResetConfirm && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/60 rounded-xl border border-rose-300 dark:border-rose-800 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Are you sure you want to reset all system data?</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  This will override current live changes and load initial resort demo records.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (onResetData) onResetData();
                      setShowResetConfirm(false);
                      setBackupMessage('System successfully reset to default factory data.');
                      setTimeout(() => setBackupMessage(null), 4000);
                    }}
                    className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-xl"
                  >
                    Confirm Reset Now
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: SYSTEM LAYOUT STYLE & COLOR THEMES */}
      {activeTab === 'themes' && (
        <div className="space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">System Layout Style & Color Preferences</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize structural navigation alignment, component density, and luxury resort color themes.
              </p>
            </div>
            <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/80 px-3 py-1.5 rounded-full border border-cyan-300 dark:border-cyan-800 flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Active: {config.name}</span>
            </div>
          </div>

          {/* Section 1: Navigation Layout Style */}
          <div className={`p-6 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-4 shadow-sm`}>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">1. Navigation Layout Structure</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select how main resort modules and tools are arranged on screen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: 'expanded_sidebar' as const,
                  title: 'Full Left Sidebar',
                  badge: 'Default Recommended',
                  desc: 'Comprehensive left-hand navigation bar with categories, outlet counts & status badges.',
                },
                {
                  id: 'compact_sidebar' as const,
                  title: 'Compact Icon Rail',
                  badge: 'Maximized Workspace',
                  desc: 'Slim 80px icon rail sidebar with fast hover tooltips for high screen real estate.',
                },
                {
                  id: 'top_navigation' as const,
                  title: 'Top Horizontal Navbar',
                  badge: 'Executive View',
                  desc: 'Clean top horizontal bar navigation layout for ultra-wide monitors and tablet screens.',
                },
              ].map((item) => {
                const isSelected = layoutStyle === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLayoutStyle(item.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all space-y-2 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                        : 'bg-slate-50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs">{item.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold block mt-0.5">{item.badge}</span>
                      <p className="text-[11px] opacity-75 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Layout Density */}
          <div className={`p-6 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-4 shadow-sm`}>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">2. Visual Interface Density</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Adjust grid spacing, card padding, and typography scaling.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'compact' as const, title: 'Compact Data Grid', desc: 'Tighter padding & small fonts for dense multi-outlet tracking.' },
                { id: 'comfortable' as const, title: 'Modern Comfortable', desc: 'Balanced padding and standard comfortable layout (Default).' },
                { id: 'spacious' as const, title: 'Spacious Luxury', desc: 'Roomy luxury spacing with generous margins and clear breathing room.' },
              ].map((item) => {
                const isSelected = layoutDensity === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLayoutDensity(item.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                        : 'bg-slate-50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs">{item.title}</span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] opacity-75">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Color Schemes */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">3. Color Schemes & Theme Palettes</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Switch between 6 high-contrast, domain-tailored color themes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(THEMES) as ThemeMode[]).map((key) => {
                const item = THEMES[key];
                const isSelected = theme === key;

                return (
                  <div
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative space-y-3 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-cyan-500 shadow-xl ring-2 ring-cyan-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-extrabold text-xs">{item.name}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.description}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="p-1.5 bg-cyan-500 text-slate-950 rounded-full shrink-0">
                            <Check className="w-3.5 h-3.5 font-black" />
                          </div>
                        )}
                      </div>

                      {/* Swatch preview */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <div
                          className="h-6 flex-1 rounded-lg border border-white/20 shadow-sm"
                          style={{ backgroundColor: item.swatchPrimary }}
                        />
                        <div
                          className="h-6 flex-1 rounded-lg border border-white/20 shadow-sm"
                          style={{ backgroundColor: item.swatchSecondary }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 font-medium">Click to activate</span>
                      <button
                        className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? 'Active Theme' : 'Apply Theme'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: PRINT PROPERTIES & REPORT DOCUMENTS */}
      {activeTab === 'print' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Print Properties & Official Specifications</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate printable PDF directory documents, master project proposal, and resort commercial specification sheets.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Property Specs Card */}
            <div className={`p-5 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-3 flex flex-col justify-between shadow-sm`}>
              <div className="space-y-2">
                <div className="p-2.5 bg-amber-100 dark:bg-amber-950 rounded-xl text-amber-600 dark:text-amber-400 w-fit">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Resort Directory & Property Specs Sheet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Includes 10 Sweds Free Ave location, 10 primary amenities, hotline contacts, rules, and accommodation specs.
                </p>
              </div>
              <button
                onClick={() => setShowPropertySpecsPrint(true)}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs rounded-xl shadow transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Specs Sheet</span>
              </button>
            </div>

            {/* Commercial Project Proposal Card */}
            <div className={`p-5 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-3 flex flex-col justify-between shadow-sm`}>
              <div className="space-y-2">
                <div className="p-2.5 bg-cyan-100 dark:bg-cyan-950 rounded-xl text-cyan-600 dark:text-cyan-400 w-fit">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Master Commercial Proposal</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Complete Sierra Leone investment proposal, 10 amenity blueprints, financial breakdown & revenue projections.
                </p>
              </div>
              <button
                onClick={() => {
                  if (onSelectModule) onSelectModule('proposal');
                }}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-extrabold text-xs rounded-xl shadow transition-all active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>Open & Print Project Proposal</span>
              </button>
            </div>

            {/* Operations & Inventory Summary Card */}
            <div className={`p-5 rounded-2xl ${config.cardBgClass} border ${config.borderClass} space-y-3 flex flex-col justify-between shadow-sm`}>
              <div className="space-y-2">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 rounded-xl text-emerald-600 dark:text-emerald-400 w-fit">
                  <Printer className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Quick Print Operations Report</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant browser print job for current operational state, room occupancy stats, and stock valuation totals.
                </p>
              </div>
              <button
                onClick={handlePrintSpecs}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Print Current Browser Page</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Printable Property Specs Modal */}
      {showPropertySpecsPrint && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            
            {/* Action Bar (Hidden when printing) */}
            <div className="print:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-sm">OceanView Property Specifications Sheet</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintSpecs}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowPropertySpecsPrint(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Document Printable Content */}
            <div className="p-8 font-sans space-y-6 bg-white text-slate-900 select-text" id="printable-property-specs">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={oceanViewLogo}
                    alt="OceanView Logo"
                    className="h-16 w-auto object-contain rounded-lg shadow-sm border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h1 className="font-black text-2xl text-slate-900 tracking-tight uppercase">
                      OceanView Country Club & Resort
                    </h1>
                    <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-0.5">
                      Official Property Specifications & Facilities Directory
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      10 Sweds Free Avenue, Sussex Village, Western Area, Sierra Leone
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div className="font-bold text-slate-900">RES-SPEC-2026</div>
                  <div>Issued: July 2026</div>
                  <div>Hotline: +232-76-862043</div>
                </div>
              </div>

              {/* Core Property Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-extrabold text-slate-900 uppercase text-[10px] text-amber-700">Location & Access</div>
                  <div><strong>Address:</strong> 10 Sweds Free Ave, Sussex Village</div>
                  <div><strong>Region:</strong> Western Area Peninsula, Sierra Leone</div>
                  <div><strong>Beachfront Access:</strong> Sussex Beach Oceanfront</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-extrabold text-slate-900 uppercase text-[10px] text-amber-700">Capacity & Scale</div>
                  <div><strong>Total Rooms:</strong> 25 Luxury Oceanfront Suites & Villas</div>
                  <div><strong>Amenity Outlets:</strong> 10 Dedicated Resort Facilities</div>
                  <div><strong>Operating Model:</strong> 24/7 All-Inclusive Luxury Resort</div>
                </div>
              </div>

              {/* 10 Core Amenity Facilities Table */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
                  1. The 10 Core Resort Amenity Outlets
                </h3>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 font-bold text-[10px] text-slate-600 border-b border-slate-300">
                      <th className="p-2">Facility / Amenity</th>
                      <th className="p-2">Capacity / Specs</th>
                      <th className="p-2">Hours of Operation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    <tr>
                      <td className="p-2 font-bold">1. Oceanfront Accommodations</td>
                      <td className="p-2">25 Executive Villas & Suites</td>
                      <td className="p-2">24 Hours / 7 Days</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">2. VIP Sunset Lounge</td>
                      <td className="p-2">80 VIP Guests, Mixology Bar</td>
                      <td className="p-2">12:00 PM – 02:00 AM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">3. Grand Coastal Event Venue</td>
                      <td className="p-2">350 Guests Banquet Ballroom</td>
                      <td className="p-2">Event Based (Reservation)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">4. Fitness & Wellness Club</td>
                      <td className="p-2">Cardio, Weights, Sauna & Pool</td>
                      <td className="p-2">06:00 AM – 10:00 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">5. VIP Cinema Theater</td>
                      <td className="p-2">45 Recliner Seats, 4K Projection</td>
                      <td className="p-2">10:00 AM – 11:30 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">6. Multipurpose Sports Court</td>
                      <td className="p-2">Tennis, Basketball, Pickleball</td>
                      <td className="p-2">07:00 AM – 09:00 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">7. Executive Conference Suite</td>
                      <td className="p-2">3 Boardrooms, AV Teleconferencing</td>
                      <td className="p-2">08:00 AM – 08:00 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">8. Sussex Water Sports Marina</td>
                      <td className="p-2">Jet Skis, Kayaks, Boat Charters</td>
                      <td className="p-2">08:00 AM – 06:00 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">9. Ocean Breeze Fine Dining</td>
                      <td className="p-2">120 Seating Seafood Restaurant</td>
                      <td className="p-2">07:00 AM – 11:00 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold">10. Coastal Beach Cafe & Bakery</td>
                      <td className="p-2">Pastries, Artisanal Coffee, Gelato</td>
                      <td className="p-2">06:30 AM – 09:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Utility & Emergency Contacts */}
              <div className="space-y-2 border-t border-slate-300 pt-3 text-xs">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  2. Resort Services & Emergency Contacts
                </h3>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-700">
                  <div><strong>Concierge Desk:</strong> Ext. 101</div>
                  <div><strong>Housekeeping:</strong> Ext. 104</div>
                  <div><strong>Security Hotline:</strong> +232-76-862043</div>
                </div>
              </div>

              {/* Official Seal / Signature */}
              <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-end text-[10px] text-slate-500">
                <div>
                  <p className="font-bold text-slate-900">OceanView Management Office</p>
                  <p>Sussex Peninsula, Sierra Leone</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">Certified Document</p>
                  <p>© 2026 OceanView Country Club & Resort</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
