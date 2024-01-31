import { Sphere, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react"
import * as THREE from 'three'

export const Background =()=>{
    const material = useRef();
    const color =useRef({
        color:"#99b3ff"
    })
    const data = useScroll();
    const  tl = useRef()

    //tl = "#b9bcff" , "#212121" , "#7a7ca5"  , "#9b96dd"

    useFrame(()=>{
        tl.current.progress(data.scroll.current)
        material.current.color = new THREE.Color(color.current.color)
    })

    
    useEffect(()=>{
        tl.current = gsap.timeline()
        tl.current.to(color.current, { 
            color:"#212121"            
        })
        tl.current.to(color.current, { 
            color:"#80bfff"            
        })
        tl.current.to(color.current, { 
            color:"#c6b3ff"            
        })


    },[])
    return (
        <group>
            <Sphere scale ={[30,30,30]}>
                <meshBasicMaterial ref ={material} side ={THREE.BackSide} toneMapped={false} />
            </Sphere>
        </group>
    )
}