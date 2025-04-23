import { useState } from "react";
import { FaQuoteRight, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Trung from "../assets/images/Trung.png";
import Nhan from "../assets/images/Nhan.png";
import React from "react";
const testimonials = [
  {
    name: "Maria",
    job: "Fashion Designer",
    avatar: Trung,
    quote:
      "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus. In ac bibendum ex. Aenean dolor massa, euismod sit amet suscipit et“",
  },
  {
    name: "Ozawa",
    job: "Fashion Designer",
    avatar: Nhan,
    quote: "Nullam Sapien Elit, Dignissim Eu Viverra Et...",
  },
  {
    name: "Linh",
    job: "Fashion Designer",
    avatar: Trung,
    quote: "Vestibulum sit amet urna eu libero tincidunt...",
  },
  {
    name: "Ken",
    job: "Fashion Designer",
    avatar: Nhan,
    quote:
      "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet mi nec massa tincidunt blandit et eu sem. Maecenas laoreet ultrices diam dignissim posuere. Aenean ultrices dui at ipsum sagittis, pharetra lacinia dui faucibus. In ac bibendum ex. Aenean dolor massa, euismod sit amet suscipit et“",
  },
];

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const getDisplayedTestimonials = () => {
    return [
      testimonials[startIndex],
      testimonials[(startIndex + 1) % testimonials.length],
    ];
  };

  const displayedTestimonials = getDisplayedTestimonials();

  return (
    <div className="bg-[#f2f2f2] py-16 px-4   mt-2">
      <div className="flex justify-around items-center mb-8">
        <h2 className="text-xl font-semibold text-[#3b3c4a] ">
          Đánh Giá Khách Hàng
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            className="bg-white hover:bg-[#BD3F3F] text-black hover:text-white p-2 rounded-full"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white hover:bg-[#BD3F3F] text-black hover:text-white p-2 rounded-full"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-start space-x-6">
        {displayedTestimonials.map((testimonial, i) => (
          <div
            key={i}
            className="bg-white p-6 max-w-md rounded-xl shadow-md relative"
          >
            <p className="text-sm text-gray-600 border-l-4 border-sky-400 pl-4 leading-relaxed mb-8 line-clamp-6 min-h-[9rem]">
              “{testimonial.quote}”
            </p>

            <div className="flex items-center space-x-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm text-[#2b2c34]">
                  {testimonial.name}
                </p>

                <p className="text-xs text-gray-500">{testimonial.job}</p>
              </div>
            </div>
            <FaQuoteRight className="absolute text-gray-200 text-3xl bottom-4 right-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
