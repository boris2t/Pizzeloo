import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import { useForm } from 'react-hook-form'
import fire from "../../../fire"
import Layout from '../../layout'
import styles from './index.module.css'
import { Values, Messages } from '../../../constants/validationConstants'
import setAttribute from '../../../functions/settAttribute'

const SignUp = ({ history }) => {

  const { register, handleSubmit, errors, watch } = useForm()

  const handleSignUp = useCallback(async data => {
    const { email, password } = data

    try {
      await fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      alert(error)
    }
  }, [history])

  return (
    <Layout>
      <div className={styles["signup-wrapper"]}>
        <form onSubmit={handleSubmit(handleSignUp)} className={styles.form}>
          <h2>Sign Up</h2>
          <div className={styles["input-group"]}>
            <input
              type="text"
              name="email"
              id="email"
              onInput={setAttribute}
              ref={register({ required: true })} />
            <label htmlFor="email">Email</label>
            {errors.email && (<p>{Messages.requireEmail}</p>)}
          </div>
          <div className={styles["input-group"]}>
            <input
              type="password"
              name="password"
              id="password"
              onInput={setAttribute}
              ref={register({ required: true, minLength: Values.passwordLength })} />
            <label htmlFor="password">Password</label>
            {errors.password && errors.password.type === 'required' && (
              <p>{Messages.requirePassword}</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p>{Messages.passwordLengthErr}</p>
            )}
          </div>
          <div className={styles["input-group"]}>
            <input
              type="password"
              name="rePassword"
              id="re-password"
              onInput={setAttribute}
              ref={register({
                validate: (value) => value === watch('password')
              })} />
            <label htmlFor="re-password">Confirm Password</label>
            {errors.rePassword && (
              <p>{Messages.passwordMatchErr}</p>
            )}
          </div>
          <input type="submit" value="Sign Up" className={styles["submit-btn"]} />
        </form>
      </div>
    </Layout>
  )
}

export default withRouter(SignUp)