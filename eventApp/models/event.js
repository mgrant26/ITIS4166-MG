class Event {
    constructor(name, category, startDateTime, endDateTime, location, description, image) {
        this.name = name;
        this.category = category;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.location = location;
        this.description = description;
        this.image = image;
    }
}

module.exports = Event;
