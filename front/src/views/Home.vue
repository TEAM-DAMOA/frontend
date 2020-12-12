<template>
  <div class="home">
    <v-container>
      <v-row class="mt-5">
        <v-col cols="5">
          <h3 class="col-background">달성 완료</h3>
          <div class="content">
            <v-card
              class="mx-auto"
              max-width="344"
            >
              <v-card-text>
                <h5>학습 스프린트</h5>
                <h4>정처기 하루에 3시간씩 공부</h4>
                <p>2020.10.24 ~ 2020.11.24</p>
              </v-card-text>
            </v-card>
          </div>
          
        </v-col>
        <v-col>
          <h3 class="col-background">진행중인 마라톤</h3>
          <div class="content">
            <v-card
              class="mx-auto"
              max-width="230"
            >
              <v-card-text>
                <h5>운동 마라톤</h5>
                <h4>하루에 스쿼트 3세트</h4>
              </v-card-text>
            </v-card>

          </div>
        </v-col>
        <v-col>
          <h3 class="col-background">진행중인 스프린트</h3>
          <div class="content">

          </div>
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
  margin-bottom: 10px;
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}

.content {
  height: 50px;
  padding-top: 12px;
  min-height: 344px;
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}
</style>