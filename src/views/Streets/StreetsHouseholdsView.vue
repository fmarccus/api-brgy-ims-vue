<script setup>
import PageHeader from '../../components/PageHeader.vue';
import useStreets from '../../composables/streets';
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
const household = ref({});

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

async function viewHousehold(id) {
  const response = await axios.get("http://127.0.0.1:8000/api/v1/households/edit/" + id);
  household.value = await response.data.data;
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
    <div class="alert alert-info alert-dismissible my-3" role="alert">
      <div class="d-flex">
        <div>
          <!-- Download SVG icon from http://tabler-icons.io/i/info-circle -->
          <svg xmlns="http://www.w3.org/2000/svg" class="icon alert-icon" width="24" height="24" viewBox="0 0 24 24"
            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M12 9h.01"></path>
            <path d="M11 12h1v4h1"></path>
          </svg>
        </div>
        <div>
          You may click any of the house to view the residents adressed in that household.
        </div>
      </div>
      <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
    </div>
    <div v-if="loading">
      <PageLoader text="Loading households" />
    </div>
    <div v-if="!households.length">
      <p class="text-center mt-5 fs-3">There are no households in this street</p>
    </div>
    <div class="row mt-3">
      <div class="col-sm-4 mb-3" v-for="household in households" :key="household.id">
        <div class="card">
          <div class="text-end py-1">
            <div class="dropdown">
              <a href="#" class="btn-action" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
              </a>
              <div class="dropdown-menu dropdown-menu-start">
                <RouterLink class="dropdown-item" :to="{
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
                <a @click="deleteHousehold(household.id)" href="#" class="dropdown-item text-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
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
          <RouterLink :to="{ name: 'ResidentsIndexView', params: { id: streetId, householdId: household.id } }">
            <img height="250" class="card-img-top"
              :src="'https://static.vecteezy.com/system/resources/previews/011/577/269/non_2x/outline-drawing-house-front-elevation-view-free-png.png'"
              alt="Title">
          </RouterLink>
          <div class="card-body bg-primary-lt">
            <div class="d-flex align-items-center">
              <div>
                <div class="fs-3 fw-bold">{{ household.house_number }} {{ streetName }} St.</div>
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
          <a href="#" class="card-btn" data-bs-toggle="modal" data-bs-target="#modal-scrollable"
            @click="viewHousehold(household.id)">View household
            profile</a>
        </div>
      </div>
    </div>
    <div class="modal modal-blur fade" id="modal-scrollable" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Household Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="datagrid-title">Number of Residents</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                </svg> {{ household.resident_count }} residents
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Total Household Income</div>
              <div class="datagrid-content">
                {{ household.household_income }} <span class="badge bg-blue-lt">{{ household.income_classification
                }}</span>
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">House Number</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                  <path d="M10 12h4v4h-4z"></path>
                </svg> {{ household.house_number }}
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Waste Management</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-recycle" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 17l-2 2l2 2"></path>
                  <path d="M10 19h9a2 2 0 0 0 1.75 -2.75l-.55 -1"></path>
                  <path d="M8.536 11l-.732 -2.732l-2.732 .732"></path>
                  <path d="M7.804 8.268l-4.5 7.794a2 2 0 0 0 1.506 2.89l1.141 .024"></path>
                  <path d="M15.464 11l2.732 .732l.732 -2.732"></path>
                  <path d="M18.196 11.732l-4.5 -7.794a2 2 0 0 0 -3.256 -.14l-.591 .976"></path>
                </svg> {{ household.waste_management }}
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Toilet Facility</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-toilet-paper" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M6 10m-3 0a3 7 0 1 0 6 0a3 7 0 1 0 -6 0"></path>
                  <path d="M21 10c0 -3.866 -1.343 -7 -3 -7"></path>
                  <path d="M6 3h12"></path>
                  <path d="M21 10v10l-3 -1l-3 2l-3 -3l-3 2v-10"></path>
                  <path d="M6 10h.01"></path>
                </svg> {{ household.toilet }}
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Type of Dwelling</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-cog" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h1.6"></path>
                  <path d="M20 11l-8 -8l-9 9h2v7a2 2 0 0 0 2 2h4.159"></path>
                  <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M18 14.5v1.5"></path>
                  <path d="M18 20v1.5"></path>
                  <path d="M21.032 16.25l-1.299 .75"></path>
                  <path d="M16.27 19l-1.3 .75"></path>
                  <path d="M14.97 16.25l1.3 .75"></path>
                  <path d="M19.733 19l1.3 .75"></path>
                </svg> {{ household.dwelling_type }}
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Type of Ownership</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-hand" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 9l-6 -6l-9 9h2v7a2 2 0 0 0 2 2h3.5"></path>
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2"></path>
                  <path
                    d="M16 17.5l-.585 -.578a1.516 1.516 0 0 0 -2 0c-.477 .433 -.551 1.112 -.177 1.622l1.762 2.456c.37 .506 1.331 1 2 1h3c1.009 0 1.497 -.683 1.622 -1.593c.252 -.938 .378 -1.74 .378 -2.407c0 -1 -.939 -1.843 -2 -2h-1v-2.636c0 -.754 -.672 -1.364 -1.5 -1.364s-1.5 .61 -1.5 1.364v4.136z">
                  </path>
                </svg> {{ household.ownership }}
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Date Created</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 5l0 14"></path>
                  <path d="M5 12l14 0"></path>
                </svg> {{ household.date_created }}
              </div>
            </div>
            <div class="mb-3">
              <div class="datagrid-title">Last Updated</div>
              <div class="datagrid-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg> {{ household.last_updated }}
              </div>
            </div>

        </div>

      </div>
    </div>
  </div>
</main></template>
