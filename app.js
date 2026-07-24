// --- SUPABASE CONFIGURATION (PRODUCCIÓN) ---
const SUPABASE_CONFIG = {
  url: 'https://vkgbojayerxrbngavflu.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZ2JvamF5ZXJ4cmJuZ2F2Zmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTkxMTgsImV4cCI6MjEwMDM5NTExOH0.eeYPN_KdwtfeCjldC9joc9l0uwRKiIMbmD4ErCXbLPI',
  enabled: true
};


let supabaseClient = null;
if (SUPABASE_CONFIG.enabled && typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
}

let outOfStockItems = [];

// --- PRODUCT DATA (Real menu items from Maia Espresso Tenerife) ---
const DEFAULT_PRODUCTS = [
  // --- CLÁSICOS DE LA MAÑANA ---
  {
    id: 'tosta-tumaca',
    name: 'Tosta con Tumaca',
    category: 'bocadillos',
    price: 2.60,
    desc: 'Tosta de pan de masa madre artesanal de centeno, aceite de oliva virgen extra y tumaca natural.',
    image: 'assets/toast_tumaca.png',
    icon: '🍞',
    tags: ['Clásicos de la Mañana', 'Vegano']
  },
  {
    id: 'croissant-mermelada',
    name: 'Croissant con Mermelada',
    category: 'dulces',
    price: 2.90,
    desc: 'Croissant recién horneado servido con mermelada de frambuesa.',
    image: 'assets/croissant_mermelada.png',
    icon: '🥐',
    tags: ['Clásicos de la Mañana']
  },
  {
    id: 'mixto-maia',
    name: 'Mixto Maia',
    category: 'bocadillos',
    price: 3.50,
    desc: 'Pan brioche tostado con mantequilla, jamón york y queso emmental fundido.',
    image: 'assets/mixto_maia.png',
    icon: '🥪',
    tags: ['Clásicos de la Mañana']
  },
  {
    id: 'egg-bacon-brioche',
    name: 'Egg Bacon Brioche',
    category: 'bocadillos',
    price: 5.50,
    desc: 'Pan brioche con huevo revuelto cremoso, bacon crujiente, rúcula fresca y mayonesa japonesa.',
    image: 'assets/egg_bacon_brioche.png',
    icon: '🍔',
    tags: ['Clásicos de la Mañana', 'Recomendado']
  },
  {
    id: 'tosta-salmon',
    name: 'Tosta de Salmón y Wasabi',
    category: 'bocadillos',
    price: 7.90,
    desc: 'Tosta de salmón ahumado, aguacate, huevo poché y aliño suave de chalota con wasabi.',
    image: 'assets/toast_salmon.png',
    icon: '🥑',
    tags: ['Clásicos de la Mañana', 'Premium']
  },
  {
    id: 'tortilla-cremosa',
    name: 'Tortilla Francesa Cremosa',
    category: 'bocadillos',
    price: 6.90,
    desc: 'Tortilla francesa jugosa con cebolla pochada y ensalada de tomate al lado.',
    image: 'assets/tortilla_cremosa.png',
    icon: '🍳',
    tags: ['Clásicos de la Mañana']
  },
  {
    id: 'yogurt-griego',
    name: 'Yogurt Griego Ecológico',
    category: 'dulces',
    price: 5.50,
    desc: 'Yogurt griego con muesli casero y fruta fresca troceada.',
    image: 'assets/yogurt.png',
    icon: '🥣',
    tags: ['Clásicos de la Mañana', 'Saludable']
  },

  // --- PULGAS Y BOCADILLOS ---
  {
    id: 'bocadillo-classic',
    name: 'El Clásico (Ibérico)',
    category: 'bocadillos',
    price: 4.90,
    desc: 'Jamón ibérico con queso manchego y tumaca en pan de masa madre. (Disponible en pulga por 2,90€).',
    image: 'assets/toast_classic.png',
    icon: '🥪',
    tags: ['Bocadillos & Pulgas']
  },
  {
    id: 'bocadillo-chef',
    name: 'Bocadillo Del Chef',
    category: 'bocadillos',
    price: 5.80,
    desc: 'Tiras de roast beef, queso parmesano, rúcula fresca y mayonesa de trufa en pan crujiente. (Pulga por 3,20€).',
    image: 'assets/toast_roastbeef.png',
    icon: '🥩',
    tags: ['Bocadillos & Pulgas', 'Premium']
  },
  {
    id: 'bocadillo-pollomiel',
    name: 'Bocadillo Pollo Miel',
    category: 'bocadillos',
    price: 5.50,
    desc: 'Pan de semillas, pollo desmenuzado, queso brie fundido y salsa casera de miel y mostaza. (Pulga por 3,10€).',
    image: 'assets/toast_pollo_miel.png',
    icon: '🥖',
    tags: ['Bocadillos & Pulgas']
  },
  {
    id: 'bocadillo-islas',
    name: 'Guiño a las Islas (Pata)',
    category: 'bocadillos',
    price: 5.10,
    desc: 'Pata asada al estilo canario, queso ahumado y mojo rojo de la casa. (Pulga por 3,00€).',
    image: 'assets/toast_pata_asada.png',
    icon: '🥓',
    tags: ['Bocadillos & Pulgas', 'Especialidad']
  },
  {
    id: 'bocadillo-mechada',
    name: 'Repite Conmigo (Ternera)',
    category: 'bocadillos',
    price: 5.80,
    desc: 'Ternera mechada jugosa, queso emmental y pimientos del piquillo. (Pulga por 3,20€).',
    image: 'assets/toast_mechada.png',
    icon: '🍖',
    tags: ['Bocadillos & Pulgas']
  },

  // --- ADEMÁS (REPOSTERÍA) ---
  {
    id: 'donut',
    name: 'Donut Glaseado',
    category: 'dulces',
    price: 1.60,
    desc: 'Donut tierno con glaseado clásico de azúcar.',
    image: 'assets/donut.png',
    icon: '🍩',
    tags: ['Además...']
  },
  {
    id: 'plumcake',
    name: 'Plumcake del Día',
    category: 'dulces',
    price: 2.40,
    desc: 'Bizcocho Plumcake casero con receta cambiante del día.',
    image: 'assets/plumcake.png',
    icon: '🍰',
    tags: ['Además...']
  },
  {
    id: 'croissant-mantequilla',
    name: 'Croissant Mantequilla Masa Madre',
    category: 'dulces',
    price: 2.20,
    desc: 'Croissant clásico hojaldrado elaborado con masa madre natural.',
    image: 'assets/croissant.png',
    icon: '🥐',
    tags: ['Además...']
  },
  {
    id: 'cookie-suprema',
    name: 'Cookies Caseras',
    category: 'dulces',
    price: 3.50,
    desc: 'Galletas caseras hechas a diario con trozos de chocolate.',
    image: 'assets/cookies.png',
    icon: '🍪',
    tags: ['Además...', 'Casero']
  },

  // --- BEBIDAS CALIENTES ---
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'bebidas-calientes',
    price: 1.40,
    desc: 'Espresso con grano 100% arábica de tostadero de especialidad.',
    image: 'assets/espresso.png',
    icon: '☕',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'cortado',
    name: 'Cortado',
    category: 'bebidas-calientes',
    price: 1.60,
    desc: 'Espresso con un toque de leche emulsionada.',
    image: 'assets/cortado.png',
    icon: '🥛',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'bebidas-calientes',
    price: 1.60,
    desc: 'Espresso doble rebajado con agua caliente para un trago largo.',
    image: 'assets/americano.png',
    icon: '☕',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'barraquito',
    name: 'Barraquito',
    category: 'bebidas-calientes',
    price: 1.90,
    desc: 'Café típico canario con leche condensada, leche, canela y corteza de limón.',
    image: 'assets/barraquito.png',
    icon: '🍹',
    tags: ['Bebidas Calientes', 'Típico Canario']
  },
  {
    id: 'barraquito-especial',
    name: 'Barraquito Especial',
    category: 'bebidas-calientes',
    price: 2.40,
    desc: 'Barraquito tradicional preparado con Licor 43.',
    image: 'assets/barraquito_especial.png',
    icon: '🍸',
    tags: ['Bebidas Calientes', 'Típico Canario']
  },
  {
    id: 'capuccino',
    name: 'Cappuccino',
    category: 'bebidas-calientes',
    price: 2.20,
    desc: 'Espresso con leche y una generosa capa de espuma cremosa.',
    image: 'assets/capuccino.png',
    icon: '🥛',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'cafe-leche',
    name: 'Café con Leche',
    category: 'bebidas-calientes',
    price: 2.10,
    desc: 'Café espresso equilibrado con leche vaporizada.',
    image: 'assets/cafe_leche.png',
    icon: '☕',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'latte-machiato',
    name: 'Latte Macchiato',
    category: 'bebidas-calientes',
    price: 2.20,
    desc: 'Leche vaporizada manchada con un shot de espresso.',
    image: 'assets/latte_macchiato.png',
    icon: '🥛',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'chai-latte',
    name: 'Chai Latte',
    category: 'bebidas-calientes',
    price: 3.10,
    desc: 'Infusión cremosa de té negro con especias y leche vaporizada.',
    image: 'assets/chai_latte.png',
    icon: '🍂',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte Caliente',
    category: 'bebidas-calientes',
    price: 3.30,
    desc: 'Matcha Uji caliente batido con leche vaporizada.',
    image: 'assets/matcha_latte.png',
    icon: '🍵',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'chocolate-leche',
    name: 'Chocolate con Leche',
    category: 'bebidas-calientes',
    price: 2.90,
    desc: 'Cacao soluble disuelto en leche caliente.',
    image: 'assets/chocolate.png',
    icon: '🍫',
    tags: ['Bebidas Calientes']
  },
  {
    id: 'tes-infusiones',
    name: 'Tés e Infusiones',
    category: 'bebidas-calientes',
    price: 1.90,
    desc: 'Variedad de tés e infusiones de hierbas.',
    image: 'assets/tea.png',
    icon: '🌱',
    tags: ['Bebidas Calientes']
  },

  // --- BEBIDAS FRÍAS ---
  {
    id: 'zumo-naranja',
    name: 'Zumo de Naranja Grande',
    category: 'bebidas-frias',
    price: 3.60,
    desc: 'Zumo de naranja recién exprimido. (Disponible en tamaño pequeño por 2,40€).',
    image: 'assets/orange_juice.png',
    icon: '🍊',
    tags: ['Bebidas Frías']
  },
  {
    id: 'licuado-dia',
    name: 'Licuado del Día',
    category: 'bebidas-frias',
    price: 3.90,
    desc: 'Licuado casero y natural elaborado con frutas frescas.',
    image: 'assets/smoothie.png',
    icon: '🥤',
    tags: ['Bebidas Frías']
  },
  {
    id: 'iced-matcha',
    name: 'Iced Matcha Latte',
    category: 'bebidas-frias',
    price: 4.10,
    desc: 'Té verde matcha Uji ceremonial con leche fría y hielo.',
    image: 'assets/iced_matcha.png',
    icon: '🍵',
    tags: ['Bebidas Frías']
  },
  {
    id: 'iced-chai',
    name: 'Iced Chai Latte',
    category: 'bebidas-frias',
    price: 3.50,
    desc: 'Té negro chai especiado con leche fría y hielo.',
    image: 'assets/iced_chai.png',
    icon: '🍂',
    tags: ['Bebidas Frías']
  },
  {
    id: 'orange-matcha',
    name: 'Iced Orange Matcha',
    category: 'bebidas-frias',
    price: 4.30,
    desc: 'Zumo de naranja natural recién exprimido mezclado con té matcha Uji.',
    image: 'assets/orange_matcha.png',
    icon: '🍹',
    tags: ['Bebidas Frías', 'Especialidad']
  },
  {
    id: 'strawberry-matcha',
    name: 'Iced Strawberry Matcha',
    category: 'bebidas-frias',
    price: 4.50,
    desc: 'Matcha Uji con leche y puré casero de fresas naturales.',
    image: 'assets/iced_strawberry_matcha.png',
    icon: '🍵',
    tags: ['Bebidas Frías', 'Best Seller']
  },
  {
    id: 'mango-matcha',
    name: 'Iced Mango Matcha',
    category: 'bebidas-frias',
    price: 4.80,
    desc: 'Matcha Uji frío con leche sobre puré de mango fresco.',
    image: 'assets/iced_mango_matcha.png',
    icon: '🥭',
    tags: ['Bebidas Frías']
  },
  {
    id: 'te-frio',
    name: 'Té Frío Casero',
    category: 'bebidas-frias',
    price: 2.40,
    desc: 'Té frío preparado en casa con limón y menta.',
    image: 'assets/iced_tea.png',
    icon: '🥃',
    tags: ['Bebidas Frías']
  },
  {
    id: 'refrescos',
    name: 'Refrescos',
    category: 'bebidas-frias',
    price: 2.30,
    desc: 'Coca-cola, Fanta, Nestea, etc. en formato lata.',
    image: 'assets/soda.png',
    icon: '🥤',
    tags: ['Bebidas Frías']
  },
  {
    id: 'agua-natural',
    name: 'Agua Natural',
    category: 'bebidas-frias',
    price: 1.40,
    desc: 'Botella de agua mineral sin gas.',
    image: 'assets/water.png',
    icon: '💧',
    tags: ['Bebidas Frías']
  },
  {
    id: 'agua-gas',
    name: 'Agua con Gas',
    category: 'bebidas-frias',
    price: 1.70,
    desc: 'Botella de agua mineral con gas.',
    image: 'assets/sparkling_water.png',
    icon: '🍾',
    tags: ['Bebidas Frías']
  }
];

let PRODUCTS = [];

function loadActiveProducts() {
  const stored = localStorage.getItem('maia_active_products');
  if (stored) {
    PRODUCTS = JSON.parse(stored);
  } else {
    // Merge existing custom products if any existed from previous step
    const oldCustom = JSON.parse(localStorage.getItem('maia_custom_products')) || [];
    PRODUCTS = [...JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)), ...oldCustom];
    localStorage.setItem('maia_active_products', JSON.stringify(PRODUCTS));
  }
}
loadActiveProducts();

