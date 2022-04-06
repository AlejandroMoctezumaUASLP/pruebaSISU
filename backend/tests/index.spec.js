const app = require("../app");
const request = require("supertest");

describe("Route /servicio/paises", () => {
    describe("GET /servicio/paises", () => {
        // Esta prueba va a pasar debido a que, si se atiene exitosamente la
        // petición, se regresa un código de estatus 200
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/servicio/paises").send();
            expect(response.statusCode).toBe(200);
        })
    
        // Pero esta fallara debido a que el contenido de la petición se regresa
        // dentro de un objeto (el cual contiene un array)
        test("should respond with an array", async () => {
            const response = await request(app).get("/servicio/paises").send();
            expect(response.body).toBeInstanceOf(Array);
        })
    })
});

describe("Route /servicio/usuarios", () => {
    describe("GET /servicio/usuarios", () => {
        // Esta prueba va a pasar debido a que, si se atiene exitosamente la
        // petición, se regresa un código de estatus 200
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/servicio/usuarios").send();
            expect(response.statusCode).toBe(200);
        })
    
        // Pero esta fallara debido a que el contenido de la petición se regresa
        // dentro de un objeto (el cual contiene un array)
        test("should respond with an array", async () => {
            const response = await request(app).get("/servicio/usuarios").send();
            expect(response.body).toBeInstanceOf(Array);
        })
    })
});