async function loadStandard() {
    // 
    await loadInitData();
    document.getElementById("genSQL").disabled = false;
    let base = genSQLForBaseData() +
        "SELECT * FROM channel;\n" +
        "SELECT * FROM product;\n" +
        "SELECT * FROM property;\n";
    let genCodeSQL = "";
    genCodeSQL += genSQLFromCodeId(getCodeId(initialData.csvDataOfChannel, "channel"));
    genCodeSQL += genSQLFromCodeId(getCodeId(initialData.csvDataOfProduct, "attribute"));
    genCodeSQL += genSQLFromCodeId(getCodeId(initialData.csvDataOfPropertise, "property"));
    genCodeSQL += "SELECT * FROM code;"
    editor.getDoc().setValue(createCode + base + genCodeSQL);

    worker.onmessage = function(event) {
        if (event.data.id === 8201) {
            let results = event.data.results;
            if (!results) {
                error({ message: event.data.error });
                return;
            }
        }
    };
    worker.postMessage({ id: 8201, action: 'exec', sql: editor.getValue() });
    // execute(editor.getValue());
    // editor.getDoc().setValue(genCodeSQL);
    // execute(editor.getValue());
}

function generateSQL() {
    let res;
    worker.onmessage = function(event) {
        if (event.data.id === 8202) {
            let results = event.data.results;
            if (!results) {
                error({ message: event.data.error });
                return;
            }
            res = generate_SQL_Statement(results, "2020-02-01", "2020-02-02");
            // editor.getDoc().setValue(createTree + res + "\nSELECT * FROM tree;");
        }
    };
    worker.postMessage({ id: 8202, action: 'exec', sql: joiningSQL });
    setTimeout(function() {
        console.log(res);
    }, 10000);
}