import React from 'react'

function Uso() {

    const tipoDeUso = ['ritual', 'cotidiano'];

    return (
        <div className='flex flex-col w-[100vw] items-center'>
            <div className='flex flex-col p-6 gap-4'>
                <h2 className='font-erode font-bold text-naranja uppercase lg:text-2xl md:text-xl sm:text-lg text-center'>
                    Por tipo de uso
                </h2>
                <p className='text-black text-justify md:w-[35vw] font-robotSlap text-base mt-2 font-light'>
                    Esta categoría les invita a explorar las piezas arqueológicas....
                </p>
            </div>
            <div className='md:mr-auto flex h-[20vh] sm:h-[32vh] w-full md:w-[70vw] text-4xl md:bg-vector3 justify-center md:justify-normal mt-2'>
                <div className='flex justify-around md:justify-end gap-2 md:gap-4 items-center w-full md:mr-20'>
                {tipoDeUso.map((uso, index) => (
                    <div key={index} className='bg-black rounded-lg w-[40vw] md:w-[15vw] md:h-[20vh] space-y-2 flex flex-col justify-between overflow-hidden'>
                       <h3 className='font-erode text-white text-lg font-semibold text-center uppercase'>{uso}</h3>
                       <img src={`catalogo/${uso}.png`} alt={uso} className="w-full h-auto object-cover" />
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Uso