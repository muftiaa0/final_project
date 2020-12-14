const EMPLOYEE_API = `${BASE_API_URL}/employee`;

class EmployeeService {
    updateEmployee = (formData) => _put(`${EMPLOYEE_API}/me/update`, formData, DEFAULT_OPTIONS_PLUS_AUTH);
    getEmployee = () => _get(`${EMPLOYEE_API}/me`, OPTIONS_ONLY_AUTH);
}

const employeeService = new EmployeeService;