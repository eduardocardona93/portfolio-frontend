import fetch from 'isomorphic-unfetch';
import querystring from 'querystring';

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`;
const TOP_TRACKS_ENDPOINT_SIXMONTHS = `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term`;
const TOP_TRACKS_ENDPOINT_YEAR = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term`;
const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token
        })
    });

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getTopTracks = async () => {
    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getTopTracksSixMonths = async () => {
    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT_SIXMONTHS, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getTopTracksYear = async () => {
    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT_YEAR, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};

export const getPlaylists = async () => {
    const { access_token } = await getAccessToken();

    return fetch(PLAYLISTS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
};