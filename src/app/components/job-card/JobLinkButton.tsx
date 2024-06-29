import { Button } from "../ui/button";
import { type UrlObject } from "url";

interface IJobLinkButtonProps {
  jobURL: string | UrlObject;
}

const JobLinkButton: React.FC<IJobLinkButtonProps> = ({ jobURL }) => {
  const jobURLString =
    typeof jobURL === "string" ? jobURL : new URL(String(jobURL)).toString();

  // Ensure the jobURL has the correct protocol
  const formattedJobURL =
    jobURLString.startsWith("http://") || jobURLString.startsWith("https://")
      ? jobURLString
      : `https://${jobURLString}`;

  return (
    <a href={formattedJobURL} target="_blank" rel="noopener noreferrer">
      <Button variant="normal" size="sm" onClick={() => console.log(jobURL)}>
        View Posting
      </Button>
    </a>
  );
};

export default JobLinkButton;
