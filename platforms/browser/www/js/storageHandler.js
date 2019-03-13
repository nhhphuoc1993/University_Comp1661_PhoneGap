var storageHandler = {
    addStorage: function(
        storageType,
        dimension,
        addingDatetime,
        storageFeature,
        price,
        reporter,
        notes,
    ) {
        databaseHandler.db.transaction(
            function(tx) {
                tx.executeSql(
                    "insert into storage(storageType, dimension, addingDatetime, storageFeature, price, reporter, notes) values(?, ?, ?, ?, ?, ?, ?)",
                    [
                        storageType,
                        dimension,
                        addingDatetime,
                        storageFeature,
                        price,
                        reporter,
                        notes,
                    ],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log("add Storage error: " + error.message);
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
    deleteStorage: function(_id) {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "delete from storage where _id = ?",
                [_id],
                function(tx, results) {},
                function(tx, error) {
                    //TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                },
            );
        });
    },
    updateStorage: function(_id, notes) {
        databaseHandler.db.transaction(function(tx) {
            tx.executeSql(
                "update storage set notes=? where _id = ?",
                [notes, _id],
                function(tx, result) {},
                function(tx, error) {
                    //TODO: alert/display this message to user
                    console.log("Error updating Storage" + error.message);
                },
            );
        });
    },
};
