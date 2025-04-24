import { provide, ref, type InjectionKey, type Ref } from 'vue';
import type { IUser } from '../types/types';
import * as UserRequest from '../utils/request/userRequest';

export type AuthContext = {
    user: Ref<IUser | null>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (user: IUser) => Promise<void>;

    loading: Ref<boolean>;
    errMsg: Ref<string>;
};

export const AuthKey: InjectionKey<AuthContext> = Symbol('auth');

export function useAuthProvider() {
    const user = ref<IUser | null>(null);
    const loading = ref(false);
    const errMsg = ref('');

    const login = async (email: string, password: string) => {
        const repsonseData = await UserRequest.login(email, password);
        if (repsonseData.success) {
            user.value = repsonseData.data!;
        } else {
            errMsg.value = repsonseData.errMsg!;
        }

        loading.value = false;
    };

    const logout = () => {
        user.value = null;
    };

    const register = async (data: IUser) => {
        loading.value = true;

        const repsonseData = await UserRequest.register(data);
        if (repsonseData.success) {
            user.value = repsonseData.data!;
        } else {
            errMsg.value = repsonseData.errMsg!;
        }

        loading.value = false;
    };

    provide(AuthKey, { user, login, logout, register, loading, errMsg });
}
