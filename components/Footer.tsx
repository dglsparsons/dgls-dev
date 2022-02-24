import { Link } from "./Link";
import { siteMetadata } from "../data/siteMetadata";
import { Icon } from "./social-icons/icon";
import Email from "./social-icons/email";
import Github from "./social-icons/github";
import Youtube from "./social-icons/youtube";
import LinkedIn from "./social-icons/linkedin";
import Twitter from "./social-icons/twitter";

export function Footer() {
  return (
    <footer className="flex flex-col items-center mt-16 pb-8">
      <div className="flex mb-3 space-x-4">
        <Icon href={`mailto:${siteMetadata.email}`}>
          <Email />
        </Icon>
        <Icon href={`mailto:${siteMetadata.github}`}>
          <Github />
        </Icon>
        <Icon href={`mailto:${siteMetadata.youtube}`}>
          <Youtube />
        </Icon>
        <Icon href={`mailto:${siteMetadata.linkedin}`}>
          <LinkedIn />
        </Icon>
        <Icon href={`mailto:${siteMetadata.twitter}`}>
          <Twitter />
        </Icon>
      </div>
      <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{siteMetadata.author}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link href="/">{siteMetadata.title}</Link>
      </div>
    </footer>
  );
}
