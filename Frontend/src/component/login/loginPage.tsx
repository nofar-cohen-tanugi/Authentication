import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
} from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { loginFormSettings } from './loginFormSettings';
import { ILoginForm } from '../../models/login/ILoginForm.model';
import { useLoginMutation } from '../../redux/login/loginSlice';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Message } from 'primereact/message';

export const LoginPage = () => {
  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    defaultValues: { email: '', password: '' },
  });

  const [login, data] = useLoginMutation();
  const navigate = useNavigate();
  const [msgText, setMsgText] = useState<string | null>(null);

  useEffect(() => {
    if (data.isSuccess) {
      navigate('/info');
    }
  }, [data.isSuccess, navigate]);

  const onLogin: SubmitHandler<ILoginForm> = async (formData) => {
    try {
      await login(formData);
    } catch (e) {
      setMsgText('Something went wrong...');
    }
  };

  const checkError = (name: keyof ILoginForm) => (
    <p className='text-red-500'> {errors[name] && errors[name]?.message}</p>
  );

  const handleInputChange = (
    value: string,
    field: ControllerRenderProps<ILoginForm, keyof ILoginForm>
  ) => {
    field.onChange(value);
    if (!isValid) {
      trigger(field.name);
    }
  };

  const header = (
    <img
      alt='Card'
      src='https://primefaces.org/cdn/primereact/images/usercard.png'
    />
  );

  return (
    <div className='w-full h-screen flex justify-content-center align-items-center'>
      <Card title='Login' header={header} className='w-25rem'>
        <form onSubmit={handleSubmit(onLogin)} className='login-form'>
          <Message
            text={msgText}
            severity='error'
            className={classNames({ hidden: !msgText })}
          />

          <label>Email</label>
          <Controller
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                value={field.value ?? ''}
                className={`w-full my-1 ${classNames({
                  'p-invalid': errors[loginFormSettings.email.name],
                })}`}
                onChange={(e) => handleInputChange(e.target.value, field)}
              />
            )}
            {...loginFormSettings.email}
          />
          {checkError('email')}

          <label>Password</label>
          <Controller
            control={control}
            render={({ field }) => (
              <Password
                {...field}
                value={field.value ?? ''}
                feedback={false}
                className={`w-full my-1 ${classNames({
                  'p-invalid': errors[loginFormSettings.password.name],
                })}`}
                onChange={(e) => handleInputChange(e.target.value, field)}
              />
            )}
            {...loginFormSettings.password}
          />
          {checkError('password')}

          <div className='flex flex-wrap justify-content-end gap-2'>
            <Button
              label='Save'
              icon='pi pi-check'
              loading={data.isLoading}
              disabled={!isValid}
            />
            <Button
              label='Cancel'
              icon='pi pi-times'
              className='p-button-outlined p-button-secondary'
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
