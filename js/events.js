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
            console.log(event);
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
    worker.onmessage = function(event) {
        if (event.data.id === 8202) {
            let results = event.data.results;
            console.log(1);
            if (!results) {
                error({ message: event.data.error });
                return;
            }
            let res = generate_SQL_Statement(results, "2020-11-20", "2021-11-20");
            // editor.getDoc().setValue(createTree + res.join("") + "\nSELECT * FROM tree;");
        }
    };
    worker.postMessage({ id: 8202, action: 'exec', sql: joiningSQL });
}