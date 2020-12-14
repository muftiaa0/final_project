const testAuthService = new AuthService();

describe('Authentication Functionality', () => {
    it('should verify isAuth', () => {
        spyOn(testAuthService, 'isAuth');
        testAuthService.isAuth();
        expect(testAuthService.isAuth).toHaveBeenCalled();
    });
    
    it('should login to employee', async () => {
        const user_info = {
            username: 'admin',
            password: 'admin'
        };

        const authServiceSpy = spyOn(testAuthService, 'login');
        await testAuthService.login(user_info);
        expect(authServiceSpy).toHaveBeenCalled();
    });

    it('should hire a new employee', async () => {
        const new_employee = {
            username: 'test1',
            password: 'test2',
            first_name: 'hello',
            last_name: 'user',
            home_address: '12345 Test Street',
            yearly_salary: '45000',
        };

        const authServiceSpy = spyOn(testAuthService, 'create');
        await testAuthService.create(new_employee);
        expect (authServiceSpy).toHaveBeenCalled();
    })

    it('should logout of an employee acount', () => {
        const authServiceSpy = spyOn(testAuthService, 'logout');
        testAuthService.logout();
        expect (authServiceSpy).toHaveBeenCalled();
    })
});
