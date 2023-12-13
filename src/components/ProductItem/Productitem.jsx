import React from 'react';

const ProductItem = ({product}) => {
    const image = product.colors[0].images[0]

    return (
        <>
            <img src={image} alt={product.name}/>
            <p>
                {product.name}
            </p>
        </>
    );
};

export default ProductItem;
