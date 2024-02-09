// src/services/googleAuth.js

import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '542938562976-9a8vl9ih1mlu0dt8b580a26dpuj73s5s.apps.googleusercontent.com'; // Replace with your OAuth client ID
const client = new OAuth2Client(CLIENT_ID);

async function signIn() {
  try {
    const res = await client.getToken();
    const token = res.tokens.access_token;
    // TODO: Handle token (e.g., save to local storage, send to backend)
    console.log('Access token:', token);
  } catch (error) {
    console.error('Error signing in:', error);
  }
}

export default {
  signIn,
};
