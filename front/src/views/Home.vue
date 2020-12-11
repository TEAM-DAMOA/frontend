<template>
  <div class="home">
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5">
          <h3 class="col-background">달성 완료</h3>
          <v-card
            class="mx-auto"
            min-width="344"
            min-height="244"
          >
          

            <!-- <v-card-title>
              Top western road trips
            </v-card-title>

            <v-card-subtitle>
              1,000 miles of wonder
            </v-card-subtitle> -->
        </v-card>
        </v-col>
        <v-col>
          <h3 class="col-background">진행중인 마라톤</h3>
          <v-card
            min-height="244"
          >
          </v-card>
        </v-col>
        <v-col>
          <h3 class="col-background">진행중인 스프린트</h3>
          <v-card
            min-height="244"
          >
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>


export default {
  name: 'Home',
 
}
</script>

<style>
.home {
  background-image: url("https://user-images.githubusercontent.com/60081201/101930243-3d96ab00-3c1b-11eb-8281-7f0dab30b6f3.jpg");
  background-attachment: fixed;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
.col-background {
  height: 50px;
  padding-top: 12px;
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}
.theme--light.v-card {
  opacity: 0.35;
}
</style>