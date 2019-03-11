// https://www.youtube.com/watch?v=vL2mFknpHnE&index=15&list=PLxyOsIbHSrxmbXmqJ4WmI0-8SbrcM9fN8

$(document).on("ready", function() {
    databaseHandler.createDatabase();
    storageHandler.loadStorages(displayStorages);
});

function addFormSubmit() {
    var storageType = document.getElementById("storageType").value;
    var dimension = document.getElementById("dimension").value;
    var datetime = document.getElementById("addingDatetime").value;
    var storageFeature = document.getElementById("storageFeature").value;
    var price = document.getElementById("price").value;
    var notes = document.getElementById("notes").value;
    var reporter = document.getElementById("reporter").value;

    if (
        !storageType ||
        !dimension ||
        !addingDatetime ||
        !storageFeature ||
        !price ||
        !reporter
    ) {
        // storage type alert
        var storageTypeAlert = null;
        if (storageType === "") {
            storageTypeAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById(
            "storageTypeAlert"
        ).innerHTML = storageTypeAlert;

        // dimension alert
        var dimensionAlert = null;
        if (dimension === "") {
            dimensionAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("dimensionAlert").innerHTML = dimensionAlert;

        // datetime alert
        var datetimeAlert = null;
        if (datetime === "") {
            datetimeAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("datetimeAlert").innerHTML = datetimeAlert;

        // storage feature alert
        var storageFeatureAlert = null;
        if (storageFeature === "") {
            storageFeatureAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById(
            "storageFeatureAlert"
        ).innerHTML = storageFeatureAlert;

        // price alert
        var priceAlert = null;
        if (price === "") {
            priceAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("priceAlert").innerHTML = priceAlert;

        // notes alert
        var notesAlert = null;
        if (notes === "") {
            notesAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("notesAlert").innerHTML = notesAlert;

        // reporter alert
        var reporterAlert = null;
        if (reporter === "") {
            reporterAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("reporterAlert").innerHTML = reporterAlert;
    } else {
        console.log(
            `Storage type: ${storageType}; Dimension: ${dimension}, Datetime of adding storage: ${
                addingDatetime.value
            }, storageFeature: ${storageFeature}, Price: ${price}, Reporter: ${reporter}, Notes: ${notes}`,
            "storage"
        );
        storageHandler.addStorage(
            storageType,
            dimension,
            addingDatetime.value,
            storageFeature,
            price,
            reporter,
            notes
        );
    }
}

var currentStorage = {
    id: -1
};

function displayStorages(results) {
    var length = results.rows.length;
    var lstStorages = $("#tableStorage");
    for (var i = 0; i < length; i++) {
        var storage = results.rows.item(i);
        var editBtn =
            "<a href='#popupEdit' data-rel='popup'  data-position-to='window' data-transition='pop' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-edit ui-btn-inline ui-btn-b ui-btn-icon-notext editBtn' >Edit storage</a>";
        var deleteBtn =
            "<a href= '#popupDeleteDialog' data-rel= 'popup' data-position-to= 'window' data-transition= 'pop' class= 'ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-inline ui-btn-b ui-btn-icon-notext deleteBtn' >Delete storage</a >";
        $("#tableStorage tbody")
            .last()
            .after(
                `<tr><td class="ui-hidden-accessible">${
                    storage._id
                }</></td><td>${i + 1}</td><td>${storage.storageType}</td><td>${
                    storage.dimension
                }</td><td>${storage.addingDatetime}</td><td>${
                    storage.storageFeature
                }</td><td>${storage.price}</td><td>${
                    storage.reporter
                }</td><td>${editBtn} ${deleteBtn}</td></tr>;`
            );
        lstStorages.on("tap", ".deleteBtn", function() {
            var selectedStorageId = $(this)
                .closest("tr") // Finds the closest row <tr>
                .find(".ui-hidden-accessible") // Gets a descendent with class="ui-hidden-accessible"
                .text(); // Retrieves the text within <td>
            currentStorage.id = selectedStorageId;
            //Set event for the list item
            $("#popupDeleteDialog").popup("open");
        });
    }
}

function deleteStorage() {
    storageHandler.deleteStorage(currentStorage.id);
    $("#tableStorage").empty(); //Clean the old data
    storageHandler.loadStorages(displayStorages);
    $("#popupDeleteDialog").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function() {
    $("#txtNewName").val(currentProduct.name);
    $("#txtNewQuantity").val(currentProduct.quantity);
});

function updateStorage() {
    var newName = $("#txtNewName").val();
    var newQuantity = $("#txtNewQuantity").val();
    storageHandler.updateStorage(currentStorage.id, notes);
    $("#updatedialog").dialog("close");
}