const DEFAULT_BRUNCH_OPTIONS = [
  { id: 'b-centeno', category: 'base', name: 'Masa Madre de Centeno', displayName: 'Masa Madre Centeno', price: 2.50, desc: 'Pan rústico de miga densa, sabroso y crujiente.', layerClass: 'layer-bread-bottom' },
  { id: 'b-semillas', category: 'base', name: 'Pan de Semillas', displayName: 'Pan de Semillas', price: 2.80, desc: 'Masa madre crujiente con semillas de sésamo y chía.', layerClass: 'layer-bread-bottom' },
  { id: 'b-croissant', category: 'base', name: 'Croissant de Mantequilla', displayName: 'Croissant de París', price: 3.00, desc: 'Hojaldre tierno de pura mantequilla, cortado por la mitad.', layerClass: 'layer-bread-bottom' },
  { id: 'b-singluten', category: 'base', name: 'Pan Sin Gluten', displayName: 'Pan Sin Gluten', price: 3.00, desc: 'Tostada crujiente y esponjosa apta para celíacos.', layerClass: 'layer-bread-bottom' },
  
  { id: 'p-pata', category: 'protein', name: 'Pata Asada & Queso Ahumado', displayName: 'Pata Asada & Q. Ahumado', price: 4.50, desc: 'Pata asada a baja temperatura y láminas de queso ahumado canario.', layerClass: 'layer-protein' },
  { id: 'p-roast', category: 'protein', name: 'Roast Beef Gourmet', displayName: 'Roast Beef Gourmet', price: 4.90, desc: 'Finas tiras de roast beef asado y parmesano curado.', layerClass: 'layer-protein' },
  { id: 'p-pollo', category: 'protein', name: 'Pollo Asado con Brie', displayName: 'Pollo Deshilachado & Brie', price: 4.20, desc: 'Pollo marinado jugoso y láminas cremosas de queso Brie fundido.', layerClass: 'layer-protein' },
  { id: 'p-aguacate', category: 'protein', name: 'Aguacate Machacado (Vegano)', displayName: 'Crema de Aguacate', price: 3.50, desc: 'Aguacate fresco con lima, cilantro, aceite de oliva y sal rosa.', layerClass: 'layer-spread' },
  
  { id: 's-mojorojo', category: 'sauce', name: 'Pesto de Mojo Rojo', displayName: 'Pesto de Mojo Rojo', price: 1.00, desc: 'Receta original de mojo palmero triturado con frutos secos.', layerClass: 'layer-sauce' },
  { id: 's-trufa', category: 'sauce', name: 'Mayonesa de Trufa', displayName: 'Mayonesa de Trufa', price: 1.20, desc: 'Salsa cremosa con un intenso toque y aroma a trufa negra.', layerClass: 'layer-sauce' },
  { id: 's-mostaza', category: 'sauce', name: 'Salsa Mostaza-Miel', displayName: 'Salsa Mostaza-Miel', price: 0.90, desc: 'Suave combinación de mostaza antigua y miel pura de abejas.', layerClass: 'layer-sauce' },
  { id: 's-huevo', category: 'sauce', name: 'Huevo Poché Extra', displayName: 'Huevo Poché', price: 1.50, desc: 'Huevo ecológico poché con yema líquida listo para romper.', layerClass: 'layer-cheese' },
  
  { id: 'd-matcha', category: 'drink', name: 'Iced Strawberry Matcha', displayName: 'Iced Strawberry Matcha', price: 4.80, desc: 'Matcha ceremonial con leche y puré casero de fresas naturales.', layerClass: '' },
  { id: 'd-flat', category: 'drink', name: 'Flat White Doble', displayName: 'Flat White (Doble Shot)', price: 2.60, desc: 'Café de especialidad con leche emulsionada ultra cremosa.', layerClass: '' },
  { id: 'd-chai', category: 'drink', name: 'Chai Latte Especiado', displayName: 'Chai Latte', price: 3.50, desc: 'Infusión de té negro especiado con cardamomo y leche.', layerClass: '' },
  { id: 'd-naranja', category: 'drink', name: 'Zumo de Naranja Natural', displayName: 'Zumo de Naranja', price: 3.00, desc: 'Exprimido al instante con naranjas seleccionadas del país.', layerClass: '' }
];

let BRUNCH_OPTIONS = [];

function loadActiveBrunchOptions() {
  const stored = localStorage.getItem('maia_active_brunch_options');
  if (stored) {
    BRUNCH_OPTIONS = JSON.parse(stored);
  } else {
    BRUNCH_OPTIONS = JSON.parse(JSON.stringify(DEFAULT_BRUNCH_OPTIONS));
    localStorage.setItem('maia_active_brunch_options', JSON.stringify(BRUNCH_OPTIONS));
  }
}
loadActiveBrunchOptions();


// --- APP STATE ---
let cart = JSON.parse(localStorage.getItem('maia_cart')) || [];
let selectedZone = 'interior';
let activeStep = 1;
let mesaNumber = null;
const orderChannel = new BroadcastChannel('maia_live_orders_channel');

// Brunch Customizer Choices
let brunchChoices = {
  base: null,
  protein: null,
  sauce: null,
  drink: null
};

// --- DOM ELEMENTS ---
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const panel = urlParams.get('panel');
  const mesa = urlParams.get('mesa');

  if (panel === 'cocina') {
    document.getElementById('client-view').style.display = 'none';
    const demoHelper = document.getElementById('demo-helper');
    if (demoHelper) demoHelper.style.display = 'none';

    if (sessionStorage.getItem('maia_kds_authenticated') === 'true') {
      document.getElementById('kds-view').style.display = 'block';
      initKds();
    } else {
      const authModal = document.getElementById('kds-auth-modal');
      if (authModal) authModal.style.display = 'flex';
    }
  } else {
    if (mesa) {
      mesaNumber = mesa;
      localStorage.setItem('maia_qr_mesa', mesa);
      localStorage.setItem('maia_qr_time', Date.now().toString());
    } else {
      const storedMesa = localStorage.getItem('maia_qr_mesa');
      const storedTime = parseInt(localStorage.getItem('maia_qr_time') || '0', 10);
      const FIVE_HOURS_MS = 5 * 60 * 60 * 1000; // 5 horas en ms (18.000.000 ms)
      const isExpired = Date.now() - storedTime > FIVE_HOURS_MS;

      if (storedMesa && !isExpired) {
        mesaNumber = storedMesa;
      } else if (storedMesa && isExpired) {
        localStorage.removeItem('maia_qr_mesa');
        localStorage.removeItem('maia_qr_time');
      }
    }

    if (mesaNumber) {
      const badge = document.getElementById('mesa-badge');
      if (badge) {
        badge.textContent = `Mesa ${mesaNumber}`;
        badge.style.display = 'inline-block';
      }
      
      // Update checkout button text in cart
      const checkoutBtn = document.getElementById('btn-checkout');
      if (checkoutBtn) {
        checkoutBtn.textContent = `Enviar Pedido (Mesa ${mesaNumber})`;
      }

      // Smooth scroll to menu section in QR table mode if scanned
      if (mesa) {
        setTimeout(() => {
          const menuSec = document.getElementById('menu');
          if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
        }, 800);
      }
    }
    
    // Automatic & active table session clearance verification
    checkTableSessionStatus();
    setInterval(checkTableSessionStatus, 10000);
    window.addEventListener('focus', checkTableSessionStatus);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) checkTableSessionStatus();
    });
    
    outOfStockItems = JSON.parse(localStorage.getItem('maia_out_of_stock')) || [];
    
    // Fetch and subscribe to stock settings from Supabase in real-time
    if (supabaseClient) {
      supabaseClient
        .from('maia_products')
        .select('*')
        .eq('id', 'settings-stock')
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            try {
              outOfStockItems = JSON.parse(data.desc) || [];
              localStorage.setItem('maia_out_of_stock', JSON.stringify(outOfStockItems));
              
              // Re-render menu card filters
              const activeFilterBtn = document.querySelector('.filter-btn.active');
              const activeCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'todos';
              renderMenu(activeCat, false);
              
              // Re-render brunch options availability
              updateBrunchCreatorStock();
              renderFullDigitalMenu();
            } catch(e) {
              console.error(e);
            }
          }
        });

      supabaseClient
        .channel('products-stock-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'maia_products',
            filter: 'id=eq.settings-stock'
          },
          payload => {
            if (payload.new && payload.new.id === 'settings-stock') {
              try {
                outOfStockItems = JSON.parse(payload.new.desc) || [];
                localStorage.setItem('maia_out_of_stock', JSON.stringify(outOfStockItems));
                
                // Re-render menu card filters
                const activeFilterBtn = document.querySelector('.filter-btn.active');
                const activeCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'todos';
                renderMenu(activeCat, false);
                
                // Re-render brunch options availability
                updateBrunchCreatorStock();
                renderFullDigitalMenu();
              } catch(e) {
                console.error(e);
              }
            }
          }
        )
        .subscribe();

      // Realtime listener for table session clearance when billed in Kitchen Panel (Broadcast + Postgres Changes across all devices over Internet!)
      supabaseClient
        .channel('client-table-clearance')
        .on(
          'broadcast',
          { event: 'CLEAR_TABLE_SESSION' },
          payload => {
            const billedMesa = String((payload && payload.payload && payload.payload.mesa) || (payload && payload.mesa) || '');
            const currentClientMesa = String(mesaNumber || localStorage.getItem('maia_qr_mesa') || '');
            if (currentClientMesa && billedMesa === currentClientMesa) {
              clearTableSession('✨ Tu mesa ha sido liberada por la cocina. ¡Gracias por tu visita!');
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'maia_orders'
          },
          payload => {
            if (payload.new && payload.new.status === 'billed') {
              const billedMesa = String(payload.new.mesa || '');
              const currentClientMesa = String(mesaNumber || localStorage.getItem('maia_qr_mesa') || '');
              
              if (currentClientMesa && billedMesa === currentClientMesa) {
                clearTableSession('✨ Tu mesa ha sido liberada por la cocina. ¡Gracias por tu visita!');
              }
            }
          }
        )
        .subscribe();
    }
    
    // Listen for real-time stock updates from KDS
    orderChannel.addEventListener('message', (event) => {
      if (event.data.type === 'STOCK_UPDATED') {
        outOfStockItems = event.data.outOfStock || [];
        localStorage.setItem('maia_out_of_stock', JSON.stringify(outOfStockItems));
        
        // Re-render menu card filters
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'todos';
        renderMenu(activeCat, false);
        
        // Re-render brunch options availability
        updateBrunchCreatorStock();
      } else if (event.data.type === 'PRODUCTS_UPDATED') {
        loadActiveProducts();
        loadActiveBrunchOptions();
        
        // Re-render menu card filters
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeCat = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'todos';
        renderMenu(activeCat, false);
        updateFilterCounts();
        
        // Re-render brunch options!
        renderBrunchCustomizerOptions();
      } else if (event.data.type === 'CLEAR_TABLE_SESSION') {
        if (mesaNumber && String(event.data.mesa) === String(mesaNumber)) {
          clearTableSession('✨ Tu mesa ha sido liberada por la cocina. ¡Gracias por visitar Maia Espresso!');
        }
      }
    });

    initNavbarScroll();
    renderMenu('todos');
    initMenuFilters();
    initCartDrawer();
    initBrunchCreator();
    renderBrunchCustomizerOptions();
    initReservationForm();
    initReviewsSlider();
    initFullDigitalMenu();
    updateCartUI();
    initCookieBanner();
    initScrollAnimations();
    
    // Initial check for brunch options availability
    setTimeout(updateBrunchCreatorStock, 200);
  }
});

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('btn-cookie-accept');
  const btnReject = document.getElementById('btn-cookie-reject');

  if (!banner || !btnAccept || !btnReject) return;

  const consent = localStorage.getItem('maia_cookie_consent');

  if (!consent) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 1500);
  }

  btnAccept.addEventListener('click', () => {
    localStorage.setItem('maia_cookie_consent', 'accepted');
    banner.classList.remove('show');
  });

  btnReject.addEventListener('click', () => {
    localStorage.setItem('maia_cookie_consent', 'rejected');
    banner.classList.remove('show');
  });
}

// --- NAVBAR SCROLL EFFECT ---
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function createProductCard(product) {
  const isOutOfStock = outOfStockItems.includes(product.id);
  const card = document.createElement('div');
  card.className = `menu-card ${isOutOfStock ? 'out-of-stock' : ''}`;
  card.style.cursor = 'pointer';
  card.setAttribute('onclick', `window.openProductDetailModal('${product.id}')`);

  const tagsHTML = product.tags.map(t => {
    const isVegan = t.toLowerCase().includes('vegano');
    return `<span class="tag ${isVegan ? 'tag-vegan' : ''}">${t}</span>`;
  }).join('');

  card.innerHTML = `
    <div class="menu-card-img-wrapper">
      <div class="menu-card-img-placeholder">${product.icon}</div>
      ${product.image ? `<img src="${product.image}" alt="${product.name}" class="menu-card-img" style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">` : ''}
      <span class="menu-card-badge">${product.category.replace('-', ' ')}</span>
    </div>
    <div class="menu-card-content">
      <div class="menu-card-header">
        <h3 class="menu-card-title">${product.name}</h3>
        <span class="menu-card-price">${product.price.toFixed(2)}€</span>
      </div>
      <p class="menu-card-desc">${product.desc}</p>
      <div class="menu-card-footer" style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 8px;">
        <div class="menu-tags-wrapper" style="display: flex; align-items: center; gap: 8px; flex-grow: 1;">
          <div class="menu-tags">${tagsHTML}</div>
          <button class="btn-view-details" onclick="event.stopPropagation(); window.openProductDetailModal('${product.id}')" aria-label="Ver detalles" title="Ver descripción e ingredientes">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${product.id}')" aria-label="Añadir al pedido">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderMenu(categoryFilter, showAll = false) {
  const menuGrid = document.getElementById('menu-grid');
  const showMoreContainer = document.getElementById('menu-show-more-container');
  const showMoreBtn = document.getElementById('btn-menu-show-more');
  
  if (!menuGrid) return;
  menuGrid.innerHTML = '';

  const categoryOrder = ['bocadillos', 'bebidas-calientes', 'bebidas-frias', 'dulces'];
  let sortedProducts = [...PRODUCTS];
  if (categoryFilter === 'todos') {
    sortedProducts.sort((a, b) => {
      const idxA = categoryOrder.indexOf(a.category);
      const idxB = categoryOrder.indexOf(b.category);
      return idxA - idxB;
    });
  }

  const filteredProducts = categoryFilter === 'todos' 
    ? sortedProducts 
    : PRODUCTS.filter(p => p.category === categoryFilter);

  // Limit to 6 items if showAll is false and total products exceed 6
  const shouldLimit = filteredProducts.length > 6 && !showAll;
  const itemsToRender = shouldLimit ? filteredProducts.slice(0, 6) : filteredProducts;

  const categoriesNames = {
    'bocadillos': 'Bocadillos & Pulgas 🥖',
    'bebidas-calientes': 'Café & Té ☕',
    'bebidas-frias': 'Matchas & Cold 🍵',
    'dulces': 'Repostería 🥐'
  };

  let lastCategory = null;
  itemsToRender.forEach(product => {
    if (product.category !== lastCategory) {
      lastCategory = product.category;
      const header = document.createElement('h3');
      header.className = 'menu-category-title-header';
      header.innerHTML = categoriesNames[product.category] || product.category;
      header.style.cssText = 'grid-column: 1 / -1; font-family: var(--font-title); font-size: 1.35rem; margin-top: 24px; margin-bottom: 8px; border-bottom: 1px solid rgba(184, 80, 50, 0.15); padding-bottom: 6px; color: var(--text-primary); text-align: left; width: 100%;';
      menuGrid.appendChild(header);
    }
    const card = createProductCard(product);
    menuGrid.appendChild(card);
  });

  // Staggered slide-in entrance animation
  setTimeout(() => {
    const cards = menuGrid.querySelectorAll('.menu-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 40);
    });
  }, 50);

  // Handle "Show More" button display
  if (showMoreContainer && showMoreBtn) {
    if (shouldLimit) {
      showMoreContainer.style.display = 'block';
      showMoreBtn.onclick = (e) => {
        e.preventDefault();
        renderMenu(categoryFilter, true);
      };
    } else {
      showMoreContainer.style.display = 'none';
    }
  }
}

