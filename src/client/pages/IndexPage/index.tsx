import React from 'react';

import './styles.scss';

import { fetchFavorites } from '../../util/fetchFavorites';

import { FavoriteCard } from './FavoriteCard';

export const IndexPage: React.FC = () => {
    const favs = fetchFavorites();
    const playerFavs = favs ? (
        <div className="favorites-container">
            {favs.players.map((fav) => (
                <FavoriteCard fav={fav} key={fav.id} />
            ))}
        </div>
    ) : null;
    return (
        <main>
            <h1>COREHALLA</h1>
            <div>
                <h2>Starred Players</h2>
                {playerFavs}
            </div>
            <div>
                <h2>Starred Clans</h2>
                <div className="favorites-container"></div>
            </div>
        </main>
    );
};
