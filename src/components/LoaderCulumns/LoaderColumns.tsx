import {FC} from 'react'
import ContentLoader from 'react-content-loader'
import {selectTheme} from '../../redux/slice/theme'
import {useSelector} from 'react-redux'
import './LoaderColumns.scss'

const LoaderColumn: FC = () => {
  const {theme} = useSelector(selectTheme)
  return (
    <>
      {[...new Array(1)].map((_, index) => (
        <ContentLoader
          className='content-loader'
          key={index}
          speed={2}
          width={280}
          height={510}
          viewBox='0 0 280 510'
          backgroundColor={theme === 'light' ? '#f3f3f3' : '#2b2c37'}
          foregroundColor={theme === 'light' ? '#ecebeb' : '#666'}>
          <rect x='34' y='2' rx='3' ry='8' width='100' height='14' />
          <rect x='0' y='45' rx='3' ry='8' width='265' height='88' />
          <rect x='0' y='165' rx='3' ry='8' width='265' height='88' />
          <rect x='0' y='288' rx='3' ry='8' width='265' height='88' />
          <rect x='0' y='402' rx='3' ry='8' width='265' height='88' />
          <circle cx='8' cy='8' r='8' />
        </ContentLoader>
      ))}
    </>
  )
}

export default LoaderColumn