// --- FILTER BUTTON CLICK EVENTS ---
function initMenuFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderMenu(cat, false); // Always show only 6 by default when switching categories!
    });
  });
  updateFilterCounts();
}

function updateFilterCounts() {
  const filters = document.querySelectorAll('.filter-btn');
  filters.forEach(btn => {
    const cat = btn.getAttribute('data-category');
    let count = 0;
    let label = '';
    
    if (cat === 'todos') {
      count = PRODUCTS.length;
      label = 'Todo';
    } else if (cat === 'bocadillos') {
      count = PRODUCTS.filter(p => p.category === 'bocadillos').length;
      label = 'Bocadillos & Pulgas';
    } else if (cat === 'bebidas-calientes') {
      count = PRODUCTS.filter(p => p.category === 'bebidas-calientes').length;
      label = 'Café & Té';
    } else if (cat === 'bebidas-frias') {
      count = PRODUCTS.filter(p => p.category === 'bebidas-frias').length;
      label = 'Matchas & Cold';
    } else if (cat === 'dulces') {
      count = PRODUCTS.filter(p => p.category === 'dulces').length;
      label = 'Repostería';
    }
    
    if (label) {
      btn.innerHTML = `${label} <span class="filter-count" style="opacity: 0.6; font-size: 0.85em; margin-left: 4px; font-weight: normal;">(${count})</span>`;
    }
  });
}

// --- SHOPPING CART SYSTEM ---
function initCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const openBtn = document.getElementById('cart-toggle');
  const mobileOpenBtn = document.getElementById('mobile-cart-toggle');
  const closeBtn = document.getElementById('cart-close');
  const checkoutBtn = document.getElementById('btn-checkout');

  const openDrawer = (e) => {
    if(e) e.preventDefault();
    drawer.classList.add('open');
    overlay.classList.add('open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  };

  openBtn.addEventListener('click', openDrawer);
  mobileOpenBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    if (mesaNumber) {
      sendOrderToKds();
      closeDrawer();
    } else {
      // Simulate booking correlation
      showToast('¡Pedido reservado! Rellena el formulario de reservas para confirmar tu mesa.');
      closeDrawer();
      
      // Scroll to booking form
      document.getElementById('reserva').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

window.addToCart = function(productId, qty = 1, showToastFlag = true) {
  if (!mesaNumber) {
    const modal = document.getElementById('no-qr-modal-backdrop');
    if (modal) modal.style.display = 'flex';
    return;
  }

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      icon: product.icon,
      qty: qty
    });
  }

  updateCartUI();
  if (showToastFlag) {
    showToast(qty > 1 ? `Añadido: ${qty}x ${product.name}` : `Añadido: ${product.name}`);
  }
};

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  localStorage.setItem('maia_cart', JSON.stringify(cart));
  
  // Update header and mobile nav counts
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = totalCount;
  
  const mobCount = document.getElementById('mobile-cart-count');
  mobCount.textContent = totalCount;
  if (totalCount > 0) {
    mobCount.style.display = 'inline-block';
  } else {
    mobCount.style.display = 'none';
  }

  // Render items in slideout drawer
  const container = document.getElementById('cart-items-container');
  const checkoutBtn = document.getElementById('btn-checkout');
  
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty-message">Aún no has añadido nada a tu pedido.</p>';
    document.getElementById('cart-total-value').textContent = '0.00€';
    checkoutBtn.disabled = true;
    
    // Hide reservation alert
    document.getElementById('booking-brunch-alert').style.display = 'none';
    return;
  }

  checkoutBtn.disabled = false;
  container.innerHTML = '';
  
  let total = 0;
  let hasBrunch = false;

  cart.forEach(item => {
    total += item.price * item.qty;
    if (item.id === 'custom-brunch-menu') {
      hasBrunch = true;
    }

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div style="width: 50px; height: 50px; border-radius: var(--radius-sm); background-color: var(--bg-secondary); display:flex; align-items:center; justify-content:center; font-size:1.5rem; flex-shrink:0;">
        ${item.icon}
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-price">${item.price.toFixed(2)}€</span>
        <div class="cart-item-quantity">
          <span class="qty-btn" onclick="updateQty('${item.id}', -1)">-</span>
          <span>${item.qty}</span>
          <span class="qty-btn" onclick="updateQty('${item.id}', 1)">+</span>
        </div>
      </div>
      <span class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</span>
    `;
    container.appendChild(row);
  });

  document.getElementById('cart-total-value').textContent = `${total.toFixed(2)}€`;

  // Display booking alert if custom brunch is in the cart
  const bookingAlert = document.getElementById('booking-brunch-alert');
  if (hasBrunch) {
    bookingAlert.style.display = 'block';
  } else {
    bookingAlert.style.display = 'none';
  }
}

// --- INTERACTIVE BRUNCH CREATOR ---
// --- INTERACTIVE BRUNCH CREATOR ---
function initBrunchCreator() {
  const prevBtn = document.getElementById('brunch-prev-btn');
  const nextBtn = document.getElementById('brunch-next-btn');
  const addBrunchBtn = document.getElementById('btn-add-brunch-cart');
  
  if (!prevBtn || !nextBtn || !addBrunchBtn) return;

  // Next step navigation
  nextBtn.addEventListener('click', () => {
    if (activeStep < 4) {
      activeStep++;
      updateStepUI();
    } else {
      addCustomBrunchToCart();
    }
  });

  // Prev step navigation
  prevBtn.addEventListener('click', () => {
    if (activeStep > 1) {
      activeStep--;
      updateStepUI();
    }
  });

  // Bottom button trigger
  addBrunchBtn.addEventListener('click', addCustomBrunchToCart);
}

function updateStepUI() {
  const prevBtn = document.getElementById('brunch-prev-btn');
  const nextBtn = document.getElementById('brunch-next-btn');
  const steps = document.querySelectorAll('.brunch-step-indicator');
  const panels = document.querySelectorAll('.brunch-panel');

  if (!prevBtn || !nextBtn) return;

  // Buttons state
  prevBtn.disabled = activeStep === 1;
  if (activeStep === 4) {
    nextBtn.textContent = 'Añadir al Pedido';
  } else {
    nextBtn.textContent = 'Siguiente';
  }

  // Panels visibility
  panels.forEach(p => p.classList.remove('active'));
  const activePanel = document.getElementById(`panel-step-${activeStep}`);
  if (activePanel) activePanel.classList.add('active');

  // Indicators highlight
  steps.forEach((s, idx) => {
    const stepNum = idx + 1;
    s.classList.remove('active', 'completed');
    if (stepNum === activeStep) {
      s.classList.add('active');
    } else if (stepNum < activeStep) {
      s.classList.add('completed');
    }
  });
}

function renderBrunchCustomizerOptions() {
  const categories = ['base', 'protein', 'sauce', 'drink'];
  
  categories.forEach(cat => {
    const grid = document.getElementById(`brunch-grid-${cat}`);
    if (!grid) return;
    grid.innerHTML = '';
    
    const options = BRUNCH_OPTIONS.filter(o => o.category === cat);
    
    options.forEach(opt => {
      const isOutOfStock = outOfStockItems.includes(opt.name);
      
      const card = document.createElement('div');
      card.className = `option-card ${isOutOfStock ? 'out-of-stock' : ''}`;
      card.setAttribute('data-category', opt.category);
      card.setAttribute('data-name', opt.name);
      card.setAttribute('data-price', opt.price);
      card.setAttribute('data-layer-class', opt.layerClass || '');
      
      const currentChoice = brunchChoices[opt.category];
      if (currentChoice && currentChoice.name === opt.name) {
        card.classList.add('selected');
      }
      
      card.innerHTML = `
        <div class="option-card-header">
          <span class="option-name">${opt.displayName || opt.name}</span>
          <span class="option-price">+${opt.price.toFixed(2)}€</span>
        </div>
        <span class="option-desc">${opt.desc}</span>
        <span class="option-badge">✓</span>
      `;
      
      card.addEventListener('click', () => {
        if (isOutOfStock) return;
        
        const siblings = grid.querySelectorAll('.option-card');
        siblings.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        brunchChoices[opt.category] = {
          name: opt.name,
          price: opt.price,
          layerClass: opt.layerClass || ''
        };
        
        updateBrunchSummary();
      });
      
      grid.appendChild(card);
    });
  });
}

function updateBrunchSummary() {
  let totalPrice = 0;
  const addBrunchBtn = document.getElementById('btn-add-brunch-cart');
  
  for (const key in brunchChoices) {
    const choice = brunchChoices[key];
    const summaryItem = document.querySelector(`.brunch-summary-item[data-summary="${key}"] .val`);
    
    if (choice) {
      if (summaryItem) summaryItem.textContent = `${choice.name} (+${choice.price.toFixed(2)}€)`;
      totalPrice += choice.price;
    } else {
      if (summaryItem) summaryItem.textContent = '-';
    }
  }

  const priceDisplay = document.getElementById('brunch-total-price');
  if (priceDisplay) priceDisplay.textContent = `${totalPrice.toFixed(2)}€`;

  const isReady = brunchChoices.base !== null && brunchChoices.drink !== null;
  if (addBrunchBtn) addBrunchBtn.disabled = !isReady;

  drawVisualizer();
}

function drawVisualizer() {
  const vis = document.getElementById('sandwich-visualizer');
  if (!vis) return;
  
  vis.innerHTML = '';
  
  if (brunchChoices.base) {
    // Dynamically recreate the bread elements since vis.innerHTML = '' clears them from the DOM
    const breadBottom = document.createElement('div');
    breadBottom.className = 'sandwich-layer layer-bread-bottom';
    breadBottom.id = 'vis-bread-bottom';
    breadBottom.textContent = brunchChoices.base.name;
    
    const breadTop = document.createElement('div');
    breadTop.className = 'sandwich-layer layer-bread-top';
    breadTop.id = 'vis-bread-top';
    breadTop.textContent = brunchChoices.base.name;
    
    vis.appendChild(breadBottom);
    
    if (brunchChoices.protein) {
      const layer = document.createElement('div');
      layer.className = `sandwich-layer ${brunchChoices.protein.layerClass}`;
      layer.textContent = brunchChoices.protein.name;
      vis.appendChild(layer);
    }
    
    if (brunchChoices.sauce) {
      const layer = document.createElement('div');
      layer.className = `sandwich-layer ${brunchChoices.sauce.layerClass}`;
      layer.textContent = brunchChoices.sauce.name;
      vis.appendChild(layer);
    }
    
    vis.appendChild(breadTop);
  } else {
    const placeholder = document.createElement('div');
    placeholder.style.color = 'var(--text-light)';
    placeholder.style.fontSize = '0.9rem';
    placeholder.style.textAlign = 'center';
    placeholder.textContent = 'Selecciona ingredientes para ver la tostada';
    vis.appendChild(placeholder);
  }
}

function addCustomBrunchToCart() {
  if (!brunchChoices.base || !brunchChoices.drink) return;

  let totalPrice = 0;
  let descriptionParts = [];

  for (const key in brunchChoices) {
    if (brunchChoices[key]) {
      totalPrice += brunchChoices[key].price;
      descriptionParts.push(brunchChoices[key].name);
    }
  }

  const customItem = {
    id: 'custom-brunch-menu',
    name: 'Mi Brunch Personalizado',
    price: totalPrice,
    image: '',
    icon: '🥞',
    qty: 1,
    desc: descriptionParts.join(' + ')
  };

  cart = cart.filter(item => item.id !== 'custom-brunch-menu');
  cart.push(customItem);

  updateCartUI();
  showToast('🥞 ¡Brunch añadido al pedido!');

  activeStep = 1;
  updateStepUI();

  // Reset visualizer summary highlights
  const siblings = document.querySelectorAll('.option-card');
  siblings.forEach(c => c.classList.remove('selected'));
  for (const key in brunchChoices) {
    brunchChoices[key] = null;
  }
  updateBrunchSummary();

  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }
}

// --- BOOKING FORM RESERVATIONS ---
function initReservationForm() {
  const form = document.getElementById('booking-form');
  const zoneBtns = document.querySelectorAll('.zone-btn');

  // Set minimum date input to today
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  // Warn about Saturday and Sunday selections (under reservation)
  dateInput.addEventListener('change', () => {
    const dateVal = new Date(dateInput.value);
    const day = dateVal.getDay(); // 0 is Sunday, 6 is Saturday
    if (day === 0 || day === 6) {
      alert('Ten en cuenta que abrimos sábados y domingos únicamente bajo reserva. Tu reserva estará sujeta a confirmación.');
    }
  });

  // Zone selection buttons
  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoneBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedZone = btn.getAttribute('data-zone');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    // Build WhatsApp message
    const phoneNum = "34655641185";
    let text = `¡Hola Maia Espresso! 🌟\n\nMe gustaría reservar una mesa:\n`;
    text += `👤 *Nombre:* ${name}\n`;
    text += `📞 *Teléfono:* ${phone}\n`;
    text += `📅 *Fecha:* ${date}\n`;
    text += `⏰ *Hora:* ${time}h\n`;
    text += `📍 *Zona:* ${selectedZone === 'interior' ? 'Interior Acogedor' : 'Terraza Luminosa'}\n`;
    if (notes) {
      text += `📝 *Notas:* ${notes}\n`;
    }
    
    if (cart.length > 0) {
      text += `\n🍳 *Mi Pedido Pre-seleccionado:*\n`;
      cart.forEach(item => {
        text += `• ${item.qty}x ${item.name} (${(item.price * item.qty).toFixed(2)}€)\n`;
      });
      const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      text += `\n💰 *Total estimado:* ${total.toFixed(2)}€\n`;
    }
    
    text += `\n¿Tienen disponibilidad? ¡Muchas gracias!`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Reset form and state
    form.reset();
    cart = [];
    updateCartUI();
    
    showToast('✨ ¡Redirigiendo a WhatsApp para confirmar!');
  });
}

// --- GOOGLE REVIEWS DATA & RANDOM SLIDER ---
const ALL_GOOGLE_REVIEWS = [
  {
    author: "Ruth Fuentes Domínguez",
    initials: "RF",
    color: "var(--accent-rust)",
    text: "Una experiencia de 10 en Maia. El ambiente es agradable, el personal súper atento y la comida espectacular. Todo estaba delicioso y muy bien presentado. Sin duda, un sitio para repetir y recomendar. ⭐"
  },
  {
    author: "Nadia Gopalan",
    initials: "NG",
    color: "var(--accent-olive)",
    text: "Buen lugar para desayunar, todo muy rico!! El café buenísimo y el mango matcha espectacular. Recomiendo el yogurt griego con granola y frutas."
  },
  {
    author: "Carlos Sánchez",
    initials: "CS",
    color: "#6C5A4B",
    text: "¡Un gran descubrimiento! Probamos el brunch y estuvo espectacular, todo riquísimo y la atención de diez. Sin duda volveremos, súper recomendable."
  },
  {
    author: "Santiago Álava",
    initials: "SÁ",
    color: "#8C5A46",
    text: "No soy de poner reseñas, pero este sitio lo merece. Un lugar que se ha vuelto imprescindible en mi día a día, tanto por sus menús desayuno, como por sus menús."
  },
  {
    author: "Noelia Rodríguez Manero",
    initials: "NR",
    color: "#5A6C58",
    text: "Todo lo que hacen está hecho con mucho mimo y productos de calidad. He ido por los desayunos y por el menú de almuerzo, no como carne así que agradezco mucho que siempre tengan varias opciones. La comida es deliciosa y el trato excelente."
  },
  {
    author: "Raquel Navarro Cantó",
    initials: "RN",
    color: "#9C6B52",
    text: "Un lugar con mucho encanto donde se cuida con mucho mimo y atención cada detalle. Productos buenísimos con buenos precios y gran sabor. Adaptación para personas con intolerancias."
  },
  {
    author: "Oliver",
    initials: "O",
    color: "#7B6858",
    text: "¡Qué regalo para los sentidos! Da gusto que entre tanta cocina rápida industrial, aparezca algo que demuestre que el cariño por la cocina y la comida sana aún es posible. Volveremos ;)"
  },
  {
    author: "Zuri Sevillano",
    initials: "ZS",
    color: "#556B69",
    text: "La comida está impresionante, se nota la profesionalidad y el buen gusto! Hemos disfrutado mucho y nos han atendido de lujo! Volveremos."
  },
  {
    author: "Beatriz Amador",
    initials: "BA",
    color: "#8B6B5C",
    text: "Comida casera hecha con mucho cariño y sabor. Calidad - precio un 10/10, y el lugar muy bonito."
  },
  {
    author: "Marcos Adex García Pérez",
    initials: "MG",
    color: "#5C6B8B",
    text: "La comida deliciosa, el lugar céntrico y cómodo, decoración acogedora y una atención excelente. Siempre que venimos salimos satisfechos."
  },
  {
    author: "Jose Lopez",
    initials: "JL",
    color: "#7A6354",
    text: "Una experiencia absolutamente excepcional. Desde el primer momento, el restaurante nos ofreció una atención impecable y un trato cercano que hizo que nos sintiéramos como en casa."
  },
  {
    author: "Eidher Mesa hdez",
    initials: "EM",
    color: "#607B5E",
    text: "Me encantó el sitio, el trato y el ambiente que se crea. La comida ha sido estupenda."
  },
  {
    author: "jonay Hernandez",
    initials: "JH",
    color: "#7B5E7A",
    text: "Hemos comido en Maia y la experiencia ha sido sencillamente exquisita. Evento privado de Navidad para un grupo de 12 personas, con unos tiempos impecables."
  },
  {
    author: "Cristina Torres",
    initials: "CT",
    color: "#4A6B6C",
    text: "Un atendimiento bastante bueno, la comida excelente, son muy rápidos y profesionales, un lugar muy hogareño, volveré sin duda."
  },
  {
    author: "Jennifer Amate",
    initials: "JA",
    color: "#8A5A5A",
    text: "¡Fantástico! Hemos disfrutado de una experiencia increíble, la comida y el trato de Jorge y Cintia impecable. Seguiremos eligiéndoles!!!"
  },
  {
    author: "Xoan Torres Luque",
    initials: "XT",
    color: "#6B7A5A",
    text: "Desayunos muy buenos y con una calidad que impresiona, las pulguitas nunca decepcionan y el café está muy rico."
  },
  {
    author: "Xavér S",
    initials: "XS",
    color: "#7A6B5A",
    text: "Primera Vez, La Atencion, El Lugar Excelente Un Diez Volveré."
  },
  {
    author: "Miguel MaDa",
    initials: "MM",
    color: "#9A6552",
    text: "Muy buena la comida es poco, excelente, igual que la atención. 🥇🍹📍"
  },
  {
    author: "SENEQUE",
    initials: "S",
    color: "#527A9A",
    text: "Difícil no puntuar con 5X, por entusiasmo, cordialidad, prestancia y por su oferta gastro. Local, con mesas en terraza frente a paso del tranvía."
  },
  {
    author: "Aarón Padilla Herrera",
    initials: "AP",
    color: "#8A6A52",
    text: "Sitio muy acogedor con un servicio 10 y una carta que esta zona necesitaba hace tiempo."
  },
  {
    author: "Jorge QM",
    initials: "JQ",
    color: "#6A8A52",
    text: "Una joya que acaba de abrir en pleno centro de Santa Cruz con una propuesta sencilla y asequible pero de un nivel que nada tiene que envidiarle a los mejores."
  },
  {
    author: "Ainhoa González Gutiérrez",
    initials: "AG",
    color: "#8A527A",
    text: "Mi nuevo sitio favorito en Santa Cruz!! Tienen menús de almuerzo a un precio increíble, muy completos y con raciones generosas."
  },
  {
    author: "Raquel Villarreal",
    initials: "RV",
    color: "#528A8A",
    text: "Hemos estado muy a gusto, pero además la comida ha acompañado. El pollo crujiente es una delicia, crujiente por fuera y súper jugoso por dentro."
  },
  {
    author: "Se AndCo",
    initials: "SA",
    color: "#4F6D7A",
    text: "Absolutely recommended!! I just had a Salmon toast and a Latte Macchiato, both delicious. This is the first spot on the island where healthy meets wonderful..."
  },
  {
    author: "Guille El Invencible",
    initials: "GI",
    color: "#C05C46",
    text: "Todo super rico, atencion super buena y buen ambiente, volveré"
  },
  {
    author: "Gabriel Rodríguez Hernández",
    initials: "GH",
    color: "#567D62",
    text: "Muy buen sitio, la comida genial"
  },
  {
    author: "Eszter Szabo",
    initials: "ES",
    color: "#3B7A9E",
    text: "Kind staff, amazing sandwiches! Highly recommended spot in Santa Cruz."
  },
  {
    author: "Ivan Garcia",
    initials: "IG",
    color: "#9A6B46",
    text: "Se come muy bien"
  },
  {
    author: "Tito Rodríguez",
    initials: "TR",
    color: "#C76B38",
    text: "Es un sitio buenísimo. Siempre que vengo a comer salgo encantado tanto por la atención ofrecida como por la calidad de la comida."
  },
  {
    author: "Pablo Garrido",
    initials: "PG",
    color: "#546E7A",
    text: "Excelente opción para desayunar en el centro de Santa Cruz. Tanto el trato como la comida de 10. Todo lo que pedimos estaba excelente. Bocadillo de carne..."
  },
  {
    author: "Elio 2306",
    initials: "E2",
    color: "#D48C46",
    text: "Sehr schönes Café mit freundlichem Service und richtig leckerem Essen (das die Wartezeit wert ist)"
  },
  {
    author: "Esther De Martin Pacheco",
    initials: "EM",
    color: "#6D8B74",
    text: "Servicio súper atento, comida riquísima y un ambiente encantador en pleno centro."
  },
  {
    author: "Rocío Hernández Santos",
    initials: "RH",
    color: "#00897B",
    text: "Gran ambiente, trato inmejorable y comida exquisita. Totalmente recomendable."
  },
  {
    author: "Cesar Montelongo hernandez",
    initials: "CM",
    color: "#E64A19",
    text: "Excelente lugar en Santa Cruz, la comida riquísima y la atención de 10."
  }
];

function initReviewsSlider() {
  const slider = document.getElementById('reviews-slider');
  const dotsContainer = document.querySelector('.slider-dots');
  if (!slider) return;

  // Shuffle reviews randomly on each page visit
  const shuffledReviews = [...ALL_GOOGLE_REVIEWS].sort(() => Math.random() - 0.5);

  // Render cards
  slider.innerHTML = shuffledReviews.map(rev => `
    <div class="review-card" style="min-width: 290px; flex: 0 0 350px; scroll-snap-align: start; text-align: left;">
      <div>
        <div class="review-stars">★★★★★</div>
        <p class="review-text">"${rev.text}"</p>
      </div>
      <div class="review-author">
        <div class="review-avatar" style="background-color: ${rev.color};">${rev.initials}</div>
        <div class="review-info-meta">
          <h5>${rev.author}</h5>
          <span class="verified-tag">✓ Reseña verificada en Google</span>
        </div>
      </div>
    </div>
  `).join('');

  // Render navigation dots dynamically
  if (dotsContainer) {
    const numDots = Math.min(5, Math.ceil(shuffledReviews.length / 2));
    dotsContainer.innerHTML = Array.from({ length: numDots }, (_, i) => 
      `<span class="dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`
    ).join('');

    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if (maxScroll <= 0) return;
        const targetScroll = (idx / (dots.length - 1)) * maxScroll;
        slider.scrollTo({ left: targetScroll, behavior: 'smooth' });
      });
    });

    slider.addEventListener('scroll', () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (maxScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, slider.scrollLeft / maxScroll));
      const activeDotIndex = Math.min(dots.length - 1, Math.round(progress * (dots.length - 1)));

      dots.forEach((dot, idx) => {
        if (idx === activeDotIndex) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    });
  }
}

