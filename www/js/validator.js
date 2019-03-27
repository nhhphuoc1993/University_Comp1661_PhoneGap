let validator = {
    validateAddStorageForm: function(
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
    ) {
        let result = true;

        const emptyAlert = "This field cannot be empty!";
        const invalidDateAlert = "Invalid datetime!";
        let pgAddStorageTypeAlert = "";
        let pgAddDimensionAlert = "";
        let pgAddDatetimeAlert = "";
        let pgAddStorageFeatureAlert = "";
        let pgAddPriceAlert = "";
        let pgAddReporterAlert = "";

        if (!storageType) {
            pgAddStorageTypeAlert = emptyAlert;
            result = false;
        }

        if (!dimension) {
            pgAddDimensionAlert = emptyAlert;
            result = false;
        }

        if (!addingDatetime) {
            pgAddDatetimeAlert = emptyAlert;
            result = false;
        } else {
            if (
                addingDatetime.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/g) === null ||
                new Date(addingDatetime) > new Date()
            ) {
                pgAddDatetimeAlert = invalidDateAlert;
                result = false;
            }
        }

        if (!storageFeature) {
            pgAddStorageFeatureAlert = emptyAlert;
            result = false;
        }

        if (!price) {
            pgAddPriceAlert = emptyAlert;
            result = false;
        }

        if (!reporter) {
            pgAddReporterAlert = emptyAlert;
            result = false;
        }

        $("#pgAddStorageTypeAlert").text(pgAddStorageTypeAlert);
        $("#pgAddDimensionAlert").text(pgAddDimensionAlert);
        $("#pgAddDatetimeAlert").text(pgAddDatetimeAlert);
        $("#pgAddStorageFeatureAlert").text(pgAddStorageFeatureAlert);
        $("#pgAddPriceAlert").text(pgAddPriceAlert);
        $("#pgAddReporterAlert").text(pgAddReporterAlert);

        return result;
    },
};
