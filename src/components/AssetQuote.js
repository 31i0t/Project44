// assets quote reference : https://www.fishbowlinventory.com/blog/2013/04/01/8-great-inventory-management-quotes/

const quotes = [
    {
        quote: "One of the great responsibilities that I have is to manage my assets wisely, so that they create value.",
        author: "Alice Walton"
    },
    {
        quote: "Being properly prepared is one of the biggest assets in business.",
        author: "Keeth Smart"
    },
    {
        quote: "If you count all your assets you always show a profit.",
        author: "Wilson Mizner"
    }
];

const AssetQuote = () => {
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="main-banner p-4">
            <h4 className="text-center text-light">{randomQuote.quote} - {randomQuote.author}</h4>            
        </div>      
    );
}

export default AssetQuote;