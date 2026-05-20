import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Book, Mail, HelpCircle, UserPlus, LogIn, Store, ChevronLeft } from 'lucide-react';
import YetiLogin from './components/YetiLogin';

// Custom Icons provided by user
const ICONS = {
  SEARCH: "https://25nlk7g645.ucarecd.net/845e00f3-61c7-46ef-863a-ccfb4b286294/Glass.svg",
  STAR_HOLLOW: "https://25nlk7g645.ucarecd.net/e2f7872b-d674-40fd-9aa1-36531202d003/StarHollow.svg",
  STAR_FILLED: "https://25nlk7g645.ucarecd.net/bfc1c03b-b67b-4def-a458-038f6f95f5b6/StarFilled.svg",
  NAV_PASSPORT: "https://25nlk7g645.ucarecd.net/00e01b07-ef8c-46cb-870a-05c2cdd06c8b/Passport.svg",
  NAV_MAP: "https://25nlk7g645.ucarecd.net/cc2e4358-6cee-4814-9f3a-1a482301c154/Location.svg",
  LOGO: "https://25nlk7g645.ucarecd.net/5cbf1317-69a7-405a-8473-5379b0fbe8da/SalePlanLogo.svg"
};

const AVATARS = [
  "https://25nlk7g645.ucarecd.net/c8c8a16f-5352-49e4-b712-630aa9258b9e/TriangleCharacter.png",
  "https://25nlk7g645.ucarecd.net/2d90877e-68f1-45bd-ba61-73b10d5fba6a/RhombCharacter.png",
  "https://25nlk7g645.ucarecd.net/b8e9b963-37d2-4266-b1d3-2f52b306f8dd/StarCharacter.png",
  "https://25nlk7g645.ucarecd.net/fa4658c8-38f5-446e-91dc-6f9100b109d8/SquareCharacter.png"
];

type Screen = 'ONBOARDING' | 'USER_LOGIN' | 'USER_REGISTER' | 'USER_ONBOARDING_PREFS' | 'USER_HOME' | 'USER_SEARCH' | 'USER_REVIEWS' | 'USER_PROFILE' | 'USER_WALLET' | 'COMMERCE_LOGIN' | 'COMMERCE_DASHBOARD' | 'COMMERCE_CREATE_EXPERIENCE' | 'REGISTER_CHOICE' | 'LOGIN_CHOICE' | 'FAQ' | 'ABOUT' | 'CONTACT' | 'AFFILIATE';

const ALL_CATEGORIES = [
  { id: 'gastro', name: 'Gastronomía', emoji: '🌮' },
  { id: 'cultura', name: 'Cultura', emoji: '🎭' },
  { id: 'naturaleza', name: 'Naturaleza', emoji: '🌿' },
  { id: 'comercio', name: 'Tiendas Locales', emoji: '🛍️' },
  { id: 'arte', name: 'Arte', emoji: '🎨' },
  { id: 'nocturna', name: 'Vida Nocturna', emoji: '🍷' },
  { id: 'cafe', name: 'Café & Postres', emoji: '☕' },
  { id: 'turismo', name: 'Turismo', emoji: '📸' }
];

