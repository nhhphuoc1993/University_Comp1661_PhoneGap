// $(document).on("ready", function() {
//     databaseHandler.createDatabase();
//     storageHandler.loadStorages(displayStorages);
// });

function addFormSubmit() {
    var storageType = document.getElementById("pgAddStorageType").value;
    var dimension = document.getElementById("pgAddDimension").value;
    var addingDatetime = document.getElementById("pgAddDatetime").value;
    var storageFeature = document.getElementById("pgAddStorageFeature").value;
    var price = document.getElementById("pgAddPrice").value;
    var reporter = document.getElementById("pgAddReporter").value;
    var notes = document.getElementById("pgAddNotes").value;

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
            "pgAddStorageTypeAlert"
        ).innerHTML = storageTypeAlert;

        // dimension alert
        var dimensionAlert = null;
        if (dimension === "") {
            dimensionAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById(
            "pgAddDimensionAlert"
        ).innerHTML = dimensionAlert;

        // datetime alert
        var datetimeAlert = null;
        if (addingDatetime === "") {
            datetimeAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("pgAddDatetimeAlert").innerHTML = datetimeAlert;

        // storage feature alert
        var storageFeatureAlert = null;
        if (storageFeature === "") {
            storageFeatureAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById(
            "pgAddStorageFeatureAlert"
        ).innerHTML = storageFeatureAlert;

        // price alert
        var priceAlert = null;
        if (price === "") {
            priceAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("pgAddPriceAlert").innerHTML = priceAlert;

        // reporter alert
        var reporterAlert = null;
        if (reporter === "") {
            reporterAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("pgAddReporterAlert").innerHTML = reporterAlert;

        // notes alert
        var notesAlert = null;
        if (notes === "") {
            notesAlert = "This field cannot be empty!";
            event.preventDefault();
        }
        document.getElementById("pgAddNotesAlert").innerHTML = notesAlert;
    } else {
        console.log(
            `Storage type: ${storageType}; Dimension: ${dimension}, Datetime of adding storage: ${
                addingDatetime.value
            }, storageFeature: ${storageFeature}, Price: ${price}, Reporter: ${reporter}, Notes: ${notes}`,
            "storage - add"
        );

        storageHandler.addStorage(
            storageType,
            dimension,
            addingDatetime,
            storageFeature,
            price,
            reporter,
            notes
        );
    }
}

var currentStorage = {
    id: -1,
    storageType: "",
    dimension: -1,
    addingDatetime: "",
    storageFeature: "",
    price: -1,
    reporter: "",
    notes: ""
};

function displayStorages(results) {
    var length = results.rows.length;
    var lstStorages = $("#tableStorage tbody");
    lstStorages.empty();
    for (var i = 0; i < length; i++) {
        var storage = results.rows.item(i);
        var editBtn = `<a href="./edit_page.html" class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-edit ui-btn-inline ui-btn-b ui-btn-icon-notext btnEdit' >Edit storage</a>`;
        var deleteBtn =
            "<a href= '#popupDeleteDialog' data-rel= 'popup' data-position-to= 'window' data-transition= 'pop' class= 'ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-inline ui-btn-b ui-btn-icon-notext btnDelete' >Delete storage</a >";
        lstStorages.append(
            `<tr><td class="ui-hidden-accessible trStorageId" >${
                storage._id
            }</></td><td>${i + 1}</td><td class="trStorageType">${
                storage.storageType
            }</td><td class="trDimension">${
                storage.dimension
            }</td><td class="trAddingDatetime">${
                storage.addingDatetime
            }</td><td class="trStorageFeature">${
                storage.storageFeature
            }</td><td class="trPrice">${
                storage.price
            }</td><td class="trReporter">${
                storage.reporter
            }</td><td class="ui-hidden-accessible trNotes">${
                storage.notes
            }</td><td>${editBtn}${deleteBtn}</td></tr>;`
        );
    }

    lstStorages.on("vclick", ".btnDelete", function() {
        var selectedStorageId = $(this)
            .closest("tr") // Finds the closest row <tr>
            .find(".trStorageId") // Gets a descendent with class="trStorageId"
            .text(); // Retrieves the text within <td>
        currentStorage.id = selectedStorageId;
        console.log(currentStorage.id, "btnDelete-id");
    });

    lstStorages.on("vclick", ".btnEdit", function() {
        var selectedStorageId = $(this)
            .closest("tr") // Finds the closest row <tr>
            .find(".trStorageId") // Gets a descendent with class="trStorageId"
            .text(); // Retrieves the text within <td>
        currentStorage.id = selectedStorageId;

        var selectedStorageType = $(this)
            .closest("tr")
            .find(".trStorageType")
            .text();
        currentStorage.storageType = selectedStorageType;

        var selectedDimension = $(this)
            .closest("tr")
            .find(".trDimension")
            .text();
        currentStorage.dimension = selectedDimension;

        var selectedAddingDatetime = $(this)
            .closest("tr")
            .find(".trAddingDatetime")
            .text();
        currentStorage.addingDatetime = selectedAddingDatetime;

        var selectedStorageFeature = $(this)
            .closest("tr")
            .find(".trStorageFeature")
            .text();
        currentStorage.storageFeature = selectedStorageFeature;

        var selectedPrice = $(this)
            .closest("tr")
            .find(".trPrice")
            .text();
        currentStorage.price = selectedPrice;

        var selectedReporter = $(this)
            .closest("tr")
            .find(".trReporter")
            .text();
        currentStorage.reporter = selectedReporter;

        var selectedNotes = $(this)
            .closest("tr")
            .find(".trNotes")
            .text();
        currentStorage.notes = selectedNotes;
    });

    $("#pgListStorage").bind("pageinit", function() {
        lstStorages.listview("refresh");
    });
}

$(document).on("pagebeforeshow", "#pgListStorage", function() {
    databaseHandler.createDatabase();
    storageHandler.loadStorages(displayStorages);
});

$(document).on("pagebeforeshow", "#pgUpdateStorage", function() {
    $(
        `#pgUpdateStorageType option[value='${currentStorage.storageType}']`
    ).attr("selected", "selected");
    $("#pgUpdateStorageType").selectmenu("refresh");

    $("#pgUpdateDimension").val(currentStorage.dimension);
    $("#pgUpdateDatetime").val(currentStorage.addingDatetime);
    $("#pgUpdateStorageFeature").val(currentStorage.storageFeature);
    $("#pgUpdatePrice").val(currentStorage.price);
    $("#pgUpdateReporter").val(currentStorage.reporter);
    $("#pgUpdateNotes").val(currentStorage.notes);
});

function deleteStorage() {
    storageHandler.deleteStorage(currentStorage.id);
    storageHandler.loadStorages(displayStorages);
    $("#popupDeleteDialog").popup("close");
}

function updateStorage() {
    var newNotes = $("#pgUpdateNotes").val();
    storageHandler.updateStorage(currentStorage.id, newNotes);
}
