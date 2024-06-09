const events = [
    { 
        id: '1', 
        category: 'Crab-Focused', 
        name: 'Crab Meet and Greet', 
        startDateTime: '2024-07-01T18:00:00', 
        endDateTime: '2024-07-01T20:00:00', 
        location: 'Beachside Cove', 
        description: 'Join us for a delightful evening of crab mingling!', 
        image: '/uploads/crab_meet_and_greet.png' 
    },
    { 
        id: '2', 
        category: 'Crab-Focused', 
        name: 'Horseshoe with Horseshoe Crabs', 
        startDateTime: '2024-07-15T15:00:00', 
        endDateTime: '2024-07-15T17:00:00', 
        location: 'Horseshoe Bay', 
        description: 'Come horseshoe crab watching with us!', 
        image: '/uploads/crab_meet_and_greet.png' 
    },
    { 
        id: '3', 
        category: 'Crab-Focused', 
        name: 'Dive In!', 
        startDateTime: '2024-08-05T10:00:00', 
        endDateTime: '2024-08-05T12:00:00', 
        location: 'Deep Sea Diving Center', 
        description: 'Explore the underwater world of crabs!', 
        image: '/uploads/crab_meet_and_greet.png' 
    },
    { 
        id: '4', 
        category: 'Lobster Crab-Focused', 
        name: 'Lobster Party', 
        startDateTime: '2024-08-20T19:00:00', 
        endDateTime: '2024-08-20T22:00:00', 
        location: 'Lobster Cove', 
        description: 'Get ready to party with lobsters!', 
        image: '/uploads/crab_meet_and_greet.png' 
    },
    { 
        id: '5', 
        category: 'Other Beautiful Crustaceans', 
        name: 'Shrimp Soiree', 
        startDateTime: '2024-09-10T16:00:00', 
        endDateTime: '2024-09-10T18:00:00', 
        location: 'Shrimp Haven', 
        description: 'An elegant gathering of shrimp enthusiasts!', 
        image: '/uploads/crab_meet_and_greet.png' 
    }
];

// Function to generate a unique ID for each event
const generateId = (() => {
    let id = 1;
    return () => (id++).toString();
})();

// Assign unique IDs to each event
events.forEach(event => {
    event.id = generateId();
});

module.exports = { events }; // Export as a named export
