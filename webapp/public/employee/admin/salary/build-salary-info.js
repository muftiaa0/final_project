class SalaryInfo {
    info = [];

    _renderSalaryInformation = (info) => {
        const div = document.getElementById('salaryInfo');
        const loadingDiv = div.childNodes[0];

        const div_con = document.createElement('div');
        div_con.className = "container";

        const div_row = document.createElement('div');
        div_row.className = "row";

        const div_col1 = document.createElement('div');
        div_col1.className = "col-sm center-text";
        div_col1.innerText = info[0].username;

        const salary_span = document.createElement('span');
        salary_span.innerText = info[0].yearly_salary;
        var DOLLAR_SIGN = document.createTextNode("$");

        const div_col2 = document.createElement('div');
        div_col2.className = "col-sm center-text";
        div_col2.appendChild(DOLLAR_SIGN);
        div_col2.appendChild(salary_span);

        div_row.appendChild(div_col1);
        div_row.appendChild(div_col2);
        div_con.appendChild(div_row);

        div.replaceChild(div_con, loadingDiv);
        this._renderNewSalaryForm();

    };

    _renderNewSalaryForm = () => {
        const div = document.getElementById('updateSalaryInfo');
        const loadingDiv = div.childNodes[0];

        const div_but = document.getElementById('updateSalaryButton');
        const loadingDiv2 = div_but.childNodes[0];

        const fragment = document.createDocumentFragment();
        const fragment2 = document.createDocumentFragment();

        fragment.id = "salaryFragment"
        const div1 = document.createElement('div');
        div1.class = "form-group";

        const label = document.createElement('label');
        label.for = "forminputNewSalary";
        label.innerText = "New Employee Salary: "

        const input = document.createElement('input');
        input.id = "forminputNewSalary";
        input.type = "text";
        input.class= "form-control";

        const br = document.createElement('br');

        const div2 = document.createElement('div');
        div2.class = "form-group center-text";
        const button = document.createElement('button');
        button.class = "btn btn-primary";
        button.addEventListener("click", updateEmployeeSalary);
        button.innerText = "Update Salary";

        div1.appendChild(br);
        div1.appendChild(label);
        div1.appendChild(input);

        div2.appendChild(button);

        fragment.appendChild(div1);
        fragment2.appendChild(div2);

        div.replaceChild(fragment, loadingDiv);
        div_but.replaceChild(fragment2, loadingDiv2);
    }

}


const salaryInfo = new SalaryInfo;