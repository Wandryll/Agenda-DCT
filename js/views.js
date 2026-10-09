import { formatDate, parseDate, workWeek } from './dates.js';
import { weeklyRoutine } from './weeklyRoutine.js';
import { sortedActivities } from './activities.js';
import { element, activityButton } from './ui.js';
export function renderDay(selected, activities, onEdit) {
  document.querySelector('#day-heading').textContent = formatDate(selected, { day: 'numeric', month: 'long', year: 'numeric' });
  document.querySelector('#day-weekday').textContent = formatDate(selected, { weekday: 'long' });
  const routine = weeklyRoutine[parseDate(selected).getDay()];
  const container = document.querySelector('#day-routine');
  container.replaceChildren();
  if (routine) {
    const block = element('div', 'routine');
    block.append(element('p', 'eyebrow', 'ROTINA PADRÃO'), element('h3', '', routine.title), element('p', '', routine.description));
    if (routine.plants) block.append(element('span', 'plants', `🌱 ${routine.plants}`));
    container.append(block);
  } else container.append(element('p', 'empty', 'Sem rotina padrão aos sábados e domingos.'));
  const dayActivities = sortedActivities(activities.filter(activity => activity.activity_date === selected));
  document.querySelector('#day-count').textContent = dayActivities.length;
  const list = document.querySelector('#day-activities');
  list.replaceChildren(...dayActivities.map(activity => activityButton(activity, onEdit)));
  if (!dayActivities.length) list.append(element('p', 'empty', 'Nenhuma atividade cadastrada para este dia.'));
}
export function renderWeek(today, activities, onEdit, onCreate) {
  const dates = workWeek(today);
  document.querySelector('#week-period').textContent = `Semana de ${formatDate(dates[0])} até ${formatDate(dates[4])}`;
  const container = document.querySelector('#weekly-days');
  container.replaceChildren();
  dates.forEach(key => {
    const routine = weeklyRoutine[parseDate(key).getDay()];
    const day = element('article', `week-day${key === today ? ' is-today' : ''}`);
    const heading = element('div', 'week-day-heading');
    heading.append(element('strong', '', formatDate(key, { weekday: 'short' }).replace('.', '')), element('span', '', formatDate(key, { day: '2-digit', month: '2-digit' })));
    const block = element('div', 'week-routine');
    block.append(element('p', 'eyebrow', 'ROTINA PADRÃO'), element('h3', '', routine.title));
    if (routine.plants) block.append(element('span', 'plants', `🌱 ${routine.plants}`));
    day.append(heading, block);
    const items = sortedActivities(activities.filter(activity => activity.activity_date === key));
    items.forEach(activity => day.append(activityButton(activity, onEdit, true)));
    if (!items.length) day.append(element('p', 'empty', 'Nenhuma atividade cadastrada.'));
    const add = element('button', 'week-add', '+ Atividade');
    add.type = 'button';
    add.setAttribute('aria-label', `Adicionar atividade em ${formatDate(key)}`);
    add.addEventListener('click', () => onCreate(key));
    day.append(add);
    container.append(day);
  });
}
export function renderList(year, month, activities, onEdit) {
  const items = sortedActivities(activities.filter(activity => { const date = parseDate(activity.activity_date); return date.getFullYear() === year && date.getMonth() === month; }));
  document.querySelector('#total-count').textContent = `${items.length} atividade${items.length === 1 ? '' : 's'}`;
  const container = document.querySelector('#activity-list');
  container.replaceChildren();
  items.forEach(activity => {
    const button = activityButton(activity, onEdit);
    button.prepend(element('span', 'list-date', formatDate(activity.activity_date)));
    container.append(button);
  });
  if (!items.length) container.append(element('p', 'empty', 'Nenhuma atividade encontrada neste mês.'));
}
