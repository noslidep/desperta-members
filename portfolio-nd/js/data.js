/* =========================================================
   CONFIGURAÇÃO DO SITE — edite APENAS este arquivo para
   trocar contatos, projetos, depoimentos e vídeo.
   ========================================================= */

window.SITE_CONFIG = {
  // WhatsApp com DDI + DDD + número, só dígitos. Ex.: 5511999998888
  whatsapp: "5579981237013",
  whatsappLabel: "(79) 98123-7013",

  email: "noslidepmd@gmail.com",

  instagram: "https://instagram.com/noslidep.design",
  instagramLabel: "@noslidep.design",

};

/* ---------------------------------------------------------
   PROJETOS DO PORTFÓLIO
   - category: precisa bater com um item de CATEGORIES
   - image: caminho da imagem (salve em assets/img/portfolio/).
            Se ficar vazio, aparece uma capa colorida automática.
   - images: use no lugar de "image" quando o trabalho tiver VÁRIAS
            imagens (mockups, slides de carrossel...). A primeira é a capa.
            Ex.: images: ["assets/img/portfolio/marca.jpg",
                          "assets/img/portfolio/marca-mockup.jpg"],
   - client: aparece ao lado da categoria quando o trabalho é aberto
   - video: para a categoria Vídeos, caminho do MP4 (e poster: imagem de capa)
   - focus: ponto da imagem que fica visível no card (ex.: "center 30%")
   A ordem da lista é a ordem em que aparecem no site.
   --------------------------------------------------------- */
window.CATEGORIES = ["Identidade Visual", "Social Media", "Fotos com IA", "Sites", "Vídeos"];

