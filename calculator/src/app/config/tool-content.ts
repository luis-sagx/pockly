import type { Language, ToolContentBlock } from '@pockly/shared';

type ToolKey = 'percentage' | 'currency' | 'units';

export const TOOL_CONTENT: Record<Language, Record<ToolKey, ToolContentBlock>> = {
  en: {
    percentage: {
      aboutTitle: 'About the Percentage Calculator',
      about: [
        'The Percentage Calculator solves the three everyday percentage problems instantly: what is X% of a number (discounts, tips, taxes), what percentage X is of Y (scores, proportions, market share), and the percentage change between two values (price increases, growth rates, weight loss).',
        'Percentages trip people up because each question needs a different formula. This calculator picks the right formula for you and shows the result as you type — no algebra required.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Choose the type of calculation: percent of a number, X as a percent of Y, or percentage change.',
        'Enter your numbers in the fields.',
        'The result appears instantly as you type.',
        'Switch calculation types anytime — your inputs stay editable.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How do I calculate a discount?',
          a: 'Use "percent of a number": 25% of $80 is $20, so the discounted price is $60. The calculator gives you the percentage amount directly.',
        },
        {
          q: 'What is percentage change?',
          a: 'The relative difference between an old and a new value: from 50 to 65 is a +30% change. It is the standard way to express growth or decline.',
        },
        {
          q: 'Why is a 50% increase not undone by a 50% decrease?',
          a: 'Because the percentages apply to different bases: 100 +50% = 150, but 150 −50% = 75. The calculator always uses the correct base for each direction.',
        },
        {
          q: 'Does it work with decimals and negative numbers?',
          a: 'Yes. Enter any real numbers; results are computed precisely and rounded for display.',
        },
      ],
    },
    currency: {
      aboutTitle: 'About the Currency Converter',
      about: [
        'The Currency Converter changes amounts between world currencies using up-to-date exchange rates. Whether you are budgeting a trip, comparing prices in a foreign online store, invoicing an international client, or following markets, it gives you the converted amount in one step.',
        'Rates are fetched from a public exchange-rate source and refreshed regularly. For everyday planning they are accurate; for a bank transfer, your bank’s own rate will differ slightly because banks add a margin.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Enter the amount to convert.',
        'Choose the source currency and the target currency.',
        'The converted amount appears instantly.',
        'Swap the direction with one click to convert back.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How current are the exchange rates?',
          a: 'Rates come from a public exchange-rate service and are updated regularly throughout the day — close to mid-market rates.',
        },
        {
          q: 'Why does my bank give a different rate?',
          a: 'Banks and card networks add a margin (typically 1–4%) on top of the mid-market rate. Use this converter for the reference rate, and expect a small difference in real transactions.',
        },
        {
          q: 'Which currencies are supported?',
          a: 'All major world currencies and many regional ones — dollars, euros, pounds, yen, pesos, and dozens more.',
        },
        {
          q: 'Can I convert historical amounts?',
          a: 'The converter uses current rates. For historical rates, consult your bank statement or a rate archive for the transaction date.',
        },
      ],
    },
    units: {
      aboutTitle: 'About the Unit Converter',
      about: [
        'The Unit Converter translates measurements between metric and imperial systems: length (meters, feet, inches, miles), weight (kilograms, pounds, ounces), temperature (Celsius, Fahrenheit, Kelvin), volume (liters, gallons, cups), and speed (km/h, mph, knots).',
        'Unit mismatches cause real mistakes — recipes in cups vs grams, furniture in inches vs centimeters, weather in °F vs °C. The converter applies exact conversion factors so you get the right number every time.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Pick the measurement category: length, weight, temperature, volume, or speed.',
        'Enter the value and select the unit it is in.',
        'Choose the target unit.',
        'Read the converted result — it updates as you type.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How precise are the conversions?',
          a: 'They use exact internationally defined factors (1 inch = 2.54 cm exactly). Displayed results are rounded sensibly; the math underneath is precise.',
        },
        {
          q: 'Why is temperature conversion different?',
          a: 'Temperature scales have different zero points, so the conversion involves an offset, not just a factor: °F = °C × 9/5 + 32.',
        },
        {
          q: 'What is the difference between US and imperial gallons?',
          a: 'A US gallon is about 3.785 liters; the UK imperial gallon is about 4.546 liters. Check which one your source uses.',
        },
        {
          q: 'Does it work offline?',
          a: 'Once loaded, yes — conversion factors are built in and everything computes locally in your browser.',
        },
      ],
    },
  },
  es: {
    percentage: {
      aboutTitle: 'Sobre la calculadora de porcentajes',
      about: [
        'La calculadora de porcentajes resuelve al instante los tres problemas cotidianos de porcentajes: cuánto es el X% de un número (descuentos, propinas, impuestos), qué porcentaje es X de Y (calificaciones, proporciones, cuota de mercado) y el cambio porcentual entre dos valores (subidas de precio, tasas de crecimiento, pérdida de peso).',
        'Los porcentajes confunden porque cada pregunta necesita una fórmula distinta. Esta calculadora elige la fórmula correcta por ti y muestra el resultado mientras escribes, sin álgebra.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Elige el tipo de cálculo: porcentaje de un número, X como porcentaje de Y, o cambio porcentual.',
        'Escribe tus números en los campos.',
        'El resultado aparece al instante mientras escribes.',
        'Cambia de tipo de cálculo cuando quieras; tus datos siguen editables.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cómo calculo un descuento?',
          a: 'Usa "porcentaje de un número": el 25% de $80 es $20, así que el precio con descuento es $60. La calculadora te da el monto del porcentaje directamente.',
        },
        {
          q: '¿Qué es el cambio porcentual?',
          a: 'La diferencia relativa entre un valor antiguo y uno nuevo: de 50 a 65 es un cambio de +30%. Es la forma estándar de expresar crecimiento o caída.',
        },
        {
          q: '¿Por qué un aumento del 50% no se deshace con una caída del 50%?',
          a: 'Porque los porcentajes se aplican sobre bases distintas: 100 +50% = 150, pero 150 −50% = 75. La calculadora siempre usa la base correcta en cada dirección.',
        },
        {
          q: '¿Funciona con decimales y números negativos?',
          a: 'Sí. Ingresa cualquier número real; los resultados se calculan con precisión y se redondean para mostrarse.',
        },
      ],
    },
    currency: {
      aboutTitle: 'Sobre el conversor de divisas',
      about: [
        'El conversor de divisas cambia montos entre monedas del mundo usando tasas de cambio actualizadas. Ya sea que presupuestes un viaje, compares precios en una tienda extranjera, factures a un cliente internacional o sigas los mercados, te da el monto convertido en un paso.',
        'Las tasas se obtienen de una fuente pública de tipos de cambio y se refrescan con regularidad. Para planificación diaria son precisas; para una transferencia bancaria, la tasa de tu banco diferirá un poco porque los bancos añaden un margen.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Escribe el monto a convertir.',
        'Elige la moneda de origen y la de destino.',
        'El monto convertido aparece al instante.',
        'Invierte la dirección con un clic para convertir de vuelta.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué tan actuales son las tasas de cambio?',
          a: 'Las tasas vienen de un servicio público de tipos de cambio y se actualizan regularmente durante el día, cercanas a la tasa de mercado medio.',
        },
        {
          q: '¿Por qué mi banco da una tasa distinta?',
          a: 'Los bancos y las redes de tarjetas añaden un margen (típicamente 1–4%) sobre la tasa de mercado medio. Usa este conversor como referencia y espera una pequeña diferencia en transacciones reales.',
        },
        {
          q: '¿Qué monedas se admiten?',
          a: 'Todas las principales monedas del mundo y muchas regionales: dólares, euros, libras, yenes, pesos y decenas más.',
        },
        {
          q: '¿Puedo convertir montos históricos?',
          a: 'El conversor usa tasas actuales. Para tasas históricas, consulta tu estado de cuenta o un archivo de tasas de la fecha de la transacción.',
        },
      ],
    },
    units: {
      aboutTitle: 'Sobre el conversor de unidades',
      about: [
        'El conversor de unidades traduce medidas entre los sistemas métrico e imperial: longitud (metros, pies, pulgadas, millas), peso (kilogramos, libras, onzas), temperatura (Celsius, Fahrenheit, Kelvin), volumen (litros, galones, tazas) y velocidad (km/h, mph, nudos).',
        'Las confusiones de unidades causan errores reales: recetas en tazas frente a gramos, muebles en pulgadas frente a centímetros, clima en °F frente a °C. El conversor aplica factores de conversión exactos para que obtengas el número correcto siempre.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Elige la categoría de medida: longitud, peso, temperatura, volumen o velocidad.',
        'Escribe el valor y selecciona la unidad en la que está.',
        'Elige la unidad de destino.',
        'Lee el resultado convertido: se actualiza mientras escribes.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué tan precisas son las conversiones?',
          a: 'Usan factores definidos internacionalmente y exactos (1 pulgada = 2.54 cm exactos). Los resultados mostrados se redondean con sensatez; el cálculo interno es preciso.',
        },
        {
          q: '¿Por qué la conversión de temperatura es distinta?',
          a: 'Las escalas de temperatura tienen puntos cero distintos, así que la conversión incluye un desplazamiento, no solo un factor: °F = °C × 9/5 + 32.',
        },
        {
          q: '¿Cuál es la diferencia entre galón estadounidense e imperial?',
          a: 'El galón de EE. UU. equivale a unos 3.785 litros; el galón imperial británico, a unos 4.546 litros. Verifica cuál usa tu fuente.',
        },
        {
          q: '¿Funciona sin conexión?',
          a: 'Una vez cargado, sí: los factores de conversión están integrados y todo se calcula localmente en tu navegador.',
        },
      ],
    },
  },
};

