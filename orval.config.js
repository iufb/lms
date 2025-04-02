
module.exports = {
    api: {
        input: "http://192.168.8.4:8000/api/v1/swagger/?format=openapi",
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
