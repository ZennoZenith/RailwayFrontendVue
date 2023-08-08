<script setup lang="ts">
import TrainsbtwstationsForm from '@/components/TrainsbtwstationsForm.vue'
</script>

<template>
  <main>
    <section class="tbs-section">
      <TrainsbtwstationsForm />
    </section>
  </main>
</template>

<style scoped>
.tbs-section {
  margin-top: 1em;
  padding: 1em;
  padding-top: 2em;
  width: 100%;
  /* height: 50vh; */
  min-height: 20em;
  background-color: var(--white);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}
</style>
