<script setup>
import { useRoute } from 'vue-router';
import PageHeader from '../../components/PageHeader.vue';
import PageLoader from '../../components/PageLoader.vue';
import useResidents from '../../composables/residents';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import ResidentsEditView from './ResidentsEditView.vue';

const { indexResidents, residents, address, resident, editResident, deleteResident } = useResidents();
const route = useRoute();
const householdId = route.params.householdId
const streetId = route.params.id
const loading = ref(true);

onMounted(async () => {
    await indexResidents(householdId);
    loading.value = false;
});

</script>
<template>
    <PageHeader pretitle="Household Profiling" :title="`Residents in #${address} St.`" model="resident"
        :routerLink="`/streets/${streetId}/households/${householdId}/residents/create`" :currentRouteName="this.$route.name"
        :back="`/streets/${streetId}/households`" />
    <div v-if="loading">
        <PageLoader text="Loading residents" />
    </div>
    <div v-if="!residents.length">
        <p class="text-center mt-5 fs-3">There are no residents saved in this household</p>
    </div>

    <div class="row">
        <div class="col-sm-3 mb-3" v-for="resident in   residents  " :key="resident.id">
            <div class="card">
                <div class="card-body text-center">
                    <div class="text-end">
                        <div class="dropdown">
                            <a href="#" class="btn-action" data-bs-toggle="dropdown" aria-expanded="false">
                                <!-- Download SVG icon from http://tabler-icons.io/i/dots-vertical -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                </svg>
                            </a>
                            <div class="dropdown-menu dropdown-menu-start">
                                <RouterLink :to="{
                                    name: 'ResidentsEditView', params: {
                                        id: id, householdId: householdId,
                                        residentId: resident.id
                                    }
                                }" class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z">
                                        </path>
                                        <path d="M16 5l3 3"></path>
                                    </svg>Edit</RouterLink>
                                <a href="#" @click="deleteResident(resident.id, householdId)"
                                    class="dropdown-item text-danger"><svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-trash" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 7l16 0"></path>
                                        <path d="M10 11l0 6"></path>
                                        <path d="M14 11l0 6"></path>
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                    </svg>Delete</a>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <span class="avatar avatar-xl rounded" :style="{
                            'background-image': resident.sex === 'Male' ? 'url(data:image/png;base64,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)' : 'url(https://www.nicepng.com/png/detail/128-1280036_jpg-free-stock-female-vector-user-user-female.png)'
                        }
                            "></span>
                    </div>
                    <div class="card-title mb-1">{{ resident.first_name }} {{ resident.middle_name[0] }} {{
                        resident.last_name }}</div>
                    <div class="text-muted"><span :class="{
                        'badge bg-primary-lt': resident.household_head === 'Yes',
                        'badge bg-secondary-lt': resident.household_head === 'No'
                    }
                        ">
                            {{ resident.household_head === 'Yes' ? 'Household Head' : 'Family Member' }}
                        </span></div>
                </div>
                <a @click="editResident(resident.id)" href="#" class="card-btn" data-bs-toggle="modal"
                    data-bs-target="#modal-scrollable">View full profile</a>
            </div>
        </div>
    </div>
    <div class="modal modal-blur fade" id="modal-scrollable" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Resident Profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <div class="datagrid-title mb-3">Personal Information</div>
                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                            </svg> {{ resident.full_name }}, {{ resident.sex }} ({{ resident.age }} yrs. old)
                        </div>
                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-star"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M11 21h-5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3.5"></path>
                                <path d="M16 3v4"></path>
                                <path d="M8 3v4"></path>
                                <path d="M4 11h11"></path>
                                <path
                                    d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z">
                                </path>
                            </svg> {{ resident.birth_date }}
                        </div>
                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-hand-ring-finger"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M8 13v-2.5a1.5 1.5 0 0 1 3 0v1.5"></path>
                                <path
                                    d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47">
                                </path>
                                <path d="M11 11.5v-2a1.5 1.5 0 1 1 3 0v2.5"></path>
                                <path d="M14 12v-6.5a1.5 1.5 0 0 1 3 0v6.5"></path>
                            </svg> {{ resident.civil_status }}
                        </div>
                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ankh" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M6 13h12"></path>
                                <path
                                    d="M12 21v-8l-.422 -.211a6.472 6.472 0 0 1 -3.578 -5.789a4 4 0 1 1 8 0a6.472 6.472 0 0 1 -3.578 5.789l-.422 .211">
                                </path>
                            </svg> {{ resident.religion }}
                        </div>
                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flag-2-filled"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z"
                                    stroke-width="0" fill="currentColor"></path>
                            </svg> {{ resident.nationality }}
                        </div>
                        
                        <div class="datagrid-title mb-3">Contact Information</div>
                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-address-book"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z">
                                </path>
                                <path d="M10 16h6"></path>
                                <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                <path d="M4 8h3"></path>
                                <path d="M4 12h3"></path>
                                <path d="M4 16h3"></path>
                            </svg> {{ resident.contact }}
                        </div>
                        

                        <div class="datagrid-title mb-3">Household Information</div>
                        <div class="datagrid-content mb-3">
                            <div v-if="resident.household_head == 'Yes'">
                                <span class="badge bg-blue-lt mb-2">Household Head</span>
                            </div>
                            <div v-if="resident.bona_fide == 'Yes'">
                                <span class="badge bg-blue-lt mb-2">Bona Fide Resident</span>
                            </div>
                            <div v-if="resident.resident_six_months == 'Yes'">
                                <span class="badge bg-blue-lt mb-2">Lives here for 6+ months</span>
                            </div>
                            <div v-if="resident.solo_parent == 'Yes'">
                                <span class="badge bg-blue-lt mb-2">Solo Parent</span>
                            </div>
                            <div v-if="resident.voter == 'Yes'">
                                <span class="badge bg-blue-lt mb-2">Registered Voter</span>
                            </div>
                        </div>
                        

                        <div v-if="resident.pwd == 'Yes'">
                            <div class="datagrid-title mb-3">Health Information</div>
                            <span class="badge bg-danger-lt mb-2">{{ resident.disability }}</span>
                            

                        </div>

                        <div class="datagrid-title mb-3">Education Information</div>
                        <div v-if="resident.studying == 'Yes'">
                            <span class="badge bg-indigo-lt mb-2">Studying</span>
                        </div>

                        <div class="datagrid-content mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                                <path d="M3 6l0 13"></path>
                                <path d="M12 6l0 13"></path>
                                <path d="M21 6l0 13"></path>
                            </svg> {{ resident.highest_education }}
                        </div>
                        
                        <div v-if="resident.employed == 'Yes'">
                            <div class="datagrid-title mb-3">Employment Information</div>
                            <div class="datagrid-content mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings-2"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z">
                                    </path>
                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                </svg> {{ resident.job_title }}
                            </div>
                            <div class="datagrid-content mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-cashapp"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057z">
                                    </path>
                                </svg> {{ resident.income }} <span class="badge bg-info-lt">{{
                                    resident.income_classification
                                }}</span>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    </div>
</template>