import { useState } from "react";

export default function useLocalStorage(tokenName, initialValue) {
    
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(tokenName)
        return item ? JSON.parse(item) : initialValue
    })

    const storeValue = newValue => {
        setValue(newValue);
        localStorage.setItem(tokenName, JSON.stringify(newValue));
    }

    return [value, storeValue]
}