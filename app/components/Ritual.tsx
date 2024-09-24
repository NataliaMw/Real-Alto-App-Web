import CatalogoItem from './CatalogoItem';

function Ritual() {
    const tipo = 'uso';
    const nombrePieza = 'Ritual';
    const imagesBarra = [
        '/catalogo/cuencos/barra/imagen3.png',
        '/catalogo/cuencos/barra/imagen6.png',
        '/catalogo/figurinas/barra/imagen1.png',
        '/catalogo/figurinas/barra/imagen2.png',
    ];

    const imagesPieza = [
        '/catalogo/cuencos/cuenco3.png',
        '/catalogo/cuencos/cuenco6.png',
        '/catalogo/figurinas/figurina1.png',
        '/catalogo/figurinas/figurina2.png',
    ];

    return <CatalogoItem tipo={tipo} nombrePieza={nombrePieza} imagesBarra={imagesBarra} imagesPieza={imagesPieza} />;
}

export default Ritual;
