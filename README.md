Here’s a professional and well-structured `README.md` for your repository:

```markdown
# Agent Frontend

The **Agent Frontend** is a React-based web application that allows users to manage AI agents, configure their details, and test interactions such as calls and chats. This project integrates external APIs for voice selection, agent updates, and communication testing.

---

## 🌟 Features

- View and edit agent details such as name, prompt, and voice.
- Fetch and display a list of available voices with gender and language information.
- Initiate test calls with configured agents.
- Responsive design with a clean and modern user interface.

---

## 🚀 Technologies Used

- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **Tailwind CSS**: For styling components.
- **TypeScript**: For type safety and improved developer experience.
- **Lucide Icons**: For a visually appealing UI.
- **External APIs**: To fetch agent details, voices, and initiate calls.

---

## 🛠️ Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- A `.env` file with the following variables:
  ```env
  NEXT_PUBLIC_API_KEY=your_api_key_here
  ```

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/kumawatvaibhav/Agent_frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Agent_frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
5. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

- `components/`: Reusable UI components (e.g., buttons, cards, inputs).
- `pages/`: Next.js pages for routing.
- `public/`: Static assets like images or fonts.
- `styles/`: Global and Tailwind CSS configuration.
- `utils/`: Helper functions for API integration and error handling.

---

## 🖥️ Usage

1. **Agent Details**: Navigate to the agent details page using the agent ID.
2. **Voice Selection**: Choose a voice from the available list.
3. **Update Agent**: Modify agent properties like name and prompt, then click **Update Agent**.
4. **Test Calls**: Enter a phone number and initiate a test call.
5. **Error Handling**: Any errors during API calls are displayed on the screen.

---

## 📦 API Endpoints Used

- **Get Agent Details**:  
  `https://api.retellai.com/get-agent/{agent_id}`

- **Update Agent Details**:  
  `https://api.retellai.com/agents/{agent_id}`

- **Fetch Voices**:  
  `https://api.retellai.com/get-voice/11labs-Myra`

- **Initiate Call**:  
  `https://api.retellai.com/calls`

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request on the main repository.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [RetellAI](https://www.retellai.com) for providing the API.
- All contributors who helped build this project.

---

## 📧 Contact

For any inquiries or support, feel free to reach out:

- **Vaibhav Kumawat**  
  - **GitHub**: [kumawatvaibhav](https://github.com/kumawatvaibhav)
  - **Email**: vaibhavkumawat21318@gmail.com
```
