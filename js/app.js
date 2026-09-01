/* ============================================================
   MAISON & STONE — Lookbook landing page logic
   ============================================================ */

const PHONE = '27833942575';
const IG_HANDLE = 'maisonandstoneZA';
const FB_NAME = 'Maison and Stone';

function waLink(msg){
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}
function photoImg(src, alt){
  return `<img src="${src}" alt="${alt || ''}" loading="lazy">`;
}

/* ============ DATA ============ */
/* A curated selection only — not the full portfolio. Message us on
   WhatsApp for the complete lookbook. */
const looks = [
  {id:1,  name:'Monochrome Matte',     mood:'Modern',              img:'images/portfolio/p1-1.jpg',
    blurb:'Matte black, brushed brass, and marble that speaks for itself.'},
  {id:2,  name:'Warm Walnut Luxury',   mood:'Warm & Traditional',  img:'images/portfolio/p2-1.jpg',
    blurb:'Warmth, texture, timber — a kitchen you actually want to live in.'},
  {id:4,  name:'Dark & Moody Dining',  mood:'Dark & Moody',        img:'images/portfolio/p4-1.jpg',
    blurb:'Statement lighting and deep charcoal stone, built to hold a room.'},
  {id:5,  name:'Bright Marble Island', mood:'Bright & Airy',       img:'images/portfolio/p5-1.jpg',
    blurb:'Light-filled and marble-veined — built to be the centrepiece.'},
  {id:8,  name:'Golden Hour Wine Wall',mood:'Warm & Traditional',  img:'images/portfolio/p8-1.jpg',
    blurb:'Backlit glass and amber undertones that glow after 5pm.'},
  {id:9,  name:'Ivory Marble Dining',  mood:'Bright & Airy',       img:'images/portfolio/p9-1.jpg',
    blurb:'White marble and sculptural veining, built for hosting that lingers.'},
  {id:10, name:'Charcoal Wine Cellar', mood:'Dark & Moody',        img:'images/portfolio/p10-1.jpg',
    blurb:'Floor-to-ceiling glass and a wine collection on full display.'},
  {id:11, name:'Quiet Luxury',         mood:'Modern',              img:'images/portfolio/p11-1.jpg',
    blurb:'Soft greys and warm light — luxury that doesn\u2019t need to shout.'},
  {id:13, name:'Bright Minimalist',    mood:'Bright & Airy',       img:'images/portfolio/p13-1.jpg',
    blurb:'Clean lines and handle-less cabinetry — minimalism with a purpose.'}
];

const testimonials = [
  {q:'Our kitchen went from dated to something out of a magazine — and it still works for how we actually live. Every detail was considered.', n:'Lerato M.', r:'Johannesburg', i:'L'},
  {q:'We renovated our kitchen and dining area from across the border. Site visits, updates, every step handled with total professionalism.', n:'Nkosi & Aisha', r:'Mbabane, Eswatini', i:'N'},
  {q:'I\u2019ve referred three friends already. Considered, calm, quietly high-end — exactly what they promised at the first consultation.', n:'Thandeka N.', r:'Harare, Zimbabwe', i:'T'}
];

const trust = [
  {t:'Free site consultation', d:'We visit, measure and quote before you commit to anything.', i:'<path d="M3 7h11v8H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'},
  {t:'15+ years experience', d:'Renovations completed across South Africa, Eswatini & Zimbabwe.', i:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="m9 12 2 2 4-4"/>'},
  {t:'Dedicated project manager', d:'One point of contact from first sketch to final install.', i:'<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>'},
  {t:'On-time, on-budget', d:'Fixed-price quotes with no surprise costs along the way.', i:'<path d="m14 7 3 3-9 9-3-3z"/><path d="M14 7l3-3 3 3-3 3z"/>'}
];

/* ============ STATE ============ */
let activeMood = 'all';

/* ============ LOOKBOOK ============ */
function look(l){
  return `<div class="look" onclick="openLightbox(${l.id})">
    <div class="ph">${photoImg(l.img, l.name)}</div>
    <div class="cap"><span>${l.name}</span></div>
  </div>`;
}
function renderLookbook(){
  const list = looks.filter(l => activeMood === 'all' || l.mood === activeMood);
  document.getElementById('lookGrid').innerHTML = list.map(look).join('');
  observe();
}
function setMood(m, el){
  activeMood = m;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  renderLookbook();
}
const moods = ['all', 'Modern', 'Warm & Traditional', 'Bright & Airy', 'Dark & Moody'];
document.getElementById('tabRow').innerHTML = moods.map((m,i) =>
  `<button class="tab ${i===0?'on':''}" onclick="setMood('${m}',this)">${m === 'all' ? 'All styles' : m}</button>`).join('');
renderLookbook();

/* ============ LIGHTBOX ============ */
function openLightbox(id){
  const l = looks.find(x => x.id === id);
  document.getElementById('lbImg').innerHTML = photoImg(l.img, l.name);
  document.getElementById('lbMood').textContent = l.mood;
  document.getElementById('lbName').textContent = l.name;
  document.getElementById('lbBlurb').textContent = l.blurb;
  document.getElementById('lbWa').href = waLink(`Hi! I saw the "${l.name}" look on your site and I'd love to know more.`);
  document.getElementById('lbBg').classList.add('show');
}
function closeLightbox(){ document.getElementById('lbBg').classList.remove('show'); }
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

/* ============ RENDER: TESTIMONIALS + TRUST ============ */
document.getElementById('testiGrid').innerHTML = testimonials.map(t => `
  <div class="testi"><div class="stars">\u2605\u2605\u2605\u2605\u2605</div><blockquote>"${t.q}"</blockquote>
    <div class="who"><div class="av">${t.i}</div><div><div class="nm">${t.n}</div><div class="rl">${t.r}</div></div></div>
  </div>`).join('');
document.getElementById('trust').innerHTML = trust.map(t => `
  <div class="t"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">${t.i}</svg>
  <div><h4>${t.t}</h4><p>${t.d}</p></div></div>`).join('');

/* ============ CONTACT LINKS ============ */
document.querySelectorAll('[data-wa]').forEach(el => {
  el.href = waLink(el.dataset.wa || 'Hi! I\u2019d love to chat about a kitchen renovation.');
});

/* ============ TOAST ============ */
let tT;
function toast(m){
  const t = document.getElementById('toast');
  t.innerHTML = '<span style="color:var(--clay)">\u2726</span> ' + m;
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
  els.forEach(e => { if(!e.classList.contains('seen')){ e.style.opacity = '0'; e.style.transform = 'translateY(22px)'; io.observe(e); } });
}
observe();

/* ============ HEADER + COUNTDOWN ============ */
addEventListener('scroll', () => document.getElementById('hdr').classList.toggle('scrolled', scrollY > 20));
let end = Date.now() + (18 * 86400 + 6 * 3600) * 1000;
setInterval(() => {
  let d = Math.max(0, end - Date.now()) / 1000;
  const dd = Math.floor(d / 86400), hh = Math.floor(d % 86400 / 3600), mm = Math.floor(d % 3600 / 60), ss = Math.floor(d % 60);
  const z = n => String(n).padStart(2, '0');
  document.getElementById('cd-d').textContent = z(dd);
  document.getElementById('cd-h').textContent = z(hh);
  document.getElementById('cd-m').textContent = z(mm);
  document.getElementById('cd-s').textContent = z(ss);
}, 1000);
