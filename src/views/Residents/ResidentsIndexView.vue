<script setup>
import { useRoute } from 'vue-router';
import PageHeader from '../../components/PageHeader.vue';
const route = useRoute();
const householdId = route.params.householdId
const streetId = route.params.id

console.log(householdId);
console.log(streetId);


</script>
<template>
    <PageHeader pretitle="Household Profiling" :title="`Residents in ...`" model="resident"
        :routerLink="`/streets/${streetId}/households/${householdId}/residents/create`" :currentRouteName="this.$route.name"
        :back="`/streets/${streetId}/households`" />
</template>