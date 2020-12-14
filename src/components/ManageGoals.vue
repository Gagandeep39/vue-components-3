<template>
  <div>
    <h1>Manage Goals</h1>
    <input ref="goal" />
    <button @click="setGoal">Set goal</button>
  </div>
  <teleport to="body">
    <error-alert v-if="dataIsInvalid">
      <h2>Input is invalid!</h2>
      <p>Enter few characters</p>
      <button @click="confirmError">Ok</button>
    </error-alert>
  </teleport>
</template>

<script>
import ErrorAlert from "./ErrorAlert.vue";
export default {
  components: { ErrorAlert },
  data() {
    return {
      dataIsInvalid: false,
    };
  },
  methods: {
    setGoal() {
      const enteredValue = this.$refs.goal.value;
      if (enteredValue === "") this.dataIsInvalid = true;
      else {
        this.dataIsInvalid = false;
      }
    },
    confirmError() {
      this.dataIsInvalid = false;
    },
  },
};
</script>

<style></style>
