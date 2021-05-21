import React from 'react'
import './Auth.css'
import {useHttp} from "../hooks/http.hook";



const Auth = () => {
    const [form, setForm] = React.useState({})
    const {request} = useHttp()

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const onClickHandler = async e => {
        e.preventDefault()
        console.log('request');
        try {
            const data = await request(
                'api/auth/register',
                'POST',
                {...form}
            )

            console.log('data', data);
        } catch (e) {}
    }
    return (
        <>
            <h1>Auth</h1>
            <form>
                <div className="form__wrapper">
                    <input type="text" name="email" placeholder="email" onChange={onChangeHandler}/>
                    <input type="password" name="password" placeholder="Пароль" onChange={onChangeHandler}/>
                </div>
                <button className="btn" onClick={onClickHandler}>Зарегестироваться</button>
            </form>
        </>
    )
}

export default Auth