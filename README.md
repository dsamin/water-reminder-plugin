Overview

The Water Reminder Chrome extension is a simple and effective tool to help users stay hydrated. It features a countdown timer that reminds you to drink water every hour and provides notifications. You can reset the timer or trigger a manual reminder with just a click.

Features
	•	Hourly hydration reminders.
	•	Countdown timer with an interactive user interface.
	•	Manual “Drink Water” notification option.
	•	Automatic persistence of countdown time across browser sessions.
	•	Customizable and lightweight extension.

File Structure
	•	background.js: Contains the logic for the countdown timer and background notifications.
	•	manifest.json: Defines the extension’s metadata and permissions.
	•	popup.html: The UI for user interaction, displaying the timer and buttons.
	•	popup.js: Handles button interactions and updates the countdown UI.
	•	icon16.png, icon48.png, icon128.png: Icons used for the extension in various sizes.

Setup and Installation
	1.	Clone or download the project files.
	2.	Open Chrome and navigate to chrome://extensions.
	3.	Enable Developer Mode.
	4.	Click Load unpacked and select the folder containing the project files.
	5.	The extension will appear in the extensions bar with the “Water Reminder” icon.
 
How It Works

Flowchart
+------------------------+
| User interacts with UI |
| (popup.html, popup.js) |
+-----------+------------+
            |
            v
+------------------------+
| Message sent to        |
| background script      |
| (background.js)        |
+-----------+------------+
            |
            v
+------------------------+
| Timer logic and        |
| notifications handled  |
| (background.js)        |
+-----------+------------+
            |
            v
+------------------------+
| Countdown time stored  |
| in local storage       |
| (chrome.storage API)   |
+------------------------+
The flowchart below illustrates the structure and operation of the extension:
Key Workflows
	1.	Timer Initialization:
	•	On extension load or browser startup, the timer retrieves the saved countdown time (or starts from 1 hour by default) and begins decrementing.
	2.	Reset Timer:
	•	When the “Drank Water” button is clicked, the timer resets to 1 hour, and the countdown restarts.
	3.	Manual Reminder:
	•	Clicking “Remind Me Now” triggers an immediate notification reminding the user to drink water.

Future Improvements

Here are some areas to enhance the extension:
	•	Add user settings to customize the reminder interval.
	•	Integrate sound notifications alongside visual ones.
	•	Provide analytics to track hydration habits over time.
	•	Localize the extension for different languages.

Contributing

Contributions are welcome! Please feel free to fork the repository and submit a pull request with your improvements or bug fixes.

License

This project is licensed under the MIT License.
