<template>
  <div>
    <v-row justify="end">
      <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
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

            <v-text-field
              hint="ex) 한 달 안으로 구입하겠다."
              label="내용"
              required
              v-model="newSprint.content"
            ></v-text-field>

            <v-data-table
              :headers="headers"
              :items="toDoList"
              sort-by="reward"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title><p>목표를 이루기 위해 해야할 일</p></v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog
                    v-model="dialog2"
                    max-width="300px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        depressed
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        추가하기
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="editedItem.title"
                                label="해야할 일"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="editedItem.reward"
                                label="리워드"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          @click="close"
                        >
                          취소
                        </v-btn>
                        <v-btn
                          color="primary"
                          text
                          @click="save"
                        >
                          저장
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="300px">
                    <v-card>
                      <v-card-title><h4>해야할 일을 삭제하시겠습니까?</h4></v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="closeDelete">취소</v-btn>
                        <v-btn color="error" text @click="deleteItemConfirm">삭제</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>         

            <!-- <p class="mt-3">제품 이미지</p> -->
            <v-file-input
              class="mt-3"
              accept="image/*"
              label="제품 사진"
              @change="selectFile"
              hint="선택사항입니다."
            ></v-file-input>
            <!-- <input type="file" @change="previewImage" accept="image/*" /> -->
            
            <v-text-field
              v-model="newSprint.sGoalMoney"
              label="제품 가격"
              hint="목표 금액을 의미합니다."
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
// import firebase from "firebase";
import axios from "axios";

export default {
  name: "SprintCreate",
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '새로 추가하기' : '수정하기'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods: {
    // 해야할 일 관련 메소드
    editItem (item) {
      this.editedIndex = this.toDoList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog2 = true
    },

    deleteItem (item) {
      this.editedIndex = this.toDoList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.toDoList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog2 = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.toDoList[this.editedIndex], this.editedItem)
      } else {
        this.toDoList.push(this.editedItem)
      }
      this.close()
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

      formData.append("files", file)

      axios
      .post("http://k3a301.p.ssafy.io:8888/upload",
        formData,
        {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.err(err))
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
        todoList: [] // {title: "", reward: ""}, 
      },
      // 스프린트 해야할 일에 필요한 데이터
      dialog2: false,
      dialogDelete: false,
      headers: [
        {
          text: '해야할 일',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: '리워드', value: 'reward' },
        { text: '편집', value: 'actions', sortable: false },
      ],
      toDoList: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        reward: null,
      },
      defaultItem: {
        title: '',
        reward: null,
      },     
    }
  }
}


</script>

<style>
.v-application p {
  font-size: 14px;
}
</style>