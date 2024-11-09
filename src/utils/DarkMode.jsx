import { useEffect } from "react";
import useThemeStore from "../store/themeStore";

import { Switch } from '@chakra-ui/react'

export default function DarkMode() {

    const { theme, toggleTheme } = useThemeStore();

    useEffect(() => {
        if (theme === "dark") {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="">
           <Switch onChange={toggleTheme} colorScheme="purple" size={'md'} />
        </div>
    )
}