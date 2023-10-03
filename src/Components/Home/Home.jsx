import React from 'react';
import Style from  "./Home.module.css";
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct';
import MainHomeSlider from '../MainHomeSlider/MainHomeSlider';
import PopulerHomeSlider from '../PopulerHomeSlider/PopulerHomeSlider';
import { Helmet } from 'react-helmet';
export default function Home() {
  return <>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Home</title>
    </Helmet>
  <MainHomeSlider/>
  <PopulerHomeSlider/>
  <FeaturedProduct/>
  </>
}
