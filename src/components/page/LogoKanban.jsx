import logoLight from '../../assets/logo-light.svg'
import logoDark from '../../assets/logo-dark.svg'

import useThemeStore from '../../store/themeStore';

export default function LogoKanban() {
    
    const { theme } = useThemeStore();
    
    return(
        <div className='dark:bg-darkGray w-[300px] h-[95px]'>
            <img className='p-8' alt="" src={theme === 'light' ? logoDark : logoLight} />
        </div>
    )
}