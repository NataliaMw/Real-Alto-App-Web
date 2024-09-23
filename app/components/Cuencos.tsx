import CatalogoItem from './CatalogoItem';

function Cuencos() {
    const nombrePieza = 'Cuencos';
    const imagesBarra = [
        'catalogo/cuencos/barra/imagen1.png',
        'catalogo/cuencos/barra/imagen2.png',
        'catalogo/cuencos/barra/imagen3.png',
        'catalogo/cuencos/barra/imagen4.png',
        'catalogo/cuencos/barra/imagen5.png',
        'catalogo/cuencos/barra/imagen6.png',
    ];

    const imagesPieza = [
        'catalogo/cuencos/cuenco1.png',
        'catalogo/cuencos/cuenco2.png',
        'catalogo/cuencos/cuenco3.png',
        'catalogo/cuencos/cuenco4.png',
        'catalogo/cuencos/cuenco5.png',
        'catalogo/cuencos/cuenco6.png',
    ];

    return <CatalogoItem nombrePieza={nombrePieza} imagesBarra={imagesBarra} imagesPieza={imagesPieza} />;
}

export default Cuencos;
