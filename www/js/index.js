$(document).on("ready", function() {
    databaseHandler.createDatabase();
});

function addStorage() {
    let storageType = $("#pgAddStorageType").val();
    let dimension = $("#pgAddDimension").val();
    let addingDatetime = $("#pgAddDatetime").val();
    let storageFeature = $("#pgAddStorageFeature").val();
    let price = $("#pgAddPrice").val();
    let reporter = $("#pgAddReporter").val();
    let notes = $("#pgAddNotes").val();

    if (!storageType || !dimension || !addingDatetime || !storageFeature || !price || !reporter) {
        event.preventDefault();

        // storage type alert
        var storageTypeAlert = null;
        if (storageType === "") {
            storageTypeAlert = "This field cannot be empty!";
        }
        $("#pgAddStorageTypeAlert").text(storageTypeAlert);

        // dimension alert
        var dimensionAlert = null;
        if (dimension === "") {
            dimensionAlert = "This field cannot be empty!";
        }
        $("#pgAddDimensionAlert").text(dimensionAlert);

        // datetime alert
        var datetimeAlert = null;
        if (addingDatetime === "") {
            datetimeAlert = "This field cannot be empty!";
        }
        $("#pgAddDatetimeAlert").text(datetimeAlert);

        // storage feature alert
        var storageFeatureAlert = null;
        if (storageFeature === "") {
            storageFeatureAlert = "This field cannot be empty!";
        }
        $("#pgAddStorageFeatureAlert").text(storageFeatureAlert);

        // price alert
        var priceAlert = null;
        if (price === "") {
            priceAlert = "This field cannot be empty!";
        }
        $("#pgAddPriceAlert").text(priceAlert);

        // reporter alert
        var reporterAlert = null;
        if (reporter === "") {
            reporterAlert = "This field cannot be empty!";
        }
        $("#pgAddReporterAlert").text(reporterAlert);
    } else {
        console.log(
            `Storage type: ${storageType}; Dimension: ${dimension}, Datetime of adding storage: ${
                addingDatetime.value
            }, storageFeature: ${storageFeature}, Price: ${price}, Reporter: ${reporter}, Notes: ${notes}`,
            "storage - add",
        );

        storageHandler.addStorage(
            storageType,
            dimension,
            addingDatetime,
            storageFeature,
            price,
            reporter,
            notes,
        );

        $(`#pgAddStorageType option[value='']`).attr("selected", "selected");
        $("#pgAddStorageType").selectmenu("refresh");

        $("#pgAddDimension").val(null);
        $("#pgAddDatetime").val(null);
        $("#pgAddStorageFeature").val(null);
        $("#pgAddPrice").val(null);
        $("#pgAddReporter").val(null);
        $("#pgAddNotes").val(null);
    }
}

var currentStorage = {
    id: -1,
    storageType: "",
    dimension: null,
    addingDatetime: null,
    storageFeature: null,
    price: null,
    reporter: null,
    notes: null,
};

function displayProducts(results) {}
