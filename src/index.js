// Library entry point
import * as Service from './tasks-wait.service';
import TasksWait from './TasksWait.vue';

const { tasks, startWait, finishWait, waitTask, isWaiting, isWaitingFor } = Service;

export { TasksWait, tasks, startWait, finishWait, waitTask, isWaiting, isWaitingFor };

export default {
  install: app => {
    app.component(TasksWait.name, TasksWait);
    app.provide('wait', Service);
  },
};
