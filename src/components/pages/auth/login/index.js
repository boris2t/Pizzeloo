import React, { useCallback, useContext, useState } from 'react'
import { withRouter, Redirect } from 'react-router'
import { useForm } from 'react-hook-form'
import fire from '../../../../fire'
import { AuthContext } from '../../../../contexts/Auth'
import Layout from '../../../common/layout'
import setAttribute from '../../../../functions/settAttribute'
import { Messages } from '../../../../constants/validationConstants'
import SubmitButton from '../../../common/buttons/submitButton'
import AuthWrapper from '../../../common/wrappers/authWrapper'
import FormTitle from '../../../common/forms/formTitle'
import Form from '../../../common/forms/form'
import ValidationFormInput from '../../../common/forms/validationFormInput'
import IncorrectInput from '../../../common/forms/incorrectInput'
import DontHaveAccount from '../../../common/forms/dontHaveAccount'

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

          <ValidationFormInput
            label='Email'
            type='text'
            id='email'
            name='email'
            onInput={setAttribute}
            register={register({ required: true })}
            errors={errors}
            message={Messages.requireEmail}
          />

          <ValidationFormInput
            label='Password'
            type='password'
            id='password'
            name='password'
            onInput={setAttribute}
            register={register({ required: true })}
            errors={errors}
            message={Messages.requirePassword}
          />

          <IncorrectInput message={incorrect}/>
          <DontHaveAccount />
          <SubmitButton value='Login' />
        </Form>
      </AuthWrapper>
    </Layout>
  )
}

export default withRouter(Login)