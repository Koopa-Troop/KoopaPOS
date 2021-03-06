import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SocialButton from '../components/SocialButton';
import IconInput from '../components/IconInput';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { loginRequest } from '../actions';
import '../assets/styles/Login.scss';

const Login = ({ match, history, loginRequest }) => (
  <>
    <header className='login__header'>
      <picture className='login__header__picture'><Logo /></picture>
      <div className='login__header__tabs'>
        <NavLink to='/login' className='login__header__tab' activeClassName='active'>
          iniciar sesión
        </NavLink>
        <NavLink to='/register' className='login__header__tab' activeClassName='active'>
          registrarse
        </NavLink>
      </div>
    </header>
    { match.path === '/login' && <LoginForm history={history} submit={loginRequest} /> }
    { match.path === '/register' && <SignForm history={history} /> }
    <div className='login__social__buttons'>
      <a href='/auth/google'>
        <SocialButton name='google' />
      </a>
      <a href='/auth/facebook'>
        <SocialButton name='facebook' />
      </a>
      <a href='/auth/twitter'>
        <SocialButton name='twitter' />
      </a>
    </div>
    <footer className='login__footer'>
      Made with &nbsp;
      <i className='fas fa-heart' />
      &nbsp; in Platzi JS school
    </footer>
  </>
);

const LoginForm = ({ submit, history }) => {
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const handleInput = event => setValues({
    ...form,
    [event.target.name]: event.target.value,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    submit(form, history);
  };
  return (
    <form className='login__form' onSubmit={handleSubmit}>
      <IconInput
        type='email'
        name='email'
        pattern='[^ @]*@[^ @]*'
        placeholder='Correo'
        onChange={handleInput}
      />
      <IconInput
        type='password'
        name='password'
        placeholder='Contraseña'
        onChange={handleInput}
      />
      <div className='login__form__forgot'>¿Olvidaste tu contraseña?</div>
      <div className='login__form__send'>
        <Button type='submit' black>Iniciar sesión</Button>
      </div>
      <div className='login__form__option'>o iniciar con</div>
    </form>
  );
};

const SignForm = () => {
  return (
    <form className='login__form'>
      <IconInput
        type='text'
        name='fullname'
        placeholder='Nombre Completo'
      />
      <IconInput
        type='email'
        name='email'
        pattern='[^ @]*@[^ @]*'
        placeholder='Correo'
      />
      <IconInput
        type='password'
        name='password'
        placeholder='Contraseña'
      />
      <div className='login__form__send'>
        <Button type='submit' black>Registrarse</Button>
      </div>
      <div className='login__form__option'>o registrarse con</div>
    </form>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
