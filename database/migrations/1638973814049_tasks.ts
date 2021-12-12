import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Tasks extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("task_name", 100).notNullable();
      table.string("description", 255).nullable();
      table.timestamp("start_date").nullable();
      table.timestamp("due_date").nullable();
      table.boolean("is_completed").defaultTo(false);
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
