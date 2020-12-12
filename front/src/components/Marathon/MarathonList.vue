<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="card in cards"
        :key="card.title"
        :cols="4"
      >
        <v-card
        min-height="200px"
        >
          <h4 class="card-title">{{ card.title }}</h4>
          <v-divider></v-divider>
          <div v-for="(content, index) in card.contents" :key="index">
            <v-row>
              <v-col><h5>{{ content }}</h5></v-col>
              <v-col><v-btn outlined color="primary"><h4>완료</h4></v-btn></v-col>
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
        cards: [
          {
            title: '건강한 나를 위해 운동과 식습관을 조절하자',
            contents: [
              "3끼 챙겨먹기",
              "팔굽혀펴기 20회"
            ]
          },
          {
            title: '규칙적으로 생활하기',
            contents: [
              "6시전 기상하기",
              "자기전 명상하기"
            ]
          },
          {
            title: '마라톤 카테고리명',
            contents: [
              "습관1",
              "습관2"
            ]
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
</style>