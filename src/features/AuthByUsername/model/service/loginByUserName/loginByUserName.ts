import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/ui/const/localStorage';

interface LoginByUserNameProps {
    userName: string
    password: string
}

export const loginByUserName = createAsyncThunk<User, LoginByUserNameProps, {rejectValue: string}>(
    'login/loginByUserName',
    async (/* { userName, password } */ authData, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/login',

                // {
                //     userName, password,
                // },

                authData,
            );

            if (!response.data) {
                console.log('err');
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('error');
        }
    },
);
