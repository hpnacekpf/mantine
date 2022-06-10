// import { random } from "faker";
import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  // A "task" model that describes what properties
  // each task has.
  // {
  //   id: primaryKey(random.uuid),
  //   title: random.words,
  //   isDone: Boolean
  // }
  task: 
  {
    // id: primaryKey(random.uuid),
    name: String,
    categoryId: String,
    images: Object,
    video: String,
    pricing: {
      changeTypeId: String,
      quantity: Number,
      price: Number,
      UnitMeasureId: String
    }
  }
});

// The default tasks created each time you refresh the page.
db.task.create({ name: "Name1", categoryId: "1" });
