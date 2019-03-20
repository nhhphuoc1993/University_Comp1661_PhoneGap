var dbName = "Comp_1661";
var dbVersion = "1.0";
var dbDescribe = "Comp 1661 Web SQL Database";
var dbSize = 1 * (1024 * 1024);

let databaseHandler = {
    db: null,
    createDatabase: function() {
        this.db = window.openDatabase(dbName, dbVersion, dbDescribe, dbSize);
        this.db.transaction(
            function(tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists storage(_id integer primary key, storageType text, dimension real, addingDatetime numeric, storageFeature text, price real, reporter text, notes text, condition text, shopDistance numeric, publicTransport text)",
                    [],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log(
                            "Error while creating the table: " + error.message
                        );
                    }
                );
            },
            function(error) {
                console.log("Transaction error: " + error.message);
            },
            function() {
                console.log(
                    "Create or load DB transaction completed successfully"
                );
            }
        );
    }
};
