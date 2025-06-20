<script setup lang="ts">
import FormBuilder from './FormBuilder.vue';
import type { FieldConfig } from '../assets/types';

const registrationFields: FieldConfig[] = [
  {
    type: 'input',
    name: 'login',
    label: 'Логин',
    placeholder: 'Ваш логин',
    required: true,
    validation: {
      minLength: 3,
      maxLength: 255
    }
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email',
    placeholder: 'Ваш Email',
    inputType: 'email',
    validation: (value) => {
      if (value && !/^\S+@\S+\.\S+$/.test(value)) {
        return 'Некорректный email';
      }
      return null;
    }
  },
  {
    type: 'input',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Ваш пароль',
    inputType: 'password',
    required: true,
    validation: { minLength: 6 }
  },
  {
    type: 'select',
    name: 'role',
    label: 'Ваша роль',
    required: true,
    options: ['Админ', 'Пользователь']
  },
  {
    type: 'checkbox',
    name: 'agreement',
    label: 'Согласие с политикой конфиденциальности',
    required: true
  }
];
</script>

<template>
  <div class="registration-form">
    <h2>Регистрация</h2>
    <FormBuilder :fields="registrationFields" />
  </div>
</template>

<style scoped lang="scss">

.registration-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: $shadow;

  h2 {
    text-align: center;
    margin: 0 0 1rem;
    color: $header;
  }
}
</style>
