import React, { useState, useEffect } from 'react';
import { Camera, Plus, X, ChevronLeft, ChevronRight, BookOpen, Award, User, Upload, ArrowRight, Zap, Lightbulb, TrendingUp, Type, Layers, Waves, Lock, ArrowRightCircle, Share2, Maximize2, GalleryThumbnails } from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';

// --- CONFIGURATION ---
const SITE_PASSWORD = "brit2026"; // Shared passcode

// --- FIREBASE SETUP ---
let firebaseApp, auth, db, appId;

try {
  // We use "import.meta.env" to read variables from Netlify securely
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

  // Initialize only if keys exist
  if (firebaseConfig.apiKey) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
    appId = 'brit-reflections'; // Fixed App ID for storage path
  } else {
    console.warn("Firebase config missing. Check Netlify Environment Variables.");
  }
} catch (e) {
  console.error("Error initializing Firebase:", e);
}

// --- COMPONENTS ---

const BritTLLogo = ({ size = "sm" }) => {
  const [imageError, setImageError] = useState(false);
  const dimensions = size === "lg" ? "w-24 h-24" : "w-10 h-10";

  if (imageError) {
    return (
      <div className={`${dimensions} bg-[#00ff00] flex items-center justify-center relative overflow-hidden shrink-0 rounded-md shadow-sm transition-transform hover:scale-105`}>
        <div className="absolute bg-[#ad207d] w-[140%] h-[70%] transform -rotate-12 flex flex-col items-center justify-center shadow-sm">
          <span className={`text-[#00ff00] font-black ${size === "lg" ? "text-[22px]" : "text-[10px]"} leading-none tracking-tighter transform translate-y-0.5`}>BRIT</span>
          <span className={`text-[#00ff00] font-black ${size === "lg" ? "text-[28px]" : "text-[12px]"} leading-none tracking-tighter`}>T&L</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="https://1701c557e7.imgdist.com/pub/bfra/bs6htewz/ce4/qja/ly7/T%26L%20Logo.png" 
      alt="Brit T&L" 
      className={`${size === "lg" ? "h-24" : "h-10"} w-auto object-contain transition-transform hover:scale-105`}
      onError={() => setImageError(true)}
    />
  );
};

const BritALTLogo = ({ size = "sm" }) => {
  const [imageError, setImageError] = useState(false);
  const dimensions = size === "lg" ? "w-24 h-24" : "w-10 h-10";

  if (imageError) {
    return (
      <div className={`${dimensions} bg-[#00ff00] flex items-center justify-center relative overflow-hidden shrink-0 rounded-md shadow-sm transition-transform hover:scale-105`}>
        <div className="absolute bg-[#ad207d] w-[140%] h-[70%] transform -rotate-12 flex flex-col items-center justify-center shadow-sm">
          <span className={`text-[#00ff00] font-black ${size === "lg" ? "text-[22px]" : "text-[10px]"} leading-none tracking-tighter transform translate-y-0.5`}>BRIT</span>
          <span className={`text-[#00ff00] font-black ${size === "lg" ? "text-[28px]" : "text-[12px]"} leading-none tracking-tighter`}>T&L</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="https://lh3.googleusercontent.com/d/1d7OJ-8ZFONj1yHykS6Iqf1xpzuIEccmU?authuser=0" 
      alt="Brit T&L" 
      className={`${size === "lg" ? "h-24" : "h-10"} w-auto object-contain transition-transform hover:scale-105`}
      onError={() => setImageError(true)}
    />
  );
};

const BritLogo = ({ size = "sm" }) => {
  const [imageError, setImageError] = useState(false);
  const dimensions = size === "lg" ? "w-24 h-24" : "w-10 h-10";

  if (imageError) {
    return (
      <div className={`${dimensions} bg-[#00ff00] flex items-center justify-center relative overflow-hidden shrink-0 rounded-md shadow-sm transition-transform hover:scale-105`}>
        <div className="absolute bg-[#ad207d] w-[140%] h-[70%] transform -rotate-12 flex flex-col items-center justify-center shadow-sm">
          <span className={`text-[#00ff00] font-black ${size === "lg" ? "text-[22px]" : "text-[10px]"} leading-none tracking-tighter transform translate-y-0.5`}>BRIT</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="https://lh3.googleusercontent.com/d/1Ii8bNlKCZniVWE6slZB0nDz9wp79RyZr?authuser=0" 
      alt="Brit Logo" 
      className={`${size === "lg" ? "h-24" : "h-10"} w-auto object-contain transition-transform hover:scale-105`}
      onError={() => setImageError(true)}
    />
  );
};

const PasscodeScreen = ({ onVerify }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const checkPassword = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === SITE_PASSWORD.toLowerCase()) {
      onVerify();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center space-y-6">
        <div className="flex justify-center mb-2">
          <BritLogo size="lg" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">Staff Access Only</h2>
          <p className="text-slate-500">Please enter the reflection passcode.</p>
        </div>

        <form onSubmit={checkPassword} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input 
              type="password" 
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border outline-none transition-all font-medium ${error ? 'border-red-300 bg-red-50 focus:border-red-500' : 'border-slate-200 focus:border-[#ad207d] focus:ring-2 focus:ring-pink-100'}`}
              placeholder="Enter passcode..."
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#ad207d] hover:bg-[#8a1a63] text-white font-bold py-3 rounded-lg shadow-lg shadow-pink-100 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <span>Unlock Gallery</span>
            <ArrowRightCircle size={20} />
          </button>
        </form>
        
        {error && (
          <p className="text-red-500 text-sm font-medium animate-pulse">Incorrect passcode. Please try again.</p>
        )}
        
        <p className="text-xs text-slate-400 pt-4 border-t border-slate-50">
          BRIT Professional Development
        </p>
      </div>
    </div>
  );
};

const DEPARTMENTS = [
  "AEN", "Applied Theatre", "BRIT Kids", "Business", "Careers", "Communications", 
  "Counselling", "Dance", "Data & Exams", "Development", "Digital Arts", "English", 
  "Film & Media Production", "Finance", "HR", "Humanities", "IT", "Library", 
  "Maths", "MFL", "Music", "Musical Theatre", "Pastoral", "Production Arts", 
  "Science", "Site", "SLT", "Student Services", "T&L", "Theatre", "Visual Arts & Design"
];

// Demo data as fallback
const DEMO_ENTRIES = [
  /*{
    id: 1,
    name: "Sarah Jenkins",
    department: "Humanities",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    headline: "Attended the 'Rosenshine in Action' seminar.",
    reason: "I realised my questioning technique had become stale. I needed a fresh perspective on how to stretch the high-attainers.",
    takeaway: "The 'Think, Pair, Share' model isn't just a filler—it's a cognitive necessity. The silence is where the thinking happens.",
    impact: "I'm banning 'hands up' on Tuesdays. We're moving to cold-calling with thinking time to force active retrieval.",
    date: "Feb 6, 2026"
  },
  {
    id: 2,
    name: "David Okonjo",
    department: "Science",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    headline: "Visited industry science labs to observe safety protocols.",
    reason: "We're losing engagement in practicals. I wanted to see how industry labs manage safety without killing curiosity.",
    takeaway: "Ownership creates safety. When students predict the risk, they respect the hazard.",
    impact: "Rewriting the Year 10 friction lab. They will design the risk assessment before they even see a Bunsen burner.",
    date: "Feb 6, 2026"
  },*/

];

export default function App() {
  const [isPasscodeVerified, setIsPasscodeVerified] = useState(false);
  const [view, setView] = useState('gallery');
  const [sortBy, setSortBy] = useState('latest');
  const [socialMode, setSocialMode] = useState(false);
  const [entries, setEntries] = useState(DEMO_ENTRIES);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    headline: '',
    reason: '',
    takeaway: '',
    impact: '',
    image: null,
    avatar: null
  });

  // --- FAVICON INJECTION ---
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = 'https://1701c557e7.imgdist.com/pub/bfra/bs6htewz/ce4/qja/ly7/T%26L%20Logo.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  // --- FIREBASE AUTH & SYNC ---
  useEffect(() => {
    if (!auth) return;

    // 1. Authenticate
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // 2. Sync Data
    if (!db || !user) return;

    // Use a simple query to fetch all data, then sort in memory (follows strict rule)
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'reflections'));
    
    const unsubscribeData = onSnapshot(q, (snapshot) => {
      const fetchedEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort in memory by createdAt descending
      fetchedEntries.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      if (fetchedEntries.length > 0) {
        setEntries(fetchedEntries);
      }
    }, (error) => {
      console.error("Error fetching reflections:", error);
    });

    return () => unsubscribeData();
  }, [user]);

  // --- SECURITY CHECK ---
  useEffect(() => {
    const savedSession = sessionStorage.getItem('brit_auth');
    if (savedSession === 'true') {
      setIsPasscodeVerified(true);
    }
  }, []);

  const handleVerify = () => {
    setIsPasscodeVerified(true);
    sessionStorage.setItem('brit_auth', 'true');
  };

  // --- GATEKEEPER RENDER ---
  if (!isPasscodeVerified) {
    return <PasscodeScreen onVerify={handleVerify} />;
  }

  // --- FORM HANDLING ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Resize image to ensure it fits in Firestore (limit ~1MB per doc)
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800; // Limit width to 800px
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to JPEG 0.7 quality
          resolve(canvas.toDataURL('image/jpeg', 0.7)); 
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedBase64 = await resizeImage(file);
        setFormData(prev => ({ ...prev, [field]: resizedBase64 }));
      } catch (err) {
        console.error("Error processing image", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newEntryData = {
      ...formData,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      createdAt: serverTimestamp() // Let server set the time
    };

    try {
      if (db && user) {
        // Save to Cloud
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'reflections'), newEntryData);
      } else {
        // Fallback to local state if offline
        setEntries(prev => [{ id: Date.now(), ...newEntryData }, ...prev]);
      }
      
      setFormData({ name: '', department: '', headline: '', reason: '', takeaway: '', impact: '', image: null, avatar: null });
      setView('gallery');
      setSortBy('latest');
    } catch (error) {
      console.error("Error saving reflection:", error);
      alert("There was an error saving your reflection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- VIEW LOGIC ---

const openSlide = (entry) => {
    setSocialMode(false); 
    setSelectedEntry(entry);
  };
  
  const closeSlide = () => {
    setSocialMode(false); 
    setSelectedEntry(null);
  };

  const nextSlide = (e) => {
    if(e) e.stopPropagation();
    const currentIndex = entries.findIndex(e => e.id === selectedEntry.id);
    const nextIndex = (currentIndex + 1) % entries.length;
    setSelectedEntry(entries[nextIndex]);
  };

  const prevSlide = (e) => {
    if(e) e.stopPropagation();
    const currentIndex = entries.findIndex(e => e.id === selectedEntry.id);
    const prevIndex = (currentIndex - 1 + entries.length) % entries.length;
    setSelectedEntry(entries[prevIndex]);
  };

  const getGroupedEntries = () => {
    const grouped = entries.reduce((acc, entry) => {
      const dept = entry.department || "Other";
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(entry);
      return acc;
    }, {});
    return Object.keys(grouped).sort().map(dept => ({ department: dept, entries: grouped[dept] }));
  };

  const renderCard = (entry) => (
    <div 
      key={entry.id}
      onClick={() => openSlide(entry)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 hover:border-gray-300 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="h-56 overflow-hidden relative shrink-0">
        {/* Fallback image if user didn't upload one */}
        <img 
          src={entry.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000"} 
          alt="Activity" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
           <div className="flex items-center gap-3">
             {entry.avatar ? (
               <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm shrink-0" />
             ) : (
               <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                 <User size={16} />
               </div>
             )}
             <div>
               <h3 className="font-bold text-gray-900 line-clamp-1">{entry.name}</h3>
               <span className="text-xs font-medium text-gray-400">{entry.date}</span>
             </div>
           </div>
           
           <span className="shrink-0 inline-block px-2 py-1 bg-pink-50 rounded-md text-[10px] font-bold tracking-wide text-[#ad207d] border border-pink-100 uppercase mt-0.5 text-center">
             {entry.department}
           </span>
        </div>

        <div className="relative mb-4 flex-1">
          <div className="absolute top-1 left-0 w-1 h-full bg-gray-200 rounded-full"></div>
          <p className="pl-4 text-gray-600 text-lg font-hand leading-relaxed line-clamp-3">
            "{entry.headline || entry.reason}"
          </p>
        </div>
        <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-end text-[#ad207d] font-bold text-sm group-hover:underline decoration-2 underline-offset-4">
          Read more <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans selection:bg-[#ad207d] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-hand { font-family: 'Architects Daughter', cursive; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .slide-up { animation: slideUp 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      {/* Header */}
      <header className={`bg-white border-b border-gray-200 sticky top-0 z-40 transition-all duration-500 ${socialMode ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView('gallery')}>
            <BritALTLogo size="sm" />
           <div className="flex items-baseline gap-1 text-lg sm:text-xl">
             {/* 1. Desktop Version (Hidden on small screens) */}
    <span className="hidden sm:inline font-hand font-bold text-gray-800 tracking-tight">
      Professional Development  <span className="text-[#ad207d]">Reflections</span>
    </span>
    
    {/* 2. Mobile Version (Visible ONLY on small screens) */}
    <span className="sm:hidden font-hand font-bold text-[#ad207d]">
     
    </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('gallery')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${view === 'gallery' ? 'bg-white border-[#ad207d] text-[#ad207d]' : 'bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => setView('form')}
              className="flex items-center gap-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-gray-800 border border-gray-300 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              <Plus size={16} className="text-[#ad207d]" />
              <span>Add Reflection</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-6xl mx-auto px-4 py-10 transition-opacity duration-500 ${socialMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* VIEW: FORM */}
        {view === 'form' && (
          <div className="max-w-2xl mx-auto slide-up">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="bg-[#ad207d] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ad207d] rounded-full blur-3xl opacity-20 transform translate-x-20 -translate-y-20"></div>
                <h2 className="text-2xl font-bold relative z-10">Tell us about your day</h2>
                <p className="text-gray-300 mt-2 relative z-10 font-hand text-lg">Please share by answering the prompts below...</p>
              </div>
            
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">Upload a photo of your day</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'image')}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${formData.image ? 'border-[#ad207d] bg-pink-50/30' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}>
                      {formData.image ? (
                        <div className="relative h-48 w-full">
                           <img src={formData.image} alt="Preview" className="h-full w-full object-contain rounded-lg shadow-sm" />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-white font-bold backdrop-blur-sm">Change Image</div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                            <Camera size={24} />
                          </div>
                          <div>
                            <p className="text-gray-700 font-medium">Click to upload photo</p>
                            <p className="text-gray-400 text-xs mt-1">JPG, PNG up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700">Your Details</label>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative group shrink-0 mx-auto sm:mx-0">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'avatar')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all ${formData.avatar ? 'border-[#ad207d]' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}>
                         {formData.avatar ? (
                           <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                         ) : (
                           <div className="text-center">
                             <User size={20} className="mx-auto text-gray-400 mb-1" />
                             <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Add Photo</span>
                           </div>
                         )}
                      </div>
                    </div>

                    <div className="flex-1 w-full space-y-4">
                      <div className="space-y-1">
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ad207d] focus:ring-2 focus:ring-pink-500/10 outline-none transition-all font-medium placeholder:text-gray-400"
                          placeholder="Your Full Name"
                        />
                      </div>
                      <div className="space-y-1">
                        <select
                          name="department"
                          required
                          value={formData.department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ad207d] focus:ring-2 focus:ring-pink-500/10 outline-none transition-all font-medium text-gray-700"
                        >
                          <option value="" disabled className="text-gray-400">Select Department</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                 {/* Headline */}
                 <div className="space-y-2 pt-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Type size={16} className="text-[#ad207d]" />
                      Please describe your day
                    </label>
                       <textarea 
                      name="headline"
                      required
                      rows="2"
                      value={formData.headline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ad207d] focus:ring-2 focus:ring-pink-500/10 outline-none transition-all font-hand text-lg text-gray-600 placeholder:font-sans placeholder:text-sm placeholder:text-gray-400"
                      placeholder="What did you do? Who did you see? Where did you go?"
                    />
                  </div>

                {/* Questions */}
                <div className="space-y-6 pt-2">
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Zap size={16} className="text-[#ad207d]" />
                      What drew you to this?
                    </label>
                    <textarea 
                      name="reason"
                      required
                      rows="2"
                      value={formData.reason}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ad207d] focus:ring-2 focus:ring-pink-500/10 outline-none transition-all font-hand text-lg text-gray-600 placeholder:font-sans placeholder:text-sm placeholder:text-gray-400"
                      placeholder="Was it a gap in your knowledge? A student / dept need? Pure curiosity?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Lightbulb size={16} className="text-[#ad207d]" />
                      What was your takeaway that you'd like to share?
                    </label>
                    <textarea 
                      name="takeaway"
                      required
                      rows="2"
                      value={formData.takeaway}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ad207d] focus:ring-2 focus:ring-pink-500/10 outline-none transition-all font-hand text-lg text-gray-600 placeholder:font-sans placeholder:text-sm placeholder:text-gray-400"
                      placeholder="Was there a moment that shifted your thinking?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Waves size={16} className="text-[#ad207d]" />
                      What changes next week?
                    </label>
                    <textarea 
                      name="impact"
                      required
                      rows="2"
                      value={formData.impact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ad207d] focus:ring-2 focus:ring-pink-500/10 outline-none transition-all font-hand text-lg text-gray-600 placeholder:font-sans placeholder:text-sm placeholder:text-gray-400"
                      placeholder="One actionable thing you will do differently..."
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3 border-t border-gray-100">
                   <button 
                    type="button" 
                    onClick={() => setView('gallery')}
                    className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-2.5 rounded-lg bg-[#ad207d] hover:bg-[#8a1a63] text-white font-bold shadow-lg shadow-pink-100 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : 'Share Reflection'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* VIEW: GALLERY */}
        {view === 'gallery' && (
          <div className="space-y-16 fade-in">
            <div className="flex flex-col items-center text-center space-y-6 pt-4">
              <BritLogo size="lg" />
              
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-4xl sm:text-4xl font-hand font-bold text-gray-900 leading-tight">
                  Professional Development Gallery
                </h2>
                <p className="text-gray-500 text-lg font-normal pt-2">
                  Have a browse of the gallery. Use the button at the top to add your own <span className="font-hand text-[#ad207d]">reflection</span>.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button 
                  onClick={() => setSortBy('latest')}
                  className={`flex items-center gap-2 border px-6 py-2.5 rounded-lg font-bold shadow-sm hover:shadow-md transition-all ${sortBy === 'latest' ? 'bg-white text-[#ad207d] border-[#ad207d]' : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-100'}`}
                >
                  <TrendingUp size={18} />
                  <span>Latest</span>
                </button>
                 <button 
                   onClick={() => setSortBy('department')}
                   className={`flex items-center gap-2 border px-6 py-2.5 rounded-lg font-bold shadow-sm hover:shadow-md transition-all ${sortBy === 'department' ? 'bg-white text-[#ad207d] border-[#ad207d]' : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-100'}`}
                 >
                  <Layers size={18} />
                  <span>By Dept</span>
                </button>
              </div>
            </div>

            {sortBy === 'latest' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {entries.map(renderCard)}
              </div>
            ) : (
              <div className="space-y-16 pb-12">
                {getGroupedEntries().map((group) => (
                  <div key={group.department} className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
                      <span className="bg-pink-100 text-[#ad207d] px-4 py-1.5 rounded-lg text-xl font-bold font-hand shadow-sm transform -rotate-1 inline-block">
                        {group.department}
                      </span>
                      <span className="text-gray-400 text-sm font-medium">{group.entries.length} {group.entries.length === 1 ? 'reflection' : 'reflections'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                       {group.entries.map(renderCard)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

     {/* FULL SCREEN SLIDE MODAL */}
{selectedEntry && (
  <div className={`fixed inset-0 z-50 flex flex-col items-center backdrop-blur-sm fade-in ${socialMode ? 'bg-[#f8f9fa] p-4 overflow-y-auto' : 'justify-center bg-gray-900/60 p-4 sm:p-8'}`}>
    
    {/* Navigation Controls - Hidden in Social Mode */}
    {!socialMode && (
      <>
        <button onClick={closeSlide} className="absolute top-4 right-4 text-pink-50/70 hover:text-white transition-colors z-50">
          <X size={32} />
        </button>
        <button onClick={prevSlide} className="absolute left-2 sm:left-8 text-white/40 hover:text-white transition-colors hidden sm:block p-2 hover:bg-white/10 rounded-full">
          <ChevronLeft size={48} />
        </button>
        <button onClick={nextSlide} className="absolute right-2 sm:right-8 text-white/40 hover:text-white transition-colors hidden sm:block p-2 hover:bg-white/10 rounded-full">
          <ChevronRight size={48} />
        </button>
      </>
    )}

    {/* Controls - Subtle Social Mode Nav Bar */}
    {socialMode && (
      <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center items-center px-4 pointer-events-none">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-[#ad207d]/10 pointer-events-auto">
          <button onClick={prevSlide} className="p-2.5 text-gray-500 hover:text-[#ad207d] hover:bg-pink-50 rounded-xl transition-all">
            <ChevronLeft size={22} />
          </button>
          <button 
            onClick={() => setSocialMode(false)}
            className="flex items-center gap-2 px-5 py-2 bg-pink-50 text-[#ad207d] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#ad207d] hover:text-white transition-all border border-[#ad207d]/20"
          >
            <X size={14} /> Exit Quick Card Mode
          </button>
          <button onClick={nextSlide} className="p-2.5 text-gray-500 hover:text-[#ad207d] hover:bg-pink-50 rounded-xl transition-all">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    )}

    {/* THE MAIN CARD CONTAINER */}
    <div className={`bg-white w-full rounded-2xl overflow-hidden shadow-2xl flex transition-all duration-500 
      ${socialMode 
        ? 'flex-col max-w-[550px] aspect-[4/5] md:aspect-square my-auto shadow-none border-2 border-[#ad207d]/10' 
        : 'flex-col md:flex-row max-w-5xl max-h-full h-full md:h-auto'
      }`}>
      
      {/* Left/Top: Image Section */}
      <div className={`bg-black relative shrink-0 transition-all duration-500
        ${socialMode 
          ? 'w-full h-1/2' 
          : 'w-full md:w-5/12 h-64 md:h-auto'
        }`}>
        <img 
          key={selectedEntry.id}
          src={selectedEntry.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000"} 
          alt="Detail" 
          className="absolute inset-0 w-full h-full object-contain" 
        />
        
      

        {/* Normal Mode Mobile Overlay */}
        {!socialMode && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden">
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl">{selectedEntry.name}</h3>
              <p className="opacity-90">{selectedEntry.department}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Right/Bottom: Content Section */}
<div className={`bg-white transition-all duration-500
  ${socialMode 
    ? 'w-full h-1/2 p-6 flex flex-col overflow-y-auto touch-pan-y' 
    : 'w-full md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[85vh]'
  }`}>

      <div className={socialMode ? 'my-auto w-full' : ''}>
        
        {/* Header: Name & Social Toggle */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
          <div className="flex items-center gap-4">
            {selectedEntry.avatar ? (
              <img src={selectedEntry.avatar} alt={selectedEntry.name} className="w-16 h-16 rounded-full object-cover border-4 border-gray-50 shadow-md" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shadow-sm border-4 border-gray-50">
                <User size={32} />
              </div>
            )}
            <div>
              <h3 className="font-extrabold text-gray-900 text-2xl">{selectedEntry.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 font-medium">
                <span className="bg-pink-50 text-[#ad207d] px-2 py-0.5 rounded">{selectedEntry.department}</span>
                {socialMode && <span className="text-[#ad207d] font-bold">• BRIT Staff CPD</span>}
                {!socialMode && <><span>•</span><span>{selectedEntry.date}</span></>}
              </div>
            </div>
          </div>

          {!socialMode && (
            <button 
              onClick={() => setSocialMode(true)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#ad207d] transition-colors"
              title="Quick Card Mode"
            >
              <GalleryThumbnails size={20} />
            </button>
          )}
        </div>
        
     {/* Headline Quote */}
<div className={`${socialMode ? 'mb-0' : 'mb-8'}`}>
<h2 
  className="font-hand font-bold text-[#ad207d] leading-snug"
  style={{ 
    fontSize: socialMode 
      ? `${Math.max(14, 20 - (selectedEntry.reason?.length / 20))}px` 
      : '' 
  }}
>
  "{selectedEntry.headline || selectedEntry.reason}"
</h2>
</div>

        {/* Detailed Info (Normal Mode Only) */}
        {!socialMode && (
          <div className="space-y-10">
            {/* Purpose */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#ad207d] uppercase tracking-wide">
                <Zap size={18} /> Purpose
              </h4>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-lg text-gray-700 font-hand leading-relaxed">{selectedEntry.reason}</p>
              </div>
            </div>

            {/* Takeaway */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#ad207d] uppercase tracking-wide">
                <Lightbulb size={18} /> Key Takeaway
              </h4>
              <div className="bg-pink-50/80 p-6 rounded-xl border border-yellow-100">
                <p className="text-gray-800 font-hand text-lg leading-relaxed">{selectedEntry.takeaway}</p>
              </div>
            </div>

            {/* Impact */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#ad207d] uppercase tracking-wide">
                <Waves size={18} /> Future Impact
              </h4>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-gray-800 font-hand text-lg leading-relaxed">{selectedEntry.impact}</p>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-mono">
              <span>ID: {selectedEntry.id}</span>
              <span>VERIFIED SUBMISSION</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  </div>
)}
        
    </div>
  );
}
