import Cuencos from '../../components/Cuencos';
import Ollas from '../../components/Ollas';
import Figurinas from '../../components/Figurinas';
import { useRouter } from 'next/router';

const CatalogoPiezaPage = () => {
  const router = useRouter();
  const { nombrePieza } = router.query;

  // Verificar si nombrePieza está disponible antes de renderizar el contenido
  if (!nombrePieza) {
    return <p>Cargando...</p>;
  }

  let Component;

  switch (nombrePieza) {
    case 'cuencos':
      Component = Cuencos;
      break;
    case 'ollas':
      Component = Ollas;
      break;
    case 'figurinas':
      Component = Figurinas;
      break;
    default:
      Component = () => <p>Pieza no encontrada</p>;
      break;
  }

  return (
    <main className="flex bg-white">
      <Component />
    </main>
  );
};

export default CatalogoPiezaPage;
