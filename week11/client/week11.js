import Auth from './auth.js';
import { makeRequest } from './authHelpers.js';

const auth = new Auth();
auth.login();

const loginForm = document.getElementById('login');
loginForm.querySelector('button').addEventListener('click', auth.login);