import './parrafo-animado.module.css';

export const ParrafoAnimado = () => {
  return /* html */ `
  <div class="typing-container">
    <p>
      Este es el primer párrafo de un texto grande.
      Tiene varias líneas de texto que se escribirán una tras otra.
      Cada línea debe aparecer gradualmente como si se estuviera escribiendo en tiempo real.
    </p>
    <p>
      Aquí comienza el segundo párrafo, que también se escribe solo.
      De nuevo, cada línea se irá mostrando una tras otra.
    </p>
    <p>
      Finalmente, este es el tercer párrafo de nuestro ejemplo.
      Seguimos el mismo patrón para animar cada línea.
    </p>
  </div>`;
};
