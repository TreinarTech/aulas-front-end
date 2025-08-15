//Objeto de fotos
const albuns = [
    {
        thumbnail: 'https://wallpapers.com/images/hd/rio-de-janeiro-desktop-n2xm3jjlgseus1rm.jpg',
        title: 'Férias no Rio de Janeiro',
        description: 'Férias no Rio de Janeiro',
        date: '10/08/2025',
        photos: [
            'https://wallpapers.com/images/featured/rio-de-janeiro-d8f020n7kiyvc721.jpg',
            'https://wallpapers.com/images/featured/rio-de-janeiro-d8f020n7kiyvc721.jpg',
            'https://wallpapers.com/images/featured/rio-de-janeiro-d8f020n7kiyvc721.jpg'
        ]
    },
    {
        thumbnail: 'https://www.infoescola.com/wp-content/uploads/2009/01/ouro-preto_560936134.jpg',
        title: 'Passeio em Minas Gerais',
        description: 'Passeio em Minas Gerais',
        date: '10/11/2025',
        photos: [
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150',
            'https://via.placeholder.com/150'
        ]
    }
];

// seleciona o theme
const theme = document.getElementById('theme');
if (!theme) {
  throw new Error('Elemento com id "theme" não encontrado no documento. Verifique o index.html.');
}

//Insere um elemento cabeçalho no theme
const header = document.createElement('header');
header.classList.add('topo');
header.innerHTML = `
  <div class="container-topo">
    <a href="#theme" class="logo">MeuPortfa</a>
    <nav class="container-links">
      <ul class="links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
`;

//section banner
const section = document.createElement('section');
section.classList.add('banner');
section.innerHTML = `
  <div class="overlay">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Bem-vindo ao meu portfólio</h1>
                <p>Meu nome é xxxxxx e sou desenvolvedor(a) web. Aqui você pode ver alguns dos projetos que desenvolvi.</p>
                <a href="#about" class="btn">Confira meus serviços</a>
                <a href="#contact" class="btn">Confira meus passatempos</a>
            </div>
        </div>
    </div>
  </div>
`;

//section meus serviços com ícones do font-awesome
const sectionServicos = document.createElement('section');
sectionServicos.classList.add('servicos');
sectionServicos.innerHTML = `
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>Meus serviços</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card-servicos">
          <i class="fas fa-code"></i>
          <h3>Desenvolvimento web</h3>
          <p>Desenvolvimento de sites e aplicativos web.</p>
          <button class="btn">Saiba mais</button>
        </div>
      </div>
      <div class="col-4">
        <div class="card-servicos">
          <i class="fas fa-paint-brush"></i>
          <h3>Design</h3>
          <p>Design de sites e aplicativos web.</p>
          <button class="btn">Saiba mais</button>
        </div>
      </div>
      <div class="col-4">
        <div class="card-servicos">
          <i class="fas fa-chart-line"></i>
          <h3>Marketing</h3>
          <p>Marketing de sites e aplicativos web.</p>
          <button class="btn">Saiba mais</button>
        </div>
      </div>
    </div>
  </div>
`;

//sections passatempos
const sectionPassatempos = document.createElement('section');
sectionPassatempos.classList.add('passatempos');
sectionPassatempos.innerHTML = `
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>Passatempos de lazer</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card-passatempos">
          <i class="fas fa-gamepad"></i>
          <h3>Jogos</h3>
          <p>Jogos de PC, PS4, Xbox e outros.</p>
          <button class="btn">Saiba mais</button>
        </div>
      </div>
      <div class="col-4">
        <div class="card-passatempos">
          <i class="fas fa-book-open"></i>
          <h3>Lendo livros</h3>
          <p>Lendo livros de diversas áreas.</p>
          <button class="btn">Saiba mais</button>
        </div>
      </div>
      <div class="col-4">
        <div class="card-passatempos">
          <i class="fas fa-plane"></i>
          <h3>Viagens</h3>
          <p>Viagens para conhecer lugares novos.</p>
          <button class="btn">Saiba mais</button>
        </div>
      </div>
    </div>
  </div>
`;

