/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitForElementToBeRemoved } from '@testing-library/vue';
import TasksWait from '../src/TasksWait.vue';
import { tasks, startWait, finishWait } from '/@/tasks-wait.service';

describe('TasksWait component', () => {
  beforeEach(() => finishWait(Object.keys(tasks)));

  it('should display/hide spinner', async () => {
    const { findByRole, queryByText } = render(TasksWait);

    startWait('task');
    await findByRole('status');
    const task = queryByText('task');
    finishWait('task');
    await waitForElementToBeRemoved(task);
  });

  it('should format tasks list', async () => {
    const names = { task: 'Waiting for task to complete...' };
    const props = { formatter: name => names[name] };
    const { findByText } = render(TasksWait, { props });
    startWait('task');
    await findByText(names.task);
  });

  it('should display spinner but not tasks list (silent)', async () => {
    const props = { silent: true };
    const { findByRole, queryByText } = render(TasksWait, { props });
    startWait('task');
    await findByRole('status');
    expect(queryByText('task')).toBeNull();
  });

  it('should only display allowed tasks (if defined)', async () => {
    const props = { task: 'task' };
    const { findByRole, queryByText } = render(TasksWait, { props });
    startWait('task');
    startWait('other');
    await findByRole('status');
    expect(queryByText('task')).toBeTruthy();
    expect(queryByText('other')).toBeNull();
  });
});
