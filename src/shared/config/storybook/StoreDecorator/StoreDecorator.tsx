import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { StateSchema, StoreProviders } from 'app/providers/StoreProvider';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducer,
};

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => {
    return (
        <StoreProviders
            initialState={initialState}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
            <StoryComponent />
        </StoreProviders>
    );
};
