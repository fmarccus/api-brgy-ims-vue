<script setup>

import { defineProps, computed, defineEmits } from 'vue';
defineEmits(['update:modelValue'])
const props = defineProps(
    {
        label: String,
        type: String,
        placeholder: String,
        required: Boolean,
        help: String,
        modelValue: [String, File]
    }
);

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
        <div>
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
                class="form-control" :placeholder="placeholder">
            <small class="form-hint">{{ help }}</small>
        </div>
    </div>
</template>