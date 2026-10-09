import { dateKey, parseDate, workWeek } from './dates.js';
export const categories = {
  planning: 'Planejamento', project: 'Projeto', service: 'Atendimento', school_visit: 'Visita à escola',
  meeting: 'Reunião', event: 'Evento', maintenance: 'Manutenção', administrative: 'Administrativo', other: 'Outro'
};
export const statuses = { planned: 'Planejada', in_progress: 'Em andamento', completed: 'Concluída', cancelled: 'Cancelada' };
export function createMockActivities(today) {
  const week = workWeek(today);
  return [
    { id: 'demo-1', title: 'Reunião de planejamento da equipe', activity_date: week[0], start_time: '09:00', end_time: '10:00', category: 'planning', status: 'completed', responsible: 'Equipe DCT', description: 'Definição das prioridades e distribuição das demandas da semana.' },
    { id: 'demo-2', title: 'Desenvolvimento do projeto de robótica', activity_date: week[1], start_time: '14:00', end_time: '16:00', category: 'project', status: 'in_progress', responsible: 'Equipe DCT', description: 'Organização de materiais e preparação das oficinas com as escolas.' },
    { id: 'demo-3', title: 'Atendimento aos professores', activity_date: week[2], start_time: '10:00', end_time: '11:00', category: 'service', status: 'planned', responsible: 'Equipe DCT', description: 'Orientações sobre projetos de Ciência e Tecnologia.' },
    { id: 'demo-4', title: 'Visita à Escola Municipal João XXIII', activity_date: week[3], start_time: '08:30', end_time: '10:00', category: 'school_visit', status: 'planned', responsible: 'Equipe DCT', description: 'Acompanhamento do projeto de robótica.' },
    { id: 'demo-5', title: 'Balanço das atividades da semana', activity_date: week[4], start_time: '15:00', end_time: '16:00', category: 'meeting', status: 'planned', responsible: 'Equipe DCT', description: 'Avaliação das ações realizadas e organização das pendências.' }
  ];
}
export function sortedActivities(activities) {
  return [...activities].sort((a, b) => `${a.activity_date} ${a.start_time || '99:99'}`.localeCompare(`${b.activity_date} ${b.start_time || '99:99'}`) || a.title.localeCompare(b.title, 'pt-BR'));
}
export function validateActivity(activity) {
  if (!activity.title?.trim()) return 'Informe o título da atividade.';
  if (activity.title.length > 160) return 'O título deve ter até 160 caracteres.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(activity.activity_date || '') || activity.activity_date < '1900-01-01' || dateKey(parseDate(activity.activity_date)) !== activity.activity_date) return 'Informe uma data válida.';
  if (!Object.hasOwn(categories, activity.category)) return 'Selecione uma categoria válida.';
  if (!Object.hasOwn(statuses, activity.status)) return 'Selecione um status válido.';
  for (const time of [activity.start_time, activity.end_time]) {
    if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return 'Informe um horário válido.';
  }
  if (activity.start_time && activity.end_time && activity.end_time < activity.start_time) return 'O horário final não pode ser anterior ao horário inicial.';
  return '';
}
