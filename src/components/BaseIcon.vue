<template>
    <Icon :icon="icon" :width="width" :height="height"/>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    defineProps({
        icon: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: 28
        },
        height: {
            type: String,
            default: 28
        }
    });


</script>

<style scoped lang="scss">

</style>
