<template>
  <div class="home">
    <div class="intro">
      <v-img src="https://user-images.githubusercontent.com/60081201/101991780-3b535000-3cf2-11eb-9c88-9d5de25d2dea.png"/>
    </div>
    <div class="down-icon">
      <v-icon x-large dark @click="goDown">mdi-arrow-down-circle-outline</v-icon>
    </div>
    <div>
      <v-img src="https://user-images.githubusercontent.com/60081201/101993663-b40cd900-3cff-11eb-8138-4ecb3b5a6e1b.JPG" />
    </div>
    <div class="down-icon2">
      <v-icon x-large dark @click="goDown2">mdi-arrow-down-circle-outline</v-icon>
    </div>
    <div class="intro-function">
      <v-img src="https://user-images.githubusercontent.com/60081201/101995027-42865800-3d0a-11eb-8935-95f15036a409.JPG" />
      <v-container><v-btn dark @click="$router.push({ path: '/mypage' })"><h2>이용하기</h2></v-btn></v-container>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Home',
  methods: {
    goDown() {
      window.scroll({top:780, behavior: 'smooth'})
    },
    goDown2() {
      window.scroll({top:1280, behavior: 'smooth'})
    }
  }
 
}
</script>

<style>
.intro {
  width: 100%;
}
.down-icon {
  position: absolute;
  left: 50%;
  top: 35%;
  cursor: pointer;
}
.intro-function {
  height: 800px;
  background-color: black;
  color: whitesmoke;
}
.down-icon2 {
  position: absolute;
  left: 50%;
  top: 55%;
  cursor: pointer;
}
</style>