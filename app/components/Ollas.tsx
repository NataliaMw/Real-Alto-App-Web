import CatalogoItem from './CatalogoItem';

function Ollas() {
    const nombrePieza = 'Ollas';
    const imagesBarra = [
        'catalogo/ollas/barra/imagen1.png',
        'catalogo/ollas/barra/imagen2.png',
        'catalogo/ollas/barra/imagen3.png',
        'catalogo/ollas/barra/imagen4.png',
    ];

    const imagesPieza = [
        'catalogo/ollas/olla1.png',
        'catalogo/ollas/olla2.png',
        'catalogo/ollas/olla3.png',
        'catalogo/ollas/olla4.png',
    ];

    return <CatalogoItem nombrePieza={nombrePieza} imagesBarra={imagesBarra} imagesPieza={imagesPieza} />;
}

export default Ollas;
