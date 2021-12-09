/**
 * Event Listner for name input
 */
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        } catch (e) {
            textError.textContent=e;
        }
    });

    /**
     * Event listner for salary range
     */
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});

const save = () => {
    try {
        let EmployeePayrollData = createEmployeePayroll();
    } catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValurById('#name');
    }catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValue('[name=gender]').pop();
    employeePayrollData.department = getSelectedValue('[name=department]');
    employeePayrollData.salary = getInputValurById('#salary');
    employeePayrollData.notes = getInputValurById('#notes');
    let date = getInputValurById('#day')+" "+getInputValurById('#month')+" "+getInputValurById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValue = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(items => {
        if(items.checked) selItems.push(items.value);
    });
    return selItems; 
}

const getInputValurById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}