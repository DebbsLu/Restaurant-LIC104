function ajustarDesarrolladores() {

    // ---------- ESCALADO PROPORCIONAL SEGÚN ANCHO DE #CUERPONUEVO ----------
const cuerponuevo = document.getElementById('cuerponuevo');
const anchoDisponible = cuerponuevo.offsetWidth; // ancho real del contenedor padre

// Definimos un ancho base de referencia (por ejemplo, el tamaño en escritorio normal)
//const anchoBase = 1000; // referencia visual; ajusta si tu diseño base es más pequeño
/*const escala = Math.min(1, anchoDisponible / anchoBase); // nunca crece más del 100%*/
//const escala = Math.min(1.4, anchoDisponible / anchoBase);

const anchoBase = 1000;
let escala;

// Escala dinámica según dispositivo
if (window.innerWidth >= 577 && window.innerWidth <= 992) {
    // TABLET → aumentar escala para que se vea más grande
    escala = Math.min(1.8, (anchoDisponible / anchoBase) * 1.4);
} else {
    // Teléfonos y escritorio → mantener como antes
    escala = Math.min(1.4, anchoDisponible / anchoBase);
}



    const width = window.innerWidth;
    const height = window.innerHeight; // altura de la ventana
    
    const contenedor = document.getElementById('contenedor-desarrolladores');
    const texto = document.getElementById('texto-desarrolladores');
    const semicirculo = document.getElementById('semicirculo');

    const dots = [
        document.querySelector('.dot-1'),
        document.querySelector('.dot-2'),
        document.querySelector('.dot-3'),
        document.querySelector('.dot-4'),
        document.querySelector('.dot-5')
    ];

    const recs = [
        document.querySelector('.rec-1'),
        document.querySelector('.rec-2'),
        document.querySelector('.rec-3'),
        document.querySelector('.rec-4'),
        document.querySelector('.rec-5')
    ];

    const lines = [
        document.querySelector('.linea-1'),
        document.querySelector('.linea-2'),
        document.querySelector('.linea-3'),
        document.querySelector('.linea-4'),
        document.querySelector('.linea-5'),
        document.querySelector('.linea-6'),
        document.querySelector('.linea-7'),
        document.querySelector('.linea-8')
    ];

// ---------- CENTRADO HORIZONTAL SOLO TABLET/ESCRITORIO ----------
if (width >= 577) {


    contenedor.style.marginLeft = 'auto';
    contenedor.style.marginRight = 'auto';
    contenedor.style.left = '';
    contenedor.style.transform = '';
    contenedor.style.position = 'relative'; // mantener flujo normal
} else {
    // Para móviles: nada, se mantiene como está
    contenedor.style.marginLeft = '';
    contenedor.style.marginRight = '';
}

    

    // Configuración según ancho
    if (width <= 359) {
        // Teléfonos muy pequeños
        contenedor.style.width = '200px';
        contenedor.style.height = '400px';

        texto.style.fontSize = '16px';
        texto.style.top = '185px';
        texto.style.left = '10px';

        semicirculo.style.borderRadius = '0 400px 400px 0';

        const dotPositions = [
            {left:30, top:5}, {left:80, top:20}, {left:100, top:50}, {left:80, top:80}, {left:30, top:95}
        ];
        const dotSize = 54;

        const recPositions = [
            {left:30, top:17}, {left:80, top:32}, {left:100, top:62}, {left:80, top:92}, {left:30, top:107}
        ];
        const recSize = {width: 80, height: 30, font: 10};

        const lineData = [
            {width:188, height:376}, {width:181, height:362}, {width:173, height:346}, {width:166, height:332},
            {width:154, height:308}, {width:149, height:298}, {width:142, height:284}, {width:137, height:274}
        ];

        aplicar(dotPositions, dotSize, recPositions, recSize, lineData, dots, recs, lines);

    } else if (width >= 360 && width <= 576) {
        // Teléfonos grandes
        contenedor.style.width = '300px';
        contenedor.style.height = '600px';

        texto.style.fontSize = '24px';
        texto.style.top = '280px';
        texto.style.left = '10px';

        semicirculo.style.borderRadius = '0 600px 600px 0';

        const dotPositions = [
            {left:30, top:5}, {left:80, top:20}, {left:100, top:50}, {left:80, top:80}, {left:30, top:95}
        ];
        const dotSize = 80;

        const recPositions = [
            {left:30, top:17}, {left:80, top:32}, {left:100, top:62}, {left:80, top:92}, {left:30, top:107}
        ];
        const recSize = {width:120, height:46, font:15};

        const lineData = [
            {width:282, height:564}, {width:272, height:544}, {width:260, height:520}, {width:250, height:500},
            {width:232, height:464}, {width:224, height:448}, {width:214, height:428}, {width:206, height:412}
        ];

        aplicar(dotPositions, dotSize, recPositions, recSize, lineData, dots, recs, lines);

} else if (width >= 577 && width <= 992) {
    // ---------- TABLETS ----------
    contenedor.style.width = (400 * escala) + 'px';
    contenedor.style.height = (200 * escala) + 'px';

    texto.style.fontSize = (24 * escala) + 'px';
    texto.style.top = (42 * escala) + 'px';
    texto.style.left = '50%';
    texto.style.transform = 'translateX(-50%)';

    semicirculo.style.borderRadius = `0 0 ${(200 * escala)}px ${(200 * escala)}px`;

    const dotPositions = [
        { left: 5, top: 30 },
        { left: 20, top: 80 },
        { left: 50, top: 100 },
        { left: 80, top: 80 },
        { left: 95, top: 30 }
    ];

    const dotSize = 54 * escala;
    const recPositions = [
        { left: 5, top: 53 },
        { left: 20, top: 103 },
        { left: 50, top: 123 },
        { left: 80, top: 103 },
        { left: 95, top: 53 }
    ];
    const recSize = {
        width: 80 * escala,
        height: 30 * escala,
        font: 10 * escala
    };

    const lineData = [
        { width: 376 * escala, height: 188 * escala },
        { width: 362 * escala, height: 181 * escala },
        { width: 346 * escala, height: 173 * escala },
        { width: 332 * escala, height: 166 * escala },
        { width: 308 * escala, height: 154 * escala },
        { width: 298 * escala, height: 149 * escala },
        { width: 284 * escala, height: 142 * escala },
        { width: 274 * escala, height: 137 * escala }
    ];

    aplicar(dotPositions, dotSize, recPositions, recSize, lineData, dots, recs, lines);

} else if (width >= 993) {
    // ---------- ESCRITORIO ----------
    contenedor.style.width = (600 * escala) + 'px';
    contenedor.style.height = (300 * escala) + 'px';

    texto.style.fontSize = (45 * escala) + 'px';
    texto.style.top = (72 * escala) + 'px';
    texto.style.left = '50%';
    texto.style.transform = 'translateX(-50%)';

    semicirculo.style.borderRadius = `0 0 ${(300 * escala)}px ${(300 * escala)}px`;

    const dotPositions = [
        { left: 5, top: 30 },
        { left: 20, top: 80 },
        { left: 50, top: 100 },
        { left: 80, top: 80 },
        { left: 95, top: 30 }
    ];

    const dotSize = 80 * escala;
    const recPositions = [
        { left: 5, top: 53 },
        { left: 20, top: 103 },
        { left: 50, top: 123 },
        { left: 80, top: 103 },
        { left: 95, top: 53 }
    ];
    const recSize = {
        width: 120 * escala,
        height: 46 * escala,
        font: 15 * escala
    };

    const lineData = [
        { width: 564 * escala, height: 282 * escala },
        { width: 544 * escala, height: 272 * escala },
        { width: 520 * escala, height: 260 * escala },
        { width: 500 * escala, height: 250 * escala },
        { width: 464 * escala, height: 232 * escala },
        { width: 448 * escala, height: 224 * escala },
        { width: 428 * escala, height: 214 * escala },
        { width: 412 * escala, height: 206 * escala }
    ];

    aplicar(dotPositions, dotSize, recPositions, recSize, lineData, dots, recs, lines);
}

}

