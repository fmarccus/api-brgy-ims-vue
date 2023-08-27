<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import PageHeader from '../../components/PageHeader.vue';
import useResidents from '../../composables/residents';
const { editResident, updateResident, errors, resident } = useResidents();
const route = useRoute();
const householdId = route.params.householdId
const streetId = route.params.id
const residentId = route.params.residentId;

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

onMounted(async () => {
    editResident(residentId);
});

</script>

<template>
    <main>
        <PageHeader pretitle="Household Profiling" :title="`Edit Resident`" model="resident"
            :currentRouteName="this.$route.name" :back="`/streets/${streetId}/households/${householdId}/residents`" />
        <form @submit.prevent="updateResident(residentId)" enctype="multipart/form-data">

            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>I. Personal Information</h3>
                        <p class="card-subtitle">Personal information about the resident. It documents their identification
                            in this household.</p>
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label required">First Name</label>
                            <input type="text" class="form-control" v-model="resident.first_name" aria-describedby="helpId"
                                placeholder="">
                            <div v-if="errors.first_name" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.first_name[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label">Middle Name</label>
                            <input type="text" class="form-control" v-model="resident.middle_name" aria-describedby="helpId"
                                placeholder="">
                            <div v-if="errors.middle_name" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.middle_name[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label required">Last Name</label>
                            <input type="text" class="form-control" v-model="resident.last_name" aria-describedby="helpId"
                                placeholder="">
                            <div v-if="errors.last_name" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{ errors.last_name[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <label for="" class="form-label required">Date of Birth</label>
                            <input type="date" class="form-control" v-model="resident.birth_date" aria-describedby="helpId"
                                placeholder="">
                            <div v-if="errors.birth_date" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.birth_date[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required mt-2">Sex</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sex" value="Male" v-model="resident.sex">
                                    <span class="form-check-label">Male</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sex" value="Female"
                                        v-model="resident.sex">
                                    <span class="form-check-label">Female</span>
                                </label>
                            </div>
                            <div v-if="errors.sex" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
                                errors.sex[0]
                            }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3" v-if="resident.sex == 'Female'">
                            <div class="form-label required mt-2">Pregnant</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pregnant" value="Yes"
                                        v-model="resident.pregnant">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pregnant" value="No"
                                        v-model="resident.pregnant" checked>
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.pregnant" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{ errors.pregnant[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Civil Status</label>
                            <select class="form-select" v-model="resident.civil_status">
                                <option v-for="option in civilStatusOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <div v-if="errors.civil_status" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.civil_status[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Religion</label>
                            <select class="form-select" v-model="resident.religion">
                                <option v-for="option in religionOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <div v-if="errors.religion" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{
                                    errors.religion[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-12 mb-3">
                            <label for="" class="form-label required">Nationality</label>
                            <select class="form-select" v-model="resident.nationality">
                                <option v-for="option in nationalityOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <div v-if="errors.nationality" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{ errors.nationality[0]
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>II. Contact Information</h3>
                        <p class="card-subtitle">The contact person/number/email of the resident</p>

                        <div class="col-sm-12 mb-3">
                            <label for="" class="form-label required">Phone Number/Email</label>
                            <input type="text" class="form-control" v-model="resident.contact" aria-describedby="helpId"
                                placeholder="">
                            <div v-if="errors.contact" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
                                errors.contact[0]
                            }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>III. Household Information</h3>
                        <p class="card-subtitle">Key household information of the resident </p>

                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Household Head</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="household_head" value="Yes"
                                        v-model="resident.household_head">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="household_head" value="No"
                                        v-model="resident.household_head">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.household_head" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.household_head[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Bona fide</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bonafide" value="Yes"
                                        v-model="resident.bona_fide">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bonafide" value="No"
                                        v-model="resident.bona_fide">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.bona_fide" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{ errors.bona_fide[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Resident for 6+ months</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sixmonths" value="Yes"
                                        v-model="resident.resident_six_months">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sixmonths" value="No"
                                        v-model="resident.resident_six_months">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.resident_six_months" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.resident_six_months[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Solo Parent</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="soloparent" value="Yes"
                                        v-model="resident.solo_parent">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="soloparent" value="No"
                                        v-model="resident.solo_parent">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.solo_parent" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.solo_parent[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-4 mb-3">
                            <div class="form-label required">Voter</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="voter" value="Yes"
                                        v-model="resident.voter">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="voter" value="No"
                                        v-model="resident.voter">
                                    <span class="form-check-label">No</span>
                                </label>

                            </div>
                            <div v-if="errors.voter" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
                                errors.voter[0]
                            }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>IV. Health Information</h3>
                        <p class="card-subtitle">Information about the health or disability of the resident </p>

                        <div class="col-sm-6 mb-3">
                            <div class="form-label required">Person with disability</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pwd" value="Yes" v-model="resident.pwd">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="pwd" value="No" v-model="resident.pwd">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.pwd" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
                                errors.pwd[0]
                            }}
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3" v-if="resident.pwd == 'Yes'">
                            <label for="" class="form-label required">Disability</label>
                            <select class="form-select" v-model="resident.disability">
                                <option v-for="option in disabilityOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <div v-if="errors.disability" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{
                                    errors.disability[0]
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>V. Education Information</h3>
                        <p class="card-subtitle">Documents the education background of the resident </p>

                        <div class="col-sm-6 mb-3">
                            <div class="form-label required">Studying</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="studying" value="Yes"
                                        v-model="resident.studying">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="studying" value="No"
                                        v-model="resident.studying">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.studying" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{
                                    errors.studying[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3">
                            <label for="" class="form-label required">Highest Education Attainment</label>
                            <select class="form-select" v-model="resident.highest_education">
                                <option v-for="option in educationOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <div v-if="errors.highest_education" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3"
                                role="alert">{{ errors.highest_education[0]
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <h3>VI. Employment Information</h3>
                        <p class="card-subtitle">Information about the social status and employability of the resident</p>
                        <div class="col-sm-6 mb-3">
                            <div class="form-label required">Employed</div>
                            <div>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="employed" value="Yes"
                                        v-model="resident.employed">
                                    <span class="form-check-label">Yes</span>
                                </label>
                                <label class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="employed" value="No"
                                        v-model="resident.employed">
                                    <span class="form-check-label">No</span>
                                </label>
                            </div>
                            <div v-if="errors.employed" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{
                                    errors.employed[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3" v-if="resident.employed == 'Yes'">
                            <label for="" class="form-label required">Job Title</label>
                            <select class="form-select" v-model="resident.job_title">
                                <option v-for="option in jobTitleOptions" :key="option.id" :value="option.value">{{
                                    option.label }}</option>
                            </select>
                            <div v-if="errors.job_title" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">
                                {{ errors.job_title[0]
                                }}
                            </div>
                        </div>
                        <div class="col-sm-6 mb-3" v-if="resident.employed == 'Yes'">
                            <label for="" class="form-label required">Monthly Income</label>
                            <input type="number" class="form-control" v-model="resident.income" aria-describedby="helpId"
                                placeholder="">
                            <div v-if="errors.income" class="text-danger fw-bold bg-muted-lt p-2 mt-2 mb-3" role="alert">{{
                                errors.income[0]
                            }}
                            </div>
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