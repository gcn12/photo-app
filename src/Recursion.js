import React from 'react'

const Recursion = () => {

    const data = ['a', 'b', 'c', 'd']
    let index = 0
    let arr = []
    const func = (data) => {
        if (index < data.length){
            console.log(data[index])
            index++
            arr.push(index)
            func(data)
        }
        console.log(arr)
    }

    return(
        <div>
            <button onClick={()=>func(data)}>Run</button>
        </div>
    )
}

export default Recursion