<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { FieldConfig } from '../assets/types';
import { validateField } from '../assets/helpers';
import ModalWindow from './ModalWindow.vue';
import SubmitButton from './SubmitButton.vue';

const showModal = ref(false)

const props = defineProps<{
  fields: FieldConfig[];
}>();

const formState = reactive<Record<string, any>>({});
const errors = reactive<Record<string, string>>({});

// Инициализация состояния
props.fields.forEach(field => {
  if (field.type === 'checkbox') {
    formState[field.name] = false;
  } else {
    formState[field.name] = '';
  }
});

const handleChange = (field: FieldConfig, value: any) => {
  formState[field.name] = value;
  errors[field.name] = validateField(field, value) || '';
};

// Проверка валидности всей формы
const isValid = computed(() => {
  return props.fields.every(field => {
    const error = validateField(field, formState[field.name]);
    return !error;
  });
});

// Отправка формы
const submitForm = () => {
  console.log(formState);
  showModal.value = true;
  // Сбрасываем состояния 
  props.fields.forEach(field => {
    if (field.type === 'checkbox') {
      formState[field.name] = false;
    } else {
      formState[field.name] = '';
    }
  });
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label>{{ field.label }} {{ field.required ? '*' : '' }}</label>

      <!-- Рендеринг по типу поля -->
      <template v-if="field.type === 'input'">
        <input :type="field.inputType || 'text'" v-model="formState[field.name]"
          @input="handleChange(field, formState[field.name])"  :placeholder="field.placeholder" />
      </template>

      <template v-else-if="field.type === 'select'">
        <select v-model="formState[field.name]" @change="handleChange(field, formState[field.name])">
          <option value="" disabled>Укажите роль</option>
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </template>

      <template v-else-if="field.type === 'checkbox'">
        <div class="checkbox-agreement">

          <input type="checkbox" v-model="formState[field.name]" @change="handleChange(field, formState[field.name])"
            id="agreement" />
          <span class="custom-checkbox"></span>
          <span class="agreement-text">
            Я принимаю условия <a href="#">Публичной оферты</a>, <a href="#">Политики конфиденциальности</a> и даю
            согласие на обработку моих персональных данных и рассылку электронных сообщений.
          </span>
        </div>
      </template>

      <div v-if="errors[field.name]" class="error">
        {{ errors[field.name] }}
      </div>
    </div>

    <SubmitButton :disabled="!isValid" @click="submitForm" />
  </form>


  <ModalWindow v-model:show="showModal" />


</template>

<style scoped lang="scss">
.form-field {
  margin-bottom: .7rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: left;
  color: $header;
}


input,
select {
  @include input-style();
}

.error {
  color: $error;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.checkbox-agreement {
  @include checkbox-style;
}
</style>
``