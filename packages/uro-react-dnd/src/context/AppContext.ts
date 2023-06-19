import { createContext } from 'react';

import { DndAppContext } from '../core/DndAppContext.js';

export const AppContext = createContext<DndAppContext | null>(null);
