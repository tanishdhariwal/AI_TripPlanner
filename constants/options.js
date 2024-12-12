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

export const AIPrompt = "Generate travel plan for location: {location}, for {TotalDay} days and {TotalNight} nights for {Traveler} with a {budget} Budget with Flight Details, Flight Price for with booking URL, Hotel Options list with hotel names, hotel addresses, hotel image url, geo coordinates, rating, description and places to visit nearby with place name, details, image url, geo coordinates, ticket pricing if any, time taken for travelling to each location for {TotalDay} days and {TotalNight} nights. Also provide the total cost of the trip and the total time taken for the trip, give each days plan to the user and give best time to visit. Make sure to give all these details in  the JSON Format."