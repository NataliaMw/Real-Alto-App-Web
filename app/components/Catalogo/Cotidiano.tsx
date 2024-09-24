import CatalogoItem from '../CatalogoItem';

function Cotidiano() {
    const tipo = 'uso';
    const nombrePieza = 'Cotidiano';
    const imagesBarra = [
        '/catalogo/cuencos/barra/imagen1.png',
        '/catalogo/cuencos/barra/imagen2.png',
        '/catalogo/cuencos/barra/imagen4.png',
        '/catalogo/cuencos/barra/imagen5.png',
        '/catalogo/ollas/barra/imagen1.png',
        '/catalogo/ollas/barra/imagen2.png',
        '/catalogo/ollas/barra/imagen3.png',
        '/catalogo/ollas/barra/imagen4.png',
    ];

    const imagesPieza = [
        '/catalogo/cuencos/cuenco1.png',
        '/catalogo/cuencos/cuenco2.png',
        '/catalogo/cuencos/cuenco4.png',
        '/catalogo/cuencos/cuenco5.png',
        '/catalogo/ollas/olla1.png',
        '/catalogo/ollas/olla2.png',
        '/catalogo/ollas/olla3.png',
        '/catalogo/ollas/olla4.png',
    ];

    return <CatalogoItem tipo={tipo} nombrePieza={nombrePieza} imagesBarra={imagesBarra} imagesPieza={imagesPieza} />;
}

export default Cotidiano;
