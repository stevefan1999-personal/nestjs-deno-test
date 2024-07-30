import request from "supertest";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { INestApplication } from "@nestjs/common";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

describe("Normal hello world test", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const { AppModule } = await import("./AppModule.ts");
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();
        app = moduleRef.createNestApplication();
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

describe("Normal hello world test with fastify", () => {
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

describe("Normal GraphQL test with Apollo", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                GraphQLModule.forRoot<ApolloDriverConfig>({
                    driver: ApolloDriver,
                }),
            ],
        })
            .compile();
        app = moduleRef.createNestApplication(new ExpressAdapter());
        await app.init();
    });

    it(`expects to access /graphql endpoint`, () => {
        request(app.getHttpServer())
            .get("/graphql")
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});

describe("Normal GraphQL test with Mercurius", () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                GraphQLModule.forRoot<MercuriusDriverConfig>({
                    driver: MercuriusDriver,
                }),
            ],
        })
            .compile();
        app = moduleRef.createNestApplication(new FastifyAdapter() as any);
        await app.init();
    });

    it(`expects to access /graphql endpoint`, () => {
        request(app.getHttpServer())
            .get("/graphql")
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
