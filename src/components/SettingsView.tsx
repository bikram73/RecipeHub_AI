import React, { useState } from 'react';
import { Settings, Moon, Sun, Download, Trash2, RefreshCw, Check, AlertTriangle, ArrowLeft, Shield } from 'lucide-react';
import { UserPreferences, LocalProfile } from '../types';
import { getPreferences, savePreferences, exportAllData, clearAllLocalData, resetDemoData, getProfile, saveProfile, logActivity } from '../utils/storage';

interface SettingsViewProps {
  onNavigate: (tab: any) => void;
  onRefreshAppState: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNavigate, onRefreshAppState }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(getPreferences());
  const [profile, setProfile] = useState<LocalProfile>(getProfile());
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    const updated = { ...preferences, theme };
    setPreferences(updated);
    savePreferences(updated);
  };

  const handleExportData = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recipehub-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setCopiedNotification('Data backup downloaded successfully!');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  const handleClearData = () => {
    clearAllLocalData();
    setShowClearConfirm(false);
    onRefreshAppState();
    setCopiedNotification('All local data cleared.');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  const handleResetData = () => {
    resetDemoData();
    setShowResetConfirm(false);
    onRefreshAppState();
    setCopiedNotification('Demo recipes & creators restored.');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('profile')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#9f3d00] flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Application Settings & Data</h1>
            <p className="text-xs text-gray-500">Configure theme, culinary preferences, and manage your local data storage.</p>
          </div>
        </div>
      </div>

      {copiedNotification && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{copiedNotification}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* 1. Theme & Appearance */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 mb-1">Visual Theme</h2>
          <p className="text-xs text-gray-500 mb-4">Choose your preferred workspace aesthetic.</p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Light Mode', icon: Sun },
              { id: 'dark', label: 'Dark Mode', icon: Moon },
              { id: 'system', label: 'System Theme', icon: RefreshCw },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleThemeChange(id as any)}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  preferences.theme === id
                    ? 'border-[#9f3d00] bg-[#fff8f5] text-[#9f3d00] font-bold shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Privacy & Storage Notice */}
        <div className="bg-emerald-50/70 rounded-3xl border border-emerald-100 p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 text-sm">Local-First Storage Architecture</h3>
            <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
              Your recipes, collections, ratings, comments, and profile are stored directly in your browser's LocalStorage. No server database is used and your private culinary notes never leave your device.
            </p>
          </div>
        </div>

        {/* 3. Data Backup & Reset Management */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 mb-1">Data & Storage Management</h2>
          <p className="text-xs text-gray-500">Export your local workspace to JSON or restore initial demonstration state.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Export JSON */}
            <button
              onClick={handleExportData}
              className="p-4 rounded-2xl border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <Download className="w-5 h-5 text-gray-700 mb-2 group-hover:text-[#9f3d00] transition-colors" />
                <h4 className="font-bold text-gray-900 text-xs">Export All Data</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Download full JSON backup of recipes & profile.</p>
              </div>
              <span className="text-[11px] font-bold text-[#9f3d00] mt-3">Download JSON →</span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-4 rounded-2xl border border-amber-200 hover:border-amber-300 bg-amber-50/50 hover:bg-amber-50 transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <RefreshCw className="w-5 h-5 text-amber-700 mb-2 group-hover:rotate-180 transition-transform duration-500" />
                <h4 className="font-bold text-amber-900 text-xs">Reset Demo Data</h4>
                <p className="text-[11px] text-amber-700 mt-0.5">Restore all original 25+ demo recipes & creators.</p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 mt-3">Reset to default →</span>
            </button>

            {/* Clear All */}
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-4 rounded-2xl border border-rose-200 hover:border-rose-300 bg-rose-50/50 hover:bg-rose-50 transition-all text-left flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <Trash2 className="w-5 h-5 text-rose-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-rose-900 text-xs">Clear Local Data</h4>
                <p className="text-[11px] text-rose-700 mt-0.5">Remove all stored recipes, collections, & history.</p>
              </div>
              <span className="text-[11px] font-bold text-rose-700 mt-3">Clear data →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-rose-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Clear All Local Data?</h3>
            <p className="text-xs text-gray-600 mt-1">
              This will erase your local profile, custom recipes, saved collections, and activity history from this browser.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-rose-700 cursor-pointer"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-amber-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Reset to Demo Recipes?</h3>
            <p className="text-xs text-gray-600 mt-1">
              This will restore all default recipes, demo creators, and sample collections.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="px-4 py-2 bg-[#9f3d00] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#c74e00] cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
