import projects from "../models/projectModels.js"; // we count projects, so we need the model

const TOTAL_PETALS = 8; // the flower starts with 8 petals

const getFlower = async (req, res, next) => {
  try {
    // a petal falls for each project that is either:
    // 1) still pending and already past its deadline, or
    // 2) done, but finished after its deadline
    const missed = await projects.countDocuments({
      $or: [
        { status: "pending", deadline: { $lt: new Date() } },
        { status: "done", $expr: { $gt: ["$completedAt", "$deadline"] } },
      ],
    });

    // Math.max stops the count from going below 0
    const petalsLeft = Math.max(TOTAL_PETALS - missed, 0);

    // the mood tells the frontend how the flower should look
    let mood = "blooming";
    if (petalsLeft <= 3) mood = "dying";
    else if (petalsLeft < TOTAL_PETALS) mood = "wilting";

    return res.json({ totalPetals: TOTAL_PETALS, petalsLeft, missed, mood });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { getFlower };