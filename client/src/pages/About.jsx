import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-20 px-6 md:px-12 pb-6 mx-auto max-w-[1100px]">
      <h2 className="text-3xl mb-5">Get Started with Inara</h2>
      <h5 className="pt-2">
        <Link to="join" className="text-blue-500">
          Join Inara
        </Link>{" "}
        and get{" "}
        <Link to="https://dropp.cc/get-dropp-app/" className="text-blue-500">
          $5 FREE Dropp digital walle
        </Link>
        t app to start reading now!
      </h5>
      <h5 className="py-2">
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
        Publishers, you publish your publication for sale but it doesn’t
        penetrate to readers. You give away your publications for free. You
        spend thousands on advertising just to get your publication seen. But
        you still can’t get enough readers to discover you and your publication.
      </h5>
      <h5 className="pb-3">
        With Inara, you get paid as the reader discovers you and your
        publication. Anyone can start reading your publications without buying
        them upfront or subscribing to a service that may not have all your
        publications—and you still get paid for every page read.
      </h5>
      <h5 className="pb-3">
        Readers, you have to buy a publication or subscribe to services just to
        find out if a publication is right for you—losing money and wasting your
        time.
      </h5>
      <h5 className="pb-3">
        Now there’s Inara. Turn the publication page and a tiny payment goes
        from the reader’s digital wallet to the publisher's wallet. When the
        page turns, the publisher earns. Readers, you easily discover the
        publications you most want to read. You only pay for what you read, one
        page at a time.
      </h5>
      <h5 className="pb-3">
        Open a publication in the Inara e-reader, turn the page, and a
        micropayment goes from the reader’s digital wallet to the publisher's
        digital wallet in real time. The reader only pays once for each page
        they read and can go back time and again.
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

export default About;
