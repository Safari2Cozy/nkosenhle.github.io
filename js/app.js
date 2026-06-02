/* ============================================================
   MAISON — App logic (vanilla JS, no build step)
   ============================================================ */

/* ---- helper: render an illustration image from /images ---- */
function illImg(key, alt){
  return `<img src="images/${key}.svg" alt="${alt || ''}" loading="lazy">`;
}

/* ============ DATA ============ */
const products = [
  {id:1,name:'Halden 3-Seater Sofa',cat:'Sofas',mat:'Oak & Linen',col:'Sand',colHex:'#D8C2A6',price:18900,old:22900,rate:4.8,rev:214,pop:98,ill:'sofa',sale:true,desc:'A low, generous sofa in soft brushed linen over a solid oak frame. Feather-blend cushions keep their shape for years.'},
  {id:2,name:'Marlow Lounge Chair',cat:'Sofas',mat:'Walnut & Bouclé',col:'Cream',colHex:'#EFE6D6',price:7450,old:0,rate:4.9,rev:163,pop:95,ill:'chair',desc:'A sculptural accent chair wrapped in textured bouclé, cradled by a hand-finished walnut shell.'},
  {id:3,name:'Avelin King Bed',cat:'Beds',mat:'Solid Oak',col:'Natural',colHex:'#C9AE8E',price:22300,old:0,rate:4.7,rev:189,pop:91,ill:'bed',desc:'An upholstered headboard meets a warm oak platform — quiet, grounding, and built to last a lifetime.'},
  {id:4,name:'Norra Dining Table',cat:'Dining',mat:'Solid Ash',col:'Natural',colHex:'#D8C7B2',price:15600,old:0,rate:4.6,rev:142,pop:80,ill:'table',desc:'Seats six with room to spare. A solid ash top with softly tapered legs and an oil finish that ages beautifully.'},
  {id:5,name:'Brae Dining Chairs · Set of 2',cat:'Dining',mat:'Beech & Leather',col:'Tan',colHex:'#B08968',price:5200,old:6400,rate:4.5,rev:97,pop:74,ill:'chair',sale:true,desc:'Full-grain leather seats on a steam-bent beech frame. Comfortable enough for the longest dinners.'},
  {id:6,name:'Locke Writing Desk',cat:'Office',mat:'Solid Oak',col:'Natural',colHex:'#C9AE8E',price:9800,old:0,rate:4.7,rev:121,pop:88,ill:'desk',desc:'A compact desk with a concealed cable tray and a single soft-close drawer. Made for focused, beautiful work.'},
  {id:7,name:'Ostra Bookshelf',cat:'Office',mat:'Walnut',col:'Espresso',colHex:'#5A4632',price:11400,old:0,rate:4.4,rev:68,pop:62,ill:'shelf',desc:'Five open shelves in rich walnut. Anchored, generous, and ready for a life of books and objects.'},
  {id:8,name:'Senja Bedside Table',cat:'Beds',mat:'Solid Oak',col:'Natural',colHex:'#C9AE8E',price:3650,old:0,rate:4.6,rev:204,pop:70,ill:'nightstand',desc:'Two soft-close drawers and a rounded profile that feels gentle in a quiet bedroom.'},
  {id:9,name:'Fjell Coffee Table',cat:'Sofas',mat:'Travertine',col:'Stone',colHex:'#E2D6C5',price:6900,old:0,rate:4.8,rev:156,pop:84,ill:'coffee',desc:'A honed travertine top floats on a minimal frame — a calm centrepiece for any living room.'}
];
const cats = [
  {name:'Sofas',sub:'Seating & living',ill:'sofa'},
  {name:'Beds',sub:'Bedroom',ill:'bed'},
  {name:'Dining',sub:'Tables & chairs',ill:'table'},
  {name:'Office',sub:'Workspace',ill:'desk'}
];
const testimonials = [
  {q:'The Halden sofa completely changed our living room. The linen is gorgeous and it somehow feels even better than it looks.',n:'Lerato M.',r:'Johannesburg',i:'L'},
  {q:'Delivery was tracked the whole way and assembly took ten minutes. This is how buying furniture should feel.',n:'James & Aisha',r:'Cape Town',i:'J'},
  {q:'I furnished my whole apartment from MAISON. Everything is warm, calm and quietly high-end. Zero regrets.',n:'Thandeka N.',r:'Pretoria',i:'T'}
];
const trust = [
  {t:'Free, tracked delivery',d:'On all orders over R3 000, nationwide.',i:'<path d="M3 7h11v8H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'},
  {t:'10-year warranty',d:'We stand behind every joint and seam.',i:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="m9 12 2 2 4-4"/>'},
  {t:'30-day returns',d:'Not in love? Send it back, easily.',i:'<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'},
  {t:'Tool-free assembly',d:'Most pieces set up in under 15 minutes.',i:'<path d="m14 7 3 3-9 9-3-3z"/><path d="M14 7l3-3 3 3-3 3z"/>'}
];

/* ============ STATE ============ */
let cart = [], wish = new Set(), activeCat = 'all', maxPrice = 25000, pdpItem = null, pdpQuantity = 1;
const ZAR = n => 'R' + n.toLocaleString('en-ZA');
const stars = r => '★★★★★'.slice(0, Math.round(r)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(r));

/* ============ NAV ============ */
function go(v){
  document.querySelectorAll('.view').forEach(e => e.classList.remove('active'));
  document.getElementById('view-' + v).classList.add('active');
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === v));
  if(v === 'shop') renderShop();
  if(v === 'cart') renderCart();
  window.scrollTo({top:0, behavior:'instant'});
  observe();
}
function filterCat(c){ activeCat = c; go('shop'); syncFilterUI(); }

