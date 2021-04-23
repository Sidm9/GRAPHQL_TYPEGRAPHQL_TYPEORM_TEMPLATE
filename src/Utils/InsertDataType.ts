import { InputType, Field } from "type-graphql";

@InputType()
export class InsertDataType {

    @Field()
    title: string;

    @Field({ nullable: true })
    description: string;
}
