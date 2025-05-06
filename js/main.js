document.addEventListener('DOMContentLoaded', () => {
    // 1. Login/Dashboard toggle
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('loginBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (loginBtn && dashboardBtn) {
      loginBtn.style.display = loggedIn ? 'none' : 'inline-block';
      dashboardBtn.style.display = loggedIn ? 'inline-block' : 'none';
    }
  
    // 2. Carusel
    const slides = document.querySelectorAll('.carousel-slide');
    let current = 0;
    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
        const caption = slide.querySelector('.carousel-caption');
        if (caption) {
          caption.classList.remove('fade-anim');
          void caption.offsetWidth;
          if (i === idx) caption.classList.add('fade-anim');
        }
      });
    }
    if (slides.length) {
      document.getElementById('carouselPrev')?.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });
      document.getElementById('carouselNext')?.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });
      setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 5000);
      showSlide(current);
    }
  
    // 3. Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.style.display = loggedIn ? 'inline-block' : 'none';
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
      });
    }
  
    // 4. Filtrare și search (doar pe listare.html)
    const produse = window.produse || [
      { id: 1, titlu: 'Set căști wireless', categorie: 'Electronice', depozit: 'București 2', tip: 'Nou', pret: 11.9, cantitate: 1200, img: 'assets/img/produs1.jpg' },
      { id: 2, titlu: 'Parfum unisex 100ml', categorie: 'Cosmetice', depozit: 'Cluj', tip: 'Nou', pret: 29.0, cantitate: 500, img: 'assets/img/produs2.jpg' },
      { id: 3, titlu: 'Jucărie educativă lemn', categorie: 'Jucării', depozit: 'Iași', tip: 'Nou', pret: 15.5, cantitate: 300, img: 'assets/img/produs3.jpg' },
      { id: 4, titlu: 'Set lenjerie pat 2 persoane', categorie: 'Casă & Grădină', depozit: 'Timișoara', tip: 'Sezonal', pret: 49.9, cantitate: 200, img: 'assets/img/produs4.jpg' }
    ];
    function afiseazaProduse(lista) {
      const grid = document.getElementById('productList');
      if (!grid) return;
      grid.innerHTML = lista.map(p => 
        `<div class="product-tile">
           <div class="product-tile-img-wrapper">
             <img src="${p.img}" alt="${p.titlu}">
           </div>
           <div class="product-title">${p.titlu}</div>
           <div class="product-info">Cantitate: ${p.cantitate} buc</div>
           <div class="product-info">Depozit: ${p.depozit}</div>
           <div class="product-price">${p.pret.toFixed(2)} RON/buc</div>
           <a href="produs.html?id=${p.id}" class="product-btn">Vezi detalii</a>
         </div>`
      ).join('');
    }
    const form = document.getElementById('filtersForm');
    if (form) {
      afiseazaProduse(produse);
      form.addEventListener('submit', e => {
        e.preventDefault();
        const cat = form.querySelector('#categorie').value;
        const depozit = form.querySelector('#depozit').value;
        const tip = form.querySelector('#tipProdus').value;
        const cant = parseInt(form.querySelector('#cantitate').value) || 0;
        const pretMin = parseFloat(form.querySelector('#pretMin').value) || 0;
        const pretMax = parseFloat(form.querySelector('#pretMax').value) || Infinity;
        const filtrate = produse.filter(p =>
          (!cat || p.categorie === cat) &&
          (!depozit || p.depozit === depozit) &&
          (!tip || p.tip === tip) &&
          p.cantitate >= cant &&
          p.pret >= pretMin && p.pret <= pretMax
        );
        afiseazaProduse(filtrate);
      });
      // Search live doar pe listare
      const input = document.querySelector('.search-bar input[type="text"]');
      if (input) {
        input.addEventListener('input', () => {
          const val = input.value.toLowerCase();
          const filtrate = produse.filter(p =>
            p.titlu.toLowerCase().includes(val) ||
            p.categorie.toLowerCase().includes(val)
          );
          afiseazaProduse(filtrate);
        });
      }
    }
  });