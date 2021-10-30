declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.scss';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;

  const url: string;
  export default url;
}
declare const apiBaseUrl: string;
declare const socketServer: string;