// --- SYSTEM UTILS: TOAST NOTIFICATIONS ---
function showToast(message) {
  const toast = document.getElementById('toast-msg');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// --- LIVE ORDERING SYSTEM (QR Mesa KDS) ---
async function sendOrderToKds() {
  if (cart.length === 0) return;

  const orderTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // Format the new items with their batch time and default status 'pending'
  const newItems = cart.map(item => ({
    name: item.name,
    qty: item.qty,
    icon: item.icon,
    desc: item.desc || '',
    price: item.price,
    time: orderTime,
    status: 'pending'
  }));

  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  const localExistingOrder = ordersList.find(o => Number(o.mesa) === Number(mesaNumber) && o.status !== 'billed');

  if (supabaseClient) {
    try {
      // 1. Fetch active order for this table from Supabase (exclude billed)
      const { data: dbOrders, error: fetchErr } = await supabaseClient
        .from('maia_orders')
        .select('*')
        .eq('mesa', mesaNumber)
        .neq('status', 'billed');
        
      if (fetchErr) throw fetchErr;
      
      const dbExistingOrder = dbOrders && dbOrders.length > 0 ? dbOrders[0] : null;
      
      if (dbExistingOrder) {
        // Merge with existing order in Supabase
        const dbItems = (dbExistingOrder.items || []).map(item => ({
          ...item,
          time: item.time || dbExistingOrder.time || 'Original',
          status: item.status || dbExistingOrder.status || 'served'
        }));
        
        const updatedItems = [...dbItems, ...newItems];
        const updatedTotal = Number(dbExistingOrder.total || 0) + cartTotal;
        const updatedStatus = 'pending'; // Reset card status so kitchen sees new items
        
        const { error: updateErr } = await supabaseClient
          .from('maia_orders')
          .update({
            items: updatedItems,
            total: updatedTotal,
            status: updatedStatus,
            time: orderTime
          })
          .eq('id', dbExistingOrder.id);
          
        if (updateErr) throw updateErr;
        
      } else {
        // Create new order in Supabase
        const orderData = {
          id: 'order-' + Date.now(),
          mesa: mesaNumber,
          time: orderTime,
          items: newItems,
          total: cartTotal,
          status: 'pending'
        };
        
        const { error: insertErr } = await supabaseClient
          .from('maia_orders')
          .insert([orderData]);
          
        if (insertErr) throw insertErr;
      }
    } catch (err) {
      console.error('Error syncing order with Supabase, falling back to local:', err);
      handleLocalOrderMerge(ordersList, localExistingOrder, newItems, cartTotal, orderTime);
    }
  } else {
    handleLocalOrderMerge(ordersList, localExistingOrder, newItems, cartTotal, orderTime);
  }

  // Clear cart and update UI
  cart = [];
  updateCartUI();

  alert(`🍳 ¡Pedido enviado a Cocina!\n\nTu pedido se está preparando para ser servido en la Mesa ${mesaNumber}.\nTotal estimado: ${cartTotal.toFixed(2)}€`);
  showToast(`✨ Pedido enviado a Cocina (Mesa ${mesaNumber})`);
}

function handleLocalOrderMerge(ordersList, localExistingOrder, newItems, cartTotal, orderTime) {
  if (localExistingOrder) {
    const dbItems = (localExistingOrder.items || []).map(item => ({
      ...item,
      time: item.time || localExistingOrder.time || 'Original',
      status: item.status || localExistingOrder.status || 'served'
    }));
    
    localExistingOrder.items = [...dbItems, ...newItems];
    localExistingOrder.total = Number(localExistingOrder.total || 0) + cartTotal;
    localExistingOrder.status = 'pending';
    localExistingOrder.time = orderTime;
  } else {
    const orderData = {
      id: 'order-' + Date.now(),
      mesa: mesaNumber,
      time: orderTime,
      items: newItems,
      total: cartTotal,
      status: 'pending'
    };
    ordersList.push(orderData);
  }
  localStorage.setItem('maia_live_orders', JSON.stringify(ordersList));
  orderChannel.postMessage({ type: 'ORDER_UPDATED' });
}

function initKds() {
  if (supabaseClient) {
    // 1. Fetch active orders from Supabase on load (exclude billed only)
    supabaseClient
      .from('maia_orders')
      .select('*')
      .ne('status', 'billed')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          localStorage.setItem('maia_live_orders', JSON.stringify(data));
          renderKdsOrders();
        } else if (error) {
          console.error('Error cargando pedidos de Supabase:', error);
        }
      });

    // 1.1 Fetch stock settings from Supabase
    supabaseClient
      .from('maia_products')
      .select('*')
      .eq('id', 'settings-stock')
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          try {
            outOfStockItems = JSON.parse(data.desc) || [];
            localStorage.setItem('maia_out_of_stock', JSON.stringify(outOfStockItems));
          } catch(e) {
            console.error(e);
          }
        }
      });

    // 2. Subscribe to Supabase real-time changes
    supabaseClient
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'maia_orders'
        },
        payload => {
          let list = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
          
          if (payload.eventType === 'INSERT') {
            playKdsChime();
            list.push(payload.new);
          } else if (payload.eventType === 'UPDATE') {
            if (payload.new.status === 'billed') {
              list = list.filter(o => o.id !== payload.new.id);
            } else {
              const idx = list.findIndex(o => o.id === payload.new.id);
              if (idx !== -1) {
                list[idx] = payload.new;
              } else {
                list.push(payload.new);
              }
            }
          } else if (payload.eventType === 'DELETE') {
            list = list.filter(o => o.id !== payload.old.id);
          }
          
          localStorage.setItem('maia_live_orders', JSON.stringify(list));
          renderKdsOrders();
        }
      )
      .subscribe();
  } else {
    // Local fallback listeners
    orderChannel.onmessage = (event) => {
      if (event.data.type === 'NEW_ORDER') {
        playKdsChime();
        renderKdsOrders();
      } else if (event.data.type === 'ORDER_UPDATED') {
        renderKdsOrders();
        const historyModal = document.getElementById('sales-history-backdrop');
        if (historyModal && historyModal.style.display === 'flex') {
          renderSalesHistory();
        }
      } else if (event.data.type === 'PRODUCTS_UPDATED') {
        loadActiveProducts();
        loadActiveBrunchOptions();
      } else if (event.data.type === 'SHOPPING_LIST_UPDATED') {
        renderShoppingList();
      }
    };
  }

  renderKdsOrders();
  renderShoppingList();

  // Initialize midnight clear check for yesterday's sales history
  checkAndClearYesterdaySales();
  setInterval(checkAndClearYesterdaySales, 60000); // Check every minute
}

