
export interface FormField {
  type: string;
  label: string;
  model: string;
  placeholder?: string;
  options?: Array<{ label: string; value: any }>;
  validations?: Array<{ rule: string; value?: any; message: string }>;
  conditional?: {
    model: string;
    value: any;
  };
  icon?: string;
}

export type FormSchema = FormField[];