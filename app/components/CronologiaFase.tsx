import React from 'react';
import Link from 'next/link';


interface CronologiaFaseProps {
    faseId: number;
}

function CronologiaFase({ faseId }: CronologiaFaseProps) {
    const bars = [
        { id: 7, color: 'bg-vector1', order: 'col-start-1', images: ['cuencos/barra/imagen4.png', 'ollas/barra/imagen3.png'], years: '2000 - 1800 A.C' },
        { id: 6, color: 'bg-vector2', order: 'col-start-2', images: ['cuencos/barra/imagen6.png', 'cuencos/barra/imagen1.png', 'ollas/barra/imagen4.png'], years: '2200 - 2000 A.C' },
        { id: 5, color: 'bg-vector3', order: 'col-start-3', images: ['figurinas/barra/imagen1.png', 'cuencos/barra/imagen2.png'], years: '2400 - 2200 A.C' },
        { id: 4, color: 'bg-vector4', order: 'col-start-4', images: ['ollas/barra/imagen1.png', 'cuencos/barra/imagen3.png'], years: '2650 - 2400 A.C' },
        { id: 3, color: 'bg-vector5', order: 'col-start-5', images: [], years: '2900 - 2650 A.C' },
        { id: 2, color: 'bg-vector6', order: 'col-start-6', images: ['cuencos/barra/imagen5.png', 'figurinas/barra/imagen2.png'], years: '3350 - 2900 A.C' },
        { id: 1, color: 'bg-vector7', order: 'col-start-7', images: ['ollas/barra/imagen2.png'], years: '3950 - 3350 A.C' },
    ];

    return (
        <div className='flex flex-col w-full my-20 space-y-10 items-center'>

            <div className='flex items-center w-full px-10 md:px-40'>
                <Link href="/categorias">
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
                </Link>
                <h2 className='font-erode text-black text-lg sm:text-2xl md:text-4xl mr-2'>Por cronología</h2>
                <span className='font-erode text-lg sm:text-2xl md:text-4xl text-black font-semibold'>Valdivia</span>
            </div>

            <div className="flex flex-col w-9/12 md:w-[48vw] space-y-4 ">
                {bars.map((bar) => (
                    <div key={bar.id} className={`${bar.color} flex flex-col transform transition-transform duration-300 hover:scale-110`}>
                        {faseId === bar.id && (
                            bar.images && bar.images.length > 0 ? (
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-black text-lg font-bold font-erode">{bar.years}</p>
                                    <div className="flex space-x-4">
                                        {bar.images.map((image, index) => (
                                            <img key={index} src={`/catalogo/${image}`} alt={`Fase ${bar.id}`} className="h-12 sm:h-24 lg:h-28 w-auto object-contain" />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-black text-lg font-bold font-erode">{bar.years}</p>
                                    <p className="text-black text-lg font-bold font-erode my-4 sm:my-10">-No encontrado-</p>
                                </div>
                            )
                        )}
                        <Link key={bar.id} href={`/catalogo/cronologia/fase${bar.id}`} passHref>
                            <div className='flex flex-col grid grid-cols-7 h-16'>
                                <div className={`flex justify-center items-center text-6xl text-white font-bold font-erode ${bar.order}`}>
                                    {bar.id}
                                </div>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default CronologiaFase;
