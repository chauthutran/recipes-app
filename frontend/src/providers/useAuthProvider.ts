import { provide, ref, type InjectionKey, type Ref } from 'vue';
import type { IUser } from '../types/types';
import axios from 'axios';

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
        try {
            const res = await axios.post('http://localhost:3000/users/login', {
                email,
                password,
            });
            user.value = res.data;
        } catch (err: any) {
            errMsg.value = `Failed to load categories: ${err.message}`;
        }

        loading.value = false;
    };

    const logout = () => {
        user.value = null;
    };

    const register = async (data: IUser) => {
        loading.value = true;

        try {
            const res = await axios.post('http://localhost:3000/users', data);
            user.value = res.data;
        } catch (err: any) {
            errMsg.value = `Failed to load categories: ${err.message}`;
        }

        loading.value = false;
    };

    provide(AuthKey, { user, login, logout, register, loading, errMsg });
}
