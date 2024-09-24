import React from 'react'
import Link from 'next/link';

// import Cuenco from '../images/catalogo/cuencos.png'

function Pieza() {

    const piezas = ['cuencos', 'ollas', 'figurinas'];
    // const imgSrc: string = Cuenco.src;


    return (
        <div className='flex flex-col w-[100vw] items-center'>
            <div className='flex flex-col p-6 gap-4'>
                <h2 className='font-erode font-bold text-naranja uppercase lg:text-2xl md:text-xl sm:text-lg text-center'>
                    Por tipo de piezas
                </h2>
                <p className='text-black text-justify md:w-[35vw] font-robotSlap text-base font-light'>
                    En esta categoría están diversos objetos de cerámica pertenecientes a la Cultura Valdivia entre los que se encuentran: cuencos, ollas y figurinas. Cada uno con una gran diversidad estética.
                </p>
            </div>
            <div className='flex h-[20vh] sm:h-[32vh] md:bg-vector1 w-full md:w-[70vw] justify-center md:ml-auto mt-2'>
                <div className='flex w-full justify-around md:justify-normal gap-2 md:gap-4 items-center md:ml-20'>
                    {piezas.map((nombrePieza, index) => (
                        <Link key={index} href={`/catalogo/pieza/${nombrePieza}`}>
                            <div className='cursor-pointer bg-black rounded-lg w-[25vw] md:w-[12vw] md:h-[20vh] space-y-4 flex flex-col justify-between overflow-hidden'>
                                <h3 className='font-erode text-white text-sm lg:text-lg font-semibold text-center uppercase'>{nombrePieza}</h3>
                                <img src={`catalogo/${nombrePieza}.png`} alt={nombrePieza} className="w-full h-auto object-cover" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pieza