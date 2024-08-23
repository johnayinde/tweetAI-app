<template>
  <div class="counter-container">
    <h1>Autobot Counter <span>🤖</span></h1>
    <p class="counter">{{ count }}</p>
  </div>
</template>

<script>
import io from "socket.io-client";
const SERVER_URL = "http://localhost:9000/";
const socket = io(SERVER_URL);

export default {
  data() {
    return {
      count: 0,
    };
  },
  created() {
    socket.on("autobotCount", (data) => {
      this.count = data.count;
    });
  },
};
</script>

<style scoped>
.counter-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #42a5f5, #478ed1);
  color: white;
  text-align: center;
  font-family: "Arial", sans-serif;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.counter {
  font-size: 5rem;
  font-weight: bold;
  margin: 0;
  padding: 20px 40px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
