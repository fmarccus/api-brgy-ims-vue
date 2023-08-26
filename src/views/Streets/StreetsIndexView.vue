<script setup>
import PageHeader from '../../components/PageHeader.vue';
import PageLoader from '../../components/PageLoader.vue';
import { onMounted, ref, reactive } from 'vue';

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import useStreets from '../../composables/streets';
const { getStreets, streets, page, pageCount, streetsCount, editStreet, deleteStreet } = useStreets();


onMounted(async () => {
  await getStreets();
  loading.value = false;
});

</script>

<template>
  <PageHeader pretitle="Household Profiling" :title="`Streets (${streetsCount})`" model="street"
    routerLink="/streets/create" :currentRouteName="this.$route.name" back="/" />

  <main>
    <v-pagination v-model="page" :pages="pageCount" :range-size="1" active-color="#DCEDFF"
      @update:modelValue="getStreets" />
    <div v-if="loading">
      <PageLoader text="Loading streets" />
    </div>
    <div v-if="!streets.length">
      <p class="text-center mt-5 fs-3">There are no streets saved</p>
    </div>
    <div class="row mt-3">
      <div class="col-sm-4 mb-3" v-for=" street in streets" :key="street.id">

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
                <a @click="editStreet(street.id)" href="#" class="dropdown-item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24"
                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                  </svg>
                  Edit</a>
                <a @click="deleteStreet(street.id)" href="#" class="dropdown-item text-danger">
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
          <RouterLink class="d-block" :to="{ name: 'StreetsHouseholdsView', params: { id: street.id } }">
            <img height="250" class="card-img-top" :src="'http://127.0.0.1:8000/street_images/' + street.image"
              alt="Title">
          </RouterLink>
          <div class="card-body bg-primary-lt py-3">

            <div class="d-flex align-items-center">
              <div>
                <div class="fs-3 fw-bold">{{ street.name }}</div>
                <div class="text-muted">Last updated: {{ street.last_updated }}</div>
              </div>
              <div class="ms-auto">
                <a href="#" class="text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-star" width="24"
                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19.258 10.258l-7.258 -7.258l-9 9h2v7a2 2 0 0 0 2 2h4"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h1.5"></path>
                    <path
                      d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z">
                    </path>
                  </svg>
                  {{ street.household_count }}
                </a>
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
                  {{ street.resident_count }}
                </a>
              </div>
            </div>

          </div>
          <!-- <div class="d-flex">

            <a @click="editStreet(street.id)" href="#" class="card-btn bg-dark text-light">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                <path d="M16 5l3 3"></path>
              </svg>
              Edit</a>
            <a @click="deleteStreet(street.id)" href="#" class="card-btn bg-danger text-light">
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
          </div> -->
        </div>
      </div>
    </div>
  </main>
</template>
