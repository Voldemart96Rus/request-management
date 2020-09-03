import React from 'react';

const NotFound = () => {
    return (
        <div className="not-found-container text-center pt-4">
            <h1>Страница не найдена!</h1>
            <img
                src="/404.png"
                className="not-found-img my-5"
                alt="Страница не найдена!"
                title="Страница не найдена!"
            />
        </div>
    );
};

export default NotFound;
