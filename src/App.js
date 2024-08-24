import logo from './logo.svg';
import './App.css';
import "@cloudscape-design/global-styles/index.css";
import ContentLayoutComponent from "./ContentLayoutComponent";

import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <ContentLayoutComponent />
  );
}

export default App;

