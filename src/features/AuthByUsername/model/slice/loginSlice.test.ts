import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from 'features/AuthByUserName';
import { loginActions, loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import {
    loginByUserName,
} from 'features/AuthByUserName/model/service/loginByUserName/loginByUserName';

describe('loginSlice.test', () => {
    test('test set userName', () => {
        const state: DeepPartial<LoginSchema> = { userName: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUserName('test'),
        )).toEqual({ userName: 'test' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('111'),
        )).toEqual({ password: '111' });
    });
});
