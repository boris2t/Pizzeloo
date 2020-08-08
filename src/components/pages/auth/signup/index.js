import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router'
import { useForm } from 'react-hook-form'
import fire from "../../../../fire"
import Layout from '../../../common/layout'
import { Values, Messages } from '../../../../constants/validationConstants'
import setAttribute from '../../../../functions/settAttribute'
import SubmitButton from '../../../common/buttons/submitButton'
import AuthWrapper from '../../../common/wrappers/authWrapper'
import FormTitle from '../../../common/forms/formTitle'
import Form from '../../../common/forms/form'
import ValidationFormInput from '../../../common/forms/validationFormInput'
import IncorrectInput from '../../../common/forms/incorrectInput'

const SignUp = ({ history }) => {

  const { register, handleSubmit, errors, watch } = useForm()
  const [incorrect, setIncorrect] = useState('')

  const handleSignUp = useCallback(async data => {
    const { email, password } = data

    try {
      await fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setIncorrect(error.message)
      } else {
        setIncorrect(Messages.emailTaken)
      }
    }
  }, [history])

  return (
    <Layout>
      <AuthWrapper>
        <Form onSubmit={handleSubmit(handleSignUp)}>
          <FormTitle title='Sign Up' />

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
            register={register({ required: true, minLength: Values.passwordLength })}
            errors={errors}
            message={Messages.passwordLengthErr}
          />

          <ValidationFormInput
            label='Confirm Password'
            type='password'
            id='rePassword'
            name='rePassword'
            onInput={setAttribute}
            register={register({
              validate: (value) => value === watch('password')
            })}
            errors={errors}
            message={Messages.passwordMatchErr}
          />

          <IncorrectInput message={incorrect}/>

          <SubmitButton value='Sign Up' />
        </Form>
      </AuthWrapper>
    </Layout>
  )
}

export default withRouter(SignUp)