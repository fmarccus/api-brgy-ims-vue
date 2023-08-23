<script setup>
import { useRoute } from 'vue-router';
import { computed, reactive } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
const route = useRoute();
const householdId = route.params.householdId
const streetId = route.params.id
const form = reactive({
    household_id: householdId,
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    sex: '',
    pregnant: '',
    civil_status: '',
    religion: '',
    contact: '',
    nationality: '',
});

const civilStatusOptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Annulled', value: 'Annulled' },
    { label: 'Separated', value: 'Separated' },
    { label: 'Widowed', value: 'Widowed' },
];

computed(() => {

});
</script>

<template>
    <main>
        <!-- $table->string('birth_date');
        $table->integer('age');
        $table->string('sex');
        $table->string('pregnant')->nullable();
        $table->string('religion');
        $table->string('civil_status');
        $table->string('nationality');
        $table->string('contact')->nullable();
        $table->string('household_head');
        $table->string('bona_fide');
        $table->string('resident_six_months');
        $table->string('solo_parent');
        $table->string('voter');
        $table->string('pwd');
        $table->string('disability')->nullable();
        $table->string('is_studying');
        $table->string('education');
        $table->string('institution')->nullable();
        $table->string('graduate_year')->nullable();
        $table->string('specialization')->nullable();
        $table->integer('income')->nullable();
        $table->string('income_classification');
        $table->string('is_employed');
        $table->string('job_title')->nullable(); -->
        <PageHeader pretitle="Household Profiling" :title="`Create Resident`" model="resident"
            :currentRouteName="this.$route.name" :back="`/streets/${streetId}/households/${householdId}/residents`" />
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="" enctype="multipart/form-data">
                    <h3>Step I. Personal Information</h3>
                    <div class="row">
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label required">First Name</label>
                            <input type="text" class="form-control" v-model="form.first_name" aria-describedby="helpId"
                                placeholder="">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label">Middle Name</label>
                            <input type="text" class="form-control" v-model="form.middle_name" aria-describedby="helpId"
                                placeholder="">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label required">Last Name</label>
                            <input type="text" class="form-control" v-model="form.last_name" aria-describedby="helpId"
                                placeholder="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label required">Date of Birth</label>
                            <input type="date" class="form-control" v-model="form.birth_date" aria-describedby="helpId"
                                placeholder="">
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required mt-2">Sex</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sex" value="Male" v-model="form.sex">
                                    <span class="form-check-label">Male</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sex" value="Female"
                                        v-model="form.sex">
                                    <span class="form-check-label">Female</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3" v-if="form.sex == 'Female'">
                            <div class="form-label required mt-2">Pregnant</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pregnant" value="Yes"
                                        v-model="form.pregnant">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pregnant" value="No"
                                        v-model="form.pregnant" checked>
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Civil Status</label>
                            <select class="form-select" v-model="form.civil_status">
                                <option v-for="option in civilStatusOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Religion</label>
                            <input type="text" class="form-control" v-model="form.religion" aria-describedby="helpId"
                                placeholder="">
                        </div>
                        <div class="col-sm-12 mb-3">
                            <label for="" class="form-label required">Nationality</label>
                            <input type="text" class="form-control" v-model="form.nationality" aria-describedby="helpId"
                                placeholder="">
                        </div>
                        <h3>Step II. Contact Information</h3>
                        <div class="col-sm-12 mb-3">
                            <label for="" class="form-label required">Phone Number/Email</label>
                            <input type="text" class="form-control" v-model="form.contact" aria-describedby="helpId"
                                placeholder="">
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