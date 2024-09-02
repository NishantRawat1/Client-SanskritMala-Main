import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
  ];

  return (
    <section className="bg-gray-100 text-black py-12 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-blue1 text-center mb-8">What Our Students Say</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((e) => (
          <div
            key={e.id}
            className="bg-gray-200 p-6 rounded-lg shadow-xl max-w-xs w-full flex flex-col items-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mb-4 overflow-hidden rounded-full border-4 border-blue1">
              <img
                src={e.image}
                alt={e.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base md:text-lg text-black italic mb-4">"{e.message}"</p>
            <div className="text-center">
              <p className="font-semibold text-gray-800 text-base md:text-lg">{e.name}</p>
              <p className="text-gray-700 text-sm md:text-base">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
