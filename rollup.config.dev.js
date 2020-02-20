import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import svgr from "@svgr/rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/demo.tsx",
  output: {
    file: "demo/bundle.js",
    format: "iife"
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("dev")
    }),
    livereload("demo"),
    serve("demo"),
    svgr({
      icon: true
    }),
    typescript(),
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
