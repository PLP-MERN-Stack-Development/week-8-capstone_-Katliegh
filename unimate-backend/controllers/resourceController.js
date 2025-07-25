const Resource = require("../models/Resource");

exports.uploadResource = async (req, res) => {
  const fileUrl = `/uploads/${req.file.filename}`;
  const { title } = req.body;
  try {
    const resource = new Resource({
      title,
      fileUrl,
      uploadedBy: req.user.userId
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResources = async (req, res) => {
  const resources = await Resource.find().populate("uploadedBy", "name");
  res.json(resources);
};
