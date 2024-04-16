<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'

//props form employee page
const props = defineProps(['Firstname', 'Lastname'])

</script>

<template>
  <div class="employee_box">
    <UserIcon class="user_icon" />
    <div class="employee_details">
      <p class="employee_name">{{ props.Firstname }} {{ props.Lastname }}</p>
    </div>
  </div>
</template>

<style scoped>
.employee_box {
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: solid 5px #e6c74c;
  border-radius: 2px;
  cursor: pointer;
  margin: 20px;
  background: #0e0d0d;
}

.user_icon {
  color: #4b5563;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.employee_details {
  display: flex;
  flex-direction: column;
}

.employee_name{
  margin-top: 3px;
  font-weight: bold;
  color: #f4f4f5;
}

@media (max-width: 640px) {
  .employee_box {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
