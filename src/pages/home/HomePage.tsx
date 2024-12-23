import React, {useEffect} from 'react';
import {homeStore} from "./HomeStore";
import {observer} from "mobx-react";
import Header from "../../shared/layout/header/Header";
import Footer from "../../shared/layout/footer/Footer";


const HomePage = () => {
    useEffect(() => {
        homeStore.getBanner().then()
    }, [])

    return (
        <div className="home text-red">
            Chào mừng bạn
        </div>
    );

}

export default observer(HomePage);