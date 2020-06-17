import React, { useState} from 'react';
import FullPageLoader from '../components/FullPageLoader';

const useFullPageLoader = () => {
    const [loaded, setLoaded] = useState(false);
    return [
        loaded ? <FullPageLoader /> : null,
        () => setLoaded(true),
        () => setLoaded(false)
    ];
};

export default useFullPageLoader;