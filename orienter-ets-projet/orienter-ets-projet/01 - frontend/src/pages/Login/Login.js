import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/Auth/LoginForm';
import './Login.css';

function Login() {
  return (
    <div className="page-container">
      <Header />
      <main className="auth-main">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}

export default Login;