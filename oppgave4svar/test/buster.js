config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser",
    libs: [
        "lib/underscore-min.js",
        "lib/knockout-2.1.0.js",
        "lib/jquery-1.8.0.min.js"
    ],
    sources: [
        "lib/oppgave4ViewModel.js"
    ],
    tests: [
        "test/*-test.js"
    ],
    extensions: [require("buster-lint")],
    "buster-lint": {
    linterOptions: {
            maxlen:150,
            jquery:true,
            vars:true,
            nomen:true,
            node:true,
            predef: [
                "buster",
                "refute",
                "assert",
                "ko",
                "AppViewModel",
            ]
        },
    excludes: [
            "jquery",
            "knockout",
            "sinon"]
}
}
