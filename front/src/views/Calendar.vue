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
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
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

      for (let ev_n in this.event_data) {
        const event_data_detail = this.event_data[ev_n];
        const sdates = this.event_data[ev_n]["sDate"];
        const syear = sdates.substring(0, 4);
        const smonth = sdates.substring(4, 6);
        const sday = sdates.substring(6, 8);

        const edates = this.event_data[ev_n]["eDate"];
        const eyear = edates.substring(0, 4);
        const emonth = edates.substring(4, 6);
        const eday = edates.substring(6, 8);
        const s_date = syear + "/" + smonth + "/" + sday;
        const e_date = eyear + "/" + emonth + "/" + eday;

        const first = new Date(`${s_date}/00:00:00`);
        const second = new Date(`${e_date}/23:59:59`);
        const eventname = this.event_data[ev_n]["subTitle"];

        events.push({
          pk_num: Number(ev_n),
          name: eventname,
          start: first,
          end: second,
          color: this.colors[Number(this.event_data[ev_n]["siteCode"])],
          details: {
            세부사항1: event_data_detail["subDate"],
            세부사항2: event_data_detail["subDesc_2"],
            세부사항3: event_data_detail["groupName"],
          },
        });
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
        "grey darken-1",
        "pink lighten-2",
        "purple lighten-2",
        "deep-purple lighten-2",
        "indigo lighten-2",
        "blue lighten-2",
        "teal lighten-2",
        "lime lighten-2",
        "orange lighten-2",
        "brown darken-1",
        "blue-grey darken-3",
      ],
      eventcategory: {
        1: "마라톤-운동",
        2: "마라톤-습관",
        3: "마라톤-학습",   
        4: "스프린트-노트북",
        5: "스프린트-핸드폰",
      },    
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