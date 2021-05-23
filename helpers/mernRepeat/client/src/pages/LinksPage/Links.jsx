import React, {useContext} from 'react'
import './LinksPage.css'
import {AuthContext} from "../../context/AuthContext";
import HttpHook from "../../hooks/http.hook";

const LinksPage = () => {
    const [links, setLinks] = React.useState([])
    const {token} = useContext(AuthContext)
    const {request} = HttpHook()

    React.useEffect(async () => {
        try {
            const data = await request( '/api/link',{
                method: 'GET',
                body: null,
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setLinks(data.links)
        } catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <div className="create-page">
            <div className="container">
                <h1>LinksPage</h1>
                <ul>
                    {links.map((el, idx) => (
                        <li key={idx}>
                            from - {el.from}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LinksPage