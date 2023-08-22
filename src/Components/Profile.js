import React, { useContext, useEffect, useState } from "react";
import { Image } from "antd";
import { database } from "../firebase-config";
import { ref, set, onValue } from "firebase/database";
import { UserContext } from "../contexts/UserContext";
import Edit from "./Edit";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState("");
  const [editdata, setEditData] = useState(false);
  console.log(user);

  useEffect(() => {
    const starCountRef = ref(database, "users/" + user.user.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <div className="profile">
      {/* <div className="pictures">
        <div className="coverpic">
          <Image
            className="coverpicimg"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <div className="profilepic">
            <Image
              className="profilepicimg"
              width={100}
              height={100}
              src="logo192.png"
            />
          </div>
        </div>
      </div> */}
      <div className="profile-info">
        <h1>Profile</h1>

        <div className="profile-data">
          <div> Username: {data.username}</div>
          <div>Email: {data.email}</div>
          <div>Gender: {data.gender}</div>
          <div>Phone: {data.phone}</div>

          <button onClick={() => setEditData(true)}>Edit</button>
          {editdata === true && <Edit data={data} setEditData={setEditData} />}
        </div>
      </div>
    </div>
  );
}
