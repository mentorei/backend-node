import { DegreeType } from '@prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MenteeEntity {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  goal?: string;

  @Field(() => String, { nullable: true })
  interestArea?: string;

  @Field(() => DegreeType, { nullable: true })
  degree?: DegreeType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
