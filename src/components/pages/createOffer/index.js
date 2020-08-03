import React, { useState } from 'react'
import { useHistory } from 'react-router'
import fire from '../../../fire'
import Layout from '../../common/layout'
import styles from './index.module.css'
import SubmitButton from '../../common/buttons/submitButton'
import FormInput from '../../common/forms/FormInput'
import FormTitle from '../../common/forms/formTitle'

const CreateOffer = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const history = useHistory()

    const handleSubmit = event => {
        event.preventDefault()

        const db = fire.firestore()
        db.collection('offers').add({
            title: title,
            text: text,
            image: image
        })

        history.push('/')
    }

    return (
        <Layout>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                    <SubmitButton value='Create' />
                </form>
            </div>
        </Layout>
    )
}

export default CreateOffer