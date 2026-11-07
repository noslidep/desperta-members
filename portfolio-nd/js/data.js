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

  // Showreel: link de incorporação do YouTube ou Vimeo, OU caminho de um MP4.
  // Ex.: "https://www.youtube.com/embed/XXXXXXXXXXX"
  //      "https://player.vimeo.com/video/000000000"
  //      "assets/video/showreel.mp4"
  showreel: "assets/video/hero.mp4",
};

/* ---------------------------------------------------------
   PROJETOS DO PORTFÓLIO
   - category: precisa bater com um item de CATEGORIES
   - image: caminho da imagem (ex.: "assets/img/projeto-1.jpg").
            Se ficar vazio, aparece uma capa colorida automática.
   - colors: cores da capa automática (usadas só sem imagem)
   - size: "wide" (ocupa 2 colunas), "tall" (2 linhas) ou ""
   --------------------------------------------------------- */
window.CATEGORIES = ["Todos", "Identidade Visual", "Social Media", "Sites", "Vídeo"];

window.PROJECTS = [
  {
    title: "Nome do Projeto 1",
    client: "Cliente",
    category: "Identidade Visual",
    description: "Descreva aqui o desafio do cliente, a solução criada e o resultado alcançado.",
    image: "",
    colors: ["#3a8c7d", "#0b3b3d"],
    size: "wide",
  },
  {
    title: "Nome do Projeto 2",
    client: "Cliente",
    category: "Social Media",
    description: "Planejamento e criação de conteúdo para o Instagram.",
    image: "",
    colors: ["#5fb8a5", "#1d5f58"],
    size: "tall",
  },
  {
    title: "Nome do Projeto 3",
    client: "Cliente",
    category: "Sites",
    description: "Landing page responsiva focada em conversão.",
    image: "",
    colors: ["#0f4a47", "#3a8c7d"],
    size: "",
  },
  {
    title: "Nome do Projeto 4",
    client: "Cliente",
    category: "Vídeo",
    description: "Vídeo institucional com motion graphics.",
    image: "",
    colors: ["#a8dccf", "#3a8c7d"],
    size: "",
  },
  {
    title: "Nome do Projeto 5",
    client: "Cliente",
    category: "Identidade Visual",
    description: "Rebranding completo com manual de marca.",
    image: "",
    colors: ["#062b2e", "#5fb8a5"],
    size: "",
  },
  {
    title: "Nome do Projeto 6",
    client: "Cliente",
    category: "Social Media",
    description: "Campanha sazonal com carrosséis e reels.",
    image: "",
    colors: ["#3a8c7d", "#a8dccf"],
    size: "wide",
  },
  {
    title: "Nome do Projeto 7",
    client: "Cliente",
    category: "Sites",
    description: "Site institucional com blog e otimização para o Google.",
    image: "",
    colors: ["#1d5f58", "#022023"],
    size: "",
  },
  {
    title: "Nome do Projeto 8",
    client: "Cliente",
    category: "Vídeo",
    description: "Série de reels para lançamento de produto.",
    image: "",
    colors: ["#5fb8a5", "#0f4a47"],
    size: "",
  },
];

/* ---------------------------------------------------------
   DEPOIMENTOS — substitua pelos depoimentos REAIS dos seus
   clientes (com autorização deles) antes de publicar.
   --------------------------------------------------------- */
window.TESTIMONIALS = [
  {
    text: "Escreva aqui o depoimento de um cliente real sobre a experiência de trabalhar com a ND.",
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
