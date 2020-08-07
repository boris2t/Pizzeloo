import React, { Fragment } from 'react'
import { Redirect } from 'react-router'
import { useForm } from 'react-hook-form'
import fire from '../../../fire'
import SubmitButton from '../../common/buttons/submitButton'
import FormTitle from '../../common/forms/formTitle'
import Form from '../../common/forms/form'
import FormWrapper from '../../common/wrappers/formWrapper'
import setAttribute from '../../../functions/settAttribute'
import { Messages } from '../../../constants/validationConstants'
import Footer from '../../footer'
import ValidationFormInput from '../../common/forms/validationFormInput'

const Checkout = () => {
    const order = sessionStorage.getItem('items')
    const { register, handleSubmit, errors } = useForm()

    const submit = data => {
        const parsedOrder = JSON.parse(order)
        const simplifiedOrder = []
        parsedOrder.map(item => (
            simplifiedOrder.push({
                item: item.name,
                size: item.size,
                quantity: item.amount,
                price: item.price
            })
        ))

        const { name, phone, adress } = data

        const db = fire.firestore()
        db.collection('orders').add({
            name: name,
            phone: phone,
            adress: adress,
            orderedItems: simplifiedOrder
        })

        sessionStorage.removeItem('items')
    }

    return !order ? (
        <Redirect to={'/basket'} />
    ) : (
            <Fragment>
                <FormWrapper>
                    <Form onSubmit={handleSubmit(submit)}>
                        <FormTitle title='Delivery information' />

                        <ValidationFormInput
                            label='Name'
                            type='text'
                            id='name'
                            name='name'
                            onInput={setAttribute}
                            register={register({ required: true })}
                            errors={errors}
                            message={Messages.requireName}
                        />
                        <ValidationFormInput
                            label='Phone Number'
                            type='text'
                            id='phone'
                            name='phone'
                            onInput={setAttribute}
                            register={register({ required: true })}
                            errors={errors}
                            message={Messages.requirePhone}
                        />
                        <ValidationFormInput
                            label='Delivery Adress'
                            type='text'
                            id='adress'
                            name='adress'
                            onInput={setAttribute}
                            register={register({ required: true })}
                            errors={errors}
                            message={Messages.requireAdress}
                        />

                        <SubmitButton value='Checkout' />
                    </Form>
                </FormWrapper>
                <Footer></Footer>
            </Fragment>
        )
}

export default Checkout