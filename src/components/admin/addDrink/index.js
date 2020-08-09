import React, { useState } from 'react'
import fire from '../../../fire'
import SubmitButton from '../../common/buttons/submitButton'
import FormInput from '../../common/forms/FormInput'
import FormTitle from '../../common/forms/formTitle'
import Form from '../../common/forms/form'
import FormWrapper from '../../common/wrappers/formWrapper'

const AddDrink = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        const db = fire.firestore()
        db.collection('drinks').add({
            name: name,
            price: price,
            image: image
        })

        setName('')
        setPrice('')
        setImage('')
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormTitle title='Add a drink' />

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
                <FormInput
                    label='Image'
                    id='image'
                    value={image}
                    onChange={e => setImage(e.target.value)} />

                <SubmitButton value='Add' />
            </Form>
        </FormWrapper>
    )
}

export default AddDrink