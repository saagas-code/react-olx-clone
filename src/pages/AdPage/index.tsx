import css from './template.module.css'
import { useContext, useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Slide} from 'react-slideshow-image';
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from './../../api';
import { ad } from '../../types';
import { formatDate } from './../../helpers/formatDate';
import 'react-slideshow-image/dist/styles.css'
import { formatPrice } from './../../helpers/formatPrice';
import { AdItem } from '../../components/AdItem';


export const AdPage = () => {
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<ad>();
    const [others, setOthers] = useState<ad[]>([])

    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const getAdInfo = async () => {
            const json = await nodeApi.getAd(id as unknown as number);
            setAdInfo(json.ad)
            setOthers(json.others)
            setLoading(false);
        }
        getAdInfo()
    }, [id])
    

    return (
        <div className={css.adContainer}>
            {!loading &&
                <div className={css.BreadChumb}>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo?.State.id}`}>{adInfo?.State.name}</Link>
                    /
                    <Link to={`/ads?state=${adInfo?.State.id}&cat=${adInfo?.Category.id}`}>{adInfo?.Category.name}</Link>
                    /
                    <span>{adInfo?.title}</span>
                </div>
            }

            <div className={css.pageArea}>
                <div className={css.leftSide}>
                    <div className={css.box}>
                        <div className={css.adImage}>
                            {loading && 
                                <div className={css.fake} style={{height: 300}}></div>
                            }
                            {adInfo?.Images &&
                                <Slide>
                                    {adInfo.Images.map((img, k) => 
                                        <div key={k} className={css.eachSlide}>
                                            <img key={k} src={img.location} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className={css.adInfo}>
                            <div className={css.adName}>
                                {loading && 
                                    <div className={css.fake} style={{height: 20}}></div>
                                }
                                {adInfo?.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo?.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className={css.adDescription}>
                                {loading && 
                                    <div className={css.fake} style={{height: 100}}></div>
                                }
                                {adInfo?.description}
                                <hr />
                                <small>Visualizacoes: {adInfo?.views}</small>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.rightSide}>
                    <div className={css.boxPadding}>
                        {loading &&
                            <div className={css.fake} style={{height: 20}}></div>
                        }
                        {adInfo?.priceNegotiable &&
                            "Preco Negociável"
                        }
                        {!adInfo?.priceNegotiable && adInfo?.price &&
                            <div className={css.price}>Preco: <span>R$ {formatPrice(adInfo.price)}</span></div>
                        }
                    </div>
                    {loading &&
                        <div className={css.fake} style={{height: 50}}></div>
                    }
                    {adInfo?.User &&
                        <>
                            <a href={`mailto:${adInfo.User.email}`} target="_blank" rel="noreferrer" className={css.contactSellerLink}>Fale com o vendedor</a>
                            <div className={css.boxPadding}>
                                <div className={css.createdBy}>
                                    <strong>{adInfo.User.name}</strong>
                                    <small>E-mail: {adInfo.User.email}</small>
                                    <small>Estado: {adInfo.State.name}</small>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className={css.othersArea}>
                {others.length > 0 &&
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className={css.list}>
                            {others.map((i,k) => 
                                <AdItem key={k} data={i} />
                            )}
                        </div>
                    </>
                }   
            </div>
        </div>
    )
}