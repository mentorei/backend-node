import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterMentorInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => String, { nullable: true })
  softSkillId?: string;

  @Field(() => String, { nullable: true })
  hardSkillId?: string;
}
