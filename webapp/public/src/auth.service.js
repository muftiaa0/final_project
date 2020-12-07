const AUTH_API = `${BASE_API_URL}/auth`;

const create = (formData) => _post(`${AUTH_API}/newEmployee`, formData);
const login = (formData) => _post(`${AUTH_API}/login`, formData);
const updatePass = (formData) => _put(`${AUTH_API}/updatePassword`, formData);

const logout = () => {
    clearStorage('isAuth');
    clearStorage('access_token');
    clearStorage('refresh_token');
}