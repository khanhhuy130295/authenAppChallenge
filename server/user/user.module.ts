import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserSchema} from './schema/user.schema'
import {USER_MODEL} from './user.constant'
import { MongooseModule } from '../mongoose';


@Module({
  imports:[
    MongooseModule.useSchema([
      {name: USER_MODEL, schema: UserSchema}
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
