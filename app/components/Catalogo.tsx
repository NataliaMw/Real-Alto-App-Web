"use client";  // <-- Añade esta línea al principio
import React, { useState } from 'react';

function Catalogo() {
    const nombrePieza = 'Cuencos'; // Declare and initialize the variable 'nombrePieza'

    const imagesBarra = [
        'catalogo/cuencos/barra/imagen1.png',
        'catalogo/cuencos/barra/imagen2.png',
        'catalogo/cuencos/barra/imagen3.png',
        'catalogo/cuencos/barra/imagen4.png',
        'catalogo/cuencos/barra/imagen5.png',
        'catalogo/cuencos/barra/imagen6.png',
    ];

    const imagesCuencos = [
        'catalogo/cuencos/cuenco1.png',
        'catalogo/cuencos/cuenco2.png',
        'catalogo/cuencos/cuenco3.png',
        'catalogo/cuencos/cuenco4.png',
        'catalogo/cuencos/cuenco5.png',
        'catalogo/cuencos/cuenco6.png',
    ];

    const [selectedImage, setSelectedImage] = useState(0);

    // Función para la flecha izquierda
    const handlePrevImage = () => {
        setSelectedImage((prev) => (prev === 0 ? imagesCuencos.length - 1 : prev - 1));
    };

    // Función para la flecha derecha
    const handleNextImage = () => {
        setSelectedImage((prev) => (prev === imagesCuencos.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className='flex flex-col w-[100vw] my-20 space-y-10'>
            <div className='flex items-center px-10 md:px-40'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-10 md:w-10 text-orange-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <h2 className='font-erode text-black text-lg sm:text-2xl md:text-4xl mr-2'>Por tipo de pieza</h2>
                <span className='font-erode text-lg sm:text-2xl md:text-4xl text-black font-semibold'> {nombrePieza}</span>
            </div>
            <div className='hidden md:flex items-center'>
                {/* Flecha Izquierda */}
                <button onClick={handlePrevImage} className='absolute left-20 p-2 bg-gray-300 rounded-full hidden md:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                {/* Vista de una sola imagen para pantallas grandes */}
                <div className='flex flex-col md:flex-row px-2 md:px-40 w-full space-x-0 md:space-x-2 space-y-20 md:space-y-0'>
                    <img src={imagesCuencos[selectedImage]} alt='cuencos' className='flex w-full md:w-1/3 h-auto object-cover' />
                    <div className='flex w-full md:w-2/3'>
                        <div className='relative flex w-1/3 justify-center'>
                            <div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
                                <img src='catalogo/simbolos/procedencia.png' alt='procedencia' className='w-full h-full ' />
                            </div>
                            <div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
                                <span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>PROCEDENCIA</span>
                                <span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
                            </div>
                        </div>
                        <div className='relative flex w-1/3 justify-center'>
                            <div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
                                <img src='catalogo/simbolos/uso.png' alt='uso' className='w-full h-full ' />
                            </div>
                            <div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
                                <span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>USO</span>
                                <span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
                            </div>
                        </div>
                        <div className='relative flex w-1/3 justify-center'>
                            <div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
                                <img src='catalogo/simbolos/medidas.png' alt='medidas' className='w-full h-full ' />
                            </div>
                            <div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
                                <span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>MEDIDAS</span>
                                <span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Flecha Derecha */}
                <button onClick={handleNextImage} className='absolute right-20 p-2 bg-gray-300 rounded-full hidden md:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

            </div>

            {/* Vista de columna para pantallas pequeñas */}
            <div className="flex flex-col md:hidden px-5 space-y-10">
                {imagesCuencos.map((image, index) => (
                    <div key={index} className='flex flex-col items-center space-y-10'>
                        <img src={image} alt={`Imagen ${index}`} className='w-full h-auto object-cover' />
                        <div className='flex w-full'>
                            <div className='relative flex w-1/3 justify-center'>
                                <div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
                                    <img src='catalogo/simbolos/procedencia.png' alt='procedencia' className='w-full h-full ' />
                                </div>
                                <div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
                                    <span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>PROCEDENCIA</span>
                                    <span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
                                </div>
                            </div>
                            <div className='relative flex w-1/3 justify-center'>
                                <div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
                                    <img src='catalogo/simbolos/uso.png' alt='uso' className='w-full h-full ' />
                                </div>
                                <div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
                                    <span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>USO</span>
                                    <span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
                                </div>
                            </div>
                            <div className='relative flex w-1/3 justify-center'>
                                <div className='absolute bg-vector3 rounded-full h-16 w-16 -top-8 p-3'>
                                    <img src='catalogo/simbolos/medidas.png' alt='medidas' className='w-full h-full ' />
                                </div>
                                <div className='flex flex-col h-full w-3/4 bg-black rounded-lg p-10 items-center space-y-2'>
                                    <span className='font-erode text-white font-semibold text-xs sm:text-lg md:text-xs lg:text-lg'>MEDIDAS</span>
                                    <span className='font-erode text-white text-xs sm:text-base'>Texto a llenar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='hidden md:flex space-x-2 justify-center border-t border-b border-gray-300'>
                {imagesBarra.map((image, index) => (
                    <div
                        key={index}
                        className={`p-2 cursor-pointer ${selectedImage === index ? 'bg-orange-500' : 'bg-gray-300'
                            }`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <img src={image} alt={`Imagen ${index}`} className='h-20 w-20 object-contain' />
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center w-full px-10 py-5">
                {/* Flecha Izquierda con texto */}
                <div className="flex items-center cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-erode text-xl sm:text-4xl text-black">Ollas</span>
                </div>

                {/* Flecha Derecha con texto */}
                <div className="flex items-center cursor-pointer">
                    <span className="font-erode text-xl sm:text-4xl text-black">Figurinas</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-orange-500 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

        </div>
    )
}

export default Catalogo;