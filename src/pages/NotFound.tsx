import { Link } from "react-router-dom";
import PageHead from "../components/PageHead";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found");

  return (
    <div className="pb-16">
      <PageHead title="Lost in the Woods">
        We couldn't find that page. Let's get you back to the castle.
      </PageHead>
      <div className="text-center">
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
