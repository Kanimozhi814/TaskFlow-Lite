import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    fetch("https://taskflow-lite-3ocy.onrender.com/api/profile/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setProfile(result.data);

          setFormData({
            name: result.data.name || "",
            phone: result.data.phone || "",
            bio: result.data.bio || "",
          });
        } else {
          setError("Failed to load profile");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Unable to load profile. Please try again.");
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setSuccessMessage("");
    setError("");
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      phone: "",
      bio: "",
    };

    if (formData.name.trim() === "") {
      newErrors.name = "Display Name is required";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Display Name must be 100 characters or less";
    }

    if (formData.phone.trim() !== "") {
      if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number must contain exactly 10 digits";
      }
    }

    if (formData.bio.length > 250) {
      newErrors.bio = "Short Bio must be 250 characters or less";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.phone && !newErrors.bio;
  };

  const handleSave = async () => {
    setSuccessMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        "https://taskflow-lite-3ocy.onrender.com/api/profile/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            bio: formData.bio.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update profile");
      }

      setProfile(result.data);

      setFormData({
        name: result.data.name || "",
        phone: result.data.phone || "",
        bio: result.data.bio || "",
      });

      setIsEditing(false);
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
      bio: profile.bio || "",
    });

    setErrors({
      name: "",
      phone: "",
      bio: "",
    });

    setError("");
    setSuccessMessage("");
    setIsEditing(false);
  };

  if (!profile && error) {
    return (
      <div className="profile-container">
        <h1 className="title">TaskFlow Lite</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <h1 className="title">TaskFlow Lite</h1>
        <h2 className="subtitle">User Profile</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="title">TaskFlow Lite</h1>

      <h2 className="subtitle">User Profile</h2>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {isEditing ? (
        <div>
          <div className="profile-field">
            <label>Display Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
            />

            {errors.name && (
              <p className="field-error">{errors.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>

            <input
              value={profile.email}
              readOnly
            />
          </div>

          <div className="profile-field">
            <label>Phone Number</label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
            />

            {errors.phone && (
              <p className="field-error">{errors.phone}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Short Bio</label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              maxLength={250}
            />

            <small>
              {formData.bio.length}/250 characters
            </small>

            {errors.bio && (
              <p className="field-error">{errors.bio}</p>
            )}
          </div>

          <div className="button-container">
            <button
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="profile-field">
            <label>Display Name</label>
            <div className="profile-value">{profile.name}</div>
          </div>

          <div className="profile-field">
            <label>Email</label>
            <div className="profile-value">{profile.email}</div>
          </div>

          <div className="profile-field">
            <label>Phone Number</label>
            <div className="profile-value">
              {profile.phone || "Not provided"}
            </div>
          </div>

          <div className="profile-field">
            <label>Short Bio</label>
            <div className="profile-value">
              {profile.bio || "Not provided"}
            </div>
          </div>

          <button
            className="edit-button"
            onClick={() => {
              setIsEditing(true);
              setSuccessMessage("");
              setError("");
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
