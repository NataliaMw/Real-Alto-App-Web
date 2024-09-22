import React from 'react'
import image1 from '../images/Historia1.png'
import image2 from '../images/Historia2.png'


function Historia() {
    const imgSrc1: string = image1.src;
    const imgSrc2: string = image2.src;


    return (
        <div className='flex flex-col w-[100vw] px-5 md:px-28 space-y-4 my-4 md:my-20'>
            <div>
                <h2 className="font-erode text-black font-semibold text-5xl">Entendiendo cómo inició el Museo</h2>
            </div>
            <div>
                <p className='text-gray-500 font-robotSlap font-light'>
                    Localizada en la Costa del Ecuador, la sociedad Valdivia se complejizó desde hace 6.000 años.
                </p>
            </div>
            <div className='flex flex-col lg:flex-row space-y-4 lg:space-x-20'>
                <div className='flex flex-col lg:w-1/2 space-y-4'>
                    <img src={imgSrc1} alt="Descripción de la imagen" />
                    <img src={imgSrc2} alt="Descripción de la imagen" />

                </div>
                <div className='flex flex-col lg:w-1/2 space-y-4 '>
                    <p className='text-black font-robotSlap font-semibold'>
                        El Complejo Cultural Real Alto es un sitio arqueológico que muestra la forma en cómo las relaciones sociales
                        determinaron la lógica urbanística de los antiguos habitantes de la Península de Santa Elena.
                    </p>

                    <p className='text-black font-robotSlap  font-light'>
                        La construcción de los primeros edificios del
                        CCRA fue uno de los resultados generados por el proyecto "Medición del Impacto
                        Ambiental de la Refinería Jaime Roldós
                        Aguilera" planificado durante la década de los 80 y liderada por la Corporación Estatal Petrolera Ecuatoriana (CEPE). Esta medición de impacto fue llevada a cabo por el Centro de Estudios Arqueológicos y Antropológicos
                        (CEAA) de la ESPOL bajo la dirección del Dr.
                        Jorge G. Marcos.
                    </p>

                    <p className='text-black font-robotSlap  font-light'>
                        Entre 1982-1988 se recibieron fondos de la CEPE para la medición del Impacto Ambiental de la "Refinería Atahualpa" y como resultado,
                        la CEPE adjudicó fondos y creó, por primera vez, un programa de desarrollo comunitario a través del cual devolvió su apoyo a la región
                        mediante la financiación para la construcción del Complejo Cultural Real Alto en territorio de la Comuna Pechiche, inaugurándose en 1986
                        los dos edificios principales destinados a Museo y Reserva-Laboratorio y Hospedaje para investigadores.
                    </p>

                    <p className='text-black font-robotSlap  font-light'>
                        En 1988 se inaugura el Complejo Cultural Real Alto con el montaje de su museo de sitio "Loma del Mogote" junto con la edición de la Biblioteca Ecuatoriana de Arqueología de la Costa
                        Ecuatoriana (CEAA-ESPOL y Corporación Editora Nacional).
                        Además, se realizaron dos filmes: "Chanduy el Valle de la Vida" (Premio Municipal de Cortometrajes de Guayaquil, 1986)
                        y "Rescate"
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Historia;