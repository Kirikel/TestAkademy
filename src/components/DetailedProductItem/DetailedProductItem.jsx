import React, {useCallback, useEffect, useState} from 'react';
import BucketIcon from "../../Svg/BucketIcon";
import ProductItem from "../ProductItem/Productitem";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getProduct, getProductColor, getSize, getSizes} from "../../services/api";
import products from "../Products/Products";

const DetailedProductItem = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const productId = params.get("productId")

    const [product, setProduct] = useState(null);
    const [productByColor, setProductByColor] = useState(null);
    const [currentColorId, setCurrentColorId] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentSize, setCurrentSize] = useState(null);
    const [sizes, setSizes] = useState([]);

    // ProductAction
    const handleOnProduct = useCallback((p) => setProduct(p), [])

    // ProductByColorIdAction
    const handleOnProductByColor = useCallback((pByColor) => setProductByColor(pByColor), [])

    // ImageIndexActions
    const handleOnIncCurrentImageIndex = useCallback(() =>
        setCurrentImageIndex(currentImageIndex + 1), [currentImageIndex])
    const handleOnDecCurrentImageIndex = useCallback(() =>
        setCurrentImageIndex(currentImageIndex - 1), [currentImageIndex])

    // CurrentColorIdAction
    const handleOnCurrentColorId = useCallback((colorId) => setCurrentColorId(colorId), [])

    // CurrentSizeIdAction
    const handleOnCurrentSize = useCallback((size) => setCurrentSize(size), [])

    // SizesAction
    const handleOnSizes = useCallback((sizesList) => setSizes(sizesList), [])

    useEffect(() => {
        getProduct(productId)
            .then(productItem => {
                handleOnProduct(productItem)
                handleOnCurrentColorId(productItem.colors[0].id)

                getProductColor(productId, productItem.colors[0].id)
                    .then(pByColor => handleOnProductByColor(pByColor))
            })

        getSizes()
            .then(sizesList => {
                handleOnSizes(sizesList)

                getSize(sizesList[0].id)
                    .then(size => handleOnCurrentSize(size))
            })
    }, [])

    function onChangeColor(colorId) {
        if (colorId !== currentColorId) {
            handleOnCurrentColorId(colorId)
            getProductColor(productId, colorId)
                .then(pByColor => handleOnProductByColor(pByColor))
        } else
            alert("Вы не можете выбрать этот цвет, так как он уже выбран")
    }

    function onChangeSize(sizeId) {
        if (sizeId !== currentSize.id) {
            getSize(sizeId)
                .then(size => handleOnCurrentSize(size))
        } else
            alert("Вы не можете выбрать этот размер, так как он уже выбран")
    }

    return (
        <main className="product">
            <div className="product__container">
                <header className="product__header">
                    <h1 className="product__title">
                        {product?.name}
                    </h1>
                    <div className="product__bucket"
                         onClick={() => navigate("/bucket")}>
                        <BucketIcon/>
                    </div>
                </header>
                {
                    productByColor
                        ?
                        <div className="product__body">
                            <div className="product__images">
                                <button className="images__decrement"
                                        onClick={handleOnDecCurrentImageIndex}>
                                </button>
                                <img src={productByColor?.images[currentImageIndex]} alt="Изображение продукта"/>
                                <button className="images__increment"
                                        onClick={handleOnIncCurrentImageIndex}>
                                </button>
                            </div>
                            <div className="product__info">
                                <h2 className="info__title">
                                    {
                                        productByColor.name
                                    }
                                </h2>
                                <h3 className="info__price">
                                    {productByColor.price}&nbsp;р
                                </h3>
                                <p className="info__description">
                                    {
                                        productByColor.description
                                    }
                                </p>
                            </div>
                            <div className="product__actions">
                                <div className="actions__colors">
                                    {
                                        product
                                            ?
                                            product.colors.map((pByColor, ind) =>
                                                <div className="colors__color" key={ind}
                                                     onClick={() => onChangeColor(pByColor.id)}>
                                                    <img src={pByColor.images[0]} alt={pByColor.name}
                                                         className="colors__image"/>
                                                    <h4 className="colors__title">
                                                        {pByColor.name}
                                                    </h4>
                                                </div>
                                            )
                                            : ""
                                    }
                                </div>
                                <div className="actions__sizes">
                                    {
                                        productByColor
                                            ?
                                            sizes.map((size, ind) =>
                                                <div className="sizes__size" key={ind}
                                                     onClick={() => onChangeSize(size.id)}>
                                                    <div className="sizes__label">
                                                        {
                                                            size.label
                                                        }
                                                    </div>
                                                    <div className="sizes__number">
                                                        {
                                                            size.number
                                                        }
                                                    </div>
                                                </div>
                                            )
                                            : ""
                                    }
                                </div>
                                <button className="actions__buy">
                                    Добавить в корзину
                                </button>
                            </div>
                        </div>
                        : ""
                }
            </div>
        </main>
    );
};

export default DetailedProductItem;
