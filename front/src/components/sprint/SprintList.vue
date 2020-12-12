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
            {{ card.progressPercent }}%
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
              <v-divider></v-divider>

              <v-card-text v-for="(todo, index) in card.toDoList" :key="index">
                <v-checkbox
                  v-model="todo.check"
                  :label="todo.do"
                ></v-checkbox>
              </v-card-text>
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
  data() {
    return {
      colors: ["#D1C4E9", "#C5CAE9", "#B2DFDB", "#FFCDD2", "#E1BEE7", "#F8BBD0"],
      cards: [
        {
          productName: '노트북',
          productPrice: 20000000,
          img: 'https://user-images.githubusercontent.com/60081201/101981507-d4617700-3cb0-11eb-9448-a61fef887e2d.JPG',
          toDoList: [
            { do: "할일 1", check: "true"},
            { do: "할일 2", check: "false"}
          ],
          progressPercent: 50,
          show: false
        },
        {
          productName: '핸드폰',
          productPrice: 6000000,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          toDoList: [
            { do: "할일 1", check: "false"},
            { do: "할일 2", check: "false"}
          ],
          progressPercent: 30,
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