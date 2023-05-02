import {FC} from 'react'
import './SwitchTheme.scss'
import {useLayoutEffect} from 'react'
import {useAppDispatch} from '../../redux/store'
import {useSelector} from 'react-redux'
import {setTheme, selectTheme} from '../../redux/slice/theme'
import {IconLightTheme} from '../icons/iconLightTheme'
import {IconDarkTheme} from '../icons/iconDarkTheme'

const SwitchTheme: FC = () => {
  const dispatch = useAppDispatch()
  const {theme} = useSelector(selectTheme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-scheme', theme)
  }, [theme])

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className='switch'>
      <IconLightTheme />
      <div className='switch__toggle'>
        <input type='checkbox' id='switch' onChange={toggleTheme} />
        <label htmlFor='switch'>Toggle</label>
      </div>
      <IconDarkTheme />
    </div>
  )
}

export default SwitchTheme
