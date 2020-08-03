import React, { useState } from 'react'
import { useHistory } from 'react-router'
import fire from '../../../fire'
import SubmitButton from '../../common/buttons/submitButton'
import FormInput from '../../common/forms/FormInput'
import FormTitle from '../../common/forms/formTitle'
import Form from '../../common/forms/form'
import FormWrapper from '../../common/wrappers/formWrapper'

const CreatePizza = () => {
    const [name, setName] = useState('')
    const [toppings, setToppings] = useState('')
    const [image, setImage] = useState('')
    const history = useHistory()

    const handleSubmit = event => {
        event.preventDefault()

        const db = fire.firestore()
        db.collection('pizzas').add({
            name: name,
            toppings: toppings,
            image: image
        })

        history.push('/')
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormTitle title='Create a Pizza' />

                <FormInput
                    label='Name'
                    id='name'
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <FormInput
                    label='Toppings'
                    id='toppings'
                    value={toppings}
                    onChange={e => setToppings(e.target.value)} />
                <FormInput
                    label='Image'
                    id='image'
                    value={image}
                    onChange={e => setImage(e.target.value)} />
                     
                     {/* TODO inputs for isSpicy and isVegetarien */}
                <SubmitButton value='Create' />
            </Form>
        </FormWrapper>
    )
}

export default CreatePizza