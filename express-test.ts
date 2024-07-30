import request from "supertest";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { INestApplication } from "@nestjs/common";

describe("Normal hello world test with express", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const { AppModule } = await import("./AppModule.ts");
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();
        app = moduleRef.createNestApplication(new ExpressAdapter());
        await app.init();
    });

    it(`expects to get hello world`, () => {
        request(app.getHttpServer())
            .get("/")
            .expect(200)
            .expect("Hello World!");
    });

    afterAll(async () => {
        await app.close();
    });
});
