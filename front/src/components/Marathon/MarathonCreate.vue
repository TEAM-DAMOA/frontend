<template>
  <div>
    <v-row justify="end">
      <v-dialog
      v-model="dialog"
      persistent
      max-width="400px"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          >
        <h4>새 마라톤 만들기</h4>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
        <h3>새 마라톤 만들기</h3>
        </v-card-title>
        <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
                <v-text-field
                label="목표"
                required
                v-model="newMarathon.content"
                ></v-text-field>
            </v-col>
            
            <v-col>
                <v-autocomplete
                :items="['운동', '생활습관', '독서', '학습', '취미생활', '회사생활', '기타']"
                label="카테고리"
                v-model="newMarathon.purpose"
                ></v-autocomplete>
            </v-col>
            <v-col>
                <v-text-field
                label="리워드 금액"
                v-model="newMarathon.reward"
                hint="목표를 수행했을 때 받을 금액을 적어주세요."
                ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>페이스메이커는 당신의 마라톤을 응원합니다!</small>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="closeCreateMarathon"
        >
          닫기
        </v-btn>
        <v-btn
          color="primary"
          text
          :disabled="!(newMarathon.purpose && newMarathon.content && newMarathon.reward)"
          @click="saveMarathon"
        >
          저장
        </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import SERVER from "@/api";
import axios from "axios";

export default {
  name: "MarathonCreate",
  methods: {
    saveMarathon() {
      axios.post(SERVER.URL + SERVER.ROUTES.marathon.create + "/1", {
        purpose: this.newMarathon.purpose,
        content: this.newMarathon.content,
        reward: parseInt(this.newMarathon.reward),
        color: "blue",
        startDate: new Date().toISOString().substr(0, 10),
      })
      .then(() => {
        this.dialog = false
        window.location.reload();
      })
    },
    closeCreateMarathon() {
      this.dialog = false
      this.newMarathon = {
        purpose: null,
        content: null,
        reward: null,
      }
    }
  },
  data() {
    return {
      dialog: false,
      newMarathon: {
        purpose: null,
        content: null,
        reward: null,
      }
    }
  },

}
</script>

<style>

</style>