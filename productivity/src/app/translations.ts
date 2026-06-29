export interface Translations {
  navHome: string; navBoard: string; navHabits: string; navScratchpad: string; signIn: string;
  languageLabel: string; freeOnlineTools: string; moreTools: string;
  heroTitle: string; heroSubtitle: string; allTools: string; dailyPlanning: string; routines: string; capture: string;
  board: string; boardDesc: string; habits: string; habitsDesc: string; scratchpad: string; scratchpadDesc: string;
  today: string; thisWeek: string; someday: string; createTask: string; addTask: string; deleteTask: string; importJson: string; exportJson: string; noNotesInColumn: string; cancel: string;
  noteTitle: string; noteTitlePlaceholder: string; noteDescription: string; noteDescriptionPlaceholder: string; editNote: string;
  priority: string; priorityHigh: string; priorityMedium: string; priorityLow: string; priorityNone: string; horizon: string;
  checklist: string; addChecklistItem: string; noChecklistItems: string; removeItem: string; deleteNoteConfirm: string;
  addHabit: string; habitName: string; currentStreak: string; completedLast7Days: string; weeklyCompletionRate: string; totalCheckIns: string; days: string; noHabits: string; archive: string; habitHistory: string;
  scratchpadPlaceholder: string; saved: string; lastUpdated: string;
  signInTitle: string; signInBody: string; signInToSync: string; createAccount: string; username: string; email: string; password: string; passwordMin: string; yourPassword: string; googleContinue: string; or: string; invalidCredentials: string; fillAllFields: string; usernameLength: string; usernameChars: string; passwordLength: string; accountExists: string; checkEmail: string; backHome: string; googleNotConfigured: string;
  notFoundTitle: string; notFoundBody: string;
}

