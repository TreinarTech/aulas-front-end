/* FlashDelivery - Single JS to handle Cliente, Empresa, Cozinha */
(function () {
  const PAGE = document.body.dataset.page || '';
  const KEY_ORDERS = 'flash_orders';
  const KEY_CART = 'flash_cart';
  const KEY_CUSTOMER_NAME = 'flash_customer_name';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function uid() { return 'FD' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7).toUpperCase(); }
  function money(n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function nowISO() { return new Date().toISOString(); }

  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function getOrders() { return load(KEY_ORDERS, []); }
  function setOrders(orders) { save(KEY_ORDERS, orders); broadcast(); }
  function getCart() { return load(KEY_CART, []); }
  function setCart(items) { save(KEY_CART, items); updateCartCount(); }

  function broadcast() { // trigger storage listeners on other tabs/pages by touching a temp key
    localStorage.setItem('flash_ping', String(Math.random()));
  }

  const PRODUCTS = [
    { id: 'p1', name: 'Burger Clássico', price: 22.9, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop' },
    { id: 'p2', name: 'Pizza Margherita', price: 39.9, img: 'https://images.unsplash.com/photo-1548366086-7a88f2f46094?q=80&w=800&auto=format&fit=crop' },
    { id: 'p3', name: 'Sushi Combo', price: 49.9, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop' },
    { id: 'p4', name: 'Salada Caesar', price: 19.9, img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop' },
    { id: 'p5', name: 'Taco Mexicano', price: 16.9, img: 'https://images.unsplash.com/photo-1604467707321-70c2d16004e3?q=80&w=800&auto=format&fit=crop' },
    { id: 'p6', name: 'Açaí Bowl', price: 17.5, img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop' },
  ];

  // Minimal menu dataset per restaurant (categories, items with sizes/extras)
  const REST_MENUS = {
    r1: {
      categories: ['Burgers', 'Acompanhamentos', 'Bebidas'],
      items: [
        { id: 'b1', name: 'Cheeseburger', base: 22.9, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop', cat: 'Burgers', sizes: [
          { id: 's', label: 'Simples', add: 0 }, { id: 'd', label: 'Duplo', add: 7.0 }
        ], extras: [
          { id: 'ex1', label: 'Bacon', price: 4.5 }, { id: 'ex2', label: 'Cheddar extra', price: 3.5 }
        ]},
        { id: 'b2', name: 'Veggie Burger', base: 24.9, img: 'https://images.unsplash.com/photo-1606756790138-2614fd9073a1?q=80&w=800&auto=format&fit=crop', cat: 'Burgers', sizes: [
          { id: 's', label: 'Simples', add: 0 }, { id: 'd', label: 'Duplo', add: 6.0 }
        ], extras: [ { id: 'ex3', label: 'Picles', price: 2.0 } ]},
        { id: 'a1', name: 'Fritas', base: 12.9, img: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=800&auto=format&fit=crop', cat: 'Acompanhamentos', sizes: [
          { id: 'p', label: 'Pequena', add: 0 }, { id: 'g', label: 'Grande', add: 5.0 }
        ], extras: []},
        { id: 'd1', name: 'Refrigerante Lata', base: 6.9, img: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?q=80&w=800&auto=format&fit=crop', cat: 'Bebidas', sizes: [], extras: []},
      ]
    },
    r2: {
      categories: ['Pizzas', 'Bebidas'],
      items: [
        { id: 'p1', name: 'Margherita', base: 39.9, img: 'https://images.unsplash.com/photo-1548366086-7a88f2f46094?q=80&w=800&auto=format&fit=crop', cat: 'Pizzas', sizes: [
          { id: '8', label: '8 fatias', add: 0 }, { id: '12', label: '12 fatias', add: 20 }
        ], extras: [ { id: 'borda', label: 'Borda recheada', price: 8.0 } ]},
        { id: 'p2', name: 'Calabresa', base: 42.9, img: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80&w=800&auto=format&fit=crop', cat: 'Pizzas', sizes: [
          { id: '8', label: '8 fatias', add: 0 }, { id: '12', label: '12 fatias', add: 20 }
        ], extras: []},
      ]
    }
  };

  // Categories and Restaurants (mock)
  const CATEGORIES = [
    { id: 'c1', name: 'Hambúrguer', icon: 'fa-burger' },
    { id: 'c2', name: 'Pizza', icon: 'fa-pizza-slice' },
    { id: 'c3', name: 'Japonês', icon: 'fa-fish' },
    { id: 'c4', name: 'Saudável', icon: 'fa-leaf' },
    { id: 'c5', name: 'Mexicano', icon: 'fa-pepper-hot' },
    { id: 'c6', name: 'Açaí', icon: 'fa-ice-cream' },
  ];

  const RESTAURANTS = [
    { id: 'r1', name: 'Burger House', rating: 4.7, categories: ['c1'], eta: 25, featured: true, coverImg: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop' },
    { id: 'r2', name: 'La Pizzeria', rating: 4.6, categories: ['c2'], eta: 30, featured: true, coverImg: 'https://images.unsplash.com/photo-1548366086-7a88f2f46094?q=80&w=1000&auto=format&fit=crop' },
    { id: 'r3', name: 'Sushi Zen', rating: 4.8, categories: ['c3'], eta: 35, featured: false, coverImg: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1000&auto=format&fit=crop' },
    { id: 'r4', name: 'Verde Vivo', rating: 4.5, categories: ['c4'], eta: 22, featured: false, coverImg: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop' },
    { id: 'r5', name: 'Casa Mexicana', rating: 4.4, categories: ['c5'], eta: 28, featured: false, coverImg: 'https://images.unsplash.com/photo-1604467707321-70c2d16004e3?q=80&w=1000&auto=format&fit=crop' },
    { id: 'r6', name: 'Açaí do Vale', rating: 4.3, categories: ['c6'], eta: 18, featured: false, coverImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop' },
  ];

  // Promo banners and coupons (mock)
  const PROMOS = [
    { id: 'pr1', img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1200&auto=format&fit=crop', label: '30% OFF' },
    { id: 'pr2', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop', label: 'Frete grátis' },
    { id: 'pr3', img: 'https://images.unsplash.com/photo-1504674900247-55b1844b7fba?q=80&w=1200&auto=format&fit=crop', label: 'Combo do dia' },
  ];
  const COUPONS = [
    { id: 'cp1', code: 'FLASH10', desc: '10% OFF hoje' },
    { id: 'cp2', code: 'FRETEGRATIS', desc: 'Entrega grátis' },
    { id: 'cp3', code: 'BURGER15', desc: '15% em burgers' },
  ];

  /* Toast */
  let toastInstance = null;
  function showToast(msg, type = 'primary') {
    const toastEl = $('#liveToast');
    if (!toastEl) return alert(msg);
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    $('#toast-body').textContent = msg;
    toastInstance = toastInstance || new bootstrap.Toast(toastEl, { delay: 2500 });
    toastInstance.show();
  }

  /* Status helpers */
  const STATUS_LABEL = {
    criado: 'Criado',
    confirmado: 'Confirmado',
    enviado_cozinha: 'Enviado à Cozinha',
    em_preparo: 'Em Preparo',
    pronto: 'Pronto',
    em_entrega: 'Em Entrega',
    entregue: 'Entregue',
    cancelado: 'Cancelado',
  };

  function setStatus(order, status) {
    order.status = status;
    const at = nowISO();
    order.timeline.push({ status, at });
    if (status === 'em_entrega' && !order.deliveryStartAt) {
      order.deliveryStartAt = at;
    }
    // Assign a mock destination when moving to delivery if not present
    if (status === 'em_entrega' && !order.dest) {
      order.dest = randomDestinationNear(BASE_CITY.lat, BASE_CITY.lng);
    }
  }

  /* Cliente Page */
  function renderCategories(list = CATEGORIES) {
    const root = document.getElementById('categories');
    if (!root) return;
    root.innerHTML = list.map(c => `
      <button class="fd-chip" data-cat="${c.id}" type="button">
        <i class="fa-solid ${c.icon}"></i><span>${c.name}</span>
      </button>
    `).join('');
    // filter restaurants by category
    $$('#categories [data-cat]').forEach(b => b.addEventListener('click', () => {
      const cat = b.dataset.cat;
      renderRestaurants(RESTAURANTS.filter(r => r.categories.includes(cat)));
      document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
    }));
  }

  function renderFeatured() {
    const root = document.getElementById('featured');
    if (!root) return;
    const featured = RESTAURANTS.filter(r => r.featured);
    root.innerHTML = featured.map(r => cardRestaurant(r)).join('');
  }

  function renderPromos() {
    const root = document.getElementById('promo-banners');
    if (!root) return;
    root.innerHTML = PROMOS.map(p => `
      <a href="#restaurants" class="fd-banner" data-promo="${p.id}">
        <img src="${p.img}" alt="${p.label}" loading="lazy" decoding="async">
        <span class="fd-badge">${p.label}</span>
      </a>
    `).join('');
  }

  function renderCoupons() {
    const root = document.getElementById('coupon-list');
    if (!root) return;
    root.innerHTML = COUPONS.map(c => `
      <button class="fd-coupon" type="button" data-coupon="${c.id}"><i class="fa-solid fa-ticket"></i> ${c.code} <small>• ${c.desc}</small></button>
    `).join('');
    // Copy to clipboard simulation
    $$('#coupon-list [data-coupon]').forEach(b => b.addEventListener('click', ()=>{
      try { navigator.clipboard?.writeText(b.textContent.trim()); } catch {}
      showToast('Cupom copiado!', 'success');
    }));
  }

  function renderFavorites() {
    const root = document.getElementById('favorites-list');
    if (!root) return;
    const favs = RESTAURANTS.filter(r => r.rating >= 4.6).slice(0, 4);
    root.innerHTML = favs.map(r => cardRestaurant(r)).join('') || `<div class="col-12"><div class="empty-state">Sem favoritos ainda.</div></div>`;
  }

  function cardRestaurant(r){
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          <img src="${r.coverImg}" class="card-img-top" alt="${r.name}" loading="lazy" decoding="async">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
              <h5 class="card-title mb-0">${r.name}</h5>
              <span class="badge text-bg-warning"><i class="fa-solid fa-star me-1"></i>${r.rating.toFixed(1)}</span>
            </div>
            <small class="text-secondary mb-2"><i class="fa-regular fa-clock me-1"></i>${r.eta}–${r.eta+10} min</small>
            <div class="mt-auto d-grid">
              <a href="#restaurants" class="btn btn-outline-primary" data-open-restaurant="${r.id}"><i class="fa-solid fa-utensils me-1"></i>Ver Cardápio</a>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderRestaurants(list = RESTAURANTS){
    const root = document.getElementById('restaurants-list');
    if (!root) return;
    if (!list.length){
      root.innerHTML = `<div class="col-12"><div class="empty-state">Nenhum restaurante encontrado.</div></div>`;
      return;
    }
    root.innerHTML = list.map(r => cardRestaurant(r)).join('');
    // bind open restaurant
    $$('#restaurants-list [data-open-restaurant], #featured [data-open-restaurant]')
      .forEach(a => a.addEventListener('click', (e)=>{
        e.preventDefault();
        const rid = a.getAttribute('data-open-restaurant');
        openRestaurant(rid);
      }));
  }

  // Restaurant detail rendering
  let currentRestaurant = null;
  function openRestaurant(rid){
    const r = RESTAURANTS.find(x=>x.id===rid);
    if (!r) return;
    currentRestaurant = r;
    const detail = $('#restaurant-detail');
    if (!detail) return;
    // hide home sections
    $('#home')?.classList.add('d-none');
    $('#restaurants')?.classList.add('d-none');
    detail.classList.remove('d-none');
    // header
    $('#restaurant-cover').src = r.coverImg;
    $('#restaurant-name').textContent = r.name;
    $('#restaurant-rating').textContent = `${r.rating.toFixed(1)} • ${r.eta}-${r.eta+10} min`;
    $('#restaurant-eta').textContent = `${r.eta}-${r.eta+10} min`;
    // cats
    const menu = REST_MENUS[r.id] || REST_MENUS['r1'];
    const cats = menu.categories || Array.from(new Set(menu.items.map(i=>i.cat)));
    $('#rest-cats').innerHTML = cats.map((c,idx)=>`<li class="nav-item"><button class="nav-link ${idx===0?'active':''}" data-cat="${c}">${c}</button></li>`).join('');
    // items
    renderRestItems(menu.items, cats[0]);
    $$('#rest-cats .nav-link').forEach(b=> b.addEventListener('click', ()=>{
      $$('#rest-cats .nav-link').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      renderRestItems(menu.items, b.textContent);
    }));
    $('#btn-back-home')?.addEventListener('click', backToHome, { once:true });
    document.getElementById('restaurant-detail')?.scrollIntoView({ behavior:'smooth' });
  }

  function backToHome(){
    $('#restaurant-detail')?.classList.add('d-none');
    $('#home')?.classList.remove('d-none');
    $('#restaurants')?.classList.remove('d-none');
    currentRestaurant = null;
  }

  function restItemCard(item){
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          <img src="${item.img}" class="card-img-top" alt="${item.name}" loading="lazy" decoding="async">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name}</h5>
            <small class="text-secondary mb-2">a partir de ${money(item.base)}</small>
            <div class="mt-auto d-grid">
              <button class="btn btn-primary" data-item="${item.id}"><i class="fa-solid fa-plus me-1"></i>Adicionar</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderRestItems(items, category){
    const root = $('#rest-items');
    if (!root) return;
    const list = items.filter(i => !category || i.cat === category);
    root.innerHTML = list.map(restItemCard).join('') || `<div class="col-12"><div class="empty-state">Sem itens.</div></div>`;
    $$('#rest-items [data-item]').forEach(b => b.addEventListener('click', ()=> openItemModal(b.dataset.item)));
  }

  // Item Modal
  let modalRef = null;
  let modalState = { item:null, size:null, extras:new Set(), qty:1 };
  function openItemModal(itemId){
    if (!currentRestaurant) return;
    const menu = REST_MENUS[currentRestaurant.id] || { items: [] };
    const item = menu.items.find(i=>i.id===itemId);
    if (!item) return;
    modalState = { item, size: (item.sizes[0]||null), extras:new Set(), qty:1 };
    $('#modal-img').src = item.img;
    $('#modal-name').textContent = item.name;
    $('#modal-base').textContent = `Base ${money(item.base)}`;
    // sizes
    const sizesRoot = $('#modal-sizes');
    sizesRoot.innerHTML = item.sizes.length ? item.sizes.map(s=>`
      <label class="btn btn-outline-secondary">
        <input type="radio" name="size" value="${s.id}"> ${s.label} ${s.add?`(+${money(s.add)})`:''}
      </label>
    `).join('') : '<div class="text-secondary">Sem variações de tamanho</div>';
    if (item.sizes.length){ sizesRoot.querySelector('input')?.setAttribute('checked','checked'); }
    // extras
    const exRoot = $('#modal-extras');
    exRoot.innerHTML = item.extras.length ? item.extras.map(ex=>`
      <label class="btn btn-outline-secondary">
        <input type="checkbox" value="${ex.id}"> ${ex.label} (+${money(ex.price)})
      </label>
    `).join('') : '<div class="text-secondary">Sem adicionais</div>';
    // qty
    $('#modal-qty').value = '1';
    // bind
    $$('#modal-sizes input[name="size"]').forEach(r => r.addEventListener('change', ()=>{
      modalState.size = item.sizes.find(s=>s.id===r.value) || null;
      updateModalTotal();
    }));
    $$('#modal-extras input[type="checkbox"]').forEach(c => c.addEventListener('change', ()=>{
      if (c.checked) modalState.extras.add(c.value); else modalState.extras.delete(c.value);
      updateModalTotal();
    }));
    $('#modal-inc').onclick = ()=>{ modalState.qty++; $('#modal-qty').value = String(modalState.qty); updateModalTotal(); };
    $('#modal-dec').onclick = ()=>{ modalState.qty = Math.max(1, modalState.qty-1); $('#modal-qty').value = String(modalState.qty); updateModalTotal(); };
    $('#modal-add').onclick = addModalToCart;
    updateModalTotal();
    modalRef = modalRef || new bootstrap.Modal('#itemModal');
    modalRef.show();
  }

  function calcItemTotal(){
    const i = modalState.item; if (!i) return 0;
    const sizeAdd = modalState.size?.add || 0;
    const extrasAdd = (i.extras||[]).filter(ex=> modalState.extras.has(ex.id)).reduce((s,ex)=> s+ex.price, 0);
    return (i.base + sizeAdd) * modalState.qty + extrasAdd * modalState.qty;
  }
  function updateModalTotal(){ $('#modal-total').textContent = money(calcItemTotal()); }

  function addModalToCart(){
    if (!modalState.item || !currentRestaurant) return;
    // enforce single-restaurant cart
    const cart = getCart();
    const otherRestaurant = cart.find(i => i.restaurantId && i.restaurantId !== currentRestaurant.id);
    if (otherRestaurant && !confirm('Seu carrinho contém itens de outro restaurante. Limpar carrinho para continuar?')) {
      return;
    }
    if (otherRestaurant) { setCart([]); }
    const i = modalState.item;
    const sizeLabel = modalState.size ? ` • ${modalState.size.label}` : '';
    const extrasList = (i.extras||[]).filter(ex=> modalState.extras.has(ex.id)).map(ex=> ex.label).join(', ');
    const name = i.name + sizeLabel + (extrasList?` • ${extrasList}`:'');
    const unitPrice = i.base + (modalState.size?.add||0) + (i.extras||[]).filter(ex=> modalState.extras.has(ex.id)).reduce((s,ex)=>s+ex.price,0);
    // try to merge similar
    const key = `${currentRestaurant.id}:${i.id}:${modalState.size?.id||''}:${[...modalState.extras].sort().join(',')}`;
    const found = cart.find(ci => ci.key === key);
    if (found) found.qty += modalState.qty; else cart.push({ key, restaurantId: currentRestaurant.id, id: i.id, name, price: unitPrice, qty: modalState.qty });
    setCart(cart);
    renderCart(); updateCartCount();
    showToast(`${i.name} adicionado ao carrinho`, 'success');
    modalRef?.hide();
  }

  function setupSearchAutocomplete(){
    const inps = [document.getElementById('search'), document.getElementById('search-desktop')].filter(Boolean);
    const list = document.getElementById('search-list');
    if (!inps.length || !list) return;
    const options = [
      ...RESTAURANTS.map(r => ({ type:'rest', label:r.name })),
      ...PRODUCTS.map(p => ({ type:'prod', label:p.name }))
    ];
    list.innerHTML = options.map(o => `<option value="${o.label}"></option>`).join('');
    const handler = (e)=>{
      const q = (e.target.value||'').toLowerCase();
      if (!q){ renderRestaurants(RESTAURANTS); return; }
      const byName = RESTAURANTS.filter(r => r.name.toLowerCase().includes(q));
      const byCat = CATEGORIES.filter(c => c.name.toLowerCase().includes(q)).map(c=>c.id);
      const byCatRestaurants = RESTAURANTS.filter(r => r.categories.some(id=>byCat.includes(id)));
      const listRes = [...new Set([...byName, ...byCatRestaurants])];
      renderRestaurants(listRes);
    };
    inps.forEach(inp => inp.addEventListener('input', handler));
  }

  function renderMenu(list) {
    const menu = $('#menu');
    if (!menu) return;
    const items = (list || PRODUCTS).map(p => `
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card card-product h-100">
          <img src="${p.img}" class="card-img-top" alt="${p.name}" loading="lazy" decoding="async" sizes="(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.name}</h5>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <strong class="text-primary">${money(p.price)}</strong>
              <button class="btn btn-sm btn-primary" data-add="${p.id}"><i class="fa-solid fa-plus me-1"></i>Adicionar</button>
            </div>
          </div>
        </div>
      </div>`).join('');
    menu.innerHTML = items || `<div class="empty-state w-100">Nenhum item encontrado.</div>`;
    $$('#menu [data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add)));
  }

  function addToCart(pid) {
    const cart = getCart();
    const prod = PRODUCTS.find(p => p.id === pid);
    if (!prod) return;
    const found = cart.find(i => i.id === pid);
    if (found) found.qty += 1; else cart.push({ id: pid, name: prod.name, price: prod.price, qty: 1 });
    setCart(cart);
    showToast(`${prod.name} adicionado ao carrinho`);
    renderCart();
  }

  function updateCartCount() {
    const count = getCart().reduce((s, i) => s + i.qty, 0);
    const badge = $('#cart-count');
    if (badge) badge.textContent = String(count);
  }

  function renderCart() {
    const container = $('#cart-list');
    if (!container) return;
    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = `<div class="empty-state">Seu carrinho está vazio</div>`;
      $('#cart-subtotal').textContent = money(0);
      return;
    }
    container.innerHTML = cart.map((i, idx) => `
      <div class="d-flex align-items-center justify-content-between mb-2">
        <div>
          <div class="fw-semibold">${i.name}</div>
          <small class="text-secondary">${money(i.price)}</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="btn-group btn-group-sm item-qty" role="group">
            <button class="btn btn-outline-secondary" data-dec="${idx}"><i class="fa-solid fa-minus"></i></button>
            <button class="btn btn-outline-secondary disabled">${i.qty}</button>
            <button class="btn btn-outline-secondary" data-inc="${idx}"><i class="fa-solid fa-plus"></i></button>
          </div>
          <button class="btn btn-sm btn-outline-danger" data-del="${idx}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`).join('');
    const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
    $('#cart-subtotal').textContent = money(subtotal);

    $$('#cart-list [data-inc]').forEach(b => b.addEventListener('click', () => { const c = getCart(); c[b.dataset.inc].qty++; setCart(c); renderCart(); }));
    $$('#cart-list [data-dec]').forEach(b => b.addEventListener('click', () => { const c = getCart(); c[b.dataset.dec].qty--; if (c[b.dataset.dec].qty<=0) c.splice(b.dataset.dec,1); setCart(c); renderCart(); }));
    $$('#cart-list [data-del]').forEach(b => b.addEventListener('click', () => { const c = getCart(); c.splice(b.dataset.del,1); setCart(c); renderCart(); }));
  }

  function setupCheckout() {
    const form = $('#checkout-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const cart = getCart();
      if (cart.length === 0) return showToast('Carrinho vazio', 'danger');
      const name = $('#customer-name').value.trim();
      const address = $('#customer-address').value.trim();
      const payment = $('#payment-method').value;
      if (!name || !address || !payment) return showToast('Preencha seus dados', 'warning');

      const order = {
        id: uid(),
        items: cart,
        total: cart.reduce((s,i)=>s+i.qty*i.price,0),
        customer: { name, address, payment },
        status: 'criado',
        timeline: [{ status: 'criado', at: nowISO() }],
        createdAt: nowISO(),
      };
      const orders = getOrders();
      orders.unshift(order);
      setOrders(orders);
      // Persist customer name for notification on client page
      try { localStorage.setItem(KEY_CUSTOMER_NAME, name); } catch {}
      setCart([]);
      renderCart();
      updateCartCount();
      showToast(`Pedido ${order.id} criado!`, 'success');
    });
  }

  /* Empresa Page */
  function renderOrders(filter = '') {
    const list = $('#orders-list');
    if (!list) return;
    const orders = getOrders().filter(o => !filter || o.status === filter);
    if (orders.length === 0) {
      list.innerHTML = `<div class="col-12"><div class="empty-state">Nenhum pedido.</div></div>`;
      return;
    }
    list.innerHTML = orders.map(o => `
      <div class="col-12 col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <div class="fw-bold">#${o.id}</div>
                <small class="text-secondary">${o.customer.name} • ${o.customer.address}</small>
              </div>
              <span class="badge badge-status" data-status="${o.status}">${STATUS_LABEL[o.status]}</span>
            </div>
            <ul class="mt-2 small text-secondary mb-3">
              ${o.items.map(i=>`<li>${i.qty}x ${i.name}</li>`).join('')}
            </ul>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <strong>${money(o.total)}</strong>
              <div class="btn-group">
                ${o.status==='criado'?`<button class="btn btn-sm btn-outline-primary" data-act="confirmar" data-id="${o.id}"><i class="fa-solid fa-check"></i></button>`:''}
                ${o.status==='confirmado'?`<button class="btn btn-sm btn-outline-success" data-act="enviar_cozinha" data-id="${o.id}"><i class="fa-solid fa-paper-plane"></i></button>`:''}
                ${(o.status==='confirmado'||o.status==='criado')?`<button class="btn btn-sm btn-outline-danger" data-act="cancelar" data-id="${o.id}"><i class="fa-solid fa-xmark"></i></button>`:''}
                ${o.status==='pronto'?`<button class="btn btn-sm btn-outline-info" data-act="em_entrega" data-id="${o.id}"><i class="fa-solid fa-truck"></i></button>`:''}
                ${o.status==='em_entrega'?`<button class="btn btn-sm btn-outline-success" data-act="entregue" data-id="${o.id}"><i class="fa-solid fa-flag-checkered"></i></button>`:''}
              </div>
            </div>
          </div>
        </div>
      </div>`).join('');

    $$('#orders-list [data-act]').forEach(b => b.addEventListener('click', () => handleOrderAction(b.dataset.id, b.dataset.act)));
  }

  function handleOrderAction(id, action) {
    const orders = getOrders();
    const o = orders.find(x => x.id === id);
    if (!o) return;
    const prev = o.status;
    const transitions = {
      confirmar: () => setStatus(o, 'confirmado'),
      enviar_cozinha: () => setStatus(o, 'enviado_cozinha'),
      cancelar: () => setStatus(o, 'cancelado'),
      em_entrega: () => setStatus(o, 'em_entrega'),
      entregue: () => setStatus(o, 'entregue'),
    };
    transitions[action]?.();
    setOrders(orders);
    showToast(`Pedido ${o.id}: ${STATUS_LABEL[prev]} → ${STATUS_LABEL[o.status]}`, 'primary');
    renderOrders($('#filter-status')?.value||'');
  }

  /* Cozinha Page */
  function renderKitchen(filter='') {
    const list = $('#kitchen-list');
    if (!list) return;
    const orders = getOrders().filter(o => ['enviado_cozinha','em_preparo','pronto'].includes(o.status)).filter(o=>!filter||o.status===filter);
    if (orders.length === 0) {
      list.innerHTML = `<div class="col-12"><div class="empty-state">Sem pedidos na cozinha.</div></div>`;
      return;
    }
    list.innerHTML = orders.map(o=>`
      <div class="col-12 col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <div class="fw-bold">#${o.id}</div>
                <small class="text-secondary">${o.customer.name}</small>
              </div>
              <span class="badge badge-status" data-status="${o.status}">${STATUS_LABEL[o.status]}</span>
            </div>
            <ul class="mt-2 small text-secondary mb-3">
              ${o.items.map(i=>`<li>${i.qty}x ${i.name}</li>`).join('')}
            </ul>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <strong>${money(o.total)}</strong>
              <div class="btn-group">
                ${o.status==='enviado_cozinha'?`<button class="btn btn-sm btn-outline-warning" data-kact="preparar" data-id="${o.id}"><i class="fa-solid fa-fire-burner"></i></button>`:''}
                ${o.status==='em_preparo'?`<button class="btn btn-sm btn-outline-success" data-kact="pronto" data-id="${o.id}"><i class="fa-solid fa-bell"></i></button>`:''}
                ${o.status==='pronto'?`
                  <button class="btn btn-sm btn-outline-secondary" disabled><i class="fa-regular fa-circle-check"></i></button>
                  <button class="btn btn-sm btn-outline-info" data-kact="chamar_entregador" data-id="${o.id}"><i class="fa-solid fa-motorcycle"></i></button>
                `:''}
              </div>
            </div>
          </div>
        </div>
      </div>`).join('');

    $$('#kitchen-list [data-kact]').forEach(b => b.addEventListener('click', () => handleKitchenAction(b.dataset.id, b.dataset.kact)));
  }
  function handleKitchenAction(id, action) {
    const orders = getOrders();
    const o = orders.find(x => x.id === id);
    if (!o) return;
    const prev = o.status;
    if (action==='preparar') setStatus(o, 'em_preparo');
    if (action==='pronto') setStatus(o, 'pronto');
    if (action==='chamar_entregador') setStatus(o, 'em_entrega');
    setOrders(orders);
    showToast(`Pedido ${o.id}: ${STATUS_LABEL[prev]} → ${STATUS_LABEL[o.status]}`, 'primary');
    renderKitchen($('#filter-kitchen')?.value||'');
  }

  /* Sync across tabs */
  window.addEventListener('storage', (e) => {
    if (e.key === KEY_ORDERS || e.key === 'flash_ping') {
      if (PAGE === 'empresa') renderOrders($('#filter-status')?.value||'');
      if (PAGE === 'cozinha') renderKitchen($('#filter-kitchen')?.value||'');
      if (PAGE === 'motoboy') { renderMotoboy(); updateDeliveryMarkers(); }
      if (PAGE === 'cliente') maybeNotifyDeliveryForCustomer();
    }
    if (e.key === KEY_CART || e.key === 'flash_ping') {
      if (PAGE === 'cliente') { updateCartCount(); renderCart(); }
    }
  });

  /* Client notification when order goes to delivery */
  function maybeNotifyDeliveryForCustomer() {
    try {
      const name = localStorage.getItem(KEY_CUSTOMER_NAME);
      if (!name) return;
      const orders = getOrders().filter(o => (o.customer?.name||'').toLowerCase() === name.toLowerCase());
      if (!orders.length) return;
      const latest = orders[0];
      if (latest.status === 'em_entrega') {
        const flagKey = 'flash_notif_' + latest.id;
        if (!localStorage.getItem(flagKey)) {
          showToast(`Seu pedido #${latest.id} foi enviado para entrega!`, 'info');
          localStorage.setItem(flagKey, '1');
        }
      }
    } catch {}
  }

  /* Motoboy Page */
  const BASE_CITY = { lat: -23.55052, lng: -46.633308 }; // São Paulo
  function randomDestinationNear(lat, lng) {
    const d = () => (Math.random() - 0.5) * 0.08; // ~ small delta ~ few km
    return { lat: lat + d(), lng: lng + d() };
  }

  // Leaflet map state
  let motoboyTimer = null;
  let deliveryMap = null;
  const orderMarkers = new Map();

  function initDeliveryMap() {
    const el = document.getElementById('map');
    if (!el || typeof L === 'undefined') return;
    if (deliveryMap) return;
    deliveryMap = L.map('map');
    deliveryMap.setView([BASE_CITY.lat, BASE_CITY.lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(deliveryMap);
    updateDeliveryMarkers();
  }

  function updateDeliveryMarkers() {
    if (!deliveryMap) return;
    const orders = getOrders();
    const showIds = new Set();
    orders.forEach(o => {
      if (o.status !== 'em_entrega') return;
      if (!o.dest) o.dest = randomDestinationNear(BASE_CITY.lat, BASE_CITY.lng);
      showIds.add(o.id);
      let m = orderMarkers.get(o.id);
      const latlng = [o.dest.lat, o.dest.lng];
      const popup = `#${o.id} • ${o.customer?.address || ''}`;
      if (!m) {
        m = L.marker(latlng).addTo(deliveryMap).bindPopup(popup);
        orderMarkers.set(o.id, m);
      } else {
        m.setLatLng(latlng);
        m.getPopup()?.setContent(popup);
      }
    });
    // remove markers for orders no longer in delivery
    for (const [id, marker] of orderMarkers) {
      if (!showIds.has(id)) {
        try { deliveryMap.removeLayer(marker); } catch {}
        orderMarkers.delete(id);
      }
    }
    // fit bounds initially
    const markers = Array.from(orderMarkers.values());
    if (markers.length) {
      const group = L.featureGroup(markers);
      try { deliveryMap.fitBounds(group.getBounds().pad(0.2)); } catch {}
    }
  }

  function focusOrderOnMap(id) {
    if (!deliveryMap) return;
    const m = orderMarkers.get(id);
    if (!m) return;
    const ll = m.getLatLng();
    deliveryMap.setView(ll, 15, { animate: true });
    m.openPopup();
  }
  function renderMotoboy() {
    const root = document.getElementById('motoboy-list');
    if (!root) return;
    const orders = getOrders().filter(o => o.status === 'em_entrega');
    if (!orders.length) {
      root.innerHTML = `<div class="empty-state">Sem pedidos em entrega.</div>`;
      if (motoboyTimer) clearInterval(motoboyTimer);
      return;
    }
    root.innerHTML = orders.map(o => `
      <div class="col-12 col-md-6">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <div class="fw-bold">#${o.id}</div>
                <small class="text-secondary">${o.customer.name} • ${o.customer.address}</small>
              </div>
              <span class="badge badge-status" data-status="${o.status}">${STATUS_LABEL[o.status]}</span>
            </div>
            <ul class="mt-2 small text-secondary mb-3">
              ${o.items.map(i=>`<li>${i.qty}x ${i.name}</li>`).join('')}
            </ul>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <div class="text-secondary"><i class="fa-regular fa-clock me-1"></i><span data-elapsed="${o.id}">--:--</span></div>
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-primary" title="Ver no mapa" data-locate="${o.id}"><i class="fa-solid fa-location-dot"></i></button>
                <button class="btn btn-sm btn-outline-success" data-mbact="entregue" data-id="${o.id}"><i class="fa-solid fa-flag-checkered"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>`).join('');

    // bind actions
    $$('#motoboy-list [data-locate]').forEach(b => b.addEventListener('click', () => focusOrderOnMap(b.dataset.locate)));
    $$('#motoboy-list [data-mbact="entregue"]').forEach(b => b.addEventListener('click', () => {
      const orders = getOrders();
      const o = orders.find(x => x.id === b.dataset.id);
      if (!o) return;
      const prev = o.status;
      setStatus(o, 'entregue');
      setOrders(orders);
      showToast(`Pedido ${o.id}: ${STATUS_LABEL[prev]} → ${STATUS_LABEL[o.status]}`, 'success');
      renderMotoboy();
      updateDeliveryMarkers();
    }));

    // setup timers
    if (motoboyTimer) clearInterval(motoboyTimer);
    function updateElapsed() {
      const now = Date.now();
      orders.forEach(o => {
        const el = document.querySelector(`[data-elapsed="${o.id}"]`);
        if (!el) return;
        const start = o.deliveryStartAt ? new Date(o.deliveryStartAt).getTime() : now;
        const diff = Math.max(0, now - start);
        el.textContent = fmtElapsed(diff);
      });
    }
    updateElapsed();
    motoboyTimer = setInterval(updateElapsed, 1000);
    // refresh markers listing
    updateDeliveryMarkers();
  }

  function fmtElapsed(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
  }

  /* Init per page */
  document.addEventListener('DOMContentLoaded', () => {
    if (PAGE === 'cliente') {
      // Home sections
      renderCategories();
      renderFeatured();
      renderPromos();
      renderCoupons();
      renderFavorites();
      renderRestaurants(RESTAURANTS);
      setupSearchAutocomplete();
      // Back button safety: ensure returns to home if detail is visible and user refreshes
      $('#btn-back-home')?.addEventListener('click', backToHome);
      updateCartCount();
      renderCart();
      setupCheckout();
      // in case the page opens after status already moved to delivery
      maybeNotifyDeliveryForCustomer();
    }
    if (PAGE === 'empresa') {
      renderOrders('');
      $('#filter-status')?.addEventListener('change', (e)=> renderOrders(e.target.value));
    }
    if (PAGE === 'cozinha') {
      renderKitchen('');
      $('#filter-kitchen')?.addEventListener('change', (e)=> renderKitchen(e.target.value));
    }
    if (PAGE === 'motoboy') {
      initDeliveryMap();
      renderMotoboy();
    }
  });
})();
