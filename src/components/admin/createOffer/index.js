import React, { useState } from 'react'
import { useHistory } from 'react-router'
import fire from '../../../fire'
import SubmitButton from '../../common/buttons/submitButton'
import FormInput from '../../common/forms/FormInput'
import FormTitle from '../../common/forms/formTitle'
import Form from '../../common/forms/form'
import FormWrapper from '../../common/wrappers/formWrapper'

const CreateOffer = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [pizza, setPizza] = useState('')
    const [drink, setDrink] = useState('')
    const history = useHistory()

    const handleSubmit = event => {
        event.preventDefault()

        const db = fire.firestore()
        db.collection('offers').add({
            title: title,
            text: text,
            image: image,
            pizza: pizza,
            drink: drink
        })

        history.push('/')
    }

    return (
        <FormWrapper>
            <Form onSubmit={handleSubmit}>
                <FormTitle title='Create an offer' />

                <FormInput
                    label='Title'
                    id='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <FormInput
                    label='Text'
                    id='text'
                    value={text}
                    onChange={e => setText(e.target.value)} />
                <FormInput
                    label='Image'
                    id='image'
                    value={image}
                    onChange={e => setImage(e.target.value)} />
                <FormInput
                    label='Pizza - (Name/Size/Amount/Price/PriceOne)'
                    id='pizza'
                    value={pizza}
                    onChange={e => setPizza(e.target.value)} />
                <FormInput
                    label='Drink - (Name/Amount/Price/PriceOne)'
                    id='drink'
                    value={drink}
                    onChange={e => setDrink(e.target.value)} />
                <SubmitButton value='Create' />
            </Form>
        </FormWrapper>
    )
}

export default CreateOffer