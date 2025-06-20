<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits(['click'])

const onClick = (event: Event) => {
  emit('click', event)
}
</script>

<template>
  <button
    :disabled="disabled"
    type="submit"
    class="button"
    @click="onClick"
  >
    Зарегистрироваться
  </button>
</template>

<style scoped lang="scss">

.button {
  @include button-style($primary, $form-inner-bg);
}
</style>