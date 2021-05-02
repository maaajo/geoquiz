import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loading = () => (
  <div className="w-100 flex justify-center mt-16">
    <Loader type="Bars" color="#6CAEB2" height={100} width={100} timeout={0} />
  </div>
);

export default Loading;
