//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to get a cookie value by name
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, c) => {
        const [key, value] = c.split('=');
        return key === name ? decodeURIComponent(value) : r;
    }, '');
}

// Function to apply user preferences from cookies
function applyPreferences() {
    const fontSize = getCookie('fontsize');
    const fontColor = getCookie('fontcolor');

    if (fontSize) {
        document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
        document.getElementById('fontsize').value = fontSize; // Update input value
    }
    if (fontColor) {
        document.documentElement.style.setProperty('--fontcolor', fontColor);
        document.getElementById('fontcolor').value = fontColor; // Update input value
    }
}

// Event listener for form submission
document.getElementById('preferences-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    // Set cookies for font size and color
    setCookie('fontsize', fontSize, 30); // Store for 30 days
    setCookie('fontcolor', fontColor, 30); // Store for 30 days

    // Apply the preferences immediately
    applyPreferences();
});

// Apply preferences on page load
window.onload = applyPreferences;