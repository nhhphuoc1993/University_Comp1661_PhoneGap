const storageHandler = {
    addStorage: function(
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
        notes,
        condition,
        shopDistance,
        publicTransport,
        imgURI,
    ) {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "INSERT INTO storage(storageType, dimension, addingDatetime, storageFeature, price, reporter, notes, condition, shopDistance, publicTransport, imgURI) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    storageType,
                    dimension,
                    addingDatetime,
                    storageFeature,
                    price,
                    reporter,
                    notes,
                    condition,
                    shopDistance,
                    publicTransport,
                    imgURI,
                ],
                function(tx, results) {
                    console.log("successfully add Storage!");
                    resetPageAddStorageInput();
                    changeToDetailPage(
                        storageType,
                        dimension,
                        addingDatetime,
                        storageFeature,
                        price,
                        reporter,
                        notes,
                        condition,
                        shopDistance,
                        publicTransport,
                        imgURI,
                    );
                },
                function(tx, error) {
                    console.log("add Storage error: " + error.message);
                    if (error.code === 6) {
                        alert(`This storage has already been added!`);
                    }
                },
            );
        });
    },
    loadStorages: function(displayStorages) {
        databaseHandler.db.readTransaction(function(tx) {
            tx.executeSql(
                "SELECT * FROM storage",
                [],
                function(tx, results) {
                    //Do the display
                    displayStorages(results);
                },
                function(tx, error) {
                    //TODO: Alert the message to user
                    console.log("Error while selecting the storages" + error.message);
                },
            );
        });
    },
    loadSpecificStorages: function(
        displayStorages,
        searchStorageType,
        searchDimensionFrom,
        searchDimensionTo,
        searchDateFrom,
        searchDateTo,
        searchStorageFeature,
        searchPriceFrom,
        searchPriceTo,
        searchReporter,
    ) {
        databaseHandler.db.readTransaction(function(tx) {
            let baseQuery = "SELECT * FROM storage WHERE";

            let searchStorageTypeQuery =
                searchStorageType == "" ? null : ` AND storageType LIKE "%${searchStorageType}%"`;

            baseQuery = !searchStorageTypeQuery ? baseQuery : baseQuery + searchStorageTypeQuery;

            let searchDimensionFromQuery = ` AND dimension >= ${searchDimensionFrom}`;

            baseQuery = baseQuery + searchDimensionFromQuery;

            let searchDimensionToQuery = ` AND dimension <= ${searchDimensionTo}`;

            baseQuery = baseQuery + searchDimensionToQuery;

            // let searchDateFromQuery =
            //     searchDateFrom == ""
            //         ? null
            //         : ` AND strftime('%Y-%m-%d', addingDatetime) >= ${searchDateFrom}`;

            let searchDateFromQuery =
                searchDateFrom == ""
                    ? null
                    : ` AND addingDatetime >= '${searchDateFrom}T00:00${getTimeZoneOffset()}'`;

            baseQuery = !searchDateFromQuery ? baseQuery : baseQuery + searchDateFromQuery;

            // let searchDateToQuery =
            //     searchDateTo == ""
            //         ? null
            //         : ` AND strftime('%Y-%m-%d', addingDatetime) <= ${searchDateTo}`;
            let searchDateToQuery =
                searchDateTo == ""
                    ? null
                    : ` AND addingDatetime <= '${searchDateTo}T23:59${getTimeZoneOffset()}'`;

            baseQuery = !searchDateToQuery ? baseQuery : baseQuery + searchDateToQuery;

            let searchStorageFeatureQuery =
                searchStorageFeature == ""
                    ? null
                    : ` AND storageFeature LIKE "%${searchStorageFeature}%"`;

            baseQuery = !searchStorageFeatureQuery
                ? baseQuery
                : baseQuery + searchStorageFeatureQuery;

            let searchPriceFromQuery = ` AND price >= ${searchPriceFrom}`;

            baseQuery = baseQuery + searchPriceFromQuery;

            let searchPriceToQuery = ` AND price <= ${searchPriceTo}`;

            baseQuery = baseQuery + searchPriceToQuery;

            let searchReporterQuery =
                searchReporter == "" ? null : ` AND reporter LIKE "%${searchReporter}%"`;

            baseQuery = !searchReporterQuery ? baseQuery : baseQuery + searchReporterQuery;

            baseQuery = baseQuery.replace("WHERE AND", "WHERE");

            tx.executeSql(
                baseQuery,
                [],
                function(tx, results) {
                    //Do the display
                    displayStorages(results);
                },
                function(tx, error) {
                    //TODO: Alert the message to user
                    console.log("Error while selecting the storages" + error.message);
                },
            );
        });
    },
    deleteStorage: function(storageType, dimension, storageFeature, price, reporter) {
        databaseHandler.db.transaction(function(tx) {
            console.log(storageType);
            tx.executeSql(
                "DELETE FROM storage WHERE storageType = ? AND dimension = ? AND storageFeature = ? AND price = ? AND reporter = ?",
                [storageType, dimension, storageFeature, price, reporter],
                function(tx, results) {
                    changeToHomePage();
                },
                function(tx, error) {
                    //TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                },
            );
        });
    },
    updateStorage: function(
        notes,
        condition,
        shopDistance,
        publicTransport,
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
        imgURI,
    ) {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "UPDATE storage SET notes=?, condition=?, shopDistance=?, publicTransport=?, imgURI=? WHERE storageType = ? AND dimension = ? AND storageFeature = ? AND price = ? AND reporter = ?",
                [
                    notes,
                    condition,
                    shopDistance,
                    publicTransport,
                    imgURI,
                    storageType,
                    dimension,
                    storageFeature,
                    price,
                    reporter,
                ],
                function(tx, result) {
                    changeToDetailPage(
                        storageType,
                        dimension,
                        addingDatetime,
                        storageFeature,
                        price,
                        reporter,
                        notes,
                        condition,
                        shopDistance,
                        publicTransport,
                        imgURI,
                    );
                },
                function(tx, error) {
                    //TODO: alert/display this message to user
                    console.log("Error updating Storage" + error.message);
                },
            );
        });
    },
    getMaxPrice: function() {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "SELECT MAX(price) FROM storage",
                [],
                function(tx, result) {
                    let price = !result.rows[0]["MAX(price)"]
                        ? 100
                        : result.rows[0]["MAX(price)"] + 100;

                    document.getElementById("pgSearchPriceFrom").max = price;
                    document.getElementById("pgSearchPriceTo").max = price;
                    document.getElementById("pgSearchPriceTo").value = price;
                },
                function(tx, error) {
                    //TODO: alert/display this message to user
                    console.log("Error get max price" + error.message);
                },
            );
        });
    },
    getMaxDimension: function() {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "SELECT MAX(dimension) FROM storage",
                [],
                function(tx, result) {
                    let dimension = !result.rows[0]["MAX(dimension)"]
                        ? 100
                        : result.rows[0]["MAX(dimension)"] + 100;

                    document.getElementById("pgSearchDimensionFrom").max = dimension;
                    document.getElementById("pgSearchDimensionTo").max = dimension;
                    document.getElementById("pgSearchDimensionTo").value = dimension;
                },
                function(tx, error) {
                    //TODO: alert/display this message to user
                    console.log("Error get max price" + error.message);
                },
            );
        });
    },
};
