let users = [
  { surname: "Ramóna", firstname: "Baka", age: 48 },
  { surname: "Gizi", firstname: "Rózsa", age: 48 },
  { surname: "Péter", firstname: "Jakab", age: 48 },
  { surname: "Nánási", firstname: "Palika", age: 48 },
  { surname: "Lonich", firstname: "KarCSICSKan", age: 48 },
];
let createButtonGroup = (parent) => {
  let group = document.createElement("div");
  group.className = "btn-group";
  let btnInfo = document.createElement("button");
  btnInfo.className = "btn btn-info";
  btnInfo.innerHTML = "<i class='fa-solid fa-arrows-rotate'></i>";
  let btnDanger = document.createElement("button");
  btnDanger.className = "btn btn-danger";
  btnDanger.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
  group.appendChild(btnInfo);
  group.appendChild(btnDanger);
  let td = document.createElement("td");
  td.appendChild(group);
  parent.appendChild(td);
};
let tableBody = document.querySelector("#userTable tbody");
let createTD = (html, parent) => {
  let td = document.createElement("td");
  td.innerHTML = html;
  parent.appendChild(td);
};
for (let user in users) {
  let tr = document.createElement("tr");
  createTD(parseInt(user) + 1, tr);
  for (let property in users[user]) {
    createTD(users[user][property], tr);
  }
  createButtonGroup(tr);
  tableBody.appendChild(tr);
}
