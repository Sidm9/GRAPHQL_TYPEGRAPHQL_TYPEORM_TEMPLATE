import { InsertDataType } from "../Utils/InsertDataType";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { Basic } from "../Entity/Basic";

@Resolver()
export class CRUD {

    @Query(() => [Basic])
    async getAll(): Promise<Basic[]> {

        const ex = getManager();
        const getall = await ex.find(Basic, {});

        return getall;
    }


    @Query(() => Basic, { nullable: true })
    async getOne(
        @Arg("id", () => Int)
        id: number

    ): Promise<Basic | undefined> {

        return Basic.findOne(id);
    }


    @Mutation(() => Boolean)
    async deleteOne(
        @Arg("id", () => Int)
        id: number

    ): Promise<boolean> {

        await Basic.delete(id);
        return true
    }

    @Mutation(() => Basic)
    async updateOne(
        @Arg("data") data: InsertDataType,
        @Arg("id", () => Int) id: number
    ): Promise<Basic | undefined> {

        await Basic.update(
            id, { title: data.title, description: data.description }
        );

        return Basic.findOne(id)
    }

    @Mutation(() => Basic)
    async addOne(@Arg("data") { title, description }: InsertDataType)
        : Promise<Basic> {

        const updateData = await Basic.create(
            {
                title,
                description
            }
        ).save();

        return updateData

    }

}



