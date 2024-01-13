import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { ReactNode } from 'react';
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProvidersProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProviders = ({ children, initialState, asyncReducers }: StoreProvidersProps) => {
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
    );
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
