import React, { useState, ChangeEvent } from "react";

type Course = {
  id: number;
  code: string;
  courseTitle: string;
  courseInstructor: string;
};

type AutocompleteProps = {
  data: Course[];
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ data, handleChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const handleSelect = (course: Course) => {
    setSelectedCode(course.code);
    setSearchTerm(course.code); // Display the selected code in the input field
    handleChange({ target: { name: "courseCodeSection", value: course.code } });
    handleChange({
      target: { name: "courseTitle", value: course.courseTitle },
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelectedCode(null);
    handleChange(event);
  };

  const maxItemsToShow = 8;
  const filteredCourses = data.filter((course) =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        name="courseCodeSection"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setSelectedCode("")} // Show course codes when input is focused
        className="w-full border rounded-lg p-7"
        placeholder="Search for a course code"
      />
      {searchTerm && selectedCode === null && filteredCourses.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCourses.slice(0, maxItemsToShow).map((course) => (
            <div
              key={course.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(course)}
            >
              {course.code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
