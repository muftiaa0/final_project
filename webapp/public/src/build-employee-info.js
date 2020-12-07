(async () => {
    const employee = await getEmployee();
    console.log(employee);
    console.log(employee.first_name);


    if (employee.length) {
        const div = document.getElementById('employee');
        const loadingDiv = div.childNodes[1];
        
        const ul = document.createElement('ul');

        div.replaceChild(ul, loadingDiv);

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
        a.setAttribute('href', '../update-employee.html');
        a.innerHTML = "update employee information page "
        body.appendChild(a);

        ul.appendChild(header);
        ul.appendChild(body);
    };
})();