// Función auxiliar para aplicar posiciones y tamaños
function aplicar(dotPositions, dotSize, recPositions, recSize, lineData, dots, recs, lines) {
    dots.forEach((dot, i) => {
        dot.style.width = dotSize + 'px';
        dot.style.height = dotSize + 'px';
        dot.style.left = dotPositions[i].left + '%';
        dot.style.top = dotPositions[i].top + '%';
    });

    recs.forEach((rec, i) => {
        rec.style.width = recSize.width + 'px';
        rec.style.height = recSize.height + 'px';
        rec.style.left = recPositions[i].left + '%';
        rec.style.top = recPositions[i].top + '%';
        rec.querySelectorAll('span').forEach(span => {
            span.style.fontSize = recSize.font + 'px';
        });
    });

    lines.forEach((line, i) => {
    line.style.width = lineData[i].width + 'px';
    line.style.height = lineData[i].height + 'px';
    // Para teléfono grande (360-576) usar border-radius exacto como en CSS
    if (window.innerWidth >= 360 && window.innerWidth <= 576) {
        line.style.borderRadius = `0 ${lineData[i].width}px ${lineData[i].width}px 0`;
        line.style.left = '0';
        line.style.top = '50%';
        line.style.transform = 'translateY(-50%)';
        line.style.borderLeft = '2px solid rgba(255,255,255,0.5)';
        line.style.borderTop = 'none';
    } else {
        // Otros casos dinámicos o escritorio/tablet
        line.style.borderRadius = `0 0 ${lineData[i].height}px ${lineData[i].height}px`;
    }
    });
}

