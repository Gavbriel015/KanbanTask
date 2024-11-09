import DarkMode from '../../utils/DarkMode'

import iconDarkTheme from '../../assets/icon-dark-theme.svg'
import iconLightTheme from '../../assets/icon-light-theme.svg'

export default function SwitchTheme() {
    return (
        <>
            <div className="px-6 ">
                <div className="flex items-center gap-4 w-full justify-center dark:bg-bgDarkGray bg-bgLightWhite py-2 ">
                    <img className="w-4 h-4 object-cover" src={iconLightTheme} alt="" />
                        <DarkMode />
                    <img className="w-4 h-4 object-cover" src={iconDarkTheme} alt="" />

                </div>
            </div>

        </>
    )
}