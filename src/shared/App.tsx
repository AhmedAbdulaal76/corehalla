import React, { useContext, CSSProperties, FC } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import { Page } from './components/Page';

import { IndexPage } from './pages/IndexPage';
import { RankingsPage } from './pages/RankingsPage';
import { PlayerPage } from './pages/stats/PlayerPage';
import { ClanPage } from './pages/stats/ClanPage';
import { FavoritesPage } from './pages/FavoritesPage';

import { ThemeContext, themeModes } from './providers/ThemeProvider';

const AppWrapper = styled.div`
    height: 100%;
    min-height: 100%;
`;

export const App: FC = () => {
    const location = useLocation();

    const { themeMode } = useContext(ThemeContext);

    return (
        <AppWrapper id="App" style={themeModes[themeMode] as CSSProperties}>
            <AnimatePresence exitBeforeEnter initial>
                <Switch location={location} key={location.pathname}>
                    <Route path="/" exact>
                        <Page>
                            <IndexPage />
                        </Page>
                    </Route>
                    <Route path="/rankings/:bracket?/:region?/:page?">
                        <RankingsPage />
                    </Route>
                    <Route path="/stats/player/:id" exact>
                        <PlayerPage />
                    </Route>
                    <Route path="/stats/clan/:id" exact>
                        <ClanPage />
                    </Route>
                    <Route path="/favorites" exact>
                        <FavoritesPage />
                    </Route>
                </Switch>
            </AnimatePresence>
        </AppWrapper>
    );
};