window.PROJECTS = [
  {
    title: "Alanna Semijoias",
    client: "Semijoias",
    category: "Identidade Visual",
    description: "Logotipo com diamante coroado e tipografia refinada, transmitindo delicadeza e valor. Aplicado em embalagens, papelaria e site.",
    images: ["assets/img/portfolio/mockup-alanna-semijoias.jpg", "assets/img/portfolio/logo-alanna-semijoias.jpg"],
  },
  {
    title: "Nicole Fontes",
    client: "Dermatologia & Estética",
    category: "Identidade Visual",
    description: "Monograma em caligrafia dentro de um selo circular, unindo sofisticação e cuidado. Aplicado em papelaria, comunicação visual e site.",
    images: ["assets/img/portfolio/mockup-nicole-fontes.jpg", "assets/img/portfolio/logo-nicole-fontes.jpg"],
  },
  {
    title: "Ormond Imports",
    client: "",
    category: "Identidade Visual",
    description: "Logotipo que combina letras fortes com assinatura cursiva, equilibrando solidez e estilo. Aplicado em embalagens, papelaria e site.",
    images: ["assets/img/portfolio/mockup-ormond-imports.jpg", "assets/img/portfolio/logo-ormond-imports.jpg"],
  },
  {
    title: "gstcon · Gestão de Condomínios",
    client: "gstcon",
    category: "Social Media",
    description: "Peças para as redes sociais de uma gestora de condomínios, comunicando atenção, empatia e profissionalismo.",
    image: "assets/img/portfolio/gstcon-social-media.jpg",
  },
  {
    title: "Clínica Sorriso Prime",
    client: "Odontologia",
    category: "Social Media",
    description: "Coleção com identidade visual pensada para o universo odontológico, com imagens criadas com IA.",
    image: "assets/img/portfolio/clinica-sorriso-prime.jpg",
  },
  {
    title: "Bella Massa",
    client: "Gastronomia",
    category: "Social Media",
    description: "Coleção gastronômica envolvente, organizada e apetitosa para as redes sociais.",
    image: "assets/img/portfolio/bella-massa.jpg",
  },
  {
    title: "Mentoria Conexão & Vendas",
    client: "Mentoria de vendas",
    category: "Social Media",
    description: "Design para redes sociais de uma mentoria de vendas voltada a empreendedoras.",
    image: "assets/img/portfolio/mentoria-conexao-vendas.jpg",
  },
  {
    title: "Últimos lugares para o feriado",
    client: "Turismo",
    category: "Social Media",
    description: "No turismo, desejo e confiança também começam pela forma como a marca se apresenta.",
    image: "assets/img/portfolio/turismo-ultimos-lugares.jpg",
  },
  {
    title: "Fluxo de caixa sob controle",
    client: "Contabilidade",
    category: "Social Media",
    description: "Na contabilidade, clareza e confiança fazem parte do posicionamento.",
    image: "assets/img/portfolio/contabilidade-fluxo-de-caixa.jpg",
  },
  {
    title: "Nem toda cobertura é igual",
    client: "Seguros",
    category: "Social Media",
    description: "Coleção educativa para simplificar dúvidas importantes sobre coberturas de seguro.",
    image: "assets/img/portfolio/seguros-colecao-educativa.jpg",
  },
  {
    title: "Hidratante facial",
    client: "",
    category: "Fotos com IA",
    description: "Foto de produto com modelo, criada com Inteligência Artificial.",
    image: "assets/img/portfolio/ia-produto-hidratante.jpg",
    focus: "center 30%",
  },
  {
    title: "Retrato para podcast",
    client: "",
    category: "Fotos com IA",
    description: "Retrato profissional em estúdio de podcast, criado com Inteligência Artificial.",
    image: "assets/img/portfolio/ia-retrato-podcast.jpg",
    focus: "48% center",
  },
  {
    title: "Retrato lifestyle",
    client: "",
    category: "Fotos com IA",
    description: "Retrato em ambiente de cafeteria, criado com Inteligência Artificial.",
    image: "assets/img/portfolio/ia-retrato-cafe.jpg",
    focus: "center 25%",
  },
  {
    title: "Site Alanna Semijoias",
    client: "Alanna Semijoias",
    category: "Sites",
    description: "Página inicial com a identidade da marca: tons de chocolate e dourado, tipografia elegante e chamada para a coleção.",
    image: "assets/img/portfolio/site-alanna-semijoias.jpg",
  },
  {
    title: "Site Nicole Fontes",
    client: "Nicole Fontes",
    category: "Sites",
    description: "Página inicial em verde-sálvia, transmitindo cuidado e confiança, com chamada direta para agendar consulta.",
    image: "assets/img/portfolio/site-nicole-fontes.jpg",
  },
  {
    title: "Site Ormond Imports",
    client: "Ormond Imports",
    category: "Sites",
    description: "Página inicial em azul e dourado, apresentando a curadoria de produtos importados.",
    image: "assets/img/portfolio/site-ormond-imports.jpg",
  },
  {
    title: "Animação do logo Noslidep",
    client: "Noslidep Soluções Criativas",
    category: "Vídeos",
    description: "Animação do logotipo com partículas e brilho, usada na abertura do site e nas redes sociais.",
    video: "assets/video/hero.mp4",
    poster: "assets/img/hero-poster.jpg",
  },
];

/* ---------------------------------------------------------
   DEPOIMENTOS — substitua pelos depoimentos REAIS dos seus
   clientes (com autorização deles) antes de publicar.
   --------------------------------------------------------- */
window.TESTIMONIALS = [
  {
    text: "Escreva aqui o depoimento de um cliente real sobre a experiência de trabalhar comigo.",
    name: "Nome do Cliente",
    role: "Empresa / Cargo",
  },
  {
    text: "Outro depoimento real: fale do resultado que o projeto trouxe para o negócio.",
    name: "Nome do Cliente",
    role: "Empresa / Cargo",
  },
  {
    text: "Mais um depoimento: destaque o atendimento, os prazos e a qualidade das entregas.",
    name: "Nome do Cliente",
    role: "Empresa / Cargo",
  },
];
