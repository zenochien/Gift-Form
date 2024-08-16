import logo from './logo.svg';
import './App.css';
import "@cloudscape-design/global-styles/index.css";
import ContentLayoutComponent from "./ContentLayoutComponent";

import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { API } from "aws-amplify"; // Import API from Amplify

Amplify.configure(awsExports);


function App() {
  return (
    <ContentLayoutComponent />
  );
}

export default App;

