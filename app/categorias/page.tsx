import Categorias from "../components/Categorias";
import Pieza from "../components/Pieza";
import Uso from "../components/Uso";
import Cronologia from "../components/Cronologia";

export default function CatalogoPage() {
  return (
    <main className="flex flex-col bg-white">
      <Categorias />
      <Pieza />
      <Uso />
      <Cronologia />
    </main>
  );
}
