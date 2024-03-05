import React, { useState } from "react";
import { Link } from "react-router-dom";

import {MdKeyboardArrowDown} from '../assets/icons/vander'

export default function Faq(){
    const [activeIndex, setActiveIndex] = useState(1)
    const accordionData = [
        {
            id:1,
            title:'¿Cuánto tiempo tomará recibir mi foto impresa en casa?',
            desc:'El tiempo de entrega puede variar según tu ubicación y el tipo de envío seleccionado. Normalmente, procesamos y enviamos los pedidos en un plazo de 2 a 4 días hábiles. Puedes consultar la estimación exacta al finalizar tu compra.'
        },
        {
            id:2,
            title:'¿Como comprar en linea?',
            desc:'1. Selecciona el Producto: Navega por nuestro sitio web y elige el producto que deseas comprar. Puedes explorar diferentes categorías y opciones. 2. Añade al Carrito: Una vez que hayas encontrado el artículo deseado, haz clic en el botón "Agregar al Carrito". Esto guarda el producto para tu compra. 3. Revisa tu Carrito: Dirígete al carrito de compras para revisar los artículos seleccionados. Aquí podrás ajustar cantidades, eliminar productos o aplicar cupones de descuento si los tienes. 4. Inicia Sesión o Regístrate: Si aún no lo has hecho, inicia sesión en tu cuenta o regístrate. Esto facilita el proceso de pago y te permite realizar un seguimiento de tus pedidos. 5. Dirección y Método de Envío: Proporciona la dirección de entrega y elige el método de envío que mejor se adapte a tus necesidades. Algunas opciones pueden incluir envío estándar, express o la posibilidad de recoger en tienda, según disponibilidad. 6. Método de Pago: Selecciona tu método de pago preferido. Aceptamos diversas opciones, como tarjetas de crédito, débito o servicios de pago en línea seguros. 7. Revisa y Confirma: Antes de finalizar la compra, revisa cuidadosamente los detalles de tu pedido, incluida la dirección de entrega y los productos seleccionados. Confirma la compra cuando estés listo. 8. Confirmación de Pedido: Después de completar la compra, recibirás una confirmación por correo electrónico con los detalles de tu pedido.'
        },
        {
            id:3,
            title:': ¿Cuáles son las opciones de impresión disponibles en las cabinas fotográficas?',
            desc:'Nuestras cabinas ofrecen diversas opciones de impresión, desde tamaños estándar hasta personalizaciones especiales. Puedes elegir el formato, la calidad del papel y otros detalles durante el proceso de pedido para asegurarte de obtener la impresión que deseas.'
        },
        {
            id:4,
            title:'¿Cómo puedo estar seguro/a de que mi foto se imprimirá con la mejor calidad?',
            desc:'Garantizamos la mejor calidad de impresión. Antes de procesar tu pedido, nuestro equipo revisa cada imagen para asegurarse de que cumpla con nuestros estándares de impresión.'
        },
    ]
    return(
        <>
        <div className="container relative md:mt-24 mt-16">
                <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 items-center md:gap-[30px]">
                    <div className="lg:col-span-4 md:mb-0 mb-8">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">¿Tiene alguna pregunta?</h3>

                        <p className="text-slate-400 max-w-xl mx-auto mb-6">Te ofrecemos respuestas rápidas a las preguntas mas recurrentes, si no encuentras aquí la respuestas a tu pregunta no dudes en contactarnos.</p>

                        <Link to="/contact" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-amber-400 border-gray-100 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-400 text-slate-900 dark:text-white hover:text-white rounded-md">Contactanos</Link>
                    </div>

                    <div className="lg:col-span-8 md:mt-0 mt-8">
                        {accordionData.map((item,index)=>{
                            return(
                                <div className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4" key={index}>
                                    <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
                                        <button type="button" onClick={()=>setActiveIndex(item.id)} className={`${activeIndex === item.id ? "bg-gray-50 dark:bg-slate-800 text-amber-400" : ""} flex justify-between items-center p-5 w-full font-medium text-start`}>
                                            <span>{item.title}</span>
                                            <MdKeyboardArrowDown className={`${activeIndex === item.id ? "rotate-180" : ""} w-4 h-4 shrink-0`}/>
                                        </button>
                                    </h2>
                                    <div className={activeIndex === item.id ? "" : "hidden"}>
                                        <div className="p-5">
                                            <p className="text-slate-400 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> 
        </>
    )
}