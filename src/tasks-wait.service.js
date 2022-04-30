import { reactive, computed, readonly } from 'vue';

const unique = () => Math.random().toString(36).substring(2);

const state = reactive({});

export const tasks = readonly(state);

export const startWait = (name = unique()) => {
  state[name] = Date.now();
  return name;
};

export const finishWait = name => {
  if (Array.isArray(name)) name.forEach(finishWait);
  else delete state[name];
};

export const waitTask = (task, name = unique()) => (...attrs) => {
  startWait(name);
  return task(...attrs).finally(result => {
    finishWait(name);
    return result;
  });
};

export const isWaiting = computed(() => !!Object.keys(state).length);
export const isWaitingFor = name => computed(() => !!state[name]);
