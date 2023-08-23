<script setup>

import { defineProps } from 'vue';
const props = defineProps(
    {
        text: String,
    }
);

</script>
<template>
    <div class="page page-center py-5">
        <div class="container container-slim">
            <div class="text-center">
                <div class="text-muted mb-3">{{ text }}</div>
                <div class="progress progress-sm">
                    <div class="progress-bar progress-bar-indeterminate"></div>
                </div>
            </div>
        </div>
    </div>
</template>