import { monthDays, parseDate, formatDate } from './dates.js';
import { element } from './ui.js';
export function renderCalendar({ year, month, selected, today, activities, onSelect }) {
  document.querySelector('#month-label').textContent = new Date(year, month, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const calendar = document.querySelector('#calendar');
  calendar.replaceChildren();
  const counts = new Map();
  activities.forEach(activity => counts.set(activity.activity_date, (counts.get(activity.activity_date) || 0) + 1));
  for (const key of monthDays(year, month)) {
    const date = parseDate(key);
    const button = element('button', 'calendar-day');
    button.type = 'button';
    if (date.getMonth() !== month) button.classList.add('outside');
    if (key === today) { button.classList.add('today'); button.setAttribute('aria-current', 'date'); }
    if (key === selected) button.classList.add('selected');
    button.setAttribute('aria-pressed', String(key === selected));
    button.setAttribute('aria-label', `${formatDate(key, { dateStyle: 'full' })}${counts.has(key) ? `, ${counts.get(key)} atividade(s)` : ', sem atividades'}`);
    button.dataset.date = key;
    button.append(element('span', 'date-number', date.getDate()));
    if (counts.has(key)) button.append(element('span', 'day-indicator', counts.get(key)));
    button.addEventListener('click', () => onSelect(key));
    calendar.append(button);
  }
}
