let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  console.log("starting");
  if (site_properties.use_local_storage.match("true")) {
    getEmployeeDataFromStorage();
  } else getEmployeePayrollDataFromServer();
});

const getEmployeeDataFromStorage = () => {
  employeePayrollList = localStorage.getItem('EmployeePayrollList') ?
    JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
  processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
  console.log("processEmployeePayrollDataResponse");
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
  console.log("getEmployeePayrollDataFromServer")
  makeServiceCall("GET", site_properties.server_url, true)
    .then(responseText => {
      employeePayrollList = JSON.parse(responseText);
      processEmployeePayrollDataResponse();
    })
    .catch(error => {
      console.log(error);
      console.log("GET Error Status: " + JSON.stringify(error));
      empPayrollList = [];
      processEmployeePayrollDataResponse();
    });
}

const createInnerHtml = () => {
  console.log("createInnerHtml");
  const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
    "<th>Salary</th><th>StartDate</th><th>Actions</th>";
  if (employeePayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const empPayrollData of employeePayrollList) {
    innerHtml = `${innerHtml}
    <tr>
      <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
      <td>${empPayrollData._name}</td>
      <td>${empPayrollData._gender}</td>
      <td>${getDeptHtml(empPayrollData._department)}</td>
      <td>${empPayrollData._salary}</td>
      <td>${empPayrollData._startDate}</td>
      <td>
        <img id="${empPayrollData.id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
        <img id="${empPayrollData.id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
      </td>
    </tr>
      `;
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
  }
  return deptHtml;
}

const remove = (node) => {
  let empPayrollData = employeePayrollList.find(empData => empData.id == node.id);
  if (!empPayrollData) return;
  const index = employeePayrollList
    .map(empData => empData.id)
    .indexOf(empPayrollData.id);
  employeePayrollList.splice(index, 1);
  if (site_properties.use_local_storage.match("true")) {
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
  } else {
    const deleteUrl = site_properties.server_url + empPayrollData.id.toString();
    console.log("delete URL= " +deleteUrl);
    makeServiceCall("DELETE", deleteUrl, false)
    .then(responseText => {
      document.querySelector(".emp-count").textContent = employeePayrollList.length;
      createInnerHtml();
    })
    .catch(error => {
      console.log("Delete Error Status: " +JSON.stringify(error));
    })
  }
}

const update = (node) => {
  const empPayrollData = employeePayrollList.find(empData => empData.id == node.id);
  if (!empPayrollData) return;
  localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
  window.location.replace(site_properties.add_employee);
}