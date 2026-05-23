import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { JsonGenerator } from './components/pages/json-generator/json-generator';
import { JsonTemplates } from './components/pages/json-templates/json-templates';

// Convert pages
import { ConvertIndex } from './components/pages/convert/convert-index/convert-index';
import { ConvertCsv2Json } from './components/pages/convert/convert-csv2json/convert-csv2json';
import { ConvertTsv2Json } from './components/pages/convert/convert-tsv2json/convert-tsv2json';
import { ConvertJson2Csv } from './components/pages/convert/convert-json2csv/convert-json2csv';
import { ConvertJson2Tsv } from './components/pages/convert/convert-json2tsv/convert-json2tsv';
import { ConvertJson2Xml } from './components/pages/convert/convert-json2xml/convert-json2xml';
import { ConvertJson2Yaml } from './components/pages/convert/convert-json2yaml/convert-json2yaml';

// Utils pages
import { UtilsIndex } from './components/pages/utils/utils-index/utils-index';
import { UtilsFormat } from './components/pages/utils/utils-format/utils-format';
import { UtilsMinify } from './components/pages/utils/utils-minify/utils-minify';
import { UtilsSort } from './components/pages/utils/utils-sort/utils-sort';
import { UtilsValidate } from './components/pages/utils/utils-validate/utils-validate';
import { UtilsFlatten } from './components/pages/utils/utils-flatten/utils-flatten';
import { UtilsUnflatten } from './components/pages/utils/utils-unflatten/utils-unflatten';
import { UtilsDiff } from './components/pages/utils/utils-diff/utils-diff';
import { UtilsQuery } from './components/pages/utils/utils-query/utils-query';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'generator', component: JsonGenerator },
  { path: 'templates', component: JsonTemplates },

  // Convert
  { path: 'convert', component: ConvertIndex },
  { path: 'convert/csv-to-json', component: ConvertCsv2Json },
  { path: 'convert/tsv-to-json', component: ConvertTsv2Json },
  { path: 'convert/json-to-csv', component: ConvertJson2Csv },
  { path: 'convert/json-to-tsv', component: ConvertJson2Tsv },
  { path: 'convert/json-to-xml', component: ConvertJson2Xml },
  { path: 'convert/json-to-yaml', component: ConvertJson2Yaml },

  // Utils
  { path: 'utils', component: UtilsIndex },
  { path: 'utils/format', component: UtilsFormat },
  { path: 'utils/minify', component: UtilsMinify },
  { path: 'utils/sort', component: UtilsSort },
  { path: 'utils/validate', component: UtilsValidate },
  { path: 'utils/flatten', component: UtilsFlatten },
  { path: 'utils/unflatten', component: UtilsUnflatten },
  { path: 'utils/diff', component: UtilsDiff },
  { path: 'utils/query', component: UtilsQuery },

  { path: '**', redirectTo: '/' },
];