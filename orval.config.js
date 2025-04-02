
module.exports = {
    api: {
        input: "http://192.168.8.4:8000/api/v1/swagger/?format=openapi",
        output: {
            target: "./src/shared/api/generated.ts",
            client: "react-query",
            baseUrl: "http://192.168.8.4:8000/api/v1"
        },
    },
};
