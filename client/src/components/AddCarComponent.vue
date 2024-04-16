<script setup>
import { XCircleIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['update:isOpen'])

const toggleMenu = () => {
  emit('update:isOpen', !props.isOpen)
}

const isLoading = ref(false)

const handleSubmit = (event) => {
  event.preventDefault()
  const form = event.target
  const brand = form.brand.value.trim()
  const name = form.name.value.trim()
  const fuel = form.fuel.value.trim()
  const employee = form.employee.value
  const tüv = form.tüv.value
  const notes = form.notes.value.trim()

  let errorMessage = ''
  if (!brand) errorMessage += 'Brand is required. '
  if (!name) errorMessage += 'Name is required. '
  if (!fuel) errorMessage += 'Fuel type is required. '
  if (!employee) errorMessage += 'Employee selection is required. '
  if (!tüv) errorMessage += 'TÜV date is required. '

  if (errorMessage) {
    alert(`Please fill in the following fields: ${errorMessage}`)
    return
  }

  // If validation passes, send data to my addcars route on server
  isLoading.value = true
  axios
    .post(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/addcar`, {
      brand: brand,
      name: name,
      fuel: fuel,
      employee: employee,
      tüv: tüv,
      notes: notes
    })
    .then(function (response) {
      console.log(response)
      location.reload()
      toast.success('Car Successfully Added')
    })
    .catch(function (error) {
      console.log(error)
      toast.error('Something Went Wrong :(')
    })
    .finally(function () {
      isLoading.value = false
    })
}

const Employees = ref({ data: [] })

const getEmployees = () => {
  axios
    .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/employees`)
    .then(function (response) {
      console.log(response)
      Employees.value.data = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}

onMounted(() => {
  getEmployees()
})
</script>
<template>
  <div class="add_car_container">
    <div class="add_car_box">
      <XCircleIcon class="icon" @click="toggleMenu" />
      <form class="add_car_form" action="" @submit="handleSubmit">
        <div class="form_content">
          <div class="input_group">
            <label for="brand">Brand</label>
            <input type="text" name="brand" id="brand" />
          </div>
          <div class="input_group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div class="input_group">
            <label for="fuel">Fuel</label>
            <input type="text" name="fuel" id="fuel" />
          </div>
          <div class="input_group">
            <label for="employee">Employee</label>
            <select name="employee" id="employee">
              <option v-for="(Employee, Idx) in Employees.data" :key="Idx">
                {{ Employee.Firstname + ' ' + Employee.Lastname }}
              </option>
            </select>
          </div>
          <div class="input_group">
            <label for="tüv">TÜV</label>
            <input type="date" name="tüv" id="tüv" />
          </div>
          <div class="input_group">
            <label for="notes">Notes</label>
            <input type="text" name="notes" id="notes" />
          </div>
          <button
            :class="{ disabled_btn: isLoading }"
            type="submit"
            class="add_car_btn"
            :disabled="isLoading"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add_car_container {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.53);
}

.add_car_box {
  height: auto;
  width: 90%;
  max-width: 500px;
  background: #141414;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.icon {
  width: 40px;
  margin: 10px;
  margin-left: auto;
  cursor: pointer;
}

.add_car_form {
  display: flex;
  flex-direction: column;
}

.form_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.input_group {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input_group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input_group input,
.input_group select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #141414;
  font-weight: bold;
}

.add_car_btn {
  margin-inline: auto;
  color: #141414;
  background: #f4f4f5;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 15px;
  cursor: pointer;
}

.add_car_btn:active {
  background-color: #4f4f52;
  transition: 0.1s;
}
.add_car_btn:hover {
  cursor: pointer;
}
.disabled_btn {
  cursor: not-allowed;
  opacity: 50%;
}
.input_group option {
  color: #141414;
}

@media (min-width: 640px) {
  .input_group {
    flex: 0 0 48%;
  }
}

@media (min-width: 1024px) {
  .add_car_box {
    max-width: 800px;
  }
  .input_group {
    flex: 0 0 32%;
  }
}
</style>
