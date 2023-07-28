<template>
    <div class="add-city">
        <h4 class="add-city-title">Add location</h4>
        <form v-on:submit.prevent="addCity" class="add-city-actions">
            <BaseInput placeholder="City name" class="add-city-input" v-model="cityName" @input="isError = false"/>

            <button type="submit" class="add-city-btn">
                <BaseIcon icon="material-symbols:subdirectory-arrow-left-rounded"/>
            </button>

        </form>
        <p v-if="isError.status" class="error-message">{{ isError.message }}</p>
    </div>
</template>

<script setup lang="ts">
    import BaseIcon from '@/components/BaseIcon.vue';
    import BaseInput from '@/components/BaseInput.vue';
    import axios from 'axios';
    import { setLocalStorage } from '@/helpers/localStorage';
    import { ref, Ref } from 'vue';

    const emit = defineEmits(['getCities']);

    const cityName: Ref<string> = ref('');
    const isError: Ref<{ status: boolean, message: string }> = ref({ status: false, message: '' });

    // Add city
    const addCity = async (): Promise<void> => {
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&lang=${process.env.VUE_APP_LANGUAGE}&appid=${process.env.VUE_APP_API_KEY}`)
            .then(res => {
                setLocalStorage([res.data]);
                cityName.value = '';
                isError.value = {
                    status: false,
                    message: ''
                }
                emit('getCities');
            })
            .catch(() => {
                isError.value = {
                    status: true,
                    message: 'This city doesn\'t exist.'
                }
            });
    }

</script>


<style scoped lang="scss">
    .add-city {
        font-family: sans-serif;
        width: 240px;
        padding: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        & .add-city-title {
            margin-top: 0;
        }
    }
</style>
