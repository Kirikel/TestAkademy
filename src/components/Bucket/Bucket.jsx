import React from 'react';
import bucketStore from "../../store/BucketStore";
import {useNavigate} from "react-router-dom";

const Bucket = () => {
    const navigate = useNavigate()

    return (
        <main className="bucket">
            <div className="bucket__container">
                <div className="bucket__left">
                    <h1 className="bucket__title">
                        Корзина
                    </h1>
                    <p onClick={() => navigate("/")}>
                        Назад
                    </p>
                </div>
                <ul className="bucket__items">
                    {
                        bucketStore.bucketItems.map((item, ind) =>
                            <div key={ind} className="bucket__item">
                                <img src={item.images[0]} alt="bucketItem-img"/>
                                <h2 className="bucket__item-title">
                                    {item.productName}
                                </h2>
                                <p className="bucket__item-text">
                                    цвет:&nbsp;{item.color}
                                </p>
                                <p className="bucket__item-text">
                                    размер:&nbsp;{item.size}
                                </p>
                                <p className="bucket__item-text">
                                    цена:&nbsp;{item.price}
                                </p>
                                <button className="bucket__item-delete">
                                    Удалить
                                </button>
                            </div>
                        )
                    }
                </ul>
            </div>
        </main>
    );
};

export default Bucket;
