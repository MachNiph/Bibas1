import React from "react";
import { Image } from "antd";

export default function Profile() {
  return (
    <div className="profile">
      <div className="pictures">
        <div className="coverpic">
          <Image
            className="coverpicimg"
            width={800}
            height={400}
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
      </div>
    </div>
  );
}
