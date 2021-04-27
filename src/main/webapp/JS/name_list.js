// Main Javascript File
function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString) {
    // Strip all non-digits
    // Use a regular expression. Match all non-digits \D
    // and replace with an empty string.
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // Are we left with 10 digits? This will return them in
    // three groups. This: (\d{3}) grabs the first three digits \d
    // The 'match' variable is an array. First is the entire match
    // the next locations are each group, which are surrounded by
    // () in the parenthesis.
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
}

function getJSDateFromSQLDate(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');
    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);
    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);
    return resultDate;
}

function updateTable() {
    // Here's where your code is going to go.
    console.log("updateTable called");
    // Call your code.

// Define a URL
    let url = "api/name_list_get";

// Start a web call. Specify:
// URL
// Data to pass (nothing in this case)
// Function to call when we are done
    $.getJSON(url, null, function(json_result) {
            $('#datatable tbody tr').remove();
            for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                console.log(json_result[i].first);

                birthdayDate = getJSDateFromSQLDate(json_result[i].birthday);
                birthdayString = birthdayDate.toLocaleDateString();

                $('#datatable tbody:last').append('<tr><td>'
                    +json_result[i].id
                    +'</td><td>'
                    +htmlSafe(json_result[i].first)
                    +'</td><td>'
                    +htmlSafe(json_result[i].last)
                    +'</td><td>'
                    +htmlSafe(json_result[i].email)
                    +'</td><td>'
                    +formatPhoneNumber(htmlSafe(json_result[i].phone))
                    +'</td><td>'
                    +htmlSafe(birthdayString)
                    +'</td><td>'
                    +'<button type=\'button\' name=\'delete\' class=\'deleteButton btn btn-danger\' value=\''+json_result[i].id+'\'>' +
                    'Delete</button>'
                    +'</td><td>'
                    +'<button type=\'button\' name=\'edit\' class=\'editButton btn btn-primary\' value=\''+json_result[i].id+'\'>' +
                    'Edit</button>'
                    +'</td></tr>');
            }
            console.log("Done");
            let buttons = $(".deleteButton");
            buttons.on("click", deleteItem);
            $(".editButton").on("click", editItem);
        }

    );
}
updateTable();

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);
    let dataToServer = {id: e.target.value};
    console.log(dataToServer);
    let url = "api/name_list_delete";
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(dataToServer),
        success: function(dataFromServer) {
            console.log(dataFromServer);
            updateTable();
        },
        contentType: "application/json",
        dataType: 'text' // Could be JSON or whatever too
    });
}

function editItem(e) {
    console.debug("Edit");
    console.debug("Edit: " + e.target.value);
    let id = e.target.value;

// This next line is fun.
// "e" is the event of the mouse click
// "e.target" is what the user clicked on. The button in this case.
// "e.target.parentNode" is the node that holds the button. In this case, the table cell.
// "e.target.parentNode.parentNode" is the parent of the table cell. In this case, the table row.
// "e.target.parentNode.parentNode.querySelectorAll("td")" gets an array of all matching table cells in the row
// "e.target.parentNode.parentNode.querySelectorAll("td")[0]" is the first cell. (You can grab cells 0, 1, 2, etc.)
// "e.target.parentNode.parentNode.querySelectorAll("td")[0].innerHTML" is content of that cell. Like "Sam" for example.
// How did I find this long chain? Just by setting a breakpoint and using the interactive shell in my browser.
    let first = e.target.parentNode.parentNode.querySelectorAll("td")[1].innerHTML;
    let last = e.target.parentNode.parentNode.querySelectorAll("td")[2].innerHTML;
    let email = e.target.parentNode.parentNode.querySelectorAll("td")[3].innerHTML;
    let phone = e.target.parentNode.parentNode.querySelectorAll("td")[4].innerHTML;
    let birthday = e.target.parentNode.parentNode.querySelectorAll("td")[5].innerHTML;
// repeat line above for all the fields we need

    $('#id').val(id); // Yes, now we set and use the hidden ID field
    $('#firstName').val(first);
    $('#lastName').val(last);
    $('#email').val(email);

    let regexp = /\((\d{3})\) (\d{3})-(\d{4})/;
    let match = phone.match(regexp);
// Log what we matched
    console.log("Matches:");
    console.log(match);
// We how have a list, 1-3, where each one is part of the phone number.
// Reformat into 515-555-1212
    let phoneString = phone;
    $('#phone').val(phoneString)

    // Parse date to current time in milliseconds
    let timestamp = Date.parse(birthday);
// Made date object out of that time
    let dateObject = new Date(timestamp);
// Convert to a full ISO formatted string
    let fullDateString = dateObject.toISOString();
// Trim off the time part
    let shortDateString = fullDateString.split('T')[0];
    $('#birthday').val(birthday);
// Etc

// Show the window
    $('#myModal').modal('show');
}

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Add Item");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#id').val("");
    $('#firstName').val("");
    $('#firstName').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");

    // Show the hidden dialog
    $('#myModal').modal('show');

    $('#myModal').on('shown.bs.modal', function () {
        $('#firstName').focus();
    });
}

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
let addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function saveChanges() {
    console.log("Save Changes");
    let id = $('#id').val();

    let firstName = $('#firstName').val();
    console.log("First name: " + firstName);

    let isValid = true;

    let reg = /^[^0-9]{1,25}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(firstName)) {
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else {
       $('#firstName').removeClass("is-valid");
       $('#firstName').addClass("is-invalid");
       isValid = false;
    }


    let lastName = $('#lastName').val();
    console.log("Last name: " + lastName);

    reg = /^[^0-9]{1,25}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(lastName)) {
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else {
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
        isValid = false;
    }

    let email = $('#email').val();
    console.log("Email: " + email);

    reg = /^[^0-9]{1,25}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(email)) {
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else {
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
        isValid = false;
    }

    let phone = $('#phone').val();
    console.log("Phone: " + phone);

    reg = /\((\d{3})\) (\d{3})-(\d{4})/;

    // Test the regular expression to see if there is a match
    if (reg.test(phone)) {
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else {
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
        isValid = false;
    }

    let birthday = $('#birthday').val();
    console.log("Birthday: " + birthday);

    reg = /^\d{4}\-\d{2}\-\d{2}$/;

    // Test the regular expression to see if there is a match
    if (reg.test(birthday)) {
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else {
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
        isValid = false;
    }

    if(isValid) {
        console.log("Valid Form");
        let dataToServer;
        if (id === "")
            dataToServer = {first: firstName, last: lastName, email: email, phone: phone, birthday: birthday};
        else
            dataToServer = {id: id, first: firstName, last: lastName, email: email, phone: phone, birthday: birthday};
        console.log(dataToServer);
        let url = "api/name_list_edit";
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(dataToServer),
            success: function(dataFromServer) {
                console.log(dataFromServer);
                $('#myModal').modal('hide');
                updateTable();
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
    else {
        console.log("Not Valid");
    }
}


let saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);

$(document).keydown(function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 65 && !$('myModal').is(':visible')) {
        showDialogAdd();
    }
});


