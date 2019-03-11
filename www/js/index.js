// https://www.youtube.com/watch?v=vL2mFknpHnE&index=15&list=PLxyOsIbHSrxmbXmqJ4WmI0-8SbrcM9fN8
$(document).on("ready", function() {
    // databaseHandler.createDatabase();
});

function formSubmit() {
    var storage_type = document.getElementById("storage_type").value;
    var dimension = document.getElementById("dimension").value;
    var datetime = document.getElementById("adding_datetime").value;
    var storage_feature = document.getElementById("storage_feature").value;
    var price = document.getElementById("price").value;
    var notes = document.getElementById("notes").value;
    var reporter = document.getElementById("reporter").value;

    if (
        !storage_type ||
        !dimension ||
        !adding_datetime ||
        !storage_feature ||
        !price ||
        !reporter
    ) {
        // storage type alert
        var storage_type_alert = null;
        if (storage_type === "") {
            storage_type_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("storage_type_alert").innerHTML = storage_type_alert;

        // dimension alert
        var dimension_alert = null;
        if (dimension === "") {
            dimension_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("dimension_alert").innerHTML = dimension_alert;

        // datetime alert
        var datetime_alert = null;
        if (datetime === "") {
            datetime_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("datetime_alert").innerHTML = datetime_alert;

        // storage feature alert
        var storage_feature_alert = null;
        if (storage_feature === "") {
            storage_feature_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("storage_feature_alert").innerHTML = storage_feature_alert;

        // price alert
        var price_alert = null;
        if (price === "") {
            price_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("price_alert").innerHTML = price_alert;

        // notes alert
        var notes_alert = null;
        if (notes === "") {
            notes_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("notes_alert").innerHTML = notes_alert;

        // reporter alert
        var reporter_alert = null;
        if (reporter === "") {
            reporter_alert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("reporter_alert").innerHTML = reporter_alert;
    } else {
        console.log(
            `Storage type: ${storage_type}; Dimension: ${dimension}, Datetime of adding storage: ${
                adding_datetime.value
            }, Storage_feature: ${storage_feature}, Price: ${price}, Reporter: ${reporter}, Notes: ${notes}`,
            "storage",
        );
        storageHandler.addStorage(
            storage_type,
            dimension,
            adding_datetime.value,
            storage_feature,
            price,
            reporter,
            notes,
        );
    }
}

var currentProduct = {
    id: -1,
};

function displayStorages(results) {
    console.log(results, "here!");
    var length = results.rows.length;
    var lstStorages = $("#storage_table");
    for (var i = 0; i < length; i++) {
        var storage = results.rows.item(i);
        var edit_btn =
            "<a href='#popupEdit' data-rel='popup'  data-position-to='window' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-edit ui-btn-inline ui-btn-b ui-btn-icon-notext' class='editBtn' >Edit storage</a>";
        var delete_btn =
            "<a href= '#popupDeleteDialog' data-rel= 'popup' data-position-to= 'window' data-transition= 'pop' class= 'ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-inline ui-btn-b ui-btn-icon-notext' class='deleteBtn' >Delete storage</a >";
        $("#storage_table tbody")
            .last()
            .after(
                `<tr><td class="ui-hidden-accessible">${storage._id}</></td><td>${i + 1}</td><td>${
                    storage.storage_type
                }</td><td>${storage.dimension}</td><td>${storage.adding_datetime}</td><td>${
                    storage.storage_feature
                }</td><td>${storage.price}</td><td>${
                    storage.reporter
                }</td><td>${edit_btn} ${delete_btn}</td></tr>;`,
            );
        lstStorages.on("tap", ".deleteBtn", function() {
            // https://stackoverflow.com/questions/14460421/get-the-contents-of-a-table-row-with-a-button-click
            var $item = $(this)
                .closest("tr") // Finds the closest row <tr>
                .find(".ui-hidden-accessible") // Gets a descendent with class="ui-hidden-accessible"
                .text(); // Retrieves the text within <td>
            //Set event for the list item
            $("#popupDeleteDialog").popup("open");
        });
    }
}

$(document).on("pagebeforeshow", "#list_storage", function() {
    databaseHandler.createDatabase();
    storageHandler.loadStorages(displayStorages);
});
