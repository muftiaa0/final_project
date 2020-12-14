class EmployeeInfo {
    info = [];
    employeeService = employeeService;

    constructor() {}

    init() {
        this.render();
    }

    _renderWelcomeMessage = (employee) => {
        const div = document.getElementById('employee');
        const loadingDiv = div.childNodes[0];
        const fragment = document.createDocumentFragment();
        const ul = document.createElement('ul');

        const header = document.createElement('h1');
        header.className = 'center-text';

        const body  = document.createElement('body');
        body.className = 'center-text';

        const firstNameSpan = document.createElement('span');
        firstNameSpan.className = 'first-name';
        firstNameSpan.innerText = employee[0].first_name;

        const lastNameSpan = document.createElement('span');
        lastNameSpan.className = 'last-name';
        lastNameSpan.innerText = employee[0].last_name;

        const homeAddressSpan = document.createElement('span');
        homeAddressSpan.className = 'home-address';
        homeAddressSpan.innerText = employee[0].home_address;

        var welcomeMessage = document.createTextNode("Welcome, ");
        var addressMessage = document.createTextNode("Your home address on file is:  ");
        var updateMessage = document.createTextNode("If your information is not up to date please head over to the ")
        var space = document.createTextNode(" ");

        var linebreak = document.createElement("br");
        header.appendChild(welcomeMessage);
        header.appendChild(firstNameSpan);
        header.appendChild(space);
        header.appendChild(lastNameSpan);
        
        body.appendChild(addressMessage);
        body.appendChild(homeAddressSpan);
        body.appendChild(linebreak);
        body.appendChild(updateMessage);

        var a = document.createElement('a');
        a.setAttribute('href', './update-employee.html');
        a.innerHTML = "update employee information page "
        body.appendChild(a);

        ul.appendChild(header);
        ul.appendChild(body);
        fragment.appendChild(ul);

        div.replaceChild(fragment, loadingDiv);
    }

    _renderErrorMsg = (message) => {
        const div = document.getElementById('employee');
        const loadingDiv = div.childNodes[0];
        const text = document.createTextNode(message);
        const newDiv = document.createElement('div');
        newDiv.id = 'error-message';
        newDiv.className = 'center-text';
        newDiv.appendChild(text);
        div.replaceChild(newDiv, loadingDiv);
    }

    render = async () => {
        console.log("hello");
        const employee = await this.employeeService.getEmployee();
        console.log(employee);
        try {
            if (employee.length) {
                this.info = employee;
                this._renderWelcomeMessage(employee);
            } else {
                this._renderErrorMsg(employee.msg);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }
}