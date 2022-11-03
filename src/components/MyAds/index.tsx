import css from './template.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 
import { nodeApi } from '../../api';
import { ad, erroLogin, states, UserInfo } from '../../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdItem } from './../AdItem/index';
import { AdItemConfig } from './AdItemConfig/index';

type Props = {
    data: ad[] | undefined
    handleDelete: (id: number) => void
    handleEdit: (data: ad) => void
}

export const MyAds = ({data, handleDelete, handleEdit}: Props) => {
    const [adList, setAdList] = useState<ad[]>([])
    const [errors, setError] = useState<erroLogin | undefined >(undefined)
    const [alert, setAlert] = useState(false)

    const [nameError, setNameError] = useState(false)

    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if(data) {
            setAdList(data)
        }

        const getState = async () => {
            
        }
        getState()
    }, [data])
    

   
    
    return (
        <div className={css.rightSide}>
            <h1>Meus Anúncios</h1>
            <div className={css.list} >
                {adList.map((i, k) =>               
                    <AdItemConfig key={k} data={i} handleDelete={handleDelete} handleEdit={handleEdit} />
                )}
                
            </div>
        </div>
    )
}




