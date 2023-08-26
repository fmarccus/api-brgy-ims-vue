<script setup>
import { useRoute } from 'vue-router';
import PageHeader from '../../components/PageHeader.vue';
import PageLoader from '../../components/PageLoader.vue';
import useResidents from '../../composables/residents';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const { indexResidents, residents, address } = useResidents();
const route = useRoute();
const householdId = route.params.householdId
const streetId = route.params.id
const loading = ref(true);

async function deleteResident(id) {
    try {
        const result = await Swal.fire({
            title: "Delete this resident?",
            showDenyButton: true,
            showConfirmButton: false,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Yes, delete this resident`,
        });
        if (result.isDenied) {
            const response = await axios.delete("http://127.0.0.1:8000/api/v1/residents/destroy/" + id);
            if (response.status === 200) {
                await indexResidents(householdId);
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
        await Swal.fire({
            position: "center",
            icon: "error",
            title: error.response.data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
    }

}

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
        <div class="col-sm-3 mb-3" v-for="resident in residents" :key="resident.id">
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
                                <a href="#" class="dropdown-item"> <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24"
                                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z">
                                        </path>
                                        <path d="M16 5l3 3"></path>
                                    </svg>Edit</a>
                                <a href="#" @click="deleteResident(resident.id)" class="dropdown-item text-danger"><svg
                                        xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                        }"></span>
                    </div>
                    <div class="card-title mb-1">{{ resident.first_name }} {{ resident.middle_name[0] }} {{
                        resident.last_name }}</div>
                    <div class="text-muted"><span :class="{
                        'badge bg-primary-lt': resident.household_head === 'Yes',
                        'badge bg-secondary-lt': resident.household_head === 'No'
                    }">
                            {{ resident.household_head === 'Yes' ? 'Household Head' : 'Family Member' }}
                        </span></div>
                </div>
                <a href="#" class="card-btn" data-bs-toggle="modal" data-bs-target="#modal-scrollable">View full profile</a>
            </div>
        </div>
    </div>
    <div class="modal modal-blur fade" id="modal-scrollable" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Scrollable modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas
                        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                </div>

            </div>
        </div>
    </div>
</template>