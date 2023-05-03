import {FC, useRef} from 'react'
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
  const isMounted = useRef(false)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-scheme', theme)
    if (isMounted.current) {
      const json = JSON.stringify(theme)
      localStorage.setItem('scheme', json)
    }
    isMounted.current = true
  }, [theme])

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className='switch'>
      <IconLightTheme />
      <div className='switch__toggle'>
        <input
          defaultChecked={theme === 'dark'}
          type='checkbox'
          id='switch'
          onChange={toggleTheme}
        />
        <label htmlFor='switch'>Toggle</label>
      </div>
      <IconDarkTheme />
    </div>
  )
}

export default SwitchTheme
