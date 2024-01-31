import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber"
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d"
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { MeshBasicMaterial, PlaneGeometry } from "three";

export const projects =[
    {
        title:"The Big Orange",
        image:"projects/orange2.png",
        url:"https://thebigorange.netlify.app/",
        description:"Explore the latest California real estate prices on our comprehensive website, offering up-to-date and accurate information to help you make informed property decisions.",
    },
    {
        title:"Eth Swap",
        image:"projects/eth_swap.png",
        description:"Experience seamless cryptocurrency conversions with our blockchain application, effortlessly transforming Ethereum (ETH) into a diverse range of other digital assets.",
    },
    {
        title:"AI Art Mint",
        image:"projects/ai_art.png",
        description:"Generate and mint your own unique NFTs with ease using our platform.",
    },
    {
        title:"Voyage Tours",
        image:"projects/Voyage.png",
        description:"Embark on a next-level travel experience with our cutting-edge tours and travel website, crafted on the powerful MERN stack.",

    },
    {
        title:"3D Portfolio",
        url:"https://raj-portfolio-threejs.netlify.app/",
        image:"projects/3d_portfolio.png",
        description:"Elevating personal portfolio to new heights with a captivating 3D design powered by THREE.js, featuring dynamic animations",
    },
    {
        title:"File compressor",
        image:"projects/compress.png",
        description:"Elevating personal portfolio to new heights with a captivating 3D design powered by THREE.js, featuring dynamic animations",
    },

]




const Project = (props)=>{
    const { project, highlighted } = props;
    const background = useRef()
    const bgOpacity = useMotionValue(0.4)

    useEffect(()=>{
        animate(bgOpacity, highlighted ? 0.7 :0.4)

    },[highlighted])
    useFrame(()=>{
        background.current.material.opacity = bgOpacity.get()

    })


    return(
        <group {...props}>
            <mesh 
            position-z ={-0.001} 
            onClick={()=>window.open(project.url, "_blank")}
            ref={background}>
                <planeGeometry args={[2.2, 2]} />
                <meshBasicMaterial color = "black" transparent opacity={0.4} />
            </mesh>
            <Image scale = {[2,1.2,1]} url = {project.image} toneMapped = {false} position-y={0.3}/>
            <Text 
            maxWidth={2} 
            anchorX={"left"} 
            anchorY={"top"} 
            fontSize={0.2} 
            position={[-1,-0.4,0]}> {project.title.toUpperCase()} </Text>
            <Text
            maxWidth={2} 
            anchorX={"left"} 
            anchorY={"top"} 
            fontSize={0.1} 
            position={[-1,-0.6,0]} >
                
            </Text>
            
        </group>
    )

}
export const currentProjectAtom = atom(Math.floor(projects.length /2))

export const Projects = () =>{
    
    const { viewport } = useThree()
    const [currentProject] = useAtom(currentProjectAtom)
    return (<group position-y={-viewport.height * 2 +1}
    shadow={{
        boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)',
    }}>
        {
            projects.map((project,index) =>(
                <motion.group key = {"project_" + index} position={[
                    index *2.5 ,0,-3
                ]}
                animate={{
                    x: 0 + (index - currentProject) *3,
                    y:currentProject === index ? 0 : -0.1,
                    z:currentProject === index ? 1 : -2,
                    rotateX:currentProject === index ? -Math.PI / 10 : -Math.PI / 4,
                    rotateY:currentProject === index ? 0 : -Math.PI / 15,
                    rotateZ:currentProject === index ? 0 : -0.05 * Math.PI ,
                }}
                >
                    <Project project = {project} highlighted= {index===currentProject} />
                </motion.group>
            ))
        }

    </group>)
}