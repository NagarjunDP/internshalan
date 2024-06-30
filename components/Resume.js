// src/components/Resume.js
import React, { useState } from "react";
import jsPDF from "jspdf";

const Resume = () => {
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    experience: "",
    personalDetails: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.text(`Name: ${formData.name}`, 10, 10);
    doc.text(`Qualification: ${formData.qualification}`, 10, 20);
    doc.text(`Experience: ${formData.experience}`, 10, 30);
    doc.text(`Personal Details: ${formData.personalDetails}`, 10, 40);
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      doc.addImage(img, "JPEG", 10, 50, 50, 50);
      doc.save("resume.pdf");
    };
    reader.readAsDataURL(formData.photo);
  };

  return (
    <div>
      <h1>Resume Generator</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="qualification" placeholder="Qualification" onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
        <input type="text" name="personalDetails" placeholder="Personal Details" onChange={handleChange} required />
        <input type="file" name="photo" onChange={handleChange} required />
        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
};

export default Resume;
