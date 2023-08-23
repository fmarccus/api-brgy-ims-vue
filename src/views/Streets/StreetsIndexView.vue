<script setup>
import PageHeader from '../../components/PageHeader.vue';
import PageLoader from '../../components/PageLoader.vue';
import { onMounted, ref } from 'vue';

import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import useStreets from '../../composables/streets';
const { getStreets, streets, page, pageCount, streetsCount, editStreet, deleteStreet } = useStreets();

const loading = ref(true);

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
      <div class="col-sm-4 mb-3" v-for=" street  in   streets  " :key="street.id">
        <div class="card">
          <RouterLink :to="{ name: 'StreetsHouseholdsView', params: { id: street.id } }">
            <img height="250" class="card-img-top" :src="'http://127.0.0.1:8000/street_images/' + street.image"
              alt="Title">
          </RouterLink>
          <div class="card-body">
            <h4 class="card-title">{{ street.name }} St.</h4>
            <p class="card-text">Text</p>
            <form @submit.prevent="deleteStreet(street.id)">
              <div class="text-end">
                <button class="btn btn-dark me-2" @click="editStreet(street.id)">Edit</button>
                <button class="btn btn-danger" type="submit">Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
