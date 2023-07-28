<template>
    <input
        type="text"
        :placeholder="placeholder"
        class="weather-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup lang="ts">
  defineProps({
      modelValue: {
        type: String,
        required: false
      },
      placeholder: {
          type: String,
          default: 'Text',
      }
  });
  defineEmits(['update:modelValue']);
</script>

<style lang="scss">
  .weather-input {
      border: none;
      background-color: #f5f5f5;
      padding: 8px 16px;
  }
  .weather-input:focus {
      outline: none;
  }
  ::placeholder {
      opacity: 0.4;
  }
</style>
