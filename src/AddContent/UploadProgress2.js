import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import {
    ProgressContainer,
} from './UploadProgress2.styles'

const UploadProgress = (props) => {

    // eslint-disable-next-line
    const [displayCount, setDisplayCount] = useState(0)
            
    const { uploadCount, uploadProgress } = props
    
    useEffect(()=> {
        countUp(Math.round(uploadProgress / uploadCount * 100))
        // eslint-disable-next-line
    }, [uploadProgress]) 

    const countUp = (numberInput) => {
        console.log(numberInput)
        let number = numberInput
        if (number > uploadCount) {
            // number--
            // setTimeout(()=>countUp(number), 100)
            // setDisplayCount(prevCount=> prevCount + 1)
        }
    }

    return(
        <ProgressContainer>
            <div style={{fontSize: '40px', display: 'flex'}}>
                {displayCount}%
            </div>
            <CountUp
  start={-875.039}
  end={160527.012}
  duration={2.75}
  separator=" "
  decimals={4}
  decimal=","
  prefix="EUR "
  suffix=" left"
  onEnd={() => console.log('Ended! 👏')}
  onStart={() => console.log('Started! 💨')}
>
  {({ countUpRef, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        </ProgressContainer>
    )
}


const Test = () => {
    const [count, setCount] = useState(0)
    return(
        <div style={{marginTop: '200px'}}>
            <button onClick={()=> setCount(20)}>hibk</button>
            <button onClick={()=> setCount(30)}>hibk</button>
            <UploadProgress count2={count} />
        </div>
    )
}

export default Test