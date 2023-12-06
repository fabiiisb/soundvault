'use client'
import { CloseSquare, TickSquare } from 'iconsax-react'

const Alert = ({ message, type }) => {
  const colorStyle = {
    error: 'danger',
    success: 'success'
  }

  const iconMap = {
    error: <CloseSquare className='w-8 h-8 text-danger' variant='Bulk' />,
    success: <TickSquare className='w-8 h-8 text-success' variant='Bulk' />
  }

  return (
    <div
      className={`flex backdrop-blur-md bg-content1/50 rounded-medium w-full items-center shadow-medium max-w-[500px] gap-2 p-2 px-3 border-b-2 border-${colorStyle[type]}-100`}
    >
      <div>{iconMap[type]}</div>
      <div>
        <p className={`text-${colorStyle[type]} font-semibold break-all`}>
          <span className='underline underline-offset-2'>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          : {' ' + message}
        </p>
      </div>
    </div>
  )
}

export default Alert
