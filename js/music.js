// Music passthrough — Spotify Connect via the Web API.
//
// A web app can't reach into the native Apple Music or Spotify apps directly
// (that's native-SDK territory — see docs/ROADMAP.md). But Spotify Connect
// exposes remote playback control over HTTPS: with a one-time authorization,
// we can show what's playing and play/pause/skip it from inside a session —
// on Spotify Premium accounts. Auth is Authorization Code + PKCE, entirely
// client-side: no server, no secret, tokens stay on this device.

const LS = 'movement.spotify.v1';

const b64url = buf =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const randString = n => {
  const bytes = crypto.getRandomValues(new Uint8Array(n));
  return Array.from(bytes, b => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[b % 62]).join('');
};

export const spotify = {
  config() {
    try { return JSON.parse(localStorage.getItem(LS) || 'null'); } catch (e) { return null; }
  },
  save(cfg) { localStorage.setItem(LS, JSON.stringify(cfg)); },
  disconnect() { localStorage.removeItem(LS); },
  connected() { return !!this.config()?.refreshToken; },

  // Must be registered verbatim as a Redirect URI in the Spotify app settings.
  redirectUri() { return location.origin + location.pathname; },

  async beginAuth(clientId) {
    const verifier = randString(64);
    sessionStorage.setItem('sp.verifier', verifier);
    sessionStorage.setItem('sp.clientId', clientId);
    const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
    const p = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri(),
      scope: 'user-read-playback-state user-modify-playback-state',
      code_challenge_method: 'S256',
      code_challenge: challenge,
    });
    location.href = 'https://accounts.spotify.com/authorize?' + p;
  },

  // Called once at boot: finishes the auth dance if we just came back from
  // Spotify's consent page (?code=... in the URL). Returns true on success.
  async completeAuth() {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const denied = params.get('error');
    if (!code && !denied) return false;
    history.replaceState(null, '', location.pathname + location.hash); // clean the URL either way
    if (denied) return false;
    const clientId = sessionStorage.getItem('sp.clientId');
    const verifier = sessionStorage.getItem('sp.verifier');
    if (!clientId || !verifier) return false;
    try {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri(),
          client_id: clientId,
          code_verifier: verifier,
        }),
      });
      if (!res.ok) return false;
      const tok = await res.json();
      this.save({
        clientId,
        accessToken: tok.access_token,
        refreshToken: tok.refresh_token,
        expiresAt: Date.now() + tok.expires_in * 1000,
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  async token() {
    const c = this.config();
    if (!c) return null;
    if (Date.now() < c.expiresAt - 30000) return c.accessToken;
    try {
      const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: c.refreshToken,
          client_id: c.clientId,
        }),
      });
      if (!res.ok) return null;
      const tok = await res.json();
      this.save({
        ...c,
        accessToken: tok.access_token,
        refreshToken: tok.refresh_token || c.refreshToken,
        expiresAt: Date.now() + tok.expires_in * 1000,
      });
      return tok.access_token;
    } catch (e) {
      return null;
    }
  },

  async api(method, path) {
    const t = await this.token();
    if (!t) return null;
    try {
      return await fetch('https://api.spotify.com/v1' + path, {
        method,
        headers: { Authorization: 'Bearer ' + t },
      });
    } catch (e) {
      return null;
    }
  },

  // null = nothing playing / no active device / not reachable.
  async nowPlaying() {
    const res = await this.api('GET', '/me/player');
    if (!res || !res.ok || res.status === 204) return null;
    try {
      const d = await res.json();
      if (!d || !d.item) return null;
      return {
        title: d.item.name,
        artist: (d.item.artists || []).map(a => a.name).join(', '),
        playing: !!d.is_playing,
      };
    } catch (e) {
      return null;
    }
  },

  play() { return this.api('PUT', '/me/player/play'); },
  pause() { return this.api('PUT', '/me/player/pause'); },
  next() { return this.api('POST', '/me/player/next'); },
  prev() { return this.api('POST', '/me/player/previous'); },
};
