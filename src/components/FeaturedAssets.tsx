import React, { useState } from 'react';
import { FEATURED_ASSETS } from '../data/initialData';
import { RealEstateAsset } from '../types';
import { 
  Building2, 
  Warehouse, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  X,
  Camera,
  Upload,
  Link2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface FeaturedAssetsProps {
  onOpenVault: () => void;
  onRequestDueDiligence: (assetTitle: string) => void;
}

// Curated high-resolution institutional real estate photography presets
const PHOTO_PRESETS = [
  {
    name: 'Grade-A Glass Commercial Monolith',
    category: 'Commercial',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSJD8HV0Dg9SHrl2TH_7gNqi9hHMm2obSuczh1qIl-CLfHEpwj-eiv26-CIb5yPDTz5Tj_Cb2U1DCM8liN2vFz7rTC3bjGftHL4pLfabJkPDsaqyB2uoLyr5iKKcoBTqedQhYKabFICW5O23HrkVPbTExZDp1n4xkwIfQVsFZ5DRScin3JcqDtJ8ZPy1WfRWbL1tD7fL2kmYC3e6in2m7SsvAHOmZKOldU6z7u6dJ39kKp7NDPXGCJ',
  },
  {
    name: 'Multi-Modal Logistics & Freight Terminal',
    category: 'Logistics',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuj6xGaxNg_AnWZY3BVPx7jBVnt7HlgFfpP_34YCCf45ZaofOuscbIKRv46l67KYYudyZCYND-xUABizZlN7nGRKlI4uvstVC8Zz4bYEFmlXvBJYzu1Oa9bSrjaqrj94eNRDE8dItnpuUOHPxS-sa_vB1Yh1CoDarMCcUx0n8tuciL3nW6OAaBVsCnr6gG4cca2VOljDW2FfhIfkG2JGzH2mLksRcTMLjoqpTrLSRgahdbgsH0G2Eq',
  },
  {
    name: 'High-Tech Engineering & Manufacturing Facility',
    category: 'Industrial',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Automated High-Bay Logistics Interior',
    category: 'Warehousing',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Corporate Campus & R&D Tech Park',
    category: 'Tech Campus',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
];

export const FeaturedAssets: React.FC<FeaturedAssetsProps> = ({ onOpenVault, onRequestDueDiligence }) => {
  const [filter, setFilter] = useState<'all' | 'commercial_grade_a' | 'multimodal_logistics'>('all');
  const [selectedAsset, setSelectedAsset] = useState<RealEstateAsset | null>(null);

  // Persistent asset state with custom edited photos support
  const [assetList, setAssetList] = useState<RealEstateAsset[]>(() => {
    try {
      const savedPhotos = localStorage.getItem('growthland_asset_photos');
      if (savedPhotos) {
        const photoMap: Record<string, string> = JSON.parse(savedPhotos);
        return FEATURED_ASSETS.map((asset) => ({
          ...asset,
          imageUrl: photoMap[asset.id] || asset.imageUrl,
        }));
      }
    } catch {
      // Fallback to initial
    }
    return FEATURED_ASSETS;
  });

  // State for Photo Edit Dialog
  const [editingAsset, setEditingAsset] = useState<RealEstateAsset | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [photoFeedback, setPhotoFeedback] = useState<string | null>(null);

  const filtered = assetList.filter((asset) => {
    if (filter === 'all') return true;
    return asset.type === filter;
  });

  // Save updated photo into state and localStorage
  const handleUpdatePhoto = (assetId: string, newUrl: string) => {
    if (!newUrl) return;

    setAssetList((prev) => {
      const updated = prev.map((a) => (a.id === assetId ? { ...a, imageUrl: newUrl } : a));
      try {
        const photoMap: Record<string, string> = {};
        updated.forEach((a) => {
          photoMap[a.id] = a.imageUrl;
        });
        localStorage.setItem('growthland_asset_photos', JSON.stringify(photoMap));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return updated;
    });

    if (selectedAsset && selectedAsset.id === assetId) {
      setSelectedAsset((prev) => (prev ? { ...prev, imageUrl: newUrl } : null));
    }

    setPhotoFeedback('Asset photo updated successfully!');
    setTimeout(() => {
      setPhotoFeedback(null);
      setEditingAsset(null);
      setCustomUrlInput('');
    }, 1100);
  };

  // Local file upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, assetId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          handleUpdatePhoto(assetId, ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to default photo
  const handleResetPhoto = (assetId: string) => {
    const original = FEATURED_ASSETS.find((a) => a.id === assetId);
    if (original) {
      handleUpdatePhoto(assetId, original.imageUrl);
    }
  };

  return (
    <section id="featured-assets-matrix" className="w-full bg-[#F2F3FF] py-16 md:py-24 px-4 md:px-8 border-b border-[#E2E7FF]">
      <div className="max-w-[1360px] mx-auto flex flex-col gap-10">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-technical text-[10px] md:text-[11px] uppercase tracking-widest text-[#44474C] font-bold">
                FLAGSHIP PORTFOLIO EXAMPLES
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#D97706]/15 text-[#B45309] rounded text-[10px] font-technical font-bold uppercase tracking-wider">
                <Camera className="w-3 h-3" />
                <span>Editable Photos</span>
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#131B2E] font-bold mt-1">
              Prime Assets in Pan-India Growth Corridors
            </h2>
            <p className="font-sans text-xs text-[#44474C] mt-1">
              Click &quot;Edit Photo&quot; on any asset card to upload your custom property image or select high-resolution presets.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded border border-gray-300 shadow-sm self-start md:self-end">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded font-technical text-[11px] font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-[#44474C] hover:text-[#0B192C]'
              }`}
            >
              ALL ASSETS ({assetList.length})
            </button>
            <button
              onClick={() => setFilter('commercial_grade_a')}
              className={`px-3 py-1.5 rounded font-technical text-[11px] font-bold transition-all ${
                filter === 'commercial_grade_a'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-[#44474C] hover:text-[#0B192C]'
              }`}
            >
              COMMERCIAL GRADE-A
            </button>
            <button
              onClick={() => setFilter('multimodal_logistics')}
              className={`px-3 py-1.5 rounded font-technical text-[11px] font-bold transition-all ${
                filter === 'multimodal_logistics'
                  ? 'bg-[#0B192C] text-white'
                  : 'text-[#44474C] hover:text-[#0B192C]'
              }`}
            >
              INDUSTRIAL & LOGISTICS
            </button>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded border border-[#E2E7FF] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              {/* Asset Image & Floating Badges */}
              <div 
                onClick={() => {
                  setEditingAsset(asset);
                  setCustomUrlInput('');
                }}
                className="relative h-72 w-full overflow-hidden bg-gray-100 cursor-pointer"
                title="Click to edit or upload photo for this asset"
              >
                <img
                  src={asset.imageUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Photo Edit Trigger Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAsset(asset);
                    setCustomUrlInput('');
                  }}
                  className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-[#0B192C]/85 hover:bg-[#0B192C] backdrop-blur-md text-[#FFB77D] hover:text-white rounded font-technical text-[10px] uppercase font-bold tracking-wider border border-white/25 transition-all shadow-md group/btn cursor-pointer"
                  title="Edit or upload photo for this asset"
                >
                  <Camera className="w-3.5 h-3.5 text-[#FFB77D] group-hover/btn:scale-110 transition-transform" />
                  <span>Edit Photo</span>
                </button>

                {/* Subtle Hover Overlay indicator */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-full text-white text-xs font-technical uppercase font-bold flex items-center gap-2 border border-white/30 shadow-lg">
                    <Camera className="w-4 h-4 text-[#FFB77D]" />
                    <span>Click to Edit / Upload Photo</span>
                  </div>
                </div>

                {/* Corridor Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#0B192C]/85 backdrop-blur-md text-white rounded font-technical text-[10px] uppercase font-bold tracking-wider border border-white/10">
                  {asset.corridor}
                </div>

                {/* Certification Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md text-[#131B2E] rounded font-technical text-[10px] uppercase font-bold tracking-wider shadow border border-gray-200">
                  {asset.certification}
                </div>
              </div>

              {/* Asset Content */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex items-center justify-between text-[#44474C] font-technical text-[10px] uppercase tracking-wider mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                      {asset.subLocation}
                    </span>
                    <span className="text-[#D97706] font-bold">
                      {asset.typeLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#131B2E]">
                    {asset.title}
                  </h3>

                  <p className="font-sans text-xs text-[#44474C] mt-2 line-clamp-2 leading-relaxed">
                    {asset.description}
                  </p>
                </div>

                {/* Technical Specs 3-Bar Matrix */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-[#F2F3FF] rounded border border-[#DAE2FD] text-center">
                  <div>
                    <span className="font-technical text-[9px] text-[#44474C] uppercase block font-semibold">
                      Leasable / Floor
                    </span>
                    <span className="font-technical text-xs font-bold text-[#131B2E]">
                      {asset.specs.floorPlateOrAcreage}
                    </span>
                  </div>
                  <div className="border-x border-gray-300">
                    <span className="font-technical text-[9px] text-[#44474C] uppercase block font-semibold">
                      Clear Height
                    </span>
                    <span className="font-technical text-xs font-bold text-[#131B2E]">
                      {asset.specs.clearHeight}
                    </span>
                  </div>
                  <div>
                    <span className="font-technical text-[9px] text-[#44474C] uppercase block font-semibold">
                      Load / Power
                    </span>
                    <span className="font-technical text-xs font-bold text-[#131B2E]">
                      {asset.specs.powerOrLoading}
                    </span>
                  </div>
                </div>

                {/* Key Highlights Bullets */}
                <ul className="space-y-1 font-sans text-xs text-gray-700">
                  {asset.keyHighlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span className="line-clamp-1">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-technical">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{asset.authorityClearance}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingAsset(asset)}
                      className="px-3 py-1.5 bg-[#FFF4E5] hover:bg-[#FFE6C8] text-[#B45309] border border-[#D97706]/40 rounded font-technical text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                      title="Edit or upload photo for this asset"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Edit Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedAsset(asset)}
                      className="px-3 py-1.5 bg-[#EAEDFF] hover:bg-[#DAE2FD] text-[#0B192C] border border-[#BAC7E1] rounded font-technical text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      Specifications
                    </button>

                    <button
                      type="button"
                      onClick={() => onRequestDueDiligence(asset.title)}
                      className="px-3.5 py-1.5 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-[11px] font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-[#D97706]" />
                      <span>Due Diligence Memo</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Quick Strategic Footprint Strip */}
        <div className="p-4 bg-white rounded border border-[#BAC7E1] flex flex-wrap items-center justify-between gap-3 font-technical text-[11px] text-[#44474C] uppercase tracking-wider shadow-sm">
          <span className="font-bold text-[#0B192C]">Pan-India Corridors Tracked:</span>
          <span className="text-[#131B2E] font-semibold">Delhi NCR • Mumbai • Pune • Bengaluru • Bhiwadi • Neemrana • Chennai • Coimbatore • Kolkata</span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PHOTO EDIT MODAL */}
      {/* ========================================================================= */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#0B192C] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#FFB77D]" />
                <div>
                  <h3 className="font-display text-base font-bold">
                    Edit Asset Photo
                  </h3>
                  <p className="text-[11px] text-gray-300 font-sans">
                    {editingAsset.title} • {editingAsset.corridor}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* Feedback Alert */}
              {photoFeedback && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs flex items-center gap-2 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{photoFeedback}</span>
                </div>
              )}

              {/* Current Photo Preview */}
              <div>
                <label className="block text-[10px] font-technical uppercase font-bold text-gray-500 mb-1.5">
                  Current Asset Photo Preview
                </label>
                <div className="relative h-44 w-full rounded-md overflow-hidden border border-gray-300 bg-gray-100">
                  <img
                    src={editingAsset.imageUrl}
                    alt={editingAsset.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/70 text-white rounded text-[10px] font-technical uppercase font-bold">
                    Active Image
                  </div>
                </div>
              </div>

              {/* Option 1: File Upload */}
              <div className="p-4 bg-[#F2F3FF] rounded-lg border border-[#BAC7E1] space-y-2">
                <span className="font-technical text-xs font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#D97706]" />
                  <span>Option 1: Upload Image from Computer</span>
                </span>
                <p className="text-[11px] text-gray-600 font-sans">
                  Select a local photo file (PNG, JPG, WebP) from your system.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-white rounded font-technical text-xs font-bold cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, editingAsset.id)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option 2: Image URL Input */}
              <div className="p-4 bg-white rounded-lg border border-gray-300 space-y-2">
                <span className="font-technical text-xs font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-[#D97706]" />
                  <span>Option 2: Paste Web Image URL</span>
                </span>
                <p className="text-[11px] text-gray-600 font-sans">
                  Enter any direct image link from Unsplash, Google Cloud, or your company server.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/asset-photo.jpg"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className="flex-1 h-9 px-3 bg-gray-50 border border-gray-300 rounded text-xs focus:bg-white focus:outline-none focus:border-[#0B192C]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrlInput.trim()) {
                        handleUpdatePhoto(editingAsset.id, customUrlInput.trim());
                      }
                    }}
                    disabled={!customUrlInput.trim()}
                    className="px-4 h-9 bg-[#D97706] hover:bg-[#B45309] disabled:opacity-50 text-[#0B192C] font-bold rounded font-technical text-xs transition-colors whitespace-nowrap"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {/* Option 3: Curated Presets */}
              <div className="space-y-2">
                <span className="font-technical text-xs font-bold text-[#0B192C] uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>Option 3: Curated Institutional Presets</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PHOTO_PRESETS.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleUpdatePhoto(editingAsset.id, preset.url)}
                      className="group p-1.5 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-left transition-all hover:border-[#D97706] cursor-pointer"
                    >
                      <div className="h-16 w-full rounded overflow-hidden bg-gray-200 mb-1">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="font-technical text-[9px] uppercase font-bold text-gray-700 block truncate">
                        {preset.name}
                      </span>
                      <span className="text-[8px] text-gray-500 font-sans block">
                        {preset.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleResetPhoto(editingAsset.id)}
                className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-600 font-technical transition-colors"
                title="Restore default photo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 rounded text-xs font-semibold text-gray-700 transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ASSET TECHNICAL SPECIFICATIONS MODAL */}
      {/* ========================================================================= */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in duration-150">
            <div className="relative h-48 bg-gray-900">
              <img
                src={selectedAsset.imageUrl}
                alt={selectedAsset.title}
                className="w-full h-full object-cover opacity-80"
              />
              
              <button
                type="button"
                onClick={() => {
                  setEditingAsset(selectedAsset);
                  setCustomUrlInput('');
                }}
                className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-black/70 hover:bg-black/90 text-white rounded font-technical text-[10px] uppercase font-bold tracking-wider border border-white/20 transition-all cursor-pointer"
                title="Edit photo for this asset"
              >
                <Camera className="w-3 h-3 text-[#FFB77D]" />
                <span>Change Photo</span>
              </button>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="font-technical text-[10px] uppercase text-[#FFB77D] font-bold">
                  {selectedAsset.subLocation}
                </span>
                <h3 className="font-display text-2xl font-bold mt-1">
                  {selectedAsset.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAsset(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-1.5 hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="font-sans text-xs text-gray-700 leading-relaxed">
                {selectedAsset.description}
              </p>

              <div className="bg-[#F2F3FF] p-4 rounded border border-[#DAE2FD] space-y-2">
                <h4 className="font-technical text-[11px] uppercase tracking-wider text-[#44474C] font-bold">
                  Technical Specifications Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 font-technical text-[10px] uppercase block">Floor Plate / Acreage</span>
                    <strong className="text-gray-800">{selectedAsset.specs.floorPlateOrAcreage}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 font-technical text-[10px] uppercase block">Clear Heights</span>
                    <strong className="text-gray-800">{selectedAsset.specs.clearHeight}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 font-technical text-[10px] uppercase block">Power & Load</span>
                    <strong className="text-gray-800">{selectedAsset.specs.powerOrLoading}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 font-technical text-[10px] uppercase block">Apron & Parking</span>
                    <strong className="text-gray-800">{selectedAsset.specs.dockApronOrDG}</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-technical text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-1.5">
                  Institutional Advantages
                </h4>
                <ul className="space-y-1 text-xs text-gray-700">
                  {selectedAsset.keyHighlights.map((kh, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                      <span>{kh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedAsset(null);
                    onRequestDueDiligence(selectedAsset.title);
                  }}
                  className="px-5 py-2 bg-[#0B192C] text-white rounded font-technical text-xs font-bold hover:bg-[#1E3E62] transition-colors"
                >
                  Request Due Diligence Memo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
