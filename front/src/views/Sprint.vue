<template>
  <div class="sprint">
    <v-container>
      <div class="text-background">
        <h1 class="anounce">스프린트 목록</h1>
        <h2 class="anounce mb-3">당신만의 스프린트를 작성해서 목표 물건을 쟁취하세요!</h2>
        <SprintCreate />
      </div>
      <SprintList />
    </v-container>
  </div>
</template>

<script>
import SprintCreate from "@/components/sprint/SprintCreate.vue";
import SprintList from "@/components/sprint/SprintList.vue";

export default {
  name: "Sprint",
  components: {
    SprintCreate,
    SprintList,
  },
};
</script>

<style>
.sprint {
  background-image: url("https://user-images.githubusercontent.com/60081201/101987178-d558cf80-3cd5-11eb-8920-87610c0166e6.jpg");
  background-attachment: fixed;
  /* background-origin: border-box; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
.text-background {
  padding-top: 10px;
  padding-bottom: 30px;
  margin-top: 12px;
  background-color: whitesmoke;

  background-color: rgba(255, 255, 255, 0.5);
}
</style>
