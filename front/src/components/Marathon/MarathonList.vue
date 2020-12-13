<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(marathon, index) in marathonList"
        :key=index
        :cols="4"
      >
        <v-card
          min-height="100px"
          :color=colors[marathon[0].marathon_id%6]
        > 

        
          <div class="pt-3 pb-3">
            <h2>{{ purposeList[marathon[0].marathon_id] }}</h2>
          </div>
          <v-divider></v-divider>
          <div v-for="(task, i) in marathon" :key="i">
            <v-row>
              <v-col cols="8">
                <h4>{{ task.content }}</h4>
                <small>리워드 {{ task.reward }}원</small>
              </v-col>
              <v-col cols="1">
                <div v-if="task.success_status">
                  <v-icon class="check-icon">mdi-check-circle</v-icon>
                </div>
                <div v-else>
                  <v-icon class="check-icon" @click="doTask(index, i)">mdi-check-circle-outline</v-icon>
                </div>
              </v-col>
              <v-col cols="3">
                <v-menu
                  bottom
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                    class="more-btn ma-2"
                    v-bind="attrs"
                    v-on="on">
                    mdi-dots-vertical
                    </v-icon>
                
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      @click="edit(item, task)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </div> 
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SERVER from "@/api";
import axios from "axios";

export default {
    name: "MarathonList",
    created() {
      axios.get(SERVER.URL + SERVER.ROUTES.marathon.list + "/1")
      .then((res) => {
        this.marathonList = res.data.Data
      })
      .catch((err) => console.err(err))
    },
    methods: {
      doTask(index, i) {
        this.marathonList[index][i].success_status = true
        window.location.reload();      
      },
      edit(item, task) {
        if (item.title === "삭제") {
          axios.delete(SERVER.URL + SERVER.ROUTES.marathon.list + "/test/" + task.marathon_task_id)
          .then(() => {
            alert("삭제되었습니다.")
          })
        }
      }
    },
    data() {
      return {
        items: [
          {
            title: '수정',
          },
          {
            title: '삭제',
          },
          
        ],
        colors: ["", "#F0F4C3", "#FFCDD2", "#C5CAE9", "#B2DFDB", "#E1BEE7", "", "", "#F8BBD0"],
        marathonList: [
        ],
        purposeList: ["", "운동", "취미", "생활습관", "독서", "학습", "회사생활", "자기개발", "기타"]
    }
  },

}
</script>

<style>
.card-title {
  padding-top: 10px;
  height: 60px;
}
.check-icon {
  cursor: pointer;
}
.more-btn {
  cursor: pointer;
}
</style>