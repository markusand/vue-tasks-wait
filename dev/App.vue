<template>
  <section>
    <button @click="triggerTask">ActivateTask</button>
    <button v-if="isActive" @click="finishWait('wait')">Stop wait</button>
    <button v-else @click="startWait('wait')">Start wait</button>

    <tasks-wait :formatter="formatter" />
  </section>
</template>

<script>
import { inject } from 'vue';

const wait = ms => new Promise(resolve => { setTimeout(resolve, ms); });

const dictionary = {
  wait: 'Waiting to be stopped...',
  task: 'Waiting task to finish...',
};

export default {
  name: 'App',
  setup() {
    const { waitTask, startWait, finishWait, isWaitingFor } = inject('wait');

    const triggerTask = waitTask(async () => {
      await wait(5000);
    }, 'task');

    const formatter = name => dictionary[name];
    const isActive = isWaitingFor('wait');

    return { startWait, finishWait, triggerTask, formatter, isActive };
  },
};
</script>
