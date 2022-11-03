import css from './template.module.css'
import './modal.css'
import { ad, categories, Images, PriceValuesType, states } from '../../types'
import { useState, useRef, useContext, useEffect } from 'react';
import { NumericFormat, OnValueChange } from 'react-number-format';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { nodeApi } from './../../api';
import { AiOutlineClose } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';


type Props = {
    modalStatus: boolean
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
    modalData: ad | undefined
    states: states[] | undefined
    categories: categories[] | undefined
    setTrigger: React.Dispatch<React.SetStateAction<number>>
    trigger: number
}

export const ModalEdit = ({modalStatus, setStatus, modalData, states, categories, trigger, setTrigger}: Props) => {
    const fileField = useRef() as React.MutableRefObject<HTMLInputElement>

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState<any>('')
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<Images[]>([]);
    const [selectedImage, setSelectedImage] = useState();

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string>('')

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if(modalData) {
            setTitle(modalData.title)
            setCategory(modalData.Category.id as unknown as string)
            setPrice({ formattedValue: `R$ ${modalData.price}`, value: `${modalData.price}`, floatValue: modalData.price });
            setPriceNegotiable(modalData.priceNegotiable)
            setDescription(modalData.description)
            setImages(modalData.Images)
        }
    }, [modalData, trigger])
    
    


    const handleImage = (e: any) => {
        if(e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0])
        }
    }
    const handleImageDelete = async (id: number) => {
        let json = await nodeApi.deleteImage(id, modalData?.id as number , auth.user?.id as number)
        if(json.error) {
            alert(json.error)
        }
        if(!json.error) {
            let tmpImages = [...images]
            let newImages = tmpImages.filter(x=>{
                return x.id != id
            })
            setImages(newImages)
        }
    }

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
            errors.push('Sem titulo');
        }
        if(!category) {
            errors.push('Sem Categoria');
        }

        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            if(typeof price == 'string') {
                fData.append('price', price);
            } else {
                fData.append('price', price.value);
            }
            
            fData.append('priceneg',priceNegotiable as unknown as string);
            fData.append('desc', description);
            fData.append('cat', category);
            fData.append('idUser', auth.user?.id as unknown as string)

            if(fileField.current.files) {
                for(let i=0;i<fileField.current.files.length;i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await nodeApi.editAd(fData, modalData?.id as number);
            console.log('JSON', json)
            if(!json.error) {
                alert('Anuncio editado com sucesso !')
                setSelectedImage(undefined)
                setTrigger(trigger+1)
                setStatus(false)
            } else {
                setError(json.error)
            }
        } else {
            setError(errors.join("\n"));
        }
        setDisabled(false);



    }




    const handleModalClick = (e: any) => {
        if(e.target.classList.contains('Container')) {
            setStatus(false)
        }
        //setModalData()
    }

    return (
        <div 
            onClick={handleModalClick}
            className='Container'
            style={modalStatus 
                ? {display:'flex'} 
                : {display:'none'}
            }
        >
            <div className={css.modalBody}>
                <h1>Editar Anúncio</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Titulo</div>
                        <div className={css.areaInput}>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} disabled={disabled} required />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Categoria</div>
                        <div className={css.areaInput}>
                            <select value={category} disabled={disabled} onChange={(e) => setCategory(e.target.value)} required  name="" id="">
                                <option hidden value="">Selecione a categoria</option>
                                {categories &&
                                    <>
                                        {categories.map((i,k) => 
                                            <option key={k} value={i.id}>{i.name}</option>
                                        )}
                                    </>
                                }
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
                                placeholder='R$ '
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
                            <textarea disabled={disabled} value={description} onChange={(e) => setDescription(e.target.value)}>
                                
                            </textarea>
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Todas as imagens</div>
                        <div className={css.areaImages}>
                            {images.map((i,k) => 
                                <div className={css.imagesContainer}>
                                    <img src={i.location} alt="" />
                                    <span onClick={()=>handleImageDelete(i.id)}><AiOutlineClose /></span>
                                </div>
                            )}
                            {selectedImage &&
                                <div className={css.imagesContainer}>
                                    <img  src={URL.createObjectURL(selectedImage)} alt="" />
                                </div>
                            }
                            
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}>Selecione uma nova imagem</div>
                        <div className={css.areaInputCheck}>
                            <input type="file" name="image" accept="image/png, image/jpeg, image/jpg" disabled={disabled} multiple ref={fileField} onChange={handleImage} />
                        </div>
                    </label>
                    <label className={css.area}>
                        <div className={css.areaTitle}></div>
                        <div className={css.areaInput}>
                            <button className={css.button} disabled={disabled}>Editar Anuncio</button>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}