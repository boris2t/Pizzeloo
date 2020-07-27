import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import fire from "../../../fire";
import Layout from '../../layout';
import styles from './index.module.css'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, rePassword } = event.target.elements;

    if (password.value !== rePassword.value) {
      console.log('Passwords do not match!')
      return
    }

    try {
      await fire
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <Layout>
      <div className={styles["signup-wrapper"]}>
        <form onSubmit={handleSignUp} className={styles.form}>
          <h2>Sign Up</h2>
          <div className={styles["input-group"]}>
            <input type="text" name="email" id="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["input-group"]}>
            <input type="password" name="password" id="password" required />
            <label htmlFor="password">Password</label>
          </div>
          <div className={styles["input-group"]}>
            <input type="password" name="rePassword" id="re-password" required />
            <label htmlFor="re-password">Confirm Password</label>
          </div>
          <input type="submit" value="Sign Up" className={styles["submit-btn"]} />
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(SignUp);