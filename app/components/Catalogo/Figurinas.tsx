import CatalogoItem from '../CatalogoItem';

function Figurinas() {
    const tipo = 'pieza';
    const nombrePieza = 'Figurinas';
    const imagesBarra = [
        '/catalogo/figurinas/barra/imagen1.png',
        '/catalogo/figurinas/barra/imagen2.png',
    ];

    const imagesPieza = [
        '/catalogo/figurinas/figurina1.png',
        '/catalogo/figurinas/figurina2.png',
    ];

    return <CatalogoItem tipo={tipo} nombrePieza={nombrePieza} imagesBarra={imagesBarra} imagesPieza={imagesPieza} />;
}

export default Figurinas;
