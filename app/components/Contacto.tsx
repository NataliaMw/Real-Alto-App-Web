import React from 'react'
import image from '../images/Contacto.png'

function Contacto() {
    const imgSrc: string = image.src;

    return (
        <div className='flex flex-col w-[100vw] px-5 md:px-28 space-y-4 my-4 md:my-20'>
            <div>
                <h2 className="font-erode font-semibold text-5xl text-black">Contacto</h2>
            </div>
            <div>
                <p className='text-gray-500 font-robotSlap font-light'>
                    Localizada en la Costa del Ecuador, la sociedad Valdivia se complejizó desde hace 6.000 años.
                </p>
            </div>
            <div className='flex flex-col lg:flex-row space-y-4 lg:space-x-4'>
                <div className='lg:w-1/2'>
                    <img src={imgSrc} alt="Descripción de la imagen" />
                </div>
                <div className='flex flex-col space-y-4 lg:w-1/2'>
                    <p className='text-black font-robotSlap md:font-semibold font-light'>
                        Para reservaciones ponemos a su disposición los siguientes canales de contacto:
                    </p>
                    <ul className='list-disc list-inside text-black font-robotSlap font-light break-words'>
                        <li>+593898989898</li>
                        <li>(3286674) 02 2565634</li>
                        <li>administracion@complejoculturalrealalto.org</li>
                        <li>infor@complejoculturalrealalto.org</li>
                    </ul>
                    <p className='text-black font-robotSlap  font-light'>
                        Ubicado en la Comuna Pechiche, Parroquia Chanduy, Provincia de Santa Elena.
                        Se llega por el desvio del kilómetro 109 de la vía Guayaquil-Salinas, aproximadamente a 12 Km.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Contacto;