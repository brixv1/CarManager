<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import car_placeholder from '../assets/car_placeholder.png'
import TÜV_logo from '../assets/TÜV_Süd_logo.png'
import { UserIcon } from '@heroicons/vue/24/solid'
import { FunnelIcon } from '@heroicons/vue/24/solid'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { useToast } from 'vue-toastification'


const toast = useToast()

const route = useRoute()
const router = useRouter()

//route param.id is the car.id (see CarBoxComponent)
const carId = route.params.id

const Car = ref({})

const isLoading = ref(false)

const showConfirmModal = ref(false)

//sets Car ref to the correct Car
const getCar = () => {
  isLoading.value = true
  axios
    .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/cars/${carId}`)
    .then(function (response) {
      Car.value = response.data[0]
      Car.value.Tüv = formatDate(Car.value.Tüv)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
      isLoading.value = false
      if (HasTüv(Car.value.Tüv, getCurrentDate())) {
        toast.error('Warning: This Car doesnt have Tüv')
      }
    })
}

onMounted(() => {
  getCar()
})

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
//formates the date i get from db to yyyy-mm-dd format 
const formatDate = (datetimeString) => {
  return datetimeString.split('T')[0]
}

//deletes the correct car
const deleteCar = () => {
  axios
    .delete(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/deletecar/${carId}`)
    .then(function (response) {
      console.log(response)
      toast.success('Successfully Deleted Car')
    })
    .catch(function (error) {
      console.log(error)
      toast.error('Something Went Wrong :(')
    })
    .finally(function () {
      router.push(`/cars`)
    })
  showConfirmModal.value = false
}
//shows the ConfirmModal
const confirmDelete = () => {
  showConfirmModal.value = true
}
</script>
<template>
  <div class="car_container">
    <div v-if="isLoading" class="loading_container">
      <h1>Loading...</h1>
    </div>

    <div v-if="!isLoading" class="car_box">
      <img class="car_img" :src="car_placeholder" alt="car" />
      <div class="car_text">
        <div class="car_name">
          <h1>{{ Car.Brand }}</h1>
          <h2>{{ Car.Name }}</h2>
        </div>
        <div class="car_infos">
          <div class="employee_container">
            <UserIcon class="employee_icon" />
            <h2>{{ Car.Employee }}</h2>
          </div>
          <div class="fuel_container">
            <FunnelIcon class="funnel_icon" />
            <h2>{{ Car.Fuel }}</h2>
          </div>
        </div>
        <div class="tüv_container">
          <img class="tüv_img" :src="TÜV_logo" alt="TÜV Logo" />
          <!-- if Tüv date is later than today green color else red color -->
          <h1
            :class="HasTüv(Car.Tüv, getCurrentDate()) ? 'red_color' : 'green_color'"
            class="car_tüv"
          >
            {{ Car.Tüv }}
          </h1>
        </div>
        <h3 class="car_notes">
          {{ Car.Notes }}
        </h3>
      </div>
    </div>
  </div>
  <div v-if="!isLoading" class="icon_wrapper">
    <TrashIcon @click="confirmDelete" class="trash_icon" />
  </div>
  <div v-if="showConfirmModal" class="modal">
    <div class="modal_content">
      <h2>Are you sure you want to delete this car?</h2>
      <button @click="deleteCar">Yes</button>
      <button @click="showConfirmModal = false">No</button>
    </div>
  </div>
</template>

<style scoped>
.car_container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 70vh;
  margin-inline: 0.75rem;
  margin-bottom: 15px;
}
.loading_container {
  margin: auto;
}

.car_box {
  display: flex;
  flex-direction: column;
}
.fuel_container {
  display: flex;
}
.employee_icon,
.funnel_icon {
  width: 25px;
  margin-right: 10px;
}
.employee_container {
  display: flex;
  margin-bottom: 10px;
}
.red_color {
  color: red;
}
.green_color {
  color: green;
}

.tüv_container {
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
}
.tüv_img {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.car_img {
  width: 60%;
  margin: 1rem;
  margin-inline: auto;
  border-radius: 10px;
  aspect-ratio: 4/3;
  filter: drop-shadow(5px 5px 10px #000000);
}
.car_name {
  text-align: center;
}

.car_infos {
  display: flex;
  justify-content: space-around;
  margin-top: 5px;
}
.car_tüv {
  text-align: center;
}
.car_notes {
  margin-top: 20px;
  font-style: italic;
  color: rgb(211, 200, 200);
  margin-inline: 20px;
  min-height: 10vh;
  min-width: 20vw;
}
.icon_wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
}
.trash_icon {
  width: 70px;
  background: red;
  padding: 10px;
  border-radius: 20px;
  border: #000000 3px solid;
  cursor: pointer;
}
.trash_icon:active {
  opacity: 70%;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_content {
  background: #141414;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f4f4f5;
  border: none;
  color: #141414;
  border-radius: 5px;
  font-weight: bold;
}

@media (min-width: 525px) {
  .car_img {
    width: 50%;
  }
}

@media (min-width: 640px) {
  .car_container {
    margin-inline: 1rem;
  }
  .car_img {
    width: 50%;
    margin: 0.75rem;
  }
  .car_box {
    flex-direction: row;
    justify-content: center;
  }
  .car_name {
    text-align: left;
  }
  .car_infos {
    flex-direction: column;
    margin-top: 15px;
  }
  .car_text {
    margin: 0.75rem;
  }

  .car_notes {
    margin-inline: 0px;
  }
  .car_tüv {
    text-align: left;
  }
  .tüv_container {
    justify-content: left;
  }
}
@media (min-width: 1024px) {
  .car_container {
    margin-inline: 2rem;
    font-size: 1.25rem;
  }
  .car_box {
    justify-content: space-between;
    max-width: 65vw;
    max-height: 50vh;
  }

  .car_text {
    margin: 1.5rem;
    width: 55%;
    margin-bottom: auto;
    margin-top: auto;
  }

  .car_img {
    width: 55%;
    margin: 1.5rem;
  }
  .employee_icon,
  .funnel_icon {
    width: 35px;
    margin-right: 10px;
  }
}
</style>
