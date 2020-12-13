<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="(sprint, index) in sprintList" :key="index" :cols="4">
        <v-hover v-slot="{ hover }">
          <v-card class="mx-auto" max-width="344">
            <div v-if="sprint.purposeProgress >= 90">
              <v-img :src="sprint.purposePicture" height="200px">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%"
                  >
                    {{ sprint.purposeProgress }}%
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
            <div v-else-if="sprint.purposeProgress >= 50">
              <v-img :src="sprint.purposePicture" height="200px" style="opacity: 0.5">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%; opacity: 0.8"
                  >
                    {{ sprint.purposeProgress }}%
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
            <div v-else>
              <v-img :src="sprint.purposePicture" height="200px" style="opacity: 0.3">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%; opacity: 0.8"
                  >
                    {{ sprint.purposeProgress }}%
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
            <h4 class="mt-3">{{ sprint.title }}</h4>
            <h5>목표금액 : {{ sprint.purposeMoney }}원</h5>
            <h5>누적금액 : {{ sprint.accumulateMoney }}원</h5>
            <!-- <v-card-subtitle>
            {{ sprint.content }}
            <p>{{ sprint.startTime }} ~ {{ sprint.endTime }}</p>
          </v-card-subtitle> -->

            <v-card-actions class="detail-cursor">
              <v-btn @click="sprint.show = !sprint.show" icon>
                <v-icon>{{ sprint.show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
              </v-btn>
              <h5 @click="sprint.show = !sprint.show">할일 목록보기</h5>
              <v-spacer></v-spacer>

              <v-row justify="end" class="pr-3">
                <v-dialog v-model="sprint.dialog" persistent max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
                  </template>
                  <v-card>
                    <v-card-title>
                      <h3>스프린트 수정하기</h3>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-text-field
                          hint="구입하고 싶은 제품명과 함께 작성하는 것을 추천합니다."
                          label="제목"
                          required
                          v-model="sprint.title"
                        ></v-text-field>

                        <v-text-field hint="ex) 한 달 안으로 구입하겠다." label="내용" required v-model="sprint.content"></v-text-field>

                        <!-- 목표를 위해 해야할 일  -->
                        <v-data-table :headers="headers" :items="sprint.toDoList" sort-by="reward" class="elevation-1">
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-toolbar-title><p>목표를 이루기 위해 해야할 일</p></v-toolbar-title>
                              <v-divider class="mx-4" inset vertical></v-divider>
                              <v-spacer></v-spacer>
                              <v-dialog v-model="sprint.dialog2" max-width="300px">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn depressed class="mb-2" v-bind="attrs" v-on="on"> 추가하기 </v-btn>
                                </template>
                                <v-card>
                                  <v-card-text>
                                    <v-container>
                                      <v-text-field v-model="sprint.editedItem.title" label="해야할 일"></v-text-field>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="close(index)"> 취소 </v-btn>
                                    <v-btn color="primary" text @click="save(index)"> 저장 </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog v-model="sprint.dialogDelete" max-width="300px">
                                <v-card>
                                  <v-card-title><h4>해야할 일을 삭제하시겠습니까?</h4></v-card-title>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="closeDelete(index)">취소</v-btn>
                                    <v-btn color="error" text @click="deleteItemConfirm(index)">삭제</v-btn>
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-toolbar>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(index, item)"> mdi-pencil </v-icon>
                            <v-icon small @click="deleteItem(index, item)"> mdi-delete </v-icon>
                          </template>
                        </v-data-table>

                        <v-text-field class="mt-3" v-model="sprint.sGoalMoney" label="제품 가격" hint="목표 금액을 의미합니다."></v-text-field>

                        <v-menu
                          v-model="sprint.menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="sprint.endTime"
                              label="구입 예정 날짜 설정"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="sprint.endTime" @input="menu = false"></v-date-picker>
                        </v-menu>
                      </v-container>
                      <small>페이스메이커는 당신의 목표를 응원합니다!</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text @click="sprint.dialog = false"> 닫기 </v-btn>
                      <v-btn color="primary" text @click="sprint.dialog = false"> 저장 </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="sprint.show">
                <v-divider class="mt-4"></v-divider>
                <v-row class="my-1" align="center">
                  <strong class="mx-5 info--text text--darken-2"> 진행중 {{ sprint.remainingTasks }} </strong>

                  <v-divider vertical></v-divider>

                  <strong class="mx-4 success--text text--darken-2"> 완료 {{ sprint.completedTasks }} </strong>

                  <v-spacer></v-spacer>

                  <v-progress-circular :value="sprint.purposeProgress" class="mr-7"></v-progress-circular>
                </v-row>

                <v-card v-if="sprint.toDoList.length">
                  <v-slide-y-transition class="py-0" group tag="v-list">
                    <template v-for="(todo, i) in sprint.toDoList">
                      <v-list-item :key="i">
                        <v-list-item-action>
                          <div v-show="!todo.completeStatus">
                            <v-checkbox
                              @click="changeCheck(index, i)"
                              v-model="todo.completeStatus"
                              :color="(todo.completeStatus && 'grey') || 'primary'"
                            >
                              <template v-slot:label>
                                <div :class="(todo.completeStatus && 'grey--text') || 'primary--text'" class="ml-4" v-text="todo.title"></div>
                              </template>
                            </v-checkbox>
                          </div>

                          <div v-show="todo.completeStatus">
                            <v-checkbox
                              input-value="true"
                              value
                              disabled
                              v-model="todo.completeStatus"
                              :color="(todo.completeStatus && 'grey') || 'primary'"
                            >
                              <template v-slot:label>
                                <div :class="(todo.completeStatus && 'grey--text') || 'primary--text'" class="ml-4" v-text="todo.title"></div>
                              </template>
                            </v-checkbox>
                          </div>
                        </v-list-item-action>

                        <v-spacer></v-spacer>

                        <v-scroll-x-transition>
                          <v-icon v-if="todo.completeStatus" color="primary"> mdi-check </v-icon>
                        </v-scroll-x-transition>
                      </v-list-item>
                    </template>
                  </v-slide-y-transition>
                </v-card>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SERVER from "@/api";
import axios from "axios";

export default {
  name: "SprintList",
  created() {
    axios
      .get(SERVER.URL + "/api/sprint/test")
      .then((res) => {
        var sprintData = res.data.toDoList;
        for (var i = 0; i < sprintData.length; i++) {
          var toDoListTemp = [];
          for (var k = 0; k < sprintData[i].toDoList.length; k++) {
            var list = sprintData[i].toDoList[k];
            toDoListTemp.push({
              sprintId: list.sprintTaskId,
              sprintTaskId: list.sprintTaskId,
              title: list.sprintTaskTitle,
              reward: list.reward,
              completeStatus: list.completeStatus,
            });
          }
          this.sprintList.push({
            title: sprintData[i].sprintTitle,
            content: sprintData[i].sprintContent,
            startTime: sprintData[i].startTime,
            endTime: sprintData[i].endTime,
            purposeMoney: sprintData[i].purposeMoney,
            purposePicture: "https://user-images.githubusercontent.com/60081201/101981507-d4617700-3cb0-11eb-9448-a61fef887e2d.JPG",
            purposeProgress: 0,
            sGoalMoney: sprintData[i].sGoalMoney,
            success: sprintData[i].success,
            toDoList: toDoListTemp,
            sprintId: sprintData[i].sprintId,
            accumulateMoney: sprintData[i].accumulateMoney,
            // 더보기 보이기 위해 추가해야할 것
            show: false,
            completedTasks: 0,
            remainingTasks: 0,
            dialog: false,
            menu: false,
            // 스프린트 할일 관련 변수
            editedIndex: -1,
            editedItem: {
              title: "",
              reward: null,
            },
            defaultItem: {
              title: "",
              reward: null,
            },
            dialog2: false,
            dialogDelete: false,
          });
        }
        for (let i = 0; i < this.sprintList.length; i++) {
          if (this.sprintList[i].toDoList.length == 0) {
            this.sprintList[i].purposeProgress = 0;
            continue;
          }
          this.sprintList[i].completedTasks = this.sprintList[i].toDoList.filter((todo) => todo.completeStatus).length;
          this.sprintList[i].remainingTasks = this.sprintList[i].toDoList.length - this.sprintList[i].completedTasks;
          this.sprintList[i].purposeProgress =
            (this.sprintList[i].completedTasks / (this.sprintList[i].completedTasks + this.sprintList[i].remainingTasks)) * 100;
        }
        console.log(this.sprintList);
      })
      .catch((err) => {
        console.err(err);
      });

    for (let i = 0; i < this.sprintList.length; i++) {
      this.sprintList[i].completedTasks = this.sprintList[i].toDoList.filter((todo) => todo.completeStatus).length;
      this.sprintList[i].remainingTasks = this.sprintList[i].toDoList.length - this.sprintList[i].completedTasks;
      this.sprintList[i].purposeProgress =
        (this.sprintList[i].completedTasks / (this.sprintList[i].completedTasks + this.sprintList[i].remainingTasks)) * 100;
    }
    for (let i = 0; i < this.sprintList.length; i++) {
      this.sprintList[i].completedTasks = this.sprintList[i].toDoList.filter((todo) => todo.completeStatus).length;
      this.sprintList[i].remainingTasks = this.sprintList[i].toDoList.length - this.sprintList[i].completedTasks;
      this.sprintList[i].purposeProgress =
        (this.sprintList[i].completedTasks / (this.sprintList[i].completedTasks + this.sprintList[i].remainingTasks)) * 100;
    }
    for (let i = 0; i < this.sprintList.length; i++) {
      this.sprintList[i].completedTasks = this.sprintList[i].toDoList.filter((todo) => todo.completeStatus).length;
      this.sprintList[i].remainingTasks = this.sprintList[i].toDoList.length - this.sprintList[i].completedTasks;
      this.sprintList[i].purposeProgress =
        (this.sprintList[i].completedTasks / (this.sprintList[i].completedTasks + this.sprintList[i].remainingTasks)) * 100;
    }
  },
  methods: {
    selectFile(file) {
      this.newSprint.image = "http://k3a301.p.ssafy.io:8000/images/" + file.name;
    },
    changeCheck(sprintIdx, toDoIdx) {
      console.log(this.sprintList[sprintIdx]);
      if (!this.sprintList[sprintIdx].toDoList[toDoIdx].completeStatus) {
        console.log("ASD");
        return;
      }
      console.log(this.sprintList[sprintIdx].sprintId);
      console.log(this.sprintList[sprintIdx].toDoList[toDoIdx].sprintTaskId);
      console.log(this.sprintList[sprintIdx].toDoList[toDoIdx].reward);
      axios
        .post(`${SERVER.URL}/api/sprint/complete/${this.sprintList[sprintIdx].sprintId}`, {
          sprintTaskId: this.sprintList[sprintIdx].toDoList[toDoIdx].sprintTaskId,
          reward: this.sprintList[sprintIdx].toDoList[toDoIdx].reward,
        })
        .then((res) => {
          console.log(res);
          axios
            .post(`${SERVER.URL}/api/sprint/complete/${this.sprintList[sprintIdx].sprintId}`, {
              sprintTaskId: this.sprintList[sprintIdx].toDoList[toDoIdx].sprintTaskId,
              reward: this.sprintList[sprintIdx].toDoList[toDoIdx].reward,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.sprintList[sprintIdx].completedTasks = this.sprintList[sprintIdx].toDoList.filter((todo) => todo.completeStatus).length;
      this.sprintList[sprintIdx].purposeProgress = (this.sprintList[sprintIdx].completedTasks / this.sprintList[sprintIdx].toDoList.length) * 100;
      this.sprintList[sprintIdx].remainingTasks = this.sprintList[sprintIdx].toDoList.length - this.sprintList[sprintIdx].completedTasks;
    },
    // 해야할 일 관련 메소드
    editItem(index, item) {
      this.sprintList[index].editedIndex = this.sprintList[index].toDoList.indexOf(item);
      this.sprintList[index].editedItem = Object.assign({}, item);
      this.sprintList[index].dialog2 = true;
    },

    deleteItem(index, item) {
      console.log("dd");
      this.sprintList[index].editedIndex = this.sprintList[index].toDoList.indexOf(item);
      this.sprintList[index].editedItem = Object.assign({}, item);
      this.sprintList[index].dialogDelete = true;
    },

    deleteItemConfirm(index) {
      this.sprintList[index].toDoList.splice(this.sprintList[index].editedIndex, 1);
      this.closeDelete(index);
    },

    close(index) {
      this.sprintList[index].dialog2 = false;
      this.$nextTick(() => {
        this.sprintList[index].editedItem = Object.assign({}, this.sprintList[index].defaultItem);
        this.sprintList[index].editedIndex = -1;
      });
    },

    closeDelete(index) {
      this.sprintList[index].dialogDelete = false;
      this.$nextTick(() => {
        this.sprintList[index].editedItem = Object.assign({}, this.defaultItem);
        this.sprintList[index].editedIndex = -1;
      });
    },

    save(index) {
      if (this.sprintList[index].editedIndex > -1) {
        Object.assign(this.sprintList[index].toDoList[this.sprintList[index].editedIndex], this.sprintList[index].editedItem);
      } else {
        this.sprintList[index].toDoList.push(this.sprintList[index].editedItem);
      }
      this.close(index);
    },
  },
  data() {
    return {
      headers: [
        {
          text: "해야할 일",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "리워드(원)", value: "reward" },
        { text: "편집", value: "actions", sortable: false },
      ],
      colors: ["#D1C4E9", "#C5CAE9", "#B2DFDB", "#FFCDD2", "#E1BEE7", "#F8BBD0"],
      sprintList: [],
    };
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.detail-cursor {
  cursor: pointer;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 0px;
  padding-left: 5px;
}
.v-label {
  font-size: 13px;
}
</style>
