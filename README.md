# Desperta Members V1.5

Atualização da Área de Membros Desperta com foco em gestão de alunas e ativação de senha.

## V1.5

- Alterar nome, e-mail e telefone da aluna no painel administrativo.
- Enviar/re-enviar link para criação ou redefinição de senha pelo Admin.
- Excluir aluna permanentemente com confirmação explícita.
- Exclusão da conta no Supabase Auth, com cascata para perfil, matrículas e progresso conforme o schema.
- Convites novos redirecionam diretamente para `/definir-senha`.
- Recuperação de senha redireciona para `/definir-senha`.
- `/definir-senha` é pública para permitir que o navegador conclua links com sessão no fragmento da URL.
- `/auth/callback` também encaminha links antigos para a tela de criação de senha.
- Erros esperados nas ações administrativas voltam como mensagens na interface, evitando páginas genéricas de erro.

Nenhuma migration SQL adicional é necessária para esta versão.
