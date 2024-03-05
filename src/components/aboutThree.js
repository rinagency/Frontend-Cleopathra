import React,{useState} from "react";
import { Link } from "react-router-dom";
import videoImg from "../assets/images/modern.mp4"

import {FiCheckCircle} from '../assets/icons/vander'

import '../../node_modules/react-modal-video/css/modal-video.css'

export default function AboutThree(){
    const [isOpen, setOpen] = useState(false);

    return(
        <>
        <div className="container relative md:mt-24 mt-16">
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
                    <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full p-6 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-slate-800">
                        <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-gray-800 z-1">
                            <div className="relative">
                                <video controls autoPlay loop>
                                    <source src={videoImg} type="video/mp4"/>
                                </video>
                            </div>
                        </div>
                    
                    </div>

                    <div className="">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Como usar nuestras cabinas <br/> fotomax</h3>
                        <p className="text-slate-400 max-w-xl">"Mejora la experiencia de tus consumidores! Una interactiva cabina de fotos para tu local comercial. Encuéntranos en los mejores cines y malls del país."</p>

                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Interfaz moderna</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Facil de usar</li>
                            <li className="mb-2 flex items-center"><FiCheckCircle className="text-amber-400 h-5 w-5 me-2"/> Seguridad</li>
                        </ul>

                        <div className="mt-4">
                            <Link to="/aboutus" className="hover:text-amber-400 font-medium duration-500">Más información <i className="mdi mdi-chevron-right text-[20px] align-middle"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}