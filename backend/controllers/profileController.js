const profileService = require("../services/profileService");

const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, bio } = req.body;

    // Name validation
    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be 100 characters or less",
      });
    }

    // Phone validation
    if (
      phone !== undefined &&
      phone !== null &&
      phone !== "" &&
      !/^[0-9]{10,15}$/.test(String(phone).trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain 10 to 15 digits",
      });
    }

    // Bio validation
    if (bio !== undefined && bio !== null && String(bio).length > 250) {
      return res.status(400).json({
        success: false,
        message: "Bio must be 250 characters or less",
      });
    }

    const profile = await profileService.updateProfile(
      req.params.id,
      {
        name: name.trim(),
        phone: phone ? String(phone).trim() : null,
        bio: bio ? String(bio).trim() : null,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};