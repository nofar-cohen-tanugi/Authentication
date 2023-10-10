import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { loginFormSettings } from './loginFormSettings';
import { ILoginForm } from '../../models/login/ILoginForm.model';
import { useLoginMutation } from '../../redux/login/loginSlice';
import { classNames } from 'primereact/utils';

export const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [login] = useLoginMutation();

  const onLogin: SubmitHandler<ILoginForm> = async (data) => {
    await login(data);
  };
  //dddddd
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
            <Button label='Save' icon='pi pi-check' />
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
