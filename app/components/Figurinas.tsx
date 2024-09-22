import CatalogoItem from './CatalogoItem';

function Figurinas() {
    const nombrePieza = 'Figurinas';
    const imagesBarra = [
        'catalogo/figurinas/barra/imagen1.png',
        'catalogo/figurinas/barra/imagen2.png',
    ];

    const imagesPieza = [
        'catalogo/figurinas/figurina1.png',
        'catalogo/figurinas/figurina2.png',
    ];

    return <CatalogoItem nombrePieza={nombrePieza} imagesBarra={imagesBarra} imagesPieza={imagesPieza} />;
}

export default Figurinas;
