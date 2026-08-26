import { prepareE2eDatabase } from './database';

export default async function globalSetup(): Promise<void> {
    prepareE2eDatabase();
}
