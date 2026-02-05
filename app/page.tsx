// Este archivo define la página principal.
// Básicamente se encarga de mostrar el contenido del home,
// delegando todo el diseño y la lógica al componente HomeClient.
// (aqui no hay que hacer mucho)

import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
