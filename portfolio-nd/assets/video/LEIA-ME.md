# Vídeo do topo (hero)

Coloque aqui o vídeo de fundo do topo do site com o nome **`hero.mp4`** (e, se quiser, também `hero.webm`, que é mais leve).

Recomendações:
- 10 a 20 segundos, em loop, **sem áudio** (o navegador só toca vídeo automático se estiver mudo);
- 1920×1080 (ou 1280×720), menos de 5 MB;
- imagens dos seus projetos, bastidores, motion do logo etc.

Para comprimir com o ffmpeg:

```bash
ffmpeg -i original.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4
ffmpeg -i original.mov -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 38 -b:v 0 hero.webm
```

Enquanto não houver vídeo, o site mostra automaticamente um fundo animado com as cores da marca.

O **showreel** (botão de play no meio da página) é configurado em `js/data.js` → `showreel`
(link do YouTube/Vimeo no formato embed, ou um MP4 desta pasta).
