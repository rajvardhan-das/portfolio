import { motion } from "framer-motion"
import { useAtom } from "jotai";
import { useState } from "react";
import { currentProjectAtom, projects } from "./Projects";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
const Section = (props) =>{
    const {children} = props;

    return (<motion.section className={`
        h-screen w-screen p-14 max-w-screen-2xl mx-auto 
        flex flex-col items-start justify-center 
        `}
        initial ={{
            opacity:0,
            y:50,
        }}
        whileInView={{
            opacity: 1,
            y:0,
            transition:{
                duration:1,
                delay:0.7,
            }
        }}
        
        >
        {children}
    </motion.section>)
}

export const Interface = (props) =>{
    const {setSection} = props
    return (
        <div className="flex flex-col items-center w-screen p-8">
        <AboutSection setSection={setSection}/>
        <SkillsSection />
        
        <ProjectSection />
      
        <ContactSection />

        </div>
    
    )
}

export const AboutSection = (props)=>{
    const {setSection} = props
    return (
       <Section>
            <h1 className="text-6xl font-extrabold  leading-snug ">Hi I'm,
                <br />
                <span className=" bg-white text-7xl px-1 italic ms-0">
                Rajvardhan Das
                
                </span>
            </h1>
            <motion.h2 className="text-3xl bold font-bold text-gray-800 mt-4"
            initial={{
                opacity:1,
                y:25,
                }}
                whileInView={{
                    opacity: 1,
                    y:0,
                    transition:{
                        duration:0.7,
                        delay:1,
                    }
                }}
        
            >   <br />
                3rd year student @ IIIT Kottayam
                <br />
                MERN stack Web Developer 
            </motion.h2>
            <motion.button
            onClick={()=> setSection(3)}
            className={`bg-indigo-600 text-white py-4 px-8
            rounded-lg font-bold text-lg mt-16`}
            initial ={{
                opacity:0,
                y:25,
            }}
            whileInView={{
                opacity: 1,
                y:0,
                transition:{
                    duration:1,
                    delay:1.2,
                }
            }}
            >Contact me</motion.button>
        </Section>
        )
}

