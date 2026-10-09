import test from 'node:test';
import assert from 'node:assert/strict';
import { dateKey, parseDate, monthDays, workWeek } from '../js/dates.js';
import { createMockActivities, validateActivity, sortedActivities } from '../js/activities.js';
import { weeklyRoutine } from '../js/weeklyRoutine.js';

test('calendário começa na segunda e inclui fevereiro bissexto', () => {
  const days = monthDays(2024, 1);
  assert.equal(parseDate(days[0]).getDay(), 1);
  assert.equal(days.length % 7, 0);
  assert.ok(days.includes('2024-02-29'));
  assert.equal(new Set(days).size, days.length);
});
test('semana de trabalho atravessa ano e mantém datas sem conversão UTC', () => {
  assert.deepEqual(workWeek('2027-01-03'), ['2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01']);
  assert.equal(dateKey(parseDate('2026-10-08')), '2026-10-08');
});
test('rotina só existe nos dias úteis; plantas segunda, quarta e sexta', () => {
  assert.equal(weeklyRoutine[0], undefined);
  assert.equal(weeklyRoutine[6], undefined);
  assert.deepEqual(Object.keys(weeklyRoutine).filter(day => weeklyRoutine[day].plants), ['1', '3', '5']);
});
test('formulário rejeita título vazio, data impossível e horário invertido', () => {
  const activity = createMockActivities('2026-10-08')[0];
  assert.equal(validateActivity(activity), '');
  for (const change of [{ title: '  ' }, { activity_date: '2026-02-30' }, { end_time: '08:00' }, { category: 'invalid' }, { status: 'invalid' }, { start_time: '25:00' }]) {
    assert.notEqual(validateActivity({ ...activity, ...change }), '');
  }
  assert.equal(validateActivity({ ...activity, start_time: '', end_time: '' }), '');
});
test('atividades ordenadas por data e horário; sem horário ao final', () => {
  const activities = [{ title: 'C', activity_date: '2026-10-08', start_time: '' }, { title: 'B', activity_date: '2026-10-08', start_time: '14:00' }, { title: 'A', activity_date: '2026-10-08', start_time: '08:00' }];
  assert.deepEqual(sortedActivities(activities).map(item => item.title), ['A', 'B', 'C']);
});
