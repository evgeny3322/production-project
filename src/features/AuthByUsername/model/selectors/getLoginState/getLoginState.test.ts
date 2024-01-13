import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getLoginState.test', () => {
    test('should return loginForm', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                userName: 'admin',
                password: '123',
                isLoading: true,
                error: 'error',
            },
        };
        expect(getLoginState(state as StateSchema)).toEqual({
            userName: 'admin',
            password: '123',
            isLoading: true,
            error: 'error',
        });
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginState(state as StateSchema)).toEqual(undefined);
    });
});
