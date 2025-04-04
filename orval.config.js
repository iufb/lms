
module.exports = {
    api: {
        input: "https://1178.foxminded.space/api/v1/swagger/?format=openapi",
        output: {
            target: "./src/shared/api/generated.ts",
            client: "react-query",
            override: {
                mutator: {
                    path: './src/shared/api/custom-instance.ts',
                    name: 'customInstance',
                },
            },
        },
    }
};
