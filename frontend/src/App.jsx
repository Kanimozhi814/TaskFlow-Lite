import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/1")
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProfile(result.data);

          setFormData({
            name: result.data.name,
            phone: result.data.phone,
            bio: result.data.bio || "",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    if (formData.name.trim() === "") {
      alert("Display Name is required");
      return;
    }

    if (formData.phone.trim() === "") {
      alert("Phone Number is required");
      return;
    }

    if (formData.bio.trim() === "") {
      alert("Short Bio is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone Number must contain exactly 10 digits");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/profile/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setProfile(result.data);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      phone: profile.phone,
      bio: profile.bio || "",
    });

    setIsEditing(false);
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">
      <h1 className="title">TaskFlow Lite</h1>

      <h2 className="subtitle">User Profile</h2>

      {isEditing ? (
        <div>
          <div className="profile-field">
            <label>Display Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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
            />
          </div>

          <div className="profile-field">
            <label>Short Bio</label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
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
            <div className="profile-value">{profile.phone}</div>
          </div>

          <div className="profile-field">
            <label>Short Bio</label>
            <div className="profile-value">{profile.bio}</div>
          </div>

          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