function renderKdsOrders() {
  const container = document.getElementById('kds-orders-grid');
  if (!container) return;

  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];

  if (ordersList.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; grid-column: 1 / -1; padding: 80px 0; color: #9E9185;">
        <span style="font-size: 3rem;">📥</span>
        <h3 style="margin-top: 16px;">Esperando pedidos en directo...</h3>
        <p style="font-size: 0.9rem;">Escanea el QR en una mesa para simular un pedido en directo.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  
  ordersList.forEach(order => {
    const card = document.createElement('div');
    card.className = `kds-card ${order.status}`;
    
    let statusLabel = 'Pendiente';
    let btnText = 'Empezar Preparación';
    let btnClass = 'btn-primary';
    
    if (order.status === 'preparing') {
      statusLabel = 'Preparando 🍳';
      btnText = 'Completar y Servir';
      btnClass = 'btn-outline-rust';
    } else if (order.status === 'served') {
      statusLabel = 'Servido ✅';
      btnText = 'Generar Factura 🧾';
      btnClass = 'btn-outline-olive';
    }

    // Group items by order time (batch)
    const grouped = {};
    (order.items || []).forEach(item => {
      const t = item.time || order.time || 'Original';
      if (!grouped[t]) {
        grouped[t] = [];
      }
      grouped[t].push(item);
    });

    let itemsHTML = '';
    Object.keys(grouped).forEach(timeKey => {
      itemsHTML += `
        <div style="margin-bottom: 12px;">
          <div style="font-size: 0.8rem; font-weight: bold; color: var(--accent-olive); border-bottom: 1px solid #4A3E3B; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span>🕒 Tanda de las ${timeKey}</span>
          </div>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.95rem;">
      `;
      
      grouped[timeKey].forEach(item => {
        const isServed = item.status === 'served' || order.status === 'served';
        const isPreparing = item.status === 'preparing';
        
        let nameStyle = '';
        let statusTag = '';
        
        if (isServed) {
          nameStyle = 'text-decoration: line-through; color: #8c7b72; opacity: 0.6;';
          statusTag = '<span style="font-size: 0.8rem; color: var(--accent-olive); font-weight: bold; margin-left: 6px;">✔</span>';
        } else if (isPreparing) {
          statusTag = '<span style="font-size: 0.7rem; background-color: var(--accent-rust); color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-left: 6px;">🍳 Prep</span>';
        } else {
          statusTag = '<span style="font-size: 0.7rem; background-color: #5C524A; color: #F5F2EB; padding: 2px 6px; border-radius: 4px; font-weight: bold; margin-left: 6px;">NUEVO</span>';
        }

        itemsHTML += `
          <li style="display: flex; flex-direction: column; margin-bottom: 6px; padding-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="${nameStyle}"><span class="kds-item-qty">${item.qty}x</span> ${item.icon || '🍳'} ${item.name}</span>
              ${statusTag}
            </div>
            ${item.desc ? `<div style="font-size: 0.75rem; color: #9E9185; margin-left: 32px; margin-top: 2px; font-style: italic; line-height: 1.2;">(${item.desc})</div>` : ''}
          </li>
        `;
      });
      
      itemsHTML += `
          </ul>
        </div>
      `;
    });

    card.innerHTML = `
      <button onclick="deleteOrderKds('${order.id}')" style="position: absolute; top: 12px; right: 12px; background: transparent; border: none; color: #8c7b72; font-size: 1.25rem; cursor: pointer; padding: 4px; line-height: 1; transition: color 0.2s;" onmouseover="this.style.color='#f44336'" onmouseout="this.style.color='#8c7b72'" title="Eliminar comanda">&times;</button>
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-right: 18px;">
          <span style="font-size: 1.25rem; font-weight: 700; color: var(--accent-rust);">Mesa ${order.mesa}</span>
          <span style="font-size: 0.8rem; color: var(--text-light);">${order.time}</span>
        </div>
        <div style="background-color: #241E1C; padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600; text-align: center; margin-bottom: 16px;">
          ${statusLabel}
        </div>
        <div style="max-height: 280px; overflow-y: auto; margin-bottom: 20px; padding-right: 4px;">
          ${itemsHTML}
        </div>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 16px; font-size: 1.05rem;">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}€</span>
        </div>
        <button class="btn ${btnClass}" style="width: 100%; font-size: 0.85rem; padding: 10px;" onclick="advanceOrderStatus('${order.id}')">${btnText}</button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

window.advanceOrderStatus = function(orderId) {
  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  const order = ordersList.find(o => o.id === orderId);
  if (!order) return;

  if (order.status === 'pending') {
    const newStatus = 'preparing';
    if (order.items) {
      order.items.forEach(item => {
        if (!item.status || item.status === 'pending') {
          item.status = 'preparing';
        }
      });
    }
    
    updateDbOrderStatus(orderId, newStatus, order.items, ordersList);
    
  } else if (order.status === 'preparing') {
    const newStatus = 'served';
    if (order.items) {
      order.items.forEach(item => {
        if (!item.status || item.status === 'preparing') {
          item.status = 'served';
        }
      });
    }
    
    updateDbOrderStatus(orderId, newStatus, order.items, ordersList);
    
  } else if (order.status === 'served') {
    openReceiptModal(orderId);
  }
};

function updateDbOrderStatus(orderId, newStatus, updatedItems, ordersList) {
  if (supabaseClient) {
    supabaseClient
      .from('maia_orders')
      .update({ 
        status: newStatus,
        items: updatedItems
      })
      .eq('id', orderId)
      .then(({ error }) => {
        if (error) console.error('Error actualizando pedido en Supabase:', error);
      });
  } else {
    const order = ordersList.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.items = updatedItems;
    }
    localStorage.setItem('maia_live_orders', JSON.stringify(ordersList));
    renderKdsOrders();
    orderChannel.postMessage({ type: 'ORDER_UPDATED' });
  }
}

let currentBillingOrderMesa = null;

window.openReceiptModal = function(orderId) {
  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  const order = ordersList.find(o => o.id === orderId);
  if (!order) return;

  currentBillingOrderMesa = order.mesa;

  // Populate ticket metadata
  document.getElementById('receipt-number').textContent = order.id.replace('order-', '').slice(-4);
  document.getElementById('receipt-date').textContent = new Date().toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  document.getElementById('receipt-table').textContent = `Mesa ${order.mesa}`;
  document.getElementById('receipt-time').textContent = order.time;

  // Build items rows
  const tbody = document.getElementById('receipt-items-body');
  tbody.innerHTML = '';

  // Consolidate duplicate items for printing (same name and description)
  const consolidatedItems = [];
  (order.items || []).forEach(item => {
    const existing = consolidatedItems.find(r => r.name === item.name && (r.desc || '') === (item.desc || ''));
    if (existing) {
      existing.qty += item.qty;
    } else {
      consolidatedItems.push({ ...item });
    }
  });

  let totalCalculated = 0;
  tbody.innerHTML = '';
  consolidatedItems.forEach(item => {
    const itemPrice = item.price || 0;
    const itemTotal = itemPrice * item.qty;
    totalCalculated += itemTotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="padding: 6px 0; font-weight: bold;">${item.qty}x</td>
      <td style="padding: 6px 0;">
        ${item.name}
        ${item.desc ? `<div style="font-size: 0.72rem; color: #555; font-style: italic; margin-top: 2px;">(${item.desc})</div>` : ''}
      </td>
      <td style="padding: 6px 0; text-align: right;">${itemTotal.toFixed(2)}€</td>
    `;
    tbody.appendChild(row);
  });

  const total = order.total || totalCalculated;
  const subtotal = total / 1.07; // 7% IGIC en Canarias
  const tax = total - subtotal;

  document.getElementById('receipt-subtotal').textContent = `${subtotal.toFixed(2)}€`;
  document.getElementById('receipt-tax').textContent = `${tax.toFixed(2)}€`;
  document.getElementById('receipt-total').textContent = `${total.toFixed(2)}€`;

  // Bind Charge & Close Action
  const chargeBtn = document.getElementById('btn-receipt-charge');
  chargeBtn.textContent = '💳 Cobrar y Cerrar';
  chargeBtn.onclick = () => {
    confirmChargeAndCloseTable(order.id);
  };

  // Display the receipt modal backdrop
  document.getElementById('receipt-modal-backdrop').style.display = 'flex';
};

window.closeReceiptModal = function() {
  document.getElementById('receipt-modal-backdrop').style.display = 'none';
};

window.confirmChargeAndCloseTable = function(orderId) {
  const billedAt = new Date().toISOString();
  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  const targetOrder = ordersList.find(o => o.id === orderId);
  const targetMesa = (targetOrder && targetOrder.mesa) ? String(targetOrder.mesa) : (currentBillingOrderMesa ? String(currentBillingOrderMesa) : null);

  // 1. Send BroadcastChannel event to local tabs
  if (targetMesa && typeof orderChannel !== 'undefined' && orderChannel) {
    orderChannel.postMessage({ type: 'CLEAR_TABLE_SESSION', mesa: targetMesa });
    orderChannel.postMessage({ type: 'ORDER_UPDATED' });
  }

  // 2. Broadcast via Supabase Realtime across all devices over Internet
  if (supabaseClient && targetMesa) {
    try {
      supabaseClient.channel('client-table-clearance').send({
        type: 'broadcast',
        event: 'CLEAR_TABLE_SESSION',
        payload: { mesa: targetMesa }
      });
    } catch(e) {
      console.error('Error broadcasting table clear:', e);
    }
  }

  // 3. Mark all orders for targetMesa (or specific orderId) as 'billed' in Supabase
  if (supabaseClient) {
    const query = targetMesa 
      ? supabaseClient.from('maia_orders').update({ status: 'billed' }).eq('mesa', targetMesa)
      : supabaseClient.from('maia_orders').update({ status: 'billed' }).eq('id', orderId);

    query
      .then(({ error }) => {
        if (error) {
          console.error('Error archivando pedido en Supabase:', error);
          fallbackLocalCharge(orderId, billedAt);
        } else {
          // Ensure orderId is explicitly updated as well
          supabaseClient.from('maia_orders').update({ status: 'billed' }).eq('id', orderId);

          // Remove from local active orders cache
          ordersList = ordersList.filter(o => o.id !== orderId && (targetMesa ? String(o.mesa) !== String(targetMesa) : true));
          localStorage.setItem('maia_live_orders', JSON.stringify(ordersList));
          
          renderKdsOrders();
          closeReceiptModal();
          showToast(`💳 Mesa ${targetMesa || ''} cobrada y liberada con éxito.`);
        }
      })
      .catch(err => {
        console.error('Excepción al cobrar en Supabase:', err);
        fallbackLocalCharge(orderId, billedAt);
      });
  } else {
    fallbackLocalCharge(orderId, billedAt);
  }
};

function fallbackLocalCharge(orderId, billedAt) {
  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  const order = ordersList.find(o => o.id === orderId);
  
  if (order) {
    order.status = 'billed';
    order.billed_at = billedAt;
    
    // Move to local history
    let billedHistory = JSON.parse(localStorage.getItem('maia_billed_history')) || [];
    // Evitar duplicados en el historial local
    if (!billedHistory.some(h => h.id === order.id)) {
      billedHistory.push(order);
    }
    localStorage.setItem('maia_billed_history', JSON.stringify(billedHistory));
  }
  
  // Remove from active list
  ordersList = ordersList.filter(o => o.id !== orderId);
  localStorage.setItem('maia_live_orders', JSON.stringify(ordersList));
  
  renderKdsOrders();
  if (typeof orderChannel !== 'undefined' && orderChannel) {
    orderChannel.postMessage({ type: 'ORDER_UPDATED' });
  }
  closeReceiptModal();
}

window.deleteOrderKds = function(orderId) {
  if (!confirm('¿Seguro que quieres eliminar este pedido permanentemente? (Esta acción no se puede deshacer)')) return;

  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  const targetOrder = ordersList.find(o => o.id === orderId);
  const targetMesa = targetOrder ? targetOrder.mesa : null;

  if (targetMesa && typeof orderChannel !== 'undefined' && orderChannel) {
    orderChannel.postMessage({ type: 'CLEAR_TABLE_SESSION', mesa: targetMesa });
  }

  if (supabaseClient) {
    supabaseClient
      .from('maia_orders')
      .delete()
      .eq('id', orderId)
      .then(({ error }) => {
        if (error) {
          console.error('Error eliminando pedido en Supabase:', error);
        }
      });
  } else {
    ordersList = ordersList.filter(o => o.id !== orderId);
    localStorage.setItem('maia_live_orders', JSON.stringify(ordersList));
    renderKdsOrders();
    orderChannel.postMessage({ type: 'ORDER_UPDATED' });
  }
};

function playKdsChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playTone = (freq, duration, delay) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
      
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + delay + duration);
    };
    
    playTone(880, 0.8, 0);
    playTone(1320, 1.0, 0.08);
  } catch (e) {
    console.log("AudioContext blocked:", e);
  }
}

// --- STOCK & OUT OF STOCK MANAGEMENT UTILITIES ---
function updateBrunchCreatorStock() {
  for (const cat in brunchChoices) {
    const choice = brunchChoices[cat];
    if (choice && outOfStockItems.includes(choice.name)) {
      brunchChoices[cat] = null;
    }
  }
  renderBrunchCustomizerOptions();
  updateBrunchSummary();
}

window.openStockModal = function() {
  outOfStockItems = JSON.parse(localStorage.getItem('maia_out_of_stock')) || [];
  
  const productsContainer = document.getElementById('stock-products-list');
  if (productsContainer) {
    productsContainer.innerHTML = '';
    PRODUCTS.forEach(p => {
      const isAvailable = !outOfStockItems.includes(p.id);
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justify = 'space-between';
      row.style.alignItems = 'center';
      row.style.padding = '10px 14px';
      row.style.backgroundColor = '#2D2523';
      row.style.borderRadius = 'var(--radius-sm)';
      row.style.fontSize = '0.9rem';
      
      row.innerHTML = `
        <span style="font-weight: 600; color: #F5F2EB;">${p.icon} ${p.name}</span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onclick="editProduct('${p.id}')" style="background: none; border: none; cursor: pointer; font-size: 0.95rem; color: #40c0e0; padding: 2px;" title="Editar">✏️</button>
          <button onclick="deleteProduct('${p.id}')" style="background: none; border: none; cursor: pointer; font-size: 0.95rem; color: var(--accent-rust); padding: 2px;" title="Eliminar">🗑️</button>
          <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem; margin-left: 4px;">
            <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="toggleStock('${p.id}', this.checked)" style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--accent-rust);">
            ${isAvailable ? '<span style="color: var(--accent-olive); font-weight: bold;">Disponible</span>' : '<span style="color: var(--accent-rust); font-weight: bold;">Agotado</span>'}
          </label>
        </div>
      `;
      productsContainer.appendChild(row);
    });
  }

  const brunchContainer = document.getElementById('stock-brunch-list');
  if (brunchContainer) {
    brunchContainer.innerHTML = '';
    
    BRUNCH_OPTIONS.forEach(opt => {
      const isAvailable = !outOfStockItems.includes(opt.name);
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justify = 'space-between';
      row.style.alignItems = 'center';
      row.style.padding = '10px 14px';
      row.style.backgroundColor = '#2D2523';
      row.style.borderRadius = 'var(--radius-sm)';
      row.style.fontSize = '0.9rem';
      
      row.innerHTML = `
        <span style="font-weight: 600; color: #F5F2EB;">🍳 ${opt.name} <span style="font-size: 0.75rem; color: var(--text-light); font-weight: normal;">(${opt.category})</span></span>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onclick="editProduct('${opt.id}')" style="background: none; border: none; cursor: pointer; font-size: 0.95rem; color: #40c0e0; padding: 2px;" title="Editar">✏️</button>
          <button onclick="deleteProduct('${opt.id}')" style="background: none; border: none; cursor: pointer; font-size: 0.95rem; color: var(--accent-rust); padding: 2px;" title="Eliminar">🗑️</button>
          <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 0.85rem; margin-left: 4px;">
            <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="toggleStock('${opt.name}', this.checked)" style="cursor: pointer; width: 16px; height: 16px; accent-color: var(--accent-rust);">
            ${isAvailable ? '<span style="color: var(--accent-olive); font-weight: bold;">Disponible</span>' : '<span style="color: var(--accent-rust); font-weight: bold;">Agotado</span>'}
          </label>
        </div>
      `;
      brunchContainer.appendChild(row);
    });
  }

  const modal = document.getElementById('stock-modal-backdrop');
  if (modal) modal.style.display = 'flex';
};

window.closeStockModal = function() {
  const modal = document.getElementById('stock-modal-backdrop');
  if (modal) modal.style.display = 'none';
};

window.toggleStock = function(itemId, isAvailable) {
  outOfStockItems = JSON.parse(localStorage.getItem('maia_out_of_stock')) || [];
  if (isAvailable) {
    outOfStockItems = outOfStockItems.filter(id => id !== itemId);
  } else {
    if (!outOfStockItems.includes(itemId)) {
      outOfStockItems.push(itemId);
    }
  }
  localStorage.setItem('maia_out_of_stock', JSON.stringify(outOfStockItems));
  
  if (supabaseClient) {
    supabaseClient
      .from('maia_products')
      .upsert({
        id: 'settings-stock',
        name: 'settings-stock',
        category: 'settings',
        desc: JSON.stringify(outOfStockItems),
        price: 0,
        icon: '⚙️',
        tags: []
      })
      .then(({ error }) => {
        if (error) console.error('Error al guardar stock en Supabase:', error);
      });
  }

  // Broadcast to all tabs in real-time
  orderChannel.postMessage({ type: 'STOCK_UPDATED', outOfStock: outOfStockItems });

  // Re-render KDS Stock list dialog internally to show updated text "Disponible" / "Agotado"
  openStockModal();
};

window.openCreateProductModal = function() {
  const modal = document.getElementById('create-product-modal-backdrop');
  if (modal) {
    document.getElementById('edit-prod-id').value = '';
    document.getElementById('create-product-form').reset();
    document.getElementById('new-prod-type').value = 'carta';
    toggleFormItemType();

    const title = modal.querySelector('h3');
    if (title) title.textContent = '➕ Añadir Nuevo Producto / Especial';
    const submitBtn = modal.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Guardar Plato';
    modal.style.display = 'flex';
  }
};

window.closeCreateProductModal = function() {
  const modal = document.getElementById('create-product-modal-backdrop');
  if (modal) {
    modal.style.display = 'none';
    document.getElementById('create-product-form').reset();
    document.getElementById('edit-prod-id').value = '';
  }
};

window.toggleFormItemType = function() {
  const type = document.getElementById('new-prod-type').value;
  const sectionCarta = document.getElementById('section-carta-fields');
  const sectionBrunch = document.getElementById('section-brunch-fields');

  if (type === 'carta') {
    sectionCarta.style.display = 'flex';
    sectionBrunch.style.display = 'none';
  } else {
    sectionCarta.style.display = 'none';
    sectionBrunch.style.display = 'flex';
  }
};

window.editProduct = function(productId) {
  const modal = document.getElementById('create-product-modal-backdrop');
  if (!modal) return;

  // Clear previous values first
  document.getElementById('create-product-form').reset();

  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    document.getElementById('new-prod-type').value = 'carta';
    toggleFormItemType();

    document.getElementById('edit-prod-id').value = product.id;
    document.getElementById('new-prod-name').value = product.name || '';
    document.getElementById('new-prod-category').value = product.category || 'bocadillos';
    document.getElementById('new-prod-price').value = product.price || '';
    document.getElementById('new-prod-icon').value = product.icon || '';
    document.getElementById('new-prod-tag').value = (product.tags && product.tags.length > 0) ? product.tags[0] : '';
    document.getElementById('new-prod-img-url').value = (product.image && !product.image.startsWith('data:')) ? product.image : '';
    document.getElementById('new-prod-desc').value = product.desc || '';
    document.getElementById('new-prod-file').value = '';

    const title = modal.querySelector('h3');
    if (title) title.textContent = `✏️ Editar Producto: ${product.name}`;
    const submitBtn = modal.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Guardar Cambios';

    modal.style.display = 'flex';
    return;
  }

  const brunchOpt = BRUNCH_OPTIONS.find(b => b.id === productId);
  if (brunchOpt) {
    document.getElementById('new-prod-type').value = 'brunch';
    toggleFormItemType();

    document.getElementById('edit-prod-id').value = brunchOpt.id;
    document.getElementById('new-prod-name').value = brunchOpt.name || '';
    document.getElementById('new-brunch-category').value = brunchOpt.category || 'base';
    document.getElementById('new-brunch-price').value = brunchOpt.price || '';
    document.getElementById('new-brunch-displayname').value = brunchOpt.displayName || '';
    document.getElementById('new-brunch-layerclass').value = brunchOpt.layerClass || '';
    document.getElementById('new-prod-desc').value = brunchOpt.desc || '';

    const title = modal.querySelector('h3');
    if (title) title.textContent = `✏️ Editar Brunch: ${brunchOpt.name}`;
    const submitBtn = modal.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Guardar Cambios';

    modal.style.display = 'flex';
  }
};

window.deleteProduct = function(productId) {
  let targetName = "";
  let isBrunch = false;
  
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    targetName = product.name;
  } else {
    const brunchOpt = BRUNCH_OPTIONS.find(b => b.id === productId);
    if (brunchOpt) {
      targetName = brunchOpt.name;
      isBrunch = true;
    }
  }

  if (!targetName) return;

  if (confirm(`¿Estás seguro de que quieres eliminar "${targetName}"?`)) {
    if (isBrunch) {
      let activeList = [...BRUNCH_OPTIONS];
      activeList = activeList.filter(p => p.id !== productId);
      localStorage.setItem('maia_active_brunch_options', JSON.stringify(activeList));
      loadActiveBrunchOptions();
    } else {
      let activeList = [...PRODUCTS];
      activeList = activeList.filter(p => p.id !== productId);
      localStorage.setItem('maia_active_products', JSON.stringify(activeList));
      loadActiveProducts();
      
      if (supabaseClient) {
        supabaseClient
          .from('maia_products')
          .delete()
          .eq('id', productId)
          .then(({ error }) => {
            if (error) console.error('Error in Supabase delete:', error);
          });
      }
    }

    orderChannel.postMessage({ type: 'PRODUCTS_UPDATED' });
    showToast(`🗑️ Eliminado con éxito: ${targetName}`);
    openStockModal();
  }
};

