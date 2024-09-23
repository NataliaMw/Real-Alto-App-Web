"use client"
import React from 'react'
import {useState,useEffect} from 'react'
import fondo from '../images/categoria-fondo.jpg'

function Categorias() {

    const imgSrc: string = fondo.src;

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 640); // Asume 640px como el punto de quiebre para 'sm'
      };
  
      checkScreenSize(); // Verifica el tamaño al montar
      window.addEventListener('resize', checkScreenSize); // Ajusta al cambiar tamaño
  
      return () => window.removeEventListener('resize', checkScreenSize); // Limpieza al desmontar
    }, []);

    return (
        <div className='relative w-[100vw] md:h-[40vh] sm:h-[50vh]'>
            <img src={imgSrc} alt="imagen" className="w-[100vw] h-[40vh] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black  opacity-60 w-[100vw] md:h-[40vh] sm:h-[50vh]"></div>
            <div className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white w-[100vw] md:h-[40vh] sm:h-[50vh]'>
                <h1 className='sm:text-xl md:text-3xl lg:text-4xl font-erode font-semibold text-center tracking-wide uppercase p-2'>Categorías</h1>
                <p style={{ fontSize: '15px' }} className='text-white md:text-justify sm:w-[70vw] lg:w-[50vw] font-robotSlap sm:text-xs md:text-base font-light p-1'>
                    El Museo de Real Alto le da bienvenida a nuestro catálogo interactivo, un espacio fascinante donde podrá conocer la riqueza cultural que posee el lugar a través de las piezas arqueológicas.
                    {isSmallScreen ? ' ' : <br/>}
                    En este catálogo, hemos organizado las piezas en distintas categorías para ofrecer una experiencia de exploración gratificante.
                </p>
    
            </div>
           
        </div>
    )
}

export default Categorias