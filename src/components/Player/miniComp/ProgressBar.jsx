import { Slider } from '@nextui-org/react'
import playerContext from '@/context/MusicPlayer/playerContext'
import { useContext, useEffect } from 'react'
import Link from 'next/link'

const ProgressBar = () => {
  const { songDuration, songName, progressBarValue, setProgressBarValue, handleSliderChange, activeSong } = useContext(playerContext)

  useEffect(() => {
    setProgressBarValue(0)
  }, [songDuration])

  const formatToMinutes = (duration) => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.round(duration % 60)

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div className="flex flex-col ">
      <div className='flex px-1'>
        <Link
          className='text-tiny text-foreground/80 tracking-wider hover:text-foreground truncate mx-auto'
          href={`/song/${activeSong}`}
          title={songName}
        >
          {songName || 'Undefined'}
        </Link>
      </div>

      <div className='flex justify-center items-center text-tiny text-foreground/50 gap-3'>
        <p>{formatToMinutes(progressBarValue) || '00:00'}</p>
        <Slider
          classNames={{
            base: 'cursor-default active:!cursor-default',
            track: 'group !border-x-0',
            filler: 'group-hover:bg-niceOrange-400 group-active:bg-niceOrange-400 rounded',
            thumb: 'w-3 h-3 hidden group-hover:block group-active:block before:content-none after:content-none cursor-default active:!cursor-default'
          }}
          aria-label="Music progress"
          size="sm"
          color='foreground'
          disableThumbScale
          step={0.5}
          maxValue={songDuration}
          minValue={0}
          value={progressBarValue}
          onChange={handleSliderChange}
        />
        <p>{formatToMinutes(songDuration) || '00:00'}</p>
      </div>
    </div>
  )
}

export default ProgressBar