window.saveCustomProduct = function(event) {
  event.preventDefault();

  const id = document.getElementById('edit-prod-id').value;
  const type = document.getElementById('new-prod-type').value;
  const name = document.getElementById('new-prod-name').value.trim();
  const desc = document.getElementById('new-prod-desc').value.trim();

  if (!name || !desc) return;

  if (type === 'carta') {
    const category = document.getElementById('new-prod-category').value;
    const price = parseFloat(document.getElementById('new-prod-price').value || 0);
    const icon = document.getElementById('new-prod-icon').value.trim() || '🍽️';
    const tag = document.getElementById('new-prod-tag').value.trim();
    const imgUrl = document.getElementById('new-prod-img-url').value.trim();
    const fileInput = document.getElementById('new-prod-file');

    function proceedWithCartaSave(imageContent) {
      let activeList = [...PRODUCTS];

      if (id) {
        const idx = activeList.findIndex(p => p.id === id);
        if (idx !== -1) {
          const originalImage = activeList[idx].image;
          let finalImage = originalImage;
          if (imageContent) {
            finalImage = imageContent;
          } else if (imgUrl) {
            finalImage = imgUrl;
          } else {
            finalImage = imgUrl === '' ? '' : originalImage;
          }

          activeList[idx] = {
            ...activeList[idx],
            name: name,
            category: category,
            price: price,
            desc: desc,
            image: finalImage,
            icon: icon,
            tags: tag ? [tag] : []
          };
        }
      } else {
        const newProduct = {
          id: 'custom-' + Date.now(),
          name: name,
          category: category,
          price: price,
          desc: desc,
          image: imageContent || imgUrl || '',
          icon: icon,
          tags: tag ? [tag] : []
        };
        activeList.push(newProduct);
      }

      localStorage.setItem('maia_active_products', JSON.stringify(activeList));
      loadActiveProducts();

      if (supabaseClient) {
        const dbProduct = id ? activeList.find(p => p.id === id) : activeList[activeList.length - 1];
        if (id) {
          supabaseClient.from('maia_products').update(dbProduct).eq('id', id).then(({ error }) => {
            if (error) console.error(error);
          });
        } else {
          supabaseClient.from('maia_products').insert([dbProduct]).then(({ error }) => {
            if (error) console.error(error);
          });
        }
      }

      orderChannel.postMessage({ type: 'PRODUCTS_UPDATED' });
      window.closeCreateProductModal();
      showToast(id ? `✏️ Producto modificado: ${name}` : `✨ Producto añadido: ${name}`);

      if (document.getElementById('stock-modal-backdrop').style.display === 'flex') {
        openStockModal();
      }
    }

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      if (file.size > 1024 * 1024) {
        alert("La foto es demasiado grande. Menos de 1 MB, por favor.");
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        proceedWithCartaSave(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      proceedWithCartaSave(null);
    }

  } else {
    const category = document.getElementById('new-brunch-category').value;
    const price = parseFloat(document.getElementById('new-brunch-price').value || 0);
    const displayName = document.getElementById('new-brunch-displayname').value.trim() || name;
    const layerClass = document.getElementById('new-brunch-layerclass').value;

    let activeList = [...BRUNCH_OPTIONS];

    if (id) {
      const idx = activeList.findIndex(b => b.id === id);
      if (idx !== -1) {
        activeList[idx] = {
          ...activeList[idx],
          name: name,
          category: category,
          price: price,
          displayName: displayName,
          layerClass: layerClass,
          desc: desc
        };
      }
    } else {
      const newOption = {
        id: 'brunch-' + Date.now(),
        category: category,
        name: name,
        displayName: displayName,
        price: price,
        desc: desc,
        layerClass: layerClass
      };
      activeList.push(newOption);
    }

    localStorage.setItem('maia_active_brunch_options', JSON.stringify(activeList));
    loadActiveBrunchOptions();

    orderChannel.postMessage({ type: 'PRODUCTS_UPDATED' });
    window.closeCreateProductModal();
    showToast(id ? `✏️ Brunch modificado: ${name}` : `✨ Brunch añadido: ${name}`);

    if (document.getElementById('stock-modal-backdrop').style.display === 'flex') {
      openStockModal();
    }
  }
};

// --- SHOPPING LIST DRAWER SYSTEM ---
window.openShoppingList = function() {
  const drawer = document.getElementById('shopping-list-drawer');
  const overlay = document.getElementById('shopping-list-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.style.display = 'block';
    renderShoppingList();
  }
};

window.closeShoppingList = function() {
  const drawer = document.getElementById('shopping-list-drawer');
  const overlay = document.getElementById('shopping-list-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.style.display = 'none';
  }
};

window.renderShoppingList = function() {
  const container = document.getElementById('shopping-items-list');
  if (!container) return;
  container.innerHTML = '';
  
  const list = JSON.parse(localStorage.getItem('maia_shopping_list')) || [];
  
  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: #9E9185;">
        <span style="font-size: 2.5rem;">📝</span>
        <p style="margin-top: 12px; font-size: 0.9rem;">La lista está vacía.</p>
      </div>
    `;
    return;
  }
  
  list.forEach(item => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justify = 'space-between';
    row.style.alignItems = 'center';
    row.style.padding = '12px 16px';
    row.style.backgroundColor = '#1E1B18';
    row.style.borderRadius = 'var(--radius-sm)';
    row.style.border = '1px solid #3D3532';
    row.style.fontSize = '0.9rem';
    
    row.innerHTML = `
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; flex-grow: 1; text-decoration: ${item.completed ? 'line-through' : 'none'}; color: ${item.completed ? '#7E7165' : '#F5F2EB'};">
        <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleShoppingItem('${item.id}', this.checked)" style="cursor: pointer; width: 18px; height: 18px; accent-color: var(--accent-rust);">
        <span>${item.text}</span>
      </label>
      <button onclick="deleteShoppingItem('${item.id}')" style="background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--accent-rust); padding: 4px; display: flex; align-items: center; justify-content: center;" title="Eliminar">🗑️</button>
    `;
    container.appendChild(row);
  });
};

window.addShoppingItem = function(event) {
  event.preventDefault();
  const input = document.getElementById('new-shop-item');
  if (!input) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const list = JSON.parse(localStorage.getItem('maia_shopping_list')) || [];
  list.push({
    id: 'shop-' + Date.now(),
    text: text,
    completed: false
  });
  
  localStorage.setItem('maia_shopping_list', JSON.stringify(list));
  orderChannel.postMessage({ type: 'SHOPPING_LIST_UPDATED' });
  
  renderShoppingList();
  input.value = '';
  input.focus();
};

window.toggleShoppingItem = function(itemId, completed) {
  const list = JSON.parse(localStorage.getItem('maia_shopping_list')) || [];
  const idx = list.findIndex(item => item.id === itemId);
  if (idx !== -1) {
    list[idx].completed = completed;
    localStorage.setItem('maia_shopping_list', JSON.stringify(list));
    orderChannel.postMessage({ type: 'SHOPPING_LIST_UPDATED' });
    renderShoppingList();
  }
};

window.deleteShoppingItem = function(itemId) {
  let list = JSON.parse(localStorage.getItem('maia_shopping_list')) || [];
  list = list.filter(item => item.id !== itemId);
  localStorage.setItem('maia_shopping_list', JSON.stringify(list));
  orderChannel.postMessage({ type: 'SHOPPING_LIST_UPDATED' });
  renderShoppingList();
};

window.clearCompletedShopping = function() {
  let list = JSON.parse(localStorage.getItem('maia_shopping_list')) || [];
  list = list.filter(item => !item.completed);
  localStorage.setItem('maia_shopping_list', JSON.stringify(list));
  orderChannel.postMessage({ type: 'SHOPPING_LIST_UPDATED' });
  renderShoppingList();
  showToast("🧹 Comprados eliminados");
};

window.clearAllShopping = function() {
  if (confirm("¿Estás seguro de que quieres vaciar la lista de la compra?")) {
    localStorage.removeItem('maia_shopping_list');
    orderChannel.postMessage({ type: 'SHOPPING_LIST_UPDATED' });
    renderShoppingList();
    showToast("🗑️ Lista vaciada");
  }
};

// --- PRODUCT DETAIL MODAL LOGIC ---
let selectedProductDetail = null;
let selectedProductQty = 1;

function openProductDetailModal(productId) {
  try {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      alert("No se encontró el producto con ID: " + productId);
      return;
    }

    selectedProductDetail = product;
    selectedProductQty = 1;

    // Set title and price
    const titleEl = document.getElementById('detail-modal-title');
    const priceEl = document.getElementById('detail-modal-price');
    const descEl = document.getElementById('detail-modal-desc');
    
    if (!titleEl || !priceEl || !descEl) {
      alert("Error: No se encontraron los elementos del modal en el HTML.");
      return;
    }

    titleEl.textContent = product.name;
    priceEl.textContent = `${Number(product.price || 0).toFixed(2)}€`;
    descEl.textContent = product.desc || '';
    
    // Set image/icon
    const imgContainer = document.getElementById('detail-modal-img-container');
    if (!imgContainer) {
      alert("Error: No se encontró el contenedor de la imagen.");
      return;
    }
    imgContainer.innerHTML = '';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'menu-card-img-placeholder';
    placeholder.style.fontSize = '3.5rem';
    placeholder.textContent = product.icon;
    imgContainer.appendChild(placeholder);

    if (product.image) {
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.className = 'menu-card-img';
      img.style.cssText = 'position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;';
      img.onerror = () => { img.style.display = 'none'; };
      img.onload = () => { placeholder.style.display = 'none'; };
      imgContainer.appendChild(img);
    }

    // Set tags
    const tagsContainer = document.getElementById('detail-modal-tags');
    if (tagsContainer) {
      tagsContainer.innerHTML = '';
      (product.tags || []).forEach(t => {
        const isVegan = t.toLowerCase().includes('vegano');
        const span = document.createElement('span');
        span.className = `tag ${isVegan ? 'tag-vegan' : ''}`;
        span.textContent = t;
        tagsContainer.appendChild(span);
      });
    }

    // Check out-of-stock and bind add action FIRST (before updateDetailModalSubtotal)
    const addBtn = document.getElementById('btn-detail-add');
    const isOutOfStock = outOfStockItems.includes(product.id);
    if (addBtn) {
      if (isOutOfStock) {
        addBtn.disabled = true;
        addBtn.style.opacity = '0.4';
        addBtn.style.cursor = 'not-allowed';
        addBtn.innerHTML = '⛔ Agotado';
        addBtn.onclick = null;
      } else {
        addBtn.disabled = false;
        addBtn.style.opacity = '1';
        addBtn.style.cursor = 'pointer';
        addBtn.innerHTML = `Añadir al pedido (<span id="detail-modal-subtotal">${(product.price * selectedProductQty).toFixed(2)}€</span>)`;
        addBtn.onclick = () => {
          addToCart(product.id, selectedProductQty, true);
          closeProductDetailModal();
        };
      }
    }

    // Set quantity and subtotal (must come AFTER button rebuild)
    updateDetailModalSubtotal();

    // Open the backdrop
    const backdrop = document.getElementById('product-detail-modal-backdrop');
    if (backdrop) {
      backdrop.style.display = 'flex';
    } else {
      alert("Error: No se encontró el fondo del modal (#product-detail-modal-backdrop).");
    }
  } catch (err) {
    alert("Error al abrir modal: " + err.message + "\nStack: " + err.stack);
  }
}
window.openProductDetailModal = openProductDetailModal;

function closeProductDetailModal() {
  document.getElementById('product-detail-modal-backdrop').style.display = 'none';
  selectedProductDetail = null;
}
window.closeProductDetailModal = closeProductDetailModal;

function incrementDetailQty() {
  selectedProductQty++;
  updateDetailModalSubtotal();
}
window.incrementDetailQty = incrementDetailQty;

function decrementDetailQty() {
  if (selectedProductQty > 1) {
    selectedProductQty--;
    updateDetailModalSubtotal();
  }
}
window.decrementDetailQty = decrementDetailQty;

function updateDetailModalSubtotal() {
  const qtyEl = document.getElementById('detail-modal-qty');
  const subtotalEl = document.getElementById('detail-modal-subtotal');
  if (qtyEl) qtyEl.textContent = selectedProductQty;
  if (subtotalEl && selectedProductDetail) {
    const subtotal = selectedProductDetail.price * selectedProductQty;
    subtotalEl.textContent = `${subtotal.toFixed(2)}€`;
  }
}

// --- SALES HISTORY MODAL AND REPORTING ---
let currentHistoryView = 'today';

window.openSalesHistoryModal = function() {
  document.getElementById('sales-history-backdrop').style.display = 'flex';
  window.setHistoryView('today'); // Default to today's view on open
};

window.closeSalesHistoryModal = function() {
  document.getElementById('sales-history-backdrop').style.display = 'none';
};

window.setHistoryView = function(view) {
  currentHistoryView = view;
  
  const todayBtn = document.getElementById('btn-history-today');
  const allBtn = document.getElementById('btn-history-all');
  
  if (todayBtn && allBtn) {
    if (view === 'today') {
      todayBtn.style.backgroundColor = 'var(--accent-rust)';
      todayBtn.style.color = '#fff';
      todayBtn.style.border = 'none';
      
      allBtn.style.backgroundColor = 'transparent';
      allBtn.style.color = '#F5F2EB';
      allBtn.style.border = '1px solid #5C524A';
    } else {
      allBtn.style.backgroundColor = 'var(--accent-rust)';
      allBtn.style.color = '#fff';
      allBtn.style.border = 'none';
      
      todayBtn.style.backgroundColor = 'transparent';
      todayBtn.style.color = '#F5F2EB';
      todayBtn.style.border = '1px solid #5C524A';
    }
  }
  
  renderSalesHistory();
};

window.renderSalesHistory = async function() {
  const tbody = document.getElementById('sales-history-tbody');
  const emptyMsg = document.getElementById('history-empty-msg');
  const countSpan = document.getElementById('history-total-count');
  const amountSpan = document.getElementById('history-total-amount');
  const countLabel = document.getElementById('history-count-label');
  const amountLabel = document.getElementById('history-amount-label');

  if (!tbody || !emptyMsg) return;

  tbody.innerHTML = '';
  let billedOrders = [];

  if (supabaseClient) {
    try {
      const { data: dbBilled, error } = await supabaseClient
        .from('maia_orders')
        .select('*')
        .eq('status', 'billed')
        .order('created_at', { ascending: false })
        .limit(200);
        
      if (error) throw error;
      billedOrders = dbBilled || [];
    } catch (err) {
      console.error('Error fetching billed history from Supabase:', err);
      billedOrders = JSON.parse(localStorage.getItem('maia_billed_history')) || [];
    }
  } else {
    billedOrders = JSON.parse(localStorage.getItem('maia_billed_history')) || [];
    billedOrders.sort((a, b) => new Date(b.created_at || b.billed_at || Date.now()) - new Date(a.created_at || a.billed_at || Date.now()));
  }

  // Filter based on selected view
  const todayStr = new Date().toLocaleDateString();
  let displayOrders = billedOrders;
  
  if (currentHistoryView === 'today') {
    displayOrders = billedOrders.filter(order => {
      const dateToCheck = order.created_at || order.billed_at || Date.now();
      return new Date(dateToCheck).toLocaleDateString() === todayStr;
    });
    
    if (countLabel) countLabel.textContent = 'Pedidos Cobrados Hoy';
    if (amountLabel) amountLabel.textContent = 'Total Recaudado Hoy';
  } else {
    if (countLabel) countLabel.textContent = 'Total Pedidos Histórico';
    if (amountLabel) amountLabel.textContent = 'Total Recaudado Histórico';
  }

  const totalCount = displayOrders.length;
  const totalRevenue = displayOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  countSpan.textContent = totalCount;
  amountSpan.textContent = `${totalRevenue.toFixed(2)}€`;

  if (displayOrders.length === 0) {
    emptyMsg.style.display = 'block';
    emptyMsg.querySelector('p').textContent = currentHistoryView === 'today' 
      ? 'No hay registros de ventas hoy todavía.' 
      : 'No hay registros de ventas en el historial.';
    return;
  }
  
  emptyMsg.style.display = 'none';

  displayOrders.forEach(order => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #3D3532';
    
    // Formatting time/date:
    // If today, show HH:MM. If other day, show DD/MM HH:MM.
    let timeFormatted = '--:--';
    if (order.billed_at) {
      const billedDate = new Date(order.billed_at);
      if (billedDate.toLocaleDateString() === todayStr) {
        timeFormatted = billedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        timeFormatted = billedDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' }) + ' ' + 
                        billedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    } else {
      timeFormatted = order.time || '--:--';
    }

    const itemsSummary = (order.items || []).map(item => `${item.qty}x ${item.name}`).join(', ');

    tr.innerHTML = `
      <td style="padding: 12px 8px; font-weight: bold; font-family: monospace; color: var(--accent-rust);">#${order.id.replace('order-', '').slice(-4)}</td>
      <td style="padding: 12px 8px; white-space: nowrap;">${timeFormatted}</td>
      <td style="padding: 12px 8px; font-weight: bold;">Mesa ${order.mesa}</td>
      <td style="padding: 12px 8px; color: var(--text-light); font-size: 0.82rem; max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsSummary}">${itemsSummary}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: bold; color: var(--text-primary);">${Number(order.total || 0).toFixed(2)}€</td>
      <td style="padding: 12px 8px; text-align: center; display: flex; gap: 6px; justify-content: center; align-items: center;">
        <button onclick="window.reprintTicketFromHistory('${order.id}')" style="background-color: #5C524A; color: #F5F2EB; border: none; padding: 6px 10px; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; white-space: nowrap;" onmouseover="this.style.backgroundColor='#A96B5B'" onmouseout="this.style.backgroundColor='#5C524A'">🖨️ Imprimir</button>
        <button onclick="window.deleteSaleRecord('${order.id}')" style="background-color: transparent; color: var(--accent-rust); border: 1px solid var(--accent-rust); padding: 5px 8px; border-radius: var(--radius-sm); font-size: 0.78rem; font-weight: bold; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.backgroundColor='var(--accent-rust)'; this.style.color='#fff';" onmouseout="this.style.backgroundColor='transparent'; this.style.color='var(--accent-rust)';" title="Eliminar del historial">&times;</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

window.deleteSaleRecord = async function(orderId) {
  if (!confirm('¿Seguro que quieres eliminar este registro de venta permanentemente? (Esta acción no se puede deshacer)')) return;

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('maia_orders')
        .delete()
        .eq('id', orderId);
      if (error) throw error;
    } catch (err) {
      console.error('Error deleting sale record from Supabase:', err);
    }
  }

  // Always clean up local storage too
  let billedHistory = JSON.parse(localStorage.getItem('maia_billed_history')) || [];
  billedHistory = billedHistory.filter(o => o.id !== orderId);
  localStorage.setItem('maia_billed_history', JSON.stringify(billedHistory));

  // Re-render
  renderSalesHistory();
  
  // Notify other windows
  orderChannel.postMessage({ type: 'ORDER_UPDATED' });
};

