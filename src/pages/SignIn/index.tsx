import css from './template.module.css'
import { useState, useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from '../../api';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string>('')

    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const pass = localStorage.getItem('password')
    const mail = localStorage.getItem('email')

    //remember
    useEffect(() => {
        if(pass && mail) {
            setPassword(pass)
            setEmail(mail)
            setRememberPassword(true)
        }
    }, [])

    //
    useEffect(() => {
      
    }, [])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            setDisabled(true)
            const json = await nodeApi.Login(email, password);
            if(json.error) {
                setError(json.error);
                setDisabled(false)
            }
            if(json.token) {
                const login = await auth.signin(json.token)
                if(login) {
                    if(rememberPassword) {
                        localStorage.setItem('password', password)
                        localStorage.setItem('email', email)
                    }
                }
                if(!rememberPassword) {
                    localStorage.removeItem('password')
                    localStorage.removeItem('email')
                }
                navigate('/') 
            }
            setDisabled(false)
    }

    return (
        <div className={css.signinContainer}>
            <h1 className={css.PageTitle}>Login</h1>
            <div className={css.PageArea}>
                {error &&
                    <div className={css.ErrorMessage}>
                        {error}
                    </div>
                }
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className={css.area}>
                        <div className={css.areaTitle}>E-mail</div>
                        <div className={css.areaInput}>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Senha</div>
                        <div className={css.areaInput}>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Lembrar Dados</div>
                        <div className={css.areaInputCheck}>
                            <input className={css.check} type="checkbox" disabled={disabled} onChange={()=>setRememberPassword(!rememberPassword)} checked={rememberPassword} />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Senha</div>
                        <div className={css.areaInput}>
                            <button className={css.button} disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}