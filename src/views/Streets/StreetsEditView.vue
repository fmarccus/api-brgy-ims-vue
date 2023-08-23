<script setup>
import { useRoute } from 'vue-router';
import PageHeader from '../../components/PageHeader.vue';
import FormInput from '../../components/FormInput.vue';
import { onMounted } from 'vue';
import useStreets from '../../composables/streets';

const { street, getStreet, updateStreet, errors } = useStreets();

const route = useRoute();
const streetId = route.params.id;

function onImageChange(e) {
  street.value.image = e.target.files[0];
};

onMounted(() => {
  getStreet(streetId);
});

</script>

<template>
  <main>
    <PageHeader pretitle="Household Profiling" :title="`Edit ${street.name}`" model="street" routerLink=""
      :currentRouteName="this.$route.name" back="/streets/index" />
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="updateStreet(streetId)" enctype="multipart/form-data">

          <div class="mb-3">
            <label for="" class="form-label required">Street Name</label>
            <input type="text" class="form-control" v-model="street.name" aria-describedby="helpId" placeholder="">
            <div v-if="errors.name" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{ errors.name[0]
            }}
            </div>
          </div>

          <div class="mb-3">
            <label for="" class="form-label required">Upload an image for this street</label>
            <input type="file" class="form-control" @change="onImageChange" aria-describedby="fileHelpId">
            <div v-if="errors.image" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{ errors.image[0]
            }}
            </div>
          </div>

          <div class="text-end">
            <button class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
