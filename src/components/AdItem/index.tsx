import css from './template.module.css'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 
import { ad } from '../../types';
import { Link } from 'react-router-dom';
import { currencyFormat, formatPrice } from './../../helpers/formatPrice';



type Props = {
    data: ad
}

export const AdItem = ({data}: Props) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    let price = ''
    if(data.priceNegotiable) {
        price = 'Preco Negociável'
    }
    if(!data.priceNegotiable) {
        price = `${currencyFormat(data.price)}`
    }
    
    return (
        <div className={css.adItem}>
            <Link to={`/ad/${data.id}`}>
                <div className={css.itemImage}>
                    {data.Images.map((i, k) => 
                        <div key={k}>
                            {i.default == '1' &&
                                <>
                                    <img key={k} src={`${i.location}`} alt="" />
                                </>
                            }
                        </div>
                    )}
                </div>
                <div className={css.itemName}>{data.title}</div>
                <div className={css.itemPrice}>{price}</div>
            </Link>
        </div>
    )
}




