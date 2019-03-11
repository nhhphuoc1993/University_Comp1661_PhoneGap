var storageHandler = {
    addStorage: function(
        storage_type,
        dimension,
        adding_datetime,
        storage_feature,
        price,
        reporter,
        notes,
    ) {
        databaseHandler.db.transaction(
            function(tx) {
                tx.executeSql(
                    "insert into storage(storage_type, dimension, adding_datetime, storage_feature, price, reporter, notes) values(?, ?, ?, ?, ?, ?, ?)",
                    [
                        storage_type,
                        dimension,
                        adding_datetime,
                        storage_feature,
                        price,
                        reporter,
                        notes,
                    ],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log("add product error: " + error.message);
                    },
                );
            },
            function(error) {},
            function() {},
        );
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
};
