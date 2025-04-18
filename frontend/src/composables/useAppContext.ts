import { inject } from 'vue';
import { AppKey, type AppContext } from '../providers/useAppProvider';

export function useAppContext(): AppContext {
    const appContext = inject(AppKey);

    if (!appContext) {
        throw new Error('AppKey is not provided');
    }

    return appContext;
}
