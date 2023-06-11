import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EventMeetInfo } from 'src/entities/meet/event-meet-info.entity';
import { MeetService } from 'src/services/meet/meet.service';

@Resolver()
export class MeetResolver {
  constructor(private readonly $meet: MeetService) {}

  @Mutation(() => any, { name: 'createMeet' })
  public async createMeet(
    @Args('menteeId', { type: () => String }) menteeId: string,
    @Args('mentorId', { type: () => String }) mentorId: string,
    @Args('startMeetDateTime', { type: () => String }) startMeetDateTime: string,
    @Args('endMeetDateTime', { type: () => String }) endMeetDateTime: string
  ): Promise<any> {
    const eventMeetInfo = new EventMeetInfo();
    eventMeetInfo.menteeId = menteeId;
    eventMeetInfo.mentorId = mentorId;
    eventMeetInfo.startMeetDateTime = startMeetDateTime;
    eventMeetInfo.endMeetDateTime = endMeetDateTime;

    return this.$meet.createMeetMentor(eventMeetInfo);
  }

  //TODO: Criar Query para fazer a geração do token de acesso ao calendario
}
