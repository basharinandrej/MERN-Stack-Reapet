import React, {useCallback} from 'react'

const localStorageName = 'AuthData'

const AuthHook = () => {
    const [token, setToken] = React.useState('')
    const [userId, setUserId] = React.useState('')

    const login = useCallback((token, id) => {
        setToken(token)
        setUserId(id)
        localStorage.setItem(localStorageName, JSON.stringify({
            token, userId: id
        }))
    },[])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(localStorageName)
    }, [])

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStorageName))
        if(data?.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return  { login, logout, token, userId }
}

export default AuthHook
