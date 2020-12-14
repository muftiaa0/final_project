const updateEmployeeInformation = async (e) => {
  e.preventDefault();
  const first_name = document.getElementById('formInputNewFirstName').value;
  const last_name = document.getElementById('formInputNewLastName').value;
  const home_address = document.getElementById('formInputNewHomeAddress').value;

  if (!first_name && !last_name && !home_address) {
    alert("You must input one field")
  } else {
    try {
      const res = await employeeService.updateEmployee({ first_name, last_name, home_address });
      window.location.href = './home.html';
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Failed to update employee");
    }
  }
};