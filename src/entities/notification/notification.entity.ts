import { NotificationType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user/user.entity';

@ObjectType()
export class NotificationEntity {
  @Field(() => ID)
  id: string;

  @Field(() => Boolean)
  read: boolean;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deleted?: Date;

  @Field(() => String)
  userId: string;

  @Field(() => UserEntity, { nullable: true })
  user?: UserEntity;
}
