export interface Translations {
  navHome: string; navBoard: string; navHabits: string; navScratchpad: string; signIn: string;
  languageLabel: string; freeOnlineTools: string; moreTools: string;
  heroTitle: string; heroSubtitle: string; allTools: string; dailyPlanning: string; routines: string; capture: string;
  board: string; boardDesc: string; habits: string; habitsDesc: string; scratchpad: string; scratchpadDesc: string;
  today: string; thisWeek: string; someday: string; createTask: string; taskTitle: string; taskDescription: string; taskCategory: string; horizon: string; priority: string; addTask: string; cancel: string; noTasks: string; importJson: string; exportJson: string; deleteTask: string;
  priorityHigh: string; priorityMedium: string; priorityLow: string; priorityNone: string;
  addHabit: string; habitName: string; currentStreak: string; days: string; noHabits: string; archive: string;
  scratchpadPlaceholder: string; saved: string; lastUpdated: string;
  signInTitle: string; signInBody: string; notFoundTitle: string; notFoundBody: string; backHome: string;
}

export const productivityTranslations: Record<string, Record<string, string>> = {
  en: {
    navHome: 'Home', navBoard: 'Board', navHabits: 'Habits', navScratchpad: 'Scratchpad', signIn: 'Sign in',
    languageLabel: 'Language', freeOnlineTools: 'Local-first tools to organize your day.', moreTools: 'More Pockly tools:',
    heroTitle: 'Your day, organized without the corporate project-board bloat',
    heroSubtitle: 'Plan one-off tasks, repeat daily habits, and capture loose thoughts. Everything works offline first in your browser.',
    allTools: 'All tools', dailyPlanning: 'Daily planning', routines: 'Routines', capture: 'Capture',
    board: 'Board', boardDesc: 'Time-horizon task board for Today, This week, and Someday.',
    habits: 'Habits', habitsDesc: 'Track recurring routines with local-day streaks.',
    scratchpad: 'Scratchpad', scratchpadDesc: 'A single fast autosaving markdown pad.',
    today: 'Today', thisWeek: 'This week', someday: 'Someday', createTask: 'Create task', taskTitle: 'Task title', taskDescription: 'Description', taskCategory: 'Category', horizon: 'Horizon', priority: 'Priority tag', addTask: 'Add task', cancel: 'Cancel', noTasks: 'No tasks here yet.', importJson: 'Import JSON', exportJson: 'Export JSON', deleteTask: 'Delete task',
    priorityHigh: 'High', priorityMedium: 'Medium', priorityLow: 'Low', priorityNone: 'None',
    addHabit: 'Add habit', habitName: 'Habit name', currentStreak: 'Current streak', days: 'days', noHabits: 'No habits yet. Start with one routine you can actually keep.', archive: 'Archive',
    scratchpadPlaceholder: 'Dump thoughts, fragments, checklists, or markdown here...', saved: 'Saved', lastUpdated: 'Last updated',
    signInTitle: 'Sync is coming next', signInBody: 'This app is local-first today. The data model is ready for the Supabase tables in productivity/supabase.sql.', notFoundTitle: 'Page not found', notFoundBody: 'That route does not exist in Productivity Tools.', backHome: 'Back home',
  },
  es: {
    navHome: 'Inicio', navBoard: 'Tablero', navHabits: 'Hábitos', navScratchpad: 'Bloc rápido', signIn: 'Iniciar sesión',
    languageLabel: 'Idioma', freeOnlineTools: 'Herramientas local-first para organizar tu día.', moreTools: 'Más herramientas Pockly:',
    heroTitle: 'Tu día organizado sin inflar esto como un tablero corporativo',
    heroSubtitle: 'Planificá tareas puntuales, repetí hábitos diarios y capturá ideas sueltas. Todo funciona offline primero en tu navegador.',
    allTools: 'Todas', dailyPlanning: 'Plan diario', routines: 'Rutinas', capture: 'Captura',
    board: 'Tablero', boardDesc: 'Tareas por horizonte: Hoy, Esta semana y Algún día.',
    habits: 'Hábitos', habitsDesc: 'Rutinas recurrentes con rachas por día local.',
    scratchpad: 'Bloc rápido', scratchpadDesc: 'Un único pad markdown con autosave rápido.',
    today: 'Hoy', thisWeek: 'Esta semana', someday: 'Algún día', createTask: 'Crear tarea', taskTitle: 'Título de la tarea', taskDescription: 'Descripción', taskCategory: 'Categoría', horizon: 'Horizonte', priority: 'Etiqueta de prioridad', addTask: 'Agregar tarea', cancel: 'Cancelar', noTasks: 'Todavía no hay tareas acá.', importJson: 'Importar JSON', exportJson: 'Exportar JSON', deleteTask: 'Eliminar tarea',
    priorityHigh: 'Alta', priorityMedium: 'Media', priorityLow: 'Baja', priorityNone: 'Sin prioridad',
    addHabit: 'Agregar hábito', habitName: 'Nombre del hábito', currentStreak: 'Racha actual', days: 'días', noHabits: 'Todavía no hay hábitos. Empezá con una rutina que puedas sostener.', archive: 'Archivar',
    scratchpadPlaceholder: 'Volcá ideas, fragmentos, checklists o markdown acá...', saved: 'Guardado', lastUpdated: 'Última actualización',
    signInTitle: 'La sincronización viene después', signInBody: 'Esta app hoy es local-first. El modelo está listo para las tablas Supabase en productivity/supabase.sql.', notFoundTitle: 'Página no encontrada', notFoundBody: 'Esa ruta no existe en Productivity Tools.', backHome: 'Volver al inicio',
  },
};
