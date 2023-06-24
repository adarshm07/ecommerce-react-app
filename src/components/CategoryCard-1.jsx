import React from "react";

export default function CategoryCard({ title, description, image }) {
  return (
    <React.Fragment>
      <div className="card">
        <div
          className="card-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
