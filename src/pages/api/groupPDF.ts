import fs from "fs";
import { PDFDocument } from "pdf-lib";

import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: false,
    },
  },
};

const GroupPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  let member1 = "",
    member2 = "",
    member3 = "",
    member4 = "",
    member5 = "";
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

  if (members[0]) {
    member1 = members[0].name;
  }

  if (members[1]) {
    member2 = members[1].name;
  }

  if (members[2]) {
    member3 = members[2].name;
  }

  if (members[3]) {
    member4 = members[3].name;
  }

  if (members[4]) {
    member5 = members[4].name;
  }

  const pdfBuffer = fs.readFileSync("public/COA/COAGroup.pdf");

  // Embed the existing PDF into the new document
  const pdfDoc = await PDFDocument.load(pdfBuffer);

  const form = pdfDoc.getForm();

  const titleForm = form.getTextField("Title of Submission");
  const type1Form = form.getRadioGroup("Type of Submission");
  const specifiedTypeForm = form.getTextField("Others Specified");
  const dateForm = form.getTextField("Date of Submission");
  const sourcesForm = form.getTextField("Sources");
  const member1Form = form.getTextField("Group Member 1");
  const member2Form = form.getTextField("Group Member 2");
  const member3Form = form.getTextField("Group Member 3");
  const member4Form = form.getTextField("Group Member 4");
  const member5Form = form.getTextField("Group Member 5");
  const courseCodeSectionForm = form.getTextField("Course Code  Section");
  const courseTitleForm = form.getTextField("Course Title");
  const courseInstructorForm = form.getTextField("Course Instructor");

  titleForm.setText(title);
  type1Form.select(type);
  specifiedTypeForm.setText(specifiedType);
  dateForm.setText(date);
  sourcesForm.setText(sources);
  member1Form.setText(member1);
  member2Form.setText(member2);
  member3Form.setText(member3);
  member4Form.setText(member4);
  member5Form.setText(member5);
  courseTitleForm.setText(courseTitle);
  courseCodeSectionForm.setText(courseCodeSection);
  courseInstructorForm.setText(courseInstructor);

  const pdfBytes = await pdfDoc.save();

  res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
  res.setHeader("Content-Type", "application/pdf");
  res.status(200).end(pdfBytes);
};

export default GroupPDF;
