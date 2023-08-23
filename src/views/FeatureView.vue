<script setup>
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

const formData = reactive({
    email: '',
    question: ''
});

const rules = {
    email: { email, required },
    question: { required }
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    const result = await v$.value.$validate();
    console.log(result);
};
</script>

<template>
    <main>
        <div class="container">
            <h1>Feature View</h1>
            <div class="row">
                <div class="col-sm-6">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                            <input v-model="formData.email" type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="name@example.com">
                            <div v-for="error in v$.email.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Question</label>
                            <textarea v-model="formData.question" class="form-control" id="exampleFormControlTextarea1"
                                rows="3"></textarea>
                            <div v-for="error in v$.question.$errors" :key="error.$uid">
                                {{ error.$message }}
                            </div>
                        </div>
                        <button class="btn btn-success">Send</button>
                    </form>
                    <div>
                        <h1>{{ formData.email }}</h1>
                        <h1>{{ formData.question }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
