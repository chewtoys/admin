<template>
  <main-template :user-status="userStatus">
    <modal
      title="フライトを追加する"
      is-confirmed
      @confirm="postFlight"
      @cancel="cancel"
    >
      <div class="question-item">
        <div class="question-item_title">{{ `搭乗日` }}</div>
        <div class="question-item_description">
          <v-single-picker
            ref="single-picker"
            :show-dropdown="showDropdown"
            :auto-apply="autoApply"
            :linked-calendars="linkedCalendars"
            :date="requestDate"
            opens="right"
            @update="updateValues"
            @toggle="checkOpen"
          >
            <div slot="input" slot-scope="picker" style="min-width: 350px">
              {{ picker }}
            </div>
          </v-single-picker>
        </div>
      </div>
      <div class="question-item">
        <div class="question-item_title">{{ `出発` }}</div>
        <div class="question-item_description">
          <j-select
            :options="airportOptions"
            :values="departure"
            @handleSelect="applyDeparture"
          />
        </div>
      </div>
      <div class="question-item">
        <div class="question-item_title">{{ `到着` }}</div>
        <div class="question-item_description">
          <j-select
            :options="airportOptions"
            :values="arrival"
            @handleSelect="applyArrival"
          />
        </div>
      </div>
      <div class="question-item">
        <div class="question-item_title">{{ `航空会社` }}</div>
        <div class="question-item_description">
          <j-select
            :options="airlineOptions"
            :values="airline"
            @handleSelect="applyAirline"
          />
        </div>
      </div>
      <div class="question-item">
        <div class="question-item_title">{{ `機種` }}</div>
        <div class="question-item_description">
          <j-select
            :options="boardingTypeOptions"
            :values="boardingType"
            @handleSelect="applyBoardingType"
          />
        </div>
      </div>
      <div class="question-item">
        <div class="question-item_title">{{ `レジ` }}</div>
        <div class="question-item_description">
          <j-input
            :text="registration"
            placeholder="レジ"
            @handleInput="applyRegistration"
          />
        </div>
      </div>
    </modal>

    <template v-if="flights">
      <div class="flex flex-wrap w-full">
        <div class="flex justify-center p-2 w-1/2 item-center">
          <div class="flex overflow-hidden flex-col max-w-full bg-white rounded shadow-lg">
            <google-chart
              chart-type="ColumnChart"
              :chart-data="chartData"
              :chart-options="{
                width: 450,
                height: 300,
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' }
              }"
              style="width: 50%"
            />
          </div>
        </div>
        <div class="flex justify-center p-2 w-1/2 item-center">
          <div class="flex overflow-hidden flex-col max-w-full bg-white rounded shadow-lg">
            <google-chart
              chart-type="ColumnChart"
              :chart-data="localeChartData"
              :chart-options="{
                width: 450,
                height: 300,
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' },
                isStacked: true
              }"
              style="width: 50%"
            />
          </div>
        </div>
        <div class="flex justify-center p-2 w-1/2 item-center">
          <div class="flex overflow-hidden flex-col max-w-full bg-white rounded shadow-lg">
            <google-chart
              chart-type="ColumnChart"
              :chart-data="airlineChartData"
              :chart-options="{
                width: 450,
                height: 300,
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' },
                isStacked: true
              }"
              style="width: 50%"
            />
          </div>
        </div>
        <div class="flex justify-center p-2 w-1/2 item-center">
          <div class="flex overflow-hidden flex-col max-w-full bg-white rounded shadow-lg">
            <google-chart
              chart-type="ColumnChart"
              :chart-data="boardingTypeChartData"
              :chart-options="{
                width: 450,
                height: 300,
                legend: { position: 'top', maxLines: 3 },
                bar: { groupWidth: '75%' },
                isStacked: true
              }"
              style="width: 50%"
            />
          </div>
        </div>
      </div>

      <div v-for="flight in flights.item" :key="flight.id" class="flex flex-col w-full">
        <flight-card :item="flight" />
      </div>
    </template>
  </main-template>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  ref,
  useAsync
} from '@nuxtjs/composition-api'

import UserComposable from '~/composables/user'
import FlightComposable from '~/composables/flight'

import {
  drawAirlineChart,
  drawBoardingTypeChart,
  drawChart,
  drawLocaleChart,
  fetchFlights
} from '~/services/flightService'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const GoogleChart = () => import('~/components/GoogleChart.vue')
const Modal = () => import('~/components/ModalView.vue')
const FlightCard = () => import('~/components/Card/FlightCard.vue')

export default defineComponent({
  components: {
    MainTemplate,
    GoogleChart,
    Modal,
    FlightCard
  },
  middleware: 'auth',
  setup(props: {}, ctx: SetupContext) {
    const flights = ref()
    const chartData = ref()
    const localeChartData = ref()
    const airlineChartData = ref()
    const boardingTypeChartData = ref()
    const userModule = UserComposable(props, ctx)
    const flightModule = FlightComposable(props, ctx)
    useAsync(async () => {
      flights.value = await fetchFlights()
      chartData.value = await drawChart(flights.value.item)
      localeChartData.value = await drawLocaleChart(flights.value.item)
      airlineChartData.value = await drawAirlineChart(flights.value.item)
      boardingTypeChartData.value = await drawBoardingTypeChart(
        flights.value.item
      )
    })
    return {
      ...userModule,
      ...flightModule,
      flights,
      chartData,
      localeChartData,
      airlineChartData,
      boardingTypeChartData
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/flight';
</style>
