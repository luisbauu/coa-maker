import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

type Props = {};

export default function CourseSearch({}: Props) {
  const courses = [
    { id: 0, name: "CS 197" },
    { id: 1, name: "CSCI 21" },
    { id: 2, name: "CSCI 22" },
    { id: 3, name: "CSCI 40" },
    { id: 4, name: "CSCI 42" },
    { id: 5, name: "CSCI 51.01" },
    { id: 6, name: "CSCI 51.02" },
    { id: 7, name: "CSCI 61" },
    { id: 8, name: "CSCI 71" },
    { id: 9, name: "CSCI 111" },
    { id: 10, name: "CSCI 112" },
    { id: 11, name: "CSCI 113i" },
    { id: 12, name: "CSCI 115" },
    { id: 13, name: "CSCI 117i" },
    { id: 14, name: "CSCI 130" },
    { id: 15, name: "CSCI 133" },
    { id: 16, name: "CSCI 134.1i" },
    { id: 17, name: "CSCI 140" },
    { id: 18, name: "CSCI 142i" },
    { id: 19, name: "CSCI 173" },
    { id: 20, name: "CSCI 181.03" },
    { id: 21, name: "CSCI 182.06" },
    { id: 22, name: "CSCI 184.03" },
    { id: 23, name: "CSCI 197" },
    { id: 24, name: "CSCI 199.1" },
    { id: 25, name: "CSCI 199.2" },
    { id: 26, name: "CSCI 199.3" },
    { id: 27, name: "CSCI 203" },
    { id: 28, name: "CSCI 204" },
    { id: 29, name: "CSCI 207" },
    { id: 30, name: "CSCI 209" },
    { id: 31, name: "CSCI 211" },
    { id: 32, name: "CSCI 215" },
    { id: 33, name: "CSCI 217" },
    { id: 34, name: "CSCI 234.1" },
    { id: 35, name: "CSCI 240" },
    { id: 36, name: "CSCI 241" },
    { id: 37, name: "CSCI 242" },
    { id: 38, name: "CSCI 271" },
    { id: 39, name: "CSCI 273" },
    { id: 40, name: "CSCI 282.06" },
    { id: 41, name: "CSCI 296" },
    { id: 42, name: "CSCI 298.1" },
    { id: 43, name: "CSCI 298.4" },
    { id: 44, name: "CSCI 298.6" },
    {
      id: 45,
      name: "CSCI 371",
    },
    {
      id: 46,
      name: "CSCI 390.1",
    },
    {
      id: 47,
      name: "CSCI 390.2",
    },
    {
      id: 48,
      name: "CSCI 390.4",
    },
    {
      id: 49,
      name: "CSCI 396",
    },
    {
      id: 50,
      name: "CSCI 399.1",
    },
    {
      id: 51,
      name: "CSCI 399.2",
    },
    {
      id: 52,
      name: "CSCI 399.4",
    },
    {
      id: 53,
      name: "CSCI 399.5",
    },
    {
      id: 54,
      name: "CSCI 399.6",
    },
    {
      id: 55,
      name: "CSCI 399.7",
    },
    {
      id: 56,
      name: "GDEV 21i",
    },
    {
      id: 57,
      name: "GDEV 30",
    },
    {
      id: 58,
      name: "GDEV 32",
    },
    {
      id: 59,
      name: "GDEV 42",
    },
    {
      id: 60,
      name: "GDEV 198.3",
    },
    {
      id: 61,
      name: "ISCS 30.14",
    },
    {
      id: 62,
      name: "ISCS 30.16",
    },
    {
      id: 63,
      name: "ISCS 30.18",
    },
    {
      id: 64,
      name: "ISCS 30.23",
    },
    {
      id: 65,
      name: "ISCS 30.28",
    },
    {
      id: 66,
      name: "ISCS 30.36",
    },
    {
      id: 67,
      name: "ISCS 30.37",
    },
    {
      id: 68,
      name: "ISCS 30.45",
    },
    {
      id: 69,
      name: "ISCS 30.53",
    },
    {
      id: 70,
      name: "ISCS 30.66",
    },
    {
      id: 71,
      name: "ISCS 30.67",
    },
    {
      id: 72,
      name: "MSYS 22",
    },
    {
      id: 73,
      name: "MSYS 40",
    },
    {
      id: 74,
      name: "MSYS 42",
    },
    {
      id: 75,
      name: "MSYS 51",
    },
    {
      id: 76,
      name: "MSYS 112",
    },
    {
      id: 77,
      name: "MSYS 116",
    },
    {
      id: 78,
      name: "MSYS 121i",
    },
    {
      id: 79,
      name: "MSYS 142",
    },
    {
      id: 80,
      name: "MSYS 197",
    },
    {
      id: 81,
      name: "MSYS 198.1",
    },
    {
      id: 82,
      name: "MSYS 198.3",
    },
    {
      id: 83,
      name: "MSYS 171",
    },
  ];

  return <ReactSearchAutocomplete items={courses} />;
}
