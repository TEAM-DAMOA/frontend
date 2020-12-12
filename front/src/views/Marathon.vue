<template>
  <div class="marathon">
    <v-container>
      <MarathonCreate />
      <h2 class="text-background">진행중인 마라톤 / 오늘의 총 성공!</h2>
      <MarathonList />
    </v-container>
  </div>
</template>

<script>
import MarathonCreate from "@/components/Marathon/MarathonCreate.vue";
import MarathonList from "@/components/Marathon/MarathonList.vue";

export default { 
  name: "Marathon",
  components: {
    MarathonCreate,
    MarathonList
  }
}
</script>

<style>
.marathon {
  background-image: url("https://user-images.githubusercontent.com/60081201/101968394-524a6180-3c62-11eb-8ef5-6e6b562eb5db.jpg");
  background-attachment: fixed;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
.text-background {
  margin-top: 12px;
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}
</style>
