import css from './template.module.css'
import { useState, useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from '../../api';
import { ad, categories, states } from '../../types';
import { Link } from 'react-router-dom';
import { AdItem } from '../../components/AdItem/index';

export const Home = () => {
    const [states, setStates] = useState<states[]>([])
    const [categories, setCategories] = useState<categories[]>([])
    const [adList, setAdList] = useState<ad[]>([])

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        const getState = async () => {
            const json = await nodeApi.getStates()
            setStates(json)
        }
        const getCategories = async () => {
            const json = await nodeApi.getCategories()
            setCategories(json.categories)
        }
        
        const getAds = async () => {
            const json = await nodeApi.getAds('desc', 8)
            setAdList(json.adsData)
        }
        getState()
        getCategories()
        getAds()
        
    }, [])

    return (
        <>
            <div className={css.SearchArea}>
                <div className={css.homeContainer}>
                    <div className={css.searchBox}>
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder='O que você procura?' />
                            <select name="state" >
                                <option value="" hidden defaultChecked disabled>Estado</option>
                                {states.map((item, keyy) => 
                                    <option key={keyy} value={item.id}>{item.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className={css.categoryList}>
                    {categories.map((item, keyy) => 
                        <Link to={`/ads?cat=${item.slug}`} key={keyy} className={css.categoryItem}>
                            <img src={item.img}></img>
                            <span>{item.name}</span>
                        </Link>
                    )}
                    </div>
                    
                </div>  
            </div>

            <div className={css.homeContainer}>
                <div className={css.PageArea}>
                    <h2>Anúncios Recentes</h2>
                    <div className={css.list}>
                        {adList.map((i, k) => 
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className={css.seeAll}>Ver Todos</Link>

                    <hr />

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ad provident exercitationem dignissimos nihil saepe amet, eaque explicabo animi libero natus voluptate non itaque esse, architecto pariatur totam mollitia laborum.
                    Veritatis earum eum rem? Ipsam modi enim quos placeat doloribus nesciunt quam iste impedit iure? Illo ratione, modi nihil quaerat nam reprehenderit. Laboriosam minus reprehenderit saepe iusto obcaecati ab ut.
                </div>
            </div>
        </>

        
    )
}