<template>
    <li class="settings-item">
        <div class="settings-item__title">
            <BaseIcon icon="iconamoon:menu-burger-horizontal" width="20" height="20" style="margin-right: 8px"/>
            {{ city.name }}
        </div>
        <button class="settings-item__delete" v-on:click="deleteCity(city.id)">
            <BaseIcon icon="bi:trash-fill" width="20" height="20" />
        </button>

    </li>
</template>

<script setup lang="ts">
    import BaseIcon from '@/components/BaseIcon.vue';
    import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage'

    defineProps({
        city: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['getCities', 'synchronizeLists']);

    // Delete city from local storage and in list
    const deleteCity = (id: Number): void => {
        const citiesWeather = getLocalStorage();
        citiesWeather.find((city: any, index: number) => city.id === id ? citiesWeather.splice(index, 1) : null);
        setLocalStorage(citiesWeather);
        emit('getCities');
        emit('synchronizeLists');
    }

</script>

<style scoped lang="scss">
    .settings-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 8px;
        background-color: #eeeeee;
        cursor: pointer;
        transition: 0.2s ease;
        &:not(:last-child) {
          margin-bottom: 8px;
        }
        &:hover {
            background-color: #dddddd;
        }
        & .settings-item__title {
            display: flex;
            align-items: center;
        }
        & .settings-item__delete {
            border: none;
            background: unset;
            cursor: pointer;
            transition: 0.2s ease;
            &:hover {
                transform: scale(1.2);
            }
        }
    }
</style>
