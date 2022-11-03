import css from './template.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 
import { nodeApi } from '../../api';
import { erroLogin, states, UserInfo } from '../../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    data: UserInfo | undefined
    states: states[] | undefined
}

export const MyData = ({data, states}: Props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    
    const [errors, setError] = useState<erroLogin | undefined >(undefined)
    const [alert, setAlert] = useState(false)

    const [nameError, setNameError] = useState(false)

    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        setName(data?.name as unknown as string)
        setEmail(data?.email as unknown as string)
        setState(data?.idState as unknown as string)
    }, [data])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(window.confirm('Tem certeza que deseja alterar seus dados?')) {
            const json = await nodeApi.EditAccount(auth.user?.id as number, name, email, state)
            if(json.error) {
                if(json.error.name) {
                    toast.warning(json.error.name.msg as string, {position: "bottom-left",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
                    })
                }
                if(json.error.email) {
                    toast.warning(json.error.name.msg as string, {position: "bottom-left",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
                    })
                }
            }
            if(json.msg) {
                toast.success(json.msg as string, {position: "bottom-left",autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "light",
                })
            }
        }
        
        
        
        
    }
   
    
    return (
        <div className={css.homeContainer}>
            <div className={css.PageArea}>
                <h1>Meu cadastro</h1>
                <h3>Configure o seu cadastro</h3>

                <div className={css.itemContainer}>
                    <h2>Dados da conta</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label className={css.area}>
                            <div className={css.areaTitle}>Nome Completo</div>
                            <div className={css.areaInput}>
                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required
                                    style={{borderColor:nameError?'red':''}}
                                />
                            </div>
                        </label>
                        <label className={css.area}>
                            <div className={css.areaTitle}>E-mail</div>
                            <div className={css.areaInput}>
                                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                            </div>
                        </label>
                        <label className={css.area}>
                        <div className={css.areaTitle}>Estado</div>
                        <div className={css.areaInput}>
                            <select name="state" value={state} onChange={(e) => setState(e.target.value)}  id="">
                                <option value='' hidden disabled>Selecione o estado</option>
                                {states?.map((i, k) => 
                                    <option key={k} value={i.id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                        <div className={css.accountButton}>
                            <button >Salvar Alteracoes</button>
                        </div>
                    </label>
                    </form>
                </div>
            </div>

            <div className={css.alert}>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            </div>
        </div>
    )
}




