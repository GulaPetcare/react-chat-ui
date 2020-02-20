import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "./src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "esm"
  },
  plugins: [
    typescript(),
    peerDepsExternal(),
    commonjs({
      include: "node_modules/**",
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      namedExports: {
        "node_modules/react/index.js": [
          "cloneElement",
          "createContext",
          "Component",
          "createElement",
          "createRef",
          "useRef",
          "useEffect",
          "useState",
          "useContext",
          "useMemo",
          "useDebugValue"
        ],
        "node_modules/react-dom/index.js": ["render", "hydrate"],
        "node_modules/react-is/index.js": [
          "isElement",
          "isValidElementType",
          "ForwardRef"
        ],
        "@pusher/chatkit-client": ["ChatManager", "TokenProvider"]
      }
    }),
    resolve()
  ]
};
