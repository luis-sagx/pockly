import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { JsonGenerator } from './components/pages/json-generator/json-generator';
import { JsonTemplates } from './components/pages/json-templates/json-templates';
import { JsonConvert } from './components/pages/json-convert/json-convert';
import { JsonUtils } from './components/pages/json-utils/json-utils';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'generator', component: JsonGenerator },
  { path: 'templates', component: JsonTemplates },
  { path: 'convert', component: JsonConvert },
  { path: 'utils', component: JsonUtils },
  { path: '**', redirectTo: '/' },
];