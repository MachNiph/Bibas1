import React, { useEffect, useState } from "react";
import { Card, Input } from "antd";
const { Search } = Input;
const { Meta } = Card;
export default function Home() {
  const [imagesData, setImagesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery) {
      fetch(
        `https://api.unsplash.com//search/photos?client_id=_gHCUNCi6-v4iUce4nK7Smc3rKXx7dNh3fdOCiQ_zFU&query=${searchQuery}&orientation=landscape`
      )
        .then((res) => res.json())
        .then((data) => {
          setImagesData(data.results);
          console.log(data.results);
        });
    } else {
      setImagesData([]); // Clear imagesData when searchQuery is empty
    }
  }, [searchQuery]);
  let feedHTML = null;
  if (imagesData.length > 0) {
    feedHTML = imagesData.map((item, index) => {
      const {
        alt_description,
        description,
        urls: { regular },
        user: { name },
      } = item;
      return (
        <Card
          key={index}
          hoverable
          style={{
            width: "500px",
            marginBottom: "15px", // Add some spacing between cards
          }}
          cover={<img alt="example" src={`${regular}`} />}
        >
          <Meta title={`${name}`} />
          <Meta
            description={`${description ? description : alt_description}`}
          />
        </Card>
      );
    });
  }
  return (
    <div className="home">
      <Search
        style={{
          width: "300px",
          marginBottom: "15px",
        }}
        placeholder="search any text..."
        enterButton
        onSearch={(value, event) => setSearchQuery(value)}
      />
      {feedHTML}
    </div>
  );
}
