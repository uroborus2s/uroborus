import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import bomStylesUrl from './styles/bom.css';
import normalize from 'normalize.css/normalize.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: bomStylesUrl,
    },
    {
      rel: 'stylesheet',
      href: normalize,
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'sky for lyy',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="zh">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
