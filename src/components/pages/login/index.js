import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import fire from '../../../fire';
import { AuthContext } from '../../../contexts/Auth';
import Layout from '../../layout';
import styles from './index.module.css'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await fire
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <div className={styles["login-wrapper"]}>
        <form onSubmit={handleLogin} className={styles.form}>
          <h2>Login</h2>
          <div className={styles["input-group"]}>
            <input type="text" name="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["input-group"]}>
            <input type="password" name="password" id="password" required />
            <label htmlFor="password">Password</label>
          </div>
          <p className={styles.signUpParagraph}>
            Don't have an account yet? 
             <Link to="signup" className={styles.signUpLink}>Sign Up!</Link>
          </p>
          <input type="submit" value="Login" className={styles["submit-btn"]} />
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(Login);