// assets quote references :
// https://www.fishbowlinventory.com/blog/2013/04/01/8-great-inventory-management-quotes/
// https://animoto.com/blog/business/inspirational-quotes-real-estate-business
// https://www.azquotes.com/quotes/topics/inventory.html

import { useEffect, useState } from "react";

// data for quotes
const quotesData = [
  {
    quote:
      "One of the great responsibilities that I have is to manage my assets wisely, so that they create value.",
    author: "Alice Walton",
  },
  {
    quote: "Being properly prepared is one of the biggest assets in business.",
    author: "Keeth Smart",
  },
  {
    quote: "If you count all your assets you always show a profit.",
    author: "Wilson Mizner",
  },
  {
    quote: "Home is the nicest word there is.",
    author: "Laura Ingalls Wilder",
  },
  {
    quote: "Constantly take inventory of what's important to you.",
    author: "Dave Chappelle",
  },
];

//QuoteComponent which displays a random quote from a list of quote objects
const Quote = () => {
  const [item, setItem] = useState(quotesData[0]);

  useEffect(() => {
    setItem(quotesData[Math.floor(Math.random() * quotesData.length)]);
  }, []);

  return (
    <div className="p-4 text-center text-light quote">
      <figure>
        <blockquote>
          <p>
            <span className="open" />
            <span className="p-2 text-xl">{item.quote}</span>
            <span className="close" />
          </p>
        </blockquote>
        <figcaption className="text mt-2">— {item.author}</figcaption>
      </figure>
    </div>
  );
};

export default Quote;
