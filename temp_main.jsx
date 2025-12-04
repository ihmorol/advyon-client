import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_URL": "http://localhost:3000", "VITE_CLERK_PUBLISHABLE_KEY": "pk_test_d2VsY29tZS10dXJrZXktMzUuY2xlcmsuYWNjb3VudHMuZGV2JA"};import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=909cfb20"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=909cfb20"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=909cfb20"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import { RouterProvider } from "/node_modules/.vite/deps/react-router-dom.js?v=909cfb20";
import { ClerkProvider } from "/node_modules/.vite/deps/@clerk_clerk-react.js?v=909cfb20";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=909cfb20";
import { router } from "/src/routes/index.jsx";
import "/src/index.css?t=1764780053322";
const queryClient = new QueryClient();
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key");
}
console.log("Rendering app...");
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(ClerkProvider, { publishableKey: PUBLISHABLE_KEY, afterSignOutUrl: "/", children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
    fileName: "D:/United International University/10th Trimester/SWE LAB/ADVYON/ADVYON-CLIENT/src/main.jsx",
    lineNumber: 22,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "D:/United International University/10th Trimester/SWE LAB/ADVYON/ADVYON-CLIENT/src/main.jsx",
    lineNumber: 21,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "D:/United International University/10th Trimester/SWE LAB/ADVYON/ADVYON-CLIENT/src/main.jsx",
    lineNumber: 20,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "D:/United International University/10th Trimester/SWE LAB/ADVYON/ADVYON-CLIENT/src/main.jsx",
    lineNumber: 19,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBcUJRO0FBckJSLE9BQU9BLFdBQVc7QUFDbEIsT0FBT0MsY0FBYztBQUNyQixTQUFTQyxzQkFBc0I7QUFDL0IsU0FBU0MscUJBQXFCO0FBQzlCLFNBQVNDLGFBQWFDLDJCQUEyQjtBQUNqRCxTQUFTQyxjQUFjO0FBQ3ZCLE9BQU87QUFFUCxNQUFNQyxjQUFjLElBQUlILFlBQVk7QUFFcEMsTUFBTUksa0JBQWtCQyxZQUFZQyxJQUFJQztBQUV4QyxJQUFJLENBQUNILGlCQUFpQjtBQUNwQkksVUFBUUMsTUFBTSx5QkFBeUI7QUFDekM7QUFFQUQsUUFBUUUsSUFBSSxrQkFBa0I7QUFDOUJiLFNBQVNjLFdBQVdDLFNBQVNDLGVBQWUsTUFBTSxDQUFDLEVBQUVDO0FBQUFBLEVBQ25ELHVCQUFDLE1BQU0sWUFBTixFQUNDLGlDQUFDLGlCQUFjLGdCQUFnQlYsaUJBQWlCLGlCQUFnQixLQUM5RCxpQ0FBQyx1QkFBb0IsUUFBUUQsYUFDM0IsaUNBQUMsa0JBQWUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUErQixLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSUEsS0FMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBTUE7QUFDRiIsIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJSb3V0ZXJQcm92aWRlciIsIkNsZXJrUHJvdmlkZXIiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJyb3V0ZXIiLCJxdWVyeUNsaWVudCIsIlBVQkxJU0hBQkxFX0tFWSIsImltcG9ydCIsImVudiIsIlZJVEVfQ0xFUktfUFVCTElTSEFCTEVfS0VZIiwiY29uc29sZSIsImVycm9yIiwibG9nIiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcclxuaW1wb3J0IHsgUm91dGVyUHJvdmlkZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQgeyBDbGVya1Byb3ZpZGVyIH0gZnJvbSAnQGNsZXJrL2NsZXJrLXJlYWN0J1xyXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcclxuaW1wb3J0IHsgcm91dGVyIH0gZnJvbSBcIi4vcm91dGVzXCI7XHJcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XHJcblxyXG5jb25zdCBxdWVyeUNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpO1xyXG5cclxuY29uc3QgUFVCTElTSEFCTEVfS0VZID0gaW1wb3J0Lm1ldGEuZW52LlZJVEVfQ0xFUktfUFVCTElTSEFCTEVfS0VZXHJcblxyXG5pZiAoIVBVQkxJU0hBQkxFX0tFWSkge1xyXG4gIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIFB1Ymxpc2hhYmxlIEtleVwiKVxyXG59XHJcblxyXG5jb25zb2xlLmxvZyhcIlJlbmRlcmluZyBhcHAuLi5cIik7XHJcblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpKS5yZW5kZXIoXHJcbiAgPFJlYWN0LlN0cmljdE1vZGU+XHJcbiAgICA8Q2xlcmtQcm92aWRlciBwdWJsaXNoYWJsZUtleT17UFVCTElTSEFCTEVfS0VZfSBhZnRlclNpZ25PdXRVcmw9XCIvXCI+XHJcbiAgICAgIDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxyXG4gICAgICAgIDxSb3V0ZXJQcm92aWRlciByb3V0ZXI9e3JvdXRlcn0gLz5cclxuICAgICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxyXG4gICAgPC9DbGVya1Byb3ZpZGVyPlxyXG4gIDwvUmVhY3QuU3RyaWN0TW9kZT5cclxuKTtcclxuIl0sImZpbGUiOiJEOi9Vbml0ZWQgSW50ZXJuYXRpb25hbCBVbml2ZXJzaXR5LzEwdGggVHJpbWVzdGVyL1NXRSBMQUIvQURWWU9OL0FEVllPTi1DTElFTlQvc3JjL21haW4uanN4In0=