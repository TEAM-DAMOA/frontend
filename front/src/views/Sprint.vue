<template>
  <div class="sprint">
    <v-container>
      <SprintCreate />
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
      SprintList
    }

}
</script>

<style>
.sprint {
  background-image: url("https://user-images.githubusercontent.com/60081201/101968390-4eb6da80-3c62-11eb-9f54-080617ecb215.jpg");
  background-attachment: fixed;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
</style>