/* ============ CARD TEMPLATE ============ */
function card(p){
  const onw = wish.has(p.id) ? 'on' : '';
  return `<article class="card">
    <div class="media">
      ${p.sale ? '<span class="tag sale">Sale</span>' : (p.pop > 90 ? '<span class="tag">Bestseller</span>' : '')}
      <button class="wish ${onw}" aria-label="Add to wishlist" onclick="toggleWish(${p.id},this)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z"/></svg>
      </button>
      <div class="ill" onclick="openPDP(${p.id})">${illImg(p.ill, p.name)}</div>
      <button class="quick" onclick="openQV(${p.id})">Quick view</button>
    </div>
    <div class="body">
      <span class="cat-tag">${p.cat}</span>
      <h3 class="name" onclick="openPDP(${p.id})" style="cursor:pointer">${p.name}</h3>
      <div class="rate"><span class="stars">${stars(p.rate)}</span> ${p.rate} · ${p.rev}</div>
      <div class="foot">
        <div class="price">${p.old ? `<s>${ZAR(p.old)}</s>` : ''}${ZAR(p.price)}</div>
        <button class="add" aria-label="Add to cart" onclick="addCart(${p.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

/* ============ HOME RENDER ============ */
document.getElementById('catGrid').innerHTML = cats.map(c => `
  <div class="cat" onclick="filterCat('${c.name}')">
    <div class="ill">${illImg(c.ill, c.name)}</div>
    <div class="label"><div><h3>${c.name}</h3><div class="c">${c.sub}</div></div>
      <div class="go"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
    </div>
  </div>`).join('');
document.getElementById('bestGrid').innerHTML = products.filter(p => p.pop >= 84).slice(0,4).map(card).join('');
document.getElementById('testiGrid').innerHTML = testimonials.map(t => `
  <div class="testi"><div class="stars">★★★★★</div><blockquote>"${t.q}"</blockquote>
    <div class="who"><div class="av">${t.i}</div><div><div class="nm">${t.n}</div><div class="rl">${t.r}</div></div></div>
  </div>`).join('');
document.getElementById('trust').innerHTML = trust.map(t => `
  <div class="t"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${t.i}</svg>
  <div><h4>${t.t}</h4><p>${t.d}</p></div></div>`).join('');

/* ============ FILTERS ============ */
const allCats = ['all', ...new Set(products.map(p => p.cat))];
const allMats = [...new Set(products.map(p => p.mat))];
const allCols = [...new Set(products.map(p => p.col))];
const colMap = {Sand:'#D8C2A6', Cream:'#EFE6D6', Natural:'#C9AE8E', Tan:'#B08968', Espresso:'#5A4632', Stone:'#E2D6C5'};
function syncFilterUI(){
  document.getElementById('fCat').innerHTML = allCats.map(c => `
    <label class="fopt"><input type="radio" name="cat" ${activeCat === c ? 'checked' : ''} onclick="activeCat='${c}';renderShop()"> ${c === 'all' ? 'All furniture' : c}</label>`).join('');
  document.getElementById('fMat').innerHTML = allMats.map(m => `
    <label class="fopt"><input type="checkbox" class="fmat" value="${m}" onclick="renderShop()"> ${m}</label>`).join('');
  document.getElementById('fCol').innerHTML = allCols.map(c => `
    <label class="fopt"><input type="checkbox" class="fcol" value="${c}" onclick="renderShop()"> <span class="swatch" style="background:${colMap[c]}"></span> ${c}</label>`).join('');
}
function onPrice(v){ maxPrice = +v; document.getElementById('priceVal').textContent = ZAR(+v); renderShop(); }
function renderShop(){
  const title = activeCat === 'all' ? 'Shop All' : activeCat;
  document.getElementById('shopTitle').textContent = title;
  document.getElementById('crumbCat').textContent = title;
  const mats = [...document.querySelectorAll('.fmat:checked')].map(x => x.value);
  const cols = [...document.querySelectorAll('.fcol:checked')].map(x => x.value);
  let list = products.filter(p =>
    (activeCat === 'all' || p.cat === activeCat) &&
    (!mats.length || mats.includes(p.mat)) &&
    (!cols.length || cols.includes(p.col)) &&
    p.price <= maxPrice);
  const s = document.getElementById('sortSel').value;
  if(s === 'low')  list.sort((a,b) => a.price - b.price);
  if(s === 'high') list.sort((a,b) => b.price - a.price);
  if(s === 'pop')  list.sort((a,b) => b.pop - a.pop);
  if(s === 'new')  list.sort((a,b) => b.id - a.id);
  document.getElementById('shopCount').textContent = `${list.length} piece${list.length !== 1 ? 's' : ''}`;
  document.getElementById('shopGrid').innerHTML = list.length
    ? list.map(card).join('')
    : '<p style="color:var(--umber);padding:2rem 0">No pieces match these filters. Try widening your selection.</p>';
  observe();
}
syncFilterUI();

/* ============ PDP ============ */
function openPDP(id){
  const p = products.find(x => x.id === id); pdpItem = p; pdpQuantity = 1;
  document.getElementById('pdpCrumb').textContent = p.name;
  document.getElementById('pdpCat').textContent = p.cat;
  document.getElementById('pdpName').textContent = p.name;
  document.getElementById('pdpStars').textContent = stars(p.rate);
  document.getElementById('pdpRev').textContent = `${p.rate} · ${p.rev} reviews`;
  document.getElementById('pdpPrice').innerHTML = (p.old ? `<s>${ZAR(p.old)}</s>` : '') + ZAR(p.price);
  document.getElementById('pdpDesc').textContent = p.desc + ' Each piece is made to order and finished by hand in our Midrand workshop.';
  document.getElementById('pdpMain').innerHTML = illImg(p.ill, p.name);
  document.getElementById('pdpQ').textContent = '1';
  document.getElementById('pdpDim').textContent = p.ill === 'sofa' ? '220 × 95 × 78 cm' : p.ill === 'bed' ? '200 × 215 × 110 cm' : 'Various';
  document.getElementById('pdpMat').textContent = p.mat;
  document.getElementById('pdpThumbs').innerHTML = [0,1,2].map(i =>
    `<div class="gthumb ${i === 0 ? 'on' : ''}" onclick="document.querySelectorAll('.gthumb').forEach(t=>t.classList.remove('on'));this.classList.add('on')">${illImg(p.ill, p.name + ' view ' + (i+1))}</div>`).join('');
  const colOpts = ['Sand','Cream','Tan','Stone'];
  document.getElementById('pdpCols').innerHTML = colOpts.map((c,i) =>
    `<span class="col-chip ${i === 0 ? 'on' : ''}" style="background:${colMap[c]}" title="${c}" onclick="document.querySelectorAll('#pdpCols .col-chip').forEach(x=>x.classList.remove('on'));this.classList.add('on')"></span>`).join('');
  const w = document.getElementById('pdpWish');
  w.classList.toggle('on', wish.has(id));
  w.querySelector('svg').style.fill = wish.has(id) ? 'var(--terra)' : 'none';
  w.onclick = () => { toggleWish(id, w); };
  document.getElementById('pdpAdd').onclick = () => { addCart(id, pdpQuantity); };
  document.getElementById('relGrid').innerHTML = products.filter(x => x.cat === p.cat && x.id !== id).slice(0,4).map(card).join('');
  go('product');
}
function pdpQty(d){ pdpQuantity = Math.max(1, pdpQuantity + d); document.getElementById('pdpQ').textContent = pdpQuantity; }

/* ============ QUICK VIEW ============ */
function openQV(id){
  const p = products.find(x => x.id === id);
  document.getElementById('qvIll').innerHTML = illImg(p.ill, p.name);
  document.getElementById('qvCat').textContent = p.cat;
  document.getElementById('qvName').textContent = p.name;
  document.getElementById('qvStars').textContent = stars(p.rate);
  document.getElementById('qvPrice').innerHTML = (p.old ? `<s style="color:var(--mist);font-weight:400;font-size:1rem;margin-right:.5rem">${ZAR(p.old)}</s>` : '') + ZAR(p.price);
  document.getElementById('qvDesc').textContent = p.desc;
  document.getElementById('qvAdd').onclick = () => { addCart(id); closeQV(); };
  document.getElementById('qvView').onclick = () => { closeQV(); openPDP(id); };
  document.getElementById('qvBg').classList.add('show');
}
function closeQV(){ document.getElementById('qvBg').classList.remove('show'); }
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeQV(); });

/* ============ CART ============ */
function addCart(id, q = 1){
  const ex = cart.find(c => c.id === id);
  if(ex) ex.q += q; else cart.push({id, q});
  updateBadges();
  const p = products.find(x => x.id === id);
  toast(`${p.name} added to cart ✦`);
}
function removeCart(id){ cart = cart.filter(c => c.id !== id); updateBadges(); renderCart(); }
function cartQty(id, d){ const c = cart.find(x => x.id === id); if(c){ c.q = Math.max(1, c.q + d); updateBadges(); renderCart(); } }
function toggleWish(id, el){
  if(wish.has(id)){ wish.delete(id); el.classList.remove('on'); el.querySelector('svg').style.fill = 'none'; }
  else { wish.add(id); el.classList.add('on'); el.querySelector('svg').style.fill = 'var(--terra)'; toast('Saved to wishlist ♥'); }
  const wb = document.getElementById('wbadge'); wb.textContent = wish.size; wb.style.display = wish.size ? 'flex' : 'none';
}
function updateBadges(){
  const n = cart.reduce((s,c) => s + c.q, 0);
  const cb = document.getElementById('cbadge'); cb.textContent = n; cb.style.display = n ? 'flex' : 'none';
}
function renderCart(){
  const body = document.getElementById('cartBody');
  if(!cart.length){
    body.innerHTML = `<div class="empty">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 7h14l-1.2 11a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
      <h2>Your cart is empty</h2><p>Discover pieces made to be lived with.</p>
      <button class="btn btn-primary" style="margin-top:1.5rem" onclick="go('shop')">Start shopping</button></div>`;
    return;
  }
  const items = cart.map(c => ({...products.find(p => p.id === c.id), q:c.q}));
  const sub = items.reduce((s,i) => s + i.price * i.q, 0);
  const ship = sub > 3000 ? 0 : 450;
  const tot = sub + ship;
  body.innerHTML = `<div class="cart-grid">
    <div>${items.map(i => `
      <div class="citem">
        <div class="cimg">${illImg(i.ill, i.name)}</div>
        <div><div class="nm">${i.name}</div><div class="meta">${i.mat} · ${i.col}</div>
          <div class="qty" style="width:fit-content"><button onclick="cartQty(${i.id},-1)">−</button><span>${i.q}</span><button onclick="cartQty(${i.id},1)">+</button></div>
        </div>
        <div><div class="cp">${ZAR(i.price * i.q)}</div><button class="rm" style="margin-top:.8rem" onclick="removeCart(${i.id})">Remove</button></div>
      </div>`).join('')}
    </div>
    <div class="summary">
      <h3>Order summary</h3>
      <div class="srow"><span>Subtotal</span><span>${ZAR(sub)}</span></div>
      <div class="srow"><span>Delivery</span><span>${ship ? ZAR(ship) : 'Free'}</span></div>
      ${ship ? `<div class="srow" style="color:var(--clay);font-size:.82rem">Add ${ZAR(3001 - sub)} for free delivery</div>` : ''}
      <div class="promo-in"><input placeholder="Promo code"><button class="btn btn-ghost" onclick="toast('Code applied')">Apply</button></div>
      <div class="srow total"><span>Total</span><span>${ZAR(tot)}</span></div>
      <button class="btn btn-primary btn-block" style="margin-top:1.2rem" onclick="toast('Proceeding to secure checkout…')">Checkout securely</button>
      <div class="guest">or <a href="#" onclick="toast('Guest checkout — no account needed');return false">check out as guest</a></div>
      <div class="pay-row"><span class="p">VISA</span><span class="p">MASTERCARD</span><span class="p">PAYFAST</span><span class="p">EFT</span></div>
    </div>
  </div>`;
}

/* ============ SEARCH AUTOCOMPLETE ============ */
const srch = document.getElementById('srch'), ac = document.getElementById('ac');
srch.addEventListener('input', () => {
  const q = srch.value.toLowerCase().trim();
  if(!q){ ac.classList.remove('show'); return; }
  const hits = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.mat.toLowerCase().includes(q)).slice(0,5);
  if(!hits.length){ ac.classList.remove('show'); return; }
  ac.innerHTML = hits.map(p => `<button onclick="srch.value='';ac.classList.remove('show');openPDP(${p.id})">
    <span class="acg">${illImg(p.ill, p.name)}</span><span><strong style="font-weight:600">${p.name}</strong><br><span style="color:var(--mist);font-size:.78rem">${p.cat} · ${ZAR(p.price)}</span></span></button>`).join('');
  ac.classList.add('show');
});
document.addEventListener('click', e => { if(!e.target.closest('.search')) ac.classList.remove('show'); });

/* ============ TOAST ============ */
let tT;
function toast(m){
  const t = document.getElementById('toast');
  t.innerHTML = '<span style="color:var(--clay)">✦</span> ' + m;
  t.classList.add('show');
  clearTimeout(tT);
  tT = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ============ SCROLL REVEAL ============ */
function observe(){
  const els = document.querySelectorAll('[data-io]:not(.seen)');
  const io = new IntersectionObserver(ents => {
    ents.forEach(en => {
      if(en.isIntersecting){
        en.target.style.animation = 'rise .8s var(--ease) forwards';
        en.target.classList.add('seen');
        io.unobserve(en.target);
      }
    });
  }, {threshold:.12});
  els.forEach(e => { e.style.opacity = '0'; e.style.transform = 'translateY(22px)'; io.observe(e); });
}
observe();

/* ============ HEADER + COUNTDOWN ============ */
addEventListener('scroll', () => document.getElementById('hdr').classList.toggle('scrolled', scrollY > 20));
let end = Date.now() + (2 * 86400 + 14 * 3600 + 38 * 60) * 1000;
setInterval(() => {
  let d = Math.max(0, end - Date.now()) / 1000;
  const dd = Math.floor(d / 86400), hh = Math.floor(d % 86400 / 3600), mm = Math.floor(d % 3600 / 60), ss = Math.floor(d % 60);
  const z = n => String(n).padStart(2, '0');
  document.getElementById('cd-d').textContent = z(dd);
  document.getElementById('cd-h').textContent = z(hh);
  document.getElementById('cd-m').textContent = z(mm);
  document.getElementById('cd-s').textContent = z(ss);
}, 1000);
