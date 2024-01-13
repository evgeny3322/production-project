import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUserName } from './getLoginUserName';

describe('getLoginUserName.test', () => {
    test('should return admin', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                userName: 'admin',
            },
        };
        expect(getLoginUserName(state as StateSchema)).toEqual('admin');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUserName(state as StateSchema)).toEqual(undefined);
    });
});
