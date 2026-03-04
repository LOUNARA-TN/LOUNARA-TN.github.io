fetch('json/products.json')
  .then(res=>res.json())
  .then(products=>{
    const container=document.querySelector('.grid');
    function displayProducts(filter='All'){
      container.innerHTML='';
      products.filter(p=>filter==='All'||p.category===filter).forEach(p=>{
        const item=document.createElement('div'); item.className='item';
        const carousel=document.createElement('div'); carousel.className='carousel';
        p.images.forEach((imgSrc,i)=>{
          const img=document.createElement('img');
          img.dataset.src=imgSrc;
          if(i===0) img.classList.add('active');
          img.alt=p.name+' - vue '+(i+1);
          carousel.appendChild(img);
        });
        const title=document.createElement('h3'); title.innerHTML=`<a href="product.html?id=${p.id}">${p.name}</a>`;
        const desc=document.createElement('p'); desc.textContent=p.description;
        item.appendChild(carousel); item.appendChild(title); item.appendChild(desc); container.appendChild(item);

        // Fade-in
        setTimeout(()=>{ item.classList.add('visible'); },50);

        // Précharger première image
        const firstImg = new Image(); firstImg.src = p.images[0];

        // Carousel automatique
        const imgs=carousel.querySelectorAll('img'); let index=0;
        function showNext(){ imgs.forEach(img=>img.classList.remove('active')); imgs[index].classList.add('active'); index=(index+1)%imgs.length;}
        setInterval(showNext,3000);

        // Lazy load
        imgs.forEach(img=>img.src=img.dataset.src);
      });
    }
    displayProducts();
    document.querySelectorAll('.categories-menu a').forEach(link=>{
      link.addEventListener('click',e=>{
        e.preventDefault(); displayProducts(link.dataset.category);
      });
    });
  });
