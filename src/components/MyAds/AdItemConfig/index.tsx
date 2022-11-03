import css from './template.module.css'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { currencyFormat, formatPrice } from './../../../helpers/formatPrice';
import { ad } from '../../../types';
import Button from 'react-bootstrap/Button';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { nodeApi } from './../../../api';




type Props = {
    data: ad,
    handleDelete: (id: number) => void
    handleEdit: (data: ad) => void
}



export const AdItemConfig = ({data, handleDelete, handleEdit}: Props) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate();

    

    let price = ''
    if(data.priceNegotiable) {
        price = 'Preco Negociável'
    }
    if(!data.priceNegotiable) {
        price = `R$ ${formatPrice(data.price)}`
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
                {!data.priceNegotiable && <div className={css.itemPrice}>{currencyFormat(data.price)}</div>}
                {data.priceNegotiable && <div className={css.itemPrice}>Preco negociável</div>}

            </Link>
            <div className={css.buttons}>
                <Button onClick={()=>handleEdit(data)}  className={css.button} variant="primary" size="sm">
                    <AiOutlineEdit />
                </Button>{' '}
                <Button onClick={()=>handleDelete(data.id)} className={css.button} variant="danger" size="sm">
                    <AiOutlineDelete />
                </Button>{' '}
            </div>
        </div>
    )
}




