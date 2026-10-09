import { categories, statuses, validateActivity } from './activities.js';
export function setupModal(onSave, onDelete) {
  const dialog = document.querySelector('#activity-dialog');
  const form = document.querySelector('#activity-form');
  const deleteDialog = document.querySelector('#delete-dialog');
  const error = document.querySelector('#form-error');
  const deleteButton = document.querySelector('#delete-activity');
  let editing = null;
  Object.entries(categories).forEach(([value, text]) => form.elements.category.append(new Option(text, value)));
  Object.entries(statuses).forEach(([value, text]) => form.elements.status.append(new Option(text, value)));
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const activity = Object.fromEntries(new FormData(form));
    Object.keys(activity).forEach(key => { activity[key] = activity[key].trim(); });
    error.textContent = validateActivity(activity);
    if (error.textContent) return;
    const now = new Date().toISOString();
    onSave({ ...activity, id: editing?.id || crypto.randomUUID(), created_at: editing?.created_at || now, updated_at: now }, Boolean(editing));
    dialog.close();
  });
  deleteButton.addEventListener('click', () => {
    document.querySelector('#delete-description').textContent = `Deseja excluir “${editing.title}”?`;
    deleteDialog.showModal();
    document.querySelector('#cancel-delete').focus();
  });
  document.querySelector('#cancel-delete').addEventListener('click', () => deleteDialog.close());
  document.querySelector('#confirm-delete').addEventListener('click', () => {
    onDelete(editing.id);
    deleteDialog.close();
    dialog.close();
  });
  return (date, activity = null) => {
    editing = activity;
    form.reset();
    error.textContent = '';
    document.querySelector('#modal-title').textContent = activity ? 'Editar atividade' : 'Nova atividade';
    deleteButton.hidden = !activity;
    if (activity) Object.keys(activity).forEach(key => { if (form.elements.namedItem(key)) form.elements.namedItem(key).value = activity[key] || ''; });
    else { form.elements.activity_date.value = date; form.elements.responsible.value = 'Equipe DCT'; }
    dialog.showModal();
    form.elements.title.focus();
  };
}
