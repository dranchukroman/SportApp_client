import { useState, useEffect, useRef } from 'react';

const useFunctionalBarHeight = () => {
    const userInformationHeight = useRef(null);
    const [userDataHeight, setUserDataHeight] = useState(0);

    
    useEffect(() => {
        if (userInformationHeight.current) {
            setUserDataHeight(userInformationHeight.current.offsetHeight);
        }
    }, [userInformationHeight]);

    const visiblePartOfScreen = window.innerHeight;
    const functionalBarHeight = visiblePartOfScreen - userDataHeight - 85;
    const scrollablePartHeight = functionalBarHeight - 160;

    return { userInformationHeight, functionalBarHeight, scrollablePartHeight, userDataHeight, visiblePartOfScreen };
};

export default useFunctionalBarHeight;
