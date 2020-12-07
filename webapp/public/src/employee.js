const updateEmployeeInformation = async (e) => {
    e.preventDefault();
    const first_name = document.getElementById('formInputNewFirstName').value;
    const last_name = document.getElementById('formInputNewLastName').value;
    const home_address = document.getElementById('formInputNewHomeAddress').value;

    const res = await updateEmployee({ first_name, last_name, home_address });
    window.location.href = 'home.html';

  };