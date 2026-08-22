export const CONTENT_TYPES = {
  course: { label: 'Curso', accessLabel: 'Acessar curso', continueLabel: 'Continuar curso' },
  mentoring: { label: 'Mentoria', accessLabel: 'Acessar mentoria', continueLabel: 'Continuar mentoria' },
  immersion: { label: 'Imersão', accessLabel: 'Acessar imersão', continueLabel: 'Continuar imersão' },
  training: { label: 'Treinamento', accessLabel: 'Acessar treinamento', continueLabel: 'Continuar treinamento' },
  event: { label: 'Evento', accessLabel: 'Acessar evento', continueLabel: 'Acessar evento' },
  community: { label: 'Comunidade', accessLabel: 'Acessar comunidade', continueLabel: 'Acessar comunidade' },
}

export function getContentType(type) {
  return CONTENT_TYPES[type] || CONTENT_TYPES.course
}
