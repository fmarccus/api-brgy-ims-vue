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
    console.log(error);
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
      <div class="col-sm-3 mb-3" v-for="household in   households  " :key="household.id">
        <div class="card">
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
        </div>
      </div>
    </div>
  </main>
</template>
