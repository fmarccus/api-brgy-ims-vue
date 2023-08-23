<script setup>

import { defineProps, computed } from 'vue';
const props = defineProps(
    {
        pretitle: String,
        title: String,
        model: String,
        routerLink: String,
        currentRouteName: String,
        back: String
    }
);

const showCreateButton = computed(() => {
    return props.currentRouteName == 'StreetsIndexView' || props.currentRouteName == 'StreetsHouseholdsView' || props.currentRouteName == 'ResidentsIndexView';
});

</script>
<template>
    <div class="page-header d-print-none mb-5">
        <div class="">
            <div class="row g-2 align-items-center">
                <div class="col">
                    <!-- Page pre-title -->
                    <div class="page-pretitle">
                        {{ pretitle }}
                    </div>
                    <h1>
                        {{ title }}
                    </h1>
                </div>
                <!-- Page title actions -->
                <div class="col-auto ms-auto d-print-none">
                    <div class="btn-list">
                        <span class="">
                            <RouterLink :to="back" class="btn fw-bold">
                                Back
                            </RouterLink>
                        </span>
                        <router-link v-if="showCreateButton" :to="routerLink"
                            class="btn btn-primary d-none d-sm-inline-block fw-bold">
                            <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                            Create new {{ model }}
                        </router-link>
                        <RouterLink v-if="showCreateButton" :to="routerLink" class="btn btn-primary d-sm-none btn-icon">
                            <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>