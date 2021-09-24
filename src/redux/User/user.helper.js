import { auth } from "../../firebase/util";
import { APP_URL } from "../../urlConfig";

export const resetPasswordAPI = (email) => {
  const config = {
    url: APP_URL,
  };
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const resetPassErr = ["Something went wrong. Please try again."];
        reject(resetPassErr);
      });
  });
};
