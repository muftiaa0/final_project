const testBuilder = new EmployeeInfo();
const testEmployeeService = new EmployeeService();

describe('Employee Functionality', () => {
    it('should initialize some HTML', () => {
        const testBuilderSpy = spyOn(testBuilder, 'init');
        testBuilder.init();
        expect(testBuilderSpy).toHaveBeenCalled();
    });

    it('should render welcome message', () => {
        const testBuilderSpy = spyOn(testBuilder, '_renderWelcomeMessage');
        testBuilder._renderWelcomeMessage();
        expect(testBuilderSpy).toHaveBeenCalled();
    });

    it('should render error message', () => {
        const testBuilderSpy = spyOn(testBuilder, '_renderErrorMsg');
        testBuilder._renderErrorMsg();
        expect(testBuilderSpy).toHaveBeenCalled();
    });

    it('should GET employee information', () => {
        const employeeBuilderSpy = spyOn(testEmployeeService, 'getEmployee');
        testEmployeeService.getEmployee();
        expect(employeeBuilderSpy).toHaveBeenCalled();
    })
});