const skills =[
    {
        title:'MERN',
        level:90
    },
    {
        title:"ThreeJs",
        level:60
    },
    {
        title:"Python",
        level:85
    },
    {
        title:"ANTLR",
        level:70
    },
    {
        title:"SQL",
        level:90
    }
]
const languages=[
    {
        title:"🌎 English",
        level:100
    },
    {
        title:"🦚 Hindi",
        level:100
    },
    {
        title:"🥐 French",
        level:30
    }

]
export const SkillsSection = ()=>{
    return (
    <Section>
        <motion.div whileInView={"visible"}>
         <h2 className="text-5xl font-bold text-white">
            Skills
         </h2>
         <div className="mt-8 space-y-4">
            {skills.map((skill,index)=>(
                <div className="w-64" key={index}>
                    <motion.h3 className="text-xl font-bold text-gray-100"
                    initial={{
                        opacity:0
                    }}
                    variants={{
                        visible:{
                            opacity:1,
                        
                        transition:{
                            duration:1,
                            delay:0.8+index*0.2
                        }
                    }}
                }
                    
                    
                    
                    >{skill.title}
                    </motion.h3>

                    <div className="h-2 w-full bg-gray-400 rounded-full mt-2">
                        <motion.div className="h-full bg-indigo-500 rounded-full"
                        style={{width: `${skill.level}%`}} 
                        initial={{
                            scaleX:0,
                            originX:0
                        }}
                        variants={{
                            visible:{
                                scaleX:1,
                                transition:{
                                    duration:1,
                                    delay:0.8+index*0.2
                                }                           

                        }}
                        
                        }
                        
                        />
                    </div>
                </div>
            ))}
         </div>
         <div >
            <h2 className="text-5xl font-bold mt-10 text-white ">Languages</h2>
            <div className="mt-8 space-y-4">
                {languages.map((lng,index)=> (
                    <div className="w-64" key={index}>
                    <motion.h3 className="text-xl font-bold text-gray-100"
                    initial={{
                        opacity:0
                    }}
                    variants={{
                        visible:{
                            opacity:1,
                        
                        transition:{
                            duration:1,
                            delay:1.8+index*0.2
                        }
                    }}
                }
                    
                    
                    
                    >{lng.title}
                    </motion.h3>

                    <div className="h-2 w-full bg-gray-400 rounded-full mt-2">
                        <motion.div className="h-full bg-indigo-500 rounded-full"
                        style={{width: `${lng.level}%`}} 
                        initial={{
                            scaleX:0,
                            originX:0
                        }}
                        variants={{
                            visible:{
                                scaleX:1,
                                transition:{
                                    duration:1,
                                    delay:1.8+index*0.2
                                }                           

                        }}
                        
                        }
                        
                        />
                    </div>
                </div>
                ))}
            </div>
         </div>
         </motion.div>
     </Section>
     )
}
export const ProjectSection = ()=>{

    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom)
    const nextProject = () =>{
        setCurrentProject((currentProject + 1) % projects.length)
    }

    const previousProject = () =>{
        setCurrentProject((currentProject - 1 + projects.length) % projects.length)
    }


    return (
        <Section>
        <div className="flex w-full h-80 gap-16 p-8 pt-40 items-center justify-center">
          <button
            className="hover:text-indigo-600 font-bold transition-colors pt-44"
            onClick={previousProject}
          >
            ⬅️ Previous
          </button>
          <h2 className="text-5xl font-bold pt-48 items-center justify-centers">Projects</h2>
          
          <button
            className="hover:text-indigo-600 font-bold transition-colors pt-44 pr-16"
            onClick={nextProject}
          >
            Next ➡️
          </button>
          
        </div>


        <div className="flex w-full pr-8 items-center justify-center ">
          
          <h2 className="text-5xl font-bold pb-4 pt-12">About me</h2>       
        </div>
        <div className=  " text-white py-4 px-8 rounded-lg font-bold text-lg  inset-8 bg-black border-2 pr-8 mr-8 border-black   bg-opacity-60 shadow-md flex items-center  justify-center cursor-pointer ">
                    
        <p style={{ fontSize: '20px', color: 'white' }}>
        I am a passionate and ambitious <span style={{ fontWeight: 'bold', color: 'red' }}>3rd-year Computer Science and Engineering</span> student<span style={{ fontWeight: 'bold' }}> @IIIT Kottayam</span>  with a solid foundation,
        my academic journey has been marked by a relentless pursuit of excellence, reflected in my{' '}
        <span style={{ fontWeight: 'bold', color: 'red' }}>8.83 CGPA</span> as of the 5th semester.
        My enthusiasm drives me to acquire new skills in this evolving field, and my expertise lies in the{' '}
        <span style={{ fontWeight: 'bold', color: 'red' }}>MERN Stack</span> and{' '}
        <span style={{ fontWeight: 'bold', color: 'red' }}>Compiler Design</span>.
        I balance my technical prowess with a keen interest in creative endeavors, often expressing myself
        through writing and active participation in organizing activities.
</p>     
        </div>
      </Section>
      )
}

export const ContactSection = ()=>{
    const [state, handleSubmit] = useForm("xvoezapb");
    return (<Section>
         <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
         <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
            
                {
                    state.succeeded ? (
                        <p className="text-green-500 text-center">Thank you for your message</p>
                    ) : (                   
                
                <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
                    Name
                </label>
                <input type="text"
                name = "name" 
                id="name" 
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 h-8 "/>


                <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">
                    Email
                </label>
                <input type="email"
                name = "email" 
                id="email" 
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 mb-1 h-8"/>
                <ValidationError className="mt-1 text-red-500"
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                />

                <label htmlFor="message" className="font-medium text-gray-900 block  mt-8">
                    Message
                </label>
                <input type="text"
                name = "message" 
                id="message" 
                className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 "/>
                <ValidationError className="mt-1 text-red-500"
                    errors={state.errors}
                />
                <button type="submit" disabled={state.submitting}
            className={`bg-indigo-600 text-white py-4 px-8
            rounded-lg font-bold text-lg mt-16`}
            >Submit</button>

                </form>
                )
                }
         </div>
     </Section>
     )
}





export default Interface