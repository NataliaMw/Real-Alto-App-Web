import React from 'react';

function Cronologia() {
    const bars = [
        { id: 7, color: 'bg-vector1', order: 'col-start-1' },
        { id: 6, color: 'bg-vector2', order: 'col-start-2' },
        { id: 5, color: 'bg-vector3', order: 'col-start-3' },
        { id: 4, color: 'bg-vector4', order: 'col-start-4' },
        { id: 3, color: 'bg-vector5', order: 'col-start-5' },
        { id: 2, color: 'bg-vector6', order: 'col-start-6' },
        { id: 1, color: 'bg-vector7', order: 'col-start-7' },
    ];

    return (
        <div className='flex flex-col w-full p-6 items-center'>

            <div className='p-6 justify-center items-center'>
                <h1 className='text-naranja text-center font-bold font-erode uppercase lg:text-2xl md:text-xl sm:text-lg'>Por cronología</h1>
                <p className='text-black text-justify font-robotSlap w-[90vw] md:w-[70vw] lg:w-[50vw] font-light mt-2'>
                    Su viaje por esta categoría le va a permitir encontrar el tipo de pieza en un período específico del tiempo. En este caso inicia desde la fase de <b>Valdivia</b> 1A (3950 - 3650 A.C) hasta Valdivia 7 (2000-1800 A.C).
                </p>
            </div>

            <div className="flex flex-col w-9/12 md:w-[48vw] space-y-4 ">
                {bars.map((bar) => (
                    <div key={bar.id} className={`${bar.color} grid grid-cols-7 h-16`}>
                        <div className={`flex justify-center items-center text-6xl text-white font-bold font-erode ${bar.order}`}>
                            {bar.id}
                        </div>
                    </div>
                ))}
            </div>

            <p className='text-white bg-black text-justify font-erode w-[90vw] md:w-[50vw] font-light font-tight mt-5 p-4'>
                El sitio Valdivia de Real alto se divide en 7 fases crono-culturales que se encuentran representadas por niveles estratigráficos donde el nivel 7 es el más tardio y el más temprano es el nivel 1.
            </p>

        </div>
    );
}

export default Cronologia;
