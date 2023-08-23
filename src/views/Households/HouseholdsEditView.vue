<script setup>
import PageHeader from '../../components/PageHeader.vue';
import useHouseholds from '../../composables/households';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const { editHousehold, updateHousehold, household } = useHouseholds();
const route = useRoute();
const streetId = route.params.id;
const householdId = route.params.householdId;
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
onMounted(() => {
  editHousehold(householdId);
});
</script>

<template>
  <main>
    <PageHeader pretitle="Household Profiling" title="Edit Household" model="household" routerLink=""
      :currentRouteName="this.$route.name" :back="`/streets/${streetId}/households`" />
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="updateHousehold(householdId)" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="" class="form-label required">House Number</label>
            <input type="text" class="form-control" v-model="household.house_number" aria-describedby="helpId"
              placeholder="Enter house number">
            <!-- error -->
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Waste Management</label>
            <select class="form-select" v-model="household.waste_management">
              <option v-for="option in wasteManagementOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Toilet Facility</label>
            <select class="form-select" v-model="household.toilet">
              <option v-for="option in toiletFacilityOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <!-- error -->
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Type of Dwelling</label>
            <select class="form-select" v-model="household.dwelling_type">
              <option v-for="option in typeDwellingOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <!-- error -->
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Type of Ownership</label>
            <select class="form-select" v-model="household.ownership">
              <option v-for="option in ownershipOptions" :key="option.id" :value="option.value"> {{
                option.label }} </option>
            </select>
            <!-- error -->
          </div>

          <div class="text-end">
            <button class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
