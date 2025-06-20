import type { FieldConfig } from "./types";

// Валидация поля
export const validateField = (field: FieldConfig, value: any) => {
  if (field.required && !value) {
    return 'Обязательное поле';
  }

  if (field.validation) {
    if (typeof field.validation === 'function') {
      return field.validation(value);
    } else {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `Минимум ${field.validation.minLength} символа`;
      }
      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `Максимум ${field.validation.maxLength} символов`;
      }
      if (field.validation.pattern && !field.validation.pattern.test(value)) {
        return 'Некорректный формат';
      }
    }
  }
  return null;
};
