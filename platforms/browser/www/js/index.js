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
        // document.getElementById("pgAddStorageTypeAlert").innerHTML = storageTypeAlert;

        // dimension alert
        var dimensionAlert = null;
        if (dimension === "") {
            dimensionAlert = "This field cannot be empty!";
        }
        document.getElementById("pgAddDimensionAlert").innerHTML = dimensionAlert;

        // datetime alert
        var datetimeAlert = null;
        if (addingDatetime === "") {
            datetimeAlert = "This field cannot be empty!";
        }
        document.getElementById("pgAddDatetimeAlert").innerHTML = datetimeAlert;

        // storage feature alert
        var storageFeatureAlert = null;
        if (storageFeature === "") {
            storageFeatureAlert = "This field cannot be empty!";
        }
        document.getElementById("pgAddStorageFeatureAlert").innerHTML = storageFeatureAlert;

        // price alert
        var priceAlert = null;
        if (price === "") {
            priceAlert = "This field cannot be empty!";
        }
        document.getElementById("pgAddPriceAlert").innerHTML = priceAlert;

        // reporter alert
        var reporterAlert = null;
        if (reporter === "") {
            reporterAlert = "This field cannot be empty!";
        }
        document.getElementById("pgAddReporterAlert").innerHTML = reporterAlert;

        // notes alert
        var notesAlert = null;
        if (notes === "") {
            notesAlert = "This field cannot be empty!";
        }
        document.getElementById("pgAddNotesAlert").innerHTML = notesAlert;
    } else {
        var r = confirm("Name: " + name + "\n" + "Quantity: " + quantity);
        if (r == true) {
            productHandler.addProduct(name, quantity);
            $("#txtName").val("");
            $("#txtQuantity").val("");
        }
    }
}
