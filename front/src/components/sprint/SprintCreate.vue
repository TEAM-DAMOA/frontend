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
      <h4>새 스프린트 만들기</h4>
      </v-btn>
      </template>
      <v-card>
        <v-card-title>
        <h3>새 스프린트 만들기</h3>
        {{newSprint}}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              hint="구입하고 싶은 제품명과 함께 작성하는 것을 추천합니다."
              label="제목"
              required
              v-model="newSprint.title"
            ></v-text-field>
            <v-text-field
              hint="ex) 한 달 안으로 구입하겠다."
              label="내용"
              required
              v-model="newSprint.title"
            ></v-text-field>
            <p>제품 이미지</p>
            <input type="file" @change="previewImage" accept="image/*" />
            <small>선택사항입니다.</small>
            
            <v-text-field
              v-model="newSprint.sGoalMoney"
              label="제품 가격"
            ></v-text-field>
     
           
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
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
              <v-date-picker
                v-model="newSprint.endTime"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-container>
          <small>페이스메이커는 당신의 목표를 응원합니다!</small>
        </v-card-text>
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
            @click="dialog = false"
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
import firebase from "firebase";

export default {
  name: "SprintCreate",
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
            this.newSprint.image = url;
          });
        }
      );
    },
  },
  data() {
    return {
      picture: null,
      uploadValue: 0,
      imageData: null,
      dialog: false,
      menu: false,
      newSprint: {
        title: "",
        content: "",
        image: "",
        endTime: new Date().toISOString().substr(0, 10),
        sGoalMoney: "",
        todoList: [] // {title: "", reward: ""}, 
      }
    }
  },

}
</script>

<style>

</style>