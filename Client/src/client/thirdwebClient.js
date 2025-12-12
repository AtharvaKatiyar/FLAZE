import { createThirdwebClient } from "thirdweb";
import React from "react";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
});
