import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run Gerenciador-Tarefas:serve:development',
        production: 'nx run Gerenciador-Tarefas:serve:production',
      },
      ciWebServerCommand: 'nx run Gerenciador-Tarefas:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
