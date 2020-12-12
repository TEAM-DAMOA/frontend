<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(card, index) in cards"
        :key=index
        :cols="4"
      >
        <v-card
          min-height="200px"
          :color=colors[index%6]
        >
          <h4 class="card-title">{{ card.title }}</h4>
          <v-divider></v-divider>
          <div v-for="(content, index) in card.contents" :key="index">
            <v-row>
              <v-col>
                <h5>{{ content }}</h5>
                <small>리워드 {{ card.dayMoney }}원</small>
              </v-col>
              <!-- <v-col><v-btn depressed ><h4>완료</h4></v-btn></v-col> -->
              <v-col>
                <div v-if="index%2">
                  <v-icon class="check-icon">mdi-check-circle-outline</v-icon>
                </div>
                <div v-else>
                  <v-icon class="check-icon">mdi-check-circle</v-icon>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: "MarathonList",
    data() {
      return {
        colors: ["#D1C4E9", "#C5CAE9", "#B2DFDB", "#FFCDD2", "#E1BEE7", "#F8BBD0"],
        cards: [
          {
            title: '건강한 나를 위해 운동과 식습관을 조절하자',
            contents: [
              "3끼 챙겨먹기",
              "팔굽혀펴기 20회"
            ],
            dayMoney: 2000
          },
          {
            title: '규칙적으로 생활하기',
            contents: [
              "6시전 기상하기",
              "자기전 명상하기"
            ],
            dayMoney: 1000
          },
          {
            title: '마라톤 카테고리명',
            contents: [
              "습관1",
              "습관2"
            ],
            dayMoney: 600
          },
        ],
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
</style>