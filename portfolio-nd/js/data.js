/* =========================================================
   CONFIGURAÇÃO DO SITE — edite APENAS este arquivo para
   trocar contatos, projetos, depoimentos e vídeo.
   ========================================================= */

window.SITE_CONFIG = {
  // WhatsApp com DDI + DDD + número, só dígitos. Ex.: 5511999998888
  whatsapp: "5500000000000",
  whatsappLabel: "(00) 00000-0000",

  email: "contato@ndsolucoescriativas.com.br",

  instagram: "https://instagram.com/seuperfil",
  instagramLabel: "@seuperfil",

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
    colors: ["#7c5cff", "#ff6b9a"],
    size: "wide",
  },
  {
    title: "Nome do Projeto 2",
    client: "Cliente",
    category: "Social Media",
    description: "Planejamento e criação de conteúdo para o Instagram.",
    image: "",
    colors: ["#ff8a3d", "#ffcf5c"],
    size: "tall",
  },
  {
    title: "Nome do Projeto 3",
    client: "Cliente",
    category: "Sites",
    description: "Landing page responsiva focada em conversão.",
    image: "",
    colors: ["#00c2a8", "#2d6bff"],
    size: "",
  },
  {
    title: "Nome do Projeto 4",
    client: "Cliente",
    category: "Vídeo",
    description: "Vídeo institucional com motion graphics.",
    image: "",
    colors: ["#ff4d6d", "#7c5cff"],
    size: "",
  },
  {
    title: "Nome do Projeto 5",
    client: "Cliente",
    category: "Identidade Visual",
    description: "Rebranding completo com manual de marca.",
    image: "",
    colors: ["#1e1e2e", "#c9a96e"],
    size: "",
  },
  {
    title: "Nome do Projeto 6",
    client: "Cliente",
    category: "Social Media",
    description: "Campanha sazonal com carrosséis e reels.",
    image: "",
    colors: ["#5cffb1", "#2d6bff"],
    size: "wide",
  },
  {
    title: "Nome do Projeto 7",
    client: "Cliente",
    category: "Sites",
    description: "Site institucional com blog e otimização para o Google.",
    image: "",
    colors: ["#ffcf5c", "#ff4d6d"],
    size: "",
  },
  {
    title: "Nome do Projeto 8",
    client: "Cliente",
    category: "Vídeo",
    description: "Série de reels para lançamento de produto.",
    image: "",
    colors: ["#2d6bff", "#00c2a8"],
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
