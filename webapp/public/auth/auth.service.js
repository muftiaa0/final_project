const AUTH_API = `${BASE_API_URL}/auth`;

class AuthService {
    create = (formData) => _post(`${AUTH_API}/newEmployee`, formData, DEFAULT_OPTIONS_PLUS_AUTH);
    login = (formData) => _post(`${AUTH_API}/login`, formData, DEFAULT_OPTIONS);
    updatePass = (formData) => _put(`${AUTH_API}/updatePassword`, formData, DEFAULT_OPTIONS_PLUS_AUTH);

    logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    setExpiration = (maxExpiration) => new Date(new Date().getTime() + maxExpiration * 1000);

    isAuth = () => {
        return getStorage('isAuth');
    }

    isTokenExpired() {
        const expiryDate = getStorage('expires_in');
        const isExpired = expiryDate === new Date();

        if (isExpired) {
            localStorage.clear();
        }
        
        return isExpired;
    }
}

const authService = new AuthService;
