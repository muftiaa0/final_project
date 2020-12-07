const doLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById("formInputUsername").value;
    const password = document.getElementById("formInputPassword").value;

    const res = await login({ username, password });

    const { auth, access_token, refresh_token } = res;

    setStorage('isAuth', auth);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);

    if (auth == true) {
    window.location.href = 'home.html';
    }

    else {
      console.log("Wrong Credentials");
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

    const res = await create({ username, password, first_name, last_name, home_address, yearly_salary, elevated });
    window.location.href = 'home.html';
};

const updateEmployeePassword = async (e) => {
  e.preventDefault();
  const password = document.getElementById('formInputNewPasswordReg').value;

  console.log(password);
  if (password != null || password != "") {
    console.log("sending message");
    const res = await updatePass({ password });
    console.log(res);
  }
};

const doLogout = (e) => {
  e.preventDefault();
  logout();
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