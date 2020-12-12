<template>
    <v-container fluid>
      
    <v-row dense>
      <v-col
        v-for="(card, index) in cards"
        :key=index
        :cols="4"
      >
      <v-hover v-slot="{ hover }">
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            :src="card.img"
            height="200px"
          >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
            {{ card.progress }}%
            </div>
          </v-expand-transition>
          </v-img>

          <h4 class="mt-3">{{ card.productName }}</h4>
          <h5>목표금액 : {{ card.productPrice }}원</h5>

          <v-card-actions class="detail-cursor" @click="card.show = !card.show">
            <v-btn
              icon
            >
              <v-icon>{{ card.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            <h5>할일 목록보기</h5>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="card.show">
              <v-divider class="mt-4"></v-divider>
            <v-row
              class="my-1"
              align="center"
            >
              <strong class="mx-5 info--text text--darken-2">
                진행중 {{ card.remainingTasks }}
              </strong>

              <v-divider vertical></v-divider>

              <strong class="mx-4 success--text text--darken-2">
                완료 {{ card.completedTasks }}
              </strong>

              <v-spacer></v-spacer>

              <v-progress-circular
                :value="card.progress"
                class="mr-7"
              ></v-progress-circular>
            </v-row>

            <v-card v-if="card.toDoList.length">
              <v-slide-y-transition
                class="py-0"
                group
                tag="v-list"
              >
                <template v-for="(todo, i) in card.toDoList">
                  <v-list-item :key=i>
                    <v-list-item-action>
                      <v-checkbox
                       @click="changeCheck(index)"
                        v-model="todo.check"
                        :color="todo.check && 'grey' || 'primary'"
                      >
                        <template v-slot:label>
                          <div
                            :class="todo.check && 'grey--text' || 'primary--text'"
                            class="ml-4"
                            v-text="todo.title"
                          ></div>
                        </template>
                      </v-checkbox>
                    </v-list-item-action>

                    <v-spacer></v-spacer>

                   <v-scroll-x-transition>
                      <v-icon
                        v-if="todo.check"
                        color="primary"
                      >
                        mdi-check
                      </v-icon>
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
export default {
  name: "SprintList",
  created() {
    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].completedTasks = this.cards[i].toDoList.filter(todo => todo.check).length
      this.cards[i].progress = this.cards[i].completedTasks / this.cards[i].toDoList.length * 100
      this.cards[i].remainingTasks = this.cards[i].toDoList.length - this.cards[i].completedTasks
    }
  },
  methods: {
    changeCheck(i) {
      this.cards[i].completedTasks = this.cards[i].toDoList.filter(todo => todo.check).length
      this.cards[i].progress = this.cards[i].completedTasks / this.cards[i].toDoList.length * 100
      this.cards[i].remainingTasks = this.cards[i].toDoList.length - this.cards[i].completedTasks
    }
  },
  data() {
    return {
      colors: ["#D1C4E9", "#C5CAE9", "#B2DFDB", "#FFCDD2", "#E1BEE7", "#F8BBD0"],
      cards: [
        {
          productName: '노트북',
          completedTasks: null,
          progress: null,
          remainingTasks: null,
          productPrice: 20000000,
          img: 'https://user-images.githubusercontent.com/60081201/101981507-d4617700-3cb0-11eb-9448-a61fef887e2d.JPG',
          toDoList: [
            { title: "할일 1", check: true},
            { title: "할일 2", check: false}
          ],
          show: false
        },
        {
          productName: '핸드폰',
          completedTasks: null,
          progress: null,
          remainingTasks: null,
          productPrice: 6000000,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          toDoList: [
            { title: "할일 1", check: false},
            { title: "할일 2", check: false}
          ],
          show: false
        }
      ],
    }
  },
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
.detail-cursor {
  cursor: pointer;
}
.v-card__subtitle, .v-card__text, .v-card__title {
  padding: 0px;
  padding-left: 5px;
}
.v-label {
  font-size: 13px;
}
</style>