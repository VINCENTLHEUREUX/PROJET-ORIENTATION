import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RegisterForm from '../../components/Auth/RegisterForm';
import './Register.css';

function Register() {
  return (
    <div className="page-container">
      <Header />
      <main className="auth-main">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}

export default Register;