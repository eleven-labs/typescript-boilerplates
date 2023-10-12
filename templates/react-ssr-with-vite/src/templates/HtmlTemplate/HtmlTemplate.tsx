import '@eleven-labs/design-system/style.css';
import * as React from 'react';

import { getPathFile } from '@/helpers/assetHelper';

export interface HtmlTemplateProps {
  content: string;
  lang: string;
  links?: Array<React.LinkHTMLAttributes<HTMLLinkElement>>;
  metas?: Array<React.MetaHTMLAttributes<HTMLMetaElement>>;
  scripts?: Array<
    React.ScriptHTMLAttributes<HTMLScriptElement> & {
      critical?: boolean;
      text?: string;
    }
  >;
  styles?: Array<React.StyleHTMLAttributes<HTMLStyleElement> & { text?: string }>;
  title: string;
}

const renderScripts = (scripts: HtmlTemplateProps['scripts']): JSX.Element[] | undefined =>
  scripts?.map<JSX.Element>((script, index) => (
    <script
      key={index}
      {...script}
      dangerouslySetInnerHTML={
        script.text
          ? {
              __html: script.text,
            }
          : undefined
      }
    />
  ));

export const HtmlTemplate: React.FC<HtmlTemplateProps> = ({ content, lang, links, metas, scripts, styles, title }) => (
  <html lang={lang}>
    <head>
      <meta charSet="utf8" />
      <meta content="index, follow, noarchive" name="robots" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      {metas?.map((meta, index) => <meta key={index} {...meta} />)}
      <link href={getPathFile('/favicon.ico')} rel="shortcut icon" type="image/x-icon" />
      <link href={getPathFile('/web-app-manifest.json')} rel="manifest" />
      {links?.map((link, index) => <link key={index} {...link} />)}
      {styles?.map(({ text, ...props }, index) => (
        <style
          key={index}
          {...props}
          dangerouslySetInnerHTML={
            text
              ? {
                  __html: text,
                }
              : undefined
          }
        />
      ))}
      {renderScripts(scripts?.filter((script) => script.critical))}
      <title>{title}</title>
    </head>
    <body>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
        id="root"
      />
      {renderScripts(scripts?.filter((script) => !script.critical))}
    </body>
  </html>
);
