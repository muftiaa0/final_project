const SALARY_API = `${BASE_API_URL}/salary`;

class SalaryService {

    updateSalary = (formData) => _put(`${SALARY_API}/update`, formData, DEFAULT_OPTIONS_PLUS_AUTH);
    getSalary = (formData) => _post(SALARY_API, formData, DEFAULT_OPTIONS_PLUS_AUTH);
}

const salaryService = new SalaryService;