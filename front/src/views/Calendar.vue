<template>
  <div class="calendar">
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
        </v-col>
        <v-col>

          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-toolbar-title v-if="$refs.calendar">
            <h3>{{ $refs.calendar.title }}</h3>
          </v-toolbar-title>
        </v-col>
        <v-col>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-col>
        <v-col>
        </v-col>
      </v-row>  
      <span>
        <v-chip class="ma-2" :color="colors[10]" text-color="white">
          마라톤 완료
        </v-chip>
      </span>
      <span v-for="(category, i) in this.eventcategory" :key="i">
      <v-chip class="ma-2" :color="colors[i%11]" text-color="white">
        {{ category }}
      </v-chip>
    </span>  
      <v-row>
        <v-col>
           
          <v-sheet height="600"> 
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              type="month"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container>
                    <!-- <div v-if="selectedEvent.details.length < 3"> -->
                      <h4>{{ selectedEvent }}</h4>
                    <!-- </div> -->
                    <!-- <div v-else>       
                      <div>{{ selectedEvent.details.sprintContent }}</div>                  
                      <div class="text--primary">
                        목표 금액 {{ selectedEvent.details.purposeMoney }}
                      </div>                  
                    </div> -->
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    닫기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange () {
      const events = []
      // 마라톤 이벤트
      for (let event_m in this.dummyData.completeMarathonList) {
        const event_data_detail = this.dummyData.completeMarathonList[event_m];
        const sdates = this.dummyData.completeMarathonList[event_m]["complete_Date"];
        const syear = sdates.substring(0, 4);
        const smonth = sdates.substring(5, 7);
        const sday = sdates.substring(8, 10);

        const s_date = syear + "/" + smonth + "/" + sday;

        const first = new Date(`${s_date}/00:00:00`);
        const second = new Date(`${s_date}/23:59:59`);
        const eventname = "마라톤 완료";

        events.push({
          pk_num: Number(event_m),
          name: eventname,
          start: first,
          end: second,
          color: this.colors[10],
          details: {
            마라톤완료: event_data_detail["complete_Date"],
          },
        });
      }
      // 스프린트 이벤트
      let j = 0;
      for (let event_s in this.dummyData.completeSprintList) {
        const event_data_detail2 = this.dummyData.completeSprintList[event_s];
        const sdates2 = this.dummyData.completeSprintList[event_s]["startTime"];
        const syear2 = sdates2.substring(0, 4);
        const smonth2 = sdates2.substring(5, 7);
        const sday2 = sdates2.substring(8, 10);

        const edates = this.dummyData.completeSprintList[event_s]["endTime"];
        const eyear = edates.substring(0, 4);
        const emonth = edates.substring(5, 7);
        const eday = edates.substring(8, 10);
        const s_date2 = syear2 + "/" + smonth2 + "/" + sday2;
        const e_date = eyear + "/" + emonth + "/" + eday;

        const first2 = new Date(`${s_date2}/00:00:00`);
        const second2 = new Date(`${e_date}/23:59:59`);
        const eventname2 = this.dummyData.completeSprintList[event_s]["sprintTitle"];

        this.eventcategory.push( event_data_detail2["sprintTitle"])
        events.push({
          pk_num: Number(event_s),
          name: eventname2,
          start: first2,
          end: second2,
          color: this.colors[j],
          details: {
            목표금액: event_data_detail2["purposeMoney"],
            내용: event_data_detail2["sprintContent"],
          },
        });
        j += 1;
      }
      this.events = events;
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  data() {
    return {
      focus: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [
        "pink lighten-2",
        "purple lighten-2",
        "teal lighten-2",
        "deep-purple lighten-2",
        "grey darken-1",
        "indigo lighten-2",
        "blue lighten-2",
        "lime lighten-2",
        "brown darken-1",
        "blue-grey darken-3",
        "orange lighten-2",
      ],
      eventcategory:[],
      event_data: {
        1: {
          seqNo: "8586",
          siteCode: "01",
          siteName: "마라톤 운동",
          subTitle: "마라톤 운동",
          subContent: "완성",
          sDate: "20201213",
          eDate: "20201215",
          mainImageTemp: "PROGRAM_202007290238489980",
          subDesc_2: "마라톤이다",
          subDate: "마라톤 완료",
        }
      },
      dummyData: {
        completeMarathonList:[
          {
            marathonId:13,
            complete_Date:"2020-12-02"
          },
          {
            marathonId:5,
            complete_Date:"2020-12-13"
          }
        ],
        completeSprintList:[
          {
            sprintTitle:"애플워치 구매",
            sprintContent:"시계 사자",
            startTime: "2020-12-01",
            endTime: "2020-12-30",
            purposeMoney:390000,
            nowMoney: 8000,
          },
          {
            sprintTitle:"맥북 구매",
            sprintContent:"노트북 사자",
            startTime: "2020-11-01",
            endTime: "2020-12-03",
            sGoalMoney:2950000,
            nowMoney: 8000,
          }
        ]  
      }
    }
  },

}
</script>
<style>
.calendar {
  background-image: url("https://user-images.githubusercontent.com/60081201/101988287-09cf8a00-3cdc-11eb-9fbe-5df9e0589103.jpg");
  background-attachment: fixed;
  background-origin: border-box;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  text-align: center;
}
</style>