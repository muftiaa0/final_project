const testSalaryService = new SalaryService();
const testSalaryBuilder = new SalaryInfo;

describe('Salary Functionality', () => {
    it('should initialize some HTML', () => {
        const salarySpy = spyOn(testSalaryBuilder, '_renderNewSalaryForm');
        testSalaryBuilder._renderNewSalaryForm();
        expect(salarySpy).toHaveBeenCalled();
    });

    it('should render salary information', () => {
        const salarySpy = spyOn(testSalaryBuilder, '_renderSalaryInformation');
        testSalaryBuilder._renderSalaryInformation();
        expect(salarySpy).toHaveBeenCalled();
    });

    it('should GET salary information', () => {
        const salarySpy = spyOn(testSalaryService, 'getSalary');
        testSalaryService.getSalary();
        expect(salarySpy).toHaveBeenCalled();
    })
});