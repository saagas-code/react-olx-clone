import css from './template.module.css'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation, NavigateOptions} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from '../../api';
import { ad, categories, states } from '../../types';
import { AdItem } from '../../components/AdItem';


let timer: any;
export const Ads = () => {
    const [searchParams] = useSearchParams();
    const [q, setQ] = useState( searchParams.get('q') != null ? searchParams.get('q') as string:'' )
    const [cat, setCat] = useState(searchParams.get('cat') != null ? searchParams.get('cat') as string:'')
    const [state, setState] = useState(searchParams.get('state') != null ? searchParams.get('state')  as string:'')

    const [adsTotal, setAdsTotal] = useState(0)
    const [states, setStates] = useState<states[]>([])
    const [categories, setCategories] = useState<categories[]>([])
    const [adList, setAdList] = useState<ad[]>([])
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [resultOpacity, setResultOpacity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [searchLoading, setSearchLoading] = useState(false)
   
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    

    const getAdsList = async () => {
        setLoading(true)
        let offset = 0
        offset = (currentPage-1) * 2;
        

        const json = await nodeApi.getAds(
            'desc', 
            2,
            q,
            cat,
            state,
            offset
            
        )
        setAdList(json.adsData)
        setAdsTotal(json.total)
        //setResultOpacity(1);
        setSearchLoading(false)
        setLoading(false)
    }

    useEffect(() => {
        if (adList.length > 0) {
            return setPageCount(Math.ceil( adsTotal / adList.length ));
        }
        setPageCount(0)
    }, [adsTotal])

    let pagination = [] as any;
    for(let i=1;i<=pageCount;i++) {
        pagination.push(i);
    } 

    useEffect(() => {
        //setResultOpacity(0.3)
        setSearchLoading(true)
        getAdsList()
    }, [currentPage])
    
    

    useEffect(() => {
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }

        navigate({
            pathname: '',
            search: `?${queryString.join('&')}`
        })

        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, 1300);
        
        setSearchLoading(true)
        setCurrentPage(1)
    }, [q, cat, state])

    useEffect(() => {
        const getState = async () => {
            const json = await nodeApi.getStates()
            setStates(json)
        }
        const getCategories = async () => {
            const json = await nodeApi.getCategories()
            setCategories(json.categories)
        }
        
        getState()
        getCategories()
    }, [])

    return (
        <div className={css.PageContainer}>
            <div className={css.PageArea}>
                <div className={css.leftSide}>
                    <form method="GET" className={css.formAds}>
                        <input 
                            type="text" 
                            name="q" 
                            placeholder='O que você procura ?'
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />

                        <div className={css.filterName}>Estado:</div>
                        <select name="state" value={state} onChange={(e) => setState(e.target.value)}  id="">
                            <option value='' hidden disabled>Selecione o estado</option>
                            {states.map((i, k) => 
                                <option key={k} value={i.id}>{i.name}</option>
                            )}
                        </select>

                        <div className={css.filterName}>Categoria:</div>
                        <ul>
                            {categories.map((i, k) => 
                                <li key={k} className={css.categoryItem}
                                    style={{
                                        backgroundColor:cat==i.id as unknown as string ?'#9BB83C':'transparent',
                                        color:cat==i.id as unknown as string?'#FFF':'#000'
                                    }}
                                    onClick={()=>setCat(i.id as unknown as string)}
                                >
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className={css.rightSide}>
                    <h2>Resultados</h2>
                    {loading && adList.length === 0 &&
                        <div className={css.listWarning}>
                            Carregando...
                        </div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className={css.listWarning}>
                            Não encontramos resultados.
                        </div>
                    }
                    <div className={css.list} style={{opacity: resultOpacity}}>
                        {adList.map((i, k) => 
                            <AdItem key={k} data={i} />
                        )}
                        {searchLoading && adList.length > 0 &&
                            <div className={css.loading}>
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>

                    <div className={css.pagination}>
                        {pagination.map((i: any, k: any) => 
                            <div style={{
                                backgroundColor: i==currentPage?'#CCC':''
                                }} 
                                className={css.pagItem}
                                onClick={()=>setCurrentPage(i)}
                            >
                                {i}
                            </div>
                        )}
                    </div>
                </div>
            </div>  
        </div>
    )
}