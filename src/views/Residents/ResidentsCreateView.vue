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
    pregnant: 'No',
    civil_status: 'Single',
    religion: 'Catholic',
    contact: '',
    nationality: 'Filipino',
    household_head: '',
    bona_fide: '',
    resident_six_months: '',
    solo_parent: '',
    voter: '',
    pwd: '',
    disability: '',
    studying: '',
    highest_education: '',
    employed: '',
    job_title: '',
    income: '',
    income_classification: '',
});

const civilStatusOptions = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Annulled', value: 'Annulled' },
    { label: 'Separated', value: 'Separated' },
    { label: 'Widowed', value: 'Widowed' },
];

const religionOptions = [
    { label: 'Roman Catholic', value: 'Catholic' },
    { label: 'Islam', value: 'Islam' },
    { label: 'Iglesia ni Cristo', value: 'INC' },
    { label: 'Philippine Independent Church', value: 'PIC' },
    { label: 'Seventh-day Adventist', value: 'Adventist' },
    { label: 'Bible Baptist Church', value: 'Baptist' },
    { label: 'United Church of Christ in the Philippines', value: 'UCCP' },
    { label: 'Jehova\'s Witness', value: 'Jehova' },
    { label: 'Church of Christ', value: 'COC' },
    { label: 'Others', value: 'Others' },
    { label: 'None', value: 'None' },
];

const nationalityOptions = [
    { label: 'Filipino', value: 'Filipino' },
    { label: 'Others', value: 'Others' },
];

const disabilityOptions = [
    { label: 'Hearing', value: 'Hearing' },
    { label: 'Intellectual', value: 'Intellectual' },
    { label: 'Learning', value: 'Learning' },
    { label: 'Mental', value: 'Mental' },
    { label: 'Orthopedic', value: 'Orthopedic' },
    { label: 'Psychosocial', value: 'Psychosocial' },
    { label: 'Speech', value: 'Speech' },
    { label: 'Visual', value: 'Visual' },
    { label: 'Cancer', value: 'Cancer' },
    { label: 'Rare disease', value: 'Rare' },
];

const educationOptions = [
    { label: 'None', value: 'None' },
    { label: 'Elementary', value: 'Elementary' },
    { label: 'Junior High', value: 'JHS' },
    { label: 'Senior High', value: 'SHS' },
    { label: 'College', value: 'College' },
    { label: 'Post-graduate', value: 'Postgrad' },
];

const jobTitleOptions = [
    { label: 'Manual Laborers', value: 'Manual' },
    { label: 'Professionals (Doctor, Lawyer, etc)', value: 'Professionals' },
    { label: 'Government Employee', value: 'Government' },
    { label: 'Private Employee', value: 'Private' },
    { label: 'Driver (Pro/Non pro)', value: 'Driver' },
    { label: 'Househelper', value: 'Househelper' },
    { label: 'Lending', value: 'Lending' },
    { label: 'Vendor/Sales Worker', value: 'Sales' },
    { label: 'Skilled agricultural, forestry and fishery workers, ', value: 'Agricultural' },
    { label: 'Others', value: 'Others' },
];

const getIncomeClassification = computed(() => {
    const income = form.income;
    if (income <= 10957) {
        form.income_classification = "Poor";
    } else if (income > 10957 && income <= 21194) {
        form.income_classification = "Low income";
    } else if (income > 21194 && income <= 43828) {
        form.income_classification = "Lower middle class";
    } else if (income > 43828 && income <= 76669) {
        form.income_classification = "Middle class";
    } else if (income > 76670 && income <= 131484) {
        form.income_classification = "Upper middle class";
    } else if (income > 131484 && income <= 219140) {
        form.income_classification = "High income";
    } else if (income > 219140) {
        form.income_classification = "Rich";
    } else {
        form.income_classification = "No data";
    }
});



</script>

<template>
    <main>
        <PageHeader pretitle="Household Profiling" :title="`Create Resident`" model="resident"
            :currentRouteName="this.$route.name" :back="`/streets/${streetId}/households/${householdId}/residents`" />
        <form @submit.prevent="" enctype="multipart/form-data">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>I. Personal Information</h3>
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
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Civil Status</label>
                            <select class="form-select" v-model="form.civil_status">
                                <option v-for="option in civilStatusOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Religion</label>
                            <select class="form-select" v-model="form.religion">
                                <option v-for="option in religionOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>

                        </div>
                        <div class="col-sm-12 mb-3">
                            <label for="" class="form-label required">Nationality</label>
                            <select class="form-select" v-model="form.nationality">
                                <option v-for="option in nationalityOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>II. Contact Information</h3>
                        <div class="col-sm-12 mb-3">
                            <label for="" class="form-label required">Phone Number/Email</label>
                            <input type="text" class="form-control" v-model="form.contact" aria-describedby="helpId"
                                placeholder="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>III. Household Information</h3>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Household Head</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="household_head" value="Yes"
                                        v-model="form.household_head">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="household_head" value="No"
                                        v-model="form.household_head">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Bona fide</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bonafide" value="Yes"
                                        v-model="form.bona_fide">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bonafide" value="No"
                                        v-model="form.bona_fide">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Resident for 6+ months</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sixmonths" value="Yes"
                                        v-model="form.resident_six_months">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sixmonths" value="No"
                                        v-model="form.resident_six_months">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Solo Parent</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="soloparent" value="Yes"
                                        v-model="form.solo_parent">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="soloparent" value="No"
                                        v-model="form.solo_parent">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Voter</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="voter" value="Yes"
                                        v-model="form.voter">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="voter" value="No"
                                        v-model="form.voter">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>IV. Health Information</h3>
                        <div class="col-sm-6 mb-3">
                            <div class="form-label required">Person with disability</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pwd" value="Yes" v-model="form.pwd">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pwd" value="No" v-model="form.pwd">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3" v-if="form.pwd == 'Yes'">
                            <label for="" class="form-label required">Disability</label>
                            <select class="form-select" v-model="form.disability">
                                <option v-for="option in disabilityOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>V. Education Information</h3>
                        <div class="col-sm-6 mb-3">
                            <div class="form-label required">Studying</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="studying" value="Yes"
                                        v-model="form.studying">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="studying" value="No"
                                        v-model="form.studying">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Highest Education Attainment</label>
                            <select class="form-select" v-model="form.highest_education">
                                <option v-for="option in educationOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>VI. Employment Information</h3>
                        <div class="col-sm-6 mb-3">
                            <div class="form-label required">Employed</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="employed" value="Yes"
                                        v-model="form.employed">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="employed" value="No"
                                        v-model="form.employed">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3" v-if="form.employed == 'Yes'">
                            <label for="" class="form-label required">Job Title</label>
                            <select class="form-select" v-model="form.job_title">
                                <option v-for="option in jobTitleOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                        </div>
                        <div class="col-sm-6 mb-3" v-if="form.employed == 'Yes'">
                            <label for="" class="form-label required">Monthly Income</label>
                            <input type="number" class="form-control" v-model="form.income" aria-describedby="helpId"
                                placeholder="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-end">
                <button class="btn btn-primary">Save</button>
            </div>
        </form>
    </main>
</template>