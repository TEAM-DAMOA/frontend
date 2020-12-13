<template>
  <div class="home">
    <v-container>
      <MypageAccount/>
      <hr>
      <v-row class="mt-5">
        <v-col cols="5">
          <h3 class="col-background">달성 완료</h3>
          <v-container class="content">
            <h4>마라톤</h4>
            <hr class="mb-2 mt-2">
            <div v-for="(mara, index) in completeMarathonList" :key="index">
              <v-card
                class="mx-auto mb-2 pt-2"
                max-width="344"
              >
                <v-card-text>
                  <h3>
                    <v-icon color="primary">mdi-crown</v-icon> D + {{ mara.dday }}
                  </h3>
                  <h5>{{ mara.startDate }}</h5>
                  <h4>{{ mara.purpose }}</h4>
                  <small>성공 횟수 {{ mara.successCount }}</small>
                </v-card-text>
              </v-card>
            </div>
            <h4>스프린트</h4>
            <hr class="mb-2 mt-2">
            
            <div v-for="(sp, index) in completeSprintList" :key="index">
              <v-card
                class="mb-2 ml-12 p-2"
                max-width="344"
              >
                <v-card-text>
                  <v-icon color="blue">mdi-thumb-up</v-icon>
                  <h5>달성 금액 {{ sp.sGoalMoney }}</h5>
                  <h4>{{ sp.sprintTitle }}</h4>
                </v-card-text>
              </v-card>
            </div>
          </v-container >
          
        </v-col>
        <v-col>
          <h3 class="col-background">진행중인 마라톤</h3>
          <div class="content-2" v-for="(proceedMarathon, index) in proceedMarathonList" :key="index">
            <v-card
              :color="proceedMarathon.color"
              class="mx-auto"
              max-width="230"
            >
              <v-card-title>
                <h5>{{ proceedMarathon.purpose }}</h5>
                <v-spacer></v-spacer>
                <h6 class="mr-2"> 시작일 {{ proceedMarathon.startDate }}</h6>
              </v-card-title>
                <div v-for="(task, i) in proceedMarathon.taskList" :key="i">
                  <v-card-text>
                    <h3>{{ task.content }}</h3>
                    <p>성공 횟수 {{ task.successCount }}</p>
                  </v-card-text>
                </div>
              
            </v-card>
                  <!-- <h4>D - {{ task.dDay }}</h4> -->

          </div>
        </v-col>
        <v-col>
          <h3 class="col-background">진행중인 스프린트</h3>
          <div class="content-2">

          </div>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import SERVER from "@/api";
import axios from "axios";
import MypageAccount from "@/components/mypage/MypageAccount.vue";

export default {
  name: 'Mypage',
  components: {
    MypageAccount
  },
  created() {
    axios.get(SERVER.URL + SERVER.ROUTES.marathon.list + "/completeList")
    .then((res) => {
      this.completeMarathonList = res.data.marathon
      this.completeSprintList = res.data.sprint
      console.log(res)
    })
  },
        
  data() {
    return {
      completeMarathonList: [],
      completeSprintList: [],
      proceedMarathonList: [
        {
          maratonId: 1,
          purpose: "건강",
          color: "#E8F5E9",
          startDate: "2020-01-13",
          taskList:[
            {
              content: "팔굽혀 펴기 30회",
              reward: 1000,
              successCount: 145,
              completeStatus: true,
            },
            {
              content: "30분 걷기",
              reward: 1500,
              successCount: 40,
              completeStatus: false,
            }
          ]
        },
        {
          maratonId: 3,
          purpose: "취미생활",
          color: "#E1BEE7",
          startDate: "2020-03-01",
          taskList:[
            {
              content: "복싱장 출석",
              reward: 500,
              successCount: 23,
              completeStatus: true,
            },
            {
              content: "잘 숨쉬기",
              reward: 100,
              successCount: 230,
              completeStatus: true,
            }
          ]
        },
      ],
      proceedSprintList: {

      }
    }
  },
 
}
</script>

<style>
.home {
  background-image: url("https://user-images.githubusercontent.com/60081201/101992286-7c992f00-3cf5-11eb-98bc-0f2423947918.jpg");
  background-attachment: fixed;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
.col-background {
  border-radius: 2rem;
  height: 50px;
  padding-top: 12px;
  margin-bottom: 10px;
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}

.content {
  height: 50px;
  padding-top: 12px;
  min-height: 600px;
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}
.content-2 {
  height: 170px;
  padding-top: 12px;
  /* min-height: 500px; */
  background-color: whitesmoke;
  background-color: rgba( 255, 255, 255, 0.5 );
}
</style>

