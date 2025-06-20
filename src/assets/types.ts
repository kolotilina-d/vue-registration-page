export type FieldType = 'input' | 'select' | 'checkbox';

export interface BaseFieldConfig {
  type: FieldType;
  label: string;
  name: string;
  required?: boolean;
  validation?: ValidationRule;
}

export interface InputFieldConfig extends BaseFieldConfig {
  type: 'input';
  inputType?: 'text' | 'password' | 'email';
  placeholder: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select';
  options: string[];
  defaultValue?: string;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  checked?: boolean;
}

export type FieldConfig =
  | InputFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig;

export type ValidationRule =
  | { minLength?: number; maxLength?: number; pattern?: RegExp }
  | ((value: any) => string | null);
