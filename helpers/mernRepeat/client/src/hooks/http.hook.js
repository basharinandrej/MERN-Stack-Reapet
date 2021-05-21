import React, {useCallback} from "react"


export const useHttp = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error_1')
            }

            console.log(data);
            return data
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    return {request, loading, error}
}
