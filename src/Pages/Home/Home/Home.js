import React from 'react';
import AdvertisedProduct from '../AdvertisedProduct/AdvertisedProduct';
import Banner from '../Banner/Banner';
import Catogories from '../Catogories/Catogories';
import Services from '../Services/Services';

const Home = () => {


    return (
        <div>
            <Banner />
            <AdvertisedProduct />
            <Catogories />
            <Services />
        </div>
    );
};

export default Home;