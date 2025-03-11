import React from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsconfig);

const formFields = {
  signUp: {
    name: {
      label: "Full Name",
      placeholder: "Enter your full name",
      isRequired: true,
      order: 1,
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
      isRequired: true,
      order: 2,
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      isRequired: true,
      order: 3,
    },
    confirm_password: {
      label: "Confirm Password",
      placeholder: "Re-enter your password",
      isRequired: true,
      order: 4,
    },
  },
};

function App({ signOut, user }) {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome {user?.attributes?.name || user?.username} 👋</h1>
      {user && <button onClick={signOut}>Sign out</button>}
    </div>
  );
}

export default withAuthenticator(App, { formFields });
