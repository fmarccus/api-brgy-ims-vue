<script setup>

import { ref, watch, defineProps, computed, defineEmits } from 'vue';
const props = defineProps(
    {
        label: String,
        required: Boolean,
        options: Array,
    }
);
const selectedValue = ref(props.modelValue);
watch(selectedValue, newValue => {
    emit('update:modelValue', newValue);
});
const emit = defineEmits();

const labelClass = computed(() => {
    if (!props.required === true) {
        return 'form-label';
    }
    return 'form-label required'
});

</script>
<template>
    <div class="mb-3">
        <label :class="labelClass">{{ label }}</label>
        <select v-model="selectedValue" class="form-select">
            <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>