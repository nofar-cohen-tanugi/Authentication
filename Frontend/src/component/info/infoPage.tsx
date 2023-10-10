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

export const InfoPage = () => {
  return <></>;
};
