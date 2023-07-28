<template>
    <button v-on:click="toggleSettings" class="settings-btn">
        <BaseIcon icon="bi:gear" class="settings"/>
    </button>

    <Transition name="slide-fade">
        <div class="settings-modal" v-if="modalDialog">
            <h4 class="settings-modal__title">Settings</h4>

            <ul class="settings-list">
                <draggable
                    v-model="standCitiesWeather"
                    item-key="id"
                    @end="editPositions"
                >
                    <template #item="{element}">
                        <SettingsItem
                            :city="element"
                            v-on:getCities="$emit('getCities')"
                            v-on:synchronizeLists="synchronizeLists"
                        />

                    </template>
                </draggable>
            </ul>

            <div class="add-city">
                <h4>Add location</h4>
                <form v-on:submit.prevent="addCity" class="add-city-actions">
                    <BaseInput placeholder="City name" class="add-city-input" v-model="cityName" @input="isError = false"/>

                    <button type="submit" class="add-city-btn">
                        <BaseIcon icon="material-symbols:subdirectory-arrow-left-rounded"/>
                    </button>

                </form>
                <p v-if="isError.status" class="error-message">{{ isError.message }}</p>
            </div>

            <button class="settings-close" v-on:click="toggleSettings">
                <BaseIcon icon="icon-park-outline:close"/>
            </button>
        </div>
    </Transition>


</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import type { Ref } from 'vue';
    import BaseIcon from '@/components/BaseIcon.vue';
    import SettingsItem from '@/components/SettingsItem.vue';
    import BaseInput from '@/components/BaseInput.vue';
    import draggable from 'vuedraggable';
    import axios from 'axios';
    import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage';

    const props = defineProps({
        citiesWeather: {
            type: Array,
            required: true
        }
    });
    const emit = defineEmits(['getCities']);

    const apiCode = 'efb3f138bcc5828f7116e4381f313dd8';
    const cityName: Ref<string> = ref('');
    const modalDialog: Ref<boolean> = ref(false);
    const isError: Ref<{ status: boolean, message: string }> = ref({ status: false, message: '' });
    const standCitiesWeather = ref(props.citiesWeather);

    // Clear errors
    const clearError = (): void => {
        isError.value = {
            status: false,
            message: ''
        }
    };

    // Toggle settings
    const toggleSettings = (): void => {
        clearError();
        modalDialog.value = !modalDialog.value;
    };

    // Synchronization of settings and content lists localStorage
    const synchronizeLists = (): void => {
        standCitiesWeather.value = getLocalStorage();
    }

    // Add city
    const addCity = async (): Promise<void> => {
        const newCitiesWeather:Array<any> = [...props.citiesWeather];

        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&lang=${process.env.VUE_APP_LANGUAGE}&appid=${process.env.VUE_APP_API_KEY}`)
            .then(res => {

                const duplicate = props.citiesWeather.find((city: any) => city.id === res.data.id)

                if (duplicate === undefined) {
                    newCitiesWeather.push(res.data);
                    setLocalStorage(newCitiesWeather);
                    cityName.value = '';
                    standCitiesWeather.value = newCitiesWeather;
                    clearError();
                    emit('getCities');
                } else {
                    isError.value = {
                      status: true,
                      message: 'This city has already been added'
                    }
                }
            })
            .catch(() => {
                isError.value = {
                    status: true,
                    message: 'This city doesn\'t exist.'
                }
            });
    }

    // Synchronization of the list on the page and in localStorage
    const editPositions = ():void => {
        setLocalStorage(standCitiesWeather.value);
        emit('getCities');
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .settings-btn {
        position: absolute;
        border: none;
        background: unset;
        cursor: pointer;
        top: 8px;
        right: 8px;
        opacity: 0.1;
        transition: 0.3s ease;
        &:hover {
            opacity: 1;
        }
    }
    .settings-modal {
        position: absolute;
        background: #ffffff;
        width: calc(100% - 32px);
        top: 0;
        left: 0;
        padding: 16px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

        & .settings-modal__title {
            margin-top: 0;
        }

        & .settings-list {
            list-style: none;
            padding: 0;
        }

        & .settings-close {
            border: none;
            background: unset;
            position: absolute;
            padding: 0;
            top: 8px;
            right: 8px;
            cursor: pointer;
            opacity: 0.3;
            transition: 0.3s ease;
            &:hover {
                opacity: 1;
            }
        }
    }
    .add-city {
        & .add-city-actions {
            display: flex;

            & .add-city-btn {
                border: none;
                background: unset;
                width: 25%;
                cursor: pointer;
                transition: 0.2s ease;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
        & .error-message {
            color: red;
        }
    }
</style>
