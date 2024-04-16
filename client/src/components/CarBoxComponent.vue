<script setup>
import { useRouter } from 'vue-router'
import car_placeholder from '../assets/car_placeholder.png'
import { UserIcon } from '@heroicons/vue/24/solid'
import TÜV_logo from '../assets/TÜV_Süd_logo.png'

//props received from CarsPage
const props = defineProps(['Brand', 'Name', 'Tüv', 'Employee', 'Notes', 'Id'])

const router = useRouter()

//using the id from the car as the route parameter. handling that in the CarPage
const carClicked = () => {
  router.push(`/cars/${props.Id}`)
}

//compares 2 dates and returns boolean
function HasTüv(TüvDate, TodayDate) {
  const date1 = new Date(TüvDate)
  const date2 = new Date(TodayDate)
  return date1 < date2
}
//gets Current date in yyyy-mm-dd format
function getCurrentDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div @click="carClicked" class="car_box">
    <img class="car_img" :src="car_placeholder" alt="car" />
    <div class="car_infos">
      <h3>{{ props.Brand }}</h3>
      <h4 class="name">{{ props.Name }}</h4>
      <div class="employee_container">
        <UserIcon class="employee_icon" />
        <h4 class="employee">{{ props.Employee }}</h4>
      </div>
      <div class="tüv_container">
        <img :src="TÜV_logo" class="tüv_logo" alt="TÜV logo" />
        <!-- if Tüv date is later than today green color else red color -->
        <h4 :class="HasTüv(props.Tüv, getCurrentDate()) ? 'red_color' : 'green_color'">
          {{ props.Tüv }}
        </h4>
      </div>
      <p>{{ props.Notes }}</p>
    </div>
  </div>
</template>

<style scoped>
.car_box {
  display: flex;
  align-items: center;
  height: fit-content;
  border-top: solid 5px #e6c74c;
  margin: 10px;
  border-radius: 2px;
  background: #0e0d0d;
  cursor: pointer;
}
.car_box:hover {
  background-color: #1d1d1f;
  transition: 0.1s;
}

.car_img {
  width: 40%;
  margin: 1rem;
  border-radius: 10px;
  aspect-ratio: 4/3;
}

.car_infos {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  margin: 5px 0px;
}

p {
  display: none;
  color: rgb(211, 200, 200);
}

h3 {
  font-weight: bold;
}

.tüv_container {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.tüv_logo {
  width: 20px;
  margin-right: 5px;
}

.employee_container {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.red_color {
  color: red;
}
.green_color {
  color: green;
}
.employee_icon {
  width: 20px;
  margin-right: 5px;
}

@media (min-width: 640px) {
  p {
    display: block;
    margin-top: 8px;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 4rem;
    max-width: 100%;
  }
  .car_infos {
    font-size: 1.2rem;
  }
}
</style>
