import axios from 'axios'
import React, { useState } from 'react'

export default () => {
    const [post, setPost] = useState('')
    const HandleInput = (e) => {
        setPost(e.target.value)
        e.preventDefault()
    }
    const HandleSubmit = async (e) => {
        await axios.post('http://localhost:4000', {
            titulo: post
        })
    }
    return (
        <>
            <h2>Create Post</h2>
            <form onSubmit={HandleSubmit}>
                <label>Crear Post</label>
                <input onChange={HandleInput} placeholder="Nombre Post"></input>
            </form>
        </>
    )
}
