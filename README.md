# Vue Tasks Wait

Keep track of async tasks and wait for them to complete

## Setup

Install from npm

```bash
npm install vue-tasks-wait
```

## Usage

Include basic styles in your project js or (s)css entry point

```js
import 'vue-tasks-wait/dist/style.css'
```

Import TasksWait spinner component and waiting methods

```html
<template>
  <section>
    <!-- Trigger any async task -->
    <button @click="triggerTask">Trigger task</button>

    <!-- Add the default spinner -->
    <tasks-wait />
  </section>
</template>

<script>
import { TasksWait, waitTask } from 'vue-tasks-wait';

export default {
  name: 'App',
  components: { TasksWait },
  setup() {
    const triggerTask = waitTask(async () => {
      // Some async logic, e.g. fetching data from an API, using `await`
    }, 'task-name');

    return { triggerTask };
  },
};
```

## Methods

### waitTask(task, name)

Register an asynchronous function to wait for. Set an optional name to track it individualy.

```js
const login = waitTask(async () => {
  const result = await fetch('/api/login');
  const data = await result.json();
  saveUserData(data);
}, 'login-user');
```

### isWaiting

Computed property to check if there is any task in progress

```js
const status = computed(() => isWaiting.value ? 'Loading...' : 'Ready');
```

### isWaitingFor(name)

Computed property to check if a specific task is in progress

```js
const showCancelButton = isWaitingFor('login-user');
```

### startWait(name) / finishWait(name)

Programaticaly start and finish a watcher and toggle the spinner
