// This replaces the broken alert link functionality
// Add this to your index.html or modify existing alert code

// Instead of linking to api.weather.gov/alerts/urn:oid:...
// Link to alert-display.html

// If you have alert detection code, modify it to:
function checkForAlerts() {
    fetch('https://api.weather.gov/alerts/active?zone=SCZ054,SCZ056,SCZ058')
        .then(response => response.json())
        .then(data => {
            const alertBanner = document.getElementById('alert-banner');
            if (data.features && data.features.length > 0) {
                // Show alert banner
                alertBanner.style.display = 'block';
                alertBanner.innerHTML = `
                    <div style="background: #ff6b6b; color: white; padding: 15px; text-align: center; border-radius: 5px;">
                        <strong>⚠️ ACTIVE WEATHER ALERT</strong>
                        <p style="margin: 10px 0;">${data.features[0].properties.event}</p>
                        <a href="alert-display.html" style="background: white; color: #ff6b6b; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
                            VIEW ALERT DETAILS →
                        </a>
                    </div>
                `;
            } else {
                alertBanner.style.display = 'none';
            }
        })
        .catch(error => console.error('Error checking alerts:', error));
}

// Run on page load
checkForAlerts();

// Check every 5 minutes
setInterval(checkForAlerts, 5 * 60 * 1000);
