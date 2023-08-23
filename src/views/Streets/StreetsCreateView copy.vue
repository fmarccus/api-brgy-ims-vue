<script setup>
import PageHeader from '../../components/PageHeader.vue';
import FormInput from '../../components/FormInput.vue';
import { reactive } from 'vue';
import useStreets from '../../composables/streets';
const { storeStreet, errors } = useStreets();

const form = reactive({
  name: "",
  image: null
});

function onImageChange(e) {
  form.image = e.target.files[0];
};

</script>

<template>
  <main>
    <PageHeader pretitle="Household Profiling" title="Create new street" model="street" routerLink=""
      :currentRouteName="this.$route.name" back="/streets/index" />
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="storeStreet(form)" enctype="multipart/form-data">
          <!-- <FormInput v-model="form.name" label="Street Name" type="text" placeholder="Enter street" :required="true"
            help="">
          </FormInput>
          <div v-if="errors.name" class="text-danger fw-bold bg-muted-lt p-2 mb-3" role="alert">{{ errors.name[0] }}</div>

          <FormInput v-model="form.image" label="Street Image" type="file" placeholder="" :required="true"
            help="Upload an image for this street" v-on:change="onImageChange">
          </FormInput>
          <div v-if="errors.image" class="text-danger fw-bold bg-muted-lt p-2 mb-3" role="alert">{{ errors.image[0] }}
          </div> -->
          <div class="mb-3">
            <label for="" class="form-label required">Street Name</label>
            <input type="text" class="form-control" v-model="form.name" aria-describedby="helpId" placeholder="">
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
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
