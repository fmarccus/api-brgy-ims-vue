<script setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import useHouseholds from '../../composables/households.js';
const { storeHousehold, errors } = useHouseholds();
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
            <div v-if="errors.house_number" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
              errors.house_number[0]
            }}
            </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Waste Management</label>
            <select class="form-select" v-model="form.waste_management">
              <option v-for="option in wasteManagementOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <div v-if="errors.waste_management" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
              errors.waste_management[0]
            }}
            </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Toilet Facility</label>
            <select class="form-select" v-model="form.toilet">
              <option v-for="option in toiletFacilityOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <div v-if="errors.toilet" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
              errors.toilet[0]
            }}
            </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Type of Dwelling</label>
            <select class="form-select" v-model="form.dwelling_type">
              <option v-for="option in typeDwellingOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <div v-if="errors.dwelling_type" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
              errors.dwelling_type[0]
            }}
            </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Type of Ownership</label>
            <select class="form-select" v-model="form.ownership">
              <option v-for="option in ownershipOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <div v-if="errors.ownership" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
              errors.ownership[0]
            }}
            </div>
          </div>


          <!-- <FormInput v-model="form.house_number" label="House Number" type="text" placeholder="Enter house number"
            :required="true" help="">
          </FormInput> -->
          <!-- <FormSelect v-model="form.waste_management" label="Waste Management" :required="true"
            :options="wasteManagementOptions">
          </FormSelect> -->
          <!-- <FormSelect v-model="form.toilet" label="Toilet Facility" :required="true" :options="toiletFacilityOptions">
          </FormSelect> -->
          <!-- <FormSelect v-model="form.dwelling_type" label="Type of Dwelling" :required="true"
            :options="typeDwellingOptions">
          </FormSelect> -->
          <!-- <FormSelect v-model="form.ownership" label="Type of Ownership" :required="true" :options="ownershipOptions">
          </FormSelect> -->
          <div class="text-end">
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
