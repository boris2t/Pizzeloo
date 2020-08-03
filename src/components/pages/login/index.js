import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import fire from '../../../fire'
import { AuthContext } from '../../../contexts/Auth'
import Layout from '../../common/layout'
import styles from './index.module.css'
import setAttribute from '../../../functions/settAttribute'
import { Messages } from '../../../constants/validationConstants'
import SubmitButton from '../../common/buttons/submitButton'
import AuthWrapper from '../../common/wrappers/authWrapper'
import FormTitle from '../../common/forms/formTitle'
import Form from '../../common/forms/form'

const Login = ({ history }) => {

  const { register, handleSubmit, errors } = useForm()
  const [incorrect, setIncorrect] = useState('')

  const handleLogin = useCallback(async data => {

    const { email, password } = data
    try {
      await fire
        .auth()
        .signInWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setIncorrect(error.message)
      } else {
        setIncorrect(Messages.inncorectData)
      }
    }
  },
    [history]
  );

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <AuthWrapper>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <FormTitle title='Login' />
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
              ref={register({ required: true })} />
            <label htmlFor="password">Password</label>
            {errors.password && (<p>{Messages.requirePassword}</p>)}
          </div>

          <h3 id="incorrect">{incorrect}</h3>
          <p className={styles.signUpParagraph}>
            Don't have an account yet?
             <Link to="signup" className={styles.signUpLink}>Sign Up!</Link>
          </p>
          <SubmitButton value='Login' />
        </Form>
      </AuthWrapper>
    </Layout>
  )
}

export default withRouter(Login)