async function checkAndClearYesterdaySales() {
  const lastCleared = localStorage.getItem('maia_sales_last_cleared_date');
  const todayStr = new Date().toLocaleDateString('en-CA');
  
  if (lastCleared && lastCleared !== todayStr) {
    console.log('New day detected. Pruning local storage sales cache...');
    
    // Prune local storage history: only keep the last 30 billed orders to prevent bloat,
    // since Supabase holds the full persistent history.
    let billedHistory = JSON.parse(localStorage.getItem('maia_billed_history')) || [];
    billedHistory = billedHistory.slice(-30);
    localStorage.setItem('maia_billed_history', JSON.stringify(billedHistory));
    
    // Refresh modal if visible
    const modal = document.getElementById('sales-history-backdrop');
    if (modal && modal.style.display === 'flex') {
      renderSalesHistory();
    }
    
    // Post update message
    orderChannel.postMessage({ type: 'ORDER_UPDATED' });
  }
  
  localStorage.setItem('maia_sales_last_cleared_date', todayStr);
}

window.reprintTicketFromHistory = async function(orderId) {
  let ordersList = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  let order = ordersList.find(o => o.id === orderId);

  if (!order) {
    let billedHistory = JSON.parse(localStorage.getItem('maia_billed_history')) || [];
    order = billedHistory.find(o => o.id === orderId);
  }

  if (!order && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('maia_orders')
        .select('*')
        .eq('id', orderId);
      if (!error && data && data.length > 0) {
        order = data[0];
      }
    } catch (e) {
      console.error('Error fetching order for reprint:', e);
    }
  }

  if (!order) {
    alert('No se pudo encontrar la información del pedido para reimprimir.');
    return;
  }

  const activeOrders = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
  if (!activeOrders.some(o => o.id === orderId)) {
    activeOrders.push(order);
    localStorage.setItem('maia_live_orders', JSON.stringify(activeOrders));
    
    openReceiptModal(orderId);
    
    const chargeBtn = document.getElementById('btn-receipt-charge');
    if (chargeBtn) {
      chargeBtn.textContent = 'Aceptar / Salir';
      chargeBtn.onclick = () => {
        let cleanActive = JSON.parse(localStorage.getItem('maia_live_orders')) || [];
        cleanActive = cleanActive.filter(o => o.id !== orderId);
        localStorage.setItem('maia_live_orders', JSON.stringify(cleanActive));
        closeReceiptModal();
      };
    }
  } else {
    openReceiptModal(orderId);
  }
};

function initScrollAnimations() {
  const cards = document.querySelectorAll('.philosophy-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('auto-animate');
        setTimeout(() => {
          entry.target.classList.remove('auto-animate');
        }, 3500);
      } else {
        entry.target.classList.remove('auto-animate');
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

window.openContactOptionsModal = function() {
  const modal = document.getElementById('contact-options-modal');
  if (modal) modal.style.display = 'flex';
};

window.closeContactOptionsModal = function() {
  const modal = document.getElementById('contact-options-modal');
  if (modal) modal.style.display = 'none';
};

// --- QR TABLES MANAGER (MESAS 1 A 11) ---
window.openQrModal = function() {
  const modal = document.getElementById('qr-modal-backdrop');
  const container = document.getElementById('qr-grid-container');
  if (!modal || !container) return;

  const baseUrl = window.location.origin + window.location.pathname;
  let html = '';

  for (let i = 1; i <= 11; i++) {
    const tableUrl = `${baseUrl}?mesa=${i}`;
    const qrImageApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(tableUrl)}`;

    html += `
      <div style="background-color: #1E1B18; border: 1px solid #3D3532; border-radius: var(--radius-sm); padding: 16px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 0.75rem; background-color: var(--accent-rust); color: #fff; padding: 2px 8px; border-radius: 12px; font-weight: bold; text-transform: uppercase;">MAIA ESPRESSO</span>
          <h4 style="font-family: var(--font-title); margin: 8px 0; color: #F5F2EB; font-size: 1.25rem;">Mesa ${i}</h4>
        </div>
        
        <div style="background-color: #fff; padding: 10px; border-radius: 8px; margin: 12px 0;">
          <img src="${qrImageApi}" alt="QR Mesa ${i}" style="width: 140px; height: 140px; display: block;">
        </div>

        <a href="${tableUrl}" target="_blank" class="btn" style="font-size: 0.75rem; color: var(--accent-olive); text-decoration: underline; word-break: break-all;">Probador Mesa ${i} ↗</a>
      </div>
    `;
  }

  container.innerHTML = html;
  modal.style.display = 'flex';
};

window.closeQrModal = function() {
  const modal = document.getElementById('qr-modal-backdrop');
  if (modal) modal.style.display = 'none';
};

window.printQrGrid = function() {
  const container = document.getElementById('qr-grid-container');
  if (!container) return;
  const printWin = window.open('', '_blank');
  printWin.document.write(`
    <html>
      <head>
        <title>QRs Mesas - Maia Espresso</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 20px; color: #000; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .card { border: 2px solid #000; border-radius: 12px; padding: 16px; margin-bottom: 10px; page-break-inside: avoid; }
          h2 { margin: 5px 0; font-size: 1.5rem; }
          p { font-size: 0.85rem; margin-top: 4px; }
          img { width: 160px; height: 160px; }
        </style>
      </head>
      <body>
        <h1>☕ MAIA ESPRESSO • CÓDIGOS QR MESAS 1 AL 11</h1>
        <p>Coloca cada QR en su mesa correspondiente para pedidos en directo a cocina.</p>
        <div class="grid">${container.innerHTML}</div>
        <script>setTimeout(() => { window.print(); window.close(); }, 500);<\/script>
      </body>
    </html>
  `);
  printWin.document.close();
};

// --- KDS SECURITY PIN PROTECTION ---
const KDS_PIN = '2525';

window.verifyKdsPin = function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('kds-pin-input');
  const errorMsg = document.getElementById('kds-pin-error');
  if (!input) return;

  if (input.value.trim() === KDS_PIN) {
    sessionStorage.setItem('maia_kds_authenticated', 'true');
    const authModal = document.getElementById('kds-auth-modal');
    if (authModal) authModal.style.display = 'none';
    document.getElementById('kds-view').style.display = 'block';
    input.value = '';
    if (errorMsg) errorMsg.style.display = 'none';
    initKds();
  } else {
    if (errorMsg) {
      errorMsg.textContent = '❌ PIN Incorrecto. Inténtalo de nuevo.';
      errorMsg.style.display = 'block';
    }
    input.value = '';
    input.focus();
  }
};

window.lockKds = function() {
  sessionStorage.removeItem('maia_kds_authenticated');
  document.getElementById('kds-view').style.display = 'none';
  const authModal = document.getElementById('kds-auth-modal');
  if (authModal) authModal.style.display = 'flex';
};

// --- FULL DIGITAL MENU ("ENTRE SORBOS Y BOCADOS") ---
// --- FULL DIGITAL MENU ("ENTRE SORBOS Y BOCADOS") ---
window.openFullDigitalMenu = function() {
  const modal = document.getElementById('full-menu-modal');
  if (modal) {
    renderFullDigitalMenu();
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeFullDigitalMenu = function() {
  const modal = document.getElementById('full-menu-modal');
  if (modal) {
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function initFullDigitalMenu() {
  const openBtn = document.getElementById('btn-open-full-menu');
  const closeBtn = document.getElementById('close-full-menu-btn');
  const modal = document.getElementById('full-menu-modal');
  const viewCartBtn = document.getElementById('full-menu-view-cart-btn');

  if (openBtn) {
    openBtn.onclick = (e) => {
      if (e) e.preventDefault();
      window.openFullDigitalMenu();
    };
  }

  if (closeBtn) {
    closeBtn.onclick = (e) => {
      if (e) e.preventDefault();
      window.closeFullDigitalMenu();
    };
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeFullDigitalMenu();
      }
    });
  }

  if (viewCartBtn) {
    viewCartBtn.onclick = (e) => {
      if (e) e.preventDefault();
      window.closeFullDigitalMenu();
      const tableCartBtn = document.getElementById('btn-table-cart');
      if (tableCartBtn) {
        tableCartBtn.click();
      }
    };
  }
}

window.closeNoQrModal = function() {
  const modal = document.getElementById('no-qr-modal-backdrop');
  if (modal) modal.style.display = 'none';
};

window.quickAddFromFullMenu = function(productId) {
  if (!mesaNumber) {
    const modal = document.getElementById('no-qr-modal-backdrop');
    if (modal) modal.style.display = 'flex';
    return;
  }

  const prodList = (typeof PRODUCTS !== 'undefined' && PRODUCTS.length) ? PRODUCTS : (typeof DEFAULT_PRODUCTS !== 'undefined' ? DEFAULT_PRODUCTS : []);
  const prod = prodList.find(p => p.id === productId);
  if (!prod) return;
  
  if (typeof addToCart === 'function') {
    addToCart(productId, 1, false);
  }
  
  // Update cart count badge in full menu footer
  const countSpan = document.getElementById('full-menu-cart-count');
  if (countSpan && typeof cart !== 'undefined') {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    countSpan.textContent = totalItems;
  }
  
  if (typeof showToast === 'function') {
    showToast(`✨ ¡1x ${prod.name} añadido a tu pedido!`);
  }
};

function renderFullDigitalMenu() {
  const modal = document.getElementById('full-menu-modal');
  if (!modal) return;

  const catClasicos = document.getElementById('full-menu-cat-clasicos');
  const catBocadillos = document.getElementById('full-menu-cat-bocadillos');
  const catAdemas = document.getElementById('full-menu-cat-ademas');
  const catCalientes = document.getElementById('full-menu-cat-calientes');
  const catFrias = document.getElementById('full-menu-cat-frias');

  if (!catClasicos || !catBocadillos || !catAdemas || !catCalientes || !catFrias) return;

  catClasicos.innerHTML = '';
  catBocadillos.innerHTML = '';
  catAdemas.innerHTML = '';
  catCalientes.innerHTML = '';
  catFrias.innerHTML = '';

  // Update cart count in footer
  const countSpan = document.getElementById('full-menu-cart-count');
  if (countSpan && typeof cart !== 'undefined') {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    countSpan.textContent = totalItems;
  }

  let activeProducts = [];
  try {
    const stored = localStorage.getItem('maia_active_products');
    if (stored) activeProducts = JSON.parse(stored);
  } catch(e) {}

  if (!activeProducts || !Array.isArray(activeProducts) || activeProducts.length === 0) {
    activeProducts = (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS) && PRODUCTS.length > 0) ? PRODUCTS : DEFAULT_PRODUCTS;
  }

  activeProducts.forEach(prod => {
    const isOut = (typeof outOfStockItems !== 'undefined' && Array.isArray(outOfStockItems)) ? outOfStockItems.includes(prod.id) : false;
    const row = document.createElement('div');
    row.className = `full-menu-item-row ${isOut ? 'out-of-stock' : ''}`;

    let priceDisplay = `${Number(prod.price || 0).toFixed(2).replace('.', ',')}€`;
    if (prod.id.includes('bocadillo') || prod.id.includes('classic') || prod.id.includes('islas') || prod.id.includes('mechada')) {
      if (prod.id === 'bocadillo-classic') priceDisplay = '2,90€ / 4,90€';
      else if (prod.id === 'bocadillo-chef') priceDisplay = '3,20€ / 5,80€';
      else if (prod.id === 'bocadillo-pollomiel') priceDisplay = '3,10€ / 5,50€';
      else if (prod.id === 'bocadillo-islas') priceDisplay = '3,00€ / 5,10€';
      else if (prod.id === 'bocadillo-mechada') priceDisplay = '3,20€ / 5,80€';
    } else if (prod.id === 'zumo-naranja') {
      priceDisplay = '2,40€ / 3,60€';
    }

    row.innerHTML = `
      <div class="full-menu-item-info">
        <h5 class="full-menu-item-name">
          ${prod.name}
          ${isOut ? '<span class="badge-agotado">Agotado</span>' : ''}
        </h5>
        ${prod.desc ? `<p class="full-menu-item-desc">${prod.desc}</p>` : ''}
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="full-menu-item-price">${priceDisplay}</span>
        ${!isOut ? `<button onclick="event.stopPropagation(); window.quickAddFromFullMenu('${prod.id}')" style="background: var(--accent-rust); color: #fff; border: none; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; cursor: pointer; font-size: 1.1rem; box-shadow: var(--shadow-sm);" title="Añadir a mi pedido">+</button>` : ''}
      </div>
    `;

    if (prod.tags && prod.tags.includes('Clásicos de la Mañana')) {
      catClasicos.appendChild(row);
    } else if (prod.category === 'bocadillos' || (prod.tags && prod.tags.includes('Bocadillos & Pulgas'))) {
      catBocadillos.appendChild(row);
    } else if (prod.tags && prod.tags.includes('Además...')) {
      catAdemas.appendChild(row);
    } else if (prod.category === 'bebidas-calientes') {
      catCalientes.appendChild(row);
    } else if (prod.category === 'bebidas-frias') {
      catFrias.appendChild(row);
    } else if (prod.category === 'dulces') {
      catAdemas.appendChild(row);
    } else {
      catClasicos.appendChild(row);
    }
  });
}

function checkTableSessionStatus() {
  const currentClientMesa = String(mesaNumber || localStorage.getItem('maia_qr_mesa') || '');
  if (!currentClientMesa) return;

  // 1. Check auto-expire after 5 hours
  const storedTime = parseInt(localStorage.getItem('maia_qr_time') || '0', 10);
  const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
  if (storedTime && (Date.now() - storedTime > FIVE_HOURS_MS)) {
    clearTableSession('✨ Tu sesión de mesa ha finalizado automáticamente tras 5 horas. ¡Gracias por visitar Maia Espresso!');
    return;
  }

  // 2. Query Supabase database to verify if all orders for this mesa are billed
  if (supabaseClient) {
    supabaseClient
      .from('maia_orders')
      .select('id, status')
      .eq('mesa', currentClientMesa)
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          const hasActiveOrders = data.some(o => o.status !== 'billed');
          if (!hasActiveOrders) {
            clearTableSession('✨ Tu mesa ha sido liberada por la cocina. ¡Gracias por tu visita!');
          }
        }
      })
      .catch(err => console.error('Error verificando estado de mesa:', err));
  }
}

function clearTableSession(msg) {
  if (!mesaNumber && !localStorage.getItem('maia_qr_mesa')) return;
  mesaNumber = null;
  localStorage.removeItem('maia_qr_mesa');
  localStorage.removeItem('maia_qr_time');
  
  const badge = document.getElementById('mesa-badge');
  if (badge) badge.style.display = 'none';

  const checkoutBtn = document.getElementById('btn-checkout');
  if (checkoutBtn) checkoutBtn.textContent = 'Enviar Pedido por WhatsApp';

  if (window.history.replaceState) {
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }

  cart = [];
  updateCartUI();

  if (msg) {
    showToast(msg);
  }
}

