export const demoProfile={id:'demo-user',full_name:'Edilson Pereira',email:'demo@desperta.com.br',role:'student',avatar_url:null}
export const demoPrograms=[
 {id:'11111111-1111-1111-1111-111111111111',slug:'formula-gestao-vendas',title:'Fórmula Gestão & Vendas',subtitle:'A fórmula que transforma gestão em lucro.',description:'Um programa prático para fortalecer gestão, posicionamento e processo comercial.',cover_url:'/formula-gestao-vendas.png',status:'published',content_type:'course',catalog_visible:true,access_state:'active',progress:32,total_lessons:12,completed_lessons:4,enrolled:true},
 {id:'22222222-2222-2222-2222-222222222222',slug:'conexao-vendas',title:'Conexão & Vendas',subtitle:'Relacionamento que gera vendas.',description:'Aprenda a construir conexão, conversas e oportunidades com mais intenção.',cover_url:null,status:'coming_soon',content_type:'immersion',catalog_visible:true,access_state:'coming_soon',progress:0,total_lessons:0,completed_lessons:0,enrolled:false},
 {id:'33333333-3333-3333-3333-333333333333',slug:'mentoria-cad',title:'Mentoria CAD',subtitle:'Crescimento, Ação e Direção.',description:'Acompanhamento estratégico para transformar decisão em execução.',cover_url:null,status:'published',content_type:'mentoring',catalog_visible:true,access_state:'locked',progress:0,total_lessons:0,completed_lessons:0,enrolled:false}
]
export const demoModules=[
 {id:'m1',title:'Módulo 1 — Comece por aqui',description:'Boas-vindas e fundamentos.',position:1,lessons:[
  {id:'l1',title:'Seja bem-vinda!',duration_seconds:133,position:1,is_completed:true,video_url:'',summary:'Conheça a jornada e como aproveitar o programa.'},
  {id:'l2',title:'Como tudo começou',duration_seconds:522,position:2,is_completed:true,video_url:'',summary:'A origem do método e os pilares da transformação.'}
 ]},
 {id:'m2',title:'Módulo 2 — Mentalidade e Posicionamento',description:'Mentalidade, protagonismo e decisão.',position:2,lessons:[
  {id:'l3',title:'Posicionamento de Mentalidade — A Lei da Atração',duration_seconds:860,position:1,is_completed:false,is_current:true,video_url:'',summary:'Ação e implementação a partir de uma mentalidade posicionada.'},
  {id:'l4',title:'A Força do Protagonismo',duration_seconds:638,position:2,is_completed:false,video_url:'',summary:'Responsabilidade, escolhas e direção.'},
  {id:'l5',title:'Crenças no Processo de Vendas',duration_seconds:740,position:3,is_completed:false,video_url:'',summary:'Crenças limitantes e potencializadoras na prática comercial.'}
 ]},
 {id:'m3',title:'Módulo 3 — Processo de Vendas',description:'Da abordagem ao fechamento.',position:3,lessons:[
  {id:'l6',title:'Vendas — Sondagem',duration_seconds:702,position:1,is_completed:false,video_url:'',summary:'Como compreender necessidades antes de oferecer.'},
  {id:'l7',title:'Abordagem com intenção',duration_seconds:690,position:2,is_completed:false,video_url:'',summary:'Início de conversa com clareza e respeito.'}
 ]}
]
export const demoEvents=[
 {id:'e1',title:'Encontro ao vivo — Direção para vender com constância',starts_at:'2026-08-27T19:00:00-03:00',location_type:'online',location_label:'Google Meet',status:'scheduled'},
 {id:'e2',title:'Plantão de dúvidas — Fórmula Gestão & Vendas',starts_at:'2026-09-03T19:00:00-03:00',location_type:'online',location_label:'Google Meet',status:'scheduled'}
]
export const demoMaterials=[
 {id:'mat1',title:'Workbook — Mentalidade e Posicionamento',description:'Exercícios da etapa de posicionamento.',file_url:'#',file_type:'PDF',program_title:'Fórmula Gestão & Vendas'},
 {id:'mat2',title:'Checklist — Processo de Vendas',description:'Checklist rápido para aplicar antes das conversas comerciais.',file_url:'#',file_type:'PDF',program_title:'Fórmula Gestão & Vendas'},
 {id:'mat3',title:'Plano de Ação — 30 dias',description:'Organize prioridades, metas e execução.',file_url:'#',file_type:'PDF',program_title:'Desperta Empreendedora'}
]
export const demoCertificates=[
 {id:'c1',program_title:'Fórmula Gestão & Vendas',status:'in_progress',progress:32,issued_at:null,file_url:null},
 {id:'c2',program_title:'Aula de Impulsionamento',status:'available',progress:100,issued_at:'2026-07-10',file_url:'#'}
]
export const demoAnnouncements=[{id:'a1',title:'Bem-vinda à nova Área Desperta',body:'Sua jornada, materiais e encontros em um só lugar.',published_at:'2026-08-21'}]
