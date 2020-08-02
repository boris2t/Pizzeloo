import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import { useForm } from 'react-hook-form'
import fire from "../../../fire"
import Layout from '../../common/layout'
import styles from './index.module.css'
import { Values, Messages } from '../../../constants/validationConstants'
import setAttribute from '../../../functions/settAttribute'
import SubmitButton from '../../common/buttons/submitButton'
import AuthWrapper from '../../common/wrappers/authWrapper'
import FormTitle from '../../common/forms/formTitle'

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
      <AuthWrapper>
        <form onSubmit={handleSubmit(handleSignUp)} className={styles.form}>
          <FormTitle title='Sign Up'/>
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
          <SubmitButton value='Sign Up' />
        </form>
      </AuthWrapper>
    </Layout>
  )
}

export default withRouter(SignUp)