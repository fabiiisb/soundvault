import { Slider } from '@nextui-org/react'
import playerContext from '@/context/MusicPlayer/playerContext'
import { useContext, useEffect } from 'react'

const ProgressBar = () => {
  const { songDuration, progressBarValue, setProgressBarValue, handleSliderChange } = useContext(playerContext)

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
    <div className="flex flex-col gap-1">
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
        maxValue={songDuration}
        minValue={0}
        value={progressBarValue}
        onChange={handleSliderChange}
      />
      <div className="flex justify-between text-tiny text-foreground/50">
        <p>{formatToMinutes(progressBarValue) || '00:00'}</p>
        <p>{formatToMinutes(songDuration) || '00:00'}</p>
      </div>
    </div>
  )
}

export default ProgressBar
