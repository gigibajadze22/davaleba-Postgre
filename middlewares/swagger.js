import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Products API",
            description: "A simple products API"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server"
            }
        ],
    },
    apis: ['./swagger/*.js']
}

const specs = swaggerJSDoc(options)

export default specs