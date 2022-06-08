// get data from serevr
function getServerData(url) {
  let fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
  };
  return fetch(url, fetchOptions).then(
    (response) => response.json(),
    (err) => console.error(err)
  );
}
//############################################
function getUserTable() {
  getServerData("http://localhost:3000/users").then((data) =>
    fillDataTable(data, "userTable")
  );
}
// ############################################
let getDataBtn = document.querySelector("#getDataBtn");
getDataBtn.addEventListener("click", getUserTable);
// ############################################
function fillDataTable(data, tableId) {
  let table = document.querySelector(`#${tableId}`);
  if (!table) {
    console.error(`table ${tableId} is not found`);
    return;
  }
  let tBody = table.querySelector("tbody");
  tBody.innerHTML = "";
  tBody.appendChild(newUserRow());
  for (let row of data) {
    let tr = createAnyElement("tr");
    for (let i in row) {
      let td = createAnyElement("td");
      td.innerHTML = row[i];
      tr.appendChild(td);
    }
    tr.appendChild(createBtnGroup());
    tBody.appendChild(tr);
  }
}
// ############################################
function createAnyElement(name, attributes) {
  let element = document.createElement(name);
  for (let k in attributes) {
    element.setAttribute(k, attributes[k]);
  }
  return element;
}
// ############################################
function createBtnGroup() {
  let group = createAnyElement("div", {
    class: "btn, btn-group",
  });
  let infoBtn = createAnyElement("button", {
    class: "btn btn-info",
    onclick: "getInfo(this)",
  });
  infoBtn.innerHTML = "<i class='fa fa-refresh' aria-hidden='true'></i>";
  let dangerBtn = createAnyElement("button", {
    class: "btn btn-danger",
    onclick: "delRow(this)",
  });
  dangerBtn.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";
  group.appendChild(infoBtn);
  group.appendChild(dangerBtn);
  let td = createAnyElement("td");
  td.appendChild(group);
  return td;
}
// ############################################
function delRow(element) {
  btnGroup = element.parentElement;
  tdBtn = btnGroup.parentElement;
  tr = tdBtn.parentElement;
  let id = tr.querySelector("td:first-child").innerHTML;
  console.log(id);
  let fetchOptions = {
    method: "DELETE",
    mode: "cors",
    cache: "default",
  };
  fetch(`http://localhost:3000/users/${id}`, fetchOptions)
    .then(
      (response) => response.json(),
      (err) => console.error(err)
    )
    .then((data) => {
      getUserTable();
    });
}
// ############################################
function newUserRow() {
  let tr = createAnyElement("tr");
  for (let k in { id: "", surname: "", firstname: "", email: "", age: "" }) {
    let td = createAnyElement("td");
    let input = createAnyElement("input", {
      class: "form-control",
      name: k,
    });
    if (k == "id") {
      input.setAttribute("readonly", true);
    }
    td.appendChild(input);
    tr.appendChild(td);
  }
  let newBtn = createAnyElement("button", {
    class: "btn btn-success",
    onclick: "createUser(this)",
  });
  newBtn.innerHTML = "<i class='fa fa-plus-circle' aria-hidden='true'></i>";
  let td = createAnyElement("td");
  td.appendChild(newBtn);
  tr.appendChild(td);
  return tr;
}
// ############################################
function createUser(btn) {
  tr = btn.parentElement.parentElement;
  let data = getRowData(tr);
  let fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(`http://localhost:3000/users`, fetchOptions)
    .then(
      (response) => response.json(),
      (err) => console.error(err)
    )
    .then((data) => {
      getUserTable();
    });
}
// ############################################
function getRowData(tr) {
  inputs = tr.querySelectorAll("input");
  let data = {};
  for (let i of inputs) {
    data[i.name] = i.value;
  }
  return data;
}
