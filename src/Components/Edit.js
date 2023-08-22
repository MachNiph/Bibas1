import React, { useState, useContext } from "react";
import { ref, update } from "firebase/database";
import { database } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";

function Edit({ data, setEditData }) {
  const { user } = useContext(UserContext);
  const [name, setName] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  function editDoc(updatedDoc) {
    const docRef = ref(database, "users/" + user.user.uid);
    update(docRef, updatedDoc)
      .then(() => {
        setEditData(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateauth() {
    const auth = getAuth();

    updateEmail(auth.currentUser, email)
      .then(() => {
        console.log("Email updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating email:", error);
      });
  }

  return (
    <div className="edit">
      <input
        type="text"
        placeholder="change your username..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="change your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="change your phone number..."
        value={phone}
        maxLength={10}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        onClick={() => {
          editDoc({ username: name }); // Update the 'username' field
          editDoc({ email: email }); // Update the 'username' field
          editDoc({ phone: phone }); // Update the 'username' field
          updateauth();
        }}
      >
        Update
      </button>
    </div>
  );
}

export default Edit;
