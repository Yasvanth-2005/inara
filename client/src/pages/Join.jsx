import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="pt-20 px-6 md:px-12 pb-6 max-w-[1100px] mx-auto">
      <h2 className="text-3xl mb-7">Join Inara</h2>
      <h5 className="my-3">
        Get started with Inara and get your{" "}
        <Link to="https://dropp.cc/get-dropp-app/" className="text-blue-500">
          $5 FREE Dropp digital wallet
        </Link>{" "}
        to start reading now!
      </h5>
      <h5 className="pb-3">
        Need guidance? Get Inara account step-by-step set-up in our Getting
        Started with Inara for{" "}
        <Link
          to="https://inara.world/wp-content/uploads/2024/07/Getting-Started_Publishers.pdf"
          className="text-blue-500"
        >
          Publishers and Readers
        </Link>
        .
      </h5>
      <h5 className="pb-3">
        Questions? We got questions and answers in our{" "}
        <Link
          className="text-blue-500"
          to="https://inara.world/wp-content/uploads/2024/07/Publisher-FAQs.pdf"
        >
          Publisher FAQs
        </Link>{" "}
        and{" "}
        <Link
          className="text-blue-500"
          to="https://inara.world/wp-content/uploads/2024/07/Reader-FAQs.pdf"
        >
          Reader FAQs
        </Link>
        .
      </h5>
      <h5 className="pb-3">
        With Inara, you only pay for what you read…one page at a time—and can go
        back to it time and again. Stop at any time. No further obligation. And
        publishers get paid.
      </h5>
      <h5 className="pb-3">
        Publishers, Inara’s "consumer what you choose" streaming micropayments
        content platform pays you immediately for every page read. When the page
        turns, the publisher earns. Reader discovery of your publications goes
        way up. You build audience—otherwise lost to you— and enhance your other
        revenue models. You get a much higher percentage of every transaction
        and your earnings go to your account at the end of each business day.
      </h5>
      <h5 className="pb-3">Now, let's get started!</h5>
      <Link to="/register">
        <button className="px-5 py-1.5 mt-2 rounded text-white bg-blue-600 hover:bg-blue-800">
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default Join;
