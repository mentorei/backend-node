import { Field, InputType, Int } from '@nestjs/graphql';

import { OrderByEnum } from 'src/enums/order-by.enum';
import { SortingOrderEnum } from 'src/enums/sorting-order.enum';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => OrderByEnum, { nullable: true })
  orderBy?: OrderByEnum;

  @Field(() => SortingOrderEnum, { nullable: true })
  sortingOrder?: SortingOrderEnum;
}
