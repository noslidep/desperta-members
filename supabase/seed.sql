-- Conteúdo inicial de demonstração (não cria usuários)
insert into public.programs(id,slug,title,subtitle,description,cover_url,status,position) values
('11111111-1111-1111-1111-111111111111','formula-gestao-vendas','Fórmula Gestão & Vendas','A fórmula que transforma gestão em lucro.','Programa prático para gestão, posicionamento e vendas.','/formula-gestao-vendas.png','published',1)
on conflict(id) do nothing;
insert into public.modules(id,program_id,title,description,position,status) values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','11111111-1111-1111-1111-111111111111','Comece por aqui','Boas-vindas e fundamentos.',1,'published'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','11111111-1111-1111-1111-111111111111','Mentalidade e Posicionamento','Mentalidade, protagonismo e decisão.',2,'published'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3','11111111-1111-1111-1111-111111111111','Processo de Vendas','Da abordagem ao fechamento.',3,'published')
on conflict(id) do nothing;
insert into public.lessons(id,program_id,module_id,title,summary,position,duration_seconds,status) values
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb001','11111111-1111-1111-1111-111111111111','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','Seja bem-vinda!','Conheça a jornada e como aproveitar o programa.',1,133,'published'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb002','11111111-1111-1111-1111-111111111111','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1','Como tudo começou','A origem do método e os pilares da transformação.',2,522,'published'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb003','11111111-1111-1111-1111-111111111111','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','Posicionamento de Mentalidade — A Lei da Atração','Ação e implementação a partir de uma mentalidade posicionada.',1,860,'published'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb004','11111111-1111-1111-1111-111111111111','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','A Força do Protagonismo','Responsabilidade, escolhas e direção.',2,638,'published'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb005','11111111-1111-1111-1111-111111111111','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2','Crenças no Processo de Vendas','Crenças limitantes e potencializadoras na prática comercial.',3,740,'published'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbb006','11111111-1111-1111-1111-111111111111','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3','Vendas — Sondagem','Como compreender necessidades antes de oferecer.',1,702,'published')
on conflict(id) do nothing;
insert into public.events(title,starts_at,location_type,location_label,status) values
('Encontro ao vivo — Direção para vender com constância','2026-08-27 19:00:00-03','online','Google Meet','scheduled'),
('Plantão de dúvidas — Fórmula Gestão & Vendas','2026-09-03 19:00:00-03','online','Google Meet','scheduled');
insert into public.announcements(title,body,status,published_at) values('Bem-vinda à nova Área Desperta','Sua jornada, materiais e encontros em um só lugar.','published',now());
