import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const NotifyProps = {
  position: 'bottom-right',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark'
}

export const ToastCont = () => {
  return (
    <ToastContainer
      toastStyle={{ backgroundColor: '#18181b' }}
      className={'!mb-24 minimd:!mb-16 sm:!mb-10'}
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  )
}

export const ErrorNotify = (message) => {
  const showMessage = message || 'Unexpected error'

  return toast.error(showMessage, {
    autoClose: 5000,
    NotifyProps
  })
}

export const SuccessNotify = (message) => {
  const showMessage = message || 'Success!'

  return toast.success(showMessage, {
    autoClose: 3000,
    NotifyProps
  })
}
