const getEmployeeSalary = async (e) => {
    e.preventDefault();
    const username = document.getElementById('formInputEmployeeUsername').value;
    console.log(username);

    try {
        const res = await salaryService.getSalary({ username });
        salaryInfo._renderSalaryInformation(res);
    } catch(err) {
        console.log(err);
        alert('Failed to retrieve salary information');
    }
}

const updateEmployeeSalary = async (e) => {
    e.preventDefault();
    const yearly_salary = document.getElementById('forminputNewSalary').value;
    const username = document.getElementById('formInputEmployeeUsername').value;
    
    try {
        const res = await salaryService.updateSalary({ username, yearly_salary });
        getEmployeeSalary(e);

    } catch(err) {
        console.log(err);
        alert('Failed to update salary information');
        window.location.href = './promote-employee.html';
    }
}
