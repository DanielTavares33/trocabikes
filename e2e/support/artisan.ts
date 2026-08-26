import { prepareE2eDatabase } from './database';

/** Manual reset only (e.g. local debugging). The suite seeds once in globalSetup. */
export function resetE2eDatabase(): void {
    prepareE2eDatabase();
}
