import { z } from "zod";

// the rules for creating a project
const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  deadline: z.coerce.date({ message: "Deadline must be a valid date" }),
});

export const validateCreateProject = (req, res, next) => {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    // send back every problem found, in a readable list
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((i) => ({ field: i.path[0], message: i.message })),
    });
  }

  req.body = result.data; // replace the body with the cleaned-up version
  next();                 // validation passed, move on to the controller
};