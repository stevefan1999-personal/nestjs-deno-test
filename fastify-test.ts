import request from "supertest";
import { Test } from "@nestjs/testing";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import {
    FastifyAdapter,
    NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { assertEquals } from "@std/assert";
import { INestApplication } from "@nestjs/common";

describe("Normal hello world test with Fastify", () => {
    let app: NestFastifyApplication;

    beforeAll(async () => {
        const { AppModule } = await import("./AppModule.ts");
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();
        app = moduleRef.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter() as any,
        );
        await app.init();
        await app.getHttpAdapter().getInstance().ready();
    });

    it(`expects to get hello world`, async () => {
        const { payload, statusCode } = await app.inject({
            method: "GET",
            url: "/",
        });

        assertEquals(statusCode, 200);
        assertEquals(payload, "Hello World!");
    });

    afterAll(async () => {
        await app.close();
    });
});

describe("Normal hello world test with Fastify but with supertest", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const { AppModule } = await import("./AppModule.ts");
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();
        app = moduleRef.createNestApplication(new FastifyAdapter() as any);
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
