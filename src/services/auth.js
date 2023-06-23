export const TOKEN_KEY = '&app_token';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (response) => {
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem('name', response.name);
    localStorage.setItem('email', response.email);
    localStorage.setItem('id', response.id);
    localStorage.setItem('cpf', response.cpf);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
};

export const NAME = localStorage.getItem('name');
export const E_MAIL = localStorage.getItem('email');
export const ID = localStorage.getItem('id');
export const CPF = localStorage.getItem('cpf');