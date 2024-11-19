export default function Documentation() {
    return (
      <main className="bg-gray-900 text-white py-16 px-10">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Project Documentation</h1>
          
          <p className="text-lg mb-6">
            Welcome to the documentation for our project. This page will guide you through the features, usage, and future updates.
          </p>
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
            <p className="text-lg mb-4">
              This is the first release of the project, and we are excited to share it with you! In this initial release, we focus on adding support for both Vite and Create React App (CRA) projects. 
            </p>
            <p className="text-lg">
              While the frontend is fully functional and ready for use, please note that certain backend functionality is not yet integrated. We plan to add more features and improvements in future releases.
            </p>
          </section>
  
          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Current Features</h2>
            <p className="text-lg mb-4">
              Below are the key features available in this release:
            </p>
            <ul className="list-disc pl-6 text-lg mb-4">
              <li><strong>Vite and CRA Project Support:</strong> The application supports both Vite and Create React App (CRA) projects for seamless integration.</li>
              <li><strong>Frontend Ready:</strong> The frontend is fully functional and displays the top 5 repositories based on the latest push date.</li>
              <li><strong>Top 5 Repositories:</strong> We show the top 5 repositories, sorted by the most recent push to GitHub.</li>
            </ul>
          </section>
  
          {/* Limitations */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Known Limitations</h2>
            <p className="text-lg mb-4">
              Although the application is fully functional on the frontend, there are a few backend limitations that you should be aware of:
            </p>
            <ul className="list-disc pl-6 text-lg mb-4">
              <li><strong>No Environment Variable Support:</strong> Currently, we are not accepting any environment variables from users, though this will be included in the next release.</li>
              <li><strong>Frontend-Backend Handling:</strong> While the frontend is accepting input, backend handling for certain features is still under development.</li>
            </ul>
          </section>
  
          {/* Future Plans */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Future Releases</h2>
            <p className="text-lg mb-4">
              We have some exciting plans for the next release! Here's what you can expect:
            </p>
            <ul className="list-disc pl-6 text-lg mb-4">
              <li><strong>Environment Variable Support:</strong> The next release will allow users to pass in environment variables, giving you more control over configurations.</li>
              <li><strong>Repository Search:</strong> We'll add a repository search feature that lets you find repos by name, enhancing the user experience.</li>
            </ul>
          </section>
  
          {/* GitHub Repo Structure */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">GitHub Repository Structure</h2>
            <p className="text-lg mb-4">
              Please note that for the project to work correctly, your GitHub repository directory structure must match the standard directory structure of a Vite or CRA project. No additional nested folders will be accepted.
            </p>
            <ul className="list-disc pl-6 text-lg mb-4">
              <li><strong>Vite or CRA Structure:</strong> Your project directory should directly contain your Vite or CRA project files (e.g., `package.json`, `vite.config.js` for Vite, or `public`, `src`, `package.json` for CRA).</li>
              <li><strong>No Nested Folders:</strong> The application will not work if there are extra nested directories inside the root project directory. Make sure that your repo follows the expected structure with no additional folders.</li>
            </ul>
          </section>
  
          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
            <p className="text-lg">
              Thank you for checking out our project! We appreciate your support as we continue to improve and add new features in future releases. Stay tuned for more updates.
            </p>
          </section>
  
          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="text-lg mb-4">
              If you have any questions, need help, or want to suggest improvements, feel free to reach out via the following channels:
            </p>
            <ul className="list-disc pl-6 text-lg mb-4">
              <li><strong>GitHub Issues:</strong> Open an issue in our <a href="https://github.com/your-repo/issues" target="_blank" className="text-blue-400 underline">GitHub repository</a>.</li>
              <li><strong>Social Media:</strong> You can also contact us through our social media profiles listed on the <a href="/contact" className="text-blue-400 underline">Contact page</a>.</li>
            </ul>
          </section>
        </section>
      </main>
    );
  }
  