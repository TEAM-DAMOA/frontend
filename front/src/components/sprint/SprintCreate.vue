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
        <h3>새 마라톤 만들기</h3>
        </v-card-title>
        <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
              label="목표"
              required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <h3>기간 정하기</h3>
              <v-date-picker
                v-model="dates"
                range
              ></v-date-picker>
              <p>기간 설정은 2일 이상입니다.</p>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
              label="리워드 금액"
              hint="목표를 수행했을 때 받을 금액을 적어주세요."
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>페이스메이커는 당신의 목표를 응원합니다!</small>
      </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="dialog = false"
        >
            Close
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="dialog = false"
        >
            Save
        </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
    name: "SprintCreate",
    data() {
      return {
        dialog: false,
        dates: ['2020-12-12', '2020-12-13'],
      }
    },

}
</script>

<style>

</style>