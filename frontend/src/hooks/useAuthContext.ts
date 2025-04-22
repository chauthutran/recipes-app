import { AuthKey } from '../providers/useAuthProvider';
import { inject } from 'vue';

export function useAuthContext() {
    const authContext = inject(AuthKey);

    if (!authContext) {
        throw new Error('AuthKey is not provided');
    }

    return authContext;
}
