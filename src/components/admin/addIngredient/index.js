import React, { useState } from 'react'
import fire from '../../../fire'
import SubmitButton from '../../common/buttons/submitButton'
import FormInput from '../../common/forms/FormInput'
import FormTitle from '../../common/forms/formTitle'
import Form from '../../common/forms/form'
import FormWrapper from '../../common/wrappers/formWrapper'

const AddIngredient = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        const db = fire.firestore()
        db.collection('ingredients').add({
            name: name,
            price: price
        })

        setName('')
        setPrice('')
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormTitle title='Add an Ingredient' />

                <FormInput
                    label='Name'
                    id='name'
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <FormInput
                    label='Price'
                    id='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)} />

                <SubmitButton value='Add' />
            </Form>
        </FormWrapper>
    )
}

export default AddIngredient