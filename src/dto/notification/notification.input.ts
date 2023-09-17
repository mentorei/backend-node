import { InputType, Field, ID } from '@nestjs/graphql';
import { NotificationType, Prisma } from '@prisma/client';

import { UserEntity } from 'src/entities/user/user.entity';

@InputType()
export class NotificationInput implements Prisma.NotificationUncheckedCreateInput {
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
