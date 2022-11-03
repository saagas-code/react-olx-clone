import css from './template.module.css'
import { useState, useContext, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from '../../api';
import { erroLogin, states } from '../../types';


export const SignUp = () => {
    const [name, setName] = useState('');
    const [state, setState] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [states, setStates] = useState<states[]>([])
    const [disabled, setDisabled] = useState(false);
    const [errors, setError] = useState<erroLogin | undefined >(undefined)

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    //
    useEffect(() => {
        const getState = async () => {
            const json = await nodeApi.getStates()
            setStates(json)
        }
        getState()
    }, [])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            //setDisabled(true)
            setError(undefined)
            
            
            if(password !== confirmPassword) {
                setError({
                    confirmPassword: 'Senhas não batem'
                })
                //setDisabled(false)
                return
            }
            const json = await nodeApi.Register(name, email, password, state as unknown as number);
            if(json.error) {
                setError(json.error);
                //setDisabled(false)
                return
            }

            if(json.token) {
                await auth.signin(json.token)
                alert('Conta criada com sucesso !')
                navigate('/')
            }
            //setDisabled(false)
    }

    return (
        <div className={css.signinContainer}>
            <h1 className={css.PageTitle}>Cadastro</h1>
            <div className={css.PageArea}>
                {errors &&
                    <div className={css.ErrorMessage}>
                        <>
                            <div>{errors.confirmPassword}</div>
                            <div>{errors.email?.msg}</div>
                        </>
                    </div>
                }
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Nome Completo</div>
                        <div className={css.areaInput}>
                            <input minLength={2} type="text" onChange={(e) => setName(e.target.value)} value={name} disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Estado</div>
                        <div className={css.areaInput}>
                            <select required value={state} onChange={(e) => setState(e.target.value)}>
                                <option hidden defaultChecked disabled value="">Selecione o estado</option>
                                {states.map((item, keyy) => 
                                    <option key={keyy} value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>E-mail</div>
                        <div className={css.areaInput}>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Senha</div>
                        <div className={css.areaInput}>
                            <input minLength={4} onChange={(e) => setPassword(e.target.value)} value={password} type="password" disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Confirmar Senha</div>
                        <div className={css.areaInput}>
                            <input minLength={4} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}></div>
                        <div className={css.areaInput}>
                            <button className={css.button} disabled={disabled}>Cadastrar</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}