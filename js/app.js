import { todayKey, parseDate } from './dates.js';
import { createMockActivities } from './activities.js';
import { renderCalendar } from './calendar.js';
import { renderDay, renderWeek, renderList } from './views.js';
import { setupModal } from './modal.js';
import { showToast } from './ui.js';
const today = todayKey();
let selected = today;
let displayed = parseDate(today);
let activities = createMockActivities(today);
const openModal = setupModal((activity, editing) => {
  activities = editing ? activities.map(item => item.id === activity.id ? activity : item) : [...activities, activity];
  selected = activity.activity_date;
  displayed = parseDate(selected);
  render();
  showToast(editing ? 'Atividade atualizada.' : 'Atividade adicionada com sucesso.');
}, id => {
  activities = activities.filter(activity => activity.id !== id);
  render();
  showToast('Atividade excluída.');
});
const onEdit = activity => openModal(activity.activity_date, activity);
function render() {
  const year = displayed.getFullYear();
  const month = displayed.getMonth();
  renderCalendar({ year, month, selected, today, activities, onSelect: key => {
    selected = key;
    displayed = parseDate(key);
    render();
    document.querySelector(`[data-date="${key}"]`)?.focus({ preventScroll: true });
  } });
  renderDay(selected, activities, onEdit);
  renderWeek(today, activities, onEdit, key => openModal(key));
  renderList(year, month, activities, onEdit);
}
function changeMonth(offset) {
  displayed = new Date(displayed.getFullYear(), displayed.getMonth() + offset, 1, 12);
  render();
}
document.querySelector('#previous-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));
document.querySelector('#today').addEventListener('click', () => { selected = today; displayed = parseDate(today); render(); });
document.querySelector('#new-activity').addEventListener('click', () => openModal(selected));
document.querySelector('#add-to-day').addEventListener('click', () => openModal(selected));
render();
