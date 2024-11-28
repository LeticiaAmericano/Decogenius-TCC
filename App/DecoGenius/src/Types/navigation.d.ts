import type { IRootNavigationStack } from './Navigation';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends IRootNavigationStack {}
    }
}
