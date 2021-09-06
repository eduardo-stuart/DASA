import swaggerJSDoc from "swagger-jsdoc"

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DASA ─ Desafio de Programação",
      version: "1.0.0",
      description: "Projeto backend desenvolvido usando as tecnologias Node.js, Express.js & MongoDB.",
      contact: {
        name: 'Eduardo Stuart',
        url: 'https://eduardostuart.pro.br',
      }
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`
      }
    ],
  },
  apis: [
    "./controllers/**.ts"
  ]
}

export default swaggerJSDoc(swaggerOptions)