// ---- Per-page blocks ----

interface PageSpec {
  key: string;
  enName: string; esName: string;
  enWhat: string; esWhat: string;
  enEx: string; esEx: string;
  enFaqQ: string; enFaqA: string;
  esFaqQ: string; esFaqA: string;
}

const PAGE_SPECS: PageSpec[] = [
  {
    key: 'percentOfY',
    enName: 'Percent of a Number Calculator', esName: 'calculadora de porcentaje de un número',
    enWhat: 'answers "what is X% of Y" — the formula behind discounts, tips, taxes, and commissions',
    esWhat: 'responde "cuánto es el X% de Y", la fórmula detrás de descuentos, propinas, impuestos y comisiones',
    enEx: 'For example, 15% of $240 is $36 — the tip on a $240 dinner, or the tax on a purchase.',
    esEx: 'Por ejemplo, el 15% de $240 es $36: la propina de una cena de $240 o el impuesto de una compra.',
    enFaqQ: 'How is "X% of Y" calculated?', enFaqA: 'Multiply Y by X and divide by 100: 15% of 240 = 240 × 15 ÷ 100 = 36.',
    esFaqQ: '¿Cómo se calcula "el X% de Y"?', esFaqA: 'Multiplica Y por X y divide entre 100: el 15% de 240 = 240 × 15 ÷ 100 = 36.',
  },
  {
    key: 'whatPercent',
    enName: 'What Percent Calculator', esName: 'calculadora de qué porcentaje es',
    enWhat: 'answers "X is what percent of Y" — used for exam scores, goal progress, market share, and proportions',
    esWhat: 'responde "qué porcentaje es X de Y", útil para calificaciones, avance de metas, cuota de mercado y proporciones',
    enEx: 'For example, 45 correct answers out of 60 questions is 75% — your score on the test.',
    esEx: 'Por ejemplo, 45 respuestas correctas de 60 preguntas es el 75%: tu calificación del examen.',
    enFaqQ: 'How is "X is what % of Y" calculated?', enFaqA: 'Divide X by Y and multiply by 100: 45 of 60 = 45 ÷ 60 × 100 = 75%.',
    esFaqQ: '¿Cómo se calcula "qué % es X de Y"?', esFaqA: 'Divide X entre Y y multiplica por 100: 45 de 60 = 45 ÷ 60 × 100 = 75%.',
  },
  {
    key: 'percentageChange',
    enName: 'Percentage Change Calculator', esName: 'calculadora de cambio porcentual',
    enWhat: 'measures the relative increase or decrease between two values — prices, salaries, traffic, weight',
    esWhat: 'mide el aumento o disminución relativa entre dos valores: precios, salarios, tráfico, peso',
    enEx: 'For example, a price going from $80 to $92 is a +15% change; from $80 to $68 is −15%.',
    esEx: 'Por ejemplo, un precio que pasa de $80 a $92 es un cambio de +15%; de $80 a $68 es −15%.',
    enFaqQ: 'Why is a 50% rise not undone by a 50% fall?', enFaqA: 'The bases differ: 100 +50% = 150, but 150 −50% = 75. Percentage change is always relative to the starting value.',
    esFaqQ: '¿Por qué una subida del 50% no se deshace con una caída del 50%?', esFaqA: 'Las bases difieren: 100 +50% = 150, pero 150 −50% = 75. El cambio porcentual siempre es relativo al valor inicial.',
  },
  {
    key: 'length',
    enName: 'Length Converter', esName: 'conversor de longitud',
    enWhat: 'converts between meters, centimeters, kilometers, inches, feet, yards, and miles',
    esWhat: 'convierte entre metros, centímetros, kilómetros, pulgadas, pies, yardas y millas',
    enEx: 'Useful for furniture sizes in inches vs centimeters, running distances in miles vs kilometers, and screen sizes.',
    esEx: 'Útil para tamaños de muebles en pulgadas frente a centímetros, distancias de carrera en millas frente a kilómetros y tamaños de pantallas.',
    enFaqQ: 'How exact is the inch-to-centimeter conversion?', enFaqA: 'Exact by definition: 1 inch = 2.54 cm, fixed by international agreement since 1959.',
    esFaqQ: '¿Qué tan exacta es la conversión de pulgadas a centímetros?', esFaqA: 'Exacta por definición: 1 pulgada = 2.54 cm, fijada por acuerdo internacional desde 1959.',
  },
  {
    key: 'weight',
    enName: 'Weight Converter', esName: 'conversor de peso',
    enWhat: 'converts between kilograms, grams, pounds, ounces, and stones',
    esWhat: 'convierte entre kilogramos, gramos, libras, onzas y stones',
    enEx: 'Useful for recipes with ounces vs grams, body weight in pounds vs kilograms, and shipping weights.',
    esEx: 'Útil para recetas con onzas frente a gramos, peso corporal en libras frente a kilogramos y pesos de envío.',
    enFaqQ: 'How many pounds is a kilogram?', enFaqA: '1 kg ≈ 2.20462 lb. The converter uses the full-precision factor and rounds only for display.',
    esFaqQ: '¿Cuántas libras es un kilogramo?', esFaqA: '1 kg ≈ 2.20462 lb. El conversor usa el factor con precisión completa y solo redondea al mostrar.',
  },
  {
    key: 'temperature',
    enName: 'Temperature Converter', esName: 'conversor de temperatura',
    enWhat: 'converts between Celsius, Fahrenheit, and Kelvin',
    esWhat: 'convierte entre Celsius, Fahrenheit y Kelvin',
    enEx: 'Useful for weather forecasts abroad, oven temperatures in foreign recipes, and scientific work in Kelvin.',
    esEx: 'Útil para pronósticos del clima en el extranjero, temperaturas de horno en recetas extranjeras y trabajo científico en Kelvin.',
    enFaqQ: 'Why does temperature need an offset, not just a factor?', enFaqA: 'The scales start at different zero points: °F = °C × 9/5 + 32, and K = °C + 273.15.',
    esFaqQ: '¿Por qué la temperatura necesita un desplazamiento y no solo un factor?', esFaqA: 'Las escalas parten de ceros distintos: °F = °C × 9/5 + 32, y K = °C + 273.15.',
  },
  {
    key: 'volume',
    enName: 'Volume Converter', esName: 'conversor de volumen',
    enWhat: 'converts between liters, milliliters, gallons, quarts, pints, and cups',
    esWhat: 'convierte entre litros, mililitros, galones, cuartos, pintas y tazas',
    enEx: 'Useful for recipes in cups vs milliliters, fuel in gallons vs liters, and beverage sizes.',
    esEx: 'Útil para recetas en tazas frente a mililitros, combustible en galones frente a litros y tamaños de bebidas.',
    enFaqQ: 'US gallon or imperial gallon?', enFaqA: 'They differ: 1 US gallon ≈ 3.785 L, 1 imperial (UK) gallon ≈ 4.546 L. Check which your source uses.',
    esFaqQ: '¿Galón estadounidense o imperial?', esFaqA: 'Difieren: 1 galón de EE. UU. ≈ 3.785 L, 1 galón imperial (Reino Unido) ≈ 4.546 L. Verifica cuál usa tu fuente.',
  },
  {
    key: 'speed',
    enName: 'Speed Converter', esName: 'conversor de velocidad',
    enWhat: 'converts between km/h, mph, meters per second, and knots',
    esWhat: 'convierte entre km/h, mph, metros por segundo y nudos',
    enEx: 'Useful for speed limits abroad, running pace, wind speeds, and nautical or aviation speeds in knots.',
    esEx: 'Útil para límites de velocidad en el extranjero, ritmo de carrera, velocidad del viento y velocidades náuticas o de aviación en nudos.',
    enFaqQ: 'What is a knot?', enFaqA: 'One nautical mile per hour ≈ 1.852 km/h ≈ 1.151 mph — the standard unit at sea and in aviation.',
    esFaqQ: '¿Qué es un nudo?', esFaqA: 'Una milla náutica por hora ≈ 1.852 km/h ≈ 1.151 mph: la unidad estándar en el mar y la aviación.',
  },
];

