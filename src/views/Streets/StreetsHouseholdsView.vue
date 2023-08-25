<script setup>
import PageHeader from '../../components/PageHeader.vue';
import useStreets from '../../composables/streets';
import useHouseholds from '../../composables/households';
import PageLoader from '../../components/PageLoader.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
const { getHouseholds, households, householdsCount, pageHouseholds, pageCountHouseholds, streetName } = useStreets();
const route = useRoute();
const loading = ref(true);
const streetId = route.params.id;

async function deleteHousehold(id) {
  try {
    const result = await Swal.fire({
      title: "Delete this household?",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Yes, delete this household`,
    });
    if (result.isDenied) {
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/v1/households/destroy/" + id
      );
      await getHouseholds(streetId);
      if (response.status === 200) {
        await Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  } catch (error) {
    if (error.response.status === 500) {
      await Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
onMounted(async () => {
  await getHouseholds(streetId);
  loading.value = false;
});

</script>

<template>
  <main>

    <PageHeader pretitle="Household Profiling" :title="`Households in ${streetName} St. (${householdsCount})`"
      model="household" :routerLink="`/streets/${streetId}/households/create`" :currentRouteName="this.$route.name"
      back="/streets/index" />
    <v-pagination v-model="pageHouseholds" :pages="pageCountHouseholds" :range-size="1" active-color="#DCEDFF"
      @update:modelValue="getHouseholds(streetId)" />
    <div v-if="loading">
      <PageLoader text="Loading households" />
    </div>
    <div v-if="!households.length">
      <p class="text-center mt-5 fs-3">There are no households in this street</p>
    </div>
    <div class="row mt-3">
      <div class="col-sm-4 mb-3" v-for="household in    households   " :key="household.id">
        <!-- <div class="card">
          <RouterLink :to="{ name: 'ResidentsIndexView', params: { id: streetId, householdId: household.id } }">
            <img height="250" class="card-img-top"
              :src="'https://png.pngtree.com/png-clipart/20220714/original/pngtree-illustration-of-facade-of-modern-luxury-house-png-image_8353619.png'"
              alt="Title">
          </RouterLink>
          <div class="card-body">
            <h4 class="card-title">#{{ household.house_number }} </h4>
            <p class="card-text">Text</p>
            <form @submit.prevent="deleteHousehold(household.id)">
              <div class="text-end">
                <RouterLink :to="{
                  name: 'HouseholdsEditView', params: {
                    id: streetId,
                    householdId: household.id
                  }
                }
                  " class="btn btn-dark me-2">
                  Edit</RouterLink>
                <button class=" btn btn-danger" type="submit">Delete</button>
              </div>
            </form>
          </div>
        </div> -->
        <div class="card">
          <RouterLink :to="{ name: 'ResidentsIndexView', params: { id: streetId, householdId: household.id } }">
            <img height="250" class="card-img-top"
              :src="'https://static.vecteezy.com/system/resources/previews/011/577/269/non_2x/outline-drawing-house-front-elevation-view-free-png.png'"
              alt="Title">
          </RouterLink>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div>
                <div class="fs-3 fw-bold">#{{ household.house_number }} {{ streetName }} St.</div>
                <div class="text-muted">Last updated: {{ household.last_updated }}</div>
              </div>
              <div class="ms-auto">

                <a href="#" class="ms-3 text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                  </svg>
                  {{ household.resident_count }} residents
                </a>
              </div>
            </div>

          </div>
          <div class="d-flex">
            <RouterLink class="card-btn bg-dark text-light" :to="{
              name: 'HouseholdsEditView', params: {
                id: streetId,
                householdId: household.id
              }
            }">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                <path d="M16 5l3 3"></path>
              </svg>Edit
            </RouterLink>

            <a @click="deleteHousehold(household.id)" href="#" class="card-btn bg-danger text-light">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 7l16 0"></path>
                <path d="M10 11l0 6"></path>
                <path d="M14 11l0 6"></path>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
              </svg>
              Delete</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
