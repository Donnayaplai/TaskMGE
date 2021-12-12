import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Task from "./Task";

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public subjectName: string;

  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>;
}
