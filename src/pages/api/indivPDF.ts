import fs from "fs";
import path from "path";
import { PDFDocument } from "pdf-lib";

import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: false,
    },
  },
};

const IndivPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  let member1 = "";

  const {
    members,
    title,
    type,
    specifiedType,
    date,
    sources,
    courseCodeSection,
    courseTitle,
    courseInstructor,
  } = req.body;

  member1 = members[0].name;

  const filePath = path.join(process.cwd(), "COAIndiv.pdf");
  const pdfBuffer = fs.readFileSync(filePath);

  // Embed the existing PDF into the new document
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  const form = pdfDoc.getForm();

  const titleForm = form.getTextField("Title of Submission");
  const type1Form = form.getRadioGroup("Type of Submission");
  const specifiedTypeForm = form.getTextField("undefined");
  const dateForm = form.getTextField("Date of Submission");
  const sourcesForm = form.getTextField("Sources");
  const member1Form = form.getTextField("Student's Full Name");
  const courseCodeSectionForm = form.getTextField("Course Code  Section");
  const courseTitleForm = form.getTextField("Course Title");
  const courseInstructorForm = form.getTextField("Course Instructor");

  titleForm.setText(title);
  type1Form.select(type);
  specifiedTypeForm.setText(specifiedType);
  dateForm.setText(date);
  sourcesForm.setText(sources);
  member1Form.setText(member1);

  courseTitleForm.setText(courseTitle);
  courseCodeSectionForm.setText(courseCodeSection);
  courseInstructorForm.setText(courseInstructor);

  const pdfBytes = await pdfDoc.save();

  res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.status(200).end(pdfBytes);
};

export default IndivPDF;
