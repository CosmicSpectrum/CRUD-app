import React, {useState, createContext} from 'react';

const MainContext = createContext();

const ContextProvider = ({children})=>{
    const [userInfo, setUserInfo] = useState(null);

    const value = {userInfo, setUserInfo};
    return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

const useMainContext = () => {
    const context = React.useContext(MainContext);
    if(context === undefined){
        throw new Error('useContext must be used in context provider');
    }
    return context;
}


export {useMainContext,ContextProvider};