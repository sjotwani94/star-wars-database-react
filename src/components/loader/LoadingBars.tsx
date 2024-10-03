import { Loader } from '@mantine/core';
import { FC } from 'react';
import './LoadingBars.scss';

const LoadingBars: FC = () => (
    <div className="loader-container">
        <Loader size="xl" variant="bars" />
        <div>Loading...</div>
    </div>
);

export default LoadingBars;
