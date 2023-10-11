import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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
    control,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [login, data] = useLoginMutation();
  const navigate = useNavigate();
  const [msgText, setMsgText] = useState<string | null>(null);

  useEffect(() => {
    if (data.isSuccess) {
      navigate('/info');
    }
  }, [data.isSuccess, navigate]);

  const onLogin: SubmitHandler<ILoginForm> = async (formData) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setMsgText('The email address or password is incorrect');
    } else {
      setMsgText(null);
      await login(formData);
    }
  };

  const checkError = (name: keyof ILoginForm) => (
    <p className='text-red-500'> {errors[name] && errors[name]?.message}</p>
  );

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
              />
            )}
            {...loginFormSettings.password}
          />
          {checkError('password')}

          <div className='flex flex-wrap justify-content-end gap-2'>
            <Button label='Save' icon='pi pi-check' loading={data.isLoading} />
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
