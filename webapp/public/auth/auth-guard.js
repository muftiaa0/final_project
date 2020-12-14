(() => {
    if (!authService.isAuth() || authService.isTokenExpired()) {
        authService.logout();
        alert('Your session has expired please login again.');
    }
})();