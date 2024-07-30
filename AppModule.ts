import { Module } from "@nestjs/common";
import { HelloController } from "./HelloController.ts";
import { HelloService } from "./HelloService.ts";

@Module({
    providers: [HelloService],
    controllers: [HelloController],
})
export class AppModule {
}
