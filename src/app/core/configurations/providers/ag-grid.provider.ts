import { EnvironmentProviders, provideAppInitializer } from '@angular/core';
import {
    ModuleRegistry,
    AllCommunityModule,
    provideGlobalGridOptions,
} from 'ag-grid-community';

/**
 * Since v33 of AG-Grid, we are now able to import just the grid modules that we need. Before we can use the grid API,
 * we must register the modules that we want to use. This is done upon construction of the service which
 * imports all the necessary modules for AG-Grid to function.
 *
 * Since v33, the default theming method has also changed. Setting the global grid options to use the legacy theme
 * will keep all of our existing grid styles that we have done with v32.
 */
export const AG_GRID_PROVIDER: EnvironmentProviders = provideAppInitializer(
    () => {
        const initializerFn = (() => {
            return () => {
                ModuleRegistry.registerModules([AllCommunityModule]);

                provideGlobalGridOptions({ theme: 'legacy' });
            };
        })();
        return initializerFn();
    },
);
