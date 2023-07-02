import React, { useContext, useEffect } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import http from './../../api/axios';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../context/authContext';
import Loading from '../../components/Loading';
import Box from '../../components/Box';
import CustomInput from '../../components/CustomInput';
import FormError from '../../components/FormError';
import CheckIcon from '../../components/icons/CheckIcon';

const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { values, handleInputChange, email, password, fullName, photo, reset } = useForm({ email: '', password: '', fullName: '', photo: '' });

  const verifyForm = () => {
    let ok = true;
    const error: any = {};
    if (!email.trim().length) {
      ok = false;
      error.email = true;
    }
    if (!fullName.trim().length) {
      ok = false;
      error.fullName = true;
    }
    // TODO: validate ifpassword have at least one minuscule and majuscule character
    if (!password || password.trim().length < 6) {
      ok = false;
      error.password = true;
    }
    setErrors(error);
    return ok;
  };

  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();
    if (verifyForm()) {
      setLoading(true);
      try {
        const r = await http.post('/users', values);
        console.log('res ::', r)
        if (r.status === 201) {
          // SignUp(r.data);
          reset();
          setLoading(false);
          navigate('/');
        } else {
          setLoginError(r.data.message);
        }
      } catch (error: any) {
        if (error.response) {
          setLoginError(error.response.data.message);
          setTimeout(() => {
            setLoginError(null);
          }, 5000);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex  dark:bg-gray-900 items-center justify-center'>

      <Box className=' w-full sm:w-[360px] mx-3 sm:mx-0  '>
        <form onSubmit={handleSubmitLogin} className='flex items-center justify-between flex-col '>
          <h3 className='title-form self-start mb-4 !text-xl sm:!text-3xl'>Crear cuenta</h3>
          {loginError && (<FormError text={loginError} />)}
          <CustomInput placeholder='Juan Diego'
            name='fullName'
            onChange={(val) => handleInputChange(val, 'fullName')}
            label='Nombre Completo'
            hasError={errors?.fullName}
            errorText='El nombre es obligatorio.'
          />
          <CustomInput type='email'
            label='Email' name='email'
            placeholder='example@gmail.com'
            onChange={(val) => handleInputChange(val, 'email')}
            errorText='Email obligatorio y válido.'
            hasError={errors?.email}
          />
          <CustomInput
            type='password'
            name='password'
            placeholder='.lk8Tx9W/'
            onChange={(val) => handleInputChange(val, 'password')}
            hasError={errors?.password}
            errorText='Contraseña obligatoria.'
            label='Contraseña'
          />

          <fieldset>
            <button disabled={loading} className='btn gradient' type='submit'>{!loading ? ('Crear cuenta') : 'Espere...'}</button>
          </fieldset>

          <div className="register-section text-sx my-2">
            <span> Ya tiene cuenta? </span>
            <span className="text-sm">
              <Link
                to="/sign-in"
                className="text-pink-700 dark:text-slate-500 ml-1 hover:underline  p-1"
              >
                INICIA SESIÓN
              </Link>
            </span>
          </div>


        </form>
      </Box>
    </div>
  );
};

export default SignUp;
