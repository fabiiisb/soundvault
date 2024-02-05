import { Slider } from '@nextui-org/react'
import { useContext } from 'react'
import playerContext from '@/context/MusicPlayer/playerContext'

const VolumeBar = () => {
  const { handleSetVolume, volume } = useContext(playerContext)

  return (
    <div className="w-full min-w-[65px]">
      <Slider
        classNames={{
          base: 'cursor-default active:!cursor-default',
          track: 'group !border-x-0',
          filler: 'group-hover:bg-niceOrange-400 group-active:bg-niceOrange-400 rounded',
          thumb: 'w-3 h-3 hidden group-hover:block group-active:block before:content-none after:content-none cursor-default active:!cursor-default'
        }}
        size="sm"
        color='foreground'
        disableThumbScale
        maxValue={1}
        minValue={0.0}
        step={0.01}
        aria-label="Temperature"
        value={volume}
        onChange={handleSetVolume}
      />
    </div>
  )
}

export default VolumeBar
