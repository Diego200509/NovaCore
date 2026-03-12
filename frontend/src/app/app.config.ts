import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideQuillConfig, defaultModules } from 'ngx-quill/config';

import { routes } from './app.routes';

/** Barra de herramientas completa: texto, listas, tablas, enlaces, imagen, video, etc. */
const fullToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }, { header: 3 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video'],
  ['table'],
];

/**
 * Al hacer clic en "Tabla": guardamos la selección actual (cursor), abrimos el modal
 * y al insertar restauramos foco y selección para que la tabla se inserte donde estaba el cursor.
 */
function tableHandler(this: { quill: { getModule: (name: string) => unknown; getSelection: () => { index: number; length?: number } | null; setSelection: (index: number, length?: number) => void; focus: () => void } }, _value: unknown) {
  const quill = this.quill;
  const tableModule = quill.getModule('table') as { insertTable?: (rows: number, cols: number) => void } | undefined;
  if (!tableModule?.insertTable) return;
  const savedRange = quill.getSelection();
  const insert = (rows: number, cols: number) => {
    quill.focus();
    if (savedRange != null) {
      quill.setSelection(savedRange.index, savedRange.length ?? 0);
    }
    tableModule.insertTable!.call(tableModule, rows, cols);
  };
  window.dispatchEvent(new CustomEvent('nova-core-request-table', { detail: { insert } }));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideHttpClient(),
    provideZonelessChangeDetection(),
    provideQuillConfig({
      format: 'html',
      theme: 'snow',
      modules: {
        ...defaultModules,
        toolbar: {
          container: fullToolbar,
          handlers: { table: tableHandler },
        },
        table: true,
      },
    })
  ]
};
