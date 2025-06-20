<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['update:show'])

function close() {
  emit('update:show', false)
}
</script>

<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-window">
        <button class="modal-close" @click="close">✖</button>
        <header class="modal-header">
          <p name="header">Вы успешно прошли регистрацию</p>
          <img src="/icon-checked.png" alt="Иконка" />
        </header>
      </div>
    </div>
  </transition>
</template>


<style scoped lang="scss">

.modal-overlay {
  @include flex-center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-window {
  background: $form-inner-bg;
  border-radius: $checkbox-radius;
  max-width: 500px;
  width: 90%;
  padding: 1rem;
  position: relative;
  box-shadow: $shadow;
  color: $header;
}

.modal-close {
  color: $header;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-header {
  @include flex-center;
  flex-direction: column;
  height: 40vh;
  font-weight: 700;
  font-size: 1.25rem;

}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>