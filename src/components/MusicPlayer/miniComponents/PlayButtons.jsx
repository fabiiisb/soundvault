import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { RepeateOne, Previous, PauseCircle, PlayCircle, Next, Shuffle } from 'iconsax-react'

const PlayButtons = () => {
  const [play, setPlay] = useState(false)
  const [replay, setReplay] = useState(false)
  const [random, setRandom] = useState(false)

  const handlePlay = () => {
    setPlay((v) => !v)
  }
  const handleReplay = () => {
    if (random) setRandom((v) => !v)
    setReplay((v) => !v)
  }
  const handleRandom = () => {
    if (replay) setReplay((v) => !v)
    setRandom((v) => !v)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={handleReplay}
      >
        <RepeateOne
          className={replay ? 'text-niceOrange-400' : 'text-foreground/80'}
        />
      </Button>
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
      >
        <Previous variant='Bold' />
      </Button>
      <Button
        isIconOnly
        className="w-auto h-auto data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={handlePlay}
      >
        {play ? <PauseCircle variant='Bold' size={54} /> : <PlayCircle variant='Bold' size={54} />}
      </Button>
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
      >
        <Next variant='Bold' />
      </Button>
      <Button
        isIconOnly
        className="data-[hover]:bg-foreground/10"
        radius="full"
        variant="light"
        onClick={handleRandom}
      >
        <Shuffle
          className={random ? 'text-niceOrange-400' : 'text-foreground/80'} />
      </Button>
    </div>
  )
}

export default PlayButtons
