# ND Soluções Criativas — novo site / portfólio

Site estático (HTML + CSS + JavaScript puro, sem dependências e sem build).
Abra o `index.html` no navegador para ver, ou publique a pasta inteira em qualquer hospedagem
(Hostinger, HostGator, Vercel, Netlify, GitHub Pages…).

## Seções
1. **Topo com vídeo de fundo** + palavras animadas + botões (portfólio / WhatsApp)
2. **Faixa de serviços** em movimento
3. **Sobre** com números animados
4. **Serviços** em cartões com efeito 3D e brilho que segue o mouse
5. **Portfólio** com filtros por categoria e visualização em tela cheia (lightbox)
6. **Showreel**: botão de play que abre vídeo do YouTube/Vimeo/MP4
7. **Processo** em 4 etapas com linha animada
8. **Depoimentos** em carrossel (arrastável no celular)
9. **Contato**: formulário que monta a mensagem e abre o WhatsApp
10. Rodapé, botão flutuante do WhatsApp, barra de progresso de leitura, cursor personalizado,
    pré-carregamento e menu mobile em tela cheia.

## Como personalizar
| O quê | Onde |
|---|---|
| WhatsApp, e-mail, Instagram, showreel | `js/data.js` → `SITE_CONFIG` |
| Projetos do portfólio e categorias | `js/data.js` → `PROJECTS` / `CATEGORIES` |
| Depoimentos | `js/data.js` → `TESTIMONIALS` |
| Cores da marca | `css/style.css` → variáveis `--accent`, `--accent-2`, `--accent-3` no topo |
| Textos (slogan, sobre, serviços, processo) | `index.html` |
| Números (projetos, clientes, anos) | `index.html` → atributos `data-count` |
| Vídeo do topo | `assets/video/hero.mp4` (veja `assets/video/LEIA-ME.md`) |
| Imagens / logo | `assets/img/` (veja `assets/img/LEIA-ME.md`) |

> ⚠️ Antes de publicar: troque os textos de exemplo, os projetos fictícios ("Nome do Projeto…"),
> os números e principalmente os **depoimentos**, que devem ser de clientes reais.

## Acessibilidade e desempenho
- Respeita a opção "reduzir movimento" do sistema (desliga animações e vídeo automático).
- Efeitos de mouse só no computador; no celular o layout é otimizado para toque.
- Imagens do portfólio com carregamento preguiçoso (`loading="lazy"`).
