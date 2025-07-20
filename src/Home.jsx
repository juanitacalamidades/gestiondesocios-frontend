import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function Home() {
  const pRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const paragraph = pRef.current;
    const text = paragraph.innerText;
    const words = text.split(" ");

    paragraph.innerHTML = "";

    words.forEach((word, wordIndex) => {
      // Contenedor para cada palabra
      const wordSpan = document.createElement("span");
      wordSpan.style.whiteSpace = "nowrap"; // Mantiene letras de una palabra juntas

      // Añadir cada letra como span
      word.split("").forEach((letter) => {
        const letterSpan = document.createElement("span");
        letterSpan.textContent = letter;
        letterSpan.style.display = "inline-block";
        wordSpan.appendChild(letterSpan);
      });

      paragraph.appendChild(wordSpan);

      // Añadir espacio entre palabras (menos en la última)
      if (wordIndex < words.length - 1) {
        const space = document.createTextNode(" ");
        paragraph.appendChild(space);
      }
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const spans = pRef.current.querySelectorAll("span span"); // Selecciona solo los spans de letras

    const centerIndex = spans.length / 2;

    // Desplaza cada letra horizontalmente según su posición relativa al centro
    // Las letras más a la izquierda se van hacia la izquierda, las de la derecha hacia la derecha
    gsap.to(spans, {
      x: (i) => (i - centerIndex) * 50,
      y: -100,
      opacity: 0,
      rotate: (i) => (i % 2 === 0 ? -90 : 90),
      duration: 0.4,
      stagger: 0.015,
      ease: "power2.out",
      onComplete: () => navigate("/login"),
    });
  };

  return (
    <div className="flex flex-col justify-center items-start md:items-center min-h-screen mx-[20px] md:mx-[222px] gap-8 md:w-1/2">
      <section className="w-full">
        <h1 className="text-3xl font-bold">Rabotnik</h1>
        <p ref={pRef} className="mt-2 text-sm">
          Rabotnik es una herramienta digital diseñada para gestionar de forma eficiente la base de datos de socios de la Asociación de Artes de Calle del País Vasco.
        </p>
      </section>
      <nav className="w-full text-center">
        <ul>
          <li className="w-full">
            <button
              onClick={handleClick}
              className="block w-full md:w-fit bg-[#31234E] text-white text-sm px-4 py-2 rounded hover:bg-[#513570]"
            >
              Accede a tu cuenta
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
