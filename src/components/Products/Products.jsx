import React, {useCallback, useEffect, useState} from 'react';
import {getProducts} from "../../services/api";
import ProductItem from "../ProductItem/Productitem";
import "../../styles/Products.scss"
import BucketIcon from "../../Svg/BucketIcon";
import {useNavigate} from "react-router-dom";


const Products = () => {
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);
    const handleOnProducts = useCallback((productList) => setProducts(productList), [],);

    useEffect(() => {
        getProducts()
            .then(productList => handleOnProducts(productList))
    }, []);

    return (
        <main className="products">
            <div className="products__container">
                <header className="products__header">
                    <h1 className="products__title">
                        Каталог товаров
                    </h1>
                    <div className="products__bucket"
                         onClick={() => navigate("/bucket")}>
                        <BucketIcon/>
                    </div>
                </header>
                <ul className="products__items">
                    {
                        products.map((product, index) =>
                            <li key={index} className="products__item"
                                onClick={() => navigate(`/productItem?productId=${product.id}`)}>
                                <ProductItem product={product}/>
                            </li>
                        )
                    }
                </ul>
            </div>
        </main>
    );
};

export default Products;
