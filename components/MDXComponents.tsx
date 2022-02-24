import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import { Link } from "./Link";
import { Pre } from "./Pre";
import { BlogNewsletterForm } from "./NewsletterForm";

import { AuthorLayout } from "../layouts/AuthorLayout";
import { PostLayout } from "../layouts/PostLayout";
import { PostSimple } from "../layouts/PostSimple";

const layouts: Record<string, any> = {
  AuthorLayout,
  PostLayout,
  PostSimple,
};

export const MDXComponents = {
  Image,
  a: Link,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ layout, ...rest }: { layout: string; rest: any[] }) => {
    const Layout = layouts[layout];
    return <Layout {...rest} />;
  },
};

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: any) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};
