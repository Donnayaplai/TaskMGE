import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/subjects", "SubjectsController.allSubject").as("subject.index");
  Route.get("/subjects/add", "SubjectsController.addSubject").as("subject.add");
  Route.post("/subjects/new", "SubjectsController.newSubject").as(
    "subject.new"
  );
  Route.get("/subjects/:id/edit", "SubjectsController.editSubject").as(
    "subject.edit"
  );
  Route.post("/subjects/:id/update", "SubjectsController.updateSubject").as(
    "subject.update"
  );
  Route.get("/subjects/:id/delete", "SubjectsController.deleteSubject").as(
    "subject.delete"
  );
}).middleware("auth");
