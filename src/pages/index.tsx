import { useState } from "react";
import { ChangeEvent } from "react";
import download from "downloadjs";
import toast, { Toaster } from "react-hot-toast";
import CourseSearch from "@/components/CourseSearch";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import courses from "../../public/course.json";

type Item = {
  id: number;
  code: string;
  courseTitle?: string;
  courseInstructor?: string;
};

export default function Home() {
  // const courses: Item[] = [
  //   { id: 0, name: "CS 197" },
  //   { id: 1, name: "CSCI 21" },
  //   { id: 2, name: "CSCI 22" },
  //   { id: 3, name: "CSCI 40" },
  //   { id: 4, name: "CSCI 42" },
  //   { id: 5, name: "CSCI 51.01" },
  //   { id: 6, name: "CSCI 51.02" },
  //   { id: 7, name: "CSCI 61" },
  //   { id: 8, name: "CSCI 71" },
  //   { id: 9, name: "CSCI 111" },
  //   { id: 10, name: "CSCI 112" },
  //   { id: 11, name: "CSCI 113i" },
  //   { id: 12, name: "CSCI 115" },
  //   { id: 13, name: "CSCI 117i" },
  //   { id: 14, name: "CSCI 130" },
  //   { id: 15, name: "CSCI 133" },
  //   { id: 16, name: "CSCI 134.1i" },
  //   { id: 17, name: "CSCI 140" },
  //   { id: 18, name: "CSCI 142i" },
  //   { id: 19, name: "CSCI 173" },
  //   { id: 20, name: "CSCI 181.03" },
  //   { id: 21, name: "CSCI 182.06" },
  //   { id: 22, name: "CSCI 184.03" },
  //   { id: 23, name: "CSCI 197" },
  //   { id: 24, name: "CSCI 199.1" },
  //   { id: 25, name: "CSCI 199.2" },
  //   { id: 26, name: "CSCI 199.3" },
  //   { id: 27, name: "CSCI 203" },
  //   { id: 28, name: "CSCI 204" },
  //   { id: 29, name: "CSCI 207" },
  //   { id: 30, name: "CSCI 209" },
  //   { id: 31, name: "CSCI 211" },
  //   { id: 32, name: "CSCI 215" },
  //   { id: 33, name: "CSCI 217" },
  //   { id: 34, name: "CSCI 234.1" },
  //   { id: 35, name: "CSCI 240" },
  //   { id: 36, name: "CSCI 241" },
  //   { id: 37, name: "CSCI 242" },
  //   { id: 38, name: "CSCI 271" },
  //   { id: 39, name: "CSCI 273" },
  //   { id: 40, name: "CSCI 282.06" },
  //   { id: 41, name: "CSCI 296" },
  //   { id: 42, name: "CSCI 298.1" },
  //   { id: 43, name: "CSCI 298.4" },
  //   { id: 44, name: "CSCI 298.6" },
  //   { id: 45, name: "CSCI 299.1" },
  //   { id: 46, name: "CSCI 299.2" },
  //   { id: 47, name: "CSCI 299.4" },
  //   { id: 48, name: "CSCI 299.5" },
  //   { id: 49, name: "CSCI 299.6" },
  //   { id: 50, name: "CSCI 299.7" },
  //   { id: 51, name: "CSCI 314" },
  //   { id: 52, name: "CSCI 315" },
  //   { id: 53, name: "CSCI 347" },
  //   { id: 54, name: "CSCI 371" },
  //   { id: 55, name: "CSCI 390.1" },
  //   { id: 56, name: "CSCI 390.2" },
  //   { id: 57, name: "CSCI 390.4" },
  //   { id: 58, name: "CSCI 396" },
  //   { id: 59, name: "CSCI 399.1" },
  //   { id: 60, name: "CSCI 399.2" },
  //   { id: 61, name: "CSCI 399.4" },
  //   { id: 62, name: "CSCI 399.5" },
  //   { id: 63, name: "CSCI 399.6" },
  //   { id: 64, name: "CSCI 399.7" },
  //   { id: 65, name: "GDEV 21i" },
  //   { id: 66, name: "GDEV 30" },
  //   { id: 67, name: "GDEV 32" },
  //   { id: 68, name: "GDEV 42" },
  //   { id: 69, name: "GDEV 198.3" },
  //   { id: 70, name: "ISCS 30.14" },
  //   { id: 71, name: "ISCS 30.16" },
  //   { id: 72, name: "ISCS 30.18" },
  //   { id: 73, name: "ISCS 30.23" },
  //   { id: 74, name: "ISCS 30.28" },
  //   { id: 75, name: "ISCS 30.36" },
  //   { id: 76, name: "ISCS 30.37" },
  //   { id: 77, name: "ISCS 30.45" },
  //   { id: 78, name: "ISCS 30.53" },
  //   { id: 79, name: "ISCS 30.66" },
  //   { id: 80, name: "ISCS 30.67" },
  //   { id: 81, name: "MSYS 22" },
  //   { id: 82, name: "MSYS 40" },
  //   { id: 83, name: "MSYS 42" },
  //   { id: 84, name: "MSYS 51" },
  //   { id: 85, name: "MSYS 112" },
  //   { id: 86, name: "MSYS 116" },
  //   { id: 87, name: "MSYS 121i" },
  //   { id: 88, name: "MSYS 142" },
  //   { id: 89, name: "MSYS 197" },
  //   { id: 90, name: "MSYS 198.1" },
  //   { id: 91, name: "MSYS 198.3" },
  //   { id: 92, name: "MSYS 199.3" },
  //   { id: 93, name: "MSYS 171" },
  // ];

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

  const handleAutocompleteSelect = (item: string) => {
    setCourseCodeSection(item);
  };

  const generatePdf = async (e: any) => {
    let res;
    e.preventDefault();

    if (members.length === 0) {
      toast.error("Please add at least one member.");
      return;
    }

    if (!type) {
      toast.error("Please select a type of submission");
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
    <main className="flex min-h-screen flex-col items-center align-middle py-10">
      <Toaster />
      <h1 className="text-6xl font-bold py-5">DISCS COA Maker v1</h1>
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
            className="border w-full rounded-lg p-2"
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
            className="border w-full rounded-lg p-2"
          />
        </div>

        <div className="flex flex-row gap-5 p-5 self-start w-full">
          <p className="text-2xl font-bold ">Course Code & Section</p>

          <div className="w-full">
            <ReactSearchAutocomplete<Item>
              items={courses}
              fuseOptions={{ keys: ["code"] }} // Search on both fields
              resultStringKeyName="code" // String to display in the results
              onSelect={(item) => handleAutocompleteSelect(item.code)}
              showIcon={false}
              styling={{
                borderRadius: "0.5rem",
                boxShadow: "none",
                height: "4rem",
              }}
            />
          </div>

          {/* <input
            type="text"
            name="courseCodeSection"
            value={courseCodeSection}
            onChange={handleChange}
            className="border w-full rounded-lg p-2"
          /> */}
        </div>

        <div className="flex flex-row gap-5 p-5 self-start w-full">
          <p className="text-2xl font-bold  ">Course Title</p>
          <input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={handleChange}
            className="border w-full rounded-lg p-2"
          />
        </div>

        <div className="flex flex-row gap-5 p-5 self-start w-full">
          <p className="text-2xl font-bold ">Course Instructor</p>
          <input
            type="text"
            name="courseInstructor"
            value={courseInstructor}
            onChange={handleChange}
            className="border w-full rounded-lg p-2"
          />
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
                    className="border w-full rounded-lg p-3 "
                    name="name"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.name}
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
              className="border w-full rounded-lg p-3 "
              name="name"
              placeholder="Name"
              onChange={(event) => handleFormChange(event, 0)}
              value={members[0].name}
            />
          </div>
        )}

        <button
          className="my-10 text-2xl bg-blue-600 text-white px-10 py-5 hover:bg-blue-300 rounded-xl font-semibold self-center "
          onClick={(e) => generatePdf(e)}
        >
          Create PDF!
        </button>
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
