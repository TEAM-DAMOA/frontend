<template>
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
        <v-toolbar-title>목표를 이루기 위해 해야할 일</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
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
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="해야할 일"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">해야할 일을 삭제하시겠습니까?</v-card-title>
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
</template>

<script>
export default {
  name: "Practice",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: '해야할 일',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '리워드', value: 'reward' },
        { text: '편집', value: 'actions', sortable: false },
      ],
      toDoList: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        reward: 0,
      },
      defaultItem: {
        name: '',
        reward: 0,
      },     
    }
  },
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

  created () {
    this.toDoList = [
        {
          name: '7시에 기상하기',
          reward: 2000,
        },
        {
          name: '팔굽혀펴기 10회',
          reward: 3000,
        },
    ]
  },

  methods: {  
    editItem (item) {
      this.editedIndex = this.toDoList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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
      this.dialog = false
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
  },

}
</script>

<style>

</style>