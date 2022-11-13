import React from 'react';
import loadingImage from './loading.gif'

function Loading({width = '600px'}) {
    return (
        <div>
            <img style={{width}} src={loadingImage} alt="Загрузка"/>
        </div>
    );
}

export default Loading;