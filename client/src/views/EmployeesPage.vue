<script setup>
import EmployeeBoxComponent from '@/components/EmployeeBoxComponent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const isLoading = ref(false)
const Employees = ref({ data: [] })

//gets all empolyees and puts them into EmployeesRef
const getEmployees = () => {
  isLoading.value = true
  axios
    .get(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/employees`)
    .then(function (response) {
      console.log(response)
      Employees.value.data = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
    .finally(function () {
      isLoading.value = false
    })
}

onMounted(() => {
  getEmployees()
})

</script>
<template>
  <div class="employees_page_container">
    <h1 class="title">Employees</h1>

    <div v-if="isLoading === false" class="employee_box_container">
      <EmployeeBoxComponent
        v-for="(Employee, Idx) in Employees.data"
        :key="Idx"
        :Firstname="Employee.Firstname"
        :Lastname="Employee.Lastname"
        :Carid="Employee.Carid"
      />
    </div>
    <!-- if loading: -->
    <h1 v-if="isLoading" class="loading">Loading...</h1>
    <!-- if employees ref is empty: -->
    <h1 v-if="!isLoading && Employees.data.length === 0" class="no_employees_found">
      No employees Found :(
    </h1>
  </div>
</template>

<style scoped>
.employee_box_container {
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

.no_employees_found {
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
.employees_page_container {
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
  .employees_page_container {
    margin-inline: 1rem;
  }
}

@media (min-width: 1024px) {
  .employees_page_container {
    margin-inline: 2rem;
  }

  .employee_box_container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
