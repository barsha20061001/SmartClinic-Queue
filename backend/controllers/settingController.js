import Setting from "../models/Setting.js";

export const getSetting = async (req, res) => {
  try {
    let setting = await Setting.findOne();

    if (!setting) {
      setting = await Setting.create({ averageConsultationTime: 7 });
    }

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch setting" });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const { averageConsultationTime } = req.body;

    let setting = await Setting.findOne();

    if (!setting) {
      setting = await Setting.create({ averageConsultationTime });
    } else {
      setting.averageConsultationTime = averageConsultationTime;
      await setting.save();
    }

    const io = req.app.get("io");
    io.emit("settingsUpdated");

    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: "Failed to update setting" });
  }
};