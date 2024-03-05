import React from "react";
import about1 from '../assets/images/features/video-1.png'
import about2 from '../assets/images/features/video-2.png'
import about3 from '../assets/images/features/video-3.png'

export default function Features({classlist}){
    const featuresData = [
        {
            image:about1,
            title:"+20 ubicaciones disponibles.",
            desc:"Ahora puedes ver todas nuestras ubicaciones en tiempo real y la disponibilidad de cada una de ellas"
        },
        {
            image:about2,
            title:"Descuentos de hasta un %35 en tus compras digitales",
            desc:"Ofrecemos descuentos en tus primeras compras de todos nuestros productos, ¡Paga en linea ahora!"
        },
        {
            image:about3,
            title:"Tus fotografias a tu casa",
            desc:"Ahora te ofrecemos la opción de llevarte tus fotografias hasta la comodidad de tu hogar."
        },
    ]
    return(
        <>
            <div className={classlist}>
                <div className="grid grid-cols-1 pb-6 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Nos actualizamos para<br/> facilitarte tu vida diaria. <span className="bg-gradient-to-br from-amber-400 to-fuchsia-600 text-transparent bg-clip-text">Cabinas Fotomax</span></h3>

                    <p className="text-slate-400 max-w-xl mx-auto">Ahora puedes imprimir tus fotografias desde donde estes y recoger en cualquiera de nuestras ubicaciones disponibles.</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
                    {featuresData.map((item,index) => {
                        return(
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800" key={index}>
                            <div className="p-6 pb-0 relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-72 after:h-72 after:bg-gradient-to-tl after:to-amber-400 after:from-fuchsia-600 after:blur-[80px] after:rounded-full">
                                <img src={item.image} className="relative rounded-t-md shadow-md dark:shadow-slate-700 z-1" alt=""/>
                            </div>

                            <div className="p-6">
                                <h5 className="text-lg font-semibold">{item.title}</h5>
                                <p className="text-slate-400 mt-3">{item.desc}</p>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}