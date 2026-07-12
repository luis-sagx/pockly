import type { Language, ToolContentBlock } from '@pockly/shared';

type ToolKey = 'board' | 'habits' | 'scratchpad';

export const TOOL_CONTENT: Record<Language, Record<ToolKey, ToolContentBlock>> = {
  en: {
    board: {
      aboutTitle: 'About the Task Board',
      about: [
        'The Task Board is a minimal personal kanban organized around time, not projects: Today, This Week, and Someday. That structure forces the one decision that matters — when will I actually do this? — and keeps your list short enough to finish.',
        'Unlike heavyweight project tools, there is nothing to configure: open the board, write the task, drop it in a column. Tasks are saved automatically in your browser, or synced across devices if you sign in with an optional account.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Add a task and place it in Today, This Week, or Someday.',
        'Work from the Today column — it is your commitment for the day.',
        'Move tasks between columns as priorities shift.',
        'Mark tasks done and watch the day clear out.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Why only three columns?',
          a: 'Because the useful decision is when, not which project. Today keeps you focused, This Week is your queue, Someday captures ideas without cluttering the present.',
        },
        {
          q: 'Where are my tasks stored?',
          a: 'In your browser by default — they never leave your device. Sign in with an optional account to sync them across devices.',
        },
        {
          q: 'What should go in Someday?',
          a: 'Anything you want to remember but not schedule: ideas, maybes, low-priority chores. Review it weekly and promote what became relevant.',
        },
        {
          q: 'Can I use it for team work?',
          a: 'The board is designed for personal task management. For team workflows you would want shared assignments, which is a different kind of tool.',
        },
      ],
    },
    habits: {
      aboutTitle: 'About the Habit Tracker',
      about: [
        'The Habit Tracker helps you build daily habits by making consistency visible: mark each habit done every day and watch your streak grow. Streaks work because they turn an abstract goal ("exercise more") into a concrete daily question ("keep the chain alive?").',
        'Add the habits you care about — reading, exercise, meditation, drinking water — and check them off each day. Streaks are computed on your local day, so late-night check-ins count for the right date. Data stays in your browser or syncs with an optional account.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Add a habit you want to build.',
        'Check it off each day you complete it.',
        'Watch your streak grow — missing a day resets it.',
        'Review your consistency over time and adjust your habit list.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How many habits should I track?',
          a: 'Start with one to three. Research on habit formation consistently shows small, focused starts outlast ambitious lists.',
        },
        {
          q: 'What happens if I miss a day?',
          a: 'The streak resets. That sting is the point — but a reset streak is data, not failure. The long-term completion rate matters more.',
        },
        {
          q: 'When does a "day" end?',
          a: 'At midnight in your local timezone. A check-in at 11:50 pm counts for that day, not the next one.',
        },
        {
          q: 'Is my data private?',
          a: 'Yes. Habits live in your browser storage, or in a secure database only if you choose to create an account for syncing.',
        },
      ],
    },
    scratchpad: {
      aboutTitle: 'About the Scratchpad',
      about: [
        'The Scratchpad is a single, fast, always-saved writing surface with Markdown support. It is the digital equivalent of the paper next to your keyboard: meeting notes, quick drafts, snippets to paste later, thoughts you need out of your head right now.',
        'There are no files to name and no save button to press — the pad autosaves as you type and is exactly as you left it when you return. Content stays in your browser, or syncs across devices with an optional account.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Open the scratchpad and start typing — saving is automatic.',
        'Use Markdown for structure: headings, lists, bold, links.',
        'Come back anytime; your text is exactly where you left it.',
        'Optionally sign in to have the same pad on every device.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Do I need to save manually?',
          a: 'No. Every keystroke is persisted automatically. Close the tab mid-sentence and the sentence is still there tomorrow.',
        },
        {
          q: 'What Markdown is supported?',
          a: 'The common core: headings, bold and italics, lists, links, and code. Enough structure for notes without becoming a word processor.',
        },
        {
          q: 'Is the scratchpad private?',
          a: 'Yes. Without an account the text lives only in your browser. With an account, it is stored in a secure database to enable sync — never shared or analyzed.',
        },
        {
          q: 'What happens if I clear my browser data?',
          a: 'Locally stored text is deleted with the rest of the site data. If you sync with an account, your pad is restored when you sign back in.',
        },
      ],
    },
  },
  es: {
    board: {
      aboutTitle: 'Sobre el tablero de tareas',
      about: [
        'El tablero de tareas es un kanban personal minimalista organizado por tiempo, no por proyectos: Hoy, Esta semana y Algún día. Esa estructura obliga a tomar la única decisión que importa —¿cuándo voy a hacer esto realmente?— y mantiene tu lista lo bastante corta para terminarla.',
        'A diferencia de las herramientas de proyectos pesadas, no hay nada que configurar: abre el tablero, escribe la tarea y suéltala en una columna. Las tareas se guardan automáticamente en tu navegador, o se sincronizan entre dispositivos si inicias sesión con una cuenta opcional.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Agrega una tarea y colócala en Hoy, Esta semana o Algún día.',
        'Trabaja desde la columna Hoy: es tu compromiso del día.',
        'Mueve tareas entre columnas cuando cambien las prioridades.',
        'Marca tareas como hechas y mira cómo se despeja el día.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Por qué solo tres columnas?',
          a: 'Porque la decisión útil es cuándo, no en qué proyecto. Hoy te mantiene enfocado, Esta semana es tu cola, Algún día captura ideas sin ensuciar el presente.',
        },
        {
          q: '¿Dónde se guardan mis tareas?',
          a: 'En tu navegador por defecto: nunca salen de tu dispositivo. Inicia sesión con una cuenta opcional para sincronizarlas entre dispositivos.',
        },
        {
          q: '¿Qué va en Algún día?',
          a: 'Todo lo que quieras recordar sin agendar: ideas, quizás, pendientes de baja prioridad. Revísalo cada semana y promueve lo que se volvió relevante.',
        },
        {
          q: '¿Sirve para trabajo en equipo?',
          a: 'El tablero está diseñado para gestión personal de tareas. Para flujos de equipo necesitarías asignaciones compartidas, que es otro tipo de herramienta.',
        },
      ],
    },
    habits: {
      aboutTitle: 'Sobre el registro de hábitos',
      about: [
        'El registro de hábitos te ayuda a construir hábitos diarios haciendo visible la constancia: marca cada hábito cumplido cada día y mira crecer tu racha. Las rachas funcionan porque convierten una meta abstracta ("hacer más ejercicio") en una pregunta diaria concreta ("¿mantengo viva la cadena?").',
        'Agrega los hábitos que te importan —leer, ejercicio, meditación, tomar agua— y márcalos cada día. Las rachas se calculan según tu día local, así que los registros nocturnos cuentan para la fecha correcta. Los datos se quedan en tu navegador o se sincronizan con una cuenta opcional.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Agrega un hábito que quieras construir.',
        'Márcalo cada día que lo cumplas.',
        'Mira crecer tu racha: fallar un día la reinicia.',
        'Revisa tu constancia en el tiempo y ajusta tu lista de hábitos.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cuántos hábitos debería registrar?',
          a: 'Empieza con uno a tres. La investigación sobre formación de hábitos muestra que los comienzos pequeños y enfocados duran más que las listas ambiciosas.',
        },
        {
          q: '¿Qué pasa si fallo un día?',
          a: 'La racha se reinicia. Ese aguijón es el propósito, pero una racha reiniciada es información, no fracaso. Importa más la tasa de cumplimiento a largo plazo.',
        },
        {
          q: '¿Cuándo termina un "día"?',
          a: 'A medianoche en tu zona horaria local. Un registro a las 11:50 pm cuenta para ese día, no para el siguiente.',
        },
        {
          q: '¿Mis datos son privados?',
          a: 'Sí. Los hábitos viven en el almacenamiento de tu navegador, o en una base de datos segura solo si decides crear una cuenta para sincronizar.',
        },
      ],
    },
    scratchpad: {
      aboutTitle: 'Sobre el bloc de notas',
      about: [
        'El bloc de notas es una superficie de escritura única, rápida y siempre guardada, con soporte de Markdown. Es el equivalente digital del papel junto a tu teclado: notas de reuniones, borradores rápidos, fragmentos para pegar después, pensamientos que necesitas sacar de tu cabeza ahora.',
        'No hay archivos que nombrar ni botón de guardar: el bloc autoguarda mientras escribes y está exactamente como lo dejaste cuando vuelves. El contenido se queda en tu navegador o se sincroniza entre dispositivos con una cuenta opcional.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Abre el bloc y empieza a escribir: el guardado es automático.',
        'Usa Markdown para estructurar: títulos, listas, negritas, enlaces.',
        'Vuelve cuando quieras; tu texto está exactamente donde lo dejaste.',
        'Opcionalmente inicia sesión para tener el mismo bloc en todos tus dispositivos.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Tengo que guardar manualmente?',
          a: 'No. Cada pulsación se guarda automáticamente. Cierra la pestaña a media oración y la oración seguirá ahí mañana.',
        },
        {
          q: '¿Qué Markdown se admite?',
          a: 'El núcleo común: títulos, negritas y cursivas, listas, enlaces y código. Suficiente estructura para notas sin convertirse en un procesador de textos.',
        },
        {
          q: '¿El bloc es privado?',
          a: 'Sí. Sin cuenta, el texto vive solo en tu navegador. Con cuenta, se guarda en una base de datos segura para sincronizar: nunca se comparte ni se analiza.',
        },
        {
          q: '¿Qué pasa si borro los datos del navegador?',
          a: 'El texto guardado localmente se elimina con el resto de datos del sitio. Si sincronizas con una cuenta, tu bloc se restaura al iniciar sesión de nuevo.',
        },
      ],
    },
  },
};
