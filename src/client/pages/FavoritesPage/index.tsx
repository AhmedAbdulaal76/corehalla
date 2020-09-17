// Library imports
import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

import { FavoritesContext } from '../../providers/FavoritesProvider';

// Components imports
import { Page, PageContentWrapper } from '../../components/Page';
import { AppBar } from '../../components/AppBar';
import { BottomNavigationBar } from '../../components/BottomNavigationBar';

export const FavoritesPage: FC = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <Page>
            <Helmet>
                <title>Favorites • Corehalla</title>
            </Helmet>
            <AppBar title="Favorites" />
            <PageContentWrapper pTop="3rem" pBtm="3rem">
                <AnimatePresence exitBeforeEnter initial>
                    <motion.div key="page" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                        <main>
                            {favorites.map((fav) => (
                                <Link key={fav.id} to={`/stats/${fav.type}/${fav.id}`}>
                                    {fav.name}
                                    <img src={fav.thumbURI} alt={fav.name} />
                                </Link>
                            ))}
                        </main>
                    </motion.div>
                </AnimatePresence>
            </PageContentWrapper>
            <BottomNavigationBar />
        </Page>
    );
};
