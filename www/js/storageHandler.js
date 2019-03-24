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
                "select * from storage",
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
    deleteStorage: function(
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
    ) {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "DELETE FROM storage WHERE storageType = ? AND dimension = ? AND addingDatetime = ? AND storageFeature = ? AND price = ? AND reporter = ?",
                [storageType, dimension, addingDatetime, storageFeature, price, reporter],
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
    ) {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "UPDATE storage SET notes=?, condition=?, shopDistance=?, publicTransport=? WHERE storageType = ? AND dimension = ? AND addingDatetime = ? AND storageFeature = ? AND price = ? AND reporter = ?",
                [
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
                    );
                },
                function(tx, error) {
                    //TODO: alert/display this message to user
                    console.log("Error updating Storage" + error.message);
                },
            );
        });
    },
};
