import React, { useEffect, useState } from 'react'


const WXLogin = () => {

    const ref = 'https://www.kimways.com/api/chat/wechat/web/oauth/code?redirect_url=' + encodeURIComponent(
        window.location.href,
    )
    console.log(ref)

    useEffect(() => {

    }, [])


    return (
        <>
            <div className='wx-info'>
                <iframe className='frame' src={ref}></iframe>
            </div >
        </>
    );
};

export default WXLogin