<template>
  <div class="marathon">
    <v-container>
      <MarathonCreate />
      
    <div class="text-background">
      <h2 class="anounce">진행중인 마라톤 {{ info.purposeCount }}개 </h2>
      <h3 class="anounce">오늘의 총 {{ info.successCount }} 성공!</h3>
      <v-col>
        <h5 class="aim-price">목표 금액 {{ info.mGoalMoney }}원 
          <v-icon class="cursor-change" @click="updateGoalMoney">mdi-pencil</v-icon>
        </h5>
        <v-dialog
          v-model="dialog"
          max-width="400px"
        >
          <v-card>
            <v-container>
              <v-card-title>
                <h2>목표 금액 수정</h2>
              </v-card-title>
              <v-text-field
                v-model="updateMoney"
                @keydown.enter="dialog = false"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="dialog = false"
                >
                  닫기
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="changeGoalMoney"
                >
                  저장
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
        <v-progress-linear
          class="mt-3 mr-4"
          :value=info.percentage
          height="20"
          striped
        >
        <template>
            <strong>{{ Math.ceil(info.percentage) }}%</strong>
        </template>
        </v-progress-linear>
        <small>100% 달성시 정산됩니다</small>
      </v-col>
    </div>
      <MarathonList />
    </v-container>
  </div>
</template>

<script>
import MarathonCreate from "@/components/marathon/MarathonCreate.vue";
import MarathonList from "@/components/marathon/MarathonList.vue";
import SERVER from "@/api";
import axios from "axios";

export default {
  name: "Marathon",
  components: {
    MarathonCreate,
    MarathonList,
  },
  created() {
    axios.get(SERVER.URL + SERVER.ROUTES.marathon.process)
    .then((res) => {
      this.info = res.data.info
    })
  },
  methods: {
    changeGoalMoney() {
      axios.put(SERVER.URL + SERVER.ROUTES.marathon.list + "/goalmoney/" + this.updateMoney)
      .then(() => {
        this.dialog = false
        this.info.mGoalMoney = this.updateMoney
      })
    },
    updateGoalMoney() {
      this.updateMoney = this.info.mGoalMoney
      this.dialog = true
    }
  },
  data() {
    return {
      updateMoney: 0,
      dialog: false,
      info: []
    }
  },
};
</script>

<style>
.marathon {
  background-image: url("https://user-images.githubusercontent.com/60081201/101968394-524a6180-3c62-11eb-8ef5-6e6b562eb5db.jpg");
  background-attachment: fixed;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  text-align: center;
}
.text-background {
  margin-top: 12px;
  background-color: whitesmoke;

  background-color: rgba(255, 255, 255, 0.5);
}
.aim-price {
  text-align: end;
}
.anounce {
  padding-top: 10px;
  /* text-align: start; */
}
.cursor-change {
  cursor: pointer;
}
</style>
