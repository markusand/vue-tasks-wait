<template>
  <transition :name="transition">
    <div v-show="isVisible" class="tasks-wait">
      <slot><div class="spinner" /></slot>
      <ul v-if="!silent" class="tasks-wait__tasks">
        <li v-for="(time, name) in tasks" :key="name">
          {{ formatter(name, time) }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { tasks, isWaiting, isWaitingFor } from './tasks-wait.service';

export default {
  name: 'TasksWait',
  props: {
    transition: { type: String, default: 'fade' },
    task: { type: String, default: undefined },
    silent: { type: Boolean, default: false },
    formatter: { type: Function, default: name => name },
  },
  setup(props) {
    const isVisible = props.task ? isWaitingFor(props.task) : isWaiting;
    return { tasks, isVisible };
  },
};
</script>

<style scoped>
.tasks-wait {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tasks-wait__tasks {
  margin: 0.5em 0 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: 100%;
  left: 50%;
  white-space: nowrap;
  transform: translateX(-50%);
  text-align: center;
}

.spinner {
  display: inline-block;
  border: 4px solid transparent;
  border-top-color: #000;
  border-bottom-color: #000;
  border-radius: 50%;
  padding: 0.75rem;
  animation: spin 1s ease-out infinite;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
