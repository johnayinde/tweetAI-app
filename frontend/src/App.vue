<template>
  <div id="app">
    <RealTimeCounter />
  </div>
</template>

<script>
import RealTimeCounter from "./components/RealTimeCounter.vue";

export default {
  components: {
    RealTimeCounter,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Arial", sans-serif;
}

#app {
  height: 100vh;
}
</style>
