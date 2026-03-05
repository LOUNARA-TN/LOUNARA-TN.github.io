fetch('json/products.json')
.then(res=>res.json())
.then(products=>{
  const container = document.querySelector('.grid');
  const categoryLinks = document.querySelectorAll('.categories-menu a');

  function displayProducts(filter='All'){
    container.innerHTML='';

    products
    .filter(p => filter==='All' || p.category===filter)
    .forEach(p=>{

      const link = document.createElement('a');
      link.href = 'product.html?id=' + p.id;
      link.className = 'item-link';

      const img = document.createElement('img');
      img.src = p.images[0];
      img.alt = p.name;

      const title = document.createElement('h3');
      title.textContent = p.name;

      const desc = document.createElement('p');
      desc.textContent = p.description;

      link.appendChild(img);
      link.appendChild(title);
      link.appendChild(desc);

      container.appendChild(link);
    });
  }

  displayProducts();

  categoryLinks.forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();

      const category = link.dataset.category;

      displayProducts(category);

      // retirer active de tous les liens
      categoryLinks.forEach(l => l.classList.remove('active'));

      // ajouter active au lien cliqué
      link.classList.add('active');
    });
  });
});
