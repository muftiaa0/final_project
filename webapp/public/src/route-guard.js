(() => {
    if (storageHasData() && !getStorage('isAuth')) {
        logout();
        window.location.href = '/index.html';
    }
})();