import { UseControllerProps } from 'react-hook-form';
import { ILoginForm } from '../../models/login/ILoginForm.model';

export const loginFormSettings: Record<
  keyof ILoginForm,
  UseControllerProps<ILoginForm, keyof ILoginForm>
> = {
  email: {
    name: 'email',
    rules: {
      required: { value: true, message: 'required field' },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email address',
      },
    },
  },
  password: {
    name: 'password',
    rules: {
      required: { value: true, message: 'required field' },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
        message: 'Invalid password',
      },
    },
  },
};
