import { SetupContext, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

import { addFlight } from '~/services/flightService'
import { ItemDataList } from '~/types/database'
import {
  AIRLINE_LIST,
  AIRPORT_LIST,
  BOARDING_TYPE_LIST,
  getAirlineName,
  getAirportName,
  getBoardingTypeName,
} from '~/utils/flight'
import { getTimeFormat } from '~/utils/date'

export default (props: {}, ctx: SetupContext) => {
  const flights = ref<ItemDataList>()

  const requestDate = ref(dayjs().format('YYYY/MM/DD'))
  const time = ref('')
  const departure = ref(0)
  const arrival = ref(0)
  const airline = ref(0)
  const boardingType = ref(0)
  const registration = ref('')

  const showDropdown = ref(true)
  const autoApply = ref(false)
  const linkedCalendars = ref(true)

  const departureText = (value: number) => {
    return getAirportName(value)
  }

  const arrivalText = (value: number) => {
    return getAirportName(value)
  }

  const airlineText = (value: number) => {
    return getAirlineName(value)
  }

  const descriptionText = (item: any) => {
    return `${item.data.registration} (${getBoardingTypeName(item.data.boardingType)})`
  }

  const timeFormat = (t) => {
    return getTimeFormat(t)
  }

  const applyDeparture = (value) => {
    departure.value = value
  }

  const applyArrival = (value) => {
    arrival.value = value
  }

  const applyAirline = (value) => {
    airline.value = value
  }

  const applyBoardingType = (value) => {
    boardingType.value = value
  }

  const applyRegistration = (value) => {
    registration.value = value
  }

  const updateValues = (value: string): void => {
    requestDate.value = value
    time.value = dayjs(value).format()
  }

  const checkOpen = (open: any): void => {
    // console.log('event: ' + open)
  }

  const reset = () => {
    time.value = dayjs().format('YYYY/MM/DD')
    departure.value = 0
    arrival.value = 0
    airline.value = 0
    boardingType.value = 0
    registration.value = ''
  }

  const cancel = () => {
    reset()
  }

  const postFlight = async () => {
    await addFlight({
      time: time.value,
      departure: departure.value,
      arrival: arrival.value,
      airline: airline.value,
      boardingType: boardingType.value,
      registration: registration.value,
    })
    reset()
  }

  return {
    showDropdown,
    autoApply,
    linkedCalendars,
    flights,
    requestDate,
    time,
    departure,
    arrival,
    airline,
    boardingType,
    registration,
    airportOptions: AIRPORT_LIST,
    airlineOptions: AIRLINE_LIST,
    boardingTypeOptions: BOARDING_TYPE_LIST,
    departureText,
    arrivalText,
    airlineText,
    descriptionText,
    timeFormat,
    applyDeparture,
    applyArrival,
    applyAirline,
    applyBoardingType,
    applyRegistration,
    updateValues,
    checkOpen,
    reset,
    cancel,
    postFlight,
  }
}
