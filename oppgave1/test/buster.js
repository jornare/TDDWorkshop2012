config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "node", // or "buster"
    sources: [
        "src/**/*.js"
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
            ]
        }
    }
}
