# Arquitetura — Desperta Members V1.3

- **Frontend:** Next.js 16 / React 19.
- **Hospedagem:** Vercel.
- **Banco e autenticação:** Supabase.
- **Domínio:** membros.eusouvanessavieira.com.br.
- **Autorização:** RLS + checagem de matrícula no servidor.

## Regra de acesso
Uma matrícula concede conteúdo quando:
- `status` é `active` ou `completed`; e
- `expires_at` é nulo ou está no futuro.

`paused`, `cancelled`, matrícula removida ou validade vencida não liberam conteúdo.

O bloqueio é aplicado no banco para programas, módulos, aulas, materiais e eventos vinculados a um programa. Portanto, esconder um card não é a única proteção: uma URL direta também é negada.
