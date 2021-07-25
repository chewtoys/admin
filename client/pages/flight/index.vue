<template>
  <main-template :user-status="userStatus">
    <modal
      title="フライトを追加する"
      is-confirmed
      @confirm="postFlight"
      @cancel="cancel"
    >
      <div :style="{ padding: '8px' }">
        <div :style="{ padding: '8px 0' }">
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
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="airportOptions"
            :values="departure"
            @handleSelect="applyDeparture"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="airportOptions"
            :values="arrival"
            @handleSelect="applyArrival"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="airlineOptions"
            :values="airline"
            @handleSelect="applyAirline"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-select
            :options="boardingTypeOptions"
            :values="boardingType"
            @handleSelect="applyBoardingType"
          />
        </div>
        <div :style="{ padding: '8px 0' }">
          <j-input
            :text="registration"
            placeholder="レジ"
            @handleInput="applyRegistration"
          />
        </div>
      </div>
    </modal>

    <template v-if="flights">
      <div :style="{ display: 'flex', flexWrap: 'wrap', width: '100%' }">
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
const Modal = () => import('~/components/Modal.vue')

export default defineComponent({
  components: {
    MainTemplate,
    GoogleChart,
    Modal
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
