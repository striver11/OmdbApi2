import React from 'react'
import { useState } from 'react'

const TogglePara = () => {
    let[state,setState]=useState(true)
    function handleSubmit(){
        setState(!state)
    }

  return (
    <>
    <button onClick={handleSubmit} type='submit'>
        {state?"on":"off"}
    </button>
    {/* {
    state?<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id eum aspernatur accusantium delectus mollitia neque quidem ratione inventore? Unde recusandae atque error assumenda incidunt magnam beatae facilis nihil voluptatibus sunt?</p>:""
} */}
    </>
    
  )
}

export default TogglePara