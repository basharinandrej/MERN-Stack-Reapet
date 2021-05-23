import React, {useContext} from 'react'
import './AuthPage.css'
import HttpHook from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

const AuthPage = () => {
    const [form, setForm] = React.useState({
        email: '', password: ''
    })
    const {request} = HttpHook()
    const {login} = useContext(AuthContext)

    const changeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async e => {
        e.preventDefault()
        try {
            const data = await request(
                '/api/auth/login', {
                method: 'POST',
                body: {
                    email: form.email,
                    password: form.password
                }
            })

            login(data.token, data.userId)
            setForm({email: '', password: ''})
        } catch (e) {}
    }

    const registerHandler = async e => {
        e.preventDefault()
        try {
            const data = await request('/api/auth/register', {
                method: 'POST',
                body: {
                    email: form.email,
                    password: form.password
                }
            })

            console.log('data', data);
        } catch (e){}
    }

    return (
        <div className="auth-page">
            <div className="container">
                <h1>AuthPage</h1>

                <form className="auth-page__form form">
                    <input
                        type="text"
                        placeholder="email"
                        name="email"
                        value={form.email}
                        onChange={e => changeHandler(e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={e => changeHandler(e)}
                    />

                    <button
                        onClick={registerHandler}>
                        Регистрация</button>
                    <button
                        onClick={loginHandler}
                    >Вход</button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage
