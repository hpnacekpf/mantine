import { Loader } from '@mantine/core';
import React from 'react';

const LoaderComponents = () => {
  return (
    <div
      style={{ padding: "30px", width: "100%", height: "100%", position: "relative" }}
    ><Loader style={{ margin: "0 auto", width: "100%", position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }} size="xl" /></div>
  );
};

export default LoaderComponents;