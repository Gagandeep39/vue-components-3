<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <!-- Allows accessing goal from parent -->
      <slot :item="goal"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      goals: ["My name is Gagan", "Come say Hi <3"],
    };
  },
};
</script>

<style scoped>
ul {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  list-style: none;
}
li {
  padding-left: 2rem;
}
</style>
