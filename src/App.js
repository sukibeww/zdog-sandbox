import React, { useEffect, useState, useRef } from 'react'
import {
  Illustration,
  Ellipse,
  Hemisphere,
  Shape,
  useRender,
} from 'react-zdog'
import { a, useSpring } from '@react-spring/zdog'

const TAU = Math.PI * 2

function Ring(props) {
  // Change motion every second
  const [up, setUp] = useState(true)
  useEffect(() => void setInterval(() => setUp(previous => !previous), 450), [])
  // Turn static values into animated values
  const { rotation } = useSpring({
    rotation: Math.PI,
  })
  // useRender allows us to hook into the render-loop
  const ref = useRef()
  let t = 0
  useRender(() => {
    // ref.current.rotate.z += 0.05;
    ref.current.rotate.x += props.speed;
    ref.current.rotate.y += props.speed;
  })
  return (
    <Shape ref={ref} stroke={0} color="#747B9E">
      <a.Anchor rotate={rotation.interpolate(r => ({ x: TAU / 18 + -r / 4 }))}>
        <Ellipse diameter={props.diameter} translateZ={40} stroke={2} color="#61DAFB" />
      </a.Anchor>
    </Shape>
  )
}

const App = () => {
  return (
    <Illustration dragRotate={true} zoom={8}>
      <Ring speed={0.03} diameter={80}/>
      <Ring speed={0.04} diameter={70}/>
      <Ring speed={0.07} diameter={60}/>
      <Hemisphere diameter={5} color="#fff" backface="#000" stroke={false} />
    </Illustration>
  )
}

export default App
