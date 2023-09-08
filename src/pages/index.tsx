import { useState } from "react";
import { ChangeEvent } from "react";
import download from "downloadjs";
import toast, { Toaster } from "react-hot-toast";
import CoursesJSON from "../../public/course.json";
import CourseInstructorJSON from "../../public/courseInstructors.json";
import Autocomplete from "@/components/Autocomplete";
import AutocompleteInstructor from "@/components/AutocompleteInstructor";

export default function Home() {
  const [members, setMembers] = useState([{ name: "" }]);
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [specifiedType, setSpecifiedType] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [sources, setSources] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [courseCodeSection, setCourseCodeSection] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [courseInstructor, setCourseInstructor] = useState<string>("");

  const [docType, setDocType] = useState(true);
  const [pdf, setPdf] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const addFields = (e: any) => {
    e.preventDefault();
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

  const handleSectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSection(value);
    setCourseCodeSection((prev) => prev + value);
  };

  const generatePdf = async (e: any) => {
    let res;
    e.preventDefault();

    if (members.length === 0) {
      toast.error("Please add at least one member.");
      return;
    }

    if (!type) {
      toast.error("Please select a type of submission.");
      return;
    }

    if (type == "other" && specifiedType == "") {
      toast.error("Please input a specified type of submission!");
      return;
    }

    if (!section) {
      toast.error("Please input a section for your course code.");
      return;
    }

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

    try {
      const url = docType ? "/api/groupPDF" : "/api/indivPDF";
      res = await fetch(url, requestOptions);

      if (!res.ok) {
        throw new Error("PDF generation failed");
      }

      const pdfBlob = await res.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdf(pdfUrl);

      download(pdfBlob, "COA.pdf", "application/pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center align-middle py-10">
      <Toaster />
      <h1 className="text-6xl font-bold py-5">
        DISCS COA Maker v1<span className="text-xs">.1</span>
      </h1>
      <p className="text-xl font-bold text-center w-[600px]">
        A simple tool to generate a Certificate of Authorship for all your
        academic requirements.
      </p>
      <div className="flex flex-row gap-2 py-5 items-center">
        <p className="font-semibold text-lg">Group</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={() => setDocType(!docType)}
          />
          <div className="w-11 h-6 bg-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <p className="font-semibold text-lg">Individual</p>
      </div>

      <form className="flex flex-col justify-center w-[600px]">
        <div className="flex flex-row gap-5 p-5 items-center w-full">
          <p className="text-2xl font-bold ">Title</p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className="border w-full rounded-lg p-7"
            placeholder="Enter title here"
          />
        </div>
        <p className=" self-center text-2xl font-bold pb-3">Type</p>
        <div className="flex flex-row gap-5 self-center">
          <label className="text-lg font-bold">
            <input
              type="radio"
              name="type"
              value="Program"
              checked={type === "Program"}
              onChange={handleChange}
              className="mr-2"
            />
            Program
          </label>
          <label className="text-lg font-bold">
            <input
              type="radio"
              name="type"
              value="Project"
              checked={type === "Project"}
              onChange={handleChange}
              className="mr-2"
            />
            Project
          </label>
          <label className="text-lg font-bold">
            <input
              type="radio"
              name="type"
              value="Report"
              checked={type === "Report"}
              onChange={handleChange}
              className="mr-2"
            />
            Report
          </label>
          <label className="text-lg font-bold">
            <input
              type="radio"
              name="type"
              value="Paper"
              checked={type === "Paper"}
              onChange={handleChange}
              className="mr-2"
            />
            Paper
          </label>
        </div>

        <div className="flex flex-row self-center items-center ">
          <label className="text-lg font-bold p-4 ">
            <input
              type="radio"
              name="type"
              value="other"
              checked={type === "other"}
              onChange={handleChange}
              className="mr-2"
            />
            Other
          </label>
          {type === "other" && (
            <input
              className="border rounded-lg p-2"
              type="text"
              name="specifiedType"
              value={specifiedType}
              onChange={handleChange}
              placeholder="Please specify type"
            />
          )}
          <br />
        </div>

        <div className="flex flex-row gap-5 p-5 self-start items-center">
          <p className="text-2xl font-bold ">Date</p>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            className="text-xl border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-row gap-5 p-5 self-start w-full">
          <p className="text-2xl font-bold ">Sources</p>
          <textarea
            rows={5}
            name="sources"
            value={sources}
            onChange={handleChange}
            className="border w-full rounded-lg p-7"
            placeholder="Enter sources here"
          />
        </div>

        <div className="flex flex-row gap-3 p-5 self-start w-full">
          <p className="text-2xl font-bold ">Course Code & Section</p>

          <div className="w-4/6">
            <Autocomplete handleChange={handleChange} data={CoursesJSON} />
          </div>

          <input
            type="text"
            name="section"
            value={section}
            onChange={handleSectionChange}
            className="border w-2/6 rounded-lg  text-center"
            placeholder="Section"
          />
        </div>

        <div className="flex flex-row gap-5 p-5 self-start w-full">
          <p className="text-2xl font-bold  ">Course Title</p>
          <input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={handleChange}
            className="border w-full rounded-lg p-7"
            placeholder="Enter course title here"
          />
        </div>

        <div className="flex flex-row gap-5 p-5 self-start w-full">
          <p className="text-2xl font-bold ">Course Instructor</p>
          <div className="w-full">
            <AutocompleteInstructor
              data={CourseInstructorJSON}
              handleChange={handleChange}
            />
          </div>
        </div>
        {docType ? (
          <>
            {members.map((form, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row gap-4 p-5 self-start w-full items-center"
                >
                  <p className="text-2xl font-bold w-64">Member {index + 1}</p>
                  <input
                    className="border w-full rounded-lg p-7"
                    name="name"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.name}
                    placeholder="Enter member's name"
                  />
                  {members.length > 1 && (
                    <button
                      className="bg-blue-600 text-white p-3 hover:bg-blue-300 rounded-xl font-semibold"
                      onClick={() => removeFields(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            {members.length < 5 && (
              <button
                className="mt-6 bg-blue-600 text-white p-2 hover:bg-blue-300 rounded-xl  font-semibold w-[560px] self-center "
                onClick={(e) => addFields(e)}
              >
                Add More Members
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-row gap-4 p-5 self-start w-full items-center">
            <p className="text-2xl font-bold w-64 ">Student&apos;s Full Name</p>
            <input
              className="border w-full rounded-lg p-7 "
              name="name"
              onChange={(event) => handleFormChange(event, 0)}
              value={members[0].name}
              placeholder="Enter name"
            />
          </div>
        )}

        <button
          className="my-10 text-2xl bg-blue-600 text-white px-10 py-5 hover:bg-blue-300 rounded-xl font-semibold self-center "
          onClick={(e) => generatePdf(e)}
        >
          Create PDF!
        </button>
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-200 flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}

        {pdf && (
          <embed
            src={pdf}
            type="application/pdf"
            width="600px"
            height="600px"
          />
        )}
        <p className="self-center text-xs py-3">
          Developed by Jose Luis Bautista
        </p>
      </form>
    </main>
  );
}