function pageBlockEn(s: PageSpec): ToolContentBlock {
  return {
    aboutTitle: `About the ${s.enName}`,
    about: [
      `The ${s.enName} ${s.enWhat}. ${s.enEx}`,
      'Results update instantly as you type, with precise math underneath and sensible rounding on screen. Everything runs locally in your browser.',
    ],
    howTitle: 'How to use it',
    steps: [
      'Enter your value in the input field.',
      'Select the units or values involved.',
      'Read the result — it updates as you type.',
      'Adjust any input to recalculate instantly.',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: s.enFaqQ, a: s.enFaqA },
      { q: 'Does it work with decimals?', a: 'Yes — enter any real number; the calculation is precise and only the display is rounded.' },
      { q: 'Is anything sent to a server?', a: 'No. All calculations run locally in your browser.' },
      { q: 'Is it free to use?', a: 'Yes, completely free, with no limits and no account required.' },
    ],
  };
}

function pageBlockEs(s: PageSpec): ToolContentBlock {
  return {
    aboutTitle: `Sobre ${s.esName.startsWith('conversor') ? 'el' : 'la'} ${s.esName}`,
    about: [
      `Esta herramienta ${s.esWhat}. ${s.esEx}`,
      'Los resultados se actualizan al instante mientras escribes, con cálculo preciso por dentro y redondeo sensato en pantalla. Todo se ejecuta localmente en tu navegador.',
    ],
    howTitle: 'Cómo se usa',
    steps: [
      'Escribe tu valor en el campo de entrada.',
      'Selecciona las unidades o valores involucrados.',
      'Lee el resultado: se actualiza mientras escribes.',
      'Ajusta cualquier dato para recalcular al instante.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: s.esFaqQ, a: s.esFaqA },
      { q: '¿Funciona con decimales?', a: 'Sí: ingresa cualquier número real; el cálculo es preciso y solo se redondea al mostrar.' },
      { q: '¿Algo se envía a un servidor?', a: 'No. Todos los cálculos se ejecutan localmente en tu navegador.' },
      { q: '¿Es gratis?', a: 'Sí, completamente gratis, sin límites y sin necesidad de cuenta.' },
    ],
  };
}

export const SUB_CONTENT: Record<Language, Record<string, ToolContentBlock>> = {
  en: Object.fromEntries(PAGE_SPECS.map((s) => [s.key, pageBlockEn(s)])),
  es: Object.fromEntries(PAGE_SPECS.map((s) => [s.key, pageBlockEs(s)])),
};
