
module.exports = {
    api: {
        input: "./test.yaml",
        output: {
            target: "./src/api/generated.ts",
            client: "fetch",
        },
    },
};
