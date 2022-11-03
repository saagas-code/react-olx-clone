import css from './template.module.css'
import { useState, useContext, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { nodeApi } from '../../api';
import { categories, PriceValuesType } from '../../types';
import { NumericFormat, OnValueChange } from 'react-number-format';


export const Add = () => {
    const fileField = useRef() as React.MutableRefObject<HTMLInputElement>

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState<any>(0);
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');

    const [categories, setCategories] = useState<categories[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string>('')

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
      const getCategories = async () => {
        const json = await nodeApi.getCategories();
        setCategories(json.categories)
      }
      getCategories()
    }, [])
    
    const handlePrice = (values: PriceValuesType) => {
        const {value} = values;
        setPrice(value)
    }

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true)
        setError('');
        let errors = [];

        if(!title.trim()) {
            errors.push('Se titulo');
        }
        if(!category) {
            errors.push('Sem Categoria');
        }

        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceNegotiable',priceNegotiable as unknown as string);
            fData.append('description', desc);
            fData.append('idCategory', category);
            fData.append('idUser', auth.user?.id as unknown as string)

            if(fileField.current.files) {
                for(let i=0;i<fileField.current.files.length;i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await nodeApi.addAd(fData);
            if(!json.error) {
                alert('Anuncio adicionado com sucesso !')
                navigate(`/ad/${json.id}`)
            } else {
                setError(json.error)
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);



    }

    return (
        <div className={css.signinContainer}>
            <h1 className={css.PageTitle}>Postar um Anuncio {price}</h1>
            <div className={css.PageArea}>
                {error &&
                    <div className={css.ErrorMessage}>
                        {error}
                    </div>
                }
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Titulo</div>
                        <div className={css.areaInput}>
                            <input maxLength={50} type="text" onChange={(e) => setTitle(e.target.value)} value={title} disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Categoria</div>
                        <div className={css.areaInput}>
                            <select disabled={disabled} onChange={(e) => setCategory(e.target.value)} required  name="" id="">
                                <option hidden value="">Selecione a categoria</option>
                                {categories.map((i,k) => 
                                    <option key={k} value={i.id}>{i.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Preco</div>
                        <div className={css.areaInput}>
                            <NumericFormat 
                                type="text"
                                prefix="R$ "
                                decimalSeparator=","
                                thousandSeparator="."
                                disabled={disabled || priceNegotiable}
                                value={price.value}
                                onValueChange={handlePrice as OnValueChange}
                                placeholder="R$ "
                                required={!priceNegotiable}
                            />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Preco Negociável</div>
                        <div className={css.areaInputCheck}>
                            <input type="checkbox" disabled={disabled} checked={priceNegotiable} onChange={(e) => setPriceNegotiable(!priceNegotiable)} />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Descricao</div>
                        <div className={css.areaInput}>
                            <textarea maxLength={150} disabled={disabled} value={desc} onChange={(e) => setDesc(e.target.value)}>
                                
                            </textarea>
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Imagens (1 ou mais)</div>
                        <div className={css.areaInputCheck}>
                            <input type="file" accept="image/png, image/jpeg, image/jpg" disabled={disabled} multiple ref={fileField} />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}></div>
                        <div className={css.areaInput}>
                            <button className={css.button} disabled={disabled}>Adicionar Anuncio</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}