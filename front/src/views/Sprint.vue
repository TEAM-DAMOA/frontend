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
  background-image: url("https://user-images.githubusercontent.com/60081201/101987178-d558cf80-3cd5-11eb-8920-87610c0166e6.jpg");
  background-attachment: fixed;
  /* background-origin: border-box; */
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
</style>