//consuma o objeto albuns em uma ul com cards de album dentro de uma section com classe viagens, cada card deve ter uma imagem, titulo, descricao e data e ao clicar no card deve abrir uma janela modal com a galeria de fotos do album
const sectionViagens = document.createElement('section');
sectionViagens.classList.add('viagens');
sectionViagens.innerHTML = `
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>Viagens</h2>
      </div>
    </div>
    <div class="row">
      ${albuns.map((album, index) => `
        <div class="col-4">
          <div class="card-viagens">
            <img src="${album.thumbnail}" alt="${album.title}">
            <h3>${album.title}</h3>
            <p>${album.description}</p>
            <p>Data da postagem: ${album.date}</p>
            <button class="btn btn-open" data-index="${index}">Ver mais</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`;

// cria o elemento de modal (inicialmente escondido)
const modal = document.createElement('div');
modal.classList.add('modal');
modal.style.display = 'none';
modal.innerHTML = `
  <div class="modal-overlay" data-close>
    <div class="modal-content">
      <button class="close" aria-label="Fechar" data-close>&times;</button>
      <div class="modal-body"></div>
    </div>
  </div>
`;

// modal de fotos dos albuns 
sectionViagens.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-open');
  if (!btn) return;
  const index = Number(btn.getAttribute('data-index'));
  const album = albuns[index];
  if (!album) return;

  const body = modal.querySelector('.modal-body');
  body.innerHTML = `
    <h2>${album.title}</h2>
    <p>${album.description}</p>
    <p>Data da postagem: ${album.date}</p>
    <div class="gallery">
      ${album.photos.map((src, i) => `
        <div class="gallery-item">
          <img src="${src}" alt="${album.title}" data-index="${i}" />
          <i class="fas fa-search-plus zoom"></i>
        </div>
      `).join('')}
    </div>
  `;

  // guarda o índice do álbum atualmente aberto no próprio modal
  modal.dataset.albumIndex = String(index);

  modal.style.display = 'block';
});

modal.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;
  // recupera o índice do álbum salvo quando o modal foi aberto
  const albumIndex = Number(modal.dataset.albumIndex);
  const album = albuns[albumIndex];
  if (!album) return;

  const item = img.closest('.gallery-item');
  if (!item) return;
  const zoomIcon = img.nextElementSibling;

  const isExpanded = item.classList.contains('expanded');

  // se for expandir, recolhe os demais primeiro
  if (!isExpanded) {
    const allItems = modal.querySelectorAll('.gallery-item.expanded');
    allItems.forEach((it) => {
      it.classList.remove('expanded');
      const itImg = it.querySelector('img');
      const itIcon = it.querySelector('.zoom');
      if (itImg) itImg.classList.remove('zoomed');
      if (itIcon) {
        itIcon.classList.remove('fa-minus');
        itIcon.classList.add('fa-search-plus');
      }
    });
  }

  // alterna somente o item clicado
  if (isExpanded) {
    item.classList.remove('expanded');
    img.classList.remove('zoomed');
    if (zoomIcon) {
      zoomIcon.classList.remove('fa-minus');
      zoomIcon.classList.add('fa-search-plus');
    }
  } else {
    item.classList.add('expanded');
    img.classList.add('zoomed');
    if (zoomIcon) {
      zoomIcon.classList.remove('fa-search-plus');
      zoomIcon.classList.add('fa-minus');
    }
  }
});

// fecha modal ao clicar no X ou fora do conteúdo
modal.addEventListener('click', (e) => {
  if (e.target.matches('[data-close]')) {
    modal.style.display = 'none';
  }
});

//footer
const footer = document.createElement('footer');
footer.classList.add('footer');
footer.innerHTML = `
  <div class="container">
    <p>&copy; 2025 MeuPortfa. Todos os direitos reservados.</p>
  </div>
`;

//renderizações no theme
theme.appendChild(header);
theme.appendChild(section);
theme.appendChild(sectionServicos);
theme.appendChild(sectionPassatempos);
theme.appendChild(sectionViagens);
theme.appendChild(modal);
theme.appendChild(footer);
