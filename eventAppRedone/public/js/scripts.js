document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Example of adding an event listener to a form submission
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted');
            // Add form handling logic here

            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const details = document.getElementById('details').value;
            const startDateTime = document.getElementById('startDateTime').value;
            const endDateTime = document.getElementById('endDateTime').value;
            const location = document.getElementById('location').value;
            const host = document.getElementById('host').value;
            const image = document.getElementById('image').files[0];

            if (title && category && details && startDateTime && endDateTime && location && host && image) {
                // Perform form submission or AJAX call here
                console.log('Form is valid, submitting...');
                eventForm.submit();
            } else {
                console.log('Form is invalid, please fill in all fields.');
                alert('Please fill in all fields.');
            }
        });
    }

    // Example of adding an event listener to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to delete this event?')) {
                e.preventDefault();
            }
        });
    });

    // Example of adding an event listener to edit buttons
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('Edit button clicked');
        });
    });
});
