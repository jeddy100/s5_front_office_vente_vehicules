const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: process.env.REACT_APP_BASENAME || '/',
  defaultPath: process.env.REACT_APP_DEFAULT_PATH || '/dashboard/default',
  fontFamily: process.env.REACT_APP_FONT_FAMILY ,
  host: process.env.REACT_APP_API_HOST || 's5backendcloudventevoiture-production.up.railway.app' ,
  port: process.env.REACT_APP_API_PORT ,
  http: process.env.REACT_APP_HTTP || 'https',
  borderRadius: process.env.REACT_APP_BORDER_RADIUS || 12
}

export default config;