export const productivityTranslations: Record<string, Record<string, string>> = {
  en: {
    navHome: 'Home', navBoard: 'Board', navHabits: 'Habits', navScratchpad: 'Scratchpad', signIn: 'Sign in',
    languageLabel: 'Language', freeOnlineTools: 'Local-first tools to organize your day.', moreTools: 'More Pockly tools:',
    heroTitle: 'Your day, organized without the corporate project-board bloat',
    heroSubtitle: 'Plan one-off tasks, repeat daily habits, and capture loose thoughts. Everything works offline first in your browser.',
    allTools: 'All tools', dailyPlanning: 'Daily planning', routines: 'Routines', capture: 'Capture',
    board: 'Board', boardDesc: 'A personal board shaped like Quick Notes, but organized by Today, This week, and Someday.',
    habits: 'Habits', habitsDesc: 'Track daily routines and see real completion stats.',
    scratchpad: 'Scratchpad', scratchpadDesc: 'A single fast autosaving markdown pad.',
    today: 'Today', thisWeek: 'This week', someday: 'Someday', createTask: 'Create task', addTask: 'Add task', deleteTask: 'Delete task', importJson: 'Import JSON', exportJson: 'Export JSON', noNotesInColumn: 'No tasks in this column yet.', cancel: 'Cancel',
    noteTitle: 'Task title', noteTitlePlaceholder: 'What needs to happen?', noteDescription: 'Description', noteDescriptionPlaceholder: 'Add context, links, or details...', editNote: 'Edit task',
    priority: 'Priority', priorityHigh: 'High', priorityMedium: 'Medium', priorityLow: 'Low', priorityNone: 'None', horizon: 'Horizon',
    checklist: 'Checklist', addChecklistItem: 'Add checklist item', noChecklistItems: 'No checklist items yet', removeItem: 'Remove item', deleteNoteConfirm: 'Delete task?',
    addHabit: 'Add habit', habitName: 'Habit name', currentStreak: 'Streak', completedLast7Days: 'Last 7 days', weeklyCompletionRate: 'This week', totalCheckIns: 'Total', days: 'days', noHabits: 'No habits yet. Start with one routine you can actually keep.', archive: 'Archive', habitHistory: 'History (16 weeks)',
    scratchpadPlaceholder: 'Dump thoughts, fragments, checklists, or markdown here...', saved: 'Save', lastUpdated: 'Last updated',
    signInTitle: 'Board sync', signInBody: 'Sign in to sync your productivity board across devices.', signInToSync: 'Sign in to sync your board and keep your tasks with you.', createAccount: 'Create account', username: 'Username', email: 'Email', password: 'Password', passwordMin: 'Password (min. 8 chars)', yourPassword: 'Your password', googleContinue: 'Continue with Google', or: 'or', invalidCredentials: 'Invalid credentials', fillAllFields: 'Fill all fields', usernameLength: 'Username must be between 2 and 30 characters', usernameChars: 'Username can only use letters, numbers, underscores, and hyphens', passwordLength: 'Password must be at least 8 characters', accountExists: 'That account already exists', checkEmail: 'Check your email to confirm your account', backHome: 'Back home', googleNotConfigured: 'Google sign-in is not configured yet',
    notFoundTitle: 'Page not found', notFoundBody: 'That route does not exist in Flow.',
  },
  es: {
    navHome: 'Inicio', navBoard: 'Tablero', navHabits: 'Hábitos', navScratchpad: 'Bloc rápido', signIn: 'Iniciar sesión',
    languageLabel: 'Idioma', freeOnlineTools: 'Herramientas local-first para organizar tu día.', moreTools: 'Más herramientas Pockly:',
    heroTitle: 'Tu día organizado sin inflar esto como un tablero corporativo',
    heroSubtitle: 'Planificá tareas puntuales, repetí hábitos diarios y capturá ideas sueltas. Todo funciona offline primero en tu navegador.',
    allTools: 'Todas', dailyPlanning: 'Plan diario', routines: 'Rutinas', capture: 'Captura',
    board: 'Tablero', boardDesc: 'Un tablero personal con la sensación de Quick Notes, pero organizado por Hoy, Esta semana y Algún día.',
    habits: 'Hábitos', habitsDesc: 'Seguí rutinas diarias y mirá estadísticas reales de cumplimiento.',
    scratchpad: 'Bloc rápido', scratchpadDesc: 'Un único pad markdown con autosave rápido.',
    today: 'Hoy', thisWeek: 'Esta semana', someday: 'Algún día', createTask: 'Crear tarea', addTask: 'Agregar tarea', deleteTask: 'Eliminar tarea', importJson: 'Importar JSON', exportJson: 'Exportar JSON', noNotesInColumn: 'Todavía no hay tareas en esta columna.', cancel: 'Cancelar',
    noteTitle: 'Título de la tarea', noteTitlePlaceholder: '¿Qué hay que hacer?', noteDescription: 'Descripción', noteDescriptionPlaceholder: 'Agregá contexto, links o detalles...', editNote: 'Editar tarea',
    priority: 'Prioridad', priorityHigh: 'Alta', priorityMedium: 'Media', priorityLow: 'Baja', priorityNone: 'Sin prioridad', horizon: 'Horizonte',
    checklist: 'Checklist', addChecklistItem: 'Agregar item', noChecklistItems: 'Todavía no hay items', removeItem: 'Eliminar item', deleteNoteConfirm: '¿Eliminar tarea?',
    addHabit: 'Agregar hábito', habitName: 'Nombre del hábito', currentStreak: 'Racha', completedLast7Days: 'Últimos 7 días', weeklyCompletionRate: 'Esta semana', totalCheckIns: 'Total', days: 'días', noHabits: 'Todavía no hay hábitos. Empezá con una rutina que puedas sostener.', archive: 'Archivar', habitHistory: 'Historial (16 semanas)',
    scratchpadPlaceholder: 'Volcá ideas, fragmentos, checklists o markdown acá...', saved: 'Guardar', lastUpdated: 'Última actualización',
    signInTitle: 'Sincronización del tablero', signInBody: 'Iniciá sesión para sincronizar tu tablero de productividad entre dispositivos.', signInToSync: 'Iniciá sesión para sincronizar tu tablero y llevar tus tareas con vos.', createAccount: 'Crear cuenta', username: 'Usuario', email: 'Email', password: 'Contraseña', passwordMin: 'Contraseña (mín. 8 caracteres)', yourPassword: 'Tu contraseña', googleContinue: 'Continuar con Google', or: 'o', invalidCredentials: 'Credenciales inválidas', fillAllFields: 'Completá todos los campos', usernameLength: 'El usuario debe tener entre 2 y 30 caracteres', usernameChars: 'El usuario solo puede usar letras, números, guiones y guiones bajos', passwordLength: 'La contraseña debe tener al menos 8 caracteres', accountExists: 'Esa cuenta ya existe', checkEmail: 'Revisá tu email para confirmar la cuenta', backHome: 'Volver al inicio', googleNotConfigured: 'Google Sign-In todavía no está configurado',
    notFoundTitle: 'Página no encontrada', notFoundBody: 'Esa ruta no existe en Flow.',
  },
};
