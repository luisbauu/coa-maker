import { useState } from "react";
import { ChangeEvent } from "react";
import download from "downloadjs";

export default function Home() {
  const [members, setMembers] = useState([{ name: "" }]);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [specifiedType, setSpecifiedType] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [sources, setSources] = useState<string>("");
  const [courseCodeSection, setCourseCodeSection] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseInstructor, setCourseInstructor] = useState<string>("");

  const [docType, setDocType] = useState(true);
  const [pdf, setPdf] = useState<string>();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    const inputMap: Record<
      string,
      React.Dispatch<React.SetStateAction<string>>
    > = {
      title: setTitle,
      type: setType,
      specifiedType: setSpecifiedType,
      date: setDate,
      sources: setSources,
      courseCodeSection: setCourseCodeSection,
      courseTitle: setCourseTitle,
      courseInstructor: setCourseInstructor,
    };

    inputMap[name](value);
  };

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let data: any = [...members];
    data[index][event.target.name] = event.target.value;
    setMembers(data);
  };

  const addFields = () => {
    if (members.length >= 5) return;
    let object = {
      name: "",
    };
    setMembers([...members, object]);
  };

  const removeFields = (index: number) => {
    let data = [...members];
    data.splice(index, 1);
    setMembers(data);
  };

  const generatePdf = async (e: any) => {
    let res;
    e.preventDefault();

    const requestBody = {
      members,
      title,
      type,
      specifiedType,
      date,
      sources,
      courseCodeSection,
      courseTitle,
      courseInstructor,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    if (docType) {
      res = await fetch("/api/groupPDF", requestOptions);
    } else {
      res = await fetch("/api/indivPDF", requestOptions);
    }

    const pdfBlob = await res.blob();

    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdf(pdfUrl);

    download(pdfBlob, "COA.pdf", "application/pdf");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-5">
      <h1 className="text-6xl font-bold">DISCS COA Maker</h1>
      <p className="text-xl font-bold">
        A simple tool to generate a Certificate of Authenticity for all your
        academic requirements.
      </p>
      <div className="flex flex-row gap-2">
        <p>Group</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={() => setDocType(!docType)}
          />
          <div className="w-11 h-6 bg-blue-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <p>Individual</p>
      </div>

      <div className="flex flex-col gap-2">
        <form>
          <div className="flex flex-row">
            <p className="border p-4">Title</p>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="border p-4"
            />
          </div>
          <label>
            <input
              type="radio"
              name="type"
              value="Program"
              checked={type === "Program"}
              onChange={handleChange}
            />
            Program
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="Project"
              checked={type === "Project"}
              onChange={handleChange}
            />
            Project
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="Report"
              checked={type === "Report"}
              onChange={handleChange}
            />
            Report
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="Paper"
              checked={type === "Paper"}
              onChange={handleChange}
            />
            Paper
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="type"
              value="other"
              checked={type === "other"}
              onChange={handleChange}
            />
            Other
          </label>
          <br />
          {type === "other" && (
            <input
              type="text"
              name="specifiedType"
              value={specifiedType}
              onChange={handleChange}
              placeholder="Please specify"
            />
          )}
          <br />

          <div className="flex flex-row">
            <p className="border p-4">Date</p>
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="border p-4"
            />
          </div>

          <div className="flex flex-row">
            <p className="border p-4">Sources</p>
            <textarea
              name="sources"
              value={sources}
              onChange={handleChange}
              className="border p-4"
            />
          </div>

          <div className="flex flex-row">
            <p className="border p-4">Course Code and Section</p>
            <input
              type="text"
              name="courseCodeSection"
              value={courseCodeSection}
              onChange={handleChange}
              className="border p-4"
            />
          </div>

          <div className="flex flex-row">
            <p className="border p-4">Course Title</p>
            <input
              type="text"
              name="courseTitle"
              value={courseTitle}
              onChange={handleChange}
              className="border p-4"
            />
          </div>

          <div className="flex flex-row">
            <p className="border p-4">Course Instructor</p>
            <input
              type="text"
              name="courseInstructor"
              value={courseInstructor}
              onChange={handleChange}
              className="border p-4"
            />
          </div>
          {docType ? (
            <>
              {members.map((form, index) => {
                return (
                  <div key={index} className="flex flex-row">
                    <p className="border p-4">Member {index + 1}</p>
                    <input
                      className="border p-4"
                      name="name"
                      placeholder="Name"
                      onChange={(event) => handleFormChange(event, index)}
                      value={form.name}
                    />
                    <button
                      className="border p-4"
                      onClick={() => removeFields(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              {members.length < 5 && (
                <button onClick={addFields}>Add More..</button>
              )}
            </>
          ) : (
            <div className="flex flex-row">
              <p className="border p-4">Student's Full Name</p>
              <input
                className="border p-4"
                name="name"
                placeholder="Name"
                onChange={(event) => handleFormChange(event, 0)}
                value={members[0].name}
              />
            </div>
          )}

          <br />
          <button onClick={(e) => generatePdf(e)}>Submit</button>
        </form>
      </div>

      {pdf && (
        <embed src={pdf} type="application/pdf" width="500px" height="500px" />
      )}
    </main>
  );
}
