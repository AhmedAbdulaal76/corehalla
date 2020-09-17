// Library imports
import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

// Components imports
import { Page, PageContentWrapper } from '../../components/Page';
import { AppBar } from '../../components/AppBar';
import { BottomNavigationBar } from '../../components/BottomNavigationBar';

export const IndexPage: FC = () => {
    return (
        <Page>
            <Helmet>
                <title>Index • Corehalla</title>
            </Helmet>
            <AppBar />
            <PageContentWrapper pTop="3rem" pBtm="3rem">
                <AnimatePresence exitBeforeEnter initial>
                    <motion.div key="page" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                        <main>Index</main>
                    </motion.div>
                </AnimatePresence>
            </PageContentWrapper>
            <BottomNavigationBar />
        </Page>
    );
};
