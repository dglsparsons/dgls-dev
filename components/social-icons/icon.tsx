import { FC } from "react";

export const Icon: FC<{ href: string }> = ({ href, children }) => {
  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <div className="fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-8 w-8">
        {children}
      </div>
    </a>
  );
};
