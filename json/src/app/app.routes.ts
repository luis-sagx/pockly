import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

const localizedRoutes: Routes = [
  { path: '', component: Home },
  { path: 'generator', loadComponent: () => import('./components/pages/json-generator/json-generator').then(m => m.JsonGenerator) },
  { path: 'templates', loadComponent: () => import('./components/pages/json-templates/json-templates').then(m => m.JsonTemplates) },

  // Convert
  { path: 'convert', loadComponent: () => import('./components/pages/convert/convert-index/convert-index').then(m => m.ConvertIndex) },
  { path: 'convert/csv-to-json', loadComponent: () => import('./components/pages/convert/convert-csv2json/convert-csv2json').then(m => m.ConvertCsv2Json) },
  { path: 'convert/tsv-to-json', loadComponent: () => import('./components/pages/convert/convert-tsv2json/convert-tsv2json').then(m => m.ConvertTsv2Json) },
  { path: 'convert/json-to-csv', loadComponent: () => import('./components/pages/convert/convert-json2csv/convert-json2csv').then(m => m.ConvertJson2Csv) },
  { path: 'convert/json-to-tsv', loadComponent: () => import('./components/pages/convert/convert-json2tsv/convert-json2tsv').then(m => m.ConvertJson2Tsv) },
  { path: 'convert/json-to-xml', loadComponent: () => import('./components/pages/convert/convert-json2xml/convert-json2xml').then(m => m.ConvertJson2Xml) },
  { path: 'convert/json-to-yaml', loadComponent: () => import('./components/pages/convert/convert-json2yaml/convert-json2yaml').then(m => m.ConvertJson2Yaml) },

  // Utils
  { path: 'utils', loadComponent: () => import('./components/pages/utils/utils-index/utils-index').then(m => m.UtilsIndex) },
  { path: 'utils/format', loadComponent: () => import('./components/pages/utils/utils-format/utils-format').then(m => m.UtilsFormat) },
  { path: 'utils/minify', loadComponent: () => import('./components/pages/utils/utils-minify/utils-minify').then(m => m.UtilsMinify) },
  { path: 'utils/sort', loadComponent: () => import('./components/pages/utils/utils-sort/utils-sort').then(m => m.UtilsSort) },
  { path: 'utils/validate', loadComponent: () => import('./components/pages/utils/utils-validate/utils-validate').then(m => m.UtilsValidate) },
  { path: 'utils/flatten', loadComponent: () => import('./components/pages/utils/utils-flatten/utils-flatten').then(m => m.UtilsFlatten) },
  { path: 'utils/unflatten', loadComponent: () => import('./components/pages/utils/utils-unflatten/utils-unflatten').then(m => m.UtilsUnflatten) },
  { path: 'utils/diff', loadComponent: () => import('./components/pages/utils/utils-diff/utils-diff').then(m => m.UtilsDiff) },
  { path: 'utils/query', loadComponent: () => import('./components/pages/utils/utils-query/utils-query').then(m => m.UtilsQuery) },

  {
    path: '404',
    loadComponent: () =>
      import('./components/pages/not-found/not-found').then((m) => m.NotFound),
  },
];

// Spanish mirror of every route under /es so both languages get prerendered,
// indexable URLs. LanguageService derives the active language from the prefix.
export const routes: Routes = [
  ...localizedRoutes,
  { path: 'es', children: [...localizedRoutes, { path: '**', redirectTo: '/es/404' }] },
  { path: '**', redirectTo: '/404' },
];
