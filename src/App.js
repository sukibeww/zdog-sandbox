import React, { useEffect, useState, useRef } from 'react'
import {
  Illustration,
  Ellipse,
  Shape,
  useRender,
} from 'react-zdog'
import { a, useSpring } from '@react-spring/zdog'

const TAU = Math.PI * 2

function Guy() {
  // Change motion every second
  const [up, setUp] = useState(true)
  useEffect(() => void setInterval(() => setUp(previous => !previous), 450), [])
  // Turn static values into animated values
  const { rotation } = useSpring({
    rotation: up ? 0 : Math.PI,
  })
  // useRender allows us to hook into the render-loop
  const ref = useRef()
  let t = 0
  useRender(() => (ref.current.rotate.y += 0.05))
  return (
    <Shape ref={ref} path={[{ x: -3 }, { x: 3 }]} stroke={0} color="#747B9E">
      <a.Anchor rotate={rotation.interpolate(r => ({ x: TAU / 18 + -r / 4 }))}>
        <Ellipse diameter={80} translateZ={40} stroke={20} color="#ffffff" />
      </a.Anchor>
    </Shape>
  )
}

const App = () => {
  return (
    <Illustration dragRotate={true} zoom={8}>
      <Guy />
    </Illustration>
  )
}

export default App
