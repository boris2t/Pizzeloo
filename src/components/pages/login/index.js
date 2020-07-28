import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import fire from '../../../fire'
import { AuthContext } from '../../../contexts/Auth'
import Layout from '../../layout'
import styles from './index.module.css'
import setAttribute from '../../../functions/settAttribute'
import { Messages } from '../../../constants/validationConstants'

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
      <div className={styles["login-wrapper"]}>
        <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
          <h2>Login</h2>
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
          <input type="submit" value="Login" className={styles["submit-btn"]} />
        </form>
      </div>
    </Layout>
  )
}

export default withRouter(Login)