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

<style></style>
