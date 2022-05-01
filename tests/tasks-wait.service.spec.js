/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { describe, it, expect, beforeEach } from 'vitest';
import { tasks, waitTask, startWait, finishWait, isWaiting, isWaitingFor } from '/@/tasks-wait.service';

const wait = ms => new Promise(resolve => { setTimeout(resolve, ms); });

describe('TaskWait Service', () => {
  beforeEach(() => finishWait(Object.keys(tasks)));

  it('should start and stop a named wait', () => {
    startWait('task');
    expect(tasks).toHaveProperty('task');
    finishWait('task');
    expect(tasks).not.toHaveProperty('task');
  });

  it('should start and stop an anonymous wait', () => {
    const name = startWait();
    expect(tasks).toHaveProperty(name);
    finishWait(name);
    expect(tasks).not.toHaveProperty('task');
  });

  it('should wait for an async task', async () => {
    const trigger = waitTask(async () => {
      await wait(10);
    }, 'task');
    trigger();
    expect(tasks).toHaveProperty('task');
    await wait(15);
    expect(tasks).not.toHaveProperty('task');
  });

  it('should change state of waiting watchers', () => {
    expect(isWaiting.value).toBeFalsy();
    startWait('task');
    expect(isWaiting.value).toBeTruthy();
    expect(isWaitingFor('task').value).toBeTruthy();
    expect(isWaitingFor('other').value).toBeFalsy();
    finishWait('task');
    expect(isWaiting.value).toBeFalsy();
  });
});
