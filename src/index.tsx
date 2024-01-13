import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { App } from 'app/App';
import 'app/styles/index.scss';

import 'shared/config/i18n/i18n';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProviders } from 'app/providers/StoreProvider';

render(
    <StoreProviders>
        <BrowserRouter>
            <ThemeProvider>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    </StoreProviders>,
    document.getElementById('root'),
);
