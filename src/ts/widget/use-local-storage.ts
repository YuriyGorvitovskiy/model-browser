import * as React from "react";

const useLocalStorage = <S>(key: string, initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>] => {
    const [value, setValue] = React.useState(JSON.parse(localStorage.getItem(key)) || initialState);

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

export default useLocalStorage;