const POIS = [
  ...[
    { id: 1, name: "Café Central", category: "Café & Postres", icon: "☕️", location: "Zona Norte", description: "El mejor café de especialidad de la ciudad con un ambiente acogedor.", color: "bg-blue-50 text-blue-800 border-blue-200", date: "Lun-Vie, 8:00 - 20:00" },
    { id: 2, name: "Museo de Arte", category: "Arte", icon: "🎨", location: "Centro Histórico", description: "Obras clásicas y modernas. No te pierdas la exhibición de los miércoles.", color: "bg-purple-50 text-purple-800 border-purple-200", date: "Mar-Dom, 10:00 - 18:00" },
    { id: 3, name: "Burger Fest", category: "Gastronomía", icon: "🍔", location: "Zona Sur", description: "Hamburguesas artesanales de otro planeta con ingredientes locales.", color: "bg-red-50 text-red-800 border-red-200", date: "Diario, 12:00 - 23:00" },
    { id: 4, name: "Parque Botánico", category: "Naturaleza", icon: "🌿", location: "Este", description: "Un respiro verde en medio de la jungla de asfalto. Ideal para paseos largos.", color: "bg-green-50 text-green-800 border-green-200", date: "Diario, 6:00 - 18:00" },
    { id: 5, name: "Librería El Tomo", category: "Comercio", icon: "📚", location: "Centro Histórico", description: "Libros raros, primeras ediciones y un ambiente mágico para leer.", color: "bg-yellow-50 text-yellow-800 border-yellow-200", date: "Lun-Sáb, 9:00 - 19:00" },
    { id: 6, name: "Heladería Polar", category: "Café & Postres", icon: "🍦", location: "Zona Norte", description: "Helados artesanales con sabores únicos e inigualables.", color: "bg-pink-50 text-pink-800 border-pink-200", date: "Diario, 11:00 - 21:00" },
    { id: 7, name: "Teatro Municipal", category: "Cultura", icon: "🎭", location: "Centro", description: "Las mejores obras teatrales clásicas y contemporáneas de la ciudad.", color: "bg-purple-50 text-purple-800 border-purple-200", date: "Funciones Variables" },
    { id: 8, name: "Mirador del Valle", category: "Turismo", icon: "🔭", location: "Oeste", description: "La mejor vista panorámica para ver el atardecer perfecto.", color: "bg-blue-50 text-blue-800 border-blue-200", date: "Diario, 24h" },
    { id: 9, name: "Club de Jazz Local", category: "Vida Nocturna", icon: "🎷", location: "Centro", description: "Música en vivo cada noche con los mejores músicos locales e internacionales.", color: "bg-indigo-50 text-indigo-800 border-indigo-200", date: "Jue-Sáb, 20:00 - 2:00" },
    { id: 10, name: "Pizzería Nápoles", category: "Gastronomía", icon: "🍕", location: "Zona Sur", description: "Auténtica pizza napolitana al horno de leña, como en Italia.", color: "bg-red-50 text-red-800 border-red-200", date: "Diario, 12:00 - 22:00" },
    { id: 11, name: "Boutique Vintage", category: "Tiendas Locales", icon: "👗", location: "Este", description: "Ropa vintage y piezas curadas de los años 80 y 90.", color: "bg-orange-50 text-orange-800 border-orange-200", date: "Lun-Sáb, 10:00 - 19:00" },
    { id: 12, name: "Jardín Japonés", category: "Naturaleza", icon: "⛩️", location: "Oeste", description: "Conecta con la naturaleza y encuentra tu zen interior en este hermoso espacio.", color: "bg-green-50 text-green-800 border-green-200", date: "Mar-Dom, 9:00 - 17:00" },
    { id: 13, name: "Barra de Sushi", category: "Gastronomía", icon: "🍣", location: "Zona Norte", description: "Los mejores cortes y rollos creativos con pescado fresco todos los días.", color: "bg-red-50 text-red-800 border-red-200", date: "Diario, 12:00 - 23:00" },
    { id: 14, name: "Tienda de Discos", category: "Tiendas Locales", icon: "💿", location: "Centro Histórico", description: "Vinilos clásicos, nuevos lanzamientos y joyas escondidas musicales.", color: "bg-zinc-50 text-zinc-800 border-zinc-200", date: "Lun-Sáb, 11:00 - 20:00" },
    { id: 15, name: "Mercado Local", category: "Turismo", icon: "🌮", location: "Sur", description: "Descubre la comida callejera, frutas exóticas y la vibra del verdadero comercio.", color: "bg-orange-50 text-orange-800 border-orange-200", date: "Diario, 7:00 - 16:00" }
  ],
  { id: 101, name: 'Atardecer Acústico', category: 'Evento Flash', location: 'Café Central', description: 'Sube una selfie etiquetando a @SalePlan.sv y @CafeCentral en historias', pts: '2x Puntos (2 Sellos)', icon: '🎸', isFlash: true, date: 'Viernes 18, 18:00 - 20:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 102, name: 'Noche de Museos', category: 'Evento Flash', location: 'Museo de Arte', description: 'Asiste con 2 amigos que tengan la app', pts: 'Entrada VIP Gratis + 1 Sello', icon: '🏛️', isFlash: true, date: 'Sábado 19, 19:00 - 23:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
  { id: 103, name: 'Flash Burger', category: 'Evento Flash', location: 'Burger Fest', description: 'Compra el combo "Explorador" para validar', pts: '3x Puntos (3 Sellos)', icon: '🍔', isFlash: true, date: 'Hoy, 12:00 - 15:00', color: "bg-yellow-50 text-yellow-800 border-yellow-200" }
];

const FLASH_EVENTS = POIS.filter(poi => poi.isFlash);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ONBOARDING');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [savedPOIs, setSavedPOIs] = useState<number[]>([1, 3]);
  const [selectedPOI, setSelectedPOI] = useState<number | null>(null);
  const [stampedPOIs, setStampedPOIs] = useState<number[]>([]);
  const [qrModalPOIId, setQrModalPOIId] = useState<number | null>(null);
  const [prevScreen, setPrevScreen] = useState<Screen>('ONBOARDING');
  const [showPwaGuide, setShowPwaGuide] = useState(false);
  const [pwaStep, setPwaStep] = useState(0);
  const [pwaPermanentlyHidden, setPwaPermanentlyHidden] = useState(() => {
    return localStorage.getItem('pwa_guide_hidden') === 'true';
  });
  const [commerceTab, setCommerceTab] = useState<'ESCANEO' | 'CRM' | 'CONFIG'>('ESCANEO');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync with URL hash
  React.useEffect(() => {
    // Image Preloading for performance
    [...AVATARS, ...Object.values(ICONS)].forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toUpperCase();
      
      // Reset selected POI if we transition away from a POI hash
      if (!hash.startsWith('POI-')) {
        setSelectedPOI(null);
      }

      // Handle POI deep links like #/poi-5
      if (hash.startsWith('POI-')) {
        const id = parseInt(hash.split('-')[1]);
        if (!isNaN(id)) {
          setSelectedPOI(id);
          setCurrentScreen('USER_SEARCH'); // Context for details
          return;
        }
      }

      const validScreens: Screen[] = [
        'ONBOARDING', 'USER_LOGIN', 'USER_REGISTER', 'USER_ONBOARDING_PREFS', 
        'USER_HOME', 'USER_SEARCH', 'USER_REVIEWS', 'USER_PROFILE', 
        'USER_WALLET', 'COMMERCE_LOGIN', 'COMMERCE_DASHBOARD', 'COMMERCE_CREATE_EXPERIENCE',
        'REGISTER_CHOICE'
      ];
      
      if (hash && validScreens.includes(hash as Screen)) {
        setCurrentScreen(hash as Screen);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when screen changes
  React.useEffect(() => {
    let hash = currentScreen.toLowerCase();
    // If we're looking at a POI, reflect it in URL
    if (selectedPOI && currentScreen === 'USER_SEARCH') {
       hash = `poi-${selectedPOI}`;
    }
    
    if (window.location.hash !== `#/${hash}`) {
      window.location.hash = `#/${hash}`;
    }
  }, [currentScreen, selectedPOI]);

  const navigateTo = (screen: Screen, poiId: number | null = null) => {
    if (screen !== currentScreen || poiId !== selectedPOI) {
      setPrevScreen(currentScreen);
      setSelectedPOI(poiId);
      setCurrentScreen(screen);
    }
  };

  const isStandalone = () => {
    const nav = window.navigator as any;
    return nav.standalone || window.matchMedia('(display-mode: standalone)').matches || window.location.search.includes('mode=standalone');
  };

  const handleLoggedAction = (screen: Screen) => {
    if (!isStandalone()) {
      setShowPwaGuide(true);
    }
    navigateTo(screen);
  };

  // --- Components ---

  const PwaGuideModal = () => {
    const steps = [
      {
        title: "Paso 1: Compartir",
        desc: "Toca el botón 'Compartir' en Safari",
        img: "https://25nlk7g645.ucarecd.net/aafd6bdc-7f3c-4e64-b776-e9517011c6b2/Paso1.jpg",
        aspect: "aspect-[1179/276]"
      },
      {
        title: "Paso 2: Agregar",
        desc: "Selecciona 'Agregar a inicio'",
        img: "https://25nlk7g645.ucarecd.net/5d76fc0b-7227-4ee8-a617-8d641c3ede52/Paso2.jpg",
        aspect: "aspect-[1179/1926]"
      },
      {
        title: "Paso 3: Confirmar",
        desc: "Dale a 'Agregar' y ¡listo!",
        img: "https://25nlk7g645.ucarecd.net/df5fb43e-d31a-40e9-9036-2a21cd3cf5f8/Paso3.jpg",
        aspect: "aspect-[1179/1013]"
      }
    ];

    if (!showPwaGuide || pwaPermanentlyHidden) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm transition-opacity">
        <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300 max-h-[90vh]">
          <div className="p-8 pb-2">
            <h3 className="text-2xl font-heading text-[#253884] mb-1 leading-tight text-center">Instala la App</h3>
            <p className="text-gray-400 text-[10px] font-medium mb-4 text-center">Mejora tu experiencia agregando SalePlan a tu inicio.</p>
          </div>

          <div className="flex-1 px-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pwaStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full items-center"
              >
                <div className="flex items-center justify-between w-full mb-3">
                   <p className="text-[10px] font-black text-[#253884] uppercase tracking-widest">{steps[pwaStep].title}</p>
                   <div className="flex gap-1">
                      {steps.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === pwaStep ? 'bg-[#253884]' : 'bg-gray-200'}`} />
                      ))}
                   </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center w-full h-[280px]">
                  <img 
                    src={steps[pwaStep].img} 
                    className="max-w-full max-h-full object-contain" 
                    alt={steps[pwaStep].title} 
                  />
                </div>
                <p className="text-gray-500 text-xs font-medium mt-4 text-center leading-relaxed px-2">{steps[pwaStep].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-8 pt-4 space-y-2">
            {pwaStep < steps.length - 1 ? (
              <button 
                onClick={() => setPwaStep(pwaStep + 1)} 
                className="w-full py-4 bg-[#253884] text-white rounded-2xl font-bold uppercase shadow-lg active:scale-[0.98] transition-transform text-sm"
              >
                Siguiente Paso
              </button>
            ) : (
              <button 
                onClick={() => { setShowPwaGuide(false); setPwaStep(0); }} 
                className="w-full py-4 bg-[#253884] text-white rounded-2xl font-bold uppercase shadow-lg active:scale-[0.98] transition-transform text-sm"
              >
                ¡Entendido!
              </button>
            )}
            
            <div className="flex flex-col items-center gap-1 pt-2">
              <button 
                onClick={() => { setShowPwaGuide(false); setPwaStep(0); }} 
                className="text-gray-400 font-bold uppercase text-[9px] tracking-widest hover:text-[#253884] transition-colors py-1"
              >
                Lo haré después
              </button>
              <button 
                onClick={() => { 
                  localStorage.setItem('pwa_guide_hidden', 'true');
                  setPwaPermanentlyHidden(true);
                  setShowPwaGuide(false); 
                }} 
                className="text-red-400 font-bold uppercase text-[9px] tracking-widest hover:text-red-600 transition-colors py-1"
              >
                No volver a mostrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Layout = ({ children, bgClass = 'bg-gray-50' }: { children: React.ReactNode, bgClass?: string }) => (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f3f4f6]">
      <div className={`flex-1 w-full max-w-md mx-auto relative flex flex-col shadow-2xl ${bgClass} overflow-x-hidden overflow-y-auto no-scrollbar`}
           style={{ paddingTop: 'env(safe-area-inset-top, 24px)', paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}>
        {children}
      </div>
    </div>
  );

  const BottomNav = ({ active } : { active: string }) => {
    return (
      <div className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around items-center h-20 px-2 z-40 pb-safe shadow-[0_-4px_20px_rgba(37,56,132,0.05)]">
        <button onClick={() => navigateTo('USER_WALLET')} className="relative flex flex-col items-center justify-center w-14 h-14 transition-all group">
          <img src={ICONS.NAV_PASSPORT} className={`w-6 h-6 transition-all ${active === 'wallet' ? '' : 'opacity-40 group-hover:opacity-80'}`} alt="Pasaporte" />
          {active === 'wallet' && <div className="absolute bottom-1 w-4 h-[3px] bg-[#253884] rounded-full" />}
        </button>
        <button onClick={() => navigateTo('USER_HOME')} className="relative flex flex-col items-center justify-center w-14 h-14 transition-all group">
          <img src={ICONS.NAV_MAP} className={`w-6 h-6 transition-all ${active === 'home' ? '' : 'opacity-40 group-hover:opacity-80'}`} alt="Paradas" />
          {active === 'home' && <div className="absolute bottom-1 w-4 h-[3px] bg-[#253884] rounded-full" />}
        </button>
        <button onClick={() => navigateTo('USER_PROFILE')} className="relative flex flex-col items-center justify-center w-14 h-14 transition-all group">
          <div className={`w-8 h-8 rounded-full overflow-hidden bg-gray-100 transition-all ${active === 'profile' ? 'border-2 border-[#253884]' : 'opacity-60 border border-transparent group-hover:opacity-100'}`}>
            <img src={selectedAvatar} alt="Perfil" className="w-full h-full object-cover" />
          </div>
          {active === 'profile' && <div className="absolute bottom-1 w-4 h-[3px] bg-[#253884] rounded-full" />}
        </button>
      </div>
    );
  };

  // --- Screens ---

  const renderStaticPage = (title: string, content: string) => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative max-w-lg mx-auto">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-100 w-12 h-12 rounded-2xl flex justify-center items-center shadow-sm z-20 text-[#253884] hover:bg-gray-50 transition-all active:scale-90">
          <ChevronLeft size={24} />
        </button>

        <div className="mt-12 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-heading text-[#253884] tracking-tight">{title}</h1>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full opacity-20" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(37,56,132,0.08)] text-left"
          >
            {content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className={`text-gray-600 leading-relaxed font-medium ${idx !== 0 ? 'mt-6' : ''}`}>
                {paragraph}
              </p>
            ))}
            
            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center gap-4">
               <img src={ICONS.LOGO} alt="SalePlan" className="h-4 opacity-30 grayscale" />
               <span className="text-[10px] uppercase font-black text-gray-200 tracking-[0.2em]">v.1.0.4</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );

  const renderOnboarding = () => (
    <Layout bgClass="bg-white">
      <div className="flex justify-between items-center p-6 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={ICONS.LOGO} alt="SalePlan" className="h-8" />
          <span className="font-heading text-2xl text-[#253884] tracking-tighter pt-1">SalePlan</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo('LOGIN_CHOICE')} className="text-[10px] font-bold px-3 py-2 text-[#253884] hover:text-blue-800 transition-colors uppercase whitespace-nowrap">
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-[#253884]"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[90] bg-[#253884]/40 backdrop-blur-sm shadow-2xl"
            />
            <motion.div 
              initial={{ opacity: 0, x: '100%', borderRadius: '100% 0 0 100%' }}
              animate={{ opacity: 1, x: 0, borderRadius: '0% 0 0 0%' }}
              exit={{ opacity: 0, x: '100%', borderRadius: '100% 0 0 100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 left-12 sm:left-24 z-[100] bg-white flex flex-col overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.1)]"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#253884]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="flex justify-between items-center p-8 relative z-10">
                <div className="flex items-center gap-2">
                  <img src={ICONS.LOGO} alt="SalePlan" className="h-6" />
                  <span className="font-heading text-xl text-[#253884] tracking-tighter">MENÚ</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl text-[#253884] hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col p-8 pt-0 relative z-10 overflow-y-auto no-scrollbar">
                <p className="text-[10px] uppercase font-bold text-gray-300 tracking-[0.2em] mb-8">Navegación</p>
                
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Registrarme', screen: 'REGISTER_CHOICE', icon: <UserPlus size={20} />, color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Preguntas Frecuentes', screen: 'FAQ', icon: <HelpCircle size={20} />, color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Acerca de SalePlan', screen: 'ABOUT', icon: <Book size={20} />, color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Contacto', screen: 'CONTACT', icon: <Mail size={20} />, color: 'bg-blue-50 text-[#253884]' },
                    { label: 'Afíliate', screen: 'AFFILIATE', icon: <Store size={20} />, color: 'bg-blue-50 text-[#253884]' },
                  ].map((item, idx) => (
                    <motion.button
                      key={item.screen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigateTo(item.screen as Screen);
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#253884] hover:shadow-md transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} transition-transform group-hover:scale-110`}>
                          {item.icon}
                        </div>
                        <span className="text-base font-bold text-[#253884]">{item.label}</span>
                      </div>
                      <ArrowRight size={16} className="text-gray-300 group-hover:text-[#253884] transition-colors" />
                    </motion.button>
                  ))}
                </div>

                <div className="mt-12 bg-blue-50 p-6 rounded-3xl border border-blue-100 relative overflow-hidden shadow-sm">
                  <div className="relative z-10">
                    <h4 className="text-xl font-heading mb-1 text-[#253884]">¿Ya tienes cuenta?</h4>
                    <p className="text-xs text-blue-600/60 mb-6 font-medium">Ingresa para continuar explorando la ciudad.</p>
                    <button 
                      onClick={() => { setIsMenuOpen(false); navigateTo('LOGIN_CHOICE'); }}
                      className="w-full py-4 bg-[#253884] text-white font-bold rounded-2xl uppercase text-[10px] tracking-widest active:scale-[0.95] transition-transform flex items-center justify-center gap-2 shadow-lg"
                    >
                      <LogIn size={14} /> Iniciar Sesión
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#253884] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
              </div>

              <div className="p-8 pt-0 relative z-10">
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10px] uppercase font-black text-gray-300 tracking-[0.2em]">SalePlan © 2026</p>
                  <p className="text-[10px] uppercase font-black text-gray-300 tracking-[0.2em]">v.1.0.4</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="w-full pb-24 px-6 pt-12 text-center flex flex-col">
         <div className="mb-8">
            <h1 className="text-5xl leading-tight font-heading text-[#253884] tracking-tight mb-4">
               Tu Pasaporte<br/>A La Ciudad
            </h1>
            <p className="font-medium text-gray-500 mb-8 text-sm max-w-[280px] mx-auto text-balance">
               Explora lugares únicos, colecciona sellos digitales y gana recompensas exclusivas mientras descubres los mejores rincones de la ciudad.
            </p>

            <div className="relative w-48 h-48 mx-auto mb-16 flex justify-center items-center">
               <div className="absolute inset-0 bg-[#e6eaf8] rounded-full scale-110 opacity-50"></div>
               <div className="absolute inset-0 bg-[#e6eaf8] rounded-full"></div>
               <img src={ICONS.NAV_PASSPORT} className="w-24 h-24 relative z-10" alt="Passport" />
            </div>

            <div className="space-y-4 mb-12 text-center max-w-sm mx-auto">
               <button onClick={() => navigateTo('REGISTER_CHOICE')} className="w-full py-5 bg-[#253884] text-white font-bold uppercase text-lg rounded-2xl shadow-xl hover:shadow-[#253884]/20 transition-all active:scale-[0.98]">
                  Comenzar Ahora
               </button>
               <p className="text-xs text-gray-400 mt-2 px-8 text-balance mx-auto">Únete a cientos de exploradores y comercios locales.</p>
            </div>
         </div>

         <div className="space-y-6 mb-12 text-left">

            <h2 className="text-2xl font-heading text-[#191308] text-center mb-6">¿Cómo Funciona?</h2>
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
               <div className="w-12 h-12 rounded-full bg-[#D5A021]/10 flex items-center justify-center shrink-0">
                  <img src={ICONS.NAV_MAP} className="w-6 h-6" alt="Explora" />
               </div>
               <div>
                  <h3 className="font-bold text-[#253884] mb-1">Descubre Retos</h3>
                  <p className="text-xs text-gray-500">Encuentra cafeterías, museos y tiendas locales con misiones especiales esperándote.</p>
               </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
               <div className="w-12 h-12 rounded-full bg-[#253884]/10 flex items-center justify-center shrink-0">
                  <img src={ICONS.NAV_PASSPORT} className="w-6 h-6" alt="Sellos" />
               </div>
               <div>
                  <h3 className="font-bold text-[#253884] mb-1">Colecciona Sellos</h3>
                  <p className="text-xs text-gray-500">Completa la misión, escanea tu QR en el local y obtén tu sello digital al instante.</p>
               </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
               <div className="w-12 h-12 rounded-full bg-[#B3001B]/10 flex items-center justify-center shrink-0">
                  <img src={ICONS.STAR_FILLED} className="w-6 h-6" alt="Recompensas" />
               </div>
               <div>
                  <h3 className="font-bold text-[#253884] mb-1">Gana Recompensas</h3>
                  <p className="text-xs text-gray-500">Acumula sellos en tu pasaporte y canjéalos por descuentos, productos gratis y más.</p>
               </div>
            </div>
         </div>

         <div className="space-y-3">
            <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold mb-4">¡Comienza tu viaje hoy!</p>
            {/* Section moved above How It Works */}
         </div>
      </div>
    </Layout>
  );

  const renderUserLogin = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 hover:text-[#253884] transition-colors">
          <span className="font-bold text-xl leading-none -mt-1">←</span>
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full relative z-10">
          <h1 className="text-4xl font-heading text-center mb-10 text-[#253884]">¡Bienvenido!</h1>
          
          <YetiLogin onLogin={() => handleLoggedAction('USER_ONBOARDING_PREFS')} />
          
          <div className="mt-8 text-center text-sm font-semibold">
            <span className="text-gray-400 block mb-1">¿Aún no tienes cuenta?</span>
            <button onClick={() => navigateTo('USER_REGISTER')} className="text-[#253884] font-bold mt-1 hover:underline">Regístrate Aquí</button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderUserRegister = () => (
    <Layout bgClass="bg-white halftone-bg-light">
       <div className="flex-1 p-6 pb-24 relative flex flex-col items-center pt-16">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 hover:text-[#253884] transition-colors">
          <span className="font-bold text-xl leading-none -mt-1">←</span>
        </button>

        <h1 className="text-4xl font-heading mb-6 text-center text-[#253884]">Crear Perfil</h1>
        
        <div className="bg-white p-8 rounded-3xl subtle-shadow w-full card-shadow">
           <div className="space-y-4">
              <input type="text" placeholder="Nombre o Apodo" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-colors placeholder:text-gray-400" />
              <input type="email" placeholder="Correo Electrónico" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-colors placeholder:text-gray-400" />
              <input type="password" placeholder="Contraseña Segura" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#253884] focus:bg-white rounded-xl font-medium text-[#253884] outline-none transition-colors placeholder:text-gray-400" />
              
              <div className="pt-6 border-t border-gray-100">
                <p className="font-bold text-center mb-4 text-sm text-gray-500">¿Qué avatar te representa?</p>
                <div className="flex gap-4 p-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                  {AVATARS.map((avatar, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`flex-none w-20 h-20 rounded-full border-4 snap-center transition-all overflow-hidden ${selectedAvatar === avatar ? 'border-[#253884] scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100 scale-95 duration-200 bg-gray-50'}`}
                    >
                      <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => handleLoggedAction('USER_ONBOARDING_PREFS')} className="w-full py-4 bg-[#253884] text-white font-bold text-lg rounded-xl mt-6 subtle-shadow hover:shadow-lg transition-all uppercase">
                Todo Listo
              </button>
           </div>
        </div>
       </div>
    </Layout>
  );

  const renderUserOnboardingPrefs = () => {
    const toggleCategory = (id: string) => {
      setSelectedCategories(prev => 
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
    };

    return (
      <Layout bgClass="bg-white">
        <div className="flex-1 pb-24 px-6 pt-12 flex flex-col relative h-full">
          <div className="flex flex-col items-center mb-8">
             <h2 className="text-3xl font-heading text-[#253884] text-center tracking-tight mb-2">¿Qué te interesa?</h2>
             <p className="text-gray-500 text-sm text-center">Elige tus favoritos para personalizar tu ruta</p>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            <div className="flex flex-wrap gap-3 justify-center">
              {ALL_CATEGORIES.map(cat => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <button 
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`relative overflow-hidden rounded-full px-5 py-3 font-bold transition-all border-2 text-sm flex items-center gap-2 ${isSelected ? 'bg-[#253884] text-white border-[#253884] shadow-lg scale-105' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-8 left-6 right-6">
            <button 
              onClick={() => navigateTo('USER_HOME')}
              disabled={selectedCategories.length === 0}
              className={`w-full py-4 text-white font-bold uppercase text-lg rounded-2xl transition-all ${selectedCategories.length > 0 ? 'bg-[#253884] subtle-shadow hover:shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Continuar a Explorar
            </button>
          </div>
        </div>
      </Layout>
    );
  };

  const renderUserHome = () => {
    const suggestedPOIs = POIS.filter(poi => !savedPOIs.includes(poi.id)).slice(0, 3);
    const myRoute = POIS.filter(poi => savedPOIs.includes(poi.id));

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          {/* Top Header */}
          <div className="bg-[#253884] px-6 pt-12 pb-10 rounded-b-[2.5rem] relative z-20 overflow-hidden shadow-lg">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                   <p className="text-blue-200 text-xs font-semibold mb-1 uppercase tracking-wider">Hola,</p>
                   <h2 className="text-4xl font-heading text-white tracking-tight">Explorador</h2>
                </div>
                <button onClick={() => navigateTo('USER_PROFILE')} className="w-14 h-14 rounded-full border-2 border-white/20 bg-white/10 overflow-hidden shadow-sm hover:scale-105 transition-transform">
                   <img src={selectedAvatar} className="w-full h-full object-cover" alt="Perfil" />
                </button>
             </div>
             
             <button onClick={() => navigateTo('USER_SEARCH')} className="w-full bg-white shadow-lg rounded-2xl p-4 flex items-center relative z-10 text-left transition-transform hover:scale-[1.02]">
                <img src={ICONS.SEARCH} className="w-5 h-5 mr-3 opacity-40" alt="Buscar" />
                <span className="font-medium text-gray-400 w-full text-base">¿A dónde vamos hoy?</span>
             </button>
          </div>

          <div className="flex-1 px-6 pt-8 pb-10 space-y-8 relative z-10 w-full">
             {/* Discover Section */}
             <div className="w-full">
                <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-4">Descubrimientos</h3>
                <div className="space-y-5">
                   {suggestedPOIs.map(poi => (
                     <div key={poi.id} onClick={() => navigateTo('USER_SEARCH', poi.id)} className="bg-white rounded-3xl subtle-shadow overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className={`h-40 ${poi.color.split(' ')[0]} relative flex items-center justify-center`}>
                           <span className="text-6xl drop-shadow-md">{poi.icon}</span>
                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 font-bold text-xs flex items-center text-[#253884] subtle-shadow">
                              <img src={ICONS.STAR_FILLED} className="w-3 h-3 mr-1 invert" alt="Stars" /> 4.8
                           </div>
                        </div>
                        <div className="p-5">
                           <h4 className="text-2xl font-heading mb-1 text-[#253884]">{poi.name}</h4>
                           <p className="text-xs text-gray-500 font-medium mb-4 flex items-center">
                              <img src={ICONS.NAV_MAP} className="w-3 h-3 mr-1 opacity-50" />
                              {poi.location}
                           </p>
                           <div className="flex justify-between items-center bg-gray-50 rounded-xl p-2">
                              <span className="text-[#253884] font-bold px-3 py-1 text-xs">{poi.category}</span>
                              <button className="bg-[#253884] text-white px-5 py-2 rounded-lg font-bold text-xs subtle-shadow hover:bg-blue-800 transition-colors uppercase">Detalles</button>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
        <BottomNav active="home" />
      </Layout>
    );
  };

  const renderUserWallet = () => {
    const myRoute = POIS.filter(poi => savedPOIs.includes(poi.id));
    // Let's ensure a grid of 6 slots
    const totalSlots = 6;
    
    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 p-6 pt-12 flex flex-col items-center relative">
           <div className="absolute inset-0 bg-[#e6eaf8] opacity-50 z-0 h-64 rounded-b-[3rem]"></div>
           
           <div className="relative z-10 w-full mb-6 text-center">
              <h2 className="text-3xl font-heading text-[#253884] mb-3 tracking-tight">Mi Pasaporte</h2>
           </div>
           
           <div className="relative z-10 w-full">
              <div className="bg-white rounded-3xl p-6 subtle-shadow card-shadow relative">
                 
                 <div className="flex items-center gap-4 mb-6 pt-2">
                   <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                      <img src={selectedAvatar} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <p className="text-xl font-heading text-[#253884]">Explorador</p>
                      <p className="font-medium text-xs text-gray-500">{myRoute.length} Paradas Planeadas</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: totalSlots }).map((_, index) => {
                      const poi = myRoute[index];
                      if (poi) {
                        const isStamped = stampedPOIs.includes(poi.id);
                        return (
                          <div key={poi.id} onClick={() => { 
                            if (!isStamped) {
                              setQrModalPOIId(poi.id);
                            } else {
                              navigateTo('USER_SEARCH', poi.id);
                            }
                          }} className={`aspect-square ${poi.color} rounded-2xl flex flex-col items-center justify-center p-2 relative overflow-hidden border border-blue-200 cursor-pointer hover:scale-[1.03] transition-transform shadow-sm`}>
                             {isStamped && (
                               <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md z-10 border border-blue-100 animate-in zoom-in duration-300">
                                  <img src={ICONS.LOGO} alt="Stamped" className="w-4 h-4" />
                               </div>
                             )}
                             <span className={`text-3xl rotate-[-5deg] ${isStamped ? 'grayscale-0' : 'grayscale transition-all opacity-40'}`}>{poi.icon}</span>
                             <p className="text-[8px] font-bold text-[#253884] uppercase mt-2 text-center leading-tight truncate w-full">{poi.name}</p>
                          </div>
                        );
                      }
                      return (
                        <button key={`empty-${index}`} onClick={() => navigateTo('USER_SEARCH')} className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:bg-gray-100 transition-colors group">
                           <span className="text-gray-300 font-black text-2xl group-hover:text-[#253884] transition-colors">+</span>
                           <p className="text-[8px] font-bold text-gray-400 group-hover:text-[#253884] uppercase mt-1">Agregar</p>
                        </button>
                      );
                    })}
                 </div>

                 <div className="mt-8">
                   <div className="flex justify-between items-end mb-4">
                     <h3 className="text-xs font-bold text-[#253884] uppercase tracking-widest opacity-60">Ruta de Hoy</h3>
                   </div>
                   <div className="space-y-3">
                     {myRoute.map((poi, idx) => { // Minimalist Ruta
                        const isStamped = stampedPOIs.includes(poi.id);
                        return (
                        <div key={poi.id} onClick={() => navigateTo('USER_SEARCH', poi.id)} className={`relative rounded-2xl p-3 flex items-center gap-4 cursor-pointer transition-transform border ${isStamped ? 'bg-green-50 border-green-200 opacity-90' : 'bg-gray-50 border-gray-100 hover:-translate-y-1'}`}>
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${poi.color}`}>{poi.icon}</div>
                           <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#253884] text-sm truncate flex items-center gap-1">
                                 {poi.name}
                                 {poi.isFlash && <span className="bg-yellow-100 text-yellow-800 text-[9px] px-1.5 py-0.5 rounded-full ml-1">⚡️ FLASH</span>}
                              </h4>
                              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider truncate">{poi.category}</p>
                           </div>
                           <div className={`w-6 h-6 rounded-full font-black text-[10px] flex items-center justify-center shrink-0 ${isStamped ? 'bg-green-600 text-white' : 'bg-[#253884] text-white'}`}>
                              {isStamped ? '✓' : idx + 1}
                           </div>
                        </div>
                        )
                     })}
                     {myRoute.length < totalSlots && (
                        <button onClick={() => navigateTo('USER_SEARCH')} className="w-full bg-blue-50 border border-blue-100 border-dashed rounded-2xl p-4 text-center text-[#253884] font-bold text-xs hover:bg-blue-100 transition-colors">
                           + Añadir otra parada
                        </button>
                     )}
                   </div>
                 </div>
               </div>
            </div>
         </div>

         {/* QR Stamp Modal */}
         <div className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 transition-opacity ${qrModalPOIId ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {qrModalPOIId && (
               <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative flex flex-col items-center animate-in zoom-in-95 duration-200">
                  <button onClick={() => setQrModalPOIId(null)} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center font-bold">✕</button>
                  <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-2 text-center mt-2">Confirmar Parada</h3>
                  <p className="text-center text-gray-500 text-sm font-medium mb-6">Muestra este código al comercio para escanear y recibir tu sello y beneficios.</p>
                  
                  <div className="bg-white p-4 rounded-3xl border-4 border-[#253884] subtle-shadow mb-6">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=sp-stamp-${qrModalPOIId}`} alt="QR de Pasaporte" className="w-48 h-48 mix-blend-multiply" />
                  </div>
                  
                  <button 
                     onClick={() => {
                        setStampedPOIs(prev => [...prev, qrModalPOIId]);
                        setQrModalPOIId(null);
                     }} 
                     className="w-full bg-[#253884] text-white py-4 rounded-xl font-bold uppercase tracking-wide subtle-shadow hover:bg-blue-800 transition-colors"
                  >
                     [Demo] Simular Escaneo
                  </button>
               </div>
            )}
         </div>

         <style>{`
           @keyframes stampIn {
             0% { opacity: 0; transform: translate(-50%, -50%) scale(2) rotate(-30deg); }
             50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
             100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(-15deg); }
           }
         `}</style>
         <BottomNav active="wallet" />
      </Layout>
    );
  };

  const renderUserProfile = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 pb-24 p-6 pt-12 flex flex-col items-center">
        <h2 className="text-4xl font-heading text-[#253884] mb-10 tracking-tight">Mi Perfil</h2>
        
        <div className="relative mb-6 z-10 w-32 h-32">
           <div className="w-full h-full rounded-full bg-white overflow-hidden subtle-shadow border-4 border-white">
             <img src={selectedAvatar} alt="Profile" className="w-full h-full object-cover" />
           </div>
           <button className="absolute bottom-0 right-0 bg-[#253884] text-white w-10 h-10 rounded-full flex items-center justify-center font-black subtle-shadow hover:bg-blue-800 transition-colors">
             ✎
           </button>
        </div>

        <div className="w-full space-y-4 mb-4">
          <h3 className="text-xl font-heading text-[#253884] tracking-tight px-2">Kardex de Niveles</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x pb-4">
             {/* Novato Card */}
             <div className="snap-center shrink-0 w-[85%] bg-gray-200 rounded-3xl p-5 subtle-shadow text-gray-500 relative overflow-hidden grayscale">
                <div className="absolute -right-6 -bottom-6 opacity-10 text-8xl">🌱</div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1">Nivel 1</p>
                <p className="text-2xl font-heading mb-1 text-gray-700">Turista Novato</p>
                <p className="text-xs mb-4 font-medium">Completado</p>
                <div className="bg-white/50 p-3 rounded-xl border border-white/20">
                   <p className="text-[10px] font-bold uppercase tracking-wider mb-2">🎁 Beneficios:</p>
                   <ul className="text-xs space-y-1 font-medium">
                      <li>• Emblema base</li>
                   </ul>
                </div>
             </div>

             {/* Pro Card (Current) */}
             <div className="snap-center shrink-0 w-[85%] bg-gradient-to-r from-[#253884] to-blue-600 rounded-3xl p-5 subtle-shadow text-white relative overflow-hidden ring-4 ring-blue-300">
                <div className="absolute -right-6 -bottom-6 opacity-20 text-8xl">👑</div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-blue-200">Nivel 2 (Actual)</p>
                <p className="text-3xl font-heading mb-1">Mochilero Pro</p>
                <p className="text-xs text-blue-100 mb-4 font-medium">850 XP / 1000 XP</p>
                
                <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                   <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-4 opacity-80">
                   ¡Faltan 150 pts para <span className="text-yellow-300">Explorador Maestro</span>!
                </p>

                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                   <p className="text-[10px] font-bold uppercase tracking-wider mb-2">🎁 Beneficios Actuales:</p>
                   <ul className="text-xs space-y-1 font-medium mb-3">
                      <li>• 10% dcto. en Museos</li>
                      <li>• 2x1 en Café Central</li>
                   </ul>
                </div>
             </div>

             {/* Maestro Card */}
             <div className="snap-center shrink-0 w-[85%] bg-gradient-to-r from-amber-400 to-yellow-600 rounded-3xl p-5 subtle-shadow text-white relative overflow-hidden opacity-90">
                <div className="absolute -right-6 -bottom-6 opacity-20 text-8xl">🏆</div>
                <p className="text-[10px] font-bold tracking-widest text-amber-100 uppercase mb-1">Nivel 3</p>
                <p className="text-2xl font-heading mb-1">Explorador Maestro</p>
                <p className="text-xs text-amber-100 mb-4 font-medium">Bloqueado</p>
                <div className="bg-black/10 p-3 rounded-xl border border-white/20">
                   <p className="text-[10px] font-bold uppercase text-yellow-100 tracking-wider mb-2">🔓 Beneficios a Desbloquear:</p>
                   <ul className="text-xs space-y-1 font-medium text-white/90">
                      <li>• Entrada VIP a Eventos Flash</li>
                      <li>• Acceso a retos exclusivos</li>
                   </ul>
                </div>
             </div>
          </div>
          
          <button onClick={() => navigateTo('USER_REVIEWS')} className="w-full bg-white px-5 py-4 rounded-2xl subtle-shadow font-bold text-[#253884] flex items-center justify-between hover:scale-[1.02] transition-transform">
            <span className="flex items-center gap-3"><img src={ICONS.STAR_FILLED} className="w-5 h-5 opacity-80" /> Mis Reseñas</span>
            <span className="text-gray-300">→</span>
          </button>
        </div>

        <div className="w-full bg-white rounded-3xl p-6 font-bold space-y-4 subtle-shadow">
           <div className="border-b border-gray-100 pb-4">
              <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Nombre</label>
              <p className="text-2xl font-heading text-[#253884]">Explorador</p>
           </div>
           <div className="border-b border-gray-100 pb-4">
              <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-wider">Correo Electrónico</label>
              <p className="text-base font-semibold text-gray-700">explorador@aventura.com</p>
           </div>
           
           <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                 <p className="text-2xl font-black text-[#253884]">12</p>
                 <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Reseñas</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                 <p className="text-2xl font-black text-[#253884]">2</p>
                 <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Sellos</p>
              </div>
           </div>

           <div className="pt-6">
              <button onClick={() => navigateTo('ONBOARDING')} className="w-full py-4 bg-gray-50 text-red-600 rounded-xl transition-colors font-bold text-sm tracking-wide hover:bg-red-50 border border-transparent hover:border-red-100">
                Cerrar Sesión
              </button>
           </div>
        </div>
      </div>
      <BottomNav active="profile" />
    </Layout>
  );

  const renderUserReviews = () => (
    <Layout bgClass="bg-gray-50">
      <div className="flex-1 pb-24 p-6 pt-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-4xl font-heading text-[#253884] tracking-tight">Mis Reseñas</h2>
          <img src={ICONS.STAR_FILLED} className="w-8 h-8 opacity-80" alt="Stars" />
        </div>

        <div className="space-y-4">
          {[1,2,3].map((i) => (
             <div key={i} className="bg-white p-5 rounded-3xl subtle-shadow">
                <div className="flex justify-between items-start mb-3">
                   <div>
                      <h4 className="text-2xl font-heading text-[#253884]">Café El Molino {i}</h4>
                      <p className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Hace {i} días</p>
                   </div>
                </div>
                <div className="flex gap-1 mb-4">
                   <img src={ICONS.STAR_FILLED} className="w-4 h-4" alt="Star" />
                   <img src={ICONS.STAR_FILLED} className="w-4 h-4" alt="Star" />
                   <img src={ICONS.STAR_FILLED} className="w-4 h-4" alt="Star" />
                   <img src={ICONS.STAR_HOLLOW} className="w-4 h-4 opacity-50" alt="Star" />
                   <img src={ICONS.STAR_HOLLOW} className="w-4 h-4 opacity-50" alt="Star" />
                </div>
                <p className="text-sm font-medium leading-relaxed text-gray-600">
                  El lugar está increíble, el ambiente lo super vale. Totalmente recomendado.
                </p>
             </div>
          ))}
        </div>
      </div>
      <BottomNav active="reviews" />
    </Layout>
  );

  const renderCommerceLogin = () => (
    <Layout bgClass="bg-[#253884]">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative text-white">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white/10 border border-white/20 w-10 h-10 rounded-full flex justify-center items-center z-20 hover:bg-white/20 transition-colors text-white">
          <span className="font-bold text-xl leading-none -mt-1">←</span>
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <img src={ICONS.LOGO} alt="SalePlan" className="h-10 filter brightness-0 invert" />
              <span className="font-heading text-3xl text-white tracking-tighter pt-1">SalePlan</span>
            </div>
            <h1 className="text-4xl font-heading text-white tracking-tight">Portal Negocio</h1>
            <p className="font-bold text-blue-200 text-xs uppercase mt-3 tracking-widest">Acceso Exclusivo</p>
          </div>
          
          <div className="space-y-6 bg-white p-8 rounded-3xl subtle-shadow text-[#253884]">
             <div>
               <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">ID Comercio</label>
               <input type="text" className="w-full bg-gray-50 border-2 border-transparent px-4 pt-4 pb-3 font-semibold text-base focus:outline-none focus:border-[#253884] focus:bg-white rounded-xl transition-colors" placeholder="COM-0001" />
             </div>
             <div>
               <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Código de Seguridad</label>
               <input type="password" className="w-full bg-gray-50 border-2 border-transparent px-4 pt-4 pb-3 font-semibold text-base focus:outline-none focus:border-[#253884] focus:bg-white rounded-xl transition-colors" placeholder="••••••" />
             </div>
             
             <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="w-full py-4 mt-6 bg-[#253884] text-white font-bold text-lg uppercase tracking-wide hover:bg-blue-800 transition-colors rounded-xl subtle-shadow">
                Acceder
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderCommerceDashboard = () => (
    <Layout bgClass="bg-gray-50">
       <div className="flex-1 flex flex-col w-full h-full pb-10">
         <div className="bg-[#253884] p-6 pb-12 relative z-20 shadow-md">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="flex justify-between items-center mb-8 relative z-10">
                 <div>
                   <h2 className="text-4xl font-heading text-white tracking-tight">Café Central</h2>
                   <p className="font-bold text-[10px] uppercase text-blue-200 mt-1 tracking-widest">Dashboard Activo</p>
                 </div>
                 <button onClick={() => navigateTo('ONBOARDING')} className="px-4 py-2 border border-white/20 bg-white/10 rounded-xl font-bold text-xs text-white hover:bg-white/20 transition-colors uppercase">
                    Salir
                 </button>
             </div>

             <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/10 border border-white/10 text-white p-5 rounded-2xl backdrop-blur">
                  <p className="font-bold text-[10px] uppercase tracking-wider text-blue-200">Escaneos Hoy</p>
                  <p className="font-black text-4xl mt-1">142</p>
                </div>
                <div className="bg-white/10 border border-white/10 text-white p-5 rounded-2xl backdrop-blur">
                  <p className="font-bold text-[10px] uppercase tracking-wider text-blue-200">Rating Global</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-black text-4xl">4.8</p>
                    <img src={ICONS.STAR_FILLED} className="w-5 h-5 -mt-1 opacity-80" alt="Star" />
                  </div>
                </div>
             </div>
             
             {/* Tabs */}
             <div className="flex gap-2 mt-6 relative z-10 p-1 bg-white/10 rounded-xl">
               <button onClick={() => setCommerceTab('ESCANEO')} className={`flex-1 py-2 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors ${commerceTab === 'ESCANEO' ? 'bg-white text-[#253884]' : 'text-blue-100 hover:text-white'}`}>
                 Retos
               </button>
               <button onClick={() => setCommerceTab('CRM')} className={`flex-1 py-2 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors ${commerceTab === 'CRM' ? 'bg-white text-[#253884]' : 'text-blue-100 hover:text-white'}`}>
                 CRM
               </button>
               <button onClick={() => setCommerceTab('CONFIG')} className={`flex-1 py-2 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors ${commerceTab === 'CONFIG' ? 'bg-white text-[#253884]' : 'text-blue-100 hover:text-white'}`}>
                 Ajustes
               </button>
             </div>
         </div>

         <div className="flex-1 p-6 space-y-6 relative z-10 w-full mt-2">
             {commerceTab === 'ESCANEO' && (
               <div className="space-y-6 animate-in fade-in duration-300">
                  <button onClick={() => alert('Abriendo cámara para Escanear Pasaporte QR...')} className="w-full py-4 bg-[#253884] text-white rounded-2xl shadow-lg font-bold text-lg uppercase tracking-wide transition-all hover:bg-blue-800 flex items-center justify-center gap-3">
                     <span className="text-2xl">📸</span> <span className="mt-1">Escanear QR</span>
                  </button>
     
                  <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-2 pt-2">Mis Retos Activos</h3>
                  <div className="bg-white p-5 rounded-3xl subtle-shadow flex gap-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100">
                     <div className="w-16 h-16 bg-[#e6eaf8] rounded-2xl flex items-center justify-center font-black text-blue-900 text-3xl">P</div>
                     <div className="flex-1">
                        <h4 className="text-xl font-heading text-[#253884] leading-tight">Degustación de Verano</h4>
                        <p className="font-bold text-[10px] uppercase text-green-700 bg-green-50 inline-block px-2 py-1 rounded-md mt-2">Activa hasta 12/Agt</p>
                        <div className="mt-4">
                         <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="text-[10px] bg-gray-50 text-[#253884] px-4 py-2 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors">Editar Reto</button>
                        </div>
                     </div>
                  </div>
                  
                  <button onClick={() => navigateTo('COMMERCE_CREATE_EXPERIENCE')} className="w-full py-10 border-2 border-dashed border-[#253884]/30 bg-white rounded-3xl text-center hover:bg-blue-50 transition-colors">
                     <span className="text-3xl font-black text-[#253884] mb-2 block opacity-50">+</span>
                     <span className="font-bold text-sm uppercase text-[#253884] tracking-wider">Crear Nuevo Reto</span>
                  </button>
               </div>
             )}

             {commerceTab === 'CRM' && (
               <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h3 className="text-2xl font-heading text-[#253884] tracking-tight pt-2">Contactos & AI</h3>
                  </div>
                  
                  {/* Search box for CRM with input field to search by name/phone */}
                  <div className="relative">
                     <input type="text" placeholder="Buscar por nombre, teléfono o ID..." className="w-full px-5 py-4 bg-white border border-gray-200 text-gray-800 rounded-2xl outline-none placeholder:text-gray-400 focus:border-[#253884] transition-all font-medium subtle-shadow" />
                     <img src={ICONS.SEARCH} className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" alt="Search" />
                  </div>

                  <div className="bg-[#253884] rounded-3xl subtle-shadow p-5 mt-4 text-white overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                     <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">✨</span>
                        <h4 className="font-bold text-lg font-heading tracking-wide">Predicciones SalePlan</h4>
                     </div>
                     <p className="text-xs text-blue-200 mb-4 bg-black/10 p-3 rounded-xl border border-white/10">Identificamos usuarios con alta probabilidad de visitar tu comercio hoy según rutas.</p>
                     
                     <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
                           <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shrink-0"><img src={AVATARS[0]} className="w-full h-full object-cover" alt="User"/></div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-white leading-tight truncate">Ana García</p>
                              <p className="text-[9px] text-blue-200 font-bold uppercase truncate mt-1 break-words">95% de Probabilidad</p>
                           </div>
                           <div className="shrink-0">
                              <button className="bg-white text-[#253884] text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-95">Invitar</button>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/20 transition-colors">
                           <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shrink-0"><img src={AVATARS[3]} className="w-full h-full object-cover" alt="User"/></div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-white leading-tight truncate">Carlos M.</p>
                              <p className="text-[9px] text-blue-200 font-bold uppercase truncate mt-1">88% de Probabilidad</p>
                           </div>
                           <div className="shrink-0">
                              <button className="bg-white text-[#253884] text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-95">Invitar</button>
                           </div>
                        </div>
                     </div>
                  </div>
     
                  <div className="bg-white rounded-3xl subtle-shadow p-5 border border-gray-100">
                     <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                        <h4 className="font-bold text-[#253884]">Directorio Activo</h4>
                        <button onClick={() => alert('Descargando lista de contactos en CSV...')} className="text-[9px] bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-lg border border-green-200 uppercase tracking-widest hover:bg-green-100">
                           CSV
                        </button>
                     </div>
                     <div className="space-y-6">
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                           <div className="w-12 h-12 rounded-full border-2 border-[#253884] overflow-hidden shrink-0"><img src={AVATARS[0]} className="w-full h-full object-cover" alt="User"/></div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#253884] leading-tight truncate">Ana García</p>
                              <p className="text-[10px] text-gray-500 font-bold uppercase truncate">Hace 2 horas</p>
                           </div>
                           <div className="text-right shrink-0">
                              <div className="text-[9px] bg-green-100 text-green-800 border-green-200 border font-bold px-2 py-1 rounded-lg uppercase flex items-center gap-1 shadow-sm"><span className="text-[12px] leading-none">✨</span> Frecuente</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                           <div className="w-12 h-12 rounded-full border-2 border-gray-100 overflow-hidden shrink-0"><img src={AVATARS[1]} className="w-full h-full object-cover" alt="User"/></div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#253884] leading-tight truncate">Luis Fernando</p>
                              <p className="text-[10px] text-gray-500 font-bold uppercase truncate">Ayer a las 18:42</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                           <div className="w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-700 rounded-full border-2 border-purple-200 overflow-hidden shrink-0 font-black text-xl">M</div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#253884] leading-tight truncate">María Jose</p>
                              <p className="text-[10px] text-gray-500 font-bold uppercase truncate">Ayer a las 15:20</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {commerceTab === 'CONFIG' && (
               <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-white rounded-3xl p-6 subtle-shadow border border-gray-100 mb-6">
                     <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-2">Nombre Comercial</p>
                     <p className="text-xl font-heading text-[#253884] border-b border-gray-100 pb-4 mb-4">Café Central</p>
                     
                     <p className="font-bold text-[10px] uppercase text-gray-400 tracking-wider mb-2">Administrador</p>
                     <p className="text-xl font-heading text-[#253884] border-b border-gray-100 pb-4">Juan Pérez</p>
                  </div>
                  <button className="w-full bg-white text-red-600 font-bold rounded-2xl py-4 subtle-shadow border border-red-100 active:scale-95 transition-transform uppercase tracking-wide">
                     Cerrar Sesión Negocio
                  </button>
               </div>
             )}
         </div>
       </div>
    </Layout>
  );

  const renderCommerceCreateExperience = () => (
    <Layout bgClass="bg-gray-50 p-6 pb-24">
       <div className="flex items-center mb-8 pt-4">
         <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 mr-4 text-gray-500 hover:text-[#253884] transition-colors">
            <span className="font-bold text-xl leading-none -mt-1">←</span>
         </button>
         <h2 className="text-3xl font-heading text-[#253884] tracking-tight">Nuevo Reto</h2>
       </div>

       <div className="space-y-6 bg-white p-6 rounded-3xl subtle-shadow">
         <div className="w-full h-40 border-2 border-dashed border-[#253884]/20 bg-[#e6eaf8]/50 flex items-center justify-center cursor-pointer hover:bg-[#e6eaf8] rounded-2xl transition-colors">
             <span className="font-bold uppercase text-xs bg-white px-5 py-3 rounded-xl text-[#253884] subtle-shadow">Subir Foto o Flyer</span>
         </div>

         <div>
           <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Título del Reto</label>
           <input type="text" className="w-full bg-gray-50 px-4 py-4 focus:bg-white outline-none rounded-xl font-semibold text-sm transition-colors border-2 border-transparent focus:border-[#253884]" placeholder="Ej: Especial de Café al 2x1" />
         </div>

         <div>
           <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Condiciones</label>
           <textarea className="w-full bg-gray-50 px-4 py-4 focus:bg-white outline-none rounded-xl font-semibold text-sm h-32 resize-none transition-colors border-2 border-transparent focus:border-[#253884]" placeholder="Instrucciones para validar el sello..." />
         </div>

         <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2">
                <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Tipo de Evento</label>
                <select className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 outline-none rounded-xl font-semibold text-xs transition-colors focus:border-[#253884] focus:bg-white text-[#253884]">
                   <option>Reto Regular</option>
                   <option>Evento Flash (Doble Puntos)</option>
                </select>
             </div>
            <div>
              <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Válido hasta</label>
              <input type="date" className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 outline-none rounded-xl font-semibold text-xs transition-colors focus:border-[#253884] focus:bg-white" />
            </div>
            <div>
              <label className="font-bold text-[10px] uppercase mb-2 block text-gray-500 tracking-wider">Valor en Sellos</label>
              <input type="number" defaultValue={1} min={1} className="w-full bg-gray-50 border-2 border-transparent px-4 py-3 outline-none rounded-xl font-semibold text-xs transition-colors focus:border-[#253884] focus:bg-white" />
            </div>
         </div>

         <button onClick={() => navigateTo('COMMERCE_DASHBOARD')} className="w-full py-4 mt-8 bg-[#253884] text-white rounded-xl subtle-shadow font-bold text-lg uppercase tracking-wide transition-all hover:bg-blue-800">
            Publicar Reto
         </button>
       </div>
    </Layout>
  );

  // Router basic implementation
  const renderUserSearch = () => {
    if (selectedPOI !== null) {
      const poi = POIS.find(p => p.id === selectedPOI);
      if (!poi) return null;
      const isSaved = savedPOIs.includes(poi.id);
      
      return (
        <Layout bgClass="bg-white">
          <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative">
             <div className={`h-64 ${poi.color.split(' ')[0]} relative w-full rounded-b-[2.5rem] flex items-center justify-center p-6 shadow-sm`}>
               <button onClick={() => window.history.back()} className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
                 <span className="text-xl rotate-180">➜</span>
               </button>
               <span className="text-8xl drop-shadow-lg">{poi.icon}</span>
             </div>
             
             <div className="px-6 py-8">
               <div className="flex justify-between items-start mb-2">
                 <h2 className="text-4xl font-heading text-[#253884] pr-4">{poi.name}</h2>
               </div>
               <div className="flex items-center gap-2 mb-6">
                 <span className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded-lg">{poi.category}</span>
                 <span className="text-sm font-semibold text-gray-400">•</span>
                 <span className="text-sm font-semibold text-gray-500">{poi.location}</span>
               </div>
               
               <p className="text-gray-600 font-medium leading-relaxed mb-10">{poi.description}</p>
               
               <div className="space-y-4">
                 {poi.isFlash && (
                    <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
                       <p className="font-bold text-yellow-800 mb-2">⚡️ Selecciona tu Asistencia</p>
                       <p className="text-xs text-yellow-700 mb-4 font-medium">Este evento tiene horarios definidos o varios días.</p>
                       <div className="grid grid-cols-2 gap-2">
                          <select className="bg-white border-2 border-yellow-200 rounded-xl px-3 py-2 text-xs font-bold text-yellow-900 outline-none">
                             <option>Hoy</option>
                             <option>Mañana</option>
                             <option>Viernes 18</option>
                          </select>
                          <select className="bg-white border-2 border-yellow-200 rounded-xl px-3 py-2 text-xs font-bold text-yellow-900 outline-none">
                             <option>18:00 hrs</option>
                             <option>19:00 hrs</option>
                             <option>20:00 hrs</option>
                          </select>
                       </div>
                    </div>
                 )}
                 <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">👑</div>
                    <div>
                      <p className="font-bold text-[#253884]">{poi.isFlash ? 'Recompensa Limitada' : 'Recompensa Actual'}</p>
                      <p className="text-xs font-medium text-gray-500">{poi.pts || '1 Sello + 10% Descuento'}</p>
                    </div>
                 </div>
               </div>
             </div>

             <div className="fixed bottom-0 w-full max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-safe flex gap-3">
               <button 
                 onClick={() => setSavedPOIs(prev => isSaved ? prev.filter(id => id !== poi.id) : [...prev, poi.id])}
                 className={`flex-1 py-4 font-bold text-lg rounded-2xl shadow-sm transition-all ${isSaved ? 'bg-gray-100 text-gray-500' : 'bg-[#253884] text-white'}`}
               >
                 {isSaved ? 'En Mi Ruta ✓' : 'Agregar a Ruta'}
               </button>
               <button 
                 onClick={() => {
                   if (navigator.share) {
                     navigator.share({ title: poi.name, text: `¡Te invito a ir a ${poi.name} en SalePlan!`, url: window.location.href });
                   } else {
                     alert(`Enlace copiado para compartir: ${poi.name}`);
                   }
                 }}
                 className="w-16 flex items-center justify-center shrink-0 bg-[#e6eaf8] text-[#253884] rounded-2xl font-black text-xl hover:bg-blue-100 transition-colors"
               >
                 ➦
               </button>
             </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout bgClass="bg-gray-50">
        <div className="flex-1 pb-24 flex flex-col">
          <div className="bg-[#253884] px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-sm relative z-20 overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <h2 className="text-3xl font-heading text-white tracking-tight mb-6">Explorar</h2>
             <div className="relative">
                <input type="text" placeholder="Buscar lugares, categorías..." className="w-full px-5 py-4 bg-white/10 border-2 border-white/20 text-white rounded-2xl outline-none placeholder:text-blue-200 focus:bg-white/20 focus:border-white/40 transition-all font-medium" />
                <img src={ICONS.SEARCH} className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 invert opacity-70" alt="Search" />
             </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-heading text-[#253884] tracking-tight mb-4">Eventos Flash & Limitados ⚡️</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x">
               {FLASH_EVENTS.map(event => (
                  <div key={event.id} className="snap-center shrink-0 w-72 bg-white subtle-shadow rounded-3xl p-5 border-2 border-yellow-200 relative overflow-hidden">
                     <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 font-black text-[10px] uppercase px-3 py-1 rounded-bl-xl z-10 tracking-widest">
                        {event.pts}
                     </div>
                     <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-2xl flex items-center justify-center border border-yellow-100 shrink-0">{event.icon}</div>
                        <div>
                           <h4 className="font-bold text-[#253884] leading-tight text-sm pr-4 mt-1">{event.name}</h4>
                           <p className="font-bold text-[10px] text-gray-400 uppercase tracking-widest mt-1">{event.location}</p>
                        </div>
                     </div>
                     <div className="space-y-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><span className="text-sm">🕒</span> {event.date}</p>
                        <div className="border-t border-gray-200 pt-2">
                           <p className="text-[10px] font-bold text-[#253884] uppercase tracking-wider mb-1">🎟️ Condiciones:</p>
                           <p className="text-xs text-gray-600 font-medium leading-snug">{event.description}</p>
                        </div>
                     </div>
                     <button onClick={() => { setSelectedPOI(event.id); }} className="w-full mt-4 bg-[#253884] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wide subtle-shadow hover:bg-blue-800 transition-colors">
                        Ver Evento
                     </button>
                  </div>
               ))}
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-2 mt-2">
              <button className="px-5 py-2 bg-[#253884] text-white rounded-full font-bold text-sm whitespace-nowrap shadow-sm">Todos</button>
              {ALL_CATEGORIES.map(cat => (
                <button key={cat.id} className="px-4 py-2 bg-white text-gray-600 rounded-full font-bold text-sm whitespace-nowrap shadow-sm border border-gray-100">{cat.name}</button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {POIS.map(poi => {
                const isSaved = savedPOIs.includes(poi.id);
                return (
                  <div key={poi.id} onClick={() => setSelectedPOI(poi.id)} className="bg-white rounded-3xl p-4 subtle-shadow relative flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSavedPOIs(prev => isSaved ? prev.filter(id => id !== poi.id) : [...prev, poi.id]); }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg z-10 ${isSaved ? 'bg-[#253884] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      {isSaved ? '✓' : '+'}
                    </button>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 border ${poi.color}`}>
                      {poi.icon}
                    </div>
                    <h3 className="font-bold text-[#253884] leading-tight mb-1">{poi.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider ">{poi.category}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <BottomNav active="search" />
      </Layout>
    );
  };

  const renderLoginChoice = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 hover:text-[#253884] transition-colors">
          <span className="font-bold text-xl leading-none -mt-1">←</span>
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full text-center">
          <h1 className="text-4xl font-heading text-[#253884] mb-4">¡Bienvenido de vuelta!</h1>
          <p className="text-gray-500 font-medium mb-12">Selecciona cómo deseas ingresar a SalePlan.</p>

          <div className="space-y-4">
             <button onClick={() => navigateTo('USER_LOGIN')} className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🎒</div>
                   <div>
                      <h3 className="text-xl font-heading text-[#253884]">Soy Explorador</h3>
                      <p className="text-xs text-gray-400 font-medium">Continuar mis aventuras</p>
                   </div>
                </div>
             </button>

             <button onClick={() => navigateTo('COMMERCE_LOGIN')} className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🏪</div>
                   <div>
                      <h3 className="text-xl font-heading text-[#253884]">Mi Negocio</h3>
                      <p className="text-xs text-gray-400 font-medium">Gestionar mi establecimiento</p>
                   </div>
                </div>
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderRegisterChoice = () => (
    <Layout bgClass="bg-white halftone-bg-light">
      <div className="flex-1 p-6 flex flex-col pt-12 pb-24 relative">
        <button onClick={() => navigateTo('ONBOARDING')} className="absolute top-4 left-4 bg-white border border-gray-200 w-10 h-10 rounded-full flex justify-center items-center subtle-shadow z-20 text-gray-400 hover:text-[#253884] transition-colors">
          <span className="font-bold text-xl leading-none -mt-1">←</span>
        </button>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full text-center">
          <h1 className="text-4xl font-heading text-[#253884] mb-4">¿Cómo quieres participar?</h1>
          <p className="text-gray-500 font-medium mb-12">Elige tu perfil para comenzar la experiencia SalePlan.</p>

          <div className="space-y-4">
             <button onClick={() => navigateTo('USER_REGISTER')} className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🎒</div>
                   <div>
                      <h3 className="text-xl font-heading text-[#253884]">Como Explorador</h3>
                      <p className="text-xs text-gray-400 font-medium">Busco aventuras y premios</p>
                   </div>
                </div>
             </button>

             <button onClick={() => navigateTo('COMMERCE_LOGIN')} className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl subtle-shadow text-left hover:border-[#253884] transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🏪</div>
                   <div>
                      <h3 className="text-xl font-heading text-[#253884]">Mi Negocio</h3>
                      <p className="text-xs text-gray-400 font-medium">Quiero atraer nuevos clientes</p>
                   </div>
                </div>
             </button>
          </div>
        </div>
      </div>
    </Layout>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'ONBOARDING': return renderOnboarding();
      case 'REGISTER_CHOICE': return renderRegisterChoice();
      case 'LOGIN_CHOICE': return renderLoginChoice();
      case 'FAQ': return renderStaticPage('Preguntas Frecuentes', '1. ¿Qué es el Pasaporte SalePlan?\nEs tu herramienta para descubrir la ciudad y ganar premios.\n\n2. ¿Cómo gano sellos?\nEscaneando el código QR en los comercios aliados al completar un reto.\n\n3. ¿Tienen costo los sellos?\nNo, son gratuitos al realizar consumos o actividades en los locales.');
      case 'ABOUT': return renderStaticPage('Acerca de', 'SalePlan nació con la misión de reconectar a las personas con su ciudad, fomentando el apoyo al comercio local a través de la gamificación y experiencias únicas.');
      case 'CONTACT': return renderStaticPage('Contacto', '¿Tienes dudas? Escríbenos a soporte@saleplan.com o llámanos al +503 2233-4455. Estamos para ayudarte de lunes a domingo de 8am a 8pm.');
      case 'AFFILIATE': return renderStaticPage('Afíliate', '¿Tienes un negocio y quieres atraer más clientes? Únete a SalePlan y crea retos increíbles para nuestra comunidad de exploradores. Contáctanos en ventas@saleplan.com');
      case 'USER_LOGIN': return renderUserLogin();
      case 'USER_REGISTER': return renderUserRegister();
      case 'USER_ONBOARDING_PREFS': return renderUserOnboardingPrefs();
      case 'USER_HOME': return renderUserHome();
      case 'USER_SEARCH': return renderUserSearch();
      case 'USER_WALLET': return renderUserWallet();
      case 'USER_REVIEWS': return renderUserReviews();
      case 'USER_PROFILE': return renderUserProfile();
      case 'COMMERCE_LOGIN': return renderCommerceLogin();
      case 'COMMERCE_DASHBOARD': return renderCommerceDashboard();
      case 'COMMERCE_CREATE_EXPERIENCE': return renderCommerceCreateExperience();
      default: return renderOnboarding();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {renderCurrentScreen()}
      <PwaGuideModal />
    </div>
  );
}
