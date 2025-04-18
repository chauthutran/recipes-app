import { ref, provide, onMounted, type InjectionKey, type Ref } from 'vue';
import type { IAppPage, ICategory } from '../types/types';
import axios from 'axios';
import { PAGE_HOME } from '../constants/constants';

export type AppContext = {
    appPage: Ref<IAppPage>;
    categories: Ref<ICategory[] | null>;
    loading: Ref<boolean>;
    errMsg: Ref<string>;
};
// Use Symbol for safer injection keys
export const AppKey: InjectionKey<AppContext> = Symbol('app');

// Create a setup function to call inside your component
export function useAppProvider() {
    const appPage = ref<IAppPage>({ name: PAGE_HOME, data: null });

    const categories = ref<ICategory[] | null>(null);
    const loading = ref(true);
    const errMsg = ref('');

    onMounted(async () => {
        try {
            const res = await axios.get('http://localhost:3000/categories');
            categories.value = res.data;
        } catch (err: any) {
            errMsg.value = `Failed to load categories: ${err.message}`;
        }

        loading.value = false;
    });

    provide(AppKey, { appPage, loading, categories, errMsg });
}
