// Main Javascript File
function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
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
            for (let i = 0; i < json_result.length; i++) {
                // Print the first name
                console.log(json_result[i].first, json_result[i].last);
                $('#datatable tbody:last').append('<tr><td>'
                    +htmlSafe(json_result[i].id)
                    +'</td><td>'
                    +htmlSafe(json_result[i].first)
                    +'</td><td>'
                    +htmlSafe(json_result[i].last)
                    +'</td><td>'
                    +htmlSafe(json_result[i].email)
                    +'</td><td>'
                    +htmlSafe(json_result[i].phone)
                    +'</td><td>'
                    +htmlSafe(json_result[i].dateTime)
                    +'</td></tr>');
            }
            console.log("Done");
        }
    );
}
updateTable();