function actualizarPosiciones() {
  const semicirculo = document.getElementById('semicirculo');
  const ancho = semicirculo.offsetWidth;
  const alto = semicirculo.offsetHeight;

  // ----------------- Líneas decorativas -----------------
  const lineas = document.querySelectorAll('.linea-decorativa');
  lineas.forEach((linea, index) => {
    const factor = 0.15 + index * 0.1; // Distribución progresiva
    linea.style.width = `${ancho * factor}px`;
    linea.style.height = `${alto * factor}px`;
    linea.style.borderRadius = `0 0 ${linea.offsetWidth / 2}px ${linea.offsetWidth / 2}px`;

    // Centrado horizontal para tablet/escritorio, vertical para móviles
    if(window.innerWidth < 577){
      linea.style.left = '0';
      linea.style.top = '50%';
      linea.style.transform = 'translateY(-50%)';
      linea.style.borderTop = 'none';
      linea.style.borderLeft = '2px solid rgba(255,255,255,0.5)';
    } else {
      linea.style.left = '50%';
      linea.style.top = '0';
      linea.style.transform = 'translateX(-50%)';
      linea.style.borderLeft = 'none';
      linea.style.borderTop = '2px solid rgba(255,255,255,0.5)';
    }
  });

  // ----------------- Rectángulos -----------------
  const recs = document.querySelectorAll('.rec');
  recs.forEach((rec, index) => {
    // Distribución proporcional a lo largo de la semicircunferencia
    let angulo = Math.PI * (index / (recs.length - 1)); // 0 a 180°
    let x = ancho / 2 + (ancho/2 - 50) * Math.cos(angulo); // 50 es offset de rec
    let y = alto - (alto * 0.9 * Math.sin(angulo));
    if(window.innerWidth < 577) {
      // Volteo para móviles (semicirculo de lado)
      x = ancho * Math.sin(angulo);
      y = alto * factor; // Ajusta altura relativa
    }
    rec.style.left = `${x}px`;
    rec.style.top = `${y}px`;
  });
}

// Ejecutar al cargar y al cambiar tamaño de ventana
window.addEventListener('load', actualizarPosiciones);
window.addEventListener('resize', actualizarPosiciones);




// Ejecutar al cargar y al cambiar tamaño
window.addEventListener('load', ajustarDesarrolladores);
window.addEventListener('resize', ajustarDesarrolladores);
