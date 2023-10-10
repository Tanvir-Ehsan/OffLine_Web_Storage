// 3D Effect
var cards = $(".card");

cards.on("mousemove", function(e) {
  var currentCard = $(this);
  var ax = -($(window).innerWidth() / 2 - e.pageX) / 20;
  var ay = ($(window).innerHeight() / 2 - e.pageY) / 10;
  currentCard.attr("style", "transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg); -webkit-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg); -moz-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg)");
});

cards.on("mouseout", function() {
  $(this).removeAttr("style");
});
//  close 3d effect

// Local Storage

$(document).ready(function () {
  contactsNamespace.initialize();
});

(function () {
  this.contactsNamespace = this.contactsNamespace || {};
  var ns = this.contactsNamespace;
  var currentRecord;

  ns.initialize = function () {
      $("#btnSave").on('click', ns.save);
      ns.display();
  }

  function retrieveFromStorage() {
      var contactsJSON = localStorage.getItem('contacts');
      return contactsJSON ? JSON.parse(contactsJSON) : [];
  }

  ns.display = function () {
      $("#currentAction").html('Add Contact');
      currentRecord = { key: null, contact: {} };
      displayCurrentRecord();
      var results = retrieveFromStorage();
      bindToGrid(results);
  }

  function bindToGrid(results) {
      var html = "";
      for (var i = 0; i < results.length; i++) {
          var contact = results[i];
          html += '<tr><td>' + contact.email + '</td>';
          html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
          html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';
      }
      html = html || '<tr><td colspan="3">No Records Available!!!</td></tr>'
      $("#contacts tbody").html(html);
      $('#contacts a.edit').on('click', ns.loadContact);
  }

  ns.loadContact = function () {
      var key = parseInt($(this).attr('data-key'));
      var results = retrieveFromStorage();
      $("#currentAction").html('Edit Contact');
      currentRecord = { key: key, contact: results[key] }
      displayCurrentRecord();
  }

  function displayCurrentRecord() {
      var contact = currentRecord.contact;
      $("#firstName").val(contact.firstName);
      $("#lastName").val(contact.lastName);
      $("#email").val(contact.email);
      $("#phoneNumber").val(contact.phoneNumber);
  }

  ns.save = function () {
      var contact = currentRecord.contact;
      contact.firstName = $("#firstName").val();
      contact.lastName = $("#lastName").val();
      contact.email = $("#email").val();
      contact.phoneNumber = $("#phoneNumber").val();

      var results = retrieveFromStorage();
      if (currentRecord.key != null) {
          results[currentRecord.key] = contact;
      }
      else {
          results.push(contact);
      }
      localStorage.setItem('contacts', JSON.stringify(results));
      ns.display();
  }

})();

// Session storage

$(document).ready(function () {
    contactsNamespace.initialize();
});

(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;

    ns.initialize = function () {
        $("#btnSave").on('click', ns.save);
        ns.display();
    }

    function retrieveFromStorage() {
        var contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }

    ns.display = function () {
        $("#currentAction").html('Add Contact');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();
        var results = retrieveFromStorage();
        bindToGrid(results);
    }

    function bindToGrid(results) {
        var html = "";
        for (var i = 0; i < results.length; i++) {
            var contact = results[i];
            html += '<tr><td>' + contact.email + '</td>';
            html += '<td>' + contact.firstName + ' ' + contact.lastName + '</td>';
            html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';
        }
        html = html || '<tr><td colspan="3">No Records Available!!!</td></tr>'
        $("#contacts tbody").html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }

    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var results = retrieveFromStorage();
        $("#currentAction").html('Edit Contact');
        currentRecord = { key: key, contact: results[key] }
        displayCurrentRecord();
    }

    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $("#firstName").val(contact.firstName);
        $("#lastName").val(contact.lastName);
        $("#email").val(contact.email);
        $("#phoneNumber").val(contact.phoneNumber);
    }

    ns.save = function () {
        var contact = currentRecord.contact;
        contact.firstName = $("#firstName").val();
        contact.lastName = $("#lastName").val();
        contact.email = $("#email").val();
        contact.phoneNumber = $("#phoneNumber").val();

        var results = retrieveFromStorage();
        if (currentRecord.key != null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact);
        }
        localStorage.setItem('contacts', JSON.stringify(results));
        ns.display();
    }

})();

// End of session storage
