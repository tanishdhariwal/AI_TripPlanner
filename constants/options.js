export const SelectTravelersList = [
    {   id : 1,
        title:'Just me',
        desc:'A solo trip is a great way to discover yourself',
        icon:'',
        people:'1 Person',
    },
    {
        id : 2,
        title:'Couple',
        desc:'A trip with your partner is a great way to bond',
        icon:'',
        people:'2 People',
    },
    {
        id : 3,
        title:'Family',
        desc:'A family trip is a great way to bond with your family',
        icon:'',
        people:'3-5 People',
    },
    {
        id : 4,
        title:'Friends',
        desc:'A trip with your friends is a great way to bond with your friends',
        icon:'',
        people:'5-10 People',
    },

]

export const SelectBudgetOptions = [
    {id : 1,
        title : 'Low Price',
        desc : 'Budget Friendly, spend conciously',
    },
    {id : 2,
        title : 'Medium Price',
        desc : 'Spend a little more for a better experience',
    },
    {id : 3,
        title : 'High Price',
        desc : 'Spend lavishly for the best experience',
    },
]

export const AIPrompt = `Create a detailed travel plan for {location} spanning {TotalDay} days and {TotalNight} nights for {Traveler}. The budget for the trip is {budget}. The plan should include:

Flight Details:

- Departure and return flight details (airlines, departure time, arrival time).
- Flight prices.
- Booking URLs for each flight.

Accommodation Options:

- List of hotel options with:
  - Hotel names.
  - Full addresses.
  - Hotel image URLs.
  - Geo-coordinates.
  - Ratings and reviews.
  - Description of amenities and services.
  - Total cost for the stay.

Daily Itinerary:

- Detailed day-by-day plan covering {TotalDay} days and {TotalNight} nights.
- Activities, sightseeing spots, and experiences for each day.
- Places to visit each day, including:
  - Place name, detailed description, and image URLs.
  - Geo-coordinates of the places.
  - Entry ticket pricing (if applicable).
  - Time required to travel to each location.
  - Suggested time to spend at each location.
- Local transport options for traveling between spots.

Total Cost Calculation:

- Breakdown of the total cost, including flights, accommodation, entry tickets, and local transport.

Total Travel Time:

- Cumulative time taken for all activities, including inter-location travel.

Best Time to Visit:

- Recommended months or seasons to visit {location} based on weather and attractions.

Format: Provide all details in structured JSON format, including:

- Flight Information
- Hotel Options
- Daily Itinerary
- Cost Breakdown
- Travel Time Summary
- Best Time to Visit

Ensure that the response is comprehensive, detailed, and accurate for {Traveler}'s preferences.`;

