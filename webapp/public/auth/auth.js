const doLogin = async (e) => {
  e.preventDefault();
  const username = document.getElementById("formInputUsername").value;
  const password = document.getElementById("formInputPassword").value;

  try {
    const res = await authService.login({ username, password });

    const { auth, expires_in, access_token, refresh_token } = res;
    const expiryDate = authService.setExpiration(expires_in);

    setStorage('isAuth', auth);
    setStorage('expires_in', expiryDate)
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);

    if (auth == true) {
      window.location.href = './employee/home.html';
    }

    else {
      console.log("Wrong Credentials");
      throw err;
    }
  } catch (err) {
    alert("Invalid Credentials. Talk to your HR Rep.")
  }
};

const createNewEmployee = async (e) => {
  e.preventDefault();
  const username = document.getElementById('formInputUsernameReg').value;
  const password = document.getElementById('formInputPasswordReg').value;
  const first_name = document.getElementById('formInputFirstNameReg').value;
  const last_name = document.getElementById('formInputLastNameReg').value;
  const home_address = document.getElementById('formInputHomeAddressReg').value;
  const yearly_salary = document.getElementById('formInputSalaryReg').value;

  if (document.getElementById('formInputAdminReg').checked == true) {
    elevated = "true";
  } else {
    elevated = "false";
  }

  if (!username || !password || !first_name || !last_name || !home_address || !yearly_salary) {
    alert("Not all the fields have been filled out");
  } else {
    try {
      const res = await authService.create({ username, password, first_name, last_name, home_address, yearly_salary, elevated });
      window.location.href = '../home.html';
    } catch (err) {
      console.log(err);
      alert("Failed to create new employee");
    }
  }
};

const updateEmployeePassword = async (e) => {
  e.preventDefault();
  const password = document.getElementById('formInputNewPasswordReg').value;

  if (password) {
    try {
      const res = await authService.updatePass({ password });
      authService.logout();
    } catch (err) {
      console.log(err);
      alert("Failed to update password. Try again later.");
    }
  } else {
    alert("Please input a non-empty password");
  }
};

const doLogout = (e) => {
  e.preventDefault();
  authService.logout();
  window.location.href = '/';
};

(() => {
  if (storageHasData()) {
    const isAuth = getStorage('isAuth');
    if (!isAuth) {
      document.getElementById('logout').style.display = 'none';
    } else {
      document.getElementById('logout').style.display = 'block';
    }
  }
})();
