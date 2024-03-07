import { useSelector } from 'react-redux'
import clsx from 'clsx'

const Loading = () => {
  const isLoading = useSelector(({ loading }) => loading.status)
  return (
    <div className={clsx('wrap__load', isLoading)}>
      <div id='load'>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
      <div id='load__overlay'></div>
    </div>
  )
}

export default Loading
