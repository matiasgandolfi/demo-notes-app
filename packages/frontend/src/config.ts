const config = {
  // Frontend config
  MAX_ATTACHMENT_SIZE: 5000000,
  // Backend config
  STRIPE_KEY: "sk_test_51PYX4fAUopH4nem2eE2yD2iTFAxwIfwv7AH7iXB5EBNUUWqlolPt9rs82OQUtMls0n3udEFOYHiB66FGGphCVOd600FFAbISyk",    
    s3: {
      REGION: import.meta.env.VITE_REGION,
      BUCKET: import.meta.env.VITE_BUCKET,
    },
    apiGateway: {
      REGION: import.meta.env.VITE_REGION,
      URL: import.meta.env.VITE_API_URL,
    },
    cognito: {
      REGION: import.meta.env.VITE_REGION,
      USER_POOL_ID: import.meta.env.VITE_USER_POOL_ID,
      APP_CLIENT_ID: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      IDENTITY_POOL_ID: import.meta.env.VITE_IDENTITY_POOL_ID,
    },
  };
  
  export default config;