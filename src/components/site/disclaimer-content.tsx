import { Link } from "@tanstack/react-router";
import { disclaimerStatements } from "@/lib/disclaimer";

export function DisclaimerContent({ onReadPrivacy }: { onReadPrivacy?: () => void }) {
  return (
    <ol className="list-decimal space-y-5 pl-5 marker:font-medium marker:text-primary">
      {disclaimerStatements.map((statement) => {
        const [before, after] = statement.split("Privacy Policy");
        return (
          <li key={statement} className="pl-2">
            {before}
            {after !== undefined && (
              <>
                {onReadPrivacy ? (
                  <button
                    type="button"
                    onClick={onReadPrivacy}
                    className="text-primary underline underline-offset-4"
                  >
                    Privacy Policy
                  </button>
                ) : (
                  <Link to="/privacy" className="text-primary underline underline-offset-4">
                    Privacy Policy
                  </Link>
                )}
                {after}
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
