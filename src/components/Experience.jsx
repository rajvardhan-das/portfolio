import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Office } from "./Office";
import * as THREE from "three";
import { Projects } from "./Projects";
import { Background } from "./Background";

export const Experience = (props) => {
  const {  menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const [ section, setSection] = useState(0)

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);
  const characterContainerAboutRef = useRef()

  const [characterAnimation , setCharacterAnimation] = useState("Typing")

  useEffect(()=>{
    setCharacterAnimation("Falling");
    setTimeout(()=>{
      setCharacterAnimation(section === 0 ? "Typing" : "Standing")
    }, 600 )

  },[section])

  useFrame((state) => {
    let curSection = Math.floor(data.scroll.current * data.pages);
    if(curSection>3){
      curSection =3
    }

    if(curSection !== section){
      setSection(curSection)
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    const position = new THREE.Vector3()
    characterContainerAboutRef.current.getWorldPosition(position)
    //console.log([position.x,position.y,position.z])

    const quaternion = new THREE.Quaternion()
    characterContainerAboutRef.current.getWorldQuaternion(quaternion)
    const euler  = new THREE.Euler()
    euler.setFromQuaternion(quaternion,"XYZ")

    //console.log([euler.x , euler.y , euler.z])

  });

  return (
    <>
    <Background />
    <motion.group 
    position={[1.9072935059634513, 0.216, 2.681801948466054]}
    rotation={[-3.141592653589793, 1.2053981633974482, 3.141592653589793]}
    animate ={"" + section}
    transition ={{
      duration:0.9
    }}
    variants={{
      0:{
        scaleX:1,
        scaleY:1,
        scaleZ:1,
      },
      1:{
        scaleX:1.2,
        scaleY:1.2,
        scaleZ:1.2,
        y: -viewport.height + 0.8 ,
        x:0,
        z:7,
        rotateX:0,
        rotateY:0,
        rotateZ:0
      },
      2:{
        scaleX:1.8,
        scaleY:1.8,
        scaleZ:1.8,
        x:-2,
        y: -viewport.height *2,
        z:0,
        rotateX:0,
        rotateY:Math.PI/3,
        rotateZ:0,
      },
      3:{
        x:0.3,
        y: -viewport.height *3 + 1,
        z:8.5,
        rotateX:0,
        rotateY:-Math.PI/4,
        rotateZ:0,
      }

    }}
    >
    <Avatar animation ={characterAnimation} wireframe = {section === 1}/>
    </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[1.5, 2, 3]}
        scale={[1, 1, 1]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >
        <Office section={section} />
        <group
        ref = {characterContainerAboutRef}
        name="CharacterSpot" 
        position ={[0.07, 0.24, -0.57]} 
        rotation={[-Math.PI,0.42 , -Math.PI]}
        >

          
        </group>

      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section >= 1 ? 0 : -10,
          y: section >= 1 ? -viewport.height : -1.5,
          
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[8, -3, -15]} scale={[6,7,9]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.7}
              speed={4}
              color="#00b300"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[5, 5, 5]} position={[1, -viewport.height, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.9}
              speed={6}
              color="#000099"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[5, 5, 5]} position={[-5, -5, -11]}>
          <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="#e60000"
            />
          </mesh>
        </Float>
        
      </motion.group>


      <Projects />
      {/* <motion.group
        position={[0, 5.5, 10]}
        animate={{
          z: section === 2 ? 0 : -10,
          y: section === 2 ? -viewport.height : 4.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[8, -20, -15]} scale={[3,2,2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.7}
              speed={4}
              color="#00b300"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[5, 5, 5]} position={[1, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.9}
              speed={6}
              color="#000099"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[5, 5, 5]} position={[-5, -5, -11]}>
          <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="#e60000"
            />
          </mesh>
        </Float>
        
      </motion.group> */}
      
    </>
  );
};
