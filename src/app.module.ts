import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {CategoryModule} from './category/category.module';
import {AuthModule} from './auth/auth.module';
import {TransactionModule} from './transaction/transaction.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        UserModule,
        CategoryModule,
        AuthModule,
        TransactionModule,
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
                entities: [__dirname + '/**/*.entity{.js, .ts}']
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
