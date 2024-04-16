<script setup>
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
import { ref, onMounted, inject } from 'vue'

//injecting getCars function from Cars Page
const getCars = inject('getCars')

const showFilterMenu = ref(false)

const carBrands = ref([])
const employees = ref([])

const searchInput = ref('')

const FilterBrand = ref('All')
const FilterEmployee = ref('All')
const FilterTüv = ref('All')

const toggleFilterMenu = () => {
  showFilterMenu.value = !showFilterMenu.value
}
//gets all Car brands without duplicates
const getCarBrands = () => {
  axios
    .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/carbrands`)
    .then(function (response) {
      carBrands.value = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}
//gets all employees
const getEmployees = () => {
  axios
    .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/employees`)
    .then(function (response) {
      employees.value = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

onMounted(() => {
  getCarBrands()
  getEmployees()
})

//set FilterBrand Ref to the selected value
const handleBrandChange = (e) => {
  FilterBrand.value = e.target.value
  getCarsWithFilter()
}
//set FilterEmployee Ref to the selected value
const handleEmployeeChange = (e) => {
  FilterEmployee.value = e.target.value
  getCarsWithFilter()
}

//set FilterTüv Ref to the selected value
const handleTüvChange = (e) => {
  FilterTüv.value = e.target.value
  getCarsWithFilter()
}

//calls getCars with Filters
const getCarsWithFilter = () => {
  getCars(FilterBrand.value, FilterEmployee.value,FilterTüv.value,searchInput.value)
}

</script>
<template>
  <div class="searchbar_container">
    <!-- binding the searchfields value to searchInputRef-->
    <input class="searchfield" type="text" placeholder="Search for Car.." v-model="searchInput" @input="getCarsWithFilter"/>
    <AdjustmentsHorizontalIcon @click="toggleFilterMenu" class="icon" />
  </div>
  <div v-if="showFilterMenu" class="filter_menu">
    <div class="input_container">
      <label for="brand">Brand</label>
      <select name="brand" id="brand" @change="handleBrandChange">
        <option value="All">All</option>
        <option v-for="(CarBrand, Idx) in carBrands" :key="Idx">
          {{ CarBrand.Brand }}
        </option>
      </select>
    </div>

    <div class="input_container">
      <label for="employee">Employee</label>
      <select name="employee" id="employee" @change="handleEmployeeChange">
        <option value="All">All</option>
        <option v-for="(Employee, Idx) in employees" :key="Idx">
          {{ Employee.Firstname + ' ' + Employee.Lastname }}
        </option>
      </select>
    </div>
    <div class="input_container">
      <label for="tüv">TÜV</label>
      <select name="tüv" id="tüv" @change="handleTüvChange">
        <option value="All">All</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.icon {
  width: 50px;
  height: 50px;
  background-color: #171717;
  border: solid;
  border-radius: 15px;
  padding: 10px;
  margin-left: 10px;
}

.icon:active {
  background-color: #4f4f52;
  transition: 0.1s;
}
.icon:hover {
  cursor: pointer;
}

.input_container {
  display: flex;
  align-items: center;
}
label {
  margin-right: 10px;
}
input[type='checkbox'],
select {
  cursor: pointer;
}
select,
option {
  color: #171717;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
}

.searchfield {
  border-radius: 10px;
  font-size: 1.5rem;
  text-align: center;
  color: #171717;
  width: 80%;
}
.searchbar_container {
  display: flex;
  justify-content: center;
}

.filter_menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #27272a;
  height: 20vh;
  border-radius: 10px;
  padding: 10px;
  margin-top: 0.5rem;
  color: #f4f4f5;
  font-size: 1.25rem;
  font-weight: bold;
}

@media (min-width: 640px) {
  .filter_menu {
    flex-direction: row;
    font-size: 1.5rem;
  }
  .searchfield {
    width: 60%;
  }
}
@media (min-width: 640px) {
  .searchfield {
    width: 40%;
  }
  .filter_menu {
    font-size: 1.75rem;
  }
  input[type='checkbox'] {
    width: 20px;
    height: 20px;
  }
}
</style>
