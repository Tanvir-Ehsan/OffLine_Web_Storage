var db = openDatabase("contacts", "1.0", "MyContactsApp", 2 * 1024 * 1024);

db.transaction(function (trans) {
  trans.executeSql(
    "CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement,firstname, lastname, phonenumber)"
  );
});

function addContact() {
  var inputFirstName = document.getElementById("firstName").value;
  var inputLastName = document.getElementById("lastName").value;
  var inputPhoneNumber = document.getElementById("phoneNumber").value;
  if (inputFirstName !== "" && inputLastName !== "" && inputPhoneNumber !== "") {
    db.transaction(function (trans) {
      trans.executeSql(
        "INSERT INTO contacts(firstname, lastname, phonenumber) VALUES(?,?,?)",
        [inputFirstName, inputLastName, inputPhoneNumber],
        function (trans, results) {
          var contactRow = document.createElement("tr");
          var id = document.createElement("td");
          var firstName = document.createElement("td");
          var lastName = document.createElement("td");
          var phoneNumber = document.createElement("td");
          var updateButton = document.createElement("td");
          var removeButton = document.createElement("td");

          id.textContent = results.insertId;
          firstName.textContent = inputFirstName;
          lastName.textContent = inputLastName;
          phoneNumber.textContent = inputPhoneNumber;
          updateButton.innerHTML = '<button onclick="updateContact(' +
                      results.insertId + ')">Update</button>';
          removeButton.innerHTML ='<button onclick="deleteContact(' +
                      results.insertId +')">Delete</button>';
                      contactRow.appendChild(id);
      contactRow.appendChild(firstName);
      contactRow.appendChild(lastName);
      contactRow.appendChild(phoneNumber);
      contactRow.appendChild(updateButton);
      contactRow.appendChild(removeButton);

      document.getElementById("contacts").appendChild(contactRow);
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("phoneNumber").value = "";
    },
    function (trans, error) {
      alert("Error adding contact: " + error.message);
    }
  );
});
} else {
alert("Please fill all the fields");
}
}

function updateContact(id) {
db.transaction(function (trans) {
trans.executeSql(
  "SELECT * FROM contacts WHERE id=?",
  [id],
  function (tx, results) {
    var record = results.rows.item(0);
    document.getElementById("id").value = record.id;
    document.getElementById("firstName").value = record.firstname;
    document.getElementById("lastName").value = record.lastname;
    document.getElementById("phoneNumber").value = record.phonenumber;
  },
  function (tx, error) {
    alert("Error retrieving contact: " + error.message);
  }
);
});
}

function save() {
var id = document.getElementById("id").value;
var inputFirstName = document.getElementById("firstName").value;
var inputLastName = document.getElementById("lastName").value;
var inputPhoneNumber = document.getElementById("phoneNumber").value;
if (id !== "") {
db.transaction(function (trans) {
  trans.executeSql(
    "UPDATE contacts SET firstname=?, lastname=?, phonenumber=? WHERE id=?",
    [inputFirstName, inputLastName, inputPhoneNumber, id],
    function (trans, results) {
      alert("Record updated successfully");
      document.getElementById("id").value = "";
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("phoneNumber").value = "";
    },
    function (trans, error) {
      alert("Error updating record: " + error.message);
    }
  );
});
} else {
alert("Please select a contact to update");
}
}

function deleteContact(id) {
db.transaction(function (trans) {
trans.executeSql(
  "DELETE FROM contacts WHERE id=?",
  [id],
  function (trans, results) {
    alert("Contact deleted successfully");
    location.reload();
  },
  function (trans, error) {
    alert("Error deleting contact: " + error.message);
  }
);
});
}
// *********** file drag
var filesTable = document.getElementById("filesTable");
var dropZone = document.getElementById("target");

dropZone.addEventListener("dragover", function (event) {
event.stopPropagation();
event.preventDefault();
event.dataTransfer.dropEffect = "copy";
});

dropZone.addEventListener("drop", function (event) {
event.stopPropagation();
event.preventDefault();
var files = event.dataTransfer.files;

for (var i = 0; i < files.length; i++) {
var file = files[i];
var fileRow = document.createElement("tr");
var nameCell = document.createElement("td");
var typeCell = document.createElement("td");
var sizeCell = document.createElement("td");
var downloadCell = document.createElement("td");
var downloadLink = document.createElement("a");

nameCell.textContent = file.name;
typeCell.textContent = file.type || "N/A";
sizeCell.textContent = file.size + " bytes";
downloadLink.textContent = "Download";
downloadLink.href = URL.createObjectURL(file);
downloadLink.download = file.name;

downloadCell.appendChild(downloadLink);
fileRow.appendChild(nameCell);
fileRow.appendChild(typeCell);
fileRow.appendChild(sizeCell);
fileRow.appendChild(downloadCell);

filesTable.appendChild(fileRow);
}
});