import React, {useContext} from 'react'
import './CreatePage.css'
import HttpHook from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

const CreatePage = () => {
    const [link, setLink] = React.useState('')
    const {token} = useContext(AuthContext)
    const {request} = HttpHook()

    const changeHandler = e => {
        setLink(e.target.value)
    }

    const onKeyPressHandler = async e => {
        e.preventDefault()
        if (e.key !== 'Enter') return

        try {
            const data = await request('/api/link/generation', {
                method: 'POST',
                body: {from: link},
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            console.log('data', data);
        } catch (e) {}
    }

    return (
        <div className="create-page">
            <div className="container">
                <h1>CreatePage</h1>

                <form className="auth-page__form form">
                    <input
                        type="text"
                        placeholder="Ссылка"
                        value={link}
                        onChange={e => changeHandler(e)}
                        onKeyPress={onKeyPressHandler}
                    />
                </form>
            </div>
        </div>
    )
}

export default CreatePage
