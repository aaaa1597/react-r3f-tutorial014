import React, {useRef} from 'react';
import './App.css';
import { Canvas, useFrame, MeshProps } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

const Lights = () => {
  const ambientCtl = useControls('Ambient Light', {
                      visible: false,
                      intensity : {value: 1.0, min: 0, max: 1.0, step: 0.1}
                    })
  const directionalCtl = useControls('Directional Light', {
                      visible: true,
                      position : {x: 3.3, y: 1.0, z: 4.4},
                      castShadow: true,
                    })
  const pointCtl = useControls('Point Light', {
                      visible: false,
                      position : {x: 2, y: 0, z: 0},
                      castShadow: true,
                    })
  const spotCtl = useControls('Spot Light', {
                      visible: false,
                      position : {x: 3, y: 2.5, z: 1},
                      castShadow: true,
                    })

  return (
    <>
      <ambientLight     visible={    ambientCtl.visible} intensity={ambientCtl.intensity}/>
      <directionalLight visible={directionalCtl.visible} position ={[directionalCtl.position.x, directionalCtl.position.y, directionalCtl.position.z]} castShadow={directionalCtl.castShadow}/>
      <pointLight       visible={      pointCtl.visible} position ={[      pointCtl.position.x,       pointCtl.position.y,       pointCtl.position.z]} castShadow={      pointCtl.castShadow}/>
      <spotLight        visible={       spotCtl.visible} position ={[       spotCtl.position.x,        spotCtl.position.y,        spotCtl.position.z]} castShadow={       spotCtl.castShadow}/>
    </>
  )
}

const Box = (props: MeshProps) => {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    ref.current!.rotation.x += 1 * delta
    ref.current!.rotation.y += 1 * delta
  })

  return (
    <mesh {...props} ref={ref} castShadow receiveShadow>
      <icosahedronGeometry  args={[1, 1]} />
    </mesh>
  )
}

const Floor = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[10]} />
      <meshStandardMaterial />
    </mesh>
  )
}

const App = () => {
  return (
    <div style={{ width: "75vw", height: "75vh" }}>
      <Canvas camera={{ position: [4, 4, 1.5] }}>
        <Lights />
        <Box name="meshBasicMaterial"    position={[-2, 2, 0]} material={new THREE.MeshBasicMaterial   ({ color: 'yellow' })} />
        <Box name="meshNormalMaterial"   position={[ 2, 2, 0]} material={new THREE.MeshNormalMaterial  ({ flatShading: true })} />
        <Box name="meshPhongMaterial"    position={[-2, 0, 0]} material={new THREE.MeshPhongMaterial   ({ color: 'lime', flatShading: true })} />
        <Box name="meshStandardMaterial" position={[ 2, 0, 0]} material={new THREE.MeshStandardMaterial({ color: 0xff0033, flatShading: true })} />
        <Floor />
        <OrbitControls target={[2, 2, 0]} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;
