import { env } from "./src/env/server.mjs";
import withPWAFn from 'next-pwa'


const withPWA = withPWAFn({
  dest: 'public',
  disable: env.NODE_ENV !== 'production'
})

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withPWA(config);
}

export default defineNextConfig({
  reactStrictMode: false,
  swcMinify: true,
});
