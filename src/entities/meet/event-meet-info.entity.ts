import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EventMeetInfo {
  @Field(() => ID, { nullable: false })
  menteeId: string;

  @Field(() => ID, { nullable: false })
  mentorId: string;

  @Field(() => String, { nullable: false })
  startMeetDateTime: string;

  @Field(() => String, { nullable: false })
  endMeetDateTime: string;
}
