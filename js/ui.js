import { categories, statuses } from './activities.js';
export function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
export function activityButton(activity, onEdit, compact = false) {
  const button = element('button', 'activity-item');
  button.type = 'button';
  button.setAttribute('aria-label', `Editar ${activity.title}`);
  button.append(element('span', 'activity-time', activity.start_time || '—'));
  const copy = element('span', 'activity-copy');
  copy.append(element('span', 'activity-title', activity.title), element('span', 'activity-meta', categories[activity.category] + (activity.responsible && !compact ? ` · ${activity.responsible}` : '')));
  button.append(copy);
  if (!compact) button.append(element('span', `status ${activity.status}`, statuses[activity.status]));
  else copy.append(element('span', 'activity-meta', statuses[activity.status]));
  button.addEventListener('click', () => onEdit(activity));
  return button;
}
let toastTimer;
export function showToast(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
}
