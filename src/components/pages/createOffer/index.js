import React, { useState } from 'react'
import fire from '../../../fire'
import Layout from '../../layout'
import styles from './index.module.css'
import SubmitButton from '../../common/buttons/submitButton'

const CreateOffer = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        const db = fire.firestore()
        db.collection('offers').add({
            title: title,
            text: text,
            image: image
        })
    }

    return (
        <Layout>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles['input-group']}>
                        <input name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label htmlFor='title'>Title</label>
                    </div>
                    <div className={styles['input-group']}>
                        <textarea name='text' value={text} onChange={(e) => setText(e.target.value)}></textarea>
                        <label htmlFor='text'>Text</label>
                    </div>
                    <div className={styles['input-group']}>
                        <input name='image' value={image} onChange={(e) => setImage(e.target.value)} />
                        <label htmlFor='image'>Image</label>
                    </div>
                    <SubmitButton value='Create'/>
                </form>
            </div>
        </Layout>
    )
}

export default CreateOffer