import Patient from "../models/Patient.js";

export const addPatient = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Patient name is required" });
    }

    const lastPatient = await Patient.findOne().sort({ tokenNumber: -1 });

    const tokenNumber = lastPatient ? lastPatient.tokenNumber + 1 : 1;

    const patient = await Patient.create({
      name,
      tokenNumber,
      status: "waiting",
    });

    const io = req.app.get("io");
    io.emit("queueUpdated");

    res.status(201).json({
      message: "Patient added successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add patient",
      error: error.message,
    });
  }
};

export const getQueue = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ tokenNumber: 1 });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch queue",
      error: error.message,
    });
  }
};

export const callNextPatient = async (req, res) => {
  try {
    const currentServing = await Patient.findOne({ status: "serving" });

    if (currentServing) {
      currentServing.status = "completed";
      await currentServing.save();
    }

    const nextPatient = await Patient.findOne({ status: "waiting" }).sort({
      tokenNumber: 1,
    });

    if (!nextPatient) {
      return res.status(404).json({
        message: "No patients waiting in queue",
      });
    }

    nextPatient.status = "serving";
    await nextPatient.save();

    const io = req.app.get("io");
    io.emit("queueUpdated");
    io.emit("currentTokenUpdated", nextPatient);

    res.status(200).json({
      message: "Next patient called",
      patient: nextPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to call next patient",
      error: error.message,
    });
  }
};

export const completeCurrentPatient = async (req, res) => {
  try {
    const currentServing = await Patient.findOne({ status: "serving" });

    if (!currentServing) {
      return res.status(404).json({ message: "No patient is currently serving" });
    }

    currentServing.status = "completed";
    await currentServing.save();

    const io = req.app.get("io");
    io.emit("queueUpdated");

    res.json({
      message: "Patient marked as completed",
      patient: currentServing,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete patient" });
  }
};

export const clearQueue = async (req, res) => {
  try {
    await Patient.deleteMany({});

    const io = req.app.get("io");
    io.emit("queueUpdated");

    res.json({ message: "Queue cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear queue" });
  }
};