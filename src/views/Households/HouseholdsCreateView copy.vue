<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import FormInput from '../../components/FormInput.vue';
import FormSelect from '../../components/FormSelect.vue';
import useHouseholds from '../../composables/households.js';
const { storeHousehold } = useHouseholds();
const route = useRoute();
const streetId = route.params.id;
const form = reactive({
  street_id: streetId,
  house_number: '',
  waste_management: '',
  toilet: '',
  dwelling_type: '',
  ownership: ''
});
const wasteManagementOptions = [
  { label: 'Incineration', value: 'Incineration' },
  { label: 'Composting', value: 'Composting' },
  { label: 'Recycled', value: 'Recycled' },
  { label: 'Others', value: 'Others' },
];
const toiletFacilityOptions = [
  { label: 'Pail', value: 'Pail' },
  { label: 'Flushed', value: 'Flushed' },
  { label: 'Others', value: 'Others' },
  { label: 'None', value: 'None' },
];
const typeDwellingOptions = [
  { label: 'Concrete', value: 'Concrete' },
  { label: 'Semiconcrete', value: 'Semiconcrete' },
  { label: 'Wood', value: 'Wood' },
  { label: 'Others', value: 'Others' },
];
const ownershipOptions = [
  { label: 'Rented', value: 'Rented' },
  { label: 'Owned', value: 'Owned' },
  { label: 'Shared', value: 'Shared' },
  { label: 'Informal', value: 'Informal' },
];
</script>

<template>
  <main>
    <PageHeader pretitle="Household Profiling" title="Create new household" model="household" routerLink=""
      :currentRouteName="this.$route.name" :back="`/streets/${streetId}/households`" />
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="storeHousehold(form)" enctype="multipart/form-data">

          <div class="mb-3">
            <label for="" class="form-label required">House Number</label>
            <input type="text" class="form-control" v-model="form.house_number" aria-describedby="helpId"
              placeholder="Enter house number">
            <!-- error -->
          </div>

          <div class="mb-3">
            <label for="" class="form-label">Waste Management</label>
            <select class="form-select" v-model="form.waste_management">
              <option v-for="option in wasteManagementOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <!-- error -->
          </div>


          <!-- <FormInput v-model="form.house_number" label="House Number" type="text" placeholder="Enter house number"
            :required="true" help="">
          </FormInput> -->
          <FormSelect v-model="form.waste_management" label="Waste Management" :required="true"
            :options="wasteManagementOptions">
          </FormSelect>
          <FormSelect v-model="form.toilet" label="Toilet Facility" :required="true" :options="toiletFacilityOptions">
          </FormSelect>
          <FormSelect v-model="form.dwelling_type" label="Type of Dwelling" :required="true"
            :options="typeDwellingOptions">
          </FormSelect>
          <FormSelect v-model="form.ownership" label="Type of Ownership" :required="true" :options="ownershipOptions">
          </FormSelect>
          <div class="text-end">
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
