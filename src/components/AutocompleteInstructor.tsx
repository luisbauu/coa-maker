import React, { useState, ChangeEvent } from "react";

type courseInstructorT = {
  id: number;
  name: string;
};

type AutocompleteProps = {
  data: courseInstructorT[];
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const AutocompleteInstructor: React.FC<AutocompleteProps> = ({
  data,
  handleChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const handleSelect = (course: courseInstructorT) => {
    setSelectedCode(course.name);
    ~setSearchTerm(course.name); // Display the selected code in the input field
    handleChange({
      target: { name: "courseInstructor", value: course.name },
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSelectedCode(null);
    handleChange(event);
  };

  const maxItemsToShow = 8;
  const filteredCourses = data.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        name="courseInstructor"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setSelectedCode("")} // Show course codes when input is focused
        className="w-full border rounded-lg p-7"
        placeholder="Search for a course instructor"
      />
      {searchTerm && selectedCode === null && filteredCourses.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCourses.slice(0, maxItemsToShow).map((d) => (
            <div
              key={d.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(d)}
            >
              {d.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInstructor;
