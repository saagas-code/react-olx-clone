import css from './template.module.css'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from '../../api';
import { ad, categories, states, UserInfo } from '../../types';
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome'
import { faFile, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { MyData } from '../../components/MyData';
import { MyAds } from './../../components/MyAds/index';
import { ModalEdit } from './../../components/ModalEdit/index';

export const Account = () => {
    const [adList, setAdList] = useState<ad[]>([])
    const [userInfo, setUserInfo] = useState<UserInfo>()
    const [currentPage, setCurrentPage] = useState('data')
    const [trigger, setTrigger] = useState(0)

    const [categories, setCategories] = useState<categories[]>([]);
    const [states, setStates] = useState<states[]>([])
    const [modalStatus, setModalStatus] = useState(false)
    const [modalData, setModalData] = useState<ad>()

    const params = useParams();
    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    
    const handleEdit = async (data: ad) => {
        setModalStatus(true)
        setModalData(data)
    }

    const handleDelete = async (id: number) => {
        let json = await nodeApi.DeleteAd(id)
        alert('Anúncio deletado com sucesso !')
        setTrigger(trigger+1)
    }

   

    useEffect(() => {
        const getInfo = async () => {
            let json = await nodeApi.AccountInfo(auth.user?.id as number)
            setUserInfo(json.user)
            setAdList(json.ads)
        }
        const getState = async () => {
            const json = await nodeApi.getStates()
            setStates(json)
        }
        const getCategories = async () => {
            const json = await nodeApi.getCategories();
            setCategories(json.categories)
          }

        getCategories()
        getState()
        getInfo()
    }, [trigger])

    useEffect(() => {
      let rota = params.local as string
      setCurrentPage(rota)
    }, [params.local])
    

    return (
        <>
            <div className={css.PageContainer}>
                <div className={css.accountMenu}>
                    <ul>
                        <li onClick={()=>navigate('/minha-conta/dados')} style={{
                            backgroundColor: currentPage == 'dados'?'#f3eef5':'transparent'
                        }}>
                            <div>
                                <FontAwesomeIcon icon={faFile} />
                            </div>
                            <span>Meus Dados</span>
                        </li>
                        <li onClick={()=>navigate('/minha-conta/anuncios')} style={{
                            backgroundColor: currentPage == 'anuncios'?'#f3eef5':'transparent'
                        }}>
                            <div>
                                <FontAwesomeIcon icon={faTableColumns} />
                            </div>
                            <span>Meus Anúncios</span>
                        </li>
                        
                    </ul>
                </div>

                {currentPage=='dados' &&
                    <MyData data={userInfo} states={states}  />
                }
                {currentPage=='anuncios' &&
                    <MyAds data={adList}  handleDelete={handleDelete} handleEdit={handleEdit}/>
                }
            </div>
            <ModalEdit trigger={trigger} setTrigger={setTrigger} modalStatus={modalStatus} setStatus={setModalStatus} modalData={modalData} states={states} categories={categories} />
        </>

        
    )
}