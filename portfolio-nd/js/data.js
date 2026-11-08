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

  behance: "https://www.behance.net/edilsonpereira3",

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
    title: "Frank Marques",
    client: "Gestão e Patrimônio",
    category: "Identidade Visual",
    description: "Monograma FM com linhas fluidas em dourado sobre azul-marinho, unindo sofisticação e solidez. Aplicado em papelaria, embalagens, sinalização e site.",
    images: ["assets/img/portfolio/mockup-frank-marques.jpg", "assets/img/portfolio/logo-frank-marques.jpg"],
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
   DEPOIMENTOS — mensagens reais recebidas de clientes.
   - name: nome do cliente (deixe "Cliente" se preferir não identificar)
   - segment: ramo do cliente
   - messages: as mensagens, na ordem. "me: true" = mensagem sua.
     Para imagens: { images: [...4 imagens...], more: 2 } (more = "+2" na última)
     Para arquivos: { file: { name: "video.mp4", size: "57 MB" } }
   --------------------------------------------------------- */
window.TESTIMONIALS = [
  {
    name: "Cliente",
    segment: "Cafeteria",
    messages: [
      { images: ["assets/img/depoimentos/cafeteria-1.jpg", "assets/img/depoimentos/cafeteria-2.jpg", "assets/img/depoimentos/cafeteria-3.jpg", "assets/img/depoimentos/cafeteria-4.jpg"], time: "11:40", me: true },
      { text: "Que maravilha", time: "12:02" },
      { text: "Ficou show!!!", time: "12:02" },
      { text: "Gratidão 😄", time: "12:03" },
      { text: "Que bom que gostou... Boa semana e boas vendas!", time: "12:05", me: true },
      { text: "Obrigada 🙏", time: "13:18" },
    ],
  },
  {
    name: "Cliente",
    segment: "Curso de maquiagem",
    messages: [
      { text: "Veja o que achou sem pressa", time: "10:14" },
      { text: "Esse é nosso último produto desse pacote, obrigada", time: "10:14" },
      { images: ["assets/img/depoimentos/maquiagem-1.jpg", "assets/img/depoimentos/maquiagem-2.jpg", "assets/img/depoimentos/maquiagem-3.jpg", "assets/img/depoimentos/maquiagem-4.jpg"], more: 2, time: "13:17", me: true },
      { text: "Aprovado", time: "13:18" },
    ],
  },
  {
    name: "Cliente",
    segment: "Mentoria",
    messages: [
      { file: { name: "IMG_4617.MP4", size: "38 MB" }, time: "16:11" },
      { file: { name: "IMG_4618.MP4", size: "55 MB" }, time: "16:12" },
      { file: { name: "IMG_4616.MP4", size: "54 MB" }, time: "16:12" },
      { file: { name: "video-final.mp4", size: "57 MB" }, time: "16:57", me: true },
      { text: "Sensacional", time: "17:01" },
      { text: "Obrigada", time: "17:01" },
    ],
  },
];

/* ---------------------------------------------------------
   DÚVIDAS FREQUENTES — a seção só aparece no site quando
   pelo menos uma pergunta tiver resposta (campo "a").
   --------------------------------------------------------- */
window.FAQ = [
  {
    q: "Qual é o prazo de entrega?",
    a: "De 24 a 72 horas, contadas a partir do recebimento do material que você enviar (textos, fotos, logo, referências). Posts e artes avulsas costumam ficar no início dessa faixa; projetos com mais peças, como uma identidade visual completa ou um site, podem usar o prazo todo. O prazo de cada projeto é combinado antes de começar.",
  },
  {
    q: "Quantas alterações estão incluídas?",
    a: "De 2 a 3 rodadas de alterações, conforme o projeto. Você recebe a arte, me passa os ajustes que quer e eu aplico. Assim a peça chega ao resultado final com a sua participação.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Você escolhe a forma que for melhor: à vista, em duas partes (50% para iniciar e 50% na entrega) ou no cartão de crédito pelo Mercado Pago.",
  },
  {
    q: "Atende clientes de outras cidades?",
    a: "Sim. Atendo clientes de todo o Brasil e também de outros países. Todo o atendimento é online, então a distância não faz diferença.",
  },
  {
    q: "Preciso ter uma ideia pronta para começar?",
    a: "Não necessariamente. Se você tiver referências, cores ou exemplos de que gosta, isso ajuda a acertar o caminho mais rápido. Se não tiver, a gente conversa no briefing e eu te ajudo a definir a melhor direção para a sua marca.",
  },
];

/* ---------------------------------------------------------
   ANTES E DEPOIS — comparador deslizante que aparece logo
   abaixo do bloco "Fotos com IA". Use a MESMA pessoa e pose.
   --------------------------------------------------------- */
window.BEFORE_AFTER = {
  before: "assets/img/portfolio/ia-antes.jpg",
  // várias versões criadas a partir da mesma foto (botões acima do comparador)
  afters: [
    { label: "Executivo", src: "assets/img/portfolio/ia-depois-1.jpg" },
    { label: "Leve", src: "assets/img/portfolio/ia-depois-2.jpg" },
    { label: "Sofisticado", src: "assets/img/portfolio/ia-depois-3.jpg" },
  ],
  title: "Da foto comum à foto profissional.",
  text: "A partir de uma única foto simples tirada no celular, eu crio retratos profissionais com Inteligência Artificial em vários estilos, mantendo o seu rosto e a sua expressão. Muda o figurino, a luz e o ambiente, sem precisar de estúdio.",
  note: "Exemplo ilustrativo criado com IA.",
};
