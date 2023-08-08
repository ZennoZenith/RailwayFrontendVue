<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useHamburgerStore } from '@/stores/hamburgerState'
const hamburger = useHamburgerStore()

function range(start: number, end: number) {
  if (!end) {
    end = start
    start = 0
  }
  start -= 1
  end -= 1
  let arr = []
  while (start++ !== end) {
    arr.push(start)
  }
  return arr
}
</script>

<template>
  <Transition>
    <nav v-if="hamburger.isHamburgerOpen" :class="{ open: hamburger.isHamburgerOpen }">
      <section>
        <ul>
          <li>
            <RouterLink class="link overflow-clip" to="/">Home</RouterLink>
          </li>
        </ul>
      </section>

      <section>
        <h3 class="overflow-clip">Train Services</h3>
        <ul>
          <li>
            <RouterLink class="link overflow-clip" to="/">Trains Between stations</RouterLink>
          </li>
          <li>
            <RouterLink class="link overflow-clip" to="/schedule">Train Schedule</RouterLink>
          </li>
          <li>
            <RouterLink class="link overflow-clip" to="/train">Train Info </RouterLink>
          </li>
          <li>
            <RouterLink class="link overflow-clip" to="/station">Station Info</RouterLink>
          </li>
        </ul>
      </section>

      <!-- <section v-for="i in range(1, 100)" :key="i">
        <h3 class="overflow-clip">Train Facts</h3>
      </section> -->
    </nav>
  </Transition>
</template>

<style scoped>
nav {
  background-color: var(--white);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: absolute;
  right: 1em;
  top: calc(var(--header-height) - 10px);
  width: 60vw;

  /* TODO: Change height according to list size */
  height: 40vh;
  /* max-height: 90vh; */
  transform-origin: top right;
  transform: scale(1);
  padding: 1em;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 0.5rem;
  /* overflow: auto; */
  --transistion-time: 0.4s;
}

section {
  padding: 10px 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity var(--transistion-time) ease, width var(--transistion-time) ease,
    height var(--transistion-time) ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Works on Firefox */
nav {
  scrollbar-width: thin;
}

/* Works on Chrome, Edge, and Safari */
nav::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
nav::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eee;
  box-shadow: 0 0 1px 1px #bbb, inset 0 0 7px rgba(0, 0, 0, 0.3);
}
nav::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(left, #96a6bf, #63738c);
  box-shadow: inset 0 0 1px 1px #5c6670;
}
nav::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(left, #8391a6, #536175);
}

nav {
  font-family: 'Kreon', serif;
  font-family: 'Roboto Mono', monospace;
  color: rgb(136, 147, 180);
}

h3 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: rgb(52, 60, 83);
}

.link {
  display: block;
  padding: 10px 0;
  text-decoration: none;
  color: inherit;
  font-size: smaller;
}
.link:hover {
  color: rgb(98, 113, 157);
}

ul {
  list-style: none;
}
</style>
