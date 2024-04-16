<script setup>
import CarSearchbarComponent from '@/components/CarSearchbarComponent.vue'
import CarBoxComponent from '@/components/CarBoxComponent.vue'
import AddCarComponent from '@/components/AddCarComponent.vue'
import axios from 'axios'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted, provide } from 'vue'

const showAddCarMenu = ref(false)
const isLoading = ref(false)

const Cars = ref({ data: [] })

//gets all the cars. parameters are useful for when i call the function in the CarSearchbarComponent
const getCars = (FilterBrand, FilterEmployee, FilterTüv, searchQuery) => {
  isLoading.value = true
  axios
    .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/cars`, {
      params: {
        brand: FilterBrand,
        employee: FilterEmployee,
        tüv:FilterTüv,
        query: searchQuery
      }
    })
    .then(function (response) {
      console.log(response)
      Cars.value.data = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
      isLoading.value = false
    })
}
//providing the getCars function
provide('getCars', getCars)

//get all cars when page loads
onMounted(() => {
  getCars()
})

//toggles the AddCarMenu visibility
const toggleAddCarMenu = () => {
  showAddCarMenu.value = !showAddCarMenu.value
}
//changes the AddCarMenu visibility when i close the AddCarMenu from the AddCarComponent
const handleUpdateMenuState = (newState) => {
  showAddCarMenu.value = newState
}

//formates the date i get from db to yyyy-mm-dd format 
const formatDate = (datetimeString) => {
  return datetimeString.split('T')[0]
}
</script>
<template>
  <div class="cars_page_container">
    <h1 class="title">All Cars</h1>
    <CarSearchbarComponent />
    <!-- loop over the cars in the Cars ref -->
    <div v-if="isLoading === false" class="car_box_container">
      <CarBoxComponent
        v-for="(Car, Idx) in Cars.data"
        :key="Idx"
        :Id="Car.Id"
        :Brand="Car.Brand"
        :Name="Car.Name"
        :Employee="Car.Employee"
        :Tüv="formatDate(Car.Tüv)"
        :Notes="Car.Notes"
      />
    </div>
    <!-- if loading: -->
    <h1 v-if="isLoading" class="loading">Loading...</h1>
    <!-- if cars ref is empty: -->
    <h1 v-if="!isLoading && Cars.data.length === 0" class="no_cars_found">No Cars Found :(</h1>
    <PlusCircleIcon @click="toggleAddCarMenu" class="icon" />
    <AddCarComponent
      v-if="showAddCarMenu"
      :isOpen="showAddCarMenu"
      @update:isOpen="handleUpdateMenuState"
    />
  </div>
</template>

<style scoped>
.car_box_container {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.title {
  text-align: center;
  margin-bottom: 1rem;
  text-decoration: underline;
}

.no_cars_found {
  margin-inline: auto;
  padding: 7px;
  border: solid 3px #f4f4f5;
  background: #27272a;
  border-radius: 5px;
  width: fit-content;
}

.icon {
  width: 15vh;
  height: 15vh;
  margin-bottom: 25px;
  cursor: pointer;
  margin-inline: auto;
  margin-top: auto;
}

.icon:hover {
  cursor: pointer;
}
.cars_page_container {
  margin-inline: 0.75rem;
  display: flex;
  flex-direction: column;
  min-height: 77vh;
}

.loading {
  margin-inline: auto;
  margin-top: 20px;
}
@media (min-width: 640px) {
  .cars_page_container {
    margin-inline: 1rem;
  }
}

@media (min-width: 1024px) {
  .cars_page_container {
    margin-inline: 2rem;
  }

  .car_box_container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
