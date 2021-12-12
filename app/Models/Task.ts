import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Subject from "./Subject";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public taskName: string;

  @column()
  public description: string;

  @column.dateTime({
    serialize: (value) => value.toFormat("dd LLL yyyy"),
  })
  public startDate: DateTime;

  @column.dateTime({
    serialize: (value) => value.toFormat("dd LLL yyyy"),
  })
  public dueDate: DateTime;

  @column()
  public isCompleted: boolean;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => User)
  public user: HasOne<typeof User>;

  @hasOne(() => Subject)
  public subject: HasOne<typeof Subject>;
}
