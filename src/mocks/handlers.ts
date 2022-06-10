import { rest } from "msw";

// import { db } from "./db";

// export const handlers = [
//   // Create REST API request handlers based on
//   // the "task" database model.
//   ...db.task.toHandlers("rest")
// ];

export const handlers = [
  rest.post("/services", (req, res, ctx) => {
    // const { username } = req.body;
    // console.log(username);
    console.log(req);
    console.log(res);
    console.log(ctx);

    return res(
      ctx.json({
        sort: ["id", "name", "categoryId"],
        take: 10,
        skip: 10,
        filters: {
          fieldName: "id",
          type: "EQ",
          value: "5",
        },
        view: ["all", "deleted"],
        services: [
          {
            id: 1,
            name: "Leanne Graham",
            categoryId: { idCategories: 1, name: "Name1" },
            images: [],
            video: "",
            pricing: {
              changeTypeId: 
              // [
                { idType: 1, name: "Type1" },
                // { idType: 2, name: "Type2" },
                // { idType: 3, name: "Type3" },
              // ],
              quantity: 10,
              price: 100,
              UnitMeasureId: 
              // [
                { idUnitMeasure: 1, name: "UnitMeasure1" },
                // { idUnitMeasure: 2, name: "UnitMeasure2" },
                // { idUnitMeasure: 3, name: "UnitMeasure3" },
              // ],
            },
          },
        ],
      })
    );
  }),
];
