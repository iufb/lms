
module.exports = {
    api: {
        input: "./test.yaml",
        output: {
            target: "./src/shared/api/generated.ts",
            client: "fetch",
        },
    },
};
