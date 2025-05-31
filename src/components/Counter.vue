<!-- src/components/Counter.vue -->
<template>
  <div>
    <p>Contador: {{ counter.count }}</p>
    <button @click="counter.increment">Incrementar</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../store/counter'

const counter = useCounterStore()
</script>
