<template>
    <div>
        <div class="nav"> 
            <v-row>
                <v-col>
                    <v-img class="logo" @click="$router.push({ name: 'Home' })" src="https://user-images.githubusercontent.com/60081201/101925963-de826780-3c15-11eb-96e0-2d53899c85be.JPG" />
                </v-col>
                <v-spacer></v-spacer>
                <v-col >
                    <v-tabs
                        background-color="transparent"
                    >
                        <v-tab @click="$router.push({ name: 'Marathon' })"><h3>마라톤</h3></v-tab>
                        <v-tab @click="$router.push({ name: 'Sprint' })"><h3>스프린트</h3></v-tab>
                        <v-tab @click="$router.push({ name: 'Calendar' })"><h3>달력</h3></v-tab>
                        <v-tab @click="$router.push({ name: 'Mypage' })"><h3>내 정보</h3></v-tab>
                    </v-tabs>
                </v-col>
            </v-row>  
        </div>
    </div>
</template>

<script>
export default {
    name: "Header"

}
</script>

<style>
.nav {
  height: 61px;
  background-color: #FAEBD7;
}
.col {
    padding: 0px;
}
.logo {
  margin-left: 15px;
  padding-left: 30px;
  width: 140px;
}
</style>