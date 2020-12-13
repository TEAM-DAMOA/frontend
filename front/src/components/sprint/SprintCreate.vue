<template>
  <div>
    <v-row justify="end">
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <h4>새 스프린트 만들기</h4>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h3>새 스프린트 만들기</h3>
            <!-- {{newSprint}} -->
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                hint="구입하고 싶은 제품명과 함께 작성하는 것을 추천합니다."
                label="제목"
                required
                v-model="newSprint.title"
              ></v-text-field>

              <v-text-field hint="ex) 한 달 안으로 구입하겠다." label="내용" required v-model="newSprint.content"></v-text-field>

              <div class="box">
                <p>목표를 이루기 위해 해야할 일</p>
                <v-row>
                  <v-col cols="8">
                    <v-text-field v-model="newTask" label="해야할 일 입력하기" @keydown.enter="create"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-btn class="plus-btn" @click="create" depressed>추가</v-btn>
                  </v-col>
                </v-row>

                <v-simple-table v-if="newSprint.todoList.length > 0">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">해야할 일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(todo, index) in newSprint.todoList" :key="index">
                        <td>{{ todo.title }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>

              <!-- <p class="mt-3">제품 이미지</p> -->
              <v-file-input class="mt-3" accept="image/*" label="제품 사진" @change="selectFile" hint="선택사항입니다."></v-file-input>
              <!-- <input type="file" @change="previewImage" accept="image/*" /> -->

              <v-text-field v-model="newSprint.sGoalMoney" label="제품 가격" hint="목표 금액을 의미합니다."></v-text-field>

              <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="newSprint.endTime"
                    label="구입 예정 날짜 설정"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="newSprint.endTime" @input="menu = false"></v-date-picker>
              </v-menu>
            </v-container>
            <small>페이스메이커는 당신의 목표를 응원합니다!</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="exitDialog"> 닫기 </v-btn>
            <v-btn color="primary" text @click="createSprint"> 저장 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
// import firebase from "firebase";
import SERVER from "@/api";
import axios from "axios";

export default {
  name: "SprintCreate",
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "새로 추가하기" : "수정하기";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    create() {
      if (this.newTask) {
        this.newSprint.todoList.push({
          title: this.newTask,
        });
        this.newTask = null;
      } else {
        alert("할 일을 입력해주세요.");
      }
    },
    createSprint() {
      var tempList = [];
      for (var i = 0; i < this.newSprint.todoList.length; i++) {
        tempList.push({
          sprintTaskTitle: this.newSprint.todoList[i].title,
        });
      }
      axios
        .post(SERVER.URL + "/api/sprint/test", {
          sprintTitle: this.newSprint.title,
          sprintContent: this.newSprint.content,
          endTime: this.newSprint.endTime,
          purposePicture: this.newSprint.image,
          purposeMoney: this.newSprint.sGoalMoney,
          toDoList: tempList,
        })
        .then((res) => {
          console.log(res);
          this.exitDialog();
          window.location.reload();
        })
        .catch((err) => {
          console.err(err);
        });
    },
    exitDialog() {
      this.dialog = false;
      this.newSprint = {
        title: "",
        content: "",
        image: "",
        endTime: new Date().toISOString().substr(0, 10),
        sGoalMoney: "",
        todoList: [], // {title: ""},
      };
      this.newTask = null;
    },

    // 제품 이미지
    // dataURLtoFile(dataurl, fileName) {
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);

    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }

    //   return new File([u8arr], fileName, { type: mime });
    // },
    selectFile(file) {
      const formData = new FormData();

      formData.append("files", file);

      axios
        .post("http://k3a301.p.ssafy.io:8888/upload", formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.err(err));
      // this.newSprint.image = "http://k3a301.p.ssafy.io:8000/images/" + file.name
    },

    // previewImage(event) {
    //   this.uploadValue = 0;
    //   this.picture = null;
    //   this.imageData = event.target.files[0];
    //   this.onUpload();
    // },
    // onUpload() {
    //   this.picture = null;
    //   const storageRef = firebase
    //     .storage()
    //     .ref(`${this.imageData.name}`)
    //     .put(this.imageData);
    //   storageRef.on(
    //     `state_changed`,
    //     (snapshot) => {
    //       this.uploadValue =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       console.error(error.message);
    //     },
    //     () => {
    //       this.uploadValue = 100;
    //       storageRef.snapshot.ref.getDownloadURL().then((url) => {
    //         this.picture = url;
    //         this.newSprint.image = url;
    //       });
    //     }
    //   );
    // },
  },
  data() {
    return {
      newTask: null,
      // picture: null,
      // uploadValue: 0,
      // imageData: null,
      dialog: false,
      menu: false,
      newSprint: {
        title: "",
        content: "",
        image: "",
        endTime: new Date().toISOString().substr(0, 10),
        sGoalMoney: "",
        todoList: [], // {title: ""},
      },
      // 스프린트 해야할 일에 필요한 데이터
      dialog2: false,
      dialogDelete: false,
      headers: [
        {
          text: "해야할 일",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "리워드", value: "reward" },
        { text: "편집", value: "actions", sortable: false },
      ],
      toDoList: [],
      editedIndex: -1,
      editedItem: {
        title: "",
        reward: null,
      },
      defaultItem: {
        title: "",
        reward: null,
      },
    };
  },
};
</script>

<style>
.v-application p {
  font-size: 14px;
}
.box {
  background-color: antiquewhite;
  padding: 12px;
}
</style>
