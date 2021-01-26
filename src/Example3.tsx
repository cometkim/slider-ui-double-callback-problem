import { useState, } from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

export default function Example3() {

  const [ log, setLog, ] = useState('')
  const [ position, setPosition, ] = useState(0)
  const [ velocity, setVelocity, ] = useState(0)
  const [ timer, setTimer, ] = useState<number | undefined>()

  let count: number = 0

  const handleChange = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return
    
    setVelocity(v)
    setTimer(timer => {
      if (timer !== undefined) return
      else return window.setInterval(
        () => {
          setLog(log => `callback ${count++}\n${log}`);
          setPosition(position + velocity);
        },
        250
      )
    })
  }

  const handleChangeCommitted = (e: object, v: number | number[]) => {

    if (typeof v !== 'number')
      return

    setVelocity(0)
    setTimer(timer => {
      window.clearInterval(timer);
      return undefined;
    })
  }

  return (
    <div>
      <Typography paragraph>
        <strong>Example 3.</strong> Tip: click the velocity=0, no move. #timer={`${timer}`} position={position} velocity={velocity}
      </Typography>
      <Slider
        min={-8}
        max={+8}
        value={velocity}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
      />
      <pre>
        {log}
      </pre>
    </div>
  )
}
