import SocialHandles from "../components/SocialHandles";

export default function Contact() {
  return (
    <main className="text-center bg-gray-900 text-white my-20 mx-20 px-10 py-10">
      <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
      
      <p className="mb-4">I'd love to hear from you! Whether you have a question, suggestion, or just want to connect, feel free to reach out to me.</p>
      
      <p className="text-lg mb-6">You can contact me through the following social media channels:</p>

      <SocialHandles classes="justify-center mb-6" />
      
      <p className="text-lg">Looking forward to hearing from you!</p>
    </main>
  );
}
