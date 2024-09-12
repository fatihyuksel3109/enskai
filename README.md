# Notifications Panel App

This is a React-based notification panel that displays a list of notifications with options to view details, dismiss notifications, and clear all notifications. It supports adding new notifications dynamically and automatically closes the panel when all notifications are dismissed.

## Features

- **Dynamic Notifications:** Add notifications dynamically to simulate real-time updates.
- **View Notification Details:** Click on a notification to view more details in a modal dialog.
- **Mark as Read and Remove:** Mark notifications as read and remove them from the list.
- **Clear All Notifications:** Clear all notifications with a single button click.
- **Auto-Close Panel:** Automatically closes the panel when all notifications are dismissed.
- **Notification Badge:** Displays the count of unread notifications.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material UI (MUI)**: React UI framework for creating modern, responsive components.
- **React Transition Group**: Library for animations and transitions.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/fatihyuksel3109/enskai.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd notifications-panel-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

    The app will be running on `http://localhost:3000`.

## Usage

- **Adding Notifications:** Use the `addNotification` function from the `NotificationContext` to add new notifications dynamically.
- **Viewing Notification Details:** Click on a notification item to open the modal with detailed information.
- **Dismiss Notifications:** Click the close icon on individual notifications to dismiss them.
- **Clear All Notifications:** Click the "Clear All" button to remove all notifications from the list.
- **Auto-Close Panel:** The panel will close automatically after 200ms when there are no notifications left.

## Components

- **`NotificationsPanel`**: Displays the list of notifications and handles their removal and clearing.
- **`NotificationItem`**: Represents an individual notification.
- **`NotificationDetail`**: Shows detailed information about a selected notification in a modal dialog.

## Contributing

If you have suggestions or improvements, please feel free to contribute by opening an issue or a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
