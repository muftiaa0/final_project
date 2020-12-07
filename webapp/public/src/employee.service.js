const EMPLOYEE_API = `${BASE_API_URL}/employee`;

const updateEmployee = (formData) => _put(`${EMPLOYEE_API}/me/update`, formData);
const getEmployee = () => _get(`${EMPLOYEE_API}/me`);