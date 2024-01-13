import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from 'shared/config/routerConfig/routerConfig';
import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {Object.values(routerConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    element={(
                        <div className="page-wrapper">
                            {element}
                        </div>
                    )}
                    path={path}
                />
            ))}
        </Routes>
    </Suspense>
);

export default